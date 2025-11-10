import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Tag } from 'lucide-react';
import { Coupon, formatCurrency } from '../utils/couponValidation';

interface CouponDisplayProps {
  appliedCoupon: Coupon;
  discountAmount: number;
  originalAmount: number;
  finalAmount: number;
  onRemove: () => void;
}

const CouponDisplay: React.FC<CouponDisplayProps> = ({
  appliedCoupon,
  discountAmount,
  originalAmount,
  finalAmount,
  onRemove
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-green-500 rounded-full p-1">
            <CheckCircle size={20} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-green-600" />
              <span className="font-semibold text-green-800">{appliedCoupon.code}</span>
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                {appliedCoupon.discountType === 'fixed' 
                  ? `${formatCurrency(appliedCoupon.discountValue)} off`
                  : `${appliedCoupon.discountValue}% off`
                }
              </span>
            </div>
            <p className="text-sm text-green-700 mt-1">{appliedCoupon.description}</p>
          </div>
        </div>
        
        <button
          onClick={onRemove}
          className="text-gray-500 hover:text-red-500 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-3 pt-3 border-t border-green-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Original Amount:</span>
          <span className="text-gray-800">{formatCurrency(originalAmount)}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-green-600">Discount Applied:</span>
          <span className="text-green-600 font-semibold">-{formatCurrency(discountAmount)}</span>
        </div>
        <div className="flex justify-between text-base mt-2 pt-2 border-t border-green-200">
          <span className="font-semibold text-gray-800">Final Amount:</span>
          <span className="font-bold text-green-700">{formatCurrency(finalAmount)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CouponDisplay;