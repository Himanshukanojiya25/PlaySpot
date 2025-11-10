import { useState, useEffect } from 'react';
import notificationsData from '../data/notifications.json';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [autoGenerate, setAutoGenerate] = useState(true);

  // Load notifications from localStorage or use default data
  useEffect(() => {
    const storedNotifications = localStorage.getItem('turfNotifications');
    if (storedNotifications) {
      const parsedNotifications = JSON.parse(storedNotifications);
      setNotifications(parsedNotifications);
      updateUnreadCount(parsedNotifications);
    } else {
      setNotifications(notificationsData.notifications);
      updateUnreadCount(notificationsData.notifications);
      localStorage.setItem('turfNotifications', JSON.stringify(notificationsData.notifications));
    }
  }, []);

  // Auto-generate notifications every 30 seconds
  useEffect(() => {
    if (!autoGenerate) return;

    const interval = setInterval(() => {
      generateRandomNotification();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoGenerate, notifications]);

  const updateUnreadCount = (notifs) => {
    const count = notifs.filter(notification => !notification.isRead).length;
    setUnreadCount(count);
  };

  const generateRandomNotification = () => {
    const notificationTypes = [
      {
        type: 'tournament',
        title: '🏆 New Tournament Alert!',
        message: 'Fresh tournament announced! Register now for exciting prizes.',
        priority: 'high'
      },
      {
        type: 'offer',
        title: '🎯 Limited Time Offer!',
        message: 'Special discount available for next 2 hours. Book now!',
        priority: 'medium'
      },
      {
        type: 'live',
        title: '⚡ Live Match Update',
        message: 'New match started at Elite Arena. Watch the action live!',
        priority: 'high'
      },
      {
        type: 'reminder',
        title: '🕒 Peak Hours Reminder',
        message: 'Evening slots filling fast. Book your preferred time now!',
        priority: 'medium'
      },
      {
        type: 'event',
        title: '🎪 Special Event Coming',
        message: 'Weekend sports festival with fun activities for all ages!',
        priority: 'low'
      }
    ];

    const randomNotif = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
    
    addNotification({
      ...randomNotif,
      action: {
        label: 'View Details',
        url: '/explore'
      }
    });
  };

  const markAsRead = (notificationId) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === notificationId ? { ...notification, isRead: true } : notification
    );
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    localStorage.setItem('turfNotifications', JSON.stringify(updatedNotifications));
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true
    }));
    setNotifications(updatedNotifications);
    setUnreadCount(0);
    localStorage.setItem('turfNotifications', JSON.stringify(updatedNotifications));
  };

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      isRead: false,
      ...notification
    };
    const updatedNotifications = [newNotification, ...notifications.slice(0, 19)]; // Keep only last 20
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    localStorage.setItem('turfNotifications', JSON.stringify(updatedNotifications));
  };

  const deleteNotification = (notificationId) => {
    const updatedNotifications = notifications.filter(notification => notification.id !== notificationId);
    setNotifications(updatedNotifications);
    updateUnreadCount(updatedNotifications);
    localStorage.setItem('turfNotifications', JSON.stringify(updatedNotifications));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem('turfNotifications');
  };

  const getNotificationsByType = (type) => {
    return notifications.filter(notification => notification.type === type);
  };

  const getPriorityNotifications = () => {
    return notifications.filter(notification => notification.priority === 'high' && !notification.isRead);
  };

  const toggleAutoGenerate = () => {
    setAutoGenerate(!autoGenerate);
  };

  return {
    notifications,
    unreadCount,
    autoGenerate,
    markAsRead,
    markAllAsRead,
    addNotification,
    deleteNotification,
    clearAllNotifications,
    getNotificationsByType,
    getPriorityNotifications,
    toggleAutoGenerate,
    generateRandomNotification
  };
};