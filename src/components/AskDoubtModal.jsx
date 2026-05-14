import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, HelpCircle, AlertCircle, CheckCircle2 } from 'lucide-react';

import { useAuth } from '../lib/context';
import { supabase } from '../lib/supabase';

export default function AskDoubtModal({ isOpen, onClose }) {
  const { profile } = useAuth();
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'CS'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !title || !description) {
      setError('Please fill in all fields.');
      return;
    }
    
    setError('');
    setLoading(true);
    
    const { error: dbError } = await supabase
      .from('doubts')
      .insert({
        title,
        content: description,
        subject,
        user_id: profile.id,
        status: 'open'
      });

    if (dbError) {
      setError(dbError.message);
      setLoading(false);
    } else {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setSubject('');
        setTitle('');
        setDescription('');
      }, 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            className="modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
          >
            <div className="modal-header">
              <div className="header-title">
                <div className="icon-box">
                  <HelpCircle size={20} color="var(--primary)" />
                </div>
                <h3>Ask a Doubt</h3>
              </div>
              <button className="close-btn" onClick={onClose}>
                <X size={20} />
              </button>
            </div>

            {success ? (
              <motion.div 
                className="success-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="success-icon">
                  <CheckCircle2 size={48} color="#10B981" />
                </div>
                <h4>Doubt Posted Successfully!</h4>
                <p>Scholars will be notified and will answer soon.</p>
              </motion.div>
            ) : (
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Subject</label>
                  <select 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)}
                    className={error && !subject ? 'error' : ''}
                  >
                    <option value="" disabled>Select Subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. How to solve quadratic equations?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={error && !title ? 'error' : ''}
                  />
                </div>

                <div className="form-group">
                  <label>Specification Details</label>
                  <textarea 
                    placeholder="Explain your doubt in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                    className={error && !description ? 'error' : ''}
                  />
                </div>

                {error && (
                  <div className="error-msg">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    <>
                      <span>Initialize Broadcast</span>
                      <Send size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          <style dangerouslySetInnerHTML={{ __html: `
            .modal-overlay {
              position: fixed;
              inset: 0;
              background-color: rgba(0, 0, 0, 0.7);
              backdrop-filter: blur(4px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10000;
              padding: 20px;
            }

            .modal-container {
              background-color: var(--bg-surface);
              border: 1px solid var(--border);
              border-radius: 24px;
              width: 100%;
              max-width: 500px;
              overflow: hidden;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
            }

            .modal-header {
              padding: 24px;
              border-bottom: 1px solid var(--border);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .header-title {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .header-title h3 {
              font-size: 1.25rem;
            }

            .icon-box {
              width: 36px;
              height: 36px;
              background-color: rgba(79, 70, 229, 0.1);
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .close-btn {
              background: none;
              border: none;
              color: var(--text-muted);
              cursor: pointer;
              transition: color 0.2s;
            }

            .close-btn:hover {
              color: var(--text-main);
            }

            .modal-form {
              padding: 24px;
              display: flex;
              flex-direction: column;
              gap: 20px;
            }

            .form-group {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .form-group label {
              font-size: 0.85rem;
              font-weight: 600;
              color: var(--text-muted);
            }

            .form-group input, 
            .form-group select, 
            .form-group textarea {
              background-color: var(--bg-card);
              border: 1px solid var(--border);
              border-radius: 12px;
              padding: 12px 16px;
              color: var(--text-main);
              font-size: 0.95rem;
              outline: none;
              transition: border-color 0.2s;
            }

            .form-group input:focus, 
            .form-group select:focus, 
            .form-group textarea:focus {
              border-color: var(--primary);
            }

            .form-group input.error, 
            .form-group select.error, 
            .form-group textarea.error {
              border-color: #EF4444;
            }

            .error-msg {
              display: flex;
              align-items: center;
              gap: 6px;
              color: #EF4444;
              font-size: 0.85rem;
              font-weight: 500;
            }

            .submit-btn {
              background-color: var(--primary);
              color: white;
              border: none;
              border-radius: 12px;
              padding: 14px;
              font-weight: 700;
              font-size: 1rem;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 10px;
              transition: all 0.2s;
            }

            .submit-btn:hover {
              background-color: var(--primary-hover);
              transform: translateY(-1px);
            }

            .submit-btn:disabled {
              opacity: 0.7;
              cursor: not-allowed;
            }

            .success-state {
              padding: 60px 40px;
              display: flex;
              flex-direction: column;
              align-items: center;
              text-align: center;
            }

            .success-icon {
              margin-bottom: 24px;
              padding: 20px;
              background-color: rgba(16, 185, 129, 0.1);
              border-radius: 50%;
            }

            .success-state h4 {
              font-size: 1.5rem;
              margin-bottom: 8px;
            }

            .success-state p {
              color: var(--text-muted);
            }

            .spinner {
              width: 20px;
              height: 20px;
              border: 2px solid rgba(255, 255, 255, 0.3);
              border-top: 2px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}} />
        </div>
      )}
    </AnimatePresence>
  );
}
