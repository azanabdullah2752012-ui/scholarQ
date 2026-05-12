// Initialize Supabase
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// State
let session = null;
let profile = null;
let questions = [];
let allUsers = [];

let currentView = 'auth';
let authMode = 'login'; // 'login' or 'signup'
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
  
  // Auth Listeners
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

  // Event Listeners
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

  if (view === 'auth') {
    sidebar.style.display = 'none';
    topBar.style.display = 'none';
    document.getElementById('main-layout').style.marginLeft = '0';
  } else {
    sidebar.style.display = 'flex';
    topBar.style.display = 'flex';
    document.getElementById('main-layout').style.marginLeft = '260px';
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

// Auth Flow
function switchAuthTab(mode) {
  authMode = mode;
  document.querySelectorAll('#auth-toggle .nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${mode}`).classList.add('active');
  
  const signupFields = document.getElementById('signup-fields');
  const btnText = document.getElementById('auth-btn-text');
  
  if (mode === 'signup') {
    signupFields.style.display = 'block';
    btnText.innerText = 'Create Account';
  } else {
    signupFields.style.display = 'none';
    btnText.innerText = 'Login';
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
    
    // Create profile
    let role = 'student';
    if (score >= 90) role = 'scholar';
    
    await supabaseClient.from('users').insert([{
      id: data.user.id, name, points: 50, role, percentage: score, email
    }]);
    
    showToast('Account created! Check email if needed.', 'success');
  } else {
    const { error } = await supabaseClient.signInWithPassword({ email, password });
    if (error) return showToast('Invalid credentials', 'error');
  }
  
  // Refresh session
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
  container.innerHTML = '';

  const subjects = ['All', 'Math', 'Science', 'History', 'Computer Science'];
  const filterCont = document.getElementById('home-filters');
  filterCont.innerHTML = '';
  subjects.forEach(s => {
    const btn = document.createElement('button');
    btn.className = `badge ${currentFilter === s ? 'badge-primary' : ''}`;
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
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
    container.innerHTML = '<div style="text-align: center; padding: 3rem; color: var(--text-muted);">No doubts found.</div>';
    return;
  }

  filtered.forEach(q => {
    const el = document.createElement('div');
    el.className = 'feed-item';
    el.onclick = () => navigateTo('question', q.id);
    el.innerHTML = `
      <div>
        <h4 style="font-weight: 700;">${escapeHTML(q.title)}</h4>
        <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">
          ${q.subject} • ${q.answers?.length || 0} answers
        </div>
      </div>
      <i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--text-muted);"></i>
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
        <div class="card" style="margin-bottom: 1rem; display: flex; align-items: center; gap: 1.5rem; padding: 1rem 2rem;">
          <span style="font-weight: 800; color: var(--text-muted); width: 20px;">${i+1}</span>
          <div style="flex: 1;">
            <div style="font-weight: 700;">${u.name}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${u.role}</div>
          </div>
          <strong style="color: var(--primary);">${u.points} pts</strong>
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
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
        <div>
          <span class="badge badge-primary">${q.subject}</span>
          <h2 style="font-size: 1.75rem; font-weight: 800; margin-top: 0.5rem;">${escapeHTML(q.title)}</h2>
        </div>
        <div style="text-align: right;">
          <div style="color: var(--primary); font-weight: 800;">+5 pts</div>
          <div style="font-size: 0.7rem; color: var(--text-muted);">Reward</div>
        </div>
      </div>
      <p style="color: var(--text-main); white-space: pre-wrap; font-size: 1.1rem; line-height: 1.6;">${escapeHTML(q.body)}</p>
      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); font-size: 0.9rem; color: var(--text-muted);">
        Asked by <strong>${q.asker_name}</strong>
      </div>
    </div>
  `;

  const ansCont = document.getElementById('qd-answers');
  ansCont.innerHTML = `<h3>${q.answers?.length || 0} Answers</h3>`;
  (q.answers || []).forEach(a => {
    ansCont.innerHTML += `
      <div class="card" style="margin-top: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
          <div style="width: 32px; height: 32px; background: var(--border-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8rem;">${a.author_name[0]}</div>
          <div>
            <div style="font-size: 0.9rem; font-weight: 700;">${a.author_name}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${a.author_role}</div>
          </div>
        </div>
        <p>${escapeHTML(a.body)}</p>
      </div>
    `;
  });

  // Hide answer form if already answered or if it's your own
  const qdForm = document.getElementById('qd-form');
  if (q.asker_id === session.user.id || q.answers.some(a => a.author_id === session.user.id)) {
    qdForm.style.display = 'none';
  } else {
    qdForm.style.display = 'block';
  }
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
    showToast('Doubt posted!', 'success');
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
    showToast('Answer submitted!', 'success');
    document.getElementById('answer-form').reset();
    await fetchQuestions();
    // Award points
    await supabaseClient.from('users').update({ points: profile.points + 5 }).eq('id', session.user.id);
    await fetchProfile();
  }
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('scholarq_theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('scholarq_theme', 'light');
  }
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
  document.getElementById('welcome-name').innerText = profile.name;
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

function showToast(msg, type = 'info') {
  const cont = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.style.background = type === 'error' ? '#ef4444' : '#10b981';
  t.style.color = 'white';
  t.style.padding = '0.75rem 1.5rem';
  t.style.borderRadius = '12px';
  t.style.marginBottom = '1rem';
  t.style.boxShadow = '0 10px 15px rgba(0,0,0,0.1)';
  t.innerText = msg;
  cont.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
}
