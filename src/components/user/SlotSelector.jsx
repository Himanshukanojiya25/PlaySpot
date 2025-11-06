import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, IndianRupee, Check, AlertCircle, Calendar } from 'lucide-react';
import Button from '../ui/Button';

const SlotSelector = ({ 
  turf, 
  selectedDate, 
  onPeopleSelect, 
  onBooking 
}) => {
  const [selectedPeople, setSelectedPeople] = useState(turf?.capacity?.recommended || 5);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (turf?.pricePerPerson) {
      setTotalPrice(selectedPeople * turf.pricePerPerson);
    }
  }, [selectedPeople, turf?.pricePerPerson]);

  const handlePeopleChange = (count) => {
    if (count >= turf.capacity.min && count <= turf.capacity.max) {
      setSelectedPeople(count);
      if (onPeopleSelect) {
        onPeopleSelect(count);
      }
    }
  };

  const handleBookNow = () => {
    if (onBooking) {
      onBooking({
        peopleCount: selectedPeople,
        totalPrice: totalPrice,
        date: selectedDate
      });
    }
  };

  const quickSelectOptions = [
    { label: 'Small Group', count: turf?.capacity?.min || 4, description: 'Minimum' },
    { label: 'Recommended', count: turf?.capacity?.recommended || 8, description: 'Ideal' },
    { label: 'Large Group', count: turf?.capacity?.max || 16, description: 'Maximum' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-dark-900 dark:text-dark-50">
          Select Group Size
        </h3>
        {selectedDate && (
          <div className="flex items-center gap-2 text-dark-600 dark:text-dark-400">
            <Calendar className="w-5 h-5" />
            <span>{new Date(selectedDate).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {/* Quick Select Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {quickSelectOptions.map((option, index) => {
          const isSelected = selectedPeople === option.count;
          const isValid = option.count >= turf.capacity.min && option.count <= turf.capacity.max;

          return (
            <motion.button
              key={option.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={isValid ? { scale: 1.05 } : {}}
              whileTap={isValid ? { scale: 0.95 } : {}}
              onClick={() => isValid && handlePeopleChange(option.count)}
              disabled={!isValid}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 text-center
                ${
                  isSelected
                    ? 'bg-primary-500 border-primary-500 text-white shadow-lg shadow-primary-500/50'
                    : isValid
                    ? 'bg-white dark:bg-dark-800 border-dark-200 dark:border-dark-700 text-dark-900 dark:text-dark-50 hover:border-primary-500'
                    : 'bg-dark-100 dark:bg-dark-900 border-dark-200 dark:border-dark-800 text-dark-400 cursor-not-allowed'
                }
              `}
            >
              <div className="space-y-2">
                <div className="text-2xl font-bold">{option.count}</div>
                <div className="text-sm font-medium">{option.label}</div>
                <div className="text-xs opacity-70">{option.description}</div>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Manual People Counter */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 border-2 border-dark-200 dark:border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-dark-900 dark:text-dark-50">
            Custom Group Size
          </h4>
          <div className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-400">
            <Users className="w-4 h-4" />
            <span>Capacity: {turf.capacity.min} - {turf.capacity.max}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => handlePeopleChange(selectedPeople - 1)}
            disabled={selectedPeople <= turf.capacity.min}
            className="w-12 h-12 bg-primary-500/20 border-2 border-primary-500/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary-500/30 transition-all text-xl font-bold"
          >
            -
          </button>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-dark-900 dark:text-dark-50 mb-1">
              {selectedPeople}
            </div>
            <div className="text-sm text-dark-600 dark:text-dark-400">
              People
            </div>
          </div>
          
          <button
            onClick={() => handlePeopleChange(selectedPeople + 1)}
            disabled={selectedPeople >= turf.capacity.max}
            className="w-12 h-12 bg-primary-500/20 border-2 border-primary-500/50 rounded-full flex items-center justify-center text-primary-600 dark:text-primary-400 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-primary-500/30 transition-all text-xl font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Price Display */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold">Total Amount</span>
          <div className="flex items-center gap-1">
            <IndianRupee className="w-5 h-5" />
            <span className="text-3xl font-bold">{totalPrice}</span>
          </div>
        </div>
        <div className="text-sm opacity-90 text-center">
          ₹{turf.pricePerPerson} per person × {selectedPeople} people
        </div>
      </div>

      {/* Equipment Availability Notice */}
      {turf.equipmentAvailable ? (
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <div className="text-sm text-green-700 dark:text-green-400">
              <strong>Equipment Included:</strong> Bats and balls are provided at no extra cost
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
            <div className="text-sm text-orange-700 dark:text-orange-400">
              <strong>Bring Your Own Equipment:</strong> Bats and balls are not provided
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedPeople > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex items-center justify-between p-6 glass-strong rounded-xl"
          >
            <div>
              <p className="text-sm text-dark-600 dark:text-dark-400 mb-1">
                Booking Summary
              </p>
              <p className="text-lg font-bold text-dark-900 dark:text-dark-50">
                {selectedPeople} people • ₹{totalPrice}
              </p>
              {selectedDate && (
                <p className="text-sm text-dark-500 dark:text-dark-500 mt-1">
                  {new Date(selectedDate).toLocaleDateString()}
                </p>
              )}
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SlotSelector;