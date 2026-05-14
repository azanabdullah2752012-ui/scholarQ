import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Award, Calendar, Settings, Edit3, ShieldCheck, MapPin, Save, X } from 'lucide-react';
import { useAuth } from '../lib/context';
import { supabase } from '../lib/supabase';

export default function Profile() {
  const { profile, setProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (profile) setEditData(profile);
  }, [profile]);

  const handleSave = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name: editData.full_name,
        academic_percentage: parseFloat(editData.academic_percentage),
        bio: editData.bio,
        subjects: editData.subjects
      })
      .eq('id', profile.id)
      .select()
      .single();

    if (data) {
      setProfile(data);
      setIsEditing(false);
    }
    setLoading(false);
  };

  if (!profile) return null;

  return (
    <motion.div 
      className="profile-page-container"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="profile-hero">
        <div className="profile-cover"></div>
        <div className="profile-main-info">
          <div className="profile-avatar-container">
            <div className="profile-avatar-large">
              <img src={profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.full_name}`} alt="avatar" />
            </div>
            <button className="edit-avatar-btn"><Edit3 size={14} /></button>
          </div>
          <div className="profile-text-header">
            <div className="name-row">
              {isEditing ? (
                <input 
                  type="text" 
                  value={editData.full_name} 
                  onChange={e => setEditData({...editData, full_name: e.target.value})}
                  className="edit-input-name"
                />
              ) : (
                <h1>{profile.full_name}</h1>
              )}
              <ShieldCheck size={20} color="#10B981" />
            </div>
            <p className="profile-level">{profile.role}</p>
            <div className="profile-meta-chips">
              <div className="meta-chip"><MapPin size={14} /> <span>{profile.location || 'Dubai, UAE'}</span></div>
              <div className="meta-chip"><Calendar size={14} /> <span>Joined March 2024</span></div>
            </div>
          </div>
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button className="btn-save-profile" onClick={handleSave} disabled={loading}>
                  {loading ? <div className="spinner-mini"></div> : <><Save size={16} /> Save</>}
                </button>
                <button className="btn-cancel" onClick={() => setIsEditing(false)}><X size={16} /></button>
              </>
            ) : (
              <>
                <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>Edit Profile</button>
                <button className="btn-settings"><Settings size={18} /></button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="profile-grid">
        <div className="stats-container">
          <div className="profile-stat-card">
            <span className="p-stat-label">Academic Percentage</span>
            {isEditing ? (
              <input 
                type="number" 
                value={editData.academic_percentage} 
                onChange={e => setEditData({...editData, academic_percentage: e.target.value})}
                className="edit-input-stat"
              />
            ) : (
              <span className="p-stat-value" style={{ color: '#4F46E5' }}>{profile.academic_percentage}%</span>
            )}
          </div>
          <div className="profile-stat-card">
            <span className="p-stat-label">Answers Given</span>
            <span className="p-stat-value" style={{ color: '#10B981' }}>{profile.answers_given || 0}</span>
          </div>
          <div className="profile-stat-card">
            <span className="p-stat-label">Best Answers</span>
            <span className="p-stat-value" style={{ color: '#F59E0B' }}>{profile.best_answers || 0}</span>
          </div>
          <div className="profile-stat-card">
            <span className="p-stat-label">Reputation</span>
            <span className="p-stat-value" style={{ color: '#8957E5' }}>{profile.reputation || 'A+'}</span>
          </div>
        </div>

        <div className="profile-details-section">
          <div className="p-section">
            <h3>Bio</h3>
            {isEditing ? (
              <textarea 
                value={editData.bio} 
                onChange={e => setEditData({...editData, bio: e.target.value})}
                className="edit-textarea"
                placeholder="Write a short bio..."
              />
            ) : (
              <p className="profile-bio">{profile.bio || 'No bio provided yet.'}</p>
            )}
          </div>

          <div className="p-section">
            <h3>My Subjects</h3>
            {isEditing ? (
              <div className="subjects-edit-grid">
                {['Mathematics', 'Physics', 'Chemistry', 'Biology', 'History', 'Geography', 'CS'].map(s => (
                  <div 
                    key={s} 
                    className={`subject-pill-edit ${editData.subjects?.includes(s) ? 'active' : ''}`}
                    onClick={() => {
                      const subjects = editData.subjects || [];
                      const next = subjects.includes(s) ? subjects.filter(x => x !== s) : [...subjects, s];
                      setEditData({...editData, subjects: next});
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            ) : (
              <div className="achievements-list">
                {profile.subjects?.map((sub, i) => (
                  <div key={i} className="achievement-badge">
                    <BookOpen size={14} />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .edit-input-name {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          color: var(--text-main);
          font-size: 1.5rem;
          font-weight: 800;
          width: 100%;
        }

        .edit-input-stat {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px;
          color: var(--primary);
          font-size: 1.5rem;
          font-weight: 800;
          width: 100px;
        }

        .edit-textarea {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 12px;
          color: var(--text-main);
          font-family: inherit;
          min-height: 100px;
        }

        .subjects-edit-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .subject-pill-edit {
          padding: 6px 12px;
          border-radius: 8px;
          border: 1px solid var(--border);
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
        }

        .subject-pill-edit.active {
          background: rgba(79, 70, 229, 0.1);
          border-color: var(--primary);
          color: var(--primary);
        }

        .btn-save-profile {
          background-color: #10B981;
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

        .btn-cancel {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-muted);
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .profile-bio {
          color: var(--text-muted);
          line-height: 1.6;
        }
        .profile-page-container {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          background-color: var(--bg-deep);
        }

        .profile-hero {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 32px;
        }

        .profile-cover {
          height: 120px;
          background: linear-gradient(135deg, var(--primary) 0%, #8957E5 100%);
          opacity: 0.15;
        }

        .profile-main-info {
          padding: 0 40px 40px 40px;
          display: flex;
          align-items: flex-end;
          gap: 32px;
          margin-top: -60px;
          position: relative;
        }

        .profile-avatar-container {
          position: relative;
        }

        .profile-avatar-large {
          width: 120px;
          height: 120px;
          border-radius: 32px;
          background-color: var(--bg-card);
          border: 4px solid var(--bg-surface);
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .edit-avatar-btn {
          position: absolute;
          bottom: -4px;
          right: -4px;
          background-color: var(--primary);
          color: white;
          border: 2px solid var(--bg-surface);
          width: 32px;
          height: 32px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .profile-text-header {
          flex: 1;
        }

        .name-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 4px;
        }

        .profile-text-header h1 {
          font-size: 2.25rem;
        }

        .profile-level {
          color: var(--primary);
          font-weight: 700;
          font-size: 1.1rem;
          margin-bottom: 12px;
        }

        .profile-meta-chips {
          display: flex;
          gap: 16px;
        }

        .meta-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .profile-actions {
          display: flex;
          gap: 12px;
          padding-bottom: 10px;
        }

        .btn-edit-profile {
          background-color: var(--primary);
          color: white;
          border: none;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-settings {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          color: var(--text-main);
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .profile-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .profile-stat-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .p-stat-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .p-stat-value {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .p-section {
          background-color: var(--bg-surface);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 24px;
          margin-bottom: 20px;
        }

        .p-section h3 {
          font-size: 1.1rem;
          margin-bottom: 20px;
        }

        .achievements-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .achievement-badge {
          background-color: rgba(245, 158, 11, 0.1);
          color: #F59E0B;
          border: 1px solid rgba(245, 158, 11, 0.2);
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .contact-card {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .contact-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.95rem;
          color: var(--text-main);
        }

        .profile-loading {
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

        @media (max-width: 1024px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
          .profile-main-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding-top: 0;
            margin-top: -60px;
          }
          .name-row {
            justify-content: center;
          }
          .profile-meta-chips {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .profile-page-container {
            padding: 24px;
          }
          .stats-container {
            grid-template-columns: 1fr;
          }
          .p-stat-value {
            font-size: 2rem;
          }
        }
      `}} />
    </motion.div>
  );
}
