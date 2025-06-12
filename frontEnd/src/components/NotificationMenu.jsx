import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBell, FaCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

const NotificationMenu = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, token } = useAuth();
  const wsRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;
  const reconnectDelay = 3000; // 3 seconds

  useEffect(() => {
    if (user && token) {
      // Load initial notifications
      fetchNotifications();
      // Connect to WebSocket
      connectWebSocket();

      // Cleanup on unmount
      return () => {
        if (wsRef.current) {
          wsRef.current.close();
        }
      };
    }
  }, [user, token]); // Add token as dependency

  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const { data } = await response.json();
      if (Array.isArray(data)) {
        setNotifications(data);
        setUnreadCount(data.filter(n => !n.read).length);
      } else {
        console.error('Unexpected response format:', data);
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  const attemptReconnect = () => {
    if (reconnectAttemptsRef.current < maxReconnectAttempts) {
      reconnectAttemptsRef.current++;
      console.log(`Attempting to reconnect (${reconnectAttemptsRef.current}/${maxReconnectAttempts})...`);
      setTimeout(connectWebSocket, reconnectDelay);
    }
  };

  const connectWebSocket = () => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('WebSocket connection already exists');
      return;
    }

    const wsHost = import.meta.env.VITE_PUSHER_HOST || '127.0.0.1';
    const wsPort = import.meta.env.VITE_PUSHER_PORT || '6001';
    const appKey = import.meta.env.VITE_PUSHER_APP_KEY;
    const wsScheme = import.meta.env.VITE_PUSHER_SCHEME || 'wss';
    
    try {
      const ws = new WebSocket(`${wsScheme}://${wsHost}:${wsPort}/app/${appKey}`);
      wsRef.current = ws;
      
      ws.onopen = () => {
        console.log('WebSocket connection established');
        reconnectAttemptsRef.current = 0;
        const socketId = Date.now().toString();
        ws.send(JSON.stringify({
          event: 'pusher:connection',
          data: {
            socket_id: socketId,
            auth: token
          }
        }));

        wsRef.current.socketId = socketId;
      };

      ws.onmessage = async (event) => {
        const response = JSON.parse(event.data);
        console.log('WebSocket message received:', response);

        if (response.event === 'pusher:connection_established') {
          try {
            const socketId = wsRef.current.socketId;
            const channelName = `private-notifications.${user.id}`;
            
            const authResponse = await fetch(`${import.meta.env.VITE_API_URL}/broadcasting/auth`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                socket_id: socketId,
                channel_name: channelName
              })
            });

            if (!authResponse.ok) {
              throw new Error('Failed to authenticate channel');
            }

            const auth = await authResponse.json();
            console.log('Channel auth successful:', auth);

            ws.send(JSON.stringify({
              event: 'pusher:subscribe',
              data: {
                auth: auth.auth,
                channel: channelName
              }
            }));
          } catch (error) {
            console.error('Error getting channel auth:', error);
            attemptReconnect();
          }
          return;
        }

        if (response.event === 'pusher_internal:subscription_succeeded') {
          console.log('Successfully subscribed to notifications channel');
          return;
        }

        if (response.event === 'notification.created') {
          try {
            let notification = response.data;
            
            // Parse the data if it's a string
            if (typeof notification === 'string') {
              notification = JSON.parse(notification);
            }
              
            if (notification) {
              console.log('Received new notification:', notification);
              setNotifications(prev => {
                // Check if notification already exists
                const exists = prev.some(n => 
                  n.id === notification.id || 
                  (n.type === notification.type && 
                   n.comment_id === notification.comment_id && 
                   n.user_id === notification.user_id)
                );
                
                if (!exists) {
                  // Only update if notification doesn't exist
                  setUnreadCount(prevCount => prevCount + 1);
                  return [notification, ...prev];
                }
                return prev;
              });
            }
          } catch (error) {
            console.error('Error processing notification:', error);
          }
        }
      };

      ws.onerror = (error) => {
        console.error('Notification WebSocket error:', error);
        attemptReconnect();
      };

      ws.onclose = () => {
        console.log('Notification WebSocket closed');
        attemptReconnect();
      };
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      attemptReconnect();
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/notifications/${notificationId}/read`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      setUnreadCount(count => Math.max(0, count - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/notifications/mark-all-read`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const getNotificationLink = (notification) => {
    switch (notification.type) {
      case 'comment':
        return `/produit/${notification.product_id}?id=${notification.product_id}#comments`;
      case 'reply':
        return `/produit/${notification.product_id}?id=${notification.product_id}#comment-${notification.comment_id}`;
      default:
        return '#';
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `Il y a ${days} jour${days > 1 ? 's' : ''}`;
    if (hours > 0) return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `Il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
    return 'À l\'instant';
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:text-gray-200 transition-colors font-medium flex items-center gap-1"
        title="Notifications"
      >
        <FaBell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-semibold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-3 w-96 bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-semibold text-gray-800">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-[#e63812] hover:text-[#ff6b4a] transition-colors font-medium"
                >
                  Tout marquer comme lu
                </button>
              )}
            </div>

            {/* Notification List */}
            <div className="divide-y divide-gray-100 max-h-[70vh] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  Aucune notification
                </div>
              ) : (
                notifications.map(notification => (
                  <Link
                    key={notification.id}
                    to={getNotificationLink(notification)}
                    className={`block p-4 hover:bg-gray-50 transition-colors ${
                      !notification.read ? 'bg-blue-50/30' : ''
                    }`}
                    onClick={() => {
                      if (!notification.read) markAsRead(notification.id);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {!notification.read && (
                          <FaCircle className="w-2 h-2 text-[#e63812]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-800 mb-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {getTimeAgo(notification.created_at)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationMenu;
