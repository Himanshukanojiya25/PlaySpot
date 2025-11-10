import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Camera, Plus, Trash2, IndianRupee } from 'lucide-react';

interface DamageItem {
  id: string;
  item: string;
  description: string;
  damageType: 'repair' | 'replacement' | 'partial';
  quantity: number;
  cost: number;
}

interface DamageReportFormProps {
  onDamageUpdate: (items: DamageItem[], totalCost: number) => void;
}

const DamageReportForm: React.FC<DamageReportFormProps> = ({ onDamageUpdate }) => {
  const [damageItems, setDamageItems] = useState<DamageItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  const damageOptions = [
    { value: 'cricket_bat', label: 'Cricket Bat', rates: { repair: 300, replacement: 1500, partial: 150 } },
    { value: 'tennis_ball', label: 'Tennis Ball', rates: { repair: 0, replacement: 50, partial: 0 } },
    { value: 'cricket_ball', label: 'Cricket Ball', rates: { repair: 0, replacement: 120, partial: 0 } },
    { value: 'stumps', label: 'Wicket Stumps', rates: { repair: 100, replacement: 400, partial: 50 } },
    { value: 'goal_post', label: 'Goal Post', rates: { repair: 500, replacement: 2000, partial: 200 } },
    { value: 'protective_gear', label: 'Protective Gear', rates: { repair: 200, replacement: 800, partial: 100 } },
    { value: 'net_damage', label: 'Boundary Net', rates: { repair: 400, replacement: 1200, partial: 200 } },
  ];

  const damageTypeLabels = {
    repair: 'Repair',
    replacement: 'Replacement',
    partial: 'Partial Damage'
  };

  const calculateCost = (item: string, damageType: string, quantity: number): number => {
    const option = damageOptions.find(opt => opt.value === item);
    if (!option) return 0;
    
    const rate = option.rates[damageType as keyof typeof option.rates];
    return rate * quantity;
  };

  const addDamageItem = () => {
    const newItem: DamageItem = {
      id: Date.now().toString(),
      item: 'cricket_bat',
      description: 'Cricket Bat',
      damageType: 'repair',
      quantity: 1,
      cost: 300
    };
    
    const updatedItems = [...damageItems, newItem];
    setDamageItems(updatedItems);
    updateTotalCost(updatedItems);
  };

  const updateDamageItem = (id: string, field: string, value: any) => {
    const updatedItems = damageItems.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Recalculate cost if item, damageType, or quantity changes
        if (['item', 'damageType', 'quantity'].includes(field)) {
          updatedItem.cost = calculateCost(updatedItem.item, updatedItem.damageType, updatedItem.quantity);
          // Update description when item changes
          if (field === 'item') {
            const option = damageOptions.find(opt => opt.value === value);
            updatedItem.description = option?.label || 'Unknown Item';
          }
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setDamageItems(updatedItems);
    updateTotalCost(updatedItems);
  };

  const removeDamageItem = (id: string) => {
    const updatedItems = damageItems.filter(item => item.id !== id);
    setDamageItems(updatedItems);
    updateTotalCost(updatedItems);
  };

  const updateTotalCost = (items: DamageItem[]) => {
    const totalCost = items.reduce((sum, item) => sum + item.cost, 0);
    onDamageUpdate(items, totalCost);
  };

  const totalCost = damageItems.reduce((sum, item) => sum + item.cost, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-orange-500/30 rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="text-orange-400" size={24} />
          <div>
            <h3 className="text-white font-bold text-lg">Damage Report</h3>
            <p className="text-gray-400 text-sm">Report any equipment damage</p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold text-sm flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Add Damage</span>
        </motion.button>
      </div>

      {/* Damage Items List */}
      <AnimatePresence>
        {damageItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 mb-6"
          >
            {damageItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-slate-700/50 border border-orange-500/20 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                      <span className="text-orange-400 font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{item.description}</h4>
                      <p className="text-orange-400 text-sm">{damageTypeLabels[item.damageType]}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-white font-bold text-lg flex items-center">
                        <IndianRupee size={16} />
                        {item.cost}
                      </div>
                      <div className="text-gray-400 text-xs">Qty: {item.quantity}</div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeDamageItem(item.id)}
                      className="w-8 h-8 bg-red-500/20 border border-red-500/30 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500/30 transition-colors"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>
                </div>

                {/* Item Controls */}
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={item.item}
                    onChange={(e) => updateDamageItem(item.id, 'item', e.target.value)}
                    className="col-span-2 px-3 py-2 bg-slate-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    {damageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={item.damageType}
                    onChange={(e) => updateDamageItem(item.id, 'damageType', e.target.value)}
                    className="px-3 py-2 bg-slate-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-orange-500"
                  >
                    <option value="repair">Repair</option>
                    <option value="replacement">Replace</option>
                    <option value="partial">Partial</option>
                  </select>

                  <div className="col-span-3 flex items-center space-x-3">
                    <label className="text-gray-400 text-sm">Quantity:</label>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateDamageItem(item.id, 'quantity', Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 bg-orange-500/20 border border-orange-500/30 rounded text-orange-400 text-sm flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateDamageItem(item.id, 'quantity', item.quantity + 1)}
                        className="w-6 h-6 bg-orange-500/20 border border-orange-500/30 rounded text-orange-400 text-sm flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Damage Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-700/30 border border-orange-500/20 rounded-lg p-4 mb-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Damage Type</label>
                <select className="w-full px-3 py-2 bg-slate-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-orange-500">
                  <option>Select damage type</option>
                  {damageOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-gray-400 text-sm mb-2">Severity</label>
                <select className="w-full px-3 py-2 bg-slate-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-orange-500">
                  <option value="repair">Repair Needed</option>
                  <option value="replacement">Full Replacement</option>
                  <option value="partial">Partial Damage</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 text-sm mb-2">Description</label>
              <textarea
                placeholder="Describe the damage..."
                className="w-full px-3 py-2 bg-slate-600 border border-gray-500 rounded text-white text-sm focus:outline-none focus:border-orange-500 resize-none"
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Camera size={16} />
                <span>Add photos (optional)</span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addDamageItem}
                  className="px-4 py-2 bg-orange-500 text-white rounded text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2"
                >
                  <Plus size={16} />
                  <span>Add to Report</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Total Damage Cost */}
      {damageItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="text-red-400" size={20} />
              <span className="text-white font-semibold">Total Damage Charges</span>
            </div>
            <div className="text-red-400 font-bold text-xl flex items-center">
              <IndianRupee size={20} />
              {totalCost}
            </div>
          </div>
          <p className="text-red-300 text-sm mt-2">
            This amount will be added to your final bill
          </p>
        </motion.div>
      )}

      {damageItems.length === 0 && !showForm && (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle size={48} className="mx-auto mb-3 text-gray-400" />
          <p>No damage reported</p>
          <p className="text-sm mt-2">Click "Add Damage" to report any equipment issues</p>
        </div>
      )}
    </motion.div>
  );
};

export default DamageReportForm;