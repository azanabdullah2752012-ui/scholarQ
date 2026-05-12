// Initialize Supabase
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

// State
let user = JSON.parse(localStorage.getItem('scholarq_user'));
let questions = [];
let allUsers = [];

let currentView = 'auth';
let currentQuestionId = null;
let currentSearch = '';
let currentSort = 'newest';
let currentFilter = 'All';
let searchTimeout = null;

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  
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
    await fetchAllUsers();
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

async function fetchAllUsers() {
  const { data, error } = await supabaseClient.from('users').select('name, points, role, percentage').order('points', { ascending: false });
  if (!error) {
    allUsers = data;
    if (currentView === 'home') renderMiniLeaderboard();
  }
}

async function updateUserPoints(newPoints) {
  user.points = newPoints;
  localStorage.setItem('scholarq_user', JSON.stringify(user));
  updateLayoutUI();
  await supabaseClient.from('users').update({ points: newPoints }).eq('id', user.id);
  fetchAllUsers(); // Refresh leaderboard data
}

// Realtime
function setupRealtimeSubscriptions() {
  supabaseClient.channel('scholarq_realtime')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'questions' }, () => fetchQuestionsFromDB())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'answers' }, () => fetchQuestionsFromDB())
    .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => fetchAllUsers())
    .subscribe();
}

// UI Utilities
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if(!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function updateLayoutUI() {
  if (!user) return;
  const topPoints = document.getElementById('top-points');
  if(topPoints) topPoints.innerText = `${user.points} pts`;
  
  const topUsername = document.getElementById('top-username');
  if(topUsername) topUsername.innerText = user.name;
  
  const topAvatar = document.getElementById('top-avatar');
  if(topAvatar) topAvatar.innerText = user.name[0].toUpperCase();
  
  const welcomeName = document.getElementById('welcome-name');
  if(welcomeName) welcomeName.innerText = user.name;
  
  const scholarNav = document.getElementById('nav-scholar-dashboard');
  if(scholarNav) {
    if (user.role !== 'student') scholarNav.style.display = 'flex';
    else scholarNav.style.display = 'none';
  }

  const dateText = document.getElementById('banner-date-text');
  if(dateText) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    dateText.innerText = new Date().toLocaleDateString('en-US', options);
  }
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
    if(sidebar) sidebar.style.display = 'none';
    if(topBar) topBar.style.display = 'none';
    if(mainLayout) mainLayout.style.marginLeft = '0';
  } else {
    if(sidebar) sidebar.style.display = 'flex';
    if(topBar) topBar.style.display = 'flex';
    if(mainLayout) mainLayout.style.marginLeft = '312px';
    const navItem = document.getElementById(`nav-${view}`);
    if (navItem) navItem.classList.add('active');
    updateLayoutUI();
  }

  const viewEl = document.getElementById(`view-${view}`);
  if(viewEl) viewEl.style.display = 'block';

  if (view === 'home') renderHome();
  if (view === 'profile') renderProfile();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'settings') renderSettings();
  if (view === 'ask') renderAsk();
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
  if(filterContainer) {
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
  }

  const filtered = questions.filter(q => {
    const matchFilter = currentFilter === 'All' || q.subject === currentFilter;
    const matchSearch = q.title.toLowerCase().includes(currentSearch.toLowerCase());
    return matchFilter && matchSearch;
  });

  const container = document.getElementById('home-questions');
  if(container) {
    container.innerHTML = '';
    if(filtered.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No questions found in this category.</p>';
    }
    filtered.forEach(q => {
      const item = document.createElement('div');
      item.className = 'data-item card';
      item.style.cursor = 'pointer';
      item.onclick = () => navigateTo('question', q.id);
      item.innerHTML = `
        <div style="flex: 1;">
          <h4 style="margin-bottom: 0.25rem; font-weight: 700;">${escapeHTML(q.title)}</h4>
          <div class="flex gap-4">
            <span class="badge-status" style="font-size: 0.65rem;">${q.subject}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.25rem;">
              <i data-lucide="message-square" style="width: 14px; height: 14px;"></i>
              ${q.answers?.length || 0} answers
            </span>
          </div>
        </div>
        <i data-lucide="chevron-right" style="color: var(--text-muted);"></i>
      `;
      container.appendChild(item);
    });
  }

  renderMiniLeaderboard();
  renderDashboardStats();
  lucide.createIcons();
}

function renderMiniLeaderboard() {
  const container = document.getElementById('mini-leaderboard');
  if(!container) return;
  
  const topUsers = allUsers.slice(0, 3);
  container.innerHTML = '';
  if(topUsers.length === 0) {
    container.innerHTML = '<p style="font-size: 0.8rem; color: var(--text-muted);">No scholars yet.</p>';
    return;
  }
  
  topUsers.forEach(u => {
    container.innerHTML += `
      <div class="flex items-center justify-between p-2">
        <div class="flex items-center gap-3">
          <div class="user-avatar-sm" style="width: 28px; height: 28px; font-size: 0.8rem;">${u.name[0]}</div>
          <div>
            <div style="font-size: 0.85rem; font-weight: 700;">${u.name}</div>
            <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase;">${u.role}</div>
          </div>
        </div>
        <span style="font-size: 0.85rem; color: var(--primary); font-weight: 800;">${u.points}</span>
      </div>
    `;
  });
}

function renderDashboardStats() {
  if(!user) return;
  const roleBadge = document.getElementById('dash-role-badge');
  if(roleBadge) roleBadge.innerText = user.role.replace('_', ' ');
  
  const pointsVal = document.getElementById('dash-points-val');
  if(pointsVal) pointsVal.innerText = user.points;
  
  const gpaVal = document.getElementById('dash-gpa-val');
  if(gpaVal) gpaVal.innerText = (user.percentage / 10).toFixed(1);
}

// Settings
function renderSettings() {
  const container = document.getElementById('theme-options');
  if(!container) return;
  
  container.innerHTML = `
    <div class="grid gap-8">
      <div>
        <h4 class="mb-4">Global Theme Color</h4>
        <div class="flex gap-4 items-center">
          <input type="color" id="color-picker" value="${getComputedStyle(document.documentElement).getPropertyValue('--primary').trim()}" 
                 style="width: 60px; height: 60px; border: none; cursor: pointer; border-radius: 8px;">
          <div>
            <p style="font-weight: 700;">Choose Primary Color</p>
            <p style="font-size: 0.8rem; color: var(--text-muted);">This will update all accents, buttons and the sidebar.</p>
          </div>
        </div>
      </div>
      <div class="card" style="background: #f8fafc; border: 2px dashed var(--border-color);">
        <p style="text-align: center; color: var(--text-muted);">More customization options coming soon!</p>
      </div>
    </div>
  `;
  
  document.getElementById('color-picker').oninput = (e) => {
    const hex = e.target.value;
    document.documentElement.style.setProperty('--primary', hex);
    document.documentElement.style.setProperty('--bg-sidebar', hex);
    document.documentElement.style.setProperty('--primary-hover', adjustColor(hex, -20));
  };
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

// Ask
function renderAsk() {
  const balanceEl = document.getElementById('ask-balance-points');
  if(balanceEl) balanceEl.innerText = `${user.points} pts`;
  
  const categorySelect = document.getElementById('ask-category');
  if(categorySelect) {
    categorySelect.onchange = () => {
      const option = categorySelect.options[categorySelect.selectedIndex];
      const cost = option.dataset.cost;
      const costDisplay = categorySelect.closest('form').querySelector('strong');
      if(costDisplay) costDisplay.innerText = `-${cost} pts`;
    };
  }
}
async function handleAsk(e) {
  e.preventDefault();
  const title = document.getElementById('ask-title').value;
  const subject = document.getElementById('ask-subject').value;
  const body = document.getElementById('ask-body').value;
  const categorySelect = document.getElementById('ask-category');
  const cost = parseInt(categorySelect.options[categorySelect.selectedIndex].dataset.cost);
  const reward = parseInt(categorySelect.options[categorySelect.selectedIndex].dataset.reward);

  if (user.points < cost) return showToast('Not enough points!', 'error');

  const newQ = {
    id: 'q_' + Date.now(),
    title, subject, body, cost, reward,
    asker_id: user.id, asker_name: user.name, status: 'open',
    created_at: new Date().toISOString()
  };

  const { error } = await supabaseClient.from('questions').insert([newQ]);
  if (!error) {
    await updateUserPoints(user.points - cost);
    document.getElementById('ask-form').reset();
    showToast('Question Posted!', 'success');
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
    author_role: user.role, upvotes: 0, is_best: false,
    created_at: new Date().toISOString()
  };

  const { error } = await supabaseClient.from('answers').insert([newA]);
  if (!error) {
    const q = questions.find(x => x.id === currentQuestionId);
    await updateUserPoints(user.points + (q.reward || 5));
    document.getElementById('answer-form').reset();
    showToast('Answer Submitted!', 'success');
    fetchQuestionsFromDB();
  }
}

function renderQuestionDetail() {
  const q = questions.find(x => x.id === currentQuestionId);
  if (!q) return;
  
  const header = document.getElementById('qd-header');
  header.innerHTML = `
    <div class="card" style="padding: 2.5rem;">
      <div class="flex justify-between items-start mb-6">
        <div>
          <span class="badge-status" style="margin-bottom: 0.5rem; display: inline-block;">${q.subject}</span>
          <h2 style="font-size: 2rem; font-weight: 800; line-height: 1.2;">${escapeHTML(q.title)}</h2>
        </div>
        <div style="text-align: right;">
          <div style="color: var(--accent-success); font-weight: 800; font-size: 1.2rem;">+${q.reward} pts</div>
          <div style="font-size: 0.8rem; color: var(--text-muted);">Reward</div>
        </div>
      </div>
      <p style="font-size: 1.1rem; line-height: 1.7; color: var(--text-main); white-space: pre-wrap; margin-bottom: 2rem; padding: 1.5rem; background: #f8fafc; border-radius: var(--radius-md); border-left: 4px solid var(--primary);">${escapeHTML(q.body)}</p>
      <div class="flex items-center gap-3">
        <div class="user-avatar-sm">${q.asker_name[0]}</div>
        <div style="font-size: 0.9rem;">Asked by <strong>${escapeHTML(q.asker_name)}</strong></div>
      </div>
    </div>
  `;

  const container = document.getElementById('qd-answers');
  container.innerHTML = `<h3 class="mt-8 mb-4">${q.answers?.length || 0} Answers</h3>`;
  
  if(q.answers?.length === 0) {
    container.innerHTML += '<p style="color: var(--text-muted);">No answers yet. Be the first to help!</p>';
  }

  (q.answers || []).forEach(a => {
    container.innerHTML += `
      <div class="card mt-4 ${a.is_best ? 'best-answer' : ''}" style="border-left: 4px solid ${a.is_best ? 'var(--accent-success)' : 'var(--border-color)'}">
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-3">
            <div class="user-avatar-sm" style="background: #e2e8f0; color: var(--text-main);">${a.author_name[0]}</div>
            <div>
              <strong style="font-size: 0.95rem;">${escapeHTML(a.author_name)}</strong>
              <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${a.author_role}</div>
            </div>
          </div>
          ${a.is_best ? '<span class="badge-status" style="background: var(--accent-success); color: white;">Best Answer</span>' : ''}
        </div>
        <p style="font-size: 1rem; line-height: 1.6;">${escapeHTML(a.body)}</p>
      </div>
    `;
  });

  const formCont = document.getElementById('qd-answer-form-container');
  if(formCont) {
    if (q.status === 'resolved' || q.asker_id === user.id) formCont.style.display = 'none';
    else formCont.style.display = 'block';
  }
}

function handleSearch(val) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = val;
    renderHome();
  }, 300);
}

// Profile
function renderProfile() {
  if (!user) return;
  document.getElementById('profile-name').innerText = user.name;
  document.getElementById('profile-avatar-lg').innerText = user.name[0].toUpperCase();
  document.getElementById('profile-role-text').innerText = user.role.replace('_', ' ');
  
  const asked = questions.filter(q => q.asker_id === user.id);
  const answeredCount = questions.filter(q => q.answers.some(a => a.author_id === user.id)).length;

  document.getElementById('profile-stat-asked').innerText = asked.length;
  document.getElementById('profile-stat-answered').innerText = answeredCount;
  renderBadges(asked, answeredCount);
}

function renderBadges(asked, answeredCount) {
  const container = document.getElementById('profile-badges');
  if(!container) return;
  
  const badges = [
    { name: 'Pioneer', icon: 'flag', earned: true },
    { name: 'Helper', icon: 'heart', earned: answeredCount >= 1 },
    { name: 'Brainiac', icon: 'zap', earned: user.points >= 100 },
    { name: 'Inquisitor', icon: 'help-circle', earned: asked.length >= 3 }
  ];
  
  container.innerHTML = '';
  badges.forEach(b => {
    container.innerHTML += `
      <div class="card flex flex-direction-column items-center gap-2" style="width: 100px; opacity: ${b.earned ? '1' : '0.3'};">
        <i data-lucide="${b.icon}" style="color: var(--primary);"></i>
        <span style="font-size: 0.7rem; font-weight: 700;">${b.name}</span>
      </div>
    `;
  });
  lucide.createIcons();
}

async function renderLeaderboard() {
  const container = document.getElementById('leaderboard-container');
  if(!container) return;
  container.innerHTML = '<div class="card"><p>Loading scholars...</p></div>';
  
  const { data, error } = await supabaseClient.from('users').select('name, points, role').order('points', { ascending: false }).limit(20);
  if (data && !error) {
    container.innerHTML = '';
    data.forEach((u, i) => {
      container.innerHTML += `
        <div class="card flex items-center justify-between p-4 mb-3">
          <div class="flex items-center gap-4">
            <span style="font-weight: 900; color: var(--text-muted); width: 25px;">${i+1}</span>
            <div class="user-avatar-sm" style="width: 40px; height: 40px;">${u.name[0]}</div>
            <div>
              <div style="font-weight: 800;">${u.name}</div>
              <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${u.role}</div>
            </div>
          </div>
          <div style="font-weight: 900; color: var(--primary); font-size: 1.1rem;">${u.points} <span style="font-size: 0.7rem; font-weight: 500; color: var(--text-muted);">pts</span></div>
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

function adjustColor(hex, amt) {
  let usePound = false;
  if (hex[0] == "#") { hex = hex.slice(1); usePound = true; }
  let num = parseInt(hex, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255; else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255; else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255; else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}
