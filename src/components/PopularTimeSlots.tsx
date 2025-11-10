import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Users } from 'lucide-react';
import fakeBookings from '../data/fakeBookings.json';

interface PopularTimeSlotsProps {
  onTimeSelect?: (time: string) => void;
  selectedTime?: string;
}

const PopularTimeSlots: React.FC<PopularTimeSlotsProps> = ({ 
  onTimeSelect, 
  selectedTime 
}) => {
  const popularSlots = fakeBookings.popularSlots;

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case 'very-high':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'medium':
        return 'bg-yellow-500 text-gray-800';
      default:
        return 'bg-green-500 text-white';
    }
  };

  const getPopularityText = (popularity: string) => {
    switch (popularity) {
      case 'very-high':
        return 'Very Popular';
      case 'high':
        return 'Popular';
      case 'medium':
        return 'Moderate';
      default:
        return 'Available';
    }
  };

  return (
    <div className="bg-slate-800/80 rounded-xl p-4 border border-cyan-500/20">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Popular Time Slots</h3>
      </div>

      <div className="space-y-4">
        {popularSlots.map((slot, index) => (
          <motion.div
            key={slot.time}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
              selectedTime === slot.time
                ? 'border-cyan-500 bg-cyan-500/10 shadow-lg shadow-cyan-500/20'
                : 'border-cyan-500/20 bg-slate-700/50 hover:border-cyan-500/50 hover:shadow-md hover:shadow-cyan-500/10'
            }`}
            onClick={() => onTimeSelect?.(slot.time)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">{slot.time}</span>
              </div>
              
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPopularityColor(slot.popularity)}`}>
                {getPopularityText(slot.popularity)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{slot.bookings} bookings today</span>
                </div>
              </div>

              {/* Popularity meter */}
              <div className="w-24 h-2 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    slot.popularity === 'very-high' ? 'bg-red-500' :
                    slot.popularity === 'high' ? 'bg-orange-500' :
                    slot.popularity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{
                    width: `${
                      slot.popularity === 'very-high' ? '90%' :
                      slot.popularity === 'high' ? '70%' :
                      slot.popularity === 'medium' ? '50%' : '30%'
                    }`
                  }}
                ></div>
              </div>
            </div>

            {/* Recommendation badge */}
            {slot.popularity === 'very-high' && (
              <div className="mt-3 inline-flex items-center space-x-1 bg-red-500/20 text-red-300 px-2 py-1 rounded-full text-xs border border-red-500/30">
                <TrendingUp className="w-3 h-3" />
                <span>Most popular slot</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
        <div className="flex items-center space-x-2 text-sm text-cyan-300">
          <Clock className="w-4 h-4" />
          <span>
            <strong>Tip:</strong> Book less popular slots for better availability
          </span>
        </div>
      </div>
    </div>
  );
};

export default PopularTimeSlots;