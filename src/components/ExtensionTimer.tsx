import React from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock, AlertTriangle } from 'lucide-react';
import { useExtensionTimer } from '../hooks/useExtensionTimer';

interface ExtensionTimerProps {
  initialMinutes?: number;
  onTimeUp?: () => void;
  onExtendRequest?: () => void;
  showExtendOption?: boolean;
}

const ExtensionTimer: React.FC<ExtensionTimerProps> = ({
  initialMinutes = 60,
  onTimeUp,
  onExtendRequest,
  showExtendOption = true
}) => {
  const {
    timeLeft,
    isRunning,
    isExtended,
    formattedTime,
    progressPercentage,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    extendTimer,
    hasExtended
  } = useExtensionTimer(initialMinutes, onTimeUp);

  const getTimerColor = () => {
    if (timeLeft > 1800) return 'text-green-500'; // > 30 minutes
    if (timeLeft > 600) return 'text-yellow-500'; // > 10 minutes
    return 'text-red-500'; // < 10 minutes
  };

  const getProgressColor = () => {
    if (progressPercentage < 70) return 'bg-cyan-500';
    if (progressPercentage < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-slate-800 to-slate-900 border border-cyan-500/30 rounded-xl p-6 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Clock className="text-cyan-400" size={24} />
          <div>
            <h3 className="text-white font-bold text-lg">Session Timer</h3>
            <p className="text-gray-400 text-sm">
              {isExtended ? 'Extended Session' : 'Original Booking'}
            </p>
          </div>
        </div>
        
        {hasExtended && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full"
          >
            <span className="text-green-400 text-sm font-semibold">Extended</span>
          </motion.div>
        )}
      </div>

      {/* Timer Display */}
      <div className="text-center mb-6">
        <motion.div
          key={formattedTime}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1 }}
          className={`text-4xl font-bold ${getTimerColor()} mb-2`}
        >
          {formattedTime}
        </motion.div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
            className={`h-3 rounded-full ${getProgressColor()} transition-all duration-1000`}
          />
        </div>

        {/* Time Warning */}
        {timeLeft < 600 && timeLeft > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 text-red-400 text-sm"
          >
            <AlertTriangle size={16} />
            <span>Session ending soon!</span>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col space-y-3">
        {!isRunning && timeLeft === 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => startTimer(initialMinutes)}
            className="w-full py-3 bg-cyan-500 text-white rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-cyan-600 transition-colors"
          >
            <Play size={20} />
            <span>Start Session</span>
          </motion.button>
        )}

        {timeLeft > 0 && (
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isRunning ? pauseTimer : resumeTimer}
              className={`py-3 rounded-lg font-bold flex items-center justify-center space-x-2 transition-colors ${
                isRunning
                  ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isRunning ? <Pause size={20} /> : <Play size={20} />}
              <span>{isRunning ? 'Pause' : 'Resume'}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTimer}
              className="py-3 bg-red-500 text-white rounded-lg font-bold flex items-center justify-center space-x-2 hover:bg-red-600 transition-colors"
            >
              <RotateCcw size={20} />
              <span>Reset</span>
            </motion.button>
          </div>
        )}

        {/* Extend Button */}
        {showExtendOption && timeLeft < 1800 && timeLeft > 0 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExtendRequest}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg font-bold flex items-center justify-center space-x-2 hover:from-purple-600 hover:to-pink-700 transition-all"
          >
            <Clock size={20} />
            <span>Extend Session</span>
          </motion.button>
        )}

        {/* Quick Extend Options */}
        {showExtendOption && timeLeft < 600 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-3 gap-2"
          >
            {[30, 60, 90].map((minutes) => (
              <motion.button
                key={minutes}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => extendTimer(minutes)}
                className="py-2 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-500/30 transition-colors"
              >
                +{minutes}m
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Session Info */}
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
          <div>
            <div>Initial Duration</div>
            <div className="text-white font-semibold">{initialMinutes} minutes</div>
          </div>
          <div>
            <div>Status</div>
            <div className={`font-semibold ${
              isRunning ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {isRunning ? 'Running' : 'Paused'}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExtensionTimer;