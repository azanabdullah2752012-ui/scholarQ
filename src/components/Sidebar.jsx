import React from 'react';
import { 
  Home, 
  PlusCircle, 
  MessageSquare, 
  CheckCircle, 
  Trophy, 
  Bell, 
  User, 
  Moon, 
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { useTheme, useAuth } from '../lib/context';

export default function Sidebar({ activeTab, setActiveTab }) {
  const { theme, toggleTheme } = useTheme();
  const { profile } = useAuth();
  const isDark = theme === 'dark';

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <GraduationCap size={28} color="white" />
        </div>
        <div className="brand-text">
          <h2 className="brand-font">ScholarQ</h2>
          <p>Ask. Learn. Excel.</p>
        </div>
      </div>

      <nav className="sidebar-nav">
        {[
          { icon: Home, label: 'Home' },
          { icon: PlusCircle, label: 'Ask Doubt' },
          { icon: MessageSquare, label: 'My Doubts' },
          { icon: CheckCircle, label: 'Answers' },
          { icon: Trophy, label: 'Top Scholars' },
          { icon: Bell, label: 'Notifications' },
          { icon: User, label: 'Profile' }
        ].map((item) => (
          <div 
            key={item.label}
            className={`nav-item ${activeTab === item.label ? 'active' : ''}`}
            onClick={() => setActiveTab(item.label)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      <div className="status-card">
        <div className="status-header">
          <span>Your Status</span>
          <span className="scholar-badge">
            <GraduationCap size={12} />
            {profile?.role || 'Scholar'}
          </span>
        </div>
        <div className="status-grid">
          <div className="status-row">
            <span className="label">Score</span>
            <span className="value">{profile?.academic_percentage || '92'}%</span>
          </div>
          <div className="status-row">
            <span className="label">Subjects</span>
            <span className="value">{profile?.subjects?.length || '5'}</span>
          </div>
          <div className="status-row">
            <span className="label">Reputation</span>
            <span className="value primary">A+</span>
          </div>
        </div>
        <button 
          className="btn-view-profile"
          onClick={() => setActiveTab('Profile')}
        >
          View Profile
        </button>
      </div>

      <div className="sidebar-footer">
        <div 
          className={`dark-mode-toggle ${isDark ? 'active' : ''}`}
          onClick={toggleTheme}
        >
          <Moon size={18} />
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          <div className="toggle-switch">
            <div className={`toggle-knob ${isDark ? 'on' : 'off'}`}></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar {
          width: var(--sidebar-width);
          background-color: var(--bg-surface);
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 24px;
          flex-shrink: 0;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }

        .brand-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, var(--primary) 0%, #6366F1 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
        }

        .brand-text h2 {
          font-size: 1.25rem;
          letter-spacing: -0.02em;
        }

        .brand-text p {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          font-size: 0.95rem;
        }

        .nav-item:hover {
          color: var(--text-main);
          background-color: rgba(255, 255, 255, 0.05);
        }

        .nav-item.active {
          background-color: rgba(79, 70, 229, 0.15);
          color: var(--primary);
          box-shadow: inset 0 0 0 1px rgba(79, 70, 229, 0.2);
        }

        .status-card {
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          margin-top: 24px;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .scholar-badge {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10B981;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          gap: 4px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .status-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .status-row .label {
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .status-row .value {
          font-weight: 700;
          font-size: 1rem;
        }

        .status-row .value.primary {
          color: var(--primary);
        }

        .btn-view-profile {
          width: 100%;
          padding: 10px;
          background-color: var(--primary);
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: background 0.2s;
        }

        .btn-view-profile:hover {
          background-color: var(--primary-hover);
        }

        .sidebar-footer {
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid var(--border);
        }

        .dark-mode-toggle {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: var(--text-muted);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 10px;
          transition: background 0.2s;
        }

        .dark-mode-toggle:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .toggle-switch {
          margin-left: auto;
          width: 32px;
          height: 18px;
          background-color: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2px;
          display: flex;
          align-items: center;
        }

        .toggle-knob {
          width: 12px;
          height: 12px;
          background-color: var(--text-muted);
          border-radius: 50%;
          transition: all 0.2s;
        }

        .toggle-knob.on {
          transform: translateX(14px);
          background-color: var(--primary);
        }
      `}} />
    </aside>
  );
}
