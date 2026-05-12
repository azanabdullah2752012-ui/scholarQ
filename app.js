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
    await fetchQuestions();
    setupSubscriptions();
    if (hasProfile) {
      navigateTo('home');
    }
  } else {
    navigateTo('auth');
  }

  // Global Listeners
  document.getElementById('auth-form').addEventListener('submit', handleAuth);
  document.getElementById('ask-form').addEventListener('submit', handleAsk);
  document.getElementById('answer-form').addEventListener('submit', handleAnswer);
  document.getElementById('finish-profile-form').addEventListener('submit', handleFinishProfile);
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

  if (view === 'home') renderHome();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
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

  const subjects = ['All', 'Math', 'Science', 'History', 'Computer Science'];
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
    const el = document.createElement('div');
    el.className = 'doubt-card glass-card';
    el.onclick = () => navigateTo('question', q.id);
    el.innerHTML = `
      <div class="doubt-info">
        <h4>${escapeHTML(q.title)}</h4>
        <div style="display: flex; gap: 10px; align-items: center;">
          <span class="tag">${q.subject}</span>
          <span style="font-size: 0.8rem; color: var(--text-secondary); display: flex; align-items: center; gap: 4px;">
            <i data-lucide="message-circle" style="width: 14px;"></i>
            ${q.answers?.length || 0}
          </span>
        </div>
      </div>
      <i data-lucide="arrow-right" style="color: var(--p-500);"></i>
    `;
    container.appendChild(el);
  });
  lucide.createIcons();
}

async function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  container.innerHTML = '<div class="glass-card" style="padding: 2rem;">Fetching Hub elite...</div>';
  
  const { data } = await supabaseClient.from('users').select('name, points, role').order('points', { ascending: false }).limit(10);
  if (data) {
    container.innerHTML = '';
    data.forEach((u, i) => {
      container.innerHTML += `
        <div class="doubt-card glass-card" style="margin-bottom: 1rem;">
          <div style="display: flex; align-items: center; gap: 1.5rem; flex: 1;">
            <span style="font-weight: 900; color: var(--p-400); width: 20px;">${i+1}</span>
            <div style="width: 45px; height: 45px; background: var(--glass-border); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--p-500);">${u.name[0]}</div>
            <div>
              <div style="font-weight: 700;">${u.name}</div>
              <div style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 800; letter-spacing: 0.5px;">${u.role}</div>
            </div>
          </div>
          <strong style="color: var(--p-500); font-size: 1.1rem;">${u.points} PTS</strong>
        </div>
      `;
    });
  }
}

function renderProfile() {
  if (!profile) return;
  document.getElementById('profile-name').innerText = profile.name;
  document.getElementById('profile-email').innerText = session.user.email;
  document.getElementById('profile-avatar').innerText = profile.name[0].toUpperCase();
  document.getElementById('profile-points').innerText = profile.points;
  document.getElementById('profile-asked').innerText = questions.filter(q => q.asker_id === profile.id).length;
}

function renderQuestionDetail() {
  const q = questions.find(x => x.id === currentQuestionId);
  if (!q) return;

  document.getElementById('qd-content').innerHTML = `
    <div class="glass-card" style="padding: 3rem; text-align: left;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem;">
        <div>
          <span class="tag" style="padding: 6px 16px; font-size: 0.8rem;">${q.subject}</span>
          <h2 style="font-size: 2.25rem; font-weight: 800; margin-top: 1rem; letter-spacing: -1px;">${escapeHTML(q.title)}</h2>
        </div>
        <div class="glass-card" style="padding: 12px 20px; text-align: center; border-color: var(--p-500);">
          <div style="color: var(--p-600); font-weight: 800; font-size: 1.25rem;">+5</div>
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
    ansCont.innerHTML += `
      <div class="glass-card" style="padding: 2rem; margin-bottom: 1.5rem; border-left: 5px solid var(--p-500);">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;">
          <div style="width: 35px; height: 35px; background: rgba(0,0,0,0.05); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800;">${a.author_name[0]}</div>
          <div>
            <div style="font-size: 0.95rem; font-weight: 700;">${a.author_name}</div>
            <div style="font-size: 0.7rem; color: var(--text-secondary); text-transform: uppercase; font-weight: 800;">${a.author_role}</div>
          </div>
        </div>
        <p style="line-height: 1.7; font-weight: 500;">${escapeHTML(a.body)}</p>
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
  document.getElementById('top-points').innerText = profile.points;
  document.getElementById('welcome-name').innerText = profile.name.split(' ')[0];
  document.getElementById('dash-points').innerText = profile.points;
  document.getElementById('dash-role').innerText = profile.role;
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
  
  const { error } = await supabaseClient.from('answers').insert([{
    id: 'a_' + Date.now(),
    question_id: currentQuestionId,
    body, author_id: session.user.id, author_name: profile.name,
    author_role: profile.role
  }]);

  if (!error) {
    showToast('Solution submitted! +5 Points.', 'success');
    document.getElementById('answer-form').reset();
    await fetchQuestions();
    await supabaseClient.from('users').update({ points: profile.points + 5 }).eq('id', session.user.id);
    await fetchProfile();
  }
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
