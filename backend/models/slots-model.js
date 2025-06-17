const mongoose = require('mongoose');

const parkingSlotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  isParked: {
    type: Boolean,
    default: false
  },
  paymentDone: {
    type: Boolean,
    default: false
  },
  booked: {
    type: Boolean,
    default: false
  },
  parkedFrom: {
    type: String,
    default: null
  },
  parkingHours: {
    type: String,
    default: null
  },
  pricePerHour: {
    type: Number,
    required: true,
    default: 50 // Default price in ₹
  },
  vehicleType: {
    type: String,
    enum: ['two-wheeler', 'four-wheeler', 'heavy'],
    default: 'four-wheeler'
  },
  floor: {
    type: Number,
    required: true,
    default: 1
  }
}, { timestamps: true });

module.exports = mongoose.model('ParkingSlot', parkingSlotSchema);