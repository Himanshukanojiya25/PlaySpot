import { motion } from 'framer-motion';
import { MapPin, IndianRupee, Users, Shield } from 'lucide-react';

interface TurfCardProps {
  turf: {
    id: string;
    name: string;
    tagline: string;
    image: string;
    location: string;
    pricing: string;
    pricePerPerson: number;
    capacity: {
      min: number;
      max: number;
      recommended: number;
    };
    sports: string[];
    equipmentAvailable: boolean;
  };
  onClick: () => void;
  index: number;
}

export default function TurfCard({ turf, onClick, index }: TurfCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={turf.image}
            alt={turf.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />

          {/* Pricing Badge */}
          <motion.div
            className="absolute top-4 right-4 bg-cyan-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1"
            whileHover={{ scale: 1.1 }}
          >
            <IndianRupee size={14} className="text-white" />
            <span className="text-white font-semibold text-sm">{turf.pricing.replace('₹', '')}</span>
          </motion.div>

          {/* Equipment Available Badge */}
          {turf.equipmentAvailable && (
            <motion.div
              className="absolute top-4 left-4 bg-green-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1"
              whileHover={{ scale: 1.1 }}
            >
              <Shield size={14} className="text-white" />
              <span className="text-white font-semibold text-sm">Bats & Balls</span>
            </motion.div>
          )}
        </div>

        <div className="relative p-6">
          <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {turf.name}
          </h3>
          <p className="text-cyan-400 text-sm mb-3 italic">{turf.tagline}</p>

          {/* Location */}
          <div className="flex items-center space-x-2 text-gray-400 mb-3">
            <MapPin size={16} />
            <span className="text-sm">{turf.location}</span>
          </div>

          {/* People Capacity */}
          <div className="flex items-center space-x-2 text-gray-300 mb-4">
            <Users size={16} className="text-cyan-400" />
            <span className="text-sm">
              {turf.capacity.min}-{turf.capacity.max} people • Recommended: {turf.capacity.recommended}
            </span>
          </div>

          {/* Sports Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {turf.sports.map((sport) => (
              <span
                key={sport}
                className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-medium"
              >
                {sport}
              </span>
            ))}
          </div>

          {/* Equipment Availability Note */}
          {!turf.equipmentAvailable && (
            <div className="mb-3">
              <span className="text-orange-400 text-xs bg-orange-500/10 px-2 py-1 rounded border border-orange-500/30">
                ⚠️ Bring your own equipment
              </span>
            </div>
          )}

          <motion.div
            className="mt-2 w-full py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white text-center font-semibold opacity-0 group-hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.05 }}
          >
            View Details
          </motion.div>
        </div>

        <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-all duration-500" />
      </div>
    </motion.div>
  );
}