import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, AlertTriangle, Clock, FileText, CheckCircle } from 'lucide-react';

interface PenaltySummaryProps {
  extensionCost: number;
  damageCost: number;
  originalAmount: number;
  extensionHours?: number;
  damageItems?: Array<{
    description: string;
    cost: number;
    type: string;
  }>;
}

const PenaltySummary: React.FC<PenaltySummaryProps> = ({
  extensionCost,
  damageCost,
  originalAmount,
  extensionHours = 0,
  damageItems = []
}) => {
  const totalPenalty = extensionCost + damageCost;
  const finalAmount = originalAmount + totalPenalty;

  const getSeverityColor = (amount: number) => {
    if (amount === 0) return 'text-green-400';
    if (amount < 500) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityBg = (amount: number) => {
    if (amount === 0) return 'bg-green-500/10 border-green-500/30';
    if (amount < 500) return 'bg-yellow-500/10 border-yellow-500/30';
    return 'bg-red-500/10 border-red-500/30';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="text-cyan-400" size={24} />
        <div>
          <h3 className="text-white font-bold text-lg">Penalty & Extension Summary</h3>
          <p className="text-gray-400 text-sm">Breakdown of additional charges</p>
        </div>
      </div>

      {/* Original Amount */}
      <div className="bg-slate-700/50 border border-gray-600 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Original Booking Amount</span>
          <div className="flex items-center text-white font-semibold">
            <IndianRupee size={16} />
            {originalAmount}
          </div>
        </div>
      </div>

      {/* Extension Charges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className={`border rounded-lg p-4 mb-4 ${getSeverityBg(extensionCost)}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Clock className={getSeverityColor(extensionCost)} size={18} />
            <span className="text-white font-semibold">Time Extension</span>
          </div>
          <div className={`flex items-center font-bold ${getSeverityColor(extensionCost)}`}>
            <IndianRupee size={16} />
            {extensionCost}
          </div>
        </div>
        
        {extensionHours > 0 && (
          <div className="text-sm text-gray-300">
            {extensionHours} hour{extensionHours > 1 ? 's' : ''} extension applied
          </div>
        )}
        
        {extensionCost === 0 && (
          <div className="text-sm text-green-400 flex items-center space-x-1">
            <CheckCircle size={14} />
            <span>No extension charges</span>
          </div>
        )}
      </motion.div>

      {/* Damage Charges */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className={`border rounded-lg p-4 mb-4 ${getSeverityBg(damageCost)}`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <AlertTriangle className={getSeverityColor(damageCost)} size={18} />
            <span className="text-white font-semibold">Equipment Damage</span>
          </div>
          <div className={`flex items-center font-bold ${getSeverityColor(damageCost)}`}>
            <IndianRupee size={16} />
            {damageCost}
          </div>
        </div>

        {damageItems.length > 0 ? (
          <div className="space-y-2 mt-3">
            {damageItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-gray-300">{item.description}</span>
                  <span className="text-gray-500 text-xs">({item.type})</span>
                </div>
                <div className="text-red-400 font-semibold flex items-center">
                  <IndianRupee size={12} />
                  {item.cost}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-green-400 flex items-center space-x-1">
            <CheckCircle size={14} />
            <span>No damage reported</span>
          </div>
        )}
      </motion.div>

      {/* Total Penalty */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-4 mb-4"
      >
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <AlertTriangle size={20} />
            <span className="font-bold text-lg">Total Additional Charges</span>
          </div>
          <div className="flex items-center font-bold text-xl">
            <IndianRupee size={20} />
            {totalPenalty}
          </div>
        </div>
        
        {totalPenalty > 0 && (
          <div className="text-orange-100 text-sm mt-2 flex items-center space-x-1">
            <AlertTriangle size={14} />
            <span>This amount will be added to your final bill</span>
          </div>
        )}
      </motion.div>

      {/* Final Amount */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-4"
      >
        <div className="flex items-center justify-between text-white">
          <div>
            <div className="text-sm opacity-90">Final Amount Payable</div>
            <div className="text-2xl font-bold">₹{finalAmount}</div>
          </div>
          <div className="text-right">
            <div className="text-sm">Original: ₹{originalAmount}</div>
            <div className="text-sm">+ Charges: ₹{totalPenalty}</div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="mt-3 pt-3 border-t border-white/20">
          <div className="grid grid-cols-2 gap-2 text-xs text-cyan-100">
            <div>Base Amount:</div>
            <div className="text-right">₹{originalAmount}</div>
            
            {extensionCost > 0 && (
              <>
                <div>Extension ({extensionHours}hrs):</div>
                <div className="text-right">+ ₹{extensionCost}</div>
              </>
            )}
            
            {damageCost > 0 && (
              <>
                <div>Damage Charges:</div>
                <div className="text-right">+ ₹{damageCost}</div>
              </>
            )}
            
            <div className="font-bold mt-1">Total:</div>
            <div className="text-right font-bold mt-1">₹{finalAmount}</div>
          </div>
        </div>
      </motion.div>

      {/* Additional Info */}
      {totalPenalty > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
        >
          <div className="flex items-start space-x-2">
            <AlertTriangle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-yellow-300 text-sm">
              <strong>Important:</strong> Additional charges must be paid before your next booking. 
              Unpaid charges may result in temporary suspension of booking privileges.
            </div>
          </div>
        </motion.div>
      )}

      {/* Payment Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-4 flex items-center justify-between text-sm"
      >
        <span className="text-gray-400">Payment Status:</span>
        <span className={`font-semibold ${
          totalPenalty === 0 ? 'text-green-400' : 'text-orange-400'
        }`}>
          {totalPenalty === 0 ? 'No Additional Charges' : 'Pending Payment'}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default PenaltySummary;