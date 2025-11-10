import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Zap } from 'lucide-react';
import { CouponValidator } from '../utils/couponValidation';

interface CouponRefreshButtonProps {
  onRefresh?: () => void;
}

const CouponRefreshButton: React.FC<CouponRefreshButtonProps> = ({ onRefresh }) => {
  const handleRefresh = () => {
    CouponValidator.forceGenerateCoupons();
    if (onRefresh) {
      onRefresh();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleRefresh}
      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-semibold text-sm flex items-center space-x-2 hover:from-purple-600 hover:to-pink-700 transition-all"
    >
      <RefreshCw size={16} />
      <span>Refresh Offers</span>
      <Zap size={14} className="text-yellow-300" />
    </motion.button>
  );
};

export default CouponRefreshButton;