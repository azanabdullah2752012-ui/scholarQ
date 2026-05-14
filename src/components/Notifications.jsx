import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, MessageSquare, Star, Trophy, CheckCircle, Clock } from 'lucide-react';

const NotificationItem = ({ item }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'answer': return <MessageSquare size={18} color="#4F46E5" />;
      case 'upvote': return <Star size={18} color="#F59E0B" />;
      case 'best': return <CheckCircle size={18} color="#10B981" />;
      case 'rank': return <Trophy size={18} color="#8957E5" />;
      default: return <Bell size={18} />;
    }
  };

  const getBg = (type) => {
    switch (type) {
      case 'answer': return 'rgba(79, 70, 229, 0.1)';
      case 'upvote': return 'rgba(245, 158, 11, 0.1)';
      case 'best': return 'rgba(16, 185, 129, 0.1)';
      case 'rank': return 'rgba(137, 87, 229, 0.1)';
      default: return 'rgba(255, 255, 255, 0.05)';
    }
  };

  return (
    <motion.div 
      className={`notification-item ${item.unread ? 'unread' : ''}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="notif-icon-box" style={{ backgroundColor: getBg(item.type) }}>
        {getIcon(item.type)}
      </div>
      <div className="notif-content">
        <p className="notif-text">
          <span className="notif-user">{item.user}</span> {item.text}
          {item.target && <span className="notif-target"> "{item.target}"</span>}
        </p>
        <span className="notif-time">{item.time}</span>
      </div>
      {item.unread && <div className="unread-dot"></div>}
    </motion.div>
  );
};

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [notifs, setNotifs] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('scholarq_notifications');
    if (saved) {
      setNotifs(JSON.parse(saved));
      setLoading(false);
    } else {
      const initialNotifs = [
        { id: 1, type: 'answer', user: 'Arjun Dev', text: 'answered your doubt', target: 'How to solve trigonometric equations...', time: '10 min ago', unread: true },
        { id: 2, type: 'best', user: 'System', text: 'Your answer was selected as the', target: 'Best Answer in Chemistry', time: '2 hours ago', unread: true },
        { id: 3, type: 'upvote', user: 'Meera Verma', text: 'upvoted your solution to', target: 'Newton Second Law', time: '5 hours ago', unread: false },
        { id: 4, type: 'rank', user: 'System', text: 'Congratulations! You reached the', target: 'Scholar Level 5', time: '1 day ago', unread: false }
      ];
      setNotifs(initialNotifs);
      localStorage.setItem('scholarq_notifications', JSON.stringify(initialNotifs));
      setLoading(false);
    }
  }, []);

  const handleMarkAllRead = () => {
    const updated = notifs.map(n => ({ ...n, unread: false }));
    setNotifs(updated);
    localStorage.setItem('scholarq_notifications', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    setNotifs([]);
    localStorage.setItem('scholarq_notifications', JSON.stringify([]));
  };

  if (loading) {
    return (
      <div className="notifs-loading">
        <div className="spinner"></div>
        <span>Syncing notifications...</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="notifs-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header notifs-header">
        <h1>Notifications</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="mark-all-btn" onClick={handleMarkAllRead}>Mark all as read</button>
          <button className="mark-all-btn" onClick={handleClearAll} style={{ color: '#EF4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}>Clear all</button>
        </div>
      </div>

      <div className="notifs-list">
        {notifs.length > 0 ? notifs.map(item => (
          <NotificationItem key={item.id} item={item} />
        )) : (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>You have no notifications.</div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .notifs-page-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .notifs-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .mark-all-btn {
          background: none;
          border: 1px solid var(--border);
          color: var(--text-muted);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mark-all-btn:hover {
          color: var(--text-main);
          border-color: var(--text-muted);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .notifs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .notification-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 16px 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          transition: all 0.2s;
          cursor: pointer;
        }

        .notification-item:hover {
          border-color: rgba(255, 255, 255, 0.1);
          transform: translateX(4px);
        }

        .notification-item.unread {
          background-color: rgba(79, 70, 229, 0.03);
          border-color: rgba(79, 70, 229, 0.2);
        }

        .notif-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .notif-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .notif-text {
          font-size: 0.95rem;
          line-height: 1.4;
          color: var(--text-main);
        }

        .notif-user {
          font-weight: 700;
        }

        .notif-target {
          color: var(--text-muted);
          font-style: italic;
        }

        .notif-time {
          font-size: 0.8rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .unread-dot {
          width: 8px;
          height: 8px;
          background-color: var(--primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--primary);
        }

        .notifs-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .spinner {
          width: 32px;
          height: 32px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .notifs-page-container {
            padding: 24px;
          }
          .notif-text {
            font-size: 0.85rem;
          }
        }
      `}} />
    </motion.div>
  );
}
