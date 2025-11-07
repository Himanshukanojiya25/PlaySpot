import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, IndianRupee, Clock, Star, CheckCircle, Calendar, Users, Shield, AlertCircle, Plus, Minus, Wifi, Car, Utensils, Dumbbell } from 'lucide-react';
import { useState, useEffect } from 'react';
import turfsData from '../data/turfs.json';

interface TurfDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  turfId: string | null;
  onBookNow: (peopleCount: number) => void;
}

interface EquipmentStatus {
  available: number;
  total: number;
  status: "red" | "orange" | "green";
  estimatedTime: string;
}

export default function TurfDetails({ isOpen, onClose, turfId, onBookNow }: TurfDetailsProps) {
  const turf = turfsData.find((t) => t.id === turfId);
  const [peopleCount, setPeopleCount] = useState(turf?.capacity?.recommended || 4);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!turf) return null;

  const totalPrice = peopleCount * turf.pricePerPerson;

  const handlePeopleChange = (count: number) => {
    if (count >= 4 && count <= turf.capacity.max) {
      setPeopleCount(count);
    }
  };

  const handleBookNow = () => {
    onBookNow(peopleCount);
  };

  const handleClose = () => {
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'green': return 'bg-green-500';
      case 'orange': return 'bg-orange-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'green': return 'Available';
      case 'orange': return 'Limited';
      case 'red': return 'Out of Stock';
      default: return 'Unknown';
    }
  };

  const getFacilityIcon = (facility: string) => {
    if (facility.includes('WiFi') || facility.includes('Wifi')) return <Wifi size={16} />;
    if (facility.includes('Parking')) return <Car size={16} />;
    if (facility.includes('Food') || facility.includes('Cafeteria') || facility.includes('Snack')) return <Utensils size={16} />;
    if (facility.includes('Gym')) return <Dumbbell size={16} />;
    return <CheckCircle size={16} />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 flex flex-col"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-slate-950/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-cyan-500/30"
            >
              <X size={24} />
            </motion.button>

            {/* Header Section */}
            <div className="relative h-80 flex-shrink-0 overflow-hidden">
              <img
                src={turf.image}
                alt={turf.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl sm:text-4xl font-bold text-white mb-2"
                >
                  {turf.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-cyan-400 text-lg italic"
                >
                  {turf.tagline}
                </motion.p>
              </div>

              {/* Equipment Status Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute top-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-2 ${
                  turf.equipment.bats.status === 'green' && turf.equipment.balls.status === 'green' 
                    ? 'bg-green-500/90' 
                    : turf.equipment.bats.status === 'red' || turf.equipment.balls.status === 'red'
                    ? 'bg-red-500/90'
                    : 'bg-orange-500/90'
                }`}
              >
                <Shield size={16} className="text-white" />
                <span className="text-white font-semibold text-sm">Equipment Available</span>
              </motion.div>

              <div className="absolute top-4 right-16 flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            {/* Content Section - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                  >
                    <MapPin className="text-cyan-400 mt-0.5" size={20} />
                    <div className="min-w-0">
                      <div className="text-gray-400 text-xs mb-1">Location</div>
                      <div className="text-white font-semibold text-sm truncate">{turf.location}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                  >
                    <IndianRupee className="text-cyan-400 mt-0.5" size={20} />
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Pricing</div>
                      <div className="text-white font-semibold text-sm">{turf.pricing}</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3"
                  >
                    <Users className="text-cyan-400 mt-0.5" size={20} />
                    <div>
                      <div className="text-gray-400 text-xs mb-1">Capacity</div>
                      <div className="text-white font-semibold text-sm">
                        {turf.capacity.min}-{turf.capacity.max} people
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* People Selector Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Users className="text-cyan-400 mr-2" size={20} />
                    Select Group Size
                  </h3>
                  
                  <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-4">
                    {/* Quick Select Options */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {[
                        { label: 'Small', count: 4, description: 'Min' },
                        { label: 'Recommended', count: turf.capacity.recommended, description: 'Ideal' },
                        { label: 'Large', count: turf.capacity.max, description: 'Max' }
                      ].map((option, index) => (
                        <motion.button
                          key={option.label}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handlePeopleChange(option.count)}
                          className={`p-3 rounded-lg border-2 text-center transition-all ${
                            peopleCount === option.count
                              ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/50'
                              : 'bg-slate-700/50 border-cyan-500/30 text-gray-300 hover:border-cyan-500'
                          }`}
                        >
                          <div className="text-lg font-bold mb-1">{option.count}</div>
                          <div className="text-xs font-medium">{option.label}</div>
                          <div className="text-xs opacity-70">{option.description}</div>
                        </motion.button>
                      ))}
                    </div>

                    {/* Manual Counter */}
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-gray-400 text-xs">Custom Group Size</div>
                        <div className="text-white text-sm">
                          Min: 4 • Max: {turf.capacity.max}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handlePeopleChange(peopleCount - 1)}
                          disabled={peopleCount <= 4}
                          className="w-10 h-10 bg-cyan-500/20 border-2 border-cyan-500/50 rounded-full flex items-center justify-center text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-all"
                        >
                          <Minus size={16} />
                        </button>
                        
                        <div className="text-center min-w-[60px]">
                          <div className="text-2xl font-bold text-white">{peopleCount}</div>
                          <div className="text-gray-400 text-xs">people</div>
                        </div>
                        
                        <button
                          onClick={() => handlePeopleChange(peopleCount + 1)}
                          disabled={peopleCount >= turf.capacity.max}
                          className="w-10 h-10 bg-cyan-500/20 border-2 border-cyan-500/50 rounded-full flex items-center justify-center text-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cyan-500/30 transition-all"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Price Calculation */}
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs opacity-90">Total Amount</div>
                          <div className="text-xl font-bold">₹{totalPrice}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs">
                            ₹{turf.pricePerPerson} × {peopleCount} people
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Advanced Equipment Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Shield className="text-cyan-400 mr-2" size={20} />
                    Equipment Availability
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Bats Availability */}
                    <div className={`p-4 rounded-lg border ${
                      turf.equipment.bats.status === 'green' 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : turf.equipment.bats.status === 'orange'
                        ? 'bg-orange-500/10 border-orange-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(turf.equipment.bats.status)}`}></div>
                          <span className="text-white font-semibold">Cricket Bats</span>
                        </div>
                        <span className={`text-sm font-medium ${
                          turf.equipment.bats.status === 'green' ? 'text-green-400' :
                          turf.equipment.bats.status === 'orange' ? 'text-orange-400' : 'text-red-400'
                        }`}>
                          {getStatusText(turf.equipment.bats.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 mb-1">
                        Available: {turf.equipment.bats.available}/{turf.equipment.bats.total}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center space-x-1">
                        <Clock size={12} />
                        <span>Ready in: {turf.equipment.bats.estimatedTime}</span>
                      </div>
                    </div>

                    {/* Balls Availability */}
                    <div className={`p-4 rounded-lg border ${
                      turf.equipment.balls.status === 'green' 
                        ? 'bg-green-500/10 border-green-500/30' 
                        : turf.equipment.balls.status === 'orange'
                        ? 'bg-orange-500/10 border-orange-500/30'
                        : 'bg-red-500/10 border-red-500/30'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(turf.equipment.balls.status)}`}></div>
                          <span className="text-white font-semibold">Sports Balls</span>
                        </div>
                        <span className={`text-sm font-medium ${
                          turf.equipment.balls.status === 'green' ? 'text-green-400' :
                          turf.equipment.balls.status === 'orange' ? 'text-orange-400' : 'text-red-400'
                        }`}>
                          {getStatusText(turf.equipment.balls.status)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300 mb-1">
                        Available: {turf.equipment.balls.available}/{turf.equipment.balls.total}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center space-x-1">
                        <Clock size={12} />
                        <span>Ready in: {turf.equipment.balls.estimatedTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Other Equipment */}
                  <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4">
                    <h4 className="text-white font-semibold mb-3">Additional Equipment</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-cyan-400 font-bold text-lg">{turf.equipment.other.stumps}</div>
                        <div className="text-gray-400 text-xs">Stumps</div>
                      </div>
                      <div>
                        <div className="text-cyan-400 font-bold text-lg">{turf.equipment.other.goalPosts}</div>
                        <div className="text-gray-400 text-xs">Goal Posts</div>
                      </div>
                      <div>
                        <div className="text-cyan-400 font-bold text-lg">{turf.equipment.other.protectiveGear}</div>
                        <div className="text-gray-400 text-xs">Protective Gear</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* About Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3">About This Turf</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{turf.description}</p>
                </motion.div>

                {/* Features Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    <CheckCircle className="text-cyan-400 mr-2" size={20} />
                    Features & Amenities
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {turf.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center space-x-2 bg-slate-800/50 border border-cyan-500/20 rounded-lg p-2"
                      >
                        <CheckCircle size={14} className="text-cyan-400" />
                        <span className="text-gray-300 text-xs">{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Additional Facilities */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3">Additional Facilities</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {turf.facilities?.map((facility) => (
                      <div
                        key={facility}
                        className="flex items-center space-x-2 bg-slate-800/30 border border-cyan-500/10 rounded-lg p-2"
                      >
                        {getFacilityIcon(facility)}
                        <span className="text-gray-300 text-xs">{facility}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Sports Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3">Sports Available</h3>
                  <div className="flex flex-wrap gap-2">
                    {turf.sports.map((sport) => (
                      <span
                        key={sport}
                        className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 rounded-full text-cyan-400 text-xs font-medium"
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Refund Policy Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                    <AlertCircle className="text-cyan-400 mr-2" size={20} />
                    Booking Policies
                  </h3>
                  <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-green-400 text-sm">
                          <strong>Full Refund:</strong> Available if cancelled 24+ hours before booking time
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-red-400 text-sm">
                          <strong>No Refund:</strong> Within 24 hours of booking time
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-orange-400 text-sm">
                          <strong>Rain Checks:</strong> Available for weather-related cancellations
                        </div>
                      </div>
                      <div className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="text-blue-400 text-sm">
                          <strong>Equipment Damage:</strong> Charges apply for damaged equipment
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBookNow}
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                  >
                    Book for {peopleCount} People - ₹{totalPrice}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white font-bold text-sm backdrop-blur-sm hover:bg-slate-800 transition-all"
                  >
                    Contact Us
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}