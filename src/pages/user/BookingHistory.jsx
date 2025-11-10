import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - college project ke liye
  const mockBookings = [
    {
      id: 'B001',
      turfName: 'Mohan Turf',
      facility: 'Football',
      date: '2024-01-15',
      timeSlot: '6:00 PM - 8:00 PM',
      people: 12,
      duration: '2 hours',
      amount: 1200,
      status: 'confirmed',
      bookingDate: '2024-01-10',
      address: '123 Sports St, Downtown'
    },
    {
      id: 'B002',
      turfName: 'Sky Sports Arena', 
      facility: 'Cricket',
      date: '2024-01-12',
      timeSlot: '4:00 PM - 6:00 PM',
      people: 8,
      duration: '2 hours',
      amount: 1500,
      status: 'completed',
      bookingDate: '2024-01-08',
      address: '456 Court Ave, Uptown'
    },
    {
      id: 'B003',
      turfName: 'Green Valley Turf',
      facility: 'Badminton',
      date: '2024-01-20',
      timeSlot: '7:00 PM - 9:00 PM', 
      people: 4,
      duration: '2 hours',
      amount: 800,
      status: 'cancelled',
      bookingDate: '2024-01-15',
      address: '789 Field Rd, Westside'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const filteredBookings = activeFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading your bookings...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Dashboard
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
            Booking History
          </h1>
          <p className="text-gray-400">View and manage all your turf bookings</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {['all', 'confirmed', 'completed', 'cancelled'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-cyan-500 text-white'
                  : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Bookings Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid gap-6"
        >
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl border border-slate-700/50 p-6 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{booking.turfName}</h3>
                        <p className="text-cyan-400">{booking.facility}</p>
                      </div>
                      <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                        {getStatusIcon(booking.status)}
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="text-sm text-gray-400">Date</p>
                          <p className="text-white font-medium">
                            {new Date(booking.date).toLocaleDateString('en-IN')}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="text-sm text-gray-400">Time Slot</p>
                          <p className="text-white font-medium">{booking.timeSlot}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 flex items-center justify-center text-cyan-400">
                          👥
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">People</p>
                          <p className="text-white font-medium">{booking.people} people</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-cyan-400" />
                        <div>
                          <p className="text-sm text-gray-400">Location</p>
                          <p className="text-white font-medium text-sm">{booking.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start lg:items-end gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-cyan-400">₹{booking.amount}</p>
                      <p className="text-sm text-gray-400">Booked on {new Date(booking.bookingDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    
                    {booking.status === 'confirmed' && (
                      <button className="bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors text-sm">
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-slate-800/50 rounded-xl p-8 max-w-md mx-auto">
                <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No bookings found</h3>
                <p className="text-gray-400 mb-4">
                  {activeFilter === 'all' 
                    ? "You haven't made any bookings yet."
                    : `No ${activeFilter} bookings found.`
                  }
                </p>
                <Link 
                  to="/explore"
                  className="bg-cyan-500 text-white px-6 py-2 rounded-lg hover:bg-cyan-600 transition-colors inline-block"
                >
                  Book a Turf
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingHistory;