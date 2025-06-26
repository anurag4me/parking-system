import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { saveAs } from 'file-saver';

const Booking = () => {
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hours, setHours] = useState(1);
  const [myBookings, setMyBookings] = useState([]);
  const [showBookings, setShowBookings] = useState(false);
  
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/slots`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch slots');
        setSlots(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchMyBookings = async () => {
      if (isLoggedIn) {
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings/my`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Failed to fetch bookings');
          setMyBookings(data);
        } catch (err) {
          console.error('Failed to fetch bookings:', err.message);
        }
      }
    };

    fetchSlots();
    fetchMyBookings();
  }, [isLoggedIn, ticket]);

  const handleSlotSelect = (slot) => {
    if (!isLoggedIn) {
      alert('Please Log In First!');
      navigate('/login');
      return;
    }
    setSelectedSlot(slot);
    setShowPaymentModal(true);
  };

  const handlePayment = async () => {
    try {
      const amount = selectedSlot.pricePerHour * hours;
      const paymentMethod = 'upi';
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          slotId: selectedSlot._id,
          amount,
          paymentMethod,
          hours
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Payment failed');

      const newTicket = {
        slotId: selectedSlot._id,
        slotNumber: selectedSlot.name,
        bookingTime: new Date().toISOString(),
        expiryTime: data.booking._doc.expiryTime,
        amount,
        transactionId: data.booking._doc.slotId,
        hours,
        vehicleType: data.booking.vehicleType
      };

      setTicket(newTicket);
      setShowPaymentModal(false);
      downloadQRAsPNG(newTicket);
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      setShowPaymentModal(false);
    }
  };

 const downloadQRAsPNG = (ticketData) => {
  // Create a temporary container
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  document.body.appendChild(container);

  // Render the QR code to our container
  const qrCode = (
    <QRCodeSVG 
      value={JSON.stringify(ticketData)}
      size={256}
      level="H"
      includeMargin={true}
      bgColor="#FFFFFF"
      fgColor="#000000"
    />
  );

  ReactDOM.render(qrCode, container);

  // Get the SVG element
  const svgElement = container.querySelector('svg');
  
  // Convert SVG to canvas
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const img = new Image();

  img.onload = () => {
    // Draw white background first
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the QR code
    ctx.drawImage(img, 0, 0);
    
    // Convert to PNG and download
    canvas.toBlob((blob) => {
      saveAs(blob, `parking-ticket-${ticketData.transactionId}.png`);
      document.body.removeChild(container);
    }, 'image/png');
  };

  // Convert SVG to data URL
  const svgData = new XMLSerializer().serializeToString(svgElement);
    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };


  const toggleBookingsView = () => {
    setShowBookings(!showBookings);
  };


   if (loading)
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Parking Slot Booking</h1>
          {isLoggedIn && (
            <button 
              onClick={toggleBookingsView}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              {showBookings ? 'View Available Slots' : 'View My Bookings'}
            </button>
          )}
        </div>
        
        {ticket ? (
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-green-600 mb-4">Booking Confirmed!</h2>
            <div className="flex justify-center mb-4">
              <QRCodeSVG 
                value={JSON.stringify(ticket)} 
                size={200} 
                level="H"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#000000"
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
            <div className="mt-6 flex space-x-3">
              <button 
                onClick={() => downloadQRAsPNG(ticket)}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Download QR
              </button>
              <button 
                onClick={() => setTicket(null)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : showBookings ? (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
            {myBookings.length === 0 ? (
              <p className="text-gray-500">You have no active bookings</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myBookings.map(booking => (
                  <div key={booking._id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold">Slot {booking.slotId?.name || 'N/A'}</h3>
                        <p>Transaction: {booking.transactionId}</p>
                        <p>Amount: ₹{booking.amount.toFixed(2)}</p>
                        <p>Expires: {new Date(booking.expiryTime).toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => {
                          setTicket({
                            slotId: booking.slotId?._id,
                            slotNumber: booking.slotId?.name,
                            bookingTime: booking.bookingTime,
                            expiryTime: booking.expiryTime,
                            amount: booking.amount,
                            transactionId: booking.slotId?._id,
                            hours: Math.ceil((new Date(booking.expiryTime) - new Date(booking.createdAt)) / (1000 * 60 * 60)),
                            vehicleType: booking.slotId?.vehicleType
                          });
                        }}
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View Ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
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