import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Calendar } from 'lucide-react';
import fakeBookings from '../data/fakeBookings.json';

interface RecentBookingsProps {
  turfId?: string;
  maxItems?: number;
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ 
  turfId, 
  maxItems = 5 
}) => {
  const filteredBookings = turfId
    ? fakeBookings.bookings.filter(booking => booking.turfId === turfId)
    : fakeBookings.bookings;

  const recentBookings = filteredBookings.slice(0, maxItems);

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

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-slate-800/80 rounded-xl p-4 border border-cyan-500/20">
      <div className="flex items-center space-x-2 mb-4">
        <Clock className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">
          Recent Bookings {turfId ? 'at This Turf' : 'Today'}
        </h3>
      </div>

      <div className="space-y-3">
        {recentBookings.map((booking, index) => (
          <motion.div
            key={booking.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 bg-slate-700/50 rounded-lg border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {booking.userAvatar}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-medium text-white text-sm truncate">
                  {booking.userName}
                </p>
                <span className="text-xs text-cyan-300 bg-cyan-500/10 px-2 py-1 rounded-full">
                  {formatTime(booking.timestamp)}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 mt-1 text-xs text-gray-300">
                <div className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{booking.peopleCount} people</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{booking.duration} hour{booking.duration > 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span>{getSportIcon(booking.sport)}</span>
                  <span className="capitalize">{booking.sport}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {recentBookings.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-600" />
          <p>No recent bookings found</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-cyan-500/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Last 24 hours</span>
          <span className="text-cyan-400 font-medium">
            {filteredBookings.length} total bookings
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;