import React, { useState, useEffect } from 'react';
import { HelpCircle, Users, CheckCircle, MessageSquare, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const ScholarItem = ({ rank, name, subjects, score, avatar, onClick }) => (
  <div className="scholar-item" onClick={onClick}>
    <div className={`rank-badge rank-${rank}`}>{rank}</div>
    <div className="scholar-avatar">
      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar}`} alt="avatar" />
    </div>
    <div className="scholar-info">
      <h4>{name}</h4>
      <p>{subjects}</p>
    </div>
    <div className="scholar-score">{score}%</div>
  </div>
);

const StepItem = ({ number, icon: Icon, title, description }) => (
  <div className="step-item">
    <div className="step-number-container">
      <div className="step-number">{number}</div>
      <div className="step-line"></div>
    </div>
    <div className="step-content">
      <div className="step-icon-box">
        <Icon size={16} />
      </div>
      <div className="step-text">
        <h5>{title}</h5>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default function RightPanel({ setActiveTab, onProfileClick }) {
  const [topScholars, setTopScholars] = useState([]);

  useEffect(() => {
    fetchTopScholars();
  }, []);

  const fetchTopScholars = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('academic_percentage', { ascending: false })
      .limit(5);
    if (data) setTopScholars(data);
  };

  return (
    <motion.aside 
      className="right-panel"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="panel-section">
        <div className="section-header">
          <h3>Top Scholars</h3>
          <button 
            className="btn-link"
            onClick={() => setActiveTab('Top Scholars')}
          >
            View All
          </button>
        </div>
        <div className="scholars-list">
          {topScholars.length > 0 ? topScholars.map((scholar, i) => (
            <ScholarItem 
              key={scholar.id} 
              rank={i + 1} 
              name={scholar.full_name} 
              subjects={(scholar.subjects || []).slice(0, 2).join(', ') || 'General'} 
              score={scholar.academic_percentage} 
              avatar={scholar.full_name} 
              onClick={() => onProfileClick?.(scholar.id)}
            />
          )) : (
            <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading scholars...</div>
          )}
        </div>
      </div>

      <div className="panel-section">
        <div className="section-header">
          <h3>How it works</h3>
        </div>
        <div className="steps-container">
          <StepItem 
            number={1} 
            icon={HelpCircle} 
            title="Ask your doubt" 
            description="Post your question clearly." 
          />
          <StepItem 
            number={2} 
            icon={Users} 
            title="Scholars answer" 
            description="Top scoring students help you." 
          />
          <StepItem 
            number={3} 
            icon={CheckCircle} 
            title="Best answer chosen" 
            description="Mark the best answer." 
          />
          <StepItem 
            number={4} 
            icon={MessageSquare} 
            title="Everyone learns" 
            description="Knowledge grows together." 
          />
        </div>
      </div>

      <div className="quote-card">
        <Quote size={32} className="quote-icon" />
        <div className="quote-content">
          <p className="quote-text">
            The beautiful thing about learning is that no one can take it away from you.
          </p>
          <span className="quote-author">— B.B. King</span>
        </div>
        <Quote size={32} className="quote-icon-bottom" />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .right-panel {
          width: var(--panel-width);
          background-color: var(--bg-deep);
          border-left: 1px solid var(--border);
          padding: 32px 24px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          overflow-y: auto;
          overflow-x: hidden;
          flex-shrink: 0;
        }

        .panel-section .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .panel-section .section-header h3 {
          font-size: 1.1rem;
          color: var(--text-main);
        }

        .scholars-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .scholar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 12px;
          transition: border-color 0.2s;
          cursor: pointer;
        }

        .scholar-item:hover {
          border-color: var(--text-muted);
        }

        .rank-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 800;
          background-color: var(--bg-card);
          color: var(--text-muted);
        }

        .rank-1 { background-color: #F59E0B; color: white; }
        .rank-2 { background-color: #94A3B8; color: white; }
        .rank-3 { background-color: #D97706; color: white; }

        .scholar-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
        }

        .scholar-info {
          flex: 1;
        }

        .scholar-info h4 {
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        .scholar-info p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .scholar-score {
          font-size: 0.9rem;
          font-weight: 700;
          color: #10B981;
        }

        .steps-container {
          display: flex;
          flex-direction: column;
        }

        .step-item {
          display: flex;
          gap: 16px;
        }

        .step-number-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-number {
          width: 28px;
          height: 28px;
          background-color: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 800;
          z-index: 1;
        }

        .step-line {
          width: 2px;
          flex: 1;
          background-color: var(--border);
          margin: 4px 0;
        }

        .step-item:last-child .step-line {
          display: none;
        }

        .step-content {
          display: flex;
          gap: 12px;
          padding-bottom: 24px;
        }

        .step-icon-box {
          width: 32px;
          height: 32px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary);
          flex-shrink: 0;
        }

        .step-text h5 {
          font-size: 0.9rem;
          margin-bottom: 2px;
        }

        .step-text p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .quote-card {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%);
          border: 1px solid rgba(79, 70, 229, 0.2);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
          min-height: 140px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .quote-content {
          position: relative;
          z-index: 1;
        }

        .quote-text {
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 500;
          margin-bottom: 12px;
        }

        .quote-author {
          font-size: 0.8rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .quote-icon {
          position: absolute;
          top: -10px;
          left: -10px;
          opacity: 0.1;
          color: var(--primary);
        }

        .quote-icon-bottom {
          position: absolute;
          bottom: -10px;
          right: -10px;
          opacity: 0.1;
          color: var(--primary);
        }
      `}} />
    </motion.aside>
  );
}
