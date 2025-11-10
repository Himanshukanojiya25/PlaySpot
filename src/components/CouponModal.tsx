// src/components/CouponModal.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag, CheckCircle, XCircle, Clock, Calendar, Zap, RefreshCw } from 'lucide-react';
import { Coupon, CouponValidator, ValidationResult, formatCurrency } from '../utils/couponValidation';
import { showSuccessToast, showInfoToast } from '../utils/toast';

interface CouponModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (result: ValidationResult) => void;
  totalAmount: number;
  selectedDate?: Date;
}

const CouponModal: React.FC<CouponModalProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
  totalAmount,
  selectedDate
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [availableCoupons, setAvailableCoupons] = useState<Coupon[]>([]);
  const [bestCoupon, setBestCoupon] = useState<ValidationResult | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadCoupons = () => {
    const available = CouponValidator.getAvailableCoupons(totalAmount);
    setAvailableCoupons(available);
    
    const best = CouponValidator.getBestCoupon(totalAmount, selectedDate);
    setBestCoupon(best);
  };

  useEffect(() => {
    if (isOpen) {
      loadCoupons();
    }
  }, [isOpen, totalAmount, selectedDate]);

  const handleRefresh = () => {
    setRefreshing(true);
    CouponValidator.forceGenerateCoupons();
    
    setTimeout(() => {
      loadCoupons();
      setRefreshing(false);
      showInfoToast('🔄 Coupons refreshed! New offers available.');
    }, 1000);
  };

  const handleValidate = () => {
    if (!couponCode.trim()) {
      setValidationResult({
        isValid: false,
        message: 'Please enter a coupon code'
      });
      return;
    }

    const result = CouponValidator.validateCoupon(couponCode, totalAmount, selectedDate);
    setValidationResult(result);
  };

  const handleApply = () => {
    if (validationResult?.isValid && validationResult.coupon) {
      CouponValidator.applyCoupon(validationResult.coupon.code);
      onApplyCoupon(validationResult);
      showSuccessToast(`🎉 ${validationResult.coupon.code} applied! Saved ${formatCurrency(validationResult.discountAmount || 0)}`);
      onClose();
      setCouponCode('');
      setValidationResult(null);
    }
  };

  const handleApplyBestCoupon = () => {
    if (bestCoupon?.isValid && bestCoupon.coupon) {
      CouponValidator.applyCoupon(bestCoupon.coupon.code);
      onApplyCoupon(bestCoupon);
      showSuccessToast(`⚡ Best offer applied! Saved ${formatCurrency(bestCoupon.discountAmount || 0)}`);
      onClose();
    }
  };

  const getDayNames = (days: string[]) => {
    return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ');
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'flash': return 'from-red-500 to-pink-600';
      case 'welcome': return 'from-green-500 to-emerald-600';
      case 'weekend': return 'from-purple-500 to-indigo-600';
      case 'seasonal': return 'from-orange-500 to-amber-600';
      case 'referral': return 'from-blue-500 to-cyan-600';
      default: return 'from-cyan-500 to-blue-600';
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'flash': return '⚡';
      case 'welcome': return '👋';
      case 'weekend': return '🎉';
      case 'seasonal': return '🎊';
      case 'referral': return '🤝';
      default: return '🎁';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Tag size={24} />
                <div>
                  <h2 className="text-xl font-bold">Apply Coupon</h2>
                  <p className="text-cyan-100 text-sm">Save more on your booking</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Refresh Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className={`p-2 bg-white/20 rounded-lg transition-all ${
                    refreshing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'
                  }`}
                  title="Refresh offers"
                >
                  <motion.div
                    animate={{ rotate: refreshing ? 360 : 0 }}
                    transition={{ duration: 1, repeat: refreshing ? Infinity : 0 }}
                  >
                    <RefreshCw size={16} />
                  </motion.div>
                </motion.button>

                <button
                  onClick={onClose}
                  className="text-white hover:text-cyan-100 transition-colors p-2"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Best Offer Auto-apply */}
            {bestCoupon?.isValid && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg text-white"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={20} className="text-white" />
                  <span className="font-bold">Best Offer Available!</span>
                </div>
                <p className="text-sm mb-3">
                  Apply <strong>{bestCoupon.coupon?.code}</strong> and save{' '}
                  <strong>{formatCurrency(bestCoupon.discountAmount || 0)}</strong>
                </p>
                <button
                  onClick={handleApplyBestCoupon}
                  className="w-full py-2 bg-white text-orange-600 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  ⚡ Apply Best Offer
                </button>
              </motion.div>
            )}

            {/* Auto-refresh Info */}
            <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <RefreshCw size={14} className="text-blue-500" />
                  <span className="text-blue-700">Offers refresh automatically</span>
                </div>
                <button
                  onClick={handleRefresh}
                  className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center gap-1"
                >
                  <RefreshCw size={12} />
                  Refresh Now
                </button>
              </div>
            </div>

            {/* Total Savings Display */}
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-green-700">Total Savings with Coupons:</span>
                <span className="font-bold text-green-800">
                  {formatCurrency(CouponValidator.getTotalSavings())}
                </span>
              </div>
            </div>

            {/* Coupon Input Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="e.g., WELCOME100"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent uppercase font-semibold"
                />
                <button
                  onClick={handleValidate}
                  className="px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors font-semibold"
                >
                  Apply
                </button>
              </div>

              {/* Validation Result */}
              <AnimatePresence>
                {validationResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`mt-3 p-3 rounded-lg ${
                      validationResult.isValid
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {validationResult.isValid ? (
                        <CheckCircle size={20} className="text-green-500" />
                      ) : (
                        <XCircle size={20} className="text-red-500" />
                      )}
                      <span
                        className={
                          validationResult.isValid ? 'text-green-700' : 'text-red-700'
                        }
                      >
                        {validationResult.message}
                      </span>
                    </div>
                    
                    {validationResult.isValid && validationResult.discountAmount && (
                      <div className="mt-2 text-sm text-green-600">
                        You save {formatCurrency(validationResult.discountAmount)}! 
                        Final amount: <strong>{formatCurrency(validationResult.finalAmount!)}</strong>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {validationResult?.isValid && validationResult.coupon && (
                <motion.button
                  onClick={handleApply}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold shadow-lg shadow-green-500/30"
                >
                  🎉 Use {validationResult.coupon.code} Coupon
                </motion.button>
              )}
            </div>

            {/* Available Coupons */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Available Offers ({availableCoupons.length})
                </h3>
                
                {availableCoupons.length > 0 && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    <span>Auto-refresh in 1 hour</span>
                  </div>
                )}
              </div>
              
              {availableCoupons.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Tag size={48} className="mx-auto mb-3 text-gray-300" />
                  <p>No coupons available for this booking</p>
                  <p className="text-sm mt-2">Try increasing your booking amount</p>
                  
                  <button
                    onClick={handleRefresh}
                    className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors text-sm font-medium"
                  >
                    Generate New Offers
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {availableCoupons.map((coupon, index) => (
                    <motion.div
                      key={coupon.code}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`border rounded-lg p-4 cursor-pointer transition-all hover:scale-[1.02] ${
                        bestCoupon?.coupon?.code === coupon.code
                          ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-cyan-300'
                      }`}
                      onClick={() => {
                        setCouponCode(coupon.code);
                        handleValidate();
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{getCategoryIcon(coupon.category)}</span>
                          <span className="font-bold text-gray-800">{coupon.code}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            coupon.discountType === 'fixed' 
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {coupon.discountType === 'fixed' 
                              ? `${formatCurrency(coupon.discountValue)} OFF`
                              : `${coupon.discountValue}% OFF`
                            }
                          </span>
                          {bestCoupon?.coupon?.code === coupon.code && (
                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded border border-yellow-300">
                              ⚡ BEST
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={12} />
                          <span>{coupon.usageLimit - coupon.usedCount} left</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">{coupon.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar size={12} />
                          <span>Valid on: {getDayNames(coupon.applicableDays)}</span>
                        </div>
                        {coupon.minAmount > 0 && (
                          <span>Min. {formatCurrency(coupon.minAmount)}</span>
                        )}
                      </div>

                      {/* Validity Period */}
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Valid until:</span>
                          <span>{new Date(coupon.validUntil).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CouponModal;