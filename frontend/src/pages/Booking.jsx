import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hours, setHours] = useState(1);
  
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  if(!isLoggedIn && showPaymentModal) {
    alert('Please Log In First!')
    navigate('/login')
  }

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/slots`);
        setSlots(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch parking slots');
        setLoading(false);
      }
    };

    fetchSlots();
  }, [slots]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowPaymentModal(true);
  };

 const handlePayment = async () => {
  try {
    const amount = selectedSlot.pricePerHour * hours;
    const paymentMethod = 'upi'; // Could be dynamic based on user selection
    
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/bookings`, {
      slotId: selectedSlot._id,
      amount,
      paymentMethod,
      hours
    });

    setTicket({
      slotId: selectedSlot._id,
      slotNumber: selectedSlot.name,
      bookingTime: new Date().toISOString(),
      expiryTime: response.data.booking._doc.expiryTime,
      amount,
      transactionId: response.data.booking._doc.slotId, // Now included from backend
      hours,
      vehicleType: response.data.booking.vehicleType
    });

    setShowPaymentModal(false);
    setSlots(slots.map(slot => 
      slot._id === selectedSlot._id ? response.data.slot : slot
    ));
  } catch (err) {
    setError(err.response?.data?.message || 'Payment failed. Please try again.');
    setShowPaymentModal(false);
  }
};

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Parking Slot Booking</h1>
        
        {ticket ? (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Booking Confirmed!</h2>
            <div className="flex justify-center mb-4">
              <QRCodeSVG 
                value={JSON.stringify(ticket)} 
                size={200} 
                level="H"
                includeMargin={true}
              />
            </div>
            <div className="space-y-2">
              <p><span className="font-medium">Slot Number:</span> {ticket.slotNumber}</p>
              <p><span className="font-medium">Booking Time:</span> {new Date(ticket.bookingTime).toLocaleString()}</p>
              <p><span className="font-medium">Expires:</span> {new Date(ticket.expiryTime).toLocaleString()}</p>
              <p><span className="font-medium">Parking Hours:</span> {ticket.hours} hours</p>
              <p><span className="font-medium">Amount Paid:</span> ₹{ticket.amount.toFixed(2)}</p>
              <p><span className="font-medium">Transaction ID:</span> {ticket.transactionId}</p>
            </div>
            <button 
              onClick={() => setTicket(null)}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Book Another Slot
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {slots.map(slot => (
                <div 
                  key={slot._id}
                  onClick={() => !slot.booked && handleSlotSelect(slot)}
                  className={`p-4 rounded-lg shadow-md cursor-pointer transition 
                    ${!slot.booked 
                      ? 'bg-white hover:bg-blue-50 hover:shadow-lg' 
                      : 'bg-gray-200 cursor-not-allowed'}
                  `}
                >
                  <h3 className="text-xl font-semibold">Slot {slot.name}</h3>
                  <p className="text-gray-600">₹{slot.pricePerHour}/hour</p>
                  <p className="text-sm text-gray-500 capitalize">{slot.vehicleType}</p>
                  <p className="text-sm text-gray-500">Floor {slot.floor}</p>
                  <p className={`mt-2 font-medium ${
                    !slot.booked ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {!slot.booked ? 'Available' : 'Booked'}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {showPaymentModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
              
              <div className="mb-6">
                <p className="text-lg">Slot {selectedSlot.name}</p>
                <p className="text-gray-600">₹{selectedSlot.pricePerHour}/hour</p>
                
                <div className="mt-4">
                  <label className="block text-gray-700 mb-1">Parking Hours</label>
                  <select
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(h => (
                      <option key={h} value={h}>{h} hour{h !== 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                
                <p className="mt-2 font-medium">
                  Total: ₹{(selectedSlot.pricePerHour * hours).toFixed(2)}
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">UPI ID</label>
                  <input 
                    type="text" 
                    placeholder="yourname@upi" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handlePayment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Pay ₹{(selectedSlot.pricePerHour * hours).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;