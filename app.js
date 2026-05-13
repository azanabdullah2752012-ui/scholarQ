// Initialize Supabase
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// State
let session = null;
let profile = null;
let questions = [];
let currentView = 'auth';
let authMode = 'login';
let currentQuestionId = null;
let currentSearch = '';
let currentFilter = 'All';
let isDarkMode = localStorage.getItem('scholarq_theme') === 'dark';

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  // Set initial theme
  if (isDarkMode) document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeIcon();

  lucide.createIcons();
  
  const { data: { session: initialSession } } = await supabaseClient.auth.getSession();
  session = initialSession;
  
  if (session) {
    const hasProfile = await fetchProfile();
    if (hasProfile) {
      await handleDailyLogin();
      await fetchQuestions();
      setupSubscriptions();
      navigateTo('home');
    }
  } else {
    navigateTo('auth');
  }

  supabaseClient.auth.onAuthStateChange(async (event, newSession) => {
    console.log('Auth Event:', event);
    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
      session = newSession;
      if (session) {
        const hasProfile = await fetchProfile();
        if (hasProfile) {
          await handleDailyLogin();
          await fetchQuestions();
          setupSubscriptions();
          navigateTo('home');
        }
      }
    } else if (event === 'SIGNED_OUT') {
      session = null;
      profile = null;
      navigateTo('auth');
    }
  });

  // Global Listeners
  document.getElementById('auth-form').addEventListener('submit', handleAuth);
  document.getElementById('ask-form').addEventListener('submit', handleAsk);
  document.getElementById('answer-form').addEventListener('submit', handleAnswer);
  document.getElementById('finish-profile-form').addEventListener('submit', handleFinishProfile);
  document.getElementById('sell-form').addEventListener('submit', handleSell);
  document.getElementById('finish-score').addEventListener('input', (e) => {
    const group = document.getElementById('finish-subject-group');
    group.style.display = (parseInt(e.target.value) >= 80) ? 'block' : 'none';
  });
});

async function fetchProfile() {
  if (!session) return;
  const { data, error } = await supabaseClient.from('users').select('*').eq('id', session.user.id).single();
  
  if (data && !error) {
    profile = data;
    updateGlobalUI();
    return true;
  } else if (error && error.code === 'PGRST116') {
    // Profile missing
    console.log('Profile missing, redirecting to finish-profile...');
    navigateTo('finish-profile');
    return false;
  }
}

async function fetchQuestions() {
  const { data: qData } = await supabaseClient.from('questions').select('*').order('created_at', { ascending: false });
  const { data: aData } = await supabaseClient.from('answers').select('*').order('created_at', { ascending: true });

  questions = (qData || []).map(q => ({
    ...q,
    answers: (aData || []).filter(a => a.question_id === q.id)
  }));

  if (currentView === 'home') renderHome();
  if (currentView === 'question') renderQuestionDetail();
}

// Navigation
function navigateTo(view, param = null) {
  document.querySelectorAll('.view').forEach(el => {
    el.style.display = 'none';
    el.style.opacity = '0';
  });
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  if (!session && view !== 'auth') view = 'auth';
  if (view === 'auth' && session) view = 'home';

  currentView = view;
  const sidebar = document.getElementById('sidebar');
  const topBar = document.getElementById('top-bar');

  if (view === 'auth' || view === 'finish-profile') {
    sidebar.style.display = 'none';
    topBar.style.display = 'none';
    document.getElementById('main-layout').style.padding = '0';
  } else {
    sidebar.style.display = 'flex';
    topBar.style.display = 'flex';
    document.getElementById('main-layout').style.padding = (window.innerWidth > 768) ? '1.5rem 3rem' : '1rem';
    const navItem = document.getElementById(`nav-${view}`);
    if (navItem) navItem.classList.add('active');
  }

  const viewEl = document.getElementById(`view-${view}`);
  if (viewEl) {
    viewEl.style.display = 'block';
    setTimeout(() => viewEl.style.opacity = '1', 50);
  }

  if (view === 'home') {
    renderHome();
    renderMicroTasks();
  }
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
  if (view === 'marketplace') renderMarketplace();
  if (view === 'question') {
    currentQuestionId = param;
    renderQuestionDetail();
  }

  window.scrollTo(0, 0);
  lucide.createIcons();
}

// Auth Tab Logic
function switchAuthTab(mode) {
  authMode = mode;
  const loginBtn = document.getElementById('tab-login');
  const signupBtn = document.getElementById('tab-signup');
  const signupFields = document.getElementById('signup-fields');
  const btnText = document.getElementById('auth-btn-text');

  if (mode === 'signup') {
    signupBtn.style.background = 'white';
    signupBtn.style.color = 'var(--text-primary)';
    signupBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    loginBtn.style.background = 'transparent';
    loginBtn.style.color = 'var(--text-secondary)';
    loginBtn.style.boxShadow = 'none';
    signupFields.style.display = 'block';
    btnText.innerText = 'Launch Account';
  } else {
    loginBtn.style.background = 'white';
    loginBtn.style.color = 'var(--text-primary)';
    loginBtn.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
    signupBtn.style.background = 'transparent';
    signupBtn.style.color = 'var(--text-secondary)';
    signupBtn.style.boxShadow = 'none';
    signupFields.style.display = 'none';
    btnText.innerText = 'Login to Hub';
  }
}

async function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  
  showToast(`Initiating ${authMode}...`, 'info');

  if (authMode === 'signup') {
    const name = document.getElementById('auth-name').value;
    const score = parseInt(document.getElementById('auth-score').value) || 0;
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) return showToast(error.message, 'error');
    
    const role = (score >= 90) ? 'scholar' : 'student';
    await supabaseClient.from('users').insert([{
      id: data.user.id, name, points: 50, role, percentage: score, email
    }]);
    
    if (!data.session) return showToast('Verify your email!', 'info');
  } else {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) return showToast(error.message, 'error');
  }
  
  const { data: { session: newSession } } = await supabaseClient.auth.getSession();
  session = newSession;
  if (session) {
    await fetchProfile();
    await fetchQuestions();
    navigateTo('home');
  }
}

async function logout() {
  await supabaseClient.auth.signOut();
  session = null;
  profile = null;
  navigateTo('auth');
}

async function signInWithGoogle() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + window.location.pathname
    }
  });
  if (error) showToast(error.message, 'error');
}

async function handleFinishProfile(e) {
  e.preventDefault();
  const score = parseInt(document.getElementById('finish-score').value);
  const specialty = document.getElementById('finish-subject').value;
  const name = session.user.user_metadata.full_name || session.user.email.split('@')[0];
  
  const role = (score >= 90) ? 'scholar' : 'student';
  const newProfile = {
    id: session.user.id,
    name: name,
    points: 50,
    role: role,
    percentage: score,
    email: session.user.email,
    specialty: (score >= 80) ? specialty : 'General'
  };

  const { error } = await supabaseClient.from('users').upsert([newProfile]);
  if (!error) {
    profile = newProfile;
    showToast('Profile complete! Welcome.', 'success');
    navigateTo('home');
  } else {
    console.error('Profile Upsert Error:', error);
    showToast(`Error: ${error.message}`, 'error');
  }
}

// Rendering
function renderHome() {
  const container = document.getElementById('home-questions');
  const filterCont = document.getElementById('home-filters');
  container.innerHTML = '';
  filterCont.innerHTML = '';

  const subjects = ['All', 'Math', 'Science', 'History', 'Computer Science', 'PPT Design', 'Creative Work', 'Assignments'];
  subjects.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'btn glass-card';
    btn.style.fontSize = '0.7rem';
    btn.style.padding = '8px 16px';
    if (currentFilter === s) {
      btn.style.background = 'var(--p-500)';
      btn.style.color = 'white';
    }
    btn.innerText = s;
    btn.onclick = () => { currentFilter = s; renderHome(); };
    filterCont.appendChild(btn);
  });

  const filtered = questions.filter(q => {
    const matchF = currentFilter === 'All' || q.subject === currentFilter;
    const matchS = q.title.toLowerCase().includes(currentSearch.toLowerCase());
    return matchF && matchS;
  });

  if (filtered.length === 0) {
    container.innerHTML = '<div class="glass-card" style="text-align: center; padding: 4rem; color: var(--text-secondary); font-weight: 600;">No broadcasting doubts here.</div>';
    return;
  }

  filtered.forEach(q => {
    const isHighValue = ['PPT Design', 'Creative Work', 'Assignments'].includes(q.subject);
    const isResolved = q.status === 'resolved';
    
    const el = document.createElement('div');
    el.className = 'doubt-card glass-card';
    if (isResolved) el.style.borderLeft = '5px solid #10b981';
    else if (isHighValue) el.style.borderLeft = '5px solid #ec4899'; 
    
    el.onclick = () => navigateTo('question', q.id);
    el.innerHTML = `
      <div class="doubt-info">
        <h4 style="display: flex; align-items: center; gap: 8px;">
          ${escapeHTML(q.title)}
          ${isResolved ? '<i data-lucide="check-circle" style="width: 14px; color: #10b981;"></i>' : ''}
          ${isHighValue && !isResolved ? '<i data-lucide="zap" style="width: 14px; color: #ec4899;"></i>' : ''}
        </h4>
        <div style="display: flex; gap: 10px; align-items: center;">
          <span class="tag" style="background: ${getTagColor(q.subject)}">${q.subject}</span>
          <span style="font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
            <i data-lucide="message-circle" style="width: 14px;"></i>
            ${q.answers?.length || 0}
          </span>
          ${isResolved ? '<span style="font-size: 0.7rem; font-weight: 800; color: #10b981; text-transform: uppercase;">Solved</span>' : ''}
        </div>
      </div>
      <i data-lucide="arrow-right" style="color: var(--p-500);"></i>
    `;
    container.appendChild(el);
  });
  lucide.createIcons();
}

async function renderLeaderboard() {
  const container = document.getElementById('view-leaderboard');
  container.innerHTML = '<div class="glass-card" style="padding: 2rem;">Tallying the best scholars...</div>';

  const { data: topUsers } = await supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(20);

  if (topUsers) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; font-weight: 800; letter-spacing: -2px;">Hall of <span style="color: var(--p-500);">Fame</span></h1>
        <p style="color: var(--text-secondary); font-weight: 600;">The elite contributors of the ScholarQ ecosystem.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        ${topUsers.map((u, i) => `
          <div class="glass-card" style="padding: 1.5rem; display: flex; align-items: center; gap: 20px; border-left: 5px solid ${i < 3 ? '#fbbf24' : 'var(--glass-border)'}">
            <div style="font-size: 1.5rem; font-weight: 800; color: ${i < 3 ? '#fbbf24' : 'var(--text-secondary)'}; width: 40px;">#${i + 1}</div>
            <div style="width: 50px; height: 50px; background: rgba(0,0,0,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.25rem;">${u.name ? u.name[0] : '?'}</div>
            <div style="flex: 1;">
              <div style="font-weight: 700; font-size: 1.1rem;">${u.name || 'Anonymous'}</div>
              <div style="font-size: 0.7rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase;">${calculateRank(u.points)}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-weight: 800; color: var(--p-500); font-size: 1.25rem;">${u.points}</div>
              <div style="font-size: 0.6rem; font-weight: 800; color: var(--text-secondary); text-transform: uppercase;">PTS</div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function renderProfile() {
  if (!profile) return;
  document.getElementById('profile-name').innerText = profile.name;
  document.getElementById('profile-email').innerText = session.user.email;
  document.getElementById('profile-avatar').innerText = profile.name[0].toUpperCase();
  document.getElementById('profile-points').innerText = profile.points;
  document.getElementById('profile-asked').innerText = questions.filter(q => q.asker_id === profile.id).length;
  
  renderBadges();
}

function renderBadges() {
  const cont = document.getElementById('profile-badges');
  cont.innerHTML = '';
  
  const badges = [];
  if (profile.points >= 100) badges.push({ icon: 'star', name: 'Rising Star', color: '#3b82f6' });
  if (profile.points >= 500) badges.push({ icon: 'trophy', name: 'Elite Scholar', color: '#fbbf24' });
  if (profile.streak >= 7) badges.push({ icon: 'flame', name: 'Unstoppable', color: '#f97316' });
  
  if (badges.length === 0) {
    cont.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.9rem;">Complete milestones to earn badges!</p>';
    return;
  }

  badges.forEach(b => {
    cont.innerHTML += `
      <div class="glass-card" style="padding: 10px 15px; border-color: ${b.color}; display: flex; align-items: center; gap: 10px;">
        <i data-lucide="${b.icon}" style="width: 16px; color: ${b.color};"></i>
        <span style="font-size: 0.75rem; font-weight: 800; color: ${b.color}; text-transform: uppercase;">${b.name}</span>
      </div>
    `;
  });
  lucide.createIcons();
}

function renderQuestionDetail() {
  const q = questions.find(x => x.id === currentQuestionId);
  if (!q) return;

  const isHighValue = ['PPT Design', 'Creative Work', 'Assignments'].includes(q.subject);
  const reward = isHighValue ? 15 : 5;

  document.getElementById('qd-content').innerHTML = `
    <div class="glass-card" style="padding: 3rem; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem;">
        <div>
          <span class="tag" style="padding: 6px 16px; font-size: 0.8rem; background: ${getTagColor(q.subject)}">${q.subject}</span>
          <h2 style="font-size: 2.25rem; font-weight: 800; margin-top: 1rem; letter-spacing: -1px;">${escapeHTML(q.title)}</h2>
        </div>
        <div class="glass-card" style="padding: 12px 20px; text-align: center; border-color: ${isHighValue ? '#ec4899' : 'var(--p-500)'};">
          <div style="color: ${isHighValue ? '#ec4899' : 'var(--p-600)'}; font-weight: 800; font-size: 1.25rem;">+${reward}</div>
          <div style="font-size: 0.6rem; font-weight: 900; text-transform: uppercase; color: var(--text-secondary);">Potential</div>
        </div>
      </div>
      <p style="font-size: 1.25rem; line-height: 1.8; font-weight: 500; color: var(--text-primary); white-space: pre-wrap;">${escapeHTML(q.body)}</p>
      <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--glass-border); display: flex; align-items: center; gap: 1rem;">
        <div style="width: 35px; height: 35px; background: var(--p-400); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">${q.asker_name[0]}</div>
        <span style="font-weight: 600; color: var(--text-secondary);">Broadcasted by <strong style="color: var(--text-primary);">${q.asker_name}</strong></span>
      </div>
    </div>
  `;

  const ansCont = document.getElementById('qd-answers');
  ansCont.innerHTML = `<h3 style="margin-bottom: 2rem; font-weight: 800;">${q.answers?.length || 0} Contributions</h3>`;
  
  (q.answers || []).forEach(a => {
    const isBest = q.best_answer_id === a.id;
    const isAsker = session && session.user.id === q.asker_id;
    
    ansCont.innerHTML += `
      <div class="glass-card" style="padding: 2rem; margin-bottom: 1.5rem; border-left: 5px solid ${isBest ? '#10b981' : 'var(--p-500)'}; display: flex; justify-content: space-between; align-items: flex-start; ${isBest ? 'background: rgba(16, 185, 129, 0.05);' : ''}">
        <div style="flex: 1;">
          <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;">
            <div style="width: 35px; height: 35px; background: rgba(0,0,0,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">${a.author_name[0]}</div>
            <div>
              <div style="font-size: 0.95rem; font-weight: 700;">${a.author_name} ${isBest ? '<span style="color: #10b981; margin-left: 8px;">✅ BEST SOLUTION</span>' : ''}</div>
              <div style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 800;">${a.author_role}</div>
            </div>
          </div>
          <p style="line-height: 1.7; font-weight: 500;">${escapeHTML(a.body)}</p>
          
          ${isAsker && !q.best_answer_id ? `
            <button onclick="handleMarkBest('${a.id}', '${a.author_id}')" class="btn glass-card" style="margin-top: 1.5rem; font-size: 0.7rem; color: #10b981; border-color: #10b981;">
              <i data-lucide="check-circle" style="width: 14px;"></i> Mark as Best
            </button>
          ` : ''}
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; margin-left: 1.5rem;">
          <button onclick="handleUpvote('${a.id}', '${a.author_id}')" class="btn-icon glass-card" style="width: 40px; height: 40px; background: ${profile && profile.points >= 5 ? 'rgba(139, 92, 246, 0.1)' : 'transparent'}">
            <i data-lucide="arrow-big-up" style="width: 20px; color: var(--p-500);"></i>
          </button>
          <span style="font-weight: 800; color: var(--text-secondary); font-size: 0.9rem;">${a.upvotes || 0}</span>
        </div>
      </div>
    `;
  });

  const qdForm = document.getElementById('qd-form');
  if (session && (q.asker_id === session.user.id || q.answers.some(a => a.author_id === session.user.id))) {
    qdForm.style.display = 'none';
  } else {
    qdForm.style.display = 'block';
  }
  lucide.createIcons();
}

// Global UI
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  localStorage.setItem('scholarq_theme', isDarkMode ? 'dark' : 'light');
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.setAttribute('data-lucide', isDarkMode ? 'sun' : 'moon');
    lucide.createIcons();
  }
}

function updateGlobalUI() {
  if (!profile) return;
  const rank = calculateRank(profile.points);
  document.getElementById('top-points').innerText = profile.points;
  document.getElementById('welcome-name').innerText = profile.name.split(' ')[0];
  document.getElementById('dash-points').innerText = profile.points;
  document.getElementById('dash-role').innerText = rank;
  document.getElementById('side-streak').innerText = `🔥 ${profile.streak || 0} Days`;

  // Scholar Features
  const isScholar = profile.role === 'scholar';
  document.getElementById('scholar-badge').style.display = isScholar ? 'block' : 'none';
  document.getElementById('scholar-hub').style.display = isScholar ? 'block' : 'none';
  if (isScholar) {
    document.getElementById('dash-specialty').innerText = profile.specialty || 'Generalist';
    document.getElementById('dash-rank').innerText = rank;
  }
}

function calculateRank(pts) {
  if (pts >= 1000) return 'Sage';
  if (pts >= 500) return 'Scholar';
  if (pts >= 200) return 'Brainiac';
  return 'Newbie';
}

function handleSearch(val) {
  currentSearch = val;
  renderHome();
}

function setupSubscriptions() {
  supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => {
    fetchQuestions();
    fetchProfile();
  }).subscribe();
}

async function handleAsk(e) {
  e.preventDefault();
  const title = document.getElementById('ask-title').value;
  const subject = document.getElementById('ask-subject').value;
  const body = document.getElementById('ask-body').value;

  const { error } = await supabaseClient.from('questions').insert([{
    id: 'q_' + Date.now(),
    title, subject, body,
    asker_id: session.user.id, asker_name: profile.name,
    reward: 5, status: 'open'
  }]);

  if (!error) {
    showToast('Broadcast successful!', 'success');
    document.getElementById('ask-form').reset();
    await fetchQuestions();
    navigateTo('home');
  }
}

async function handleAnswer(e) {
  e.preventDefault();
  const body = document.getElementById('answer-body').value;
  const q = questions.find(x => x.id === currentQuestionId);
  const isHighValue = ['PPT Design', 'Creative Work', 'Assignments'].includes(q.subject);
  const isScholar = profile.role === 'scholar';
  
  const { error } = await supabaseClient.from('answers').insert([{
    id: 'a_' + Date.now(),
    question_id: currentQuestionId,
    body, author_id: session.user.id, author_name: profile.name,
    author_role: profile.role,
    upvotes: 0
  }]);

  if (!error) {
    if (isScholar) {
      const reward = isHighValue ? 15 : 5;
      showToast(`Solution submitted! +${reward} Points earned.`, 'success');
      await supabaseClient.from('users').update({ points: (profile.points || 0) + reward }).eq('id', session.user.id);
    } else {
      showToast('Solution submitted! Points will be awarded after validation (upvotes).', 'info');
    }
    
    document.getElementById('answer-form').reset();
    await fetchQuestions();
    await fetchProfile();
  }
}

function getTagColor(subject) {
  switch(subject) {
    case 'Math': return 'rgba(139, 92, 246, 0.1)';
    case 'Science': return 'rgba(16, 185, 129, 0.1)';
    case 'PPT Design': return 'rgba(236, 72, 153, 0.1)';
    case 'Creative Work': return 'rgba(245, 158, 11, 0.1)';
    case 'Assignments': return 'rgba(59, 130, 246, 0.1)';
    default: return 'rgba(0,0,0,0.05)';
  }
}

async function handleUpvote(answerId, authorId) {
  if (authorId === session.user.id) return showToast("You can't upvote your own answer!", 'error');
  
  const answer = questions.flatMap(q => q.answers).find(a => a.id === answerId);
  const newUpvotes = (answer.upvotes || 0) + 1;
  
  const { error: aError } = await supabaseClient.from('answers').update({ upvotes: newUpvotes }).eq('id', answerId);
  if (aError) return showToast("Vote failed", "error");

  // Reward Author (Student rewards are now based on upvotes)
  const { data: authorData } = await supabaseClient.from('users').select('points, role').eq('id', authorId).single();
  let authorReward = 2; // Default for 1st upvote
  if (newUpvotes === 3) authorReward = 5;
  
  await supabaseClient.from('users').update({ points: (authorData.points || 0) + authorReward }).eq('id', authorId);
  
  // Reward Voter (Student only, max 10/day)
  if (profile.role !== 'scholar') {
    await supabaseClient.from('users').update({ points: (profile.points || 0) + 1 }).eq('id', session.user.id);
    showToast('Upvoted! +1 pt earned for helping moderation.', 'success');
  } else {
    showToast('Upvoted! Help recognized.', 'success');
  }
  
  fetchQuestions();
  fetchProfile();
}

async function handleMarkBest(answerId, authorId) {
  if (!confirm("Is this the best solution? This will resolve your doubt and award bonus points!")) return;

  // 1. Mark question as resolved and link best answer
  const { error: qError } = await supabaseClient.from('questions').update({ 
    best_answer_id: answerId,
    status: 'resolved'
  }).eq('id', currentQuestionId);

  if (qError) return showToast("Failed to mark as best", "error");

  // 2. Award bonus points to author (+20)
  const { data: authorData } = await supabaseClient.from('users').select('points').eq('id', authorId).single();
  const newPoints = (authorData.points || 0) + 20;
  await supabaseClient.from('users').update({ points: newPoints }).eq('id', authorId);

  showToast('Doubt Resolved! +20 bonus pts awarded to helper.', 'success');
  await fetchQuestions();
}

function showToast(msg, type = 'info') {
  const cont = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'glass-card';
  t.style.padding = '14px 24px';
  t.style.marginBottom = '10px';
  t.style.fontWeight = '700';
  t.style.fontSize = '0.9rem';
  t.style.color = (type === 'error') ? '#ef4444' : '#10b981';
  t.style.borderLeft = `5px solid ${(type === 'error') ? '#ef4444' : '#10b981'}`;
  t.innerText = msg;
  cont.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(30px)';
    t.style.transition = 'all 0.4s ease';
    setTimeout(() => t.remove(), 400);
  }, 3000);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
}

// Marketplace Logic
async function renderMarketplace() {
  const container = document.getElementById('market-list');
  container.innerHTML = '<div class="glass-card">Loading marketplace...</div>';

  const { data: items } = await supabaseClient.from('marketplace_items').select('*').order('created_at', { ascending: false });
  const { data: myPurchases } = await supabaseClient.from('purchases').select('item_id').eq('user_id', session.user.id);
  const purchasedIds = (myPurchases || []).map(p => p.item_id);

  if (items) {
    container.innerHTML = '';
    items.forEach(item => {
      const isOwner = item.seller_id === session.user.id;
      const isBought = purchasedIds.includes(item.id) || isOwner;
      
      container.innerHTML += `
        <div class="glass-card" style="padding: 2rem; display: flex; flex-direction: column; gap: 1rem;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <h3 style="font-size: 1.25rem; font-weight: 800;">${escapeHTML(item.title)}</h3>
            <span style="color: var(--p-500); font-weight: 800;">${item.price} PTS</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">By <strong>${item.seller_name}</strong></p>
          
          ${isBought ? `
            <a href="${item.link}" target="_blank" class="btn btn-primary" style="text-decoration: none; justify-content: center;">
              <i data-lucide="external-link"></i> View Document
            </a>
          ` : `
            <button onclick="handleBuyItem('${item.id}', ${item.price}, '${item.seller_id}')" class="btn glass-card" style="justify-content: center; color: var(--p-500);">
              <i data-lucide="lock"></i> Buy with Points
            </button>
          `}
        </div>
      `;
    });
  }
  lucide.createIcons();
}

async function handleSell(e) {
  e.preventDefault();
  const title = document.getElementById('sell-title').value;
  const price = parseInt(document.getElementById('sell-price').value);
  const file = document.getElementById('sell-file').files[0];

  if (!file) return showToast('Please select a file', 'error');

  showToast('Uploading file...', 'info');

  // 1. Upload to Supabase Storage
  const fileName = `${Date.now()}_${file.name}`;
  const { data: uploadData, error: uploadError } = await supabaseClient.storage
    .from('marketplace')
    .upload(fileName, file);

  if (uploadError) {
    console.error('Upload Error:', uploadError);
    return showToast(`Upload failed: ${uploadError.message}`, 'error');
  }

  // 2. Get Public URL
  const { data: { publicUrl } } = supabaseClient.storage
    .from('marketplace')
    .getPublicUrl(fileName);

  // 3. Save Item record
  const { error } = await supabaseClient.from('marketplace_items').insert([{
    id: 'm_' + Date.now(),
    title, price, link: publicUrl,
    seller_id: session.user.id, seller_name: profile.name
  }]);

  if (!error) {
    showToast('Item listed successfully!', 'success');
    closeSellModal();
    renderMarketplace();
  } else {
    showToast('Failed to list item', 'error');
  }
}

async function handleBuyItem(itemId, price, sellerId) {
  if (profile.points < price) return showToast('Not enough points!', 'error');
  if (!confirm(`Buy this item for ${price} points?`)) return;

  // 1. Record purchase
  const { error: pError } = await supabaseClient.from('purchases').insert([{
    user_id: session.user.id,
    item_id: itemId
  }]);

  if (pError) return showToast('Transaction failed', 'error');

  // 2. Subtract points from buyer
  await supabaseClient.from('users').update({ points: profile.points - price }).eq('id', session.user.id);
  
  // 3. Add points to seller
  const { data: sellerData } = await supabaseClient.from('users').select('points').eq('id', sellerId).single();
  await supabaseClient.from('users').update({ points: (sellerData.points || 0) + price }).eq('id', sellerId);

  showToast('Purchase successful!', 'success');
  await fetchProfile();
  renderMarketplace();
}

function openSellModal() {
  document.getElementById('modal-sell').style.display = 'block';
}

function closeSellModal() {
  document.getElementById('modal-sell').style.display = 'none';
}

// Phase 3 Progression Logic
async function handleDailyLogin() {
  const today = new Date().toISOString().split('T')[0];
  if (profile.last_login === today) return;

  let newPoints = (profile.points || 0) + 2;
  let newStreak = (profile.streak || 0) + 1;
  
  // Check streak bonus
  if (newStreak === 3) newPoints += 5;
  if (newStreak === 7) newPoints += 15;

  const { error } = await supabaseClient.from('users').update({
    last_login: today,
    streak: newStreak,
    points: newPoints
  }).eq('id', session.user.id);

  if (!error) {
    showToast(`Daily Login! +2 pts. Streak: ${newStreak} days 🔥`, 'success');
    profile.points = newPoints;
    profile.streak = newStreak;
    updateGlobalUI();
  }
}

function renderMicroTasks() {
  const container = document.getElementById('challenges-list');
  if (profile.role === 'scholar') {
    document.getElementById('student-challenges').style.display = 'none';
    return;
  }
  
  document.getElementById('student-challenges').style.display = 'block';
  const today = new Date().toISOString().split('T')[0];

  if (profile.last_challenge_date === today) {
    container.innerHTML = `
      <div class="glass-card" style="padding: 2rem; text-align: center; width: 100%; border-color: #10b981;">
        <i data-lucide="check-circle" style="width: 32px; color: #10b981; margin-bottom: 1rem;"></i>
        <h4 style="font-weight: 800;">Daily Challenges Complete!</h4>
        <p style="font-size: 0.8rem; color: var(--text-secondary);">Come back tomorrow for new tasks.</p>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = `
    <div class="glass-card" style="padding: 1rem; border-color: #10b981;">
      <div style="font-size: 0.8rem; font-weight: 800; color: #10b981; margin-bottom: 0.5rem;">QUICK MCQ</div>
      <p style="font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;">Which law states F = ma?</p>
      <div style="display: flex; gap: 10px;">
        <button onclick="handleMicroTask(true, 2)" class="btn glass-card" style="font-size: 0.7rem;">Newton's 2nd</button>
        <button onclick="handleMicroTask(false, 0)" class="btn glass-card" style="font-size: 0.7rem;">Newton's 1st</button>
      </div>
    </div>
    <div class="glass-card" style="padding: 1rem; border-color: #3b82f6;">
      <div style="font-size: 0.8rem; font-weight: 800; color: #3b82f6; margin-bottom: 0.5rem;">CONCEPT POLL</div>
      <p style="font-size: 0.9rem; font-weight: 600; margin-bottom: 1rem;">Is light a wave or particle?</p>
      <div style="display: flex; gap: 10px;">
        <button onclick="handleMicroTask(true, 1)" class="btn glass-card" style="font-size: 0.7rem;">Both</button>
        <button onclick="handleMicroTask(true, 1)" class="btn glass-card" style="font-size: 0.7rem;">Wave only</button>
      </div>
    </div>
  `;
}

async function handleMicroTask(isCorrect, reward) {
  const today = new Date().toISOString().split('T')[0];
  if (profile.last_challenge_date === today) return showToast('Challenge already completed today!', 'error');
  if (!isCorrect) return showToast('Incorrect! Try again tomorrow.', 'error');
  
  const { error } = await supabaseClient.from('users').update({ 
    points: (profile.points || 0) + reward,
    last_challenge_date: today
  }).eq('id', session.user.id);

  if (!error) {
    showToast(`Challenge Complete! +${reward} pts.`, 'success');
    await fetchProfile();
    renderMicroTasks();
  }
}

async function checkScholarPromotion() {
  if (profile.role === 'scholar') return;
  
  const hasPoints = profile.points >= 100;
  const hasAcademic = profile.percentage >= 80;
  
  const { data: answers } = await supabaseClient.from('answers').select('id').eq('author_id', session.user.id).gte('upvotes', 1);
  const hasHelpful = (answers || []).length >= 5;

  if (hasPoints && hasAcademic && hasHelpful) {
    if (confirm("CONGRATULATIONS! You qualify for Scholar status. Ascend now?")) {
      await supabaseClient.from('users').update({ role: 'scholar' }).eq('id', session.user.id);
      showToast('You are now an Elite Scholar! 🏆', 'success');
      await fetchProfile();
    }
  } else {
    let msg = "Requirements for Scholar: ";
    if (!hasPoints) msg += "100 pts, ";
    if (!hasAcademic) msg += "80% score, ";
    if (!hasHelpful) msg += "5 helpful answers.";
    showToast(msg, 'info');
  }
}
