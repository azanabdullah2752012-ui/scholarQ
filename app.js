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
    await fetchProfile();
    await fetchQuestions();
    setupSubscriptions();
    navigateTo('home');
  } else {
    navigateTo('auth');
  }

  // Global Listeners
  document.getElementById('auth-form').addEventListener('submit', handleAuth);
  document.getElementById('ask-form').addEventListener('submit', handleAsk);
  document.getElementById('answer-form').addEventListener('submit', handleAnswer);
});

async function fetchProfile() {
  if (!session) return;
  const { data, error } = await supabaseClient.from('users').select('*').eq('id', session.user.id).single();
  if (data && !error) {
    profile = data;
    updateGlobalUI();
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
  document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  if (!session && view !== 'auth') view = 'auth';
  if (view === 'auth' && session) view = 'home';

  currentView = view;
  const sidebar = document.getElementById('sidebar');
  const topBar = document.getElementById('top-bar');
  const mainLayout = document.getElementById('main-layout');

  if (view === 'auth') {
    sidebar.style.display = 'none';
    topBar.style.display = 'none';
    mainLayout.style.marginLeft = '0';
  } else {
    sidebar.style.display = 'flex';
    topBar.style.display = 'flex';
    mainLayout.style.marginLeft = (window.innerWidth > 1024) ? '280px' : '80px';
    const navItem = document.getElementById(`nav-${view}`);
    if (navItem) navItem.classList.add('active');
  }

  const viewEl = document.getElementById(`view-${view}`);
  if (viewEl) viewEl.style.display = 'block';

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
    signupBtn.style.background = 'var(--bg-card)';
    signupBtn.style.color = 'var(--text-heading)';
    signupBtn.style.boxShadow = 'var(--shadow-soft)';
    loginBtn.style.background = 'transparent';
    loginBtn.style.color = 'var(--text-dim)';
    loginBtn.style.boxShadow = 'none';
    signupFields.style.display = 'block';
    btnText.innerText = 'Create Account';
  } else {
    loginBtn.style.background = 'var(--bg-card)';
    loginBtn.style.color = 'var(--text-heading)';
    loginBtn.style.boxShadow = 'var(--shadow-soft)';
    signupBtn.style.background = 'transparent';
    signupBtn.style.color = 'var(--text-dim)';
    signupBtn.style.boxShadow = 'none';
    signupFields.style.display = 'none';
    btnText.innerText = 'Sign In';
  }
}

async function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  
  if (authMode === 'signup') {
    const name = document.getElementById('auth-name').value;
    const score = parseInt(document.getElementById('auth-score').value);
    
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) return showToast(error.message, 'error');
    
    let role = (score >= 90) ? 'scholar' : 'student';
    await supabaseClient.from('users').insert([{
      id: data.user.id, name, points: 50, role, percentage: score, email
    }]);
    
    showToast('Success! Welcome to ScholarQ.', 'success');
  } else {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) return showToast('Invalid email or password', 'error');
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

// Rendering
function renderHome() {
  const container = document.getElementById('home-questions');
  const filterCont = document.getElementById('home-filters');
  container.innerHTML = '';
  filterCont.innerHTML = '';

  const subjects = ['All', 'Math', 'Science', 'History', 'Computer Science'];
  subjects.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.fontSize = '0.75rem';
    btn.style.padding = '6px 14px';
    if (currentFilter === s) {
      btn.style.background = 'var(--primary-glow)';
      btn.style.color = 'var(--primary)';
    } else {
      btn.style.color = 'var(--text-dim)';
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
    container.innerHTML = '<div style="text-align: center; padding: 4rem; color: var(--text-dim); font-weight: 500;">No doubts posted in this category.</div>';
    return;
  }

  filtered.forEach(q => {
    const el = document.createElement('div');
    el.className = 'question-card';
    el.onclick = () => navigateTo('question', q.id);
    el.innerHTML = `
      <div style="flex: 1;">
        <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-heading); margin-bottom: 0.5rem;">${escapeHTML(q.title)}</h4>
        <div class="q-meta">
          <span class="q-badge">${q.subject}</span>
          <span class="q-answers-count">
            <i data-lucide="message-square" style="width: 14px;"></i>
            ${q.answers?.length || 0} answers
          </span>
        </div>
      </div>
      <i data-lucide="arrow-right" style="width: 20px; color: var(--text-dim);"></i>
    `;
    container.appendChild(el);
  });
  lucide.createIcons();
}

async function renderLeaderboard() {
  const container = document.getElementById('leaderboard-list');
  container.innerHTML = '<div class="card">Loading scholars...</div>';
  
  const { data } = await supabaseClient.from('users').select('name, points, role').order('points', { ascending: false }).limit(10);
  if (data) {
    container.innerHTML = '';
    data.forEach((u, i) => {
      container.innerHTML += `
        <div class="question-card" style="padding: 1.25rem 2rem;">
          <div style="display: flex; align-items: center; gap: 1.5rem; flex: 1;">
            <span style="font-weight: 900; color: var(--text-dim); width: 24px; font-size: 1.25rem;">#${i+1}</span>
            <div style="width: 44px; height: 44px; background: var(--bg-app); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-weight: 800; color: var(--primary);">${u.name[0]}</div>
            <div>
              <div style="font-weight: 700; color: var(--text-heading);">${u.name}</div>
              <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">${u.role}</div>
            </div>
          </div>
          <strong style="color: var(--primary); font-size: 1.1rem;">${u.points} pts</strong>
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
    <div class="auth-card" style="text-align: left; padding: 2.5rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2rem;">
        <div>
          <span class="q-badge" style="padding: 6px 14px;">${q.subject}</span>
          <h2 style="font-size: 2rem; font-weight: 800; color: var(--text-heading); margin-top: 1rem; letter-spacing: -0.5px;">${escapeHTML(q.title)}</h2>
        </div>
        <div style="text-align: right; background: var(--primary-glow); padding: 10px 18px; border-radius: 14px;">
          <div style="color: var(--primary); font-weight: 800; font-size: 1.1rem;">+5 pts</div>
          <div style="font-size: 0.65rem; color: var(--primary); font-weight: 800; text-transform: uppercase;">Reward</div>
        </div>
      </div>
      <p style="color: var(--text-heading); white-space: pre-wrap; font-size: 1.15rem; line-height: 1.7; font-weight: 500;">${escapeHTML(q.body)}</p>
      <div style="margin-top: 2.5rem; padding-top: 2rem; border-top: 1px solid var(--border-subtle); display: flex; align-items: center; gap: 0.75rem;">
        <div style="width: 32px; height: 32px; background: var(--bg-app); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem; color: var(--primary);">${q.asker_name[0]}</div>
        <span style="font-size: 0.9rem; color: var(--text-dim); font-weight: 500;">Doubt by <strong>${q.asker_name}</strong></span>
      </div>
    </div>
  `;

  const ansCont = document.getElementById('qd-answers');
  document.getElementById('qd-answers-title').innerText = `${q.answers?.length || 0} Answers`;
  ansCont.innerHTML = '';
  
  (q.answers || []).forEach(a => {
    ansCont.innerHTML += `
      <div class="question-card" style="cursor: default; align-items: flex-start; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <div style="width: 36px; height: 36px; background: var(--primary-glow); color: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9rem;">${a.author_name[0]}</div>
          <div>
            <div style="font-size: 0.95rem; font-weight: 700; color: var(--text-heading);">${a.author_name}</div>
            <div style="font-size: 0.7rem; color: var(--text-dim); text-transform: uppercase; font-weight: 700;">${a.author_role}</div>
          </div>
        </div>
        <p style="line-height: 1.6; color: var(--text-heading); font-weight: 500;">${escapeHTML(a.body)}</p>
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

// Logic
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
    showToast('Success! Your doubt is now live.', 'success');
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
    showToast('Answer submitted! +5 pts earned.', 'success');
    document.getElementById('answer-form').reset();
    await fetchQuestions();
    await supabaseClient.from('users').update({ points: profile.points + 5 }).eq('id', session.user.id);
    await fetchProfile();
  }
}

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
  document.getElementById('dash-role').innerText = profile.role.replace('_', ' ');
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

function showToast(msg, type = 'info') {
  const cont = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.style.background = (type === 'error') ? '#f43f5e' : '#10b981';
  t.style.color = 'white';
  t.style.padding = '12px 24px';
  t.style.borderRadius = '14px';
  t.style.marginBottom = '12px';
  t.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
  t.style.fontWeight = '700';
  t.style.fontSize = '0.9rem';
  t.style.display = 'flex';
  t.style.alignItems = 'center';
  t.style.gap = '10px';
  t.innerHTML = `<i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle'}" style="width: 18px;"></i> ${msg}`;
  cont.appendChild(t);
  lucide.createIcons();
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateX(20px)';
    t.style.transition = 'all 0.3s ease';
    setTimeout(() => t.remove(), 300);
  }, 3000);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
}
