import React, { useState, useEffect } from 'react';
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
import StudentRequests from './components/StudentRequests';
import LoginPage from './components/LoginPage';
import OnboardingModal from './components/OnboardingModal';
import { useAuth, useTheme } from './lib/context';
import { supabase } from './lib/supabase';

function App() {
  const { user, profile, loading: authLoading, setProfile } = useAuth();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('Home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [targetScholar, setTargetScholar] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const isScholar = profile?.role === 'Scholar' || profile?.role === 'Elite Scholar';

  useEffect(() => {
    if (profile) {
      setActiveTab(isScholar ? 'Scholar Hub' : 'Home');
      checkDailyReward();
    }
  }, [profile?.id, isScholar]);

  const checkDailyReward = async () => {
    if (!profile) return;
    
    const lastReward = profile.last_daily_reward ? new Date(profile.last_daily_reward) : null;
    const today = new Date();
    
    const isSameDay = lastReward && 
      lastReward.getDate() === today.getDate() &&
      lastReward.getMonth() === today.getMonth() &&
      lastReward.getFullYear() === today.getFullYear();
      
    if (!isSameDay) {
      const { data, error } = await supabase
        .from('profiles')
        .update({ 
          points: (profile.points || 0) + 5,
          last_daily_reward: new Date().toISOString()
        })
        .eq('id', profile.id)
        .select()
        .single();
        
      if (!error && data) {
        setProfile(data);
        alert("Daily reward claimed: +5 points");
      }
    }
  };

  const handleTabChange = (tab) => {
    if (tab === 'Ask Doubt') {
      setIsModalOpen(true);
    } else {
      setActiveTab(tab);
      setSelectedDoubt(null);
      setSelectedProfileId(null);
    }
  };

  const handleDoubtClick = (doubt) => {
    setSelectedDoubt(doubt);
  };

  const handleProfileClick = (id) => {
    setSelectedProfileId(id);
    setActiveTab('Profile');
    setSelectedDoubt(null);
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
          {(activeTab === 'Home' || activeTab === 'Scholar Hub' || activeTab === 'Unanswered Feed') && !selectedDoubt && (
            <>
              <MainContent 
                searchQuery={searchQuery} 
                isScholar={isScholar} 
                activeTab={activeTab} 
                onDoubtClick={handleDoubtClick}
                onViewAll={() => handleTabChange('Unanswered Feed')}
                refreshTrigger={refreshTrigger}
              />
              {activeTab !== 'Unanswered Feed' && <RightPanel setActiveTab={handleTabChange} onProfileClick={handleProfileClick} />}
            </>
          )}
          
          {activeTab === 'My Doubts' && !selectedDoubt && (
            <MyDoubts onDoubtClick={handleDoubtClick} refreshTrigger={refreshTrigger} />
          )}

          {(activeTab === 'Answers' || activeTab === 'My Answers') && !selectedDoubt && (
            <MyAnswers onDoubtClick={handleDoubtClick} />
          )}

          {(activeTab === 'Top Scholars' || activeTab === 'Scholars' || activeTab === 'Leaderboard') && !selectedDoubt && (
            <TopScholars onProfileClick={handleProfileClick} />
          )}

          {activeTab === 'Notifications' && !selectedDoubt && (
            <Notifications />
          )}

          {activeTab === 'Profile' && !selectedDoubt && (
            <Profile 
              userId={selectedProfileId} 
              onRequestHelp={(scholar) => {
                setTargetScholar(scholar);
                setIsModalOpen(true);
              }}
            />
          )}

          {selectedDoubt && (
            <DoubtThread 
              doubt={selectedDoubt} 
              onBack={() => {
                setSelectedDoubt(null);
                setRefreshTrigger(prev => prev + 1);
              }} 
            />
          )}

          {activeTab === 'Student Requests' && !selectedDoubt && (
            <StudentRequests onDoubtClick={handleDoubtClick} refreshTrigger={refreshTrigger} />
          )}

          {activeTab !== 'Home' && activeTab !== 'Scholar Hub' && activeTab !== 'My Doubts' && activeTab !== 'Unanswered Feed' && activeTab !== 'Answers' && activeTab !== 'My Answers' && activeTab !== 'Top Scholars' && activeTab !== 'Scholars' && activeTab !== 'Leaderboard' && activeTab !== 'Notifications' && activeTab !== 'Profile' && activeTab !== 'Student Requests' && !selectedDoubt && (
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
        onClose={() => {
          setIsModalOpen(false);
          setTargetScholar(null);
        }} 
        targetScholar={targetScholar}
        onDoubtPosted={() => setRefreshTrigger(prev => prev + 1)}
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
