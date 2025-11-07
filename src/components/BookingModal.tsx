import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Phone, Send, IndianRupee, AlertCircle, Shield } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  turf?: {
    id: string;
    name: string;
    pricePerPerson: number;
    capacity: {
      min: number;
      max: number;
      recommended: number;
    };
    equipment?: {
      bats: {
        available: number;
        total: number;
        status: "red" | "orange" | "green";
        estimatedTime: string;
      };
      balls: {
        available: number;
        total: number;
        status: "red" | "orange" | "green";
        estimatedTime: string;
      };
    };
  };
}

export default function BookingModal({ isOpen, onClose, turf }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    peopleCount: turf?.capacity?.recommended || 4, // Updated to 4
  });

  // Safe calculations with defaults
  const capacity = turf?.capacity || { min: 4, max: 20, recommended: 10 }; // Updated min to 4
  const pricePerPerson = turf?.pricePerPerson || 200;
  const turfName = turf?.name || 'Turf';
  const totalPrice = formData.peopleCount * pricePerPerson;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const equipmentInfo = turf?.equipment ? 
      `%0A🏏 *Equipment Status:*%0ABats: ${turf.equipment.bats.available}/${turf.equipment.bats.total} (${turf.equipment.bats.status})%0ABalls: ${turf.equipment.balls.available}/${turf.equipment.balls.total} (${turf.equipment.balls.status})` 
      : '';

    const message = `Hi! I would like to book *${turfName}*%0A%0A📋 *Booking Details:*%0A👤 Name: ${formData.name}%0A📞 Phone: ${formData.phone}%0A📅 Date: ${formData.date}%0A👥 People: ${formData.peopleCount}%0A💰 Total: ₹${totalPrice}${equipmentInfo}%0A%0A_Booking for ${formData.peopleCount} people at ₹${pricePerPerson}/person_`;

    window.open(`https://wa.me/919322663114?text=${message}`, '_blank');

    setFormData({ 
      name: '', 
      phone: '', 
      date: '', 
      peopleCount: capacity.recommended 
    });
    onClose();
  };

  const handlePeopleChange = (count: number) => {
    if (count >= 4 && count <= capacity.max) { // Updated min to 4
      setFormData({ ...formData, peopleCount: count });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-h-[90vh] overflow-y-auto"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </motion.button>

            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
                Book Your Session
              </h2>
              <p className="text-gray-400">Reserve {turfName}</p>
            </div>

            {/* Equipment Status in Booking */}
            {turf?.equipment && (
              <div className="mb-4 p-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield size={16} className="text-cyan-400" />
                  <span className="text-white font-semibold text-sm">Current Equipment Status</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className={`p-2 rounded ${
                    turf.equipment.bats.status === 'green' ? 'bg-green-500/20 text-green-400' :
                    turf.equipment.bats.status === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    Bats: {turf.equipment.bats.available}/{turf.equipment.bats.total}
                  </div>
                  <div className={`p-2 rounded ${
                    turf.equipment.balls.status === 'green' ? 'bg-green-500/20 text-green-400' :
                    turf.equipment.balls.status === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    Balls: {turf.equipment.balls.available}/{turf.equipment.balls.total}
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center space-x-2 text-gray-300 mb-2">
                  <Users size={18} className="text-cyan-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-gray-300 mb-2">
                  <Phone size={18} className="text-cyan-400" />
                  <span>Phone Number</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Enter your phone"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-gray-300 mb-2">
                  <Calendar size={18} className="text-cyan-400" />
                  <span>Preferred Date</span>
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              {/* People Selector */}
              <div>
                <label className="flex items-center space-x-2 text-gray-300 mb-3">
                  <Users size={18} className="text-cyan-400" />
                  <span>Number of People</span>
                </label>
                
                <div className="space-y-3">
                  {/* People Counter */}
                  <div className="flex items-center justify-between bg-slate-800/50 border border-cyan-500/30 rounded-lg p-3">
                    <button
                      type="button"
                      onClick={() => handlePeopleChange(formData.peopleCount - 1)}
                      disabled={formData.peopleCount <= 4} // FIXED: Removed comment inside JSX
                      className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-all"
                    >
                      -
                    </button>
                    
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">{formData.peopleCount}</div>
                      <div className="text-xs text-gray-400">people</div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handlePeopleChange(formData.peopleCount + 1)}
                      disabled={formData.peopleCount >= capacity.max}
                      className="w-8 h-8 bg-cyan-500/20 border border-cyan-500/50 rounded-full flex items-center justify-center text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-all"
                    >
                      +
                    </button>
                  </div>

                  {/* Capacity Info */}
                  <div className="text-center text-sm text-gray-400">
                    Capacity: 4 - {capacity.max} people {/* Updated to 4 */}
                  </div>

                  {/* Price Display */}
                  <div className="bg-slate-800/30 border border-green-500/30 rounded-lg p-3">
                    <div className="flex items-center justify-between text-white">
                      <span className="text-sm">Total Amount:</span>
                      <div className="flex items-center space-x-1">
                        <IndianRupee size={16} className="text-green-400" />
                        <span className="text-xl font-bold text-green-400">{totalPrice}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 text-center mt-1">
                      ₹{pricePerPerson} per person × {formData.peopleCount} people
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Refund Policy */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle size={18} className="text-orange-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-orange-300">
                    <strong>Booking & Refund Policy:</strong> 
                    <ul className="mt-1 space-y-1 text-orange-200/80">
                      <li>• ✅ Full refund if cancelled 24+ hours before</li>
                      <li>• ❌ No refund within 24 hours of booking</li>
                      <li>• 🌧️ Rain checks for weather issues</li>
                      <li>• 🏏 Equipment charges for damages</li>
                      <li>• ⏰ Minimum 4 people required</li>
                    </ul>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send WhatsApp Enquiry</span>
              </motion.button>
            </form>

            <p className="text-gray-500 text-xs text-center mt-4">
              You'll be redirected to WhatsApp to complete your booking
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}