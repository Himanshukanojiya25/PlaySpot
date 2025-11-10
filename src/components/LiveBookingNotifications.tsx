import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Clock } from 'lucide-react';
import fakeBookings from '../data/fakeBookings.json';

interface BookingNotification {
  id: string;
  turfId: string;
  turfName: string;
  userName: string;
  userAvatar: string;
  peopleCount: number;
  duration: number;
  timestamp: string;
  timeAgo: string;
  sport: string;
}

const LiveBookingNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<BookingNotification[]>([]);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Initial notifications
    setNotifications(fakeBookings.bookings.slice(0, 3));

    // Auto-update every 30 seconds
    const interval = setInterval(() => {
      const randomBooking = fakeBookings.bookings[
        Math.floor(Math.random() * fakeBookings.bookings.length)
      ];
      
      setNotifications(prev => {
        const newNotifications = [randomBooking, ...prev.slice(0, 2)];
        return newNotifications;
      });
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'football': return '⚽';
      case 'cricket': return '🏏';
      case 'badminton': return '🏸';
      case 'tennis': return '🎾';
      case 'basketball': return '🏀';
      default: return '🏆';
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm w-full space-y-3">
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              type: "spring",
              stiffness: 200
            }}
            className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-cyan-200/50 p-4 relative overflow-hidden"
          >
            {/* Gradient accent bar */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-600"></div>
            
            <div className="flex items-start justify-between ml-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xs font-medium text-green-600">Live Booking</span>
                  <Clock className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{notification.timeAgo}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{notification.userAvatar}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 text-sm">
                      {notification.userName} booked {notification.turfName}
                    </p>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{notification.peopleCount} people</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{notification.duration} hour{notification.duration > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>{getSportIcon(notification.sport)}</span>
                        <span className="capitalize">{notification.sport}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => removeNotification(notification.id)}
                className="flex-shrink-0 ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Header with close button */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-700">Live Bookings</span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default LiveBookingNotifications;