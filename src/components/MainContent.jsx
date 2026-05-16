import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle, Star, MessageCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/context';

const StatCard = ({ icon: Icon, value, label, subtitle, colorClass }) => (
  <div className="stat-card">
    <div className={`stat-icon-container ${colorClass}`}>
      <Icon size={24} />
    </div>
    <div className="stat-info">
      <h3>{value}</h3>
      <p className="stat-label">{label}</p>
      {subtitle && <p className="stat-subtitle">{subtitle}</p>}
    </div>
  </div>
);

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
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${doubt.asker_name}`} alt="avatar" />
              </div>
              <span>{doubt.asker_name}</span>
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

export default function MainContent({ searchQuery, isScholar, activeTab, onDoubtClick, onViewAll }) {
  const { profile } = useAuth();
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ unanswered: 0, solved: 0 });

  useEffect(() => {
    fetchDoubts();
    if (isScholar) fetchStats();
  }, [searchQuery, activeTab]);

  const fetchDoubts = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('doubts')
        .select('*, profiles(full_name)');

      if (activeTab === 'Unanswered Feed') {
        query = query.eq('status', 'open').order('created_at', { ascending: true });
      } else if (activeTab === 'Scholar Hub') {
        query = query.eq('status', 'open').order('created_at', { ascending: false });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,subject.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query.limit(20);
      if (data) setDoubts(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    // 1. Get unanswered doubts
    const { count: unanswered } = await supabase
      .from('doubts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'open');

    // 2. Get total community answers (as a measure of "solved by community")
    const { count: totalAnswers } = await supabase
      .from('answers')
      .select('*', { count: 'exact', head: true });

    setStats({ 
      unanswered: unanswered || 0, 
      solved: totalAnswers || 0 
    });
  };

  return (
    <motion.div 
      className="main-content"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {activeTab !== 'Unanswered Feed' && (
        <div className="greeting-section">
          <h1>Good evening, {profile?.full_name?.split(' ')[0] || 'Scholar'}! 👋</h1>
          <p>{isScholar ? 'Ready to share your expertise? Here are students waiting for help.' : 'Need help with something? Our scholars are here for you.'}</p>
        </div>
      )}

      {isScholar && activeTab !== 'Unanswered Feed' && (
        <div className="stats-row">
          <StatCard 
            icon={HelpCircle} 
            value={stats.unanswered} 
            label="Unanswered" 
            subtitle="Doubts"
            colorClass="blue"
          />
          <StatCard 
            icon={CheckCircle} 
            value={stats.solved} 
            label="Doubts Solved" 
            subtitle="by Community"
            colorClass="green"
          />
          <StatCard 
            icon={Star} 
            value={profile?.reputation || '4.8'} 
            label="Your Reputation" 
            subtitle="(Excellent)"
            colorClass="yellow"
          />
        </div>
      )}

      <div className="recent-doubts-section">
        <div className="section-header">
          <h2>
            {searchQuery 
              ? `Search Results for "${searchQuery}"` 
              : activeTab === 'Unanswered Feed' 
                ? 'Unanswered Feed' 
                : activeTab === 'Scholar Hub'
                  ? 'High Priority Doubts'
                  : 'Recent Doubts'
            }
          </h2>
          {!searchQuery && activeTab !== 'Unanswered Feed' && <button className="btn-link" onClick={onViewAll}>View All</button>}
        </div>

        {loading ? (
          <div className="feed-loading">
            <div className="spinner"></div>
            <span>Scanning academic frequency...</span>
          </div>
        ) : doubts.length === 0 ? (
          <div className="empty-feed">
            <div className="empty-icon-box">
              <Search size={48} />
            </div>
            <h3>No results found</h3>
            <p>Try adjusting your search terms or ask a new doubt.</p>
          </div>
        ) : (
          <div className="doubts-list">
            {doubts.map(doubt => (
              <DoubtCard key={doubt.id} doubt={doubt} onClick={() => onDoubtClick?.(doubt)} />
            ))}
          </div>
        )}

        {!searchQuery && doubts.length > 0 && activeTab !== 'Unanswered Feed' && (
          <div className="section-footer">
            <button className="btn-view-all" onClick={onViewAll}>View all doubts →</button>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .main-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .feed-loading {
          padding: 60px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          color: var(--text-muted);
        }

        .empty-feed {
          padding: 60px 0;
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
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .greeting-section h1 {
          font-size: 2rem;
          margin-bottom: 8px;
        }

        .greeting-section p {
          color: var(--text-muted);
          font-size: 1rem;
          margin-bottom: 40px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-bottom: 48px;
        }

        .stat-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          transition: transform 0.2s;
          cursor: pointer;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .stat-icon-container {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-icon-container.blue { background-color: rgba(79, 70, 229, 0.1); color: var(--primary); }
        .stat-icon-container.green { background-color: rgba(16, 185, 129, 0.1); color: #10B981; }
        .stat-icon-container.yellow { background-color: rgba(245, 158, 11, 0.1); color: #F59E0B; }

        .stat-info h3 {
          font-size: 1.5rem;
          margin-bottom: 2px;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .stat-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .recent-doubts-section {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .section-header h2 {
          font-size: 1.25rem;
        }

        .btn-link {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .doubts-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .doubt-card-item {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border);
          cursor: pointer;
        }

        .doubt-card-item:hover .doubt-title {
          color: var(--primary);
        }

        .doubt-card-item:last-child {
          border-bottom: none;
        }

        .doubt-main {
          display: flex;
          gap: 20px;
        }

        .doubt-subject-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .doubt-details {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .doubt-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .doubt-tag {
          background-color: var(--accent-purple);
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .doubt-title {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.4;
          transition: color 0.2s;
        }

        .doubt-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .separator {
          color: var(--border);
        }

        .doubt-footer {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 24px;
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

        .answer-count {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: var(--primary);
          font-weight: 600;
        }

        .doubt-pts {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          padding: 6px 12px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .section-footer {
          margin-top: 32px;
          display: flex;
          justify-content: center;
        }

        .btn-view-all {
          background: none;
          border: none;
          color: var(--primary);
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .btn-view-all:hover {
          transform: translateX(4px);
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
      `}} />
    </motion.div>
  );
}
