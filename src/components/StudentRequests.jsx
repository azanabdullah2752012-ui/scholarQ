import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Search, Clock, HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/context';

const DoubtCard = ({ doubt, onClick }) => {
  const iconColor = doubt.subject === 'Mathematics' ? '#4F46E5' : 
                   doubt.subject === 'Physics' ? '#F59E0B' : 
                   doubt.subject === 'Chemistry' ? '#10B981' : '#388BFD';

  return (
    <div className="doubt-card-item" onClick={() => onClick(doubt)}>
      <div className="doubt-main">
        <div className="doubt-subject-icon" style={{ backgroundColor: `${iconColor}22`, color: iconColor }}>
          <HelpCircle size={24} />
        </div>
        <div className="doubt-details">
          <div className="doubt-header">
            {doubt.is_blitz && <span className="doubt-tag">Blitz</span>}
            <span className="doubt-title">{doubt.title}</span>
          </div>
          <div className="doubt-meta">
            <span className="subject-text" style={{ color: iconColor }}>{doubt.subject}</span>
            <span className="separator">•</span>
            <span>Class {doubt.grade || '12'}</span>
          </div>
          <div className="doubt-footer">
            <div className="asker-info">
              <div className="avatar-mini">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doubt.profiles?.full_name || 'User'}`} alt="avatar" />
              </div>
              <span>{doubt.profiles?.full_name || 'User'}</span>
              <span className="separator">•</span>
              <span className="time-text">
                {doubt.created_at ? new Date(doubt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
              </span>
            </div>
            <div className="answer-count">
              <MessageCircle size={14} />
              <span>{doubt.answer_count || 0} Answers</span>
            </div>
          </div>
        </div>
      </div>
      <div className="doubt-pts">
        {doubt.points || 10} pts
      </div>
    </div>
  );
};

export default function StudentRequests({ onDoubtClick, refreshTrigger }) {
  const { profile } = useAuth();
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.id) {
      fetchRequests();
    }
  }, [profile?.id, refreshTrigger]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('doubts')
        .select('*')
        .eq('target_scholar_id', profile.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("fetchRequests error:", error);
      }
      if (data) {
        const userIds = [...new Set(data.map(d => d.user_id).filter(Boolean))];
        if (userIds.length > 0) {
          const { data: profilesData } = await supabase
            .from('profiles')
            .select('id, full_name, role')
            .in('id', userIds);
          
          if (profilesData) {
            const profileMap = {};
            profilesData.forEach(p => {
              profileMap[p.id] = p;
            });
            const doubtsWithProfiles = data.map(d => ({
              ...d,
              profiles: profileMap[d.user_id] || null
            }));
            setDoubts(doubtsWithProfiles);
            return;
          }
        }
        setDoubts(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      className="requests-view"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="view-header">
        <h1>Student Requests</h1>
        <p>Direct help requests sent specifically to you.</p>
      </div>

      {loading ? (
        <div className="feed-loading">
          <div className="spinner"></div>
          <span>Retrieving directed signals...</span>
        </div>
      ) : doubts.length === 0 ? (
        <div className="empty-requests">
          <div className="empty-icon-box">
            <Search size={48} />
          </div>
          <h3>No direct requests yet</h3>
          <p>When students specifically request your help, they will appear here.</p>
        </div>
      ) : (
        <div className="doubts-list">
          {doubts.map(doubt => (
            <DoubtCard key={doubt.id} doubt={doubt} onClick={onDoubtClick} />
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .requests-view {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .view-header {
          margin-bottom: 40px;
        }

        .view-header h1 {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }

        .view-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
        }

        .feed-loading {
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .empty-requests {
          padding: 80px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
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
          margin-bottom: 24px;
          color: var(--text-muted);
        }

        .empty-requests h3 {
          font-size: 1.5rem;
          margin-bottom: 12px;
        }

        .empty-requests p {
          color: var(--text-muted);
          max-width: 400px;
          line-height: 1.6;
        }

        .doubts-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .doubt-card-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .doubt-card-item:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .doubt-main {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .doubt-subject-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doubt-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .doubt-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doubt-tag {
          background-color: #EF4444;
          color: white;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .doubt-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .doubt-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .subject-text {
          font-weight: 600;
        }

        .doubt-footer {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-top: 8px;
        }

        .asker-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .avatar-mini {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
        }

        .avatar-mini img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .answer-count {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .doubt-pts {
          background-color: var(--bg-card);
          padding: 8px 16px;
          border-radius: 12px;
          font-weight: 700;
          color: var(--text-main);
          font-size: 0.9rem;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}} />
    </motion.div>
  );
}
