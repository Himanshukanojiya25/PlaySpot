// src/components/BookingModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, Phone, Send, IndianRupee, AlertCircle, Shield, Check, FileText, Clock, Crown, Tag, Zap } from 'lucide-react';
import PopularTimeSlots from './PopularTimeSlots';
import TermsModal from './TermsModal';
import CouponModal from './CouponModal';
import CouponDisplay from './CouponDisplay';
import ExtensionPenaltyModal from './ExtensionPenaltyModal';
import { ValidationResult, Coupon, CouponValidator } from '../utils/couponValidation';
import { showInfoToast } from '../utils/toast';

interface MembershipPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  duration: string;
  benefits: string[];
  popular: boolean;
  sessions: number;
  savings: string;
  icon: React.ReactNode;
  color: string;
}

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
    extension?: {
      available: boolean;
      baseHourlyRate: number;
      minExtension: number;
      maxExtension: number;
      peakHours: string[];
      peakSurcharge: number;
      weekendSurcharge: number;
    };
    damagePolicy?: {
      requiresDeposit: boolean;
      depositAmount: number;
      damageChargesApply: boolean;
    };
  };
  membershipPlan?: MembershipPlan;
}

export default function BookingModal({ isOpen, onClose, turf, membershipPlan }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    peopleCount: turf?.capacity?.recommended || 4,
    timeSlot: ''
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  // Coupon State Management
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [showCouponModal, setShowCouponModal] = useState<boolean>(false);
  const [isBestOffer, setIsBestOffer] = useState<boolean>(false);

  // Extension & Penalty State
  const [showExtensionModal, setShowExtensionModal] = useState<boolean>(false);
  const [extensionData, setExtensionData] = useState<any>(null);

  // Safe calculations with defaults
  const capacity = turf?.capacity || { min: 4, max: 20, recommended: 10 };
  const pricePerPerson = turf?.pricePerPerson || 200;
  const turfName = turf?.name || 'Turf';
  const totalPrice = formData.peopleCount * pricePerPerson;
  const basePrice = membershipPlan ? membershipPlan.price : totalPrice;
  
  // Calculate final price with coupon discount and extension charges
  const extensionCharges = extensionData?.extensionCost || 0;
  const damageCharges = extensionData?.totalDamageCost || 0;
  const totalAdditionalCharges = extensionCharges + damageCharges;
  const finalPrice = Math.max(0, basePrice - discountAmount + totalAdditionalCharges);

  // Handle coupon application
  const handleApplyCoupon = (result: ValidationResult) => {
    if (result.isValid && result.coupon && result.discountAmount !== undefined) {
      setAppliedCoupon(result.coupon);
      setDiscountAmount(result.discountAmount);
      
      // Check if this is the best offer
      const bestCoupon = CouponValidator.getBestCoupon(basePrice, formData.date ? new Date(formData.date) : undefined);
      setIsBestOffer(bestCoupon?.coupon?.code === result.coupon.code);
      
      showInfoToast(`🎉 ${result.coupon.code} applied! You saved ₹${result.discountAmount}`);
    }
  };

  // Handle coupon removal
  const handleRemoveCoupon = () => {
    if (appliedCoupon) {
      CouponValidator.removeCoupon(appliedCoupon.code);
      setAppliedCoupon(null);
      setDiscountAmount(0);
      setIsBestOffer(false);
      showInfoToast(`❌ ${appliedCoupon.code} removed`);
    }
  };

  // Handle extension data
  const handleExtensionConfirm = (data: any) => {
    setExtensionData(data);
    showInfoToast(`⏰ Extension & damage charges added: ₹${data.extensionCost + data.totalDamageCost}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptedTerms) {
      alert('Please accept the Terms & Conditions to proceed with booking.');
      return;
    }

    if (!formData.timeSlot) {
      alert('Please select a time slot for your booking.');
      return;
    }

    const equipmentInfo = turf?.equipment ? 
      `%0A🏏 *Equipment Status:*%0ABats: ${turf.equipment.bats.available}/${turf.equipment.bats.total} (${turf.equipment.bats.status})%0ABalls: ${turf.equipment.balls.available}/${turf.equipment.balls.total} (${turf.equipment.balls.status})` 
      : '';

    // Membership info
    const membershipInfo = membershipPlan ? 
      `%0A%0A👑 *MEMBERSHIP BOOKING*%0A📦 Plan: ${membershipPlan.name}%0A💰 Price: ₹${membershipPlan.price}%0A⏱️ Duration: ${membershipPlan.duration}%0A🎯 Sessions: ${membershipPlan.sessions}%0A💎 Savings: ${membershipPlan.savings}` 
      : '';

    // Coupon info
    const couponInfo = appliedCoupon ? 
      `%0A%0A🎫 *COUPON APPLIED*%0A🏷️ Code: ${appliedCoupon.code}%0A💰 Discount: -₹${discountAmount}%0A🎁 Type: ${appliedCoupon.discountType === 'fixed' ? 'Fixed' : 'Percentage'}%0A💸 You Saved: ₹${discountAmount}` 
      : '';

    // Extension & Damage info
    const extensionInfo = extensionData ? 
      `%0A%0A⏰ *EXTENSION & DAMAGE CHARGES*%0A🕒 Extension: ${extensionData.extensionHours} hour(s)%0A💰 Extension Cost: ₹${extensionData.extensionCost}%0A🏏 Damage Charges: ₹${extensionData.totalDamageCost}%0A💸 Total Additional: ₹${extensionData.extensionCost + extensionData.totalDamageCost}` 
      : '';

    const bookingType = membershipPlan ? 'Membership' : 'Regular';

    const message = `Hi! I would like to book *${turfName}*%0A%0A📋 *${bookingType} Booking Details:*%0A👤 Name: ${formData.name}%0A📞 Phone: ${formData.phone}%0A📅 Date: ${formData.date}%0A⏰ Time: ${formData.timeSlot}%0A👥 People: ${formData.peopleCount}%0A💰 Total: ₹${finalPrice}${equipmentInfo}${membershipInfo}${couponInfo}${extensionInfo}%0A%0A${membershipPlan ? `_${membershipPlan.sessions} sessions • ${membershipPlan.duration}_` : `_Booking for ${formData.peopleCount} people at ₹${pricePerPerson}/person_`}%0A%0A✅ *Terms & Conditions Accepted*`;

    window.open(`https://wa.me/919322663114?text=${message}`, '_blank');

    // Reset form
    setFormData({ 
      name: '', 
      phone: '', 
      date: '', 
      peopleCount: capacity.recommended,
      timeSlot: ''
    });
    setAcceptedTerms(false);
    setAppliedCoupon(null);
    setDiscountAmount(0);
    setExtensionData(null);
    setIsBestOffer(false);
    onClose();
  };

  const handlePeopleChange = (count: number) => {
    if (count >= 4 && count <= capacity.max) {
      setFormData({ ...formData, peopleCount: count });
      // Reset coupon when people count changes
      if (appliedCoupon) {
        handleRemoveCoupon();
      }
    }
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setFormData({ ...formData, timeSlot });
  };

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
    setShowTermsModal(false);
  };

  const canExtend = turf?.extension?.available && formData.timeSlot && formData.date;

  return (
    <>
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
              className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 max-h-[90vh] overflow-y-auto"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              >
                <X size={24} />
              </motion.button>

              <div className="mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent mb-2">
                  {membershipPlan ? 'Book Membership' : 'Book Your Session'}
                </h2>
                <p className="text-gray-400">
                  {membershipPlan ? `Reserve ${membershipPlan.name} Plan` : `Reserve ${turfName}`}
                </p>
              </div>

              {/* Membership Plan Display */}
              {membershipPlan && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${membershipPlan.color} flex items-center justify-center text-white`}>
                      {membershipPlan.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{membershipPlan.name}</h3>
                      <p className="text-yellow-400 text-sm">
                        ₹{membershipPlan.price} • {membershipPlan.sessions} sessions • {membershipPlan.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">₹{membershipPlan.price}</div>
                      <div className="text-yellow-300 text-xs">{membershipPlan.savings}</div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Booking Form */}
                <div className="space-y-4">
                  {/* Equipment Status in Booking */}
                  {turf?.equipment && (
                    <div className="p-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg">
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

                  {/* Extension Availability Badge */}
                  {turf?.extension?.available && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Zap size={16} className="text-purple-400" />
                          <span className="text-white font-semibold text-sm">Time Extension Available</span>
                        </div>
                        <div className="text-purple-400 text-xs">
                          ₹{turf.extension.baseHourlyRate}/hour
                        </div>
                      </div>
                      <p className="text-gray-400 text-xs mt-1">
                        Extend your session during or after booking
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form fields remain same */}
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

                    {/* Selected Time Slot Display */}
                    {formData.timeSlot && (
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center space-x-2 text-green-400">
                          <Clock size={16} />
                          <span className="font-semibold">Selected Time:</span>
                          <span>{formData.timeSlot}</span>
                        </div>
                      </div>
                    )}

                    {/* People Selector - Only show for regular booking */}
                    {!membershipPlan && (
                      <div>
                        <label className="flex items-center space-x-2 text-gray-300 mb-3">
                          <Users size={18} className="text-cyan-400" />
                          <span>Number of People</span>
                        </label>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between bg-slate-800/50 border border-cyan-500/30 rounded-lg p-3">
                            <button
                              type="button"
                              onClick={() => handlePeopleChange(formData.peopleCount - 1)}
                              disabled={formData.peopleCount <= 4}
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

                          <div className="text-center text-sm text-gray-400">
                            Capacity: 4 - {capacity.max} people
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Applied Coupon Display */}
                    {appliedCoupon && (
                      <CouponDisplay
                        appliedCoupon={appliedCoupon}
                        discountAmount={discountAmount}
                        originalAmount={basePrice}
                        finalAmount={finalPrice}
                        onRemove={handleRemoveCoupon}
                        isBestOffer={isBestOffer}
                      />
                    )}

                    {/* Extension & Damage Charges Display */}
                    {extensionData && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Zap size={18} className="text-orange-400" />
                            <span className="text-white font-semibold">Additional Charges</span>
                          </div>
                          <div className="text-orange-400 font-bold flex items-center">
                            <IndianRupee size={16} />
                            {totalAdditionalCharges}
                          </div>
                        </div>
                        
                        <div className="space-y-1 text-sm text-orange-300">
                          {extensionData.extensionHours > 0 && (
                            <div className="flex justify-between">
                              <span>Time Extension ({extensionData.extensionHours} hrs):</span>
                              <span>₹{extensionData.extensionCost}</span>
                            </div>
                          )}
                          
                          {extensionData.totalDamageCost > 0 && (
                            <div className="flex justify-between">
                              <span>Damage Charges:</span>
                              <span>₹{extensionData.totalDamageCost}</span>
                            </div>
                          )}
                          
                          <div className="flex justify-between font-semibold border-t border-orange-500/30 pt-1">
                            <span>Total Additional:</span>
                            <span>₹{totalAdditionalCharges}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Price Display */}
                    <div className={`p-4 rounded-lg border ${
                      membershipPlan 
                        ? 'bg-yellow-500/10 border-yellow-500/30' 
                        : 'bg-slate-800/30 border-green-500/30'
                    }`}>
                      <div className="flex items-center justify-between text-white mb-2">
                        <span className="text-sm">
                          {membershipPlan ? 'Membership Price:' : 'Base Amount:'}
                        </span>
                        <div className="flex items-center space-x-1">
                          <IndianRupee size={16} className={membershipPlan ? "text-yellow-400" : "text-green-400"} />
                          <span className={`text-xl font-bold ${membershipPlan ? "text-yellow-400" : "text-green-400"}`}>
                            ₹{basePrice}
                          </span>
                        </div>
                      </div>

                      {/* Discount Display */}
                      {discountAmount > 0 && (
                        <div className="flex items-center justify-between text-green-400 mb-2">
                          <span className="text-sm">Discount Applied:</span>
                          <div className="flex items-center space-x-1">
                            <IndianRupee size={14} />
                            <span className="font-bold">-{discountAmount}</span>
                          </div>
                        </div>
                      )}

                      {/* Additional Charges Display */}
                      {totalAdditionalCharges > 0 && (
                        <div className="flex items-center justify-between text-orange-400 mb-2">
                          <span className="text-sm">Additional Charges:</span>
                          <div className="flex items-center space-x-1">
                            <IndianRupee size={14} />
                            <span className="font-bold">+{totalAdditionalCharges}</span>
                          </div>
                        </div>
                      )}

                      {/* Final Price Display */}
                      <div className="flex items-center justify-between text-white pt-2 border-t border-gray-600">
                        <span className="text-sm font-semibold">Final Amount:</span>
                        <div className="flex items-center space-x-1">
                          <IndianRupee size={18} className="text-cyan-400" />
                          <span className="text-2xl font-bold text-cyan-400">
                            ₹{finalPrice}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-400 text-center mt-1">
                        {membershipPlan 
                          ? `${membershipPlan.sessions} sessions • ${membershipPlan.duration}`
                          : `₹${pricePerPerson} per person × ${formData.peopleCount} people`
                        }
                      </div>
                    </div>

                    {/* Extension Button */}
                    {canExtend && (
                      <motion.button
                        type="button"
                        onClick={() => setShowExtensionModal(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center space-x-2"
                      >
                        <Zap size={18} />
                        <span>Add Time Extension</span>
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-yellow-300"
                        >
                          ⏰
                        </motion.span>
                      </motion.button>
                    )}

                    {/* Apply Coupon Button */}
                    {!appliedCoupon && (
                      <motion.button
                        type="button"
                        onClick={() => setShowCouponModal(true)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg text-white font-bold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all flex items-center justify-center space-x-2"
                      >
                        <Tag size={18} />
                        <span>Apply Coupon & Save</span>
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-yellow-300"
                        >
                          🎁
                        </motion.span>
                      </motion.button>
                    )}

                    {/* Terms & Conditions Section */}
                    <div className="bg-slate-800/50 border border-cyan-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-cyan-400" />
                          <h4 className="font-semibold text-white text-sm">Terms & Conditions</h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowTermsModal(true)}
                          className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors"
                        >
                          Read Full Terms
                        </button>
                      </div>
                      
                      <div className="text-xs text-gray-300 mb-4 space-y-1 max-h-24 overflow-y-auto">
                        <p>• Booking confirmation is subject to turf availability</p>
                        <p>• Cancellations allowed up to 2 hours before booking time</p>
                        <p>• 50% refund for cancellations made before 24 hours</p>
                        <p>• No refund for no-shows or late cancellations</p>
                        <p>• Equipment damage charges will be applied</p>
                        <p>• Time extension available at additional cost</p>
                        <p>• Maintain proper sportsmanship and turf hygiene</p>
                      </div>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={acceptedTerms}
                            onChange={(e) => setAcceptedTerms(e.target.checked)}
                            className="sr-only"
                          />
                          <div className={`w-5 h-5 border-2 rounded flex items-center justify-center transition-all ${
                            acceptedTerms 
                              ? 'bg-cyan-500 border-cyan-500 text-white' 
                              : 'border-gray-400 bg-slate-700'
                          }`}>
                            {acceptedTerms && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <span className="text-sm text-gray-300">
                          I accept the Terms & Conditions
                        </span>
                      </label>
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
                            <li>• ⏰ Time extension available</li>
                            <li>• 💰 Additional charges apply for extensions</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={!acceptedTerms || !formData.timeSlot}
                      whileHover={{ scale: (acceptedTerms && formData.timeSlot) ? 1.02 : 1 }}
                      whileTap={{ scale: (acceptedTerms && formData.timeSlot) ? 0.98 : 1 }}
                      className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-lg transition-all flex items-center justify-center space-x-2 ${
                        (acceptedTerms && formData.timeSlot)
                          ? membershipPlan
                            ? 'bg-gradient-to-r from-yellow-500 to-orange-600 shadow-yellow-500/30 hover:shadow-yellow-500/50'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-cyan-500/30 hover:shadow-cyan-500/50'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      <Send size={20} />
                      <span>
                        {!formData.timeSlot ? 'Select Time Slot' : 
                         !acceptedTerms ? 'Accept Terms to Continue' : 
                         membershipPlan ? 'Book Membership' : `Book Now - ₹${finalPrice}`}
                      </span>
                    </motion.button>
                  </form>

                  <p className="text-gray-500 text-xs text-center mt-4">
                    You'll be redirected to WhatsApp to complete your booking
                  </p>
                </div>

                {/* Right Column - Popular Time Slots */}
                <div>
                  <PopularTimeSlots 
                    onTimeSelect={handleTimeSlotSelect}
                    selectedTime={formData.timeSlot}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Terms Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={handleAcceptTerms}
      />

      {/* Coupon Modal */}
      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onApplyCoupon={handleApplyCoupon}
        totalAmount={basePrice}
        selectedDate={formData.date ? new Date(formData.date) : undefined}
      />

      {/* Extension Penalty Modal */}
      <ExtensionPenaltyModal
        isOpen={showExtensionModal}
        onClose={() => setShowExtensionModal(false)}
        onConfirm={handleExtensionConfirm}
        turfId={turf?.id || ''}
        originalAmount={basePrice}
        bookingTime={formData.timeSlot}
        bookingDate={formData.date ? new Date(formData.date) : new Date()}
      />
    </>
  );
}