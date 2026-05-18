import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, ChevronRight, HelpCircle, Inbox } from 'lucide-react';

import { useAuth } from '../lib/context';
import { supabase } from '../lib/supabase';

const DoubtListItem = ({ doubt, onClick }) => (
  <motion.div 
    className="doubt-list-item"
    onClick={() => onClick(doubt)}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ x: 4, borderColor: 'var(--primary)' }}
  >
    <div className="doubt-item-main">
      <div className="doubt-item-icon" style={{ backgroundColor: `${doubt.color || '#4F46E5'}22`, color: doubt.color || '#4F46E5' }}>
        <HelpCircle size={20} />
      </div>
      <div className="doubt-item-content">
        <div className="doubt-item-header">
          <span className="doubt-item-subject" style={{ color: doubt.color || '#4F46E5' }}>{doubt.subject}</span>
          <span className="doubt-item-status" data-status={doubt.status || 'Open'}>{doubt.status || 'Open'}</span>
        </div>
        <h4 className="doubt-item-title">{doubt.title}</h4>
        <div className="doubt-item-meta">
          <div className="meta-group">
            <Clock size={14} />
            <span>{new Date(doubt.created_at).toLocaleDateString()}</span>
          </div>
          <div className="meta-group">
            <MessageCircle size={14} />
            <span>{doubt.answer_count || 0} Answers</span>
          </div>
        </div>
      </div>
    </div>
    <ChevronRight size={20} className="chevron" />
  </motion.div>
);

export default function MyDoubts({ onDoubtClick, refreshTrigger }) {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [doubts, setDoubts] = useState([]);

  useEffect(() => {
    const currentUserId = profile?.id || user?.id;
    if (currentUserId) {
      fetchMyDoubts(currentUserId);
    }
  }, [user?.id, profile?.id, refreshTrigger]);

  const fetchMyDoubts = async (currentUserId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('doubts')
      .select('*')
      .eq('user_id', currentUserId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("fetchMyDoubts error:", error);
    }
    if (data) {
      // Fetch current user's profile to map name
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, full_name')
        .eq('id', currentUserId)
        .single();

      const doubtsWithProfile = data.map(d => ({
        ...d,
        profiles: profileData || null
      }));
      setDoubts(doubtsWithProfile);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="my-doubts-loading">
        <div className="spinner"></div>
        <span>Loading your doubts...</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="my-doubts-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <h1>My Doubts</h1>
        <p>You have posted {doubts.length} doubts so far.</p>
      </div>

      {doubts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-box">
            <Inbox size={48} />
          </div>
          <h3>No doubts yet</h3>
          <p>When you ask a doubt, it will appear here.</p>
        </div>
      ) : (
        <div className="doubts-scroll-list">
          {doubts.map(doubt => (
            <DoubtListItem key={doubt.id} doubt={doubt} onClick={onDoubtClick} />
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .my-doubts-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .page-header {
          margin-bottom: 32px;
        }

        .page-header h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .page-header p {
          color: var(--text-muted);
        }

        .doubts-scroll-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .doubt-list-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .doubt-item-main {
          display: flex;
          gap: 16px;
          align-items: center;
        }

        .doubt-item-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .doubt-item-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .doubt-item-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .doubt-item-subject {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .doubt-item-status {
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 6px;
          text-transform: capitalize;
        }

        .doubt-item-status[data-status="Open"] {
          background-color: rgba(79, 70, 229, 0.1);
          color: var(--primary);
        }

        .doubt-item-status[data-status="Resolved"] {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10B981;
        }

        .doubt-item-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .doubt-item-meta {
          display: flex;
          gap: 16px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .meta-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .chevron {
          color: var(--border);
          transition: transform 0.2s, color 0.2s;
        }

        .doubt-list-item:hover .chevron {
          transform: translateX(4px);
          color: var(--text-main);
        }

        .my-doubts-loading {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 0;
          text-align: center;
        }

        .empty-icon-box {
          width: 80px;
          height: 80px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .empty-state h3 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .empty-state p {
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
          .my-doubts-container {
            padding: 24px;
          }
        }
      `}} />
    </motion.div>
  );
}
