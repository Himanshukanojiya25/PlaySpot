import React, { useEffect } from 'react';
import { useNotifications } from '../hooks/useNotifications';

const DemoNotificationTrigger: React.FC = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Add demo notifications after component mounts
    const timer = setTimeout(() => {
      const hasTriggered = localStorage.getItem('demoNotificationsTriggered');
      
      if (!hasTriggered) {
        // Add welcome notification
        addNotification({
          type: 'offer',
          title: '🎉 Welcome to PlaySpot!',
          message: 'Get 20% off on your first booking with code WELCOME20',
          priority: 'high',
          action: {
            label: 'Book Now',
            url: '/explore'
          }
        });

        // Add tournament notification
        setTimeout(() => {
          addNotification({
            type: 'tournament',
            title: '🏆 Weekend Tournament',
            message: 'Cricket tournament this Saturday! Register now for exciting prizes.',
            priority: 'medium',
            action: {
              label: 'Register',
              url: '/tournaments'
            }
          });
        }, 2000);

        localStorage.setItem('demoNotificationsTriggered', 'true');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [addNotification]);

  return null; // This component doesn't render anything
};

export default DemoNotificationTrigger;