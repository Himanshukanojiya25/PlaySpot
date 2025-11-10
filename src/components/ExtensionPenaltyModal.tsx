import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, AlertTriangle, IndianRupee, CheckCircle } from 'lucide-react';
import { ExtensionCalculator } from '../utils/extensionCalculator';
import DamageReportForm from './DamageReportForm';
import PenaltySummary from './PenaltySummary';
import ExtensionTimer from './ExtensionTimer';

interface ExtensionPenaltyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (extensionData: any) => void;
  turfId: string;
  originalAmount: number;
  bookingTime: string;
  bookingDate: Date;
}

interface DamageItem {
  id: string;
  item: string;
  description: string;
  damageType: 'repair' | 'replacement' | 'partial';
  quantity: number;
  cost: number;
}

const ExtensionPenaltyModal: React.FC<ExtensionPenaltyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  turfId,
  originalAmount,
  bookingTime,
  bookingDate
}) => {
  const [activeTab, setActiveTab] = useState<'extension' | 'damage' | 'summary'>('extension');
  const [extensionHours, setExtensionHours] = useState(0);
  const [damageItems, setDamageItems] = useState<DamageItem[]>([]);
  const [totalDamageCost, setTotalDamageCost] = useState(0);
  const [extensionCalculation, setExtensionCalculation] = useState<any>(null);

  // Calculate extension cost when hours change
  useEffect(() => {
    if (extensionHours > 0) {
      const calculation = ExtensionCalculator.calculateExtension(
        turfId,
        extensionHours,
        bookingTime,
        bookingDate
      );
      setExtensionCalculation(calculation);
    } else {
      setExtensionCalculation(null);
    }
  }, [extensionHours, turfId, bookingTime, bookingDate]);

  const handleDamageUpdate = (items: DamageItem[], totalCost: number) => {
    setDamageItems(items);
    setTotalDamageCost(totalCost);
  };

  const handleConfirm = () => {
    const extensionData = {
      extensionHours,
      extensionCost: extensionCalculation?.totalAmount || 0,
      damageItems,
      totalDamageCost,
      originalAmount,
      finalAmount: originalAmount + (extensionCalculation?.totalAmount || 0) + totalDamageCost,
      calculation: extensionCalculation
    };
    
    onConfirm(extensionData);
    onClose();
    
    // Reset form
    setExtensionHours(0);
    setDamageItems([]);
    setTotalDamageCost(0);
    setExtensionCalculation(null);
    setActiveTab('extension');
  };

  const extensionCost = extensionCalculation?.totalAmount || 0;
  const totalAdditional = extensionCost + totalDamageCost;
  const canProceed = activeTab === 'summary' && totalAdditional > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock size={24} />
                <div>
                  <h2 className="text-xl font-bold">Session Extension & Damage Report</h2>
                  <p className="text-cyan-100 text-sm">Extend your time or report equipment damage</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-cyan-100 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Progress Tabs */}
            <div className="flex space-x-1 mt-4">
              {[
                { id: 'extension', label: 'Time Extension', icon: Clock },
                { id: 'damage', label: 'Damage Report', icon: AlertTriangle },
                { id: 'summary', label: 'Summary', icon: CheckCircle }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-cyan-600'
                      : 'bg-cyan-400/20 text-cyan-100 hover:bg-cyan-400/30'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <tab.icon size={16} />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Extension Tab */}
            <AnimatePresence mode="wait">
              {activeTab === 'extension' && (
                <motion.div
                  key="extension"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Extension Options */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Extend Your Session</h3>
                      
                      <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((hours) => (
                          <motion.button
                            key={hours}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setExtensionHours(hours)}
                            className={`p-4 border-2 rounded-lg text-center transition-all ${
                              extensionHours === hours
                                ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg'
                                : 'bg-gray-50 border-gray-300 text-gray-700 hover:border-cyan-500'
                            }`}
                          >
                            <div className="text-xl font-bold">{hours}</div>
                            <div className="text-sm">Hour{hours > 1 ? 's' : ''}</div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Custom Extension */}
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Custom Extension (1-4 hours)
                        </label>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => setExtensionHours(Math.max(0, extensionHours - 0.5))}
                            disabled={extensionHours <= 0}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 disabled:opacity-30"
                          >
                            -
                          </button>
                          
                          <div className="flex-1 text-center">
                            <div className="text-2xl font-bold text-gray-800">{extensionHours}</div>
                            <div className="text-sm text-gray-500">hours</div>
                          </div>
                          
                          <button
                            onClick={() => setExtensionHours(Math.min(4, extensionHours + 0.5))}
                            disabled={extensionHours >= 4}
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 disabled:opacity-30"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Extension Timer Preview */}
                      <ExtensionTimer
                        initialMinutes={extensionHours * 60}
                        showExtendOption={false}
                      />
                    </div>

                    {/* Cost Calculation */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800">Cost Calculation</h3>
                      
                      {extensionCalculation ? (
                        <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span>Base Extension:</span>
                              <span className="font-semibold">
                                <IndianRupee size={14} className="inline" />
                                {extensionCalculation.baseAmount}
                              </span>
                            </div>
                            
                            {extensionCalculation.peakSurcharge > 0 && (
                              <div className="flex justify-between text-sm">
                                <span>Peak Hours Surcharge:</span>
                                <span className="text-orange-600 font-semibold">
                                  + <IndianRupee size={14} className="inline" />
                                  {extensionCalculation.peakSurcharge}
                                </span>
                              </div>
                            )}
                            
                            {extensionCalculation.weekendSurcharge > 0 && (
                              <div className="flex justify-between text-sm">
                                <span>Weekend Surcharge:</span>
                                <span className="text-purple-600 font-semibold">
                                  + <IndianRupee size={14} className="inline" />
                                  {extensionCalculation.weekendSurcharge}
                                </span>
                              </div>
                            )}
                            
                            <div className="border-t border-cyan-200 pt-2">
                              <div className="flex justify-between font-bold text-lg">
                                <span>Total Extension Cost:</span>
                                <span className="text-cyan-600">
                                  <IndianRupee size={16} className="inline" />
                                  {extensionCalculation.totalAmount}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-100 border border-gray-200 rounded-lg p-8 text-center text-gray-500">
                          <Clock size={48} className="mx-auto mb-3 text-gray-400" />
                          <p>Select extension hours to see cost calculation</p>
                        </div>
                      )}

                      {/* Next Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab('damage')}
                        disabled={extensionHours === 0}
                        className={`w-full py-3 rounded-lg font-bold text-white ${
                          extensionHours > 0
                            ? 'bg-cyan-500 hover:bg-cyan-600'
                            : 'bg-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {extensionHours > 0 ? 'Continue to Damage Report' : 'Select Extension Hours'}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Damage Report Tab */}
              {activeTab === 'damage' && (
                <motion.div
                  key="damage"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <DamageReportForm onDamageUpdate={handleDamageUpdate} />
                  
                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setActiveTab('extension')}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    >
                      Back to Extension
                    </button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveTab('summary')}
                      className="px-6 py-3 bg-cyan-500 text-white rounded-lg font-bold hover:bg-cyan-600 transition-colors"
                    >
                      Continue to Summary
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {/* Summary Tab */}
              {activeTab === 'summary' && (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <PenaltySummary
                    extensionCost={extensionCost}
                    damageCost={totalDamageCost}
                    originalAmount={originalAmount}
                    extensionHours={extensionHours}
                    damageItems={damageItems.map(item => ({
                      description: item.description,
                      cost: item.cost,
                      type: item.damageType
                    }))}
                  />

                  <div className="flex justify-between mt-6">
                    <button
                      onClick={() => setActiveTab('damage')}
                      className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    >
                      Back to Damage Report
                    </button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirm}
                      disabled={!canProceed}
                      className={`px-6 py-3 rounded-lg font-bold text-white ${
                        canProceed
                          ? 'bg-green-500 hover:bg-green-600'
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Confirm Additional Charges
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ExtensionPenaltyModal;