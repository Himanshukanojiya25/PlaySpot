import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, ExternalLink } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

const AutoNotificationPopup: React.FC = () => {
  const [visibleNotification, setVisibleNotification] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { notifications, markAsRead, getPriorityNotifications } = useNotifications();

  useEffect(() => {
    // Check for new unread notifications every 10 seconds
    const interval = setInterval(() => {
      const priorityNotifications = getPriorityNotifications();
      if (priorityNotifications.length > 0 && !showPopup) {
        const latestUnread = priorityNotifications[0];
        setVisibleNotification(latestUnread);
        setShowPopup(true);
        
        // Auto hide after 8 seconds
        setTimeout(() => {
          setShowPopup(false);
        }, 8000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [notifications, showPopup, getPriorityNotifications]);

  const handleClose = () => {
    if (visibleNotification) {
      markAsRead(visibleNotification.id);
    }
    setShowPopup(false);
    setVisibleNotification(null);
  };

  const handleAction = () => {
    if (visibleNotification?.action) {
      console.log('Action:', visibleNotification.action.url);
    }
    handleClose();
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'tournament': return '🏆';
      case 'offer': return '🎯';
      case 'live': return '⚡';
      case 'reminder': return '🕒';
      case 'event': return '🎪';
      default: return '🔔';
    }
  };

  return (
    <AnimatePresence>
      {showPopup && visibleNotification && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.9 }}
          className="fixed top-24 right-4 z-50 w-80 bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/30 rounded-xl shadow-2xl shadow-cyan-500/20"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
            <div className="flex items-center space-x-2">
              <span className="text-xl">{getNotificationIcon(visibleNotification.type)}</span>
              <span className="text-white font-semibold text-sm">New Notification</span>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-white font-bold text-sm mb-2">
              {visibleNotification.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {visibleNotification.message}
            </p>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              {visibleNotification.action && (
                <button
                  onClick={handleAction}
                  className="flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 text-sm font-semibold transition-colors"
                >
                  <span>{visibleNotification.action.label}</span>
                  <ExternalLink size={14} />
                </button>
              )}
              
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 8, ease: 'linear' }}
            className="h-1 bg-cyan-500"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AutoNotificationPopup;