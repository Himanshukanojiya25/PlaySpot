// src/components/TurfDetails.tsx - COMPLETE UPDATED VERSION WITH PENALTY
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, IndianRupee, Clock, Star, CheckCircle, Calendar, Users, Shield, AlertCircle, Plus, Minus, Wifi, Car, Utensils, Dumbbell, Crown, Tag, Zap, Battery, Hammer } from 'lucide-react';
import { useState, useEffect } from 'react';
import turfsData from '../data/turfs.json';
import RecentBookings from './RecentBookings';
import MembershipSlots from './MembershipSlots';
import CouponBadge from './CouponBadge';
import CouponModal from './CouponModal';
import CouponDisplay from './CouponDisplay';
import ExtensionTimer from './ExtensionTimer';
import DamageReportForm from './DamageReportForm';
import PenaltySummary from './PenaltySummary';
import ExtensionPenaltyModal from './ExtensionPenaltyModal';
import { ValidationResult, Coupon, CouponValidator } from '../utils/couponValidation';
import { showSuccessToast, showInfoToast } from '../utils/toast';

interface TurfDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  turfId: string | null;
  onBookNow: (peopleCount: number, membershipPlan?: any, extensionData?: any) => void;
}

interface EquipmentStatus {
  available: number;
  total: number;
  status: "red" | "orange" | "green";
  estimatedTime: string;
}

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

interface DamageItem {
  id: string;
  item: string;
  description: string;
  damageType: 'repair' | 'replacement' | 'partial';
  quantity: number;
  cost: number;
}

export default function TurfDetails({ isOpen, onClose, turfId, onBookNow }: TurfDetailsProps) {
  const turf = turfsData.find((t) => t.id === turfId);
  const [peopleCount, setPeopleCount] = useState(turf?.capacity?.recommended || 4);
  const [showMembership, setShowMembership] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<MembershipPlan | null>(null);
  
  // Enhanced Coupon State
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [availableCoupons, setAvailableCoupons] = useState<number>(0);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [isBestOffer, setIsBestOffer] = useState<boolean>(false);

  // Extension & Penalty State
  const [showTimer, setShowTimer] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showExtensionModal, setShowExtensionModal] = useState(false);
  const [extensionData, setExtensionData] = useState<any>(null);
  const [damageItems, setDamageItems] = useState<DamageItem[]>([]);
  const [totalDamageCost, setTotalDamageCost] = useState(0);
  const [showDamageForm, setShowDamageForm] = useState(false);

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

  // Calculate available coupons and handle coupon state
  useEffect(() => {
    if (isOpen && turf) {
      const totalAmount = peopleCount * turf.pricePerPerson;
      const available = CouponValidator.getAvailableCoupons(totalAmount);
      setAvailableCoupons(available.length);
    }
  }, [isOpen, turf, peopleCount]);

  if (!turf) return null;

  const totalPrice = peopleCount * turf.pricePerPerson;
  const extensionCharges = extensionData?.extensionCost || 0;
  const finalPrice = Math.max(0, totalPrice - discountAmount + extensionCharges + totalDamageCost);
  const membershipPrice = selectedMembership?.price || 0;

  const handlePeopleChange = (count: number) => {
    if (count >= 4 && count <= turf.capacity.max) {
      setPeopleCount(count);
      // Reset coupon when people count changes (price changes)
      if (appliedCoupon) {
        handleRemoveCoupon();
      }
    }
  };

  const handleBookNow = () => {
    const bookingData = {
      peopleCount,
      membershipPlan: selectedMembership,
      extensionData: extensionData ? {
        ...extensionData,
        damageItems,
        totalDamageCost
      } : null
    };
    onBookNow(peopleCount, selectedMembership, bookingData.extensionData);
  };

  const handleMembershipBookNow = () => {
    onBookNow(peopleCount, selectedMembership);
  };

  const handleClose = () => {
    onClose();
  };

  // Enhanced: Handle coupon apply with proper state management
  const handleApplyCoupon = (result: ValidationResult) => {
    if (result.isValid && result.coupon && result.discountAmount !== undefined) {
      setAppliedCoupon(result.coupon);
      setDiscountAmount(result.discountAmount);
      
      // Check if this is the best offer
      const bestCoupon = CouponValidator.getBestCoupon(totalPrice);
      setIsBestOffer(bestCoupon?.coupon?.code === result.coupon.code);
      
      showSuccessToast(`🎉 ${result.coupon.code} applied! You saved ₹${result.discountAmount}`);
    }
  };

  // Enhanced: Handle coupon removal
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
    showSuccessToast(`⏰ Extension applied: ${data.extensionHours} hour(s) - ₹${data.extensionCost}`);
  };

  // Handle damage update
  const handleDamageUpdate = (items: DamageItem[], totalCost: number) => {
    setDamageItems(items);
    setTotalDamageCost(totalCost);
    if (totalCost > 0) {
      showInfoToast(`🏏 Damage charges added: ₹${totalCost}`);
    }
  };

  // Handle timer start
  const handleStartTimer = () => {
    setSessionStarted(true);
    setShowTimer(true);
    showSuccessToast('⏰ Session timer started!');
  };

  // Handle time up
  const handleTimeUp = () => {
    showInfoToast('⏰ Session time completed! Consider extending your session.');
  };

  // Clear all penalty data
  const handleClearPenalty = () => {
    setExtensionData(null);
    setDamageItems([]);
    setTotalDamageCost(0);
    showInfoToast('🧹 All penalty data cleared');
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

  const hasPenaltyCharges = extensionCharges > 0 || totalDamageCost > 0;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={handleClose}
          >
            {/* Enhanced Coupon Badge */}
            <CouponBadge 
              availableCoupons={availableCoupons}
              onOpenModal={() => setShowCouponModal(true)}
              totalAmount={totalPrice}
            />

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

                {/* Enhanced Coupon Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="absolute top-4 right-44 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 cursor-pointer hover:from-purple-600 hover:to-pink-600 transition-all"
                  onClick={() => setShowCouponModal(true)}
                >
                  <Tag size={16} className="text-white" />
                  <span className="text-white font-semibold text-sm">{availableCoupons} Offers</span>
                  {appliedCoupon && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-green-400 rounded-full"
                    />
                  )}
                </motion.div>

                {/* Extension Badge */}
                {turf.extension?.available && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25 }}
                    className="absolute top-4 right-60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500"
                  >
                    <Zap size={16} className="text-white" />
                    <span className="text-white font-semibold text-sm">Extension Available</span>
                  </motion.div>
                )}

                {/* Penalty Badge */}
                {(extensionCharges > 0 || totalDamageCost > 0) && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600"
                  >
                    <Hammer size={16} className="text-white" />
                    <span className="text-white font-semibold text-sm">Penalty Applied</span>
                  </motion.div>
                )}

                {/* Membership Badge */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-4 right-32 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500"
                >
                  <Crown size={16} className="text-white" />
                  <span className="text-white font-semibold text-sm">Membership Available</span>
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
                  {/* Extension Timer Section */}
                  {showTimer && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <ExtensionTimer
                        initialMinutes={60}
                        onTimeUp={handleTimeUp}
                        onExtendRequest={() => setShowExtensionModal(true)}
                        showExtendOption={true}
                      />
                    </motion.div>
                  )}

                  {/* Penalty Summary Section */}
                  {hasPenaltyCharges && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <PenaltySummary
                        extensionCost={extensionCharges}
                        damageCost={totalDamageCost}
                        originalAmount={totalPrice}
                        extensionHours={extensionData?.extensionHours || 0}
                        damageItems={damageItems.map(item => ({
                          description: item.description,
                          cost: item.cost,
                          type: item.damageType
                        }))}
                      />
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleClearPenalty}
                        className="w-full mt-3 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all flex items-center justify-center space-x-2"
                      >
                        <X size={16} />
                        <span>Clear All Penalty Charges</span>
                      </motion.button>
                    </motion.div>
                  )}

                  {/* Extension & Penalty Action Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="mb-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Zap className="text-orange-400 mr-2" size={20} />
                      Session Management
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Extension Card */}
                      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Zap className="text-orange-400" size={24} />
                          <div>
                            <h4 className="text-white font-semibold">Time Extension</h4>
                            <p className="text-orange-300 text-sm">Extend your session duration</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-300 mb-4">
                          <div className="flex justify-between">
                            <span>Base Rate:</span>
                            <span className="text-orange-400 font-semibold">₹{turf.extension?.baseHourlyRate || 0}/hour</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Extension:</span>
                            <span>{turf.extension?.maxExtension || 0} hours</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowExtensionModal(true)}
                          disabled={!turf.extension?.available}
                          className={`w-full py-3 rounded-lg font-bold text-white ${
                            turf.extension?.available
                              ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700'
                              : 'bg-gray-600 cursor-not-allowed'
                          }`}
                        >
                          {turf.extension?.available ? 'Add Time Extension' : 'Extension Not Available'}
                        </motion.button>
                      </div>

                      {/* Damage Report Card */}
                      <div className="bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <Hammer className="text-red-400" size={24} />
                          <div>
                            <h4 className="text-white font-semibold">Damage Report</h4>
                            <p className="text-red-300 text-sm">Report equipment damage</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-300 mb-4">
                          <div className="flex justify-between">
                            <span>Damage Items:</span>
                            <span className="text-red-400 font-semibold">{damageItems.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Total Charges:</span>
                            <span className="text-red-400 font-semibold">₹{totalDamageCost}</span>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setShowDamageForm(!showDamageForm)}
                          className="w-full py-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg text-white font-bold hover:from-red-600 hover:to-pink-700 transition-all"
                        >
                          {showDamageForm ? 'Hide Damage Form' : 'Report Damage'}
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Damage Report Form */}
                  {showDamageForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <DamageReportForm onDamageUpdate={handleDamageUpdate} />
                    </motion.div>
                  )}

                  {/* Extension Info Section */}
                  {turf.extension?.available && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6"
                    >
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <Zap className="text-orange-400 mr-2" size={20} />
                        Extension Details
                      </h3>
                      
                      <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-white font-semibold mb-3">Pricing Structure</h4>
                            <div className="space-y-3 text-sm">
                              <div className="flex justify-between items-center py-2 border-b border-orange-500/20">
                                <span className="text-gray-300">Base Hourly Rate</span>
                                <span className="text-orange-400 font-semibold">₹{turf.extension.baseHourlyRate}</span>
                              </div>
                              {turf.extension.peakSurcharge > 0 && (
                                <div className="flex justify-between items-center py-2 border-b border-orange-500/20">
                                  <span className="text-gray-300">Peak Hours Surcharge</span>
                                  <span className="text-yellow-400">+ ₹{turf.extension.peakSurcharge}</span>
                                </div>
                              )}
                              {turf.extension.weekendSurcharge > 0 && (
                                <div className="flex justify-between items-center py-2 border-b border-orange-500/20">
                                  <span className="text-gray-300">Weekend Surcharge</span>
                                  <span className="text-purple-400">+ ₹{turf.extension.weekendSurcharge}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-white font-semibold mb-3">Extension Rules</h4>
                            <div className="space-y-3 text-sm text-gray-300">
                              <div className="flex justify-between">
                                <span>Minimum Extension:</span>
                                <span>{turf.extension.minExtension} hour(s)</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Maximum Extension:</span>
                                <span>{turf.extension.maxExtension} hour(s)</span>
                              </div>
                              {turf.extension.peakHours.length > 0 && (
                                <div className="flex justify-between">
                                  <span>Peak Hours:</span>
                                  <span>{turf.extension.peakHours[0]} - {turf.extension.peakHours[1]}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span>Damage Policy:</span>
                                <span className={turf.damagePolicy?.requiresDeposit ? "text-red-400" : "text-green-400"}>
                                  {turf.damagePolicy?.requiresDeposit ? 'Deposit Required' : 'No Deposit'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {!sessionStarted && (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleStartTimer}
                            className="w-full mt-4 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg text-white font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all flex items-center justify-center space-x-2"
                          >
                            <Battery size={18} />
                            <span>Start Session Timer</span>
                          </motion.button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Rest of the existing sections remain the same */}
                  {/* Info Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
                  >
                    <div className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                      <MapPin className="text-cyan-400 mt-0.5" size={20} />
                      <div className="min-w-0">
                        <div className="text-gray-400 text-xs mb-1">Location</div>
                        <div className="text-white font-semibold text-sm truncate">{turf.location}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                      <IndianRupee className="text-cyan-400 mt-0.5" size={20} />
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Pricing</div>
                        <div className="text-white font-semibold text-sm">{turf.pricing}</div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                      <Users className="text-cyan-400 mt-0.5" size={20} />
                      <div>
                        <div className="text-gray-400 text-xs mb-1">Capacity</div>
                        <div className="text-white font-semibold text-sm">
                          {turf.capacity.min}-{turf.capacity.max} people
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* People Selector Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
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

                      {/* Price Calculation with Enhanced Coupon & Penalty Integration */}
                      <div className="space-y-3">
                        {/* Applied Coupon Display */}
                        {appliedCoupon && (
                          <CouponDisplay
                            appliedCoupon={appliedCoupon}
                            discountAmount={discountAmount}
                            originalAmount={totalPrice}
                            finalAmount={finalPrice}
                            onRemove={handleRemoveCoupon}
                            isBestOffer={isBestOffer}
                          />
                        )}

                        {/* Penalty Charges Display */}
                        {hasPenaltyCharges && (
                          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Hammer size={18} className="text-orange-400" />
                                <span className="text-white font-semibold">Additional Charges</span>
                              </div>
                              <div className="text-orange-400 font-bold flex items-center">
                                <IndianRupee size={16} />
                                {extensionCharges + totalDamageCost}
                              </div>
                            </div>
                            
                            <div className="space-y-1 text-sm text-orange-300">
                              {extensionCharges > 0 && (
                                <div className="flex justify-between">
                                  <span>Time Extension:</span>
                                  <span>₹{extensionCharges}</span>
                                </div>
                              )}
                              
                              {totalDamageCost > 0 && (
                                <div className="flex justify-between">
                                  <span>Damage Charges:</span>
                                  <span>₹{totalDamageCost}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className={`bg-gradient-to-r rounded-lg p-4 text-white ${
                          appliedCoupon ? 'from-green-500 to-emerald-600 shadow-lg shadow-green-500/30' : 
                          hasPenaltyCharges ? 'from-orange-500 to-red-600 shadow-lg shadow-orange-500/30' : 
                          'from-blue-500 to-cyan-600'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-xs opacity-90">
                                {appliedCoupon || hasPenaltyCharges ? 'Final Amount Payable' : 'Total Amount'}
                              </div>
                              <div className="text-2xl font-bold">₹{finalPrice}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs">
                                ₹{turf.pricePerPerson} × {peopleCount} people
                              </div>
                              {appliedCoupon && (
                                <div className="text-xs text-green-200 font-semibold">
                                  🎉 Saved ₹{discountAmount}
                                </div>
                              )}
                              {hasPenaltyCharges && (
                                <div className="text-xs text-orange-200 font-semibold">
                                  ⚡ Additional: ₹{extensionCharges + totalDamageCost}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {(appliedCoupon || hasPenaltyCharges) && (
                            <div className="flex items-center justify-between text-xs pt-2 border-t border-white/20">
                              <span className="opacity-80">Base Price:</span>
                              <span className="line-through opacity-70">₹{totalPrice}</span>
                            </div>
                          )}
                        </div>

                        {/* Enhanced Apply Coupon Button */}
                        {!appliedCoupon ? (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setShowCouponModal(true)}
                            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-bold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all flex items-center justify-center space-x-2 group"
                          >
                            <Tag size={18} className="group-hover:scale-110 transition-transform" />
                            <span>Apply Coupon & Save</span>
                            <motion.span
                              animate={{ scale: [1, 1.2, 1], rotate: [0, 5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="text-yellow-300"
                            >
                              🎁
                            </motion.span>
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleRemoveCoupon}
                            className="w-full py-3 bg-gradient-to-r from-gray-500 to-gray-700 rounded-lg text-white font-semibold hover:from-gray-600 hover:to-gray-800 transition-all flex items-center justify-center space-x-2"
                          >
                            <Tag size={18} />
                            <span>Remove Coupon</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Recent Bookings Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mb-6"
                  >
                    <RecentBookings turfId={turf.id} maxItems={3} />
                  </motion.div>

                  {/* Membership Toggle */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex items-center">
                        <Crown className="text-yellow-400 mr-2" size={20} />
                        Membership Plans
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMembership(!showMembership)}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white font-semibold text-sm flex items-center space-x-2"
                      >
                        <Crown size={16} />
                        <span>{showMembership ? 'Hide Plans' : 'View Membership'}</span>
                      </motion.button>
                    </div>

                    <AnimatePresence>
                      {showMembership && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <MembershipSlots 
                            onPlanSelect={setSelectedMembership}
                            selectedPlanId={selectedMembership?.id || null}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Membership Booking Button */}
                    {selectedMembership && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-white font-bold text-lg">Selected Membership</h4>
                            <p className="text-yellow-400 text-sm">
                              {selectedMembership.name} • ₹{selectedMembership.price} • {selectedMembership.sessions} sessions
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleMembershipBookNow}
                            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg text-white font-bold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-all"
                          >
                            Book Membership
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Advanced Equipment Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
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
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <h3 className="text-xl font-bold text-white mb-3">About This Turf</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{turf.description}</p>
                  </motion.div>

                  {/* Features Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
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
                    transition={{ delay: 0.6 }}
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
                    transition={{ delay: 0.65 }}
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
                    transition={{ delay: 0.7 }}
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
                        {turf.extension?.available && (
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="text-purple-400 text-sm">
                              <strong>Time Extension:</strong> Available at additional cost during booking
                            </div>
                          </div>
                        )}
                        {turf.damagePolicy?.requiresDeposit && (
                          <div className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="text-yellow-400 text-sm">
                              <strong>Security Deposit:</strong> ₹{turf.damagePolicy.depositAmount} required for equipment
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.75 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBookNow}
                      className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
                    >
                      {appliedCoupon || hasPenaltyCharges
                        ? `Book Now - ₹${finalPrice}`
                        : `Book for ${peopleCount} People - ₹${totalPrice}`
                      }
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

      {/* Enhanced Coupon Modal */}
      <CouponModal
        isOpen={showCouponModal}
        onClose={() => setShowCouponModal(false)}
        onApplyCoupon={handleApplyCoupon}
        totalAmount={totalPrice}
      />

      {/* Extension Penalty Modal */}
      <ExtensionPenaltyModal
        isOpen={showExtensionModal}
        onClose={() => setShowExtensionModal(false)}
        onConfirm={handleExtensionConfirm}
        turfId={turf.id}
        originalAmount={totalPrice}
        bookingTime={new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
        bookingDate={new Date()}
      />
    </>
  );
}