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
const authMiddleware = require("./middlewares/auth-middleware.js");

const PORT = 5000;
const app = express();

connectDb(process.env.MONGO_URI)
  .then(() => console.log("MongoDb started successfully!"))
  .catch((err) => console.log("MongoDb error:", err));


const corsOptions = {
  origin: ["http://localhost:5173", "https://smart-park-odecode.netlify.app"],
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
    slot.parkingHours = `${hours} hour${hours !== 1 ? 's' : ''}`;
    // slot.parkedFrom = expiryTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

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
    slot.parkingHours = null;

    // Update the booking status
    await Booking.findOneAndUpdate({ slotId }, { status: "active" })

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
      slotId: ticket.slotId
    }).populate('slotId');

    if (!booking) {
      return res.json({
        valid: false,
        message: 'Ticket not found in system'
      });
    }

    if (booking.status === 'completed') {
      return res.json({
        valid: false,
        message: 'This ticket is \nalready used once!'
      });
    }

    booking.status = "completed"
    await booking.save()

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
    const slot = await ParkingSlot.findByIdAndUpdate(ticket.slotId, {
      parkedFrom: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    });
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

// Get count of occupied slots
app.get('/api/slots/occupied', async (req, res) => {
  try {
    const count = await ParkingSlot.countDocuments({ booked: true });
    res.json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/slots/release-all', authMiddleware, async (req, res) => {
  try {
    if(!req?.user.isAdmin) return res.status().json({
      success: false,
      message: "You don't have permission to perform that task!"
    })

    const result = await ParkingSlot.updateMany({}, {$set: {
      isParked: false,
      paymentDone: false,
      booked: false,
      parkedFrom: null,
      parkingHours: null,
    }});

    res.json({
      success: true,
      message: `All slots released successfully`,
      result
    });

  } catch (err) {
    console.error('Release error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during slot release'
    });
  }
})

app.get('/api/bookings/my', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ 
      userId: req.user.userId,
      status: 'active' // Only show active bookings
    })
    .populate('slotId', 'name vehicleType floor pricePerHour')
    .sort({ createdAt: -1 }); // Newest first

    res.json(bookings);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
});

app.use("/api/form", contactRoute);
app.use("/api/parking-spots", parkingSpotRoute);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`server is running on port http://localhost:${PORT}`);
});
