// Initialize Supabase
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// State
let user = JSON.parse(localStorage.getItem('scholarq_user'));
let questions = [];

let currentView = 'auth';
let currentQuestionId = null;
let currentSearch = '';
let currentSort = 'newest';
let currentFilter = 'All';
let searchTimeout = null;

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  
  // Auth score logic
  const authScoreInput = document.getElementById('auth-score');
  if(authScoreInput) {
    authScoreInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      const subjectGroup = document.getElementById('auth-subject-group');
      if (val >= 80) subjectGroup.style.display = 'block';
      else subjectGroup.style.display = 'none';
    });
  }

  document.getElementById('auth-form').addEventListener('submit', handleJoin);
  document.getElementById('ask-form').addEventListener('submit', handleAsk);
  document.getElementById('answer-form').addEventListener('submit', handleAnswer);

  if (user) {
    await fetchUserFromDB();
    await fetchQuestionsFromDB();
    setupRealtimeSubscriptions();
    navigateTo('home');
  } else {
    navigateTo('auth');
  }
});

async function fetchUserFromDB() {
  if (!user) return;
  const { data, error } = await supabaseClient.from('users').select('*').eq('id', user.id).single();
  if (data && !error) {
    user = data;
    localStorage.setItem('scholarq_user', JSON.stringify(user));
    updateLayoutUI();
  }
}

async function fetchQuestionsFromDB() {
  const { data: qData, error: qError } = await supabaseClient.from('questions').select('*').order('created_at', { ascending: false });
  const { data: aData, error: aError } = await supabaseClient.from('answers').select('*').order('created_at', { ascending: true });

  if (qError || aError) return;

  questions = qData.map(q => ({
    ...q,
    answers: aData.filter(a => a.question_id === q.id)
  }));

  if (currentView === 'home') renderHome();
  if (currentView === 'question') renderQuestionDetail();
}

async function updateUserPoints(newPoints) {
  user.points = newPoints;
  localStorage.setItem('scholarq_user', JSON.stringify(user));
  updateLayoutUI();
  await supabaseClient.from('users').update({ points: newPoints }).eq('id', user.id);
}

// Realtime
function setupRealtimeSubscriptions() {
  supabaseClient.channel('scholarq_realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'questions' }, () => fetchQuestionsFromDB())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'answers' }, () => fetchQuestionsFromDB())
    .subscribe();
}

// UI Utilities
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function updateLayoutUI() {
  if (!user) return;
  document.getElementById('top-points').innerText = `${user.points} pts`;
  document.getElementById('top-username').innerText = user.name;
  document.getElementById('top-avatar').innerText = user.name[0].toUpperCase();
  document.getElementById('welcome-name').innerText = user.name;
  
  const scholarNav = document.getElementById('nav-scholar-dashboard');
  if (user.role !== 'student') scholarNav.style.display = 'flex';
  else scholarNav.style.display = 'none';

  // Update banner date
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('banner-date-text').innerText = new Date().toLocaleDateString('en-US', options);
}

// Navigation
function navigateTo(view, param = null) {
  document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

  if (!user && view !== 'auth') view = 'auth';
  if (view === 'auth' && user) view = 'home';

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
    mainLayout.style.marginLeft = '312px';
    const navItem = document.getElementById(`nav-${view}`);
    if (navItem) navItem.classList.add('active');
    updateLayoutUI();
  }

  document.getElementById(`view-${view}`).style.display = 'block';

  if (view === 'home') renderHome();
  if (view === 'profile') renderProfile();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'question') {
    currentQuestionId = param;
    renderQuestionDetail();
  }
  
  window.scrollTo(0, 0);
  lucide.createIcons();
}

// Home Rendering
function renderHome() {
  const filterContainer = document.getElementById('home-filters');
  const subjects = ['All', 'Math', 'Science', 'History', 'Literature', 'Computer Science'];
  filterContainer.innerHTML = '';
  subjects.forEach(sub => {
    const btn = document.createElement('button');
    btn.className = `btn ${currentFilter === sub ? 'btn-primary' : ''}`;
    btn.style.padding = '0.4rem 0.8rem';
    btn.style.fontSize = '0.75rem';
    btn.innerText = sub;
    btn.onclick = () => { currentFilter = sub; renderHome(); };
    filterContainer.appendChild(btn);
  });

  const filtered = questions.filter(q => {
    const matchFilter = currentFilter === 'All' || q.subject === currentFilter;
    const matchSearch = q.title.toLowerCase().includes(currentSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  const container = document.getElementById('home-questions');
  container.innerHTML = '';
  filtered.forEach(q => {
    const item = document.createElement('div');
    item.className = 'data-item card';
    item.style.cursor = 'pointer';
    item.onclick = () => navigateTo('question', q.id);
    item.innerHTML = `
      <div style="flex: 1;">
        <h4 style="margin-bottom: 0.25rem;">${escapeHTML(q.title)}</h4>
        <div class="flex gap-2">
          <span class="badge-status" style="font-size: 0.7rem;">${q.subject}</span>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${q.answers?.length || 0} answers</span>
        </div>
      </div>
      <i data-lucide="chevron-right" style="color: var(--text-muted);"></i>
    `;
    container.appendChild(item);
  });

  renderMiniLeaderboard();
  renderDashboardStats();
  lucide.createIcons();
}

function renderMiniLeaderboard() {
  const container = document.getElementById('mini-leaderboard');
  const topUsers = [
    { name: 'Nischal B.', role: 'Elite', points: 450 },
    { name: 'Sarah J.', role: 'Scholar', points: 320 },
    { name: 'Alex M.', role: 'Scholar', points: 290 }
  ];
  container.innerHTML = '';
  topUsers.forEach(u => {
    container.innerHTML += `
      <div class="flex items-center justify-between p-2">
        <div class="flex items-center gap-2">
          <div class="user-avatar-sm" style="width: 24px; height: 24px; font-size: 0.7rem;">${u.name[0]}</div>
          <span style="font-size: 0.85rem; font-weight: 600;">${u.name}</span>
        </div>
        <span style="font-size: 0.8rem; color: var(--accent-success); font-weight: 700;">${u.points}</span>
      </div>
    `;
  });
}

function renderDashboardStats() {
  if(!user) return;
  document.getElementById('dash-role-badge').innerText = user.role.replace('_', ' ');
  document.getElementById('dash-points-val').innerText = user.points;
  document.getElementById('dash-gpa-val').innerText = (user.percentage / 10).toFixed(1);
}

// Auth Logic
async function handleJoin(e) {
  e.preventDefault();
  const name = document.getElementById('auth-name').value;
  const score = parseInt(document.getElementById('auth-score').value);
  const subject = document.getElementById('auth-subject').value;

  let role = 'student';
  if (score >= 92) role = 'elite';
  else if (score >= 85) role = 'scholar';
  else if (score >= 80) role = 'junior_scholar';

  const newUser = {
    id: 'user_' + Date.now().toString(),
    name, percentage: score, role,
    subjects: subject ? [subject] : [],
    points: 50
  };

  const { error } = await supabaseClient.from('users').insert([newUser]);
  if (!error) {
    user = newUser;
    localStorage.setItem('scholarq_user', JSON.stringify(user));
    navigateTo('home');
  }
}

function logout() {
  user = null;
  localStorage.removeItem('scholarq_user');
  navigateTo('auth');
}

// Questions & Answers
async function handleAsk(e) {
  e.preventDefault();
  const title = document.getElementById('ask-title').value;
  const subject = document.getElementById('ask-subject').value;
  const body = document.getElementById('ask-body').value;
  const categorySelect = document.getElementById('ask-category');
  const cost = parseInt(categorySelect.options[categorySelect.selectedIndex].dataset.cost);
  const reward = parseInt(categorySelect.options[categorySelect.selectedIndex].dataset.reward);

  if (user.points < cost) return alert('Not enough points!');

  const newQ = {
    id: 'q_' + Date.now(),
    title, subject, body, cost, reward,
    asker_id: user.id, asker_name: user.name, status: 'open'
  };

  const { error } = await supabaseClient.from('questions').insert([newQ]);
  if (!error) {
    await updateUserPoints(user.points - cost);
    navigateTo('home');
  }
}

async function handleAnswer(e) {
  e.preventDefault();
  const body = document.getElementById('answer-body').value;
  if (!body) return;

  const newA = {
    id: 'a_' + Date.now(),
    question_id: currentQuestionId,
    body, author_id: user.id, author_name: user.name,
    author_role: user.role, upvotes: 0, is_best: false
  };

  const { error } = await supabaseClient.from('answers').insert([newA]);
  if (!error) {
    const q = questions.find(x => x.id === currentQuestionId);
    await updateUserPoints(user.points + (q.reward || 5));
    document.getElementById('answer-form').reset();
    fetchQuestionsFromDB();
  }
}

function renderQuestionDetail() {
  const q = questions.find(x => x.id === currentQuestionId);
  if (!q) return;
  
  const header = document.getElementById('qd-header');
  header.innerHTML = `
    <div class="card">
      <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">${escapeHTML(q.title)}</h2>
      <p style="margin-bottom: 1.5rem; color: var(--text-muted);">${escapeHTML(q.body)}</p>
      <div class="flex gap-4">
        <span class="badge-status">${q.subject}</span>
        <span style="color: var(--accent-success); font-weight: 700;">Reward: +${q.reward} pts</span>
      </div>
    </div>
  `;

  const container = document.getElementById('qd-answers');
  container.innerHTML = '';
  (q.answers || []).forEach(a => {
    container.innerHTML += `
      <div class="card mt-4 ${a.is_best ? 'best-answer' : ''}" style="border-left: 4px solid ${a.is_best ? 'var(--accent-success)' : 'var(--border-color)'}">
        <div class="flex justify-between items-center mb-2">
          <strong style="font-size: 0.9rem;">${escapeHTML(a.author_name)}</strong>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${a.author_role}</span>
        </div>
        <p>${escapeHTML(a.body)}</p>
      </div>
    `;
  });
}

function handleSearch(val) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = val;
    renderHome();
  }, 300);
}

// Profile & Achievements
function renderProfile() {
  if (!user) return;
  document.getElementById('profile-name').innerText = user.name;
  document.getElementById('profile-avatar-lg').innerText = user.name[0].toUpperCase();
  document.getElementById('profile-role-text').innerText = user.role.replace('_', ' ');
  
  const asked = questions.filter(q => q.asker_id === user.id);
  let answeredCount = 0;
  questions.forEach(q => {
    if (q.answers.some(a => a.author_id === user.id)) answeredCount++;
  });

  document.getElementById('profile-stat-asked').innerText = asked.length;
  document.getElementById('profile-stat-answered').innerText = answeredCount;
  renderBadges();
}

function renderBadges() {
  const container = document.getElementById('profile-badges');
  container.innerHTML = '<p style="color: var(--text-muted); font-size: 0.8rem;">Keep helping others to unlock badges!</p>';
}

async function handleUpdateScore(e) {
  e.preventDefault();
  const score = parseInt(document.getElementById('profile-new-score').value);
  let role = 'student';
  if (score >= 92) role = 'elite';
  else if (score >= 85) role = 'scholar';
  else if (score >= 80) role = 'junior_scholar';

  const { error } = await supabaseClient.from('users').update({ percentage: score, role }).eq('id', user.id);
  if (!error) {
    user.percentage = score;
    user.role = role;
    localStorage.setItem('scholarq_user', JSON.stringify(user));
    showToast('Standing Updated!', 'success');
    renderProfile();
    updateLayoutUI();
  }
}

// Leaderboard
async function renderLeaderboard() {
  const container = document.getElementById('leaderboard-container');
  container.innerHTML = '<p>Loading global ranks...</p>';
  const { data, error } = await supabaseClient.from('users').select('name, points, role').order('points', { ascending: false }).limit(20);
  if (data && !error) {
    container.innerHTML = '';
    data.forEach((u, i) => {
      container.innerHTML += `
        <div class="card flex items-center justify-between p-4 mb-2">
          <div class="flex items-center gap-4">
            <span style="font-weight: 800; width: 30px;">#${i+1}</span>
            <div class="user-avatar-sm">${u.name[0]}</div>
            <div>
              <div style="font-weight: 700;">${u.name}</div>
              <div style="font-size: 0.7rem; color: var(--text-muted);">${u.role}</div>
            </div>
          </div>
          <div style="font-weight: 800; color: var(--primary);">${u.points} pts</div>
        </div>
      `;
    });
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, tag => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[tag] || tag));
}
