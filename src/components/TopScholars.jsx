import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, TrendingUp, GraduationCap, ChevronRight } from 'lucide-react';

import { supabase } from '../lib/supabase';

const ScholarRow = ({ scholar, index }) => (
  <motion.div 
    className="scholar-row-item"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <div className="scholar-rank">
      {index < 3 ? (
        <div className={`rank-medal rank-${index + 1}`}>
          <Trophy size={16} />
        </div>
      ) : (
        <span className="rank-number">{index + 1}</span>
      )}
    </div>
    
    <div className="scholar-profile">
      <div className="scholar-avatar-large">
        <img src={scholar.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${scholar.full_name}`} alt="avatar" />
      </div>
      <div className="scholar-names">
        <h4>{scholar.full_name}</h4>
        <span className="scholar-tag">{scholar.role}</span>
      </div>
    </div>

    <div className="scholar-stats-grid">
      <div className="stat-box">
        <span className="stat-value">{scholar.solved_count || 0}</span>
        <span className="stat-label">Solved</span>
      </div>
      <div className="stat-box">
        <span className="stat-value">{scholar.academic_percentage}%</span>
        <span className="stat-label">Score</span>
      </div>
      <div className="stat-box">
        <span className="stat-value primary">{scholar.academic_percentage >= 90 ? 'A+' : scholar.academic_percentage >= 80 ? 'A' : 'B'}</span>
        <span className="stat-label">Reputation</span>
      </div>
    </div>

    <button className="btn-view-scholar">
      <span>View Profile</span>
      <ChevronRight size={16} />
    </button>
  </motion.div>
);

export default function TopScholars() {
  const [loading, setLoading] = useState(true);
  const [scholars, setScholars] = useState([]);

  useEffect(() => {
    fetchTopScholars();
  }, []);

  const fetchTopScholars = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('academic_percentage', { ascending: false })
      .limit(20);

    if (data) setScholars(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="scholars-loading">
        <div className="spinner"></div>
        <span>Calculating rankings...</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="scholars-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header scholars-header">
        <div className="header-icon-box">
          <Trophy size={32} color="#F59E0B" />
        </div>
        <div>
          <h1>Top Scholars</h1>
          <p>The best performing students in the community this month.</p>
        </div>
      </div>

      <div className="scholars-list-container">
        {scholars.map((scholar, index) => (
          <ScholarRow key={scholar.id} scholar={scholar} index={index} />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .scholars-page-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .scholars-header {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 40px;
        }

        .header-icon-box {
          width: 64px;
          height: 64px;
          background-color: rgba(245, 158, 11, 0.1);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .scholars-header h1 {
          font-size: 2rem;
          margin-bottom: 4px;
        }

        .scholars-header p {
          color: var(--text-muted);
        }

        .scholars-list-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .scholar-row-item {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 24px;
          transition: all 0.2s;
        }

        .scholar-row-item:hover {
          border-color: rgba(255, 255, 255, 0.1);
          background-color: var(--bg-card);
          transform: translateY(-2px);
        }

        .scholar-rank {
          width: 40px;
          display: flex;
          justify-content: center;
          font-weight: 800;
          font-size: 1.1rem;
          color: var(--text-muted);
        }

        .rank-medal {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .rank-1 { background-color: #F59E0B; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); }
        .rank-2 { background-color: #94A3B8; box-shadow: 0 4px 12px rgba(148, 163, 184, 0.3); }
        .rank-3 { background-color: #D97706; box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3); }

        .scholar-profile {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 220px;
        }

        .scholar-avatar-large {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
          border: 2px solid var(--border);
        }

        .scholar-names h4 {
          font-size: 1.1rem;
          margin-bottom: 2px;
        }

        .scholar-tag {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          background-color: rgba(79, 70, 229, 0.1);
          padding: 2px 8px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        .scholar-stats-grid {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .stat-value.primary {
          color: var(--primary);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-view-scholar {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-main);
          padding: 8px 16px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-view-scholar:hover {
          background-color: var(--border);
          border-color: var(--text-muted);
        }

        .scholars-loading {
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
          border-top: 3px solid #F59E0B;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .scholar-stats-grid {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .scholars-page-container {
            padding: 24px;
          }
          .scholar-row-item {
            padding: 16px;
            gap: 12px;
          }
          .btn-view-scholar span {
            display: none;
          }
        }
      `}} />
    </motion.div>
  );
}
