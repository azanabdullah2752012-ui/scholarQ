import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Percent, BookOpen, CheckCircle, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/context';

export default function OnboardingModal({ isOpen, user }) {
  const { setProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || '',
    percentage: '',
    subjects: []
  });
  const [loading, setLoading] = useState(false);

  const availableSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'CS', 'Economics'];

  const toggleSubject = (s) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(s) 
        ? prev.subjects.filter(sub => sub !== s)
        : [...prev.subjects, s]
    }));
  };

  const calculateRole = (perc) => {
    const p = parseFloat(perc);
    if (p >= 92) return 'Elite Scholar';
    if (p >= 85) return 'Scholar';
    return 'Student';
  };

  const handleSubmit = async () => {
    setLoading(true);
    const role = calculateRole(formData.percentage);
    
    const { data, error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: formData.fullName,
        academic_percentage: parseFloat(formData.percentage),
        subjects: formData.subjects,
        role: role,
        avatar_url: user?.user_metadata?.avatar_url,
        updated_at: new Date()
      })
      .select()
      .single();

    if (!error) {
      setProfile(data);
      // App.jsx will handle closing the modal by checking profile state
    }
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            className="onboarding-card"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
          >
            <div className="onboarding-header">
              <div className="onboarding-step-indicator">
                <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
                <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
                <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
              </div>
              <h2>Complete your profile</h2>
              <p>Tailor your ScholarQ experience to your academic level.</p>
            </div>

            {step === 1 && (
              <motion.div className="step-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="onboarding-form">
                  <div className="input-group">
                    <label><User size={16} /> Full Name</label>
                    <input 
                      type="text" 
                      value={formData.fullName} 
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      placeholder="Enter your legal name"
                    />
                  </div>
                </div>
                <button 
                  className="next-btn" 
                  disabled={!formData.fullName}
                  onClick={() => setStep(2)}
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div className="step-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="onboarding-form">
                  <div className="input-group">
                    <label><Percent size={16} /> Academic Percentage</label>
                    <input 
                      type="number" 
                      value={formData.percentage} 
                      onChange={e => setFormData({...formData, percentage: e.target.value})}
                      placeholder="e.g. 94.5"
                    />
                    <p className="input-hint">Used to assign your Scholar Rank.</p>
                  </div>
                </div>
                <button 
                  className="next-btn" 
                  disabled={!formData.percentage}
                  onClick={() => setStep(3)}
                >
                  Almost there
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div className="step-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="onboarding-form">
                  <label><BookOpen size={16} /> Select Subjects</label>
                  <div className="subjects-grid">
                    {availableSubjects.map(s => (
                      <div 
                        key={s} 
                        className={`subject-pill ${formData.subjects.includes(s) ? 'active' : ''}`}
                        onClick={() => toggleSubject(s)}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
                <button 
                  className="submit-onboarding-btn" 
                  disabled={loading || formData.subjects.length === 0}
                  onClick={handleSubmit}
                >
                  {loading ? <div className="spinner"></div> : 'Finish Setup'}
                </button>
              </motion.div>
            )}
          </motion.div>

          <style dangerouslySetInnerHTML={{ __html: `
            .modal-overlay {
              position: fixed;
              inset: 0;
              background-color: rgba(0, 0, 0, 0.8);
              backdrop-filter: blur(8px);
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 10000;
              padding: 20px;
            }

            .onboarding-card {
              background-color: var(--bg-surface);
              border: 1px solid var(--border);
              border-radius: 32px;
              width: 100%;
              max-width: 440px;
              padding: 40px;
              box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
            }

            .onboarding-header {
              text-align: center;
              margin-bottom: 32px;
            }

            .onboarding-step-indicator {
              display: flex;
              justify-content: center;
              gap: 8px;
              margin-bottom: 24px;
            }

            .step-dot {
              width: 32px;
              height: 4px;
              background-color: var(--border);
              border-radius: 10px;
              transition: all 0.3s;
            }

            .step-dot.active {
              background-color: var(--primary);
              box-shadow: 0 0 10px var(--primary);
            }

            .onboarding-header h2 {
              font-size: 1.5rem;
              margin-bottom: 8px;
            }

            .onboarding-header p {
              color: var(--text-muted);
              font-size: 0.9rem;
            }

            .onboarding-form {
              display: flex;
              flex-direction: column;
              gap: 24px;
              margin-bottom: 32px;
            }

            .input-group {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }

            .input-group label {
              font-size: 0.85rem;
              font-weight: 700;
              color: var(--text-muted);
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .input-group input {
              background-color: var(--bg-card);
              border: 1px solid var(--border);
              border-radius: 12px;
              padding: 14px;
              color: var(--text-main);
              font-size: 1rem;
              outline: none;
            }

            .input-hint {
              font-size: 0.75rem;
              color: var(--text-muted);
            }

            .subjects-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 10px;
            }

            .subject-pill {
              background-color: var(--bg-card);
              border: 1px solid var(--border);
              padding: 10px;
              border-radius: 10px;
              font-size: 0.85rem;
              font-weight: 600;
              text-align: center;
              cursor: pointer;
              transition: all 0.2s;
            }

            .subject-pill.active {
              background-color: rgba(79, 70, 229, 0.1);
              border-color: var(--primary);
              color: var(--primary);
            }

            .next-btn, .submit-onboarding-btn {
              width: 100%;
              background-color: var(--primary);
              color: white;
              border: none;
              padding: 14px;
              border-radius: 12px;
              font-weight: 700;
              font-size: 1rem;
              cursor: pointer;
              transition: transform 0.2s;
            }

            .next-btn:disabled, .submit-onboarding-btn:disabled {
              opacity: 0.5;
              cursor: not-allowed;
            }

            .spinner {
              width: 20px;
              height: 20px;
              border: 2px solid rgba(255, 255, 255, 0.3);
              border-top: 2px solid white;
              border-radius: 50%;
              animation: spin 1s linear infinite;
            }
          `}} />
        </div>
      )}
    </AnimatePresence>
  );
}
