import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, IndianRupee, Clock, Star, CheckCircle, Calendar, Users, Shield, AlertCircle } from 'lucide-react';
import turfsData from '../data/turfs.json';

interface TurfDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  turfId: string | null;
  onBookNow: () => void;
}

export default function TurfDetails({ isOpen, onClose, turfId, onBookNow }: TurfDetailsProps) {
  const turf = turfsData.find((t) => t.id === turfId);

  if (!turf) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 my-8"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-slate-950/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-cyan-500/30"
            >
              <X size={24} />
            </motion.button>

            <div className="relative h-96 overflow-hidden">
              <img
                src={turf.image}
                alt={turf.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl font-bold text-white mb-2"
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

              {/* Equipment Available Badge */}
              {turf.equipmentAvailable && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-8 left-8 bg-green-500/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <Shield size={20} className="text-white" />
                  <span className="text-white font-semibold text-sm">Bats & Balls Available</span>
                </motion.div>
              )}

              <div className="absolute top-8 right-8 flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
                >
                  <MapPin className="text-cyan-400 mt-1" size={24} />
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Location</div>
                    <div className="text-white font-semibold">{turf.location}</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
                >
                  <IndianRupee className="text-cyan-400 mt-1" size={24} />
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Pricing</div>
                    <div className="text-white font-semibold">{turf.pricing}</div>
                    <div className="text-gray-500 text-xs">per person</div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4"
                >
                  <Users className="text-cyan-400 mt-1" size={24} />
                  <div>
                    <div className="text-gray-400 text-sm mb-1">Capacity</div>
                    <div className="text-white font-semibold">
                      {turf.capacity.min}-{turf.capacity.max} people
                    </div>
                    <div className="text-gray-500 text-xs">Recommended: {turf.capacity.recommended}</div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">About This Turf</h3>
                <p className="text-gray-400 leading-relaxed">{turf.description}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <CheckCircle className="text-cyan-400 mr-2" size={24} />
                  Features & Amenities
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {turf.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-2 bg-slate-800/50 border border-cyan-500/20 rounded-lg p-3"
                    >
                      <CheckCircle size={16} className="text-cyan-400" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4">Sports Available</h3>
                <div className="flex flex-wrap gap-3">
                  {turf.sports.map((sport) => (
                    <span
                      key={sport}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/40 rounded-full text-cyan-400 font-medium"
                    >
                      {sport}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Equipment Availability Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Shield className="text-cyan-400 mr-2" size={24} />
                  Equipment Information
                </h3>
                <div className={`p-4 rounded-lg border ${
                  turf.equipmentAvailable 
                    ? 'bg-green-500/10 border-green-500/30' 
                    : 'bg-orange-500/10 border-orange-500/30'
                }`}>
                  <div className="flex items-center space-x-3">
                    {turf.equipmentAvailable ? (
                      <>
                        <CheckCircle className="text-green-400" size={24} />
                        <div>
                          <div className="text-green-400 font-semibold">Equipment Provided</div>
                          <div className="text-green-300 text-sm">Bats and balls are available at no extra cost</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="text-orange-400" size={24} />
                        <div>
                          <div className="text-orange-400 font-semibold">Bring Your Own Equipment</div>
                          <div className="text-orange-300 text-sm">Please bring your own bats and balls</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Booking Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                  <Calendar className="text-cyan-400 mr-2" size={24} />
                  Booking Information
                </h3>
                <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Pricing Details</h4>
                      <div className="space-y-2 text-gray-300">
                        <div className="flex justify-between">
                          <span>Price per person:</span>
                          <span className="text-cyan-400">₹{turf.pricePerPerson}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Group size:</span>
                          <span>{turf.capacity.min}-{turf.capacity.max} people</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Recommended:</span>
                          <span>{turf.capacity.recommended} people</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-3">Availability</h4>
                      <div className="space-y-2 text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Clock size={16} className="text-cyan-400" />
                          <span>Open 6:00 AM - 11:00 PM</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-cyan-400" />
                          <span>7 days a week</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onBookNow}
                  className="flex-1 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                >
                  Book Now
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-4 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white font-bold text-lg backdrop-blur-sm hover:bg-slate-800 transition-all"
                >
                  Contact Us
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}