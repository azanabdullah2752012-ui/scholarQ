// ScholarQ - Premium Academic Ecosystem
// Core Logic v2.0 (Consolidated & Stabilized)

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
  if (isDarkMode) document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeIcon();
  lucide.createIcons();
  
  // 1. Initial Session Check
  const { data: { session: initialSession } } = await supabaseClient.auth.getSession();
  await handleSessionUpdate(initialSession);

  // 2. Auth Listener
  supabaseClient.auth.onAuthStateChange(async (event, newSession) => {
    console.log('Auth Event:', event);
    await handleSessionUpdate(newSession);
  });

  // 3. Global Form Listeners
  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
  document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
  document.getElementById('finish-profile-form')?.addEventListener('submit', handleFinishProfile);
  document.getElementById('sell-form')?.addEventListener('submit', handleSell);
  
  document.getElementById('finish-score')?.addEventListener('input', (e) => {
    const group = document.getElementById('finish-subject-group');
    if (group) group.style.display = (parseInt(e.target.value) >= 80) ? 'block' : 'none';
  });
});

async function handleSessionUpdate(newSession) {
  session = newSession;
  if (session) {
    const hasProfile = await fetchProfile();
    if (hasProfile) {
      await handleDailyLogin();
      await fetchQuestions();
      setupSubscriptions();
      if (currentView === 'auth') navigateTo('home');
    }
  } else {
    navigateTo('auth');
  }
}

// Data Fetching
async function fetchProfile() {
  if (!session) return false;
  const { data, error } = await supabaseClient.from('users').select('*').eq('id', session.user.id).single();
  
  if (data && !error) {
    profile = data;
    updateGlobalUI();
    return true;
  } else if (error && error.code === 'PGRST116') {
    navigateTo('finish-profile');
    return false;
  }
  return false;
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
  console.log('Navigating to:', view);
  
  // Hide all views
  document.querySelectorAll('.view').forEach(el => {
    el.style.display = 'none';
    el.style.opacity = '0';
  });
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  // Auth Guard
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

  // View-Specific Renders
  if (view === 'home') { renderHome(); renderMicroTasks(); }
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

// Auth Flow
function switchAuthTab(mode) {
  authMode = mode;
  const loginBtn = document.getElementById('tab-login');
  const signupBtn = document.getElementById('tab-signup');
  const signupFields = document.getElementById('signup-fields');
  const btnText = document.getElementById('auth-btn-text');

  if (mode === 'signup') {
    signupBtn.style.background = 'white';
    signupBtn.style.color = 'var(--text-primary)';
    loginBtn.style.background = 'transparent';
    signupFields.style.display = 'block';
    btnText.innerText = 'Launch Account';
  } else {
    loginBtn.style.background = 'white';
    loginBtn.style.color = 'var(--text-primary)';
    signupBtn.style.background = 'transparent';
    signupFields.style.display = 'none';
    btnText.innerText = 'Login to Hub';
  }
}

async function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  
  if (authMode === 'signup') {
    const name = document.getElementById('auth-name').value;
    const score = parseInt(document.getElementById('auth-score').value) || 0;
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) return showToast(error.message, 'error');
    
    const role = (score >= 90) ? 'scholar' : 'student';
    await supabaseClient.from('users').insert([{
      id: data.user.id, name, points: 50, role, percentage: score, email
    }]);
    showToast('Account created!', 'success');
  } else {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) return showToast(error.message, 'error');
  }
}

async function signInWithGoogle() {
  await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
}

async function handleFinishProfile(e) {
  e.preventDefault();
  const score = parseInt(document.getElementById('finish-score').value);
  const specialty = document.getElementById('finish-subject').value;
  const name = session.user.user_metadata.full_name || session.user.email.split('@')[0];
  
  const role = (score >= 90) ? 'scholar' : 'student';
  const newProfile = {
    id: session.user.id, name, points: 50, role, percentage: score,
    email: session.user.email, specialty: (score >= 80) ? specialty : 'General'
  };

  const { error } = await supabaseClient.from('users').upsert([newProfile]);
  if (!error) {
    profile = newProfile;
    navigateTo('home');
  } else {
    showToast(error.message, 'error');
  }
}

// Rendering Logic
function renderHome() {
  const container = document.getElementById('home-questions');
  const filterCont = document.getElementById('home-filters');
  container.innerHTML = '';
  filterCont.innerHTML = '';

  const subjects = ['All', 'Math', 'Science', 'History', 'Computer Science', 'PPT Design', 'Creative Work', 'Assignments'];
  subjects.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'btn glass-card';
    btn.style.cssText = `font-size: 0.7rem; padding: 8px 16px; ${currentFilter === s ? 'background: var(--p-500); color: white;' : ''}`;
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
    container.innerHTML = '<div class="glass-card" style="text-align: center; padding: 4rem;">No doubts found.</div>';
    return;
  }

  filtered.forEach(q => {
    const isHighValue = ['PPT Design', 'Creative Work', 'Assignments'].includes(q.subject);
    const isResolved = q.status === 'resolved';
    const el = document.createElement('div');
    el.className = 'doubt-card glass-card';
    el.style.borderLeft = `5px solid ${isResolved ? '#10b981' : (isHighValue ? '#ec4899' : 'transparent')}`;
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
            <i data-lucide="message-circle" style="width: 14px;"></i> ${q.answers?.length || 0}
          </span>
          ${isResolved ? '<span style="font-size: 0.7rem; font-weight: 800; color: #10b981;">SOLVED</span>' : ''}
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
  container.innerHTML = '<div class="glass-card">Tallying stars...</div>';
  const { data } = await supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(20);

  if (data) {
    container.innerHTML = `
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3rem; font-weight: 800;">Hall of <span style="color: var(--p-500);">Fame</span></h1>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
        ${data.map((u, i) => `
          <div class="glass-card" style="padding: 1.5rem; display: flex; align-items: center; gap: 20px; border-left: 5px solid ${i < 3 ? '#fbbf24' : 'transparent'}">
            <div style="font-weight: 800; color: ${i < 3 ? '#fbbf24' : 'var(--text-secondary)'}; width: 30px;">#${i+1}</div>
            <div style="flex: 1; font-weight: 700;">${u.name}</div>
            <div style="text-align: right; font-weight: 800; color: var(--p-500);">${u.points} PTS</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function renderProfile() {
  if (!profile) return;
  document.getElementById('profile-name').innerText = profile.name;
  document.getElementById('profile-email').innerText = profile.email;
  document.getElementById('profile-avatar').innerText = profile.name[0].toUpperCase();
  document.getElementById('profile-points').innerText = profile.points;
  document.getElementById('profile-asked').innerText = questions.filter(q => q.asker_id === profile.id).length;
  
  const badgeCont = document.getElementById('profile-badges');
  badgeCont.innerHTML = '';
  const badges = [];
  if (profile.points >= 100) badges.push({ icon: 'star', name: 'Rising Star', color: '#3b82f6' });
  if (profile.points >= 500) badges.push({ icon: 'trophy', name: 'Elite Scholar', color: '#fbbf24' });
  if (profile.streak >= 7) badges.push({ icon: 'flame', name: 'Unstoppable', color: '#f97316' });

  badges.forEach(b => {
    badgeCont.innerHTML += `<div class="glass-card" style="padding: 8px 12px; border-color: ${b.color}; display: flex; align-items: center; gap: 8px;">
      <i data-lucide="${b.icon}" style="width: 14px; color: ${b.color};"></i>
      <span style="font-size: 0.65rem; font-weight: 800; color: ${b.color};">${b.name}</span>
    </div>`;
  });
  lucide.createIcons();
}

async function renderMarketplace() {
  const container = document.getElementById('market-list');
  container.innerHTML = '<div class="glass-card">Opening market...</div>';
  const { data: items } = await supabaseClient.from('marketplace_items').select('*').order('created_at', { ascending: false });
  const { data: myPurchases } = await supabaseClient.from('purchases').select('item_id').eq('user_id', session.user.id);
  const purchasedIds = (myPurchases || []).map(p => p.item_id);

  if (items) {
    container.innerHTML = '';
    items.forEach(item => {
      const isBought = purchasedIds.includes(item.id) || item.seller_id === session.user.id;
      container.innerHTML += `
        <div class="glass-card" style="padding: 2rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
            <h3 style="font-weight: 800;">${escapeHTML(item.title)}</h3>
            <span style="color: var(--p-500); font-weight: 800;">${item.price} PTS</span>
          </div>
          ${isBought ? `
            <a href="${item.link}" target="_blank" class="btn btn-primary" style="width: 100%; text-decoration: none; justify-content: center;">View Document</a>
          ` : `
            <button onclick="handleBuyItem('${item.id}', ${item.price}, '${item.seller_id}')" class="btn glass-card" style="width: 100%; justify-content: center;">Buy Access</button>
          `}
        </div>
      `;
    });
  }
}

// Logic Actions
async function handleDailyLogin() {
  const today = new Date().toISOString().split('T')[0];
  if (profile.last_login === today) return;

  const newStreak = (profile.streak || 0) + 1;
  let bonus = 2;
  if (newStreak === 3) bonus += 5;
  if (newStreak === 7) bonus += 15;

  await supabaseClient.from('users').update({
    last_login: today, streak: newStreak, points: (profile.points || 0) + bonus
  }).eq('id', session.user.id);
  
  showToast(`Daily Check-in! +${bonus} pts`, 'success');
  await fetchProfile();
}

function renderMicroTasks() {
  const cont = document.getElementById('challenges-list');
  if (profile.role === 'scholar' || profile.last_challenge_date === new Date().toISOString().split('T')[0]) {
    document.getElementById('student-challenges').style.display = (profile.role === 'scholar') ? 'none' : 'block';
    if (profile.last_challenge_date === new Date().toISOString().split('T')[0]) {
      cont.innerHTML = '<div class="glass-card" style="padding: 2rem; text-align: center; width: 100%;">✅ Daily Challenge Complete!</div>';
    }
    return;
  }
  
  document.getElementById('student-challenges').style.display = 'block';
  cont.innerHTML = `
    <div class="glass-card" style="padding: 1.5rem;">
      <p style="font-weight: 700; margin-bottom: 1rem;">Which law states F = ma?</p>
      <button onclick="handleMicroTask(true, 2)" class="btn glass-card">Newton's 2nd</button>
      <button onclick="handleMicroTask(false, 0)" class="btn glass-card">Newton's 1st</button>
    </div>
  `;
}

async function handleMicroTask(correct, reward) {
  if (!correct) return showToast('Try again!', 'error');
  const today = new Date().toISOString().split('T')[0];
  await supabaseClient.from('users').update({ 
    points: (profile.points || 0) + reward, last_challenge_date: today 
  }).eq('id', session.user.id);
  showToast('Correct! Points awarded.', 'success');
  await fetchProfile();
  renderMicroTasks();
}

// Helper Utils
function updateGlobalUI() {
  const rank = calculateRank(profile.points);
  document.querySelectorAll('#dash-points, #top-points').forEach(el => el.innerText = profile.points);
  document.getElementById('welcome-name').innerText = profile.name.split(' ')[0];
  document.getElementById('dash-role').innerText = rank;
  document.getElementById('side-streak').innerText = `🔥 ${profile.streak || 0} Days`;
  
  const isScholar = profile.role === 'scholar';
  document.getElementById('scholar-badge').style.display = isScholar ? 'block' : 'none';
  document.getElementById('scholar-hub').style.display = isScholar ? 'block' : 'none';
}

function calculateRank(pts) {
  if (pts >= 1000) return 'Sage';
  if (pts >= 500) return 'Scholar';
  if (pts >= 200) return 'Brainiac';
  return 'Newbie';
}

function showToast(msg, type = 'info') {
  const cont = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'glass-card';
  t.style.cssText = `padding: 12px 24px; margin-bottom: 8px; font-weight: 700; color: ${type === 'error' ? '#ef4444' : '#10b981'}; border-left: 4px solid ${type === 'error' ? '#ef4444' : '#10b981'};`;
  t.innerText = msg;
  cont.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function escapeHTML(s) { return s?.replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":"&#39;",'"':"&quot;"}[t])) || ''; }
function getTagColor(s) { return 'rgba(139, 92, 246, 0.1)'; }
async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
function openSellModal() { document.getElementById('modal-sell').style.display = 'block'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }
function handleSearch(v) { currentSearch = v; renderHome(); }
function toggleDarkMode() { isDarkMode = !isDarkMode; document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light'); localStorage.setItem('scholarq_theme', isDarkMode ? 'dark' : 'light'); updateThemeIcon(); }
function updateThemeIcon() { const i = document.getElementById('theme-icon'); if (i) i.setAttribute('data-lucide', isDarkMode ? 'sun' : 'moon'); lucide.createIcons(); }
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); }).subscribe(); }

// ... (Other handlers like handleAsk, handleAnswer, handleUpvote, etc. same as before but simplified)
async function handleAsk(e) { e.preventDefault(); const title = document.getElementById('ask-title').value; const subject = document.getElementById('ask-subject').value; const body = document.getElementById('ask-body').value; const { error } = await supabaseClient.from('questions').insert([{ id: 'q_'+Date.now(), title, subject, body, asker_id: session.user.id, asker_name: profile.name, reward: 5, status: 'open' }]); if (!error) { showToast('Broadcasted!', 'success'); document.getElementById('ask-form').reset(); fetchQuestions(); navigateTo('home'); } }
async function handleAnswer(e) { e.preventDefault(); const body = document.getElementById('answer-body').value; const { error } = await supabaseClient.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQuestionId, body, author_id: session.user.id, author_name: profile.name, author_role: profile.role, upvotes: 0 }]); if (!error) { showToast('Answered!', 'success'); document.getElementById('answer-form').reset(); fetchQuestions(); fetchProfile(); } }
async function handleBuyItem(id, price, sId) { if (profile.points < price) return showToast('Not enough points!', 'error'); await supabaseClient.from('purchases').insert([{ user_id: session.user.id, item_id: id }]); await supabaseClient.from('users').update({ points: profile.points - price }).eq('id', session.user.id); const { data: s } = await supabaseClient.from('users').select('points').eq('id', sId).single(); await supabaseClient.from('users').update({ points: (s.points || 0) + price }).eq('id', sId); showToast('Purchased!', 'success'); fetchProfile(); renderMarketplace(); }
async function handleUpvote(aId, auId) { if (auId === session.user.id) return; const { data: a } = await supabaseClient.from('answers').select('upvotes').eq('id', aId).single(); await supabaseClient.from('answers').update({ upvotes: (a.upvotes || 0) + 1 }).eq('id', aId); await supabaseClient.from('users').update({ points: (profile.points || 0) + 1 }).eq('id', session.user.id); showToast('Upvoted! +1 pt', 'success'); fetchQuestions(); fetchProfile(); }
