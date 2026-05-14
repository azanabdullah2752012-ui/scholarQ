import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import MobileNav from './components/MobileNav';
import AskDoubtModal from './components/AskDoubtModal';
import MyDoubts from './components/MyDoubts';
import MyAnswers from './components/MyAnswers';
import TopScholars from './components/TopScholars';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import DoubtThread from './components/DoubtThread';
import LoginPage from './components/LoginPage';
import OnboardingModal from './components/OnboardingModal';
import { useAuth, useTheme } from './lib/context';

function App() {
  const { user, profile, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTabChange = (tab) => {
    if (tab === 'Ask Doubt') {
      setIsModalOpen(true);
    } else {
      setActiveTab(tab);
      setSelectedDoubt(null);
    }
  };

  const handleDoubtClick = (doubt) => {
    setSelectedDoubt(doubt);
  };

  if (authLoading) {
    return (
      <div className="app-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  const showOnboarding = user && !profile?.academic_percentage;

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <div className="content-wrapper">
        <Topbar setActiveTab={handleTabChange} onSearch={setSearchQuery} />
        <div className="layout-body">
          {activeTab === 'Home' && !selectedDoubt && (
            <>
              <MainContent searchQuery={searchQuery} />
              <RightPanel setActiveTab={handleTabChange} />
            </>
          )}
          
          {activeTab === 'My Doubts' && !selectedDoubt && (
            <MyDoubts onDoubtClick={handleDoubtClick} />
          )}

          {activeTab === 'Answers' && !selectedDoubt && (
            <MyAnswers onDoubtClick={handleDoubtClick} />
          )}

          {activeTab === 'Top Scholars' && !selectedDoubt && (
            <TopScholars />
          )}

          {activeTab === 'Notifications' && !selectedDoubt && (
            <Notifications />
          )}

          {activeTab === 'Profile' && !selectedDoubt && (
            <Profile />
          )}

          {selectedDoubt && (
            <DoubtThread 
              doubt={selectedDoubt} 
              onBack={() => setSelectedDoubt(null)} 
            />
          )}

          {activeTab !== 'Home' && activeTab !== 'My Doubts' && activeTab !== 'Answers' && activeTab !== 'Top Scholars' && activeTab !== 'Notifications' && activeTab !== 'Profile' && !selectedDoubt && (
            <div className="view-placeholder">
              <h2>{activeTab}</h2>
              <p>This section is being initialized. Please check back soon.</p>
            </div>
          )}
        </div>
      </div>

      <MobileNav activeTab={activeTab} setActiveTab={handleTabChange} />
      
      <AskDoubtModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <OnboardingModal 
        isOpen={showOnboarding} 
        user={user} 
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .app-loader {
          height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-deep);
        }
        
        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(79, 70, 229, 0.1);
          border-top: 3px solid var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .content-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .layout-body {
          display: flex;
          flex: 1;
          overflow: hidden;
        }

        .view-placeholder {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          padding: 40px;
          text-align: center;
        }

        .view-placeholder h2 {
          color: var(--text-main);
          margin-bottom: 12px;
          font-size: 2rem;
        }

        @media (max-width: 1200px) {
          .right-panel {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .sidebar {
            display: none;
          }
          .main-content {
            padding: 24px;
            padding-bottom: 100px;
          }
        }
      `}} />
    </div>
  );
}

export default App;
