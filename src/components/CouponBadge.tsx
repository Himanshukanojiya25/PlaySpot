// src/components/CouponBadge.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Tag, Zap } from 'lucide-react';
import { CouponValidator } from '../utils/couponValidation';
interface CouponBadgeProps {
  availableCoupons: number;
  onOpenModal: () => void;
  totalAmount: number;
}

const CouponBadge: React.FC<CouponBadgeProps> = ({ 
  availableCoupons, 
  onOpenModal,
  totalAmount 
}) => {
  if (availableCoupons === 0) return null;

  const totalSavings = CouponValidator.getTotalSavings();
  const hasSavings = totalSavings > 0;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      className="fixed top-24 right-4 z-40"
    >
      <button
        onClick={onOpenModal}
        className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-3 rounded-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 flex items-center gap-2 group relative overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 flex items-center gap-2">
          <Tag size={18} className="group-hover:scale-110 transition-transform" />
          <div className="text-left">
            <div className="font-bold text-sm flex items-center gap-1">
              {availableCoupons} Offers Available
              <Zap size={14} className="text-yellow-300" />
            </div>
            <div className="text-xs opacity-90">Tap to save more</div>
          </div>
        </div>
        
        <motion.div
          animate={{ x: [0, 5, 0], y: [0, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-xs relative z-10"
        >
          🎁
        </motion.div>

        {/* Total Savings Badge */}
        {hasSavings && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg"
          >
            Saved ₹{totalSavings}
          </motion.div>
        )}
      </button>
    </motion.div>
  );
};

export default CouponBadge;