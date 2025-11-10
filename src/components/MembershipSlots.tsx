import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Users, Calendar, Star, Zap, Check, IndianRupee, Clock, Shield } from 'lucide-react';

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

interface MembershipSlotsProps {
  onPlanSelect?: (plan: MembershipPlan | null) => void;
  selectedPlanId?: string | null;
}

const MembershipSlots: React.FC<MembershipSlotsProps> = ({ 
  onPlanSelect,
  selectedPlanId 
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(selectedPlanId || null);

  const membershipPlans: MembershipPlan[] = [
    {
      id: 'basic',
      name: 'Starter Pack',
      description: 'Perfect for casual players',
      price: 999,
      originalPrice: 1200,
      duration: '1 Month',
      sessions: 4,
      savings: '17% savings',
      benefits: [
        '4 sessions per month',
        '1 hour each session',
        'Basic equipment access',
        'Standard timing slots',
        'Email support'
      ],
      popular: false,
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'pro',
      name: 'Pro Player',
      description: 'Best value for regular players',
      price: 2499,
      originalPrice: 3200,
      duration: '3 Months',
      sessions: 16,
      savings: '22% savings',
      benefits: [
        '16 sessions (4/month)',
        '2 hours each session',
        'Premium equipment access',
        'Priority booking slots',
        'WhatsApp support',
        '1 free guest pass',
        'Discount on coaching'
      ],
      popular: true,
      icon: <Crown className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'elite',
      name: 'Elite Membership',
      description: 'Ultimate experience for serious players',
      price: 7999,
      originalPrice: 10800,
      duration: '6 Months',
      sessions: 36,
      savings: '26% savings',
      benefits: [
        '36 sessions (6/month)',
        '3 hours each session',
        'All equipment included',
        '24/7 booking access',
        'Dedicated manager',
        '4 free guest passes',
        'Free coaching sessions',
        'Locker access',
        'Complimentary drinks'
      ],
      popular: false,
      icon: <Zap className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const calculateSavings = (plan: MembershipPlan) => {
    if (!plan.originalPrice) return 0;
    return plan.originalPrice - plan.price;
  };

  const handleSelectPlan = (planId: string) => {
    const newSelectedPlan = selectedPlan === planId ? null : planId;
    setSelectedPlan(newSelectedPlan);
    
    const plan = membershipPlans.find(p => p.id === newSelectedPlan);
    onPlanSelect?.(plan || null);
  };

  const selectedPlanData = membershipPlans.find(p => p.id === selectedPlan);

  return (
    <div className="bg-slate-800/80 rounded-2xl p-6 border border-cyan-500/20">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Crown className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Membership Plans
          </h2>
        </div>
        <p className="text-gray-400 text-lg">
          Save more with our exclusive membership packages
        </p>
      </div>

      {/* Selected Plan Summary */}
      {selectedPlanData && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-lg">Selected: {selectedPlanData.name}</h3>
              <p className="text-green-400 text-sm">
                ₹{selectedPlanData.price} • {selectedPlanData.sessions} sessions • {selectedPlanData.duration}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectPlan(selectedPlanData.id)}
              className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
            >
              Change
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {membershipPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`relative rounded-xl border-2 p-6 cursor-pointer transition-all duration-300 ${
              selectedPlan === plan.id
                ? 'border-cyan-500 bg-cyan-500/10 shadow-2xl shadow-cyan-500/20 scale-105'
                : plan.popular
                ? 'border-yellow-500 bg-yellow-500/5 hover:border-yellow-400'
                : 'border-gray-600 bg-slate-700/50 hover:border-cyan-500/50'
            }`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>MOST POPULAR</span>
                </div>
              </div>
            )}

            {/* Selected Check */}
            {selectedPlan === plan.id && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}

            {/* Plan Header */}
            <div className="text-center mb-6">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm">{plan.description}</p>
            </div>

            {/* Price Section */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <IndianRupee className="w-6 h-6 text-gray-400" />
                <span className="text-3xl font-bold text-white">{plan.price}</span>
              </div>
              
              {plan.originalPrice && (
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <span className="text-lg text-gray-400 line-through">₹{plan.originalPrice}</span>
                  <span className="text-green-400 text-sm font-bold bg-green-500/20 px-2 py-1 rounded">
                    Save ₹{calculateSavings(plan)}
                  </span>
                </div>
              )}
              
              <div className="text-cyan-400 text-sm font-semibold">
                {plan.savings}
              </div>
            </div>

            {/* Plan Details */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white font-semibold">{plan.duration}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Sessions:</span>
                <span className="text-white font-semibold">{plan.sessions}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Support:</span>
                <span className="text-green-400 font-semibold">24/7 Available</span>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-3 mb-6">
              <h4 className="text-white font-semibold text-sm flex items-center space-x-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>What's Included:</span>
              </h4>
              <div className="space-y-2">
                {plan.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-start space-x-2">
                    <Check className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 rounded-lg font-bold text-white transition-all ${
                selectedPlan === plan.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30'
                  : plan.popular
                  ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-orange-500/30'
                  : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
              }`}
            >
              {selectedPlan === plan.id ? 'Selected' : 'Choose Plan'}
            </motion.button>

            {/* Per Session Price */}
            <div className="text-center mt-3">
              <div className="text-xs text-gray-400">
                ₹{Math.round(plan.price / plan.sessions)} per session
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison Note */}
      <div className="mt-8 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
        <div className="flex items-center justify-center space-x-2 text-cyan-300 text-sm">
          <Calendar className="w-4 h-4" />
          <span>
            <strong>Pro Tip:</strong> Members get priority booking and exclusive time slots!
          </span>
        </div>
      </div>
    </div>
  );
};

export default MembershipSlots;