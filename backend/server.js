require("dotenv").config();
const cors = require("cors");
const express = require("express");
const authRoute = require("./router/auth-router.js");
const contactRoute = require("./router/contact-router.js");
const parkingSpotRoute = require("./router/park-router.js");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error-middleware.js");
const ParkingSlot = require('./models/slots-model.js');
const Booking = require('./models/booking-model.js');
const ReleaseLog = require('./models/realeaseLog-model.js');

const PORT = 5000;
const app = express();

connectDb(process.env.MONGODB_URI || "mongodb+srv://anuragmishra5033:anuragmishra5033@houserentalscluster.ep5injo.mongodb.net/SmartPark?retryWrites=true&w=majority&appName=HouseRentalsCluster")
  .then(() => console.log("MongoDb started successfully!"))
  .catch((err) => console.log("MongoDb error:", err));


const corsOptions = {
  origin: ["http://localhost:5173", "https://your-netlify-app.netlify.app", "https://smart-park-odecode.netlify.app"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// API Endpoints

app.use("/api/auth", authRoute);

// Get all parking slots
app.get('/api/slots', async (req, res) => {
  try {
    const slots = await ParkingSlot.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Book a parking slot
app.post('/api/bookings', async (req, res) => {
  try {
    const { slotId, amount, paymentMethod, hours } = req.body;
    
    // Find the slot
    const slot = await ParkingSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }
    
    if (slot.booked) {
      return res.status(400).json({ message: 'Slot already booked' });
    }
  
    // Simple incremental transaction IDs (would need to track last ID in DB)
    const lastBooking = await Booking.findOne().sort({ createdAt: -1 });
    const lastId = lastBooking ? parseInt(lastBooking.transactionId.replace('TXN', '')) || 0 : 0;
    const transactionId = `TXN${(lastId + 1).toString().padStart(6, '0')}`;

    // Calculate expiry time
    const bookingTime = new Date();
    const expiryTime = new Date(bookingTime.getTime() + hours * 60 * 60 * 1000);

    // Create booking
    const booking = new Booking({
      slotId,
      amount,
      paymentMethod,
      expiryTime,
      transactionId  // Include the generated transaction ID
    });

    // Update slot status
    slot.booked = true;
    slot.paymentDone = true;
    slot.parkedFrom = bookingTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    slot.parkedTo = expiryTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    slot.parkingHours = `${hours} hour${hours !== 1 ? 's' : ''}`;
    // Save both
    await Promise.all([booking.save(), slot.save()]);
    res.status(201).json({
      booking: {
        ...booking,
        slotNumber: slot.name,
        vehicleType: slot.vehicleType
      },
      slot
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/slots/release', async (req, res) => {
  try {
    const { slotId } = req.body;
    
    if (!slotId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Find the slot
    const slot = await ParkingSlot.findById(slotId);
    if (!slot) {
      return res.status(404).json({
        success: false,
        message: 'Slot not found'
      });
    }

    // Check if slot is actually occupied
    if (!slot.booked && !slot.isParked) {
      return res.json({
        success: false,
        message: 'Slot was already available'
      });
    }

    // Update slot status
    slot.isParked = false;
    slot.paymentDone = false;
    slot.booked = false;
    slot.parkedFrom = null;
    slot.parkedTo = null;
    slot.parkingHours = null;

    // Create release log
    const releaseLog = new ReleaseLog({
      slotId: slot._id,
      releasedAt: new Date()
    });

    // Save both
    await Promise.all([slot.save(), releaseLog.save()]);

    res.json({
      success: true,
      message: `Slot ${slot.name} released successfully`,
      slot
    });

  } catch (err) {
    console.error('Release error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during slot release'
    });
  }
});

app.post('/api/validate', async (req, res) => {
  try {
    const { qrData } = req.body;
    
    if (!qrData) {
      return res.status(400).json({
        valid: false,
        message: 'No QR code data provided'
      });
    }

    // Parse the QR code data
    let ticket;
    try {
      ticket = JSON.parse(qrData);
    } catch (err) {
      return res.status(400).json({
        valid: false,
        message: 'Invalid QR code format'
      });
    }

    // Check required fields
    if (!ticket.transactionId || !ticket.slotId || !ticket.expiryTime) {
      return res.status(400).json({
        valid: false,
        message: 'Invalid ticket data'
      });
    }

    // Verify the booking exists in database
    const booking = await Booking.findOne({ 
      transactionId: ticket.transactionId,
      slotId: ticket.slotId
    }).populate('slotId');

    if (!booking) {
      return res.json({
        valid: false,
        message: 'Ticket not found in system'
      });
    }

    // Check if ticket is expired
    const now = new Date();
    const expiryTime = new Date(ticket.expiryTime);

    if (now > expiryTime) {
      return res.json({
        valid: false,
        message: `Ticket expired at ${expiryTime.toLocaleString()}`
      });
    }

    // Check if slot is still assigned to this ticket
    const slot = await ParkingSlot.findById(ticket.slotId);
    if (!slot || !slot.booked || slot.paymentDone === false) {
      return res.json({
        valid: false,
        message: 'Slot booking no longer active'
      });
    }

    // If all checks pass
    res.json({
      valid: true,
      message: 'Ticket is valid',
      ticket: {
        ...ticket,
        slotNumber: booking.slotId.name,
        vehicleType: booking.slotId.vehicleType,
        actualAmount: booking.amount
      }
    });

  } catch (err) {
    console.error('Validation error:', err);
    res.status(500).json({
      valid: false,
      message: 'Server error during validation'
    });
  }
});


app.use("/api/form", contactRoute);
app.use("/api/parking-spots", parkingSpotRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
