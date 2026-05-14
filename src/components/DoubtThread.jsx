import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageSquare, User, Clock, CheckCircle, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/context';

export default function DoubtThread({ doubt, onBack }) {
  const { profile } = useAuth();
  const isScholar = profile?.role === 'Scholar' || profile?.role === 'Elite Scholar';
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnswers();
  }, [doubt.id]);

  const fetchAnswers = async () => {
    const { data, error } = await supabase
      .from('answers')
      .select('*, profiles(full_name, role)')
      .eq('doubt_id', doubt.id)
      .order('is_best', { ascending: false })
      .order('created_at', { ascending: true });

    if (data) setAnswers(data);
  };

  const handlePostAnswer = async () => {
    if (!newAnswer.trim()) return;
    setLoading(true);
    
    const { error } = await supabase
      .from('answers')
      .insert({
        doubt_id: doubt.id,
        user_id: profile.id,
        content: newAnswer,
        is_best: false
      });

    if (error) {
      console.error(error);
      alert(error.message);
    } else {
      setNewAnswer('');
      fetchAnswers();
      // The database trigger will automatically update counts!
    }
    setLoading(false);
  };

  return (
    <motion.div 
      className="doubt-thread-container"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <button className="back-btn" onClick={onBack}>
        <ArrowLeft size={20} />
        <span>Back to Feed</span>
      </button>

      <div className="thread-main">
        <div className="question-block">
          <div className="question-header">
            <span className="subject-pill" style={{ backgroundColor: `rgba(79, 70, 229, 0.1)`, color: 'var(--primary)' }}>{doubt.subject}</span>
            <span className="thread-time">{new Date(doubt.created_at).toLocaleDateString()}</span>
          </div>
          <h1>{doubt.title}</h1>
          <p className="question-body">{doubt.content}</p>
        </div>

        {isScholar && (
          <div className="post-answer-box">
            <textarea 
              placeholder="Write your answer..." 
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <button onClick={handlePostAnswer} disabled={loading || !newAnswer.trim()}>
              {loading ? <div className="spinner-mini"></div> : <><Send size={16} /> Post Answer</>}
            </button>
          </div>
        )}

        <div className="answers-section">
          <h3>{answers.length} Answers</h3>
          <div className="answers-list">
            {answers.map(ans => (
              <div key={ans.id} className={`answer-card ${ans.isBest ? 'best' : ''}`}>
                {ans.isBest && (
                  <div className="best-answer-tag">
                    <CheckCircle size={14} />
                    <span>Best Answer</span>
                  </div>
                )}
                <div className="answer-header">
                  <div className="answer-author">
                    <div className="avatar-small">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ans.profiles?.full_name || 'User'}`} alt="avatar" />
                    </div>
                    <div>
                      <span className="author-name">{ans.profiles?.full_name || 'Anonymous'}</span>
                      <span className="author-role">{ans.profiles?.role || 'Scholar'}</span>
                    </div>
                  </div>
                  <span className="answer-time">{new Date(ans.created_at).toLocaleDateString()}</span>
                </div>
                <p className="answer-text">{ans.content}</p>
              </div>
            ))}
            {answers.length === 0 && (
              <div className="no-answers">
                <MessageSquare size={48} />
                <p>No answers yet. Be the first to help!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .doubt-thread-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .back-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 32px;
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: var(--primary);
        }

        .post-answer-box {
          background: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 20px;
          margin-bottom: 40px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .post-answer-box textarea {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
          color: var(--text-main);
          min-height: 100px;
          resize: vertical;
          outline: none;
        }

        .post-answer-box button {
          align-self: flex-end;
          background: var(--primary);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .no-answers {
          text-align: center;
          padding: 40px;
          color: var(--text-muted);
        }

        .thread-main {
          max-width: 800px;
          margin: 0 auto;
        }

        .question-block {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 40px;
        }

        .question-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .subject-pill {
          padding: 4px 12px;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .thread-time {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .question-block h1 {
          font-size: 1.75rem;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        .question-body {
          color: var(--text-main);
          line-height: 1.6;
          font-size: 1.05rem;
        }

        .answers-section h3 {
          font-size: 1.25rem;
          margin-bottom: 24px;
        }

        .answers-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .answer-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          position: relative;
        }

        .answer-card.best {
          border-color: #10B981;
          background: linear-gradient(135deg, var(--bg-surface) 0%, rgba(16, 185, 129, 0.05) 100%);
        }

        .best-answer-tag {
          position: absolute;
          top: -12px;
          right: 24px;
          background-color: #10B981;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
        }

        .answer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .answer-author {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .avatar-small {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          background-color: var(--bg-card);
        }

        .author-name {
          display: block;
          font-weight: 700;
          font-size: 0.95rem;
        }

        .author-role {
          font-size: 0.75rem;
          color: var(--primary);
          font-weight: 600;
        }

        .answer-time {
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .answer-text {
          color: var(--text-main);
          line-height: 1.6;
          font-size: 1rem;
        }

        .spinner-mini {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .doubt-thread-container {
            padding: 24px;
          }
          .question-block {
            padding: 24px;
          }
        }
      `}} />
    </motion.div>
  );
}
