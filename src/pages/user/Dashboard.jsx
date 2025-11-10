import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, History } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useBooking } from '../../hooks/useBooking';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { Link } from 'react-router-dom'; // ADD THIS IMPORT

const Dashboard = () => {
  const { user } = useAuth();
  const { bookings, fetchMyBookings, cancelBooking, loading } = useBooking();
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    fetchMyBookings();
  }, []);

  const mockBookings = [
    {
      _id: '1',
      facility: {
        name: 'Elite Sports Arena',
        type: 'Basketball',
        location: { address: '123 Sports St, Downtown' },
      },
      date: '2024-10-10',
      timeSlot: '10:00 AM - 11:00 AM',
      status: 'confirmed',
      amount: 25,
    },
    {
      _id: '2',
      facility: {
        name: 'Grand Tennis Club',
        type: 'Tennis',
        location: { address: '456 Court Ave, Uptown' },
      },
      date: '2024-10-12',
      timeSlot: '02:00 PM - 03:00 PM',
      status: 'confirmed',
      amount: 35,
    },
    {
      _id: '3',
      facility: {
        name: 'Victory Football Stadium',
        type: 'Football',
        location: { address: '789 Field Rd, Westside' },
      },
      date: '2024-09-28',
      timeSlot: '06:00 PM - 07:00 PM',
      status: 'completed',
      amount: 50,
    },
  ];

  const displayBookings = bookings.length > 0 ? bookings : mockBookings;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      case 'completed':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
      default:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
    }
  };

  const filteredBookings = displayBookings.filter((booking) => {
    if (activeTab === 'upcoming') {
      return booking.status === 'confirmed' && new Date(booking.date) >= new Date();
    } else if (activeTab === 'past') {
      return booking.status === 'completed' || new Date(booking.date) < new Date();
    } else {
      return booking.status === 'cancelled';
    }
  });

  const handleCancelBooking = async (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 pt-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 dark:text-dark-50 mb-2">
                Welcome back, {user?.name || 'User'}!
              </h1>
              <p className="text-xl text-dark-600 dark:text-dark-400">
                Manage your bookings and schedule
              </p>
            </div>
            {/* ADD BOOKING HISTORY BUTTON */}
            <Link 
              to="/booking-history" 
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <History className="w-5 h-5" />
              Booking History
            </Link>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6 mb-8"> {/* Changed to 4 columns */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-primary-500" />
            </div>
            <h3 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-2">
              {displayBookings.filter((b) => b.status === 'confirmed').length}
            </h3>
            <p className="text-dark-600 dark:text-dark-400">Upcoming Bookings</p>
          </Card>

          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-secondary-500" />
            </div>
            <h3 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-2">
              {displayBookings.filter((b) => b.status === 'completed').length}
            </h3>
            <p className="text-dark-600 dark:text-dark-400">Completed</p>
          </Card>

          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-accent-500" />
            </div>
            <h3 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-2">
              {displayBookings.reduce((sum, b) => sum + (b.amount || 0), 0)}
            </h3>
            <p className="text-dark-600 dark:text-dark-400">Total Spent ($)</p>
          </Card>

          {/* ADD TOTAL BOOKINGS CARD */}
          <Card padding="lg" className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <History className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-dark-900 dark:text-dark-50 mb-2">
              {displayBookings.length}
            </h3>
            <p className="text-dark-600 dark:text-dark-400">Total Bookings</p>
          </Card>
        </div>

        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-50">
              My Bookings
            </h2>
            <div className="flex gap-2">
              {['upcoming', 'past', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-400 hover:bg-dark-200 dark:hover:bg-dark-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-dark-600 dark:text-dark-400 mb-4">
                No {activeTab} bookings found
              </p>
              <Link 
                to="/explore" 
                className="bg-primary-500 text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors duration-200"
              >
                Book a Turf
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card padding="lg" hoverable className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-dark-900 dark:text-dark-50">
                              {booking.facility.name}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="space-y-2 text-dark-600 dark:text-dark-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(booking.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{booking.timeSlot}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{booking.facility.location.address}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-dark-900 dark:text-dark-50">
                          ${booking.amount}
                        </p>
                      </div>
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;