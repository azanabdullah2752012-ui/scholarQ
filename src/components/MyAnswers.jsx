import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Clock, ChevronRight, CheckCircle, Search } from 'lucide-react';

const AnswerListItem = ({ item, onClick }) => (
  <motion.div 
    className="answer-list-item"
    onClick={() => onClick(item)}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ x: 4, borderColor: '#10B981' }}
  >
    <div className="answer-item-main">
      <div className="answer-status-icon">
        <CheckCircle size={22} color="#10B981" />
      </div>
      <div className="answer-item-content">
        <div className="answer-item-header">
          <span className="answer-item-subject" style={{ color: item.color }}>{item.subject}</span>
          {item.isBest && <span className="best-badge">Best Answer</span>}
        </div>
        <h4 className="answer-item-title">{item.title}</h4>
        <p className="answer-snippet">" {item.myAnswerSnippet} "</p>
        <div className="answer-item-meta">
          <div className="meta-group">
            <Clock size={14} />
            <span>Answered {item.timestamp}</span>
          </div>
          <div className="meta-group">
            <MessageCircle size={14} />
            <span>{item.totalAnswers} total answers</span>
          </div>
        </div>
      </div>
    </div>
    <ChevronRight size={20} className="chevron" />
  </motion.div>
);

export default function MyAnswers({ onDoubtClick }) {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      setAnswers([
        {
          id: 101,
          title: "How to solve trigonometric equations of the form sin(x) = k?",
          subject: "Mathematics",
          timestamp: "1 day ago",
          totalAnswers: 5,
          myAnswerSnippet: "You should start by identifying the principal value of x...",
          isBest: true,
          color: "#4F46E5"
        },
        {
          id: 102,
          title: "Explain the photoelectric effect with a neat diagram.",
          subject: "Physics",
          timestamp: "3 days ago",
          totalAnswers: 3,
          myAnswerSnippet: "The photoelectric effect is the emission of electrons when...",
          isBest: false,
          color: "#F59E0B"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="my-answers-loading">
        <div className="spinner"></div>
        <span>Loading your participation...</span>
      </div>
    );
  }

  return (
    <motion.div 
      className="my-answers-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <h1>My Answers</h1>
        <p>You have helped scholars in {answers.length} discussions.</p>
      </div>

      {answers.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-box">
            <Search size={48} />
          </div>
          <h3>No answers yet</h3>
          <p>Help other scholars solve their doubts to earn reputation.</p>
        </div>
      ) : (
        <div className="answers-scroll-list">
          {answers.map(item => (
            <AnswerListItem key={item.id} item={item} onClick={onDoubtClick} />
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .my-answers-container {
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

        .answers-scroll-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .answer-list-item {
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

        .answer-item-main {
          display: flex;
          gap: 20px;
          align-items: flex-start;
        }

        .answer-status-icon {
          width: 44px;
          height: 44px;
          background-color: rgba(16, 185, 129, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 4px;
        }

        .answer-item-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .answer-item-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .answer-item-subject {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .best-badge {
          background-color: #10B981;
          color: white;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .answer-item-title {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .answer-snippet {
          color: var(--text-muted);
          font-size: 0.9rem;
          font-style: italic;
          line-height: 1.4;
          margin: 4px 0;
        }

        .answer-item-meta {
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

        .answer-list-item:hover .chevron {
          transform: translateX(4px);
          color: var(--text-main);
        }

        .my-answers-loading {
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
          border-top: 3px solid #10B981;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .my-answers-container {
            padding: 24px;
          }
        }
      `}} />
    </motion.div>
  );
}
