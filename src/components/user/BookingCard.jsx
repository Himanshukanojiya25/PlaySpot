import React from 'react';

const BookingCard = ({ booking }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      case 'pending': return 'Pending';
      default: return status;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{booking.turfName}</h3>
          <p className="text-gray-600">{booking.facility}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
          {getStatusText(booking.status)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p className="font-medium">{new Date(booking.date).toLocaleDateString('en-IN')}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Time Slot</p>
          <p className="font-medium">{booking.timeSlot}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">People</p>
          <p className="font-medium">{booking.people} people</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Duration</p>
          <p className="font-medium">{booking.duration}</p>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Amount Paid</p>
          <p className="text-lg font-bold text-green-600">₹{booking.amount}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Booked on</p>
          <p className="text-sm font-medium">{new Date(booking.bookingDate).toLocaleDateString('en-IN')}</p>
        </div>
      </div>

      {booking.status === 'confirmed' && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200">
            Cancel Booking
          </button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;