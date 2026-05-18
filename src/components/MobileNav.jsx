import React from 'react';
import { Home, PlusCircle, MessageSquare, User, CheckCircle } from 'lucide-react';
import { useAuth } from '../lib/context';

export default function MobileNav({ activeTab, setActiveTab }) {
  const { profile } = useAuth();
  const isScholar = profile?.role === 'Scholar' || profile?.role === 'Elite Scholar';

  const studentItems = [
    { icon: Home, label: 'Home' },
    { icon: PlusCircle, label: 'Ask Doubt' },
    { icon: MessageSquare, label: 'My Doubts' },
    { icon: User, label: 'Profile' }
  ];

  const scholarItems = [
    { icon: Home, label: 'Scholar Hub' },
    { icon: MessageSquare, label: 'Unanswered Feed' },
    { icon: CheckCircle, label: 'My Answers' },
    { icon: User, label: 'Profile' }
  ];

  const navItems = isScholar ? scholarItems : studentItems;

  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <div 
          key={item.label}
          className={`mobile-nav-item ${(activeTab === item.label || (item.label === 'Scholar Hub' && activeTab === 'Home') || (item.label === 'Home' && activeTab === 'Scholar Hub')) ? 'active' : ''}`}
          onClick={() => setActiveTab(item.label)}
        >
          <item.icon size={22} />
          <span>{item.label}</span>
        </div>
      ))}

      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 70px;
          background-color: var(--bg-surface);
          border-top: 1px solid var(--border);
          padding: 0 12px;
          justify-content: space-around;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s;
          flex: 1;
        }

        .mobile-nav-item span {
          font-size: 0.65rem;
          font-weight: 600;
        }

        .mobile-nav-item.active {
          color: var(--primary);
        }

        @media (max-width: 768px) {
          .mobile-nav {
            display: flex;
          }
        }
      `}} />
    </nav>
  );
}
