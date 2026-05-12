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
let searchTimeout = null;

// Theme State
const defaultTheme = {
  primary: '#6366f1',
  primaryHover: '#4f46e5',
  glow: 'rgba(99, 102, 241, 0.3)'
};
let currentTheme = JSON.parse(localStorage.getItem('scholarq_theme')) || defaultTheme;

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  applyTheme(currentTheme);
  lucide.createIcons();
  
  document.getElementById('auth-score').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    const subjectGroup = document.getElementById('auth-subject-group');
    const subjectSelect = document.getElementById('auth-subject');
    if (val >= 80) {
      subjectGroup.style.display = 'flex';
      subjectSelect.required = true;
    } else {
      subjectGroup.style.display = 'none';
      subjectSelect.required = false;
    }
  });

  document.getElementById('auth-form').addEventListener('submit', handleJoin);
  document.getElementById('ask-form').addEventListener('submit', handleAsk);
  document.getElementById('answer-form').addEventListener('submit', handleAnswer);

  if (user) {
    // Refresh user points from DB
    await fetchUserFromDB();
    await fetchQuestionsFromDB();
    setupRealtimeSubscriptions(); // Start listening for updates
    navigateTo('home');
  } else {
    navigateTo('auth');
  }
});

async function fetchUserFromDB() {
  if (!user) return;
  const { data, error } = await supabaseClient
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
  
  if (data && !error) {
    user = data;
    localStorage.setItem('scholarq_user', JSON.stringify(user));
    updateNavbar();
  }
}

async function fetchQuestionsFromDB() {
  const { data: qData, error: qError } = await supabaseClient
    .from('questions')
    .select('*')
    .order('created_at', { ascending: false });

  if (qError) {
    console.error('Error fetching questions:', qError);
    return;
  }

  const { data: aData, error: aError } = await supabaseClient
    .from('answers')
    .select('*')
    .order('created_at', { ascending: true });

  if (aError) {
    console.error('Error fetching answers:', aError);
    return;
  }

  // Combine answers into questions
  questions = qData.map(q => {
    return {
      ...q,
      answers: aData.filter(a => a.question_id === q.id)
    };
  });

  if (currentView === 'home') renderHome();
  if (currentView === 'dashboard') renderDashboard();
  if (currentView === 'question') renderQuestionDetail();
}

async function updateUserPoints(newPoints) {
  user.points = newPoints;
  localStorage.setItem('scholarq_user', JSON.stringify(user));
  updateNavbar();
  
  await supabaseClient
    .from('users')
    .update({ points: newPoints })
    .eq('id', user.id);
}

// Theme Management
function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-hover', theme.primaryHover);
  root.style.setProperty('--shadow-glow', theme.glow);
  
  currentTheme = theme;
  localStorage.setItem('scholarq_theme', JSON.stringify(theme));

  // Update Settings UI if it exists
  const picker = document.getElementById('custom-color-picker');
  const label = document.getElementById('current-hex-label');
  if (picker) picker.value = theme.primary;
  if (label) label.innerText = theme.primary.toUpperCase();
}

function updateCustomColor(hex) {
  const hover = adjustColor(hex, -20); // Darken by 20
  const glow = hexToRgba(hex, 0.3);
  
  const newTheme = {
    primary: hex,
    primaryHover: hover,
    glow: glow
  };
  applyTheme(newTheme);
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function adjustColor(hex, amt) {
  let usePound = false;
  if (hex[0] == "#") {
    hex = hex.slice(1);
    usePound = true;
  }
  let num = parseInt(hex, 16);
  let r = (num >> 16) + amt;
  if (r > 255) r = 255; else if (r < 0) r = 0;
  let b = ((num >> 8) & 0x00FF) + amt;
  if (b > 255) b = 255; else if (b < 0) b = 0;
  let g = (num & 0x0000FF) + amt;
  if (g > 255) g = 255; else if (g < 0) g = 0;
  return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16).padStart(6, '0');
}

// Realtime Subscriptions
function setupRealtimeSubscriptions() {
  // Listen for ALL changes on questions and answers
  supabaseClient
    .channel('scholarq_realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'questions' },
      (payload) => {
        console.log('Realtime change in questions:', payload);
        if (payload.eventType === 'INSERT') {
          showToast(`New Question: "${payload.new.title.substring(0, 30)}..."`, 'info');
        }
        fetchQuestionsFromDB(); // Refresh local state
      }
    )
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'answers' },
      (payload) => {
        console.log('Realtime change in answers:', payload);
        if (payload.eventType === 'INSERT') {
          showToast(`New Answer added to a question!`, 'success');
        }
        fetchQuestionsFromDB(); // Refresh local state
      }
    )
    .subscribe();
}

// UI Utilities
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'check-circle' : 'bell';
  
  toast.innerHTML = `
    <i data-lucide="${icon}" style="width: 18px; height: 18px;"></i>
    <span>${message}</span>
  `;
  
  container.appendChild(toast);
  lucide.createIcons();
  
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Profile
function renderProfile() {
  if (!user) return;
  
  // Update Header
  document.getElementById('profile-name').innerText = user.name;
  document.getElementById('profile-initial').innerText = user.name[0].toUpperCase();
  document.getElementById('profile-role-badge').innerText = user.role.replace('_', ' ');
  document.getElementById('profile-points').innerText = user.points;

  // Calculate Stats
  const asked = questions.filter(q => q.asker_id === user.id);
  const answered = [];
  let bestCount = 0;

  questions.forEach(q => {
    (q.answers || []).forEach(a => {
      if (a.author_id === user.id) {
        answered.push(a);
        if (a.is_best) bestCount++;
      }
    });
  });

  document.getElementById('profile-stat-asked').innerText = asked.length;
  document.getElementById('profile-stat-answered').innerText = answered.length;
  document.getElementById('profile-stat-best').innerText = bestCount;

  // Render Badges
  renderBadges(asked, answered, bestCount);
}

function renderBadges(asked, answered, bestCount) {
  const container = document.getElementById('profile-badges');
  container.innerHTML = '';

  const badges = [
    { id: 'pioneer', name: 'Pioneer', icon: 'flag', description: 'Joined ScholarQ', earned: true, color: '#6366f1' },
    { id: 'helpful', name: 'Helpful Soul', icon: 'heart', description: 'Answered 5+ questions', earned: answered.length >= 5, color: '#10b981' },
    { id: 'expert', name: 'Subject Expert', icon: 'award', description: 'Got 3 Best Answers', earned: bestCount >= 3, color: '#f59e0b' },
    { id: 'curious', name: 'Curious Mind', icon: 'help-circle', description: 'Asked 5+ questions', earned: asked.length >= 5, color: '#f43f5e' },
    { id: 'elite', name: 'Scholar Elite', icon: 'zap', description: 'Reached 500+ points', earned: user.points >= 500, color: '#8b5cf6' }
  ];

  badges.forEach(b => {
    const badge = document.createElement('div');
    badge.className = `card flex items-center gap-4 ${!b.earned ? 'locked-badge' : ''}`;
    badge.style.padding = '0.75rem 1rem';
    badge.style.opacity = b.earned ? '1' : '0.4';
    badge.style.borderLeft = `4px solid ${b.earned ? b.color : 'var(--text-muted)'}`;
    badge.title = b.description;

    badge.innerHTML = `
      <i data-lucide="${b.icon}" style="width: 24px; height: 24px; color: ${b.earned ? b.color : 'inherit'};"></i>
      <div>
        <h4 style="margin: 0; font-size: 0.9rem;">${b.name}</h4>
        <p style="margin: 0; font-size: 0.75rem; color: var(--text-muted);">${b.earned ? 'Earned' : 'Locked'}</p>
      </div>
    `;
    container.appendChild(badge);
  });
  lucide.createIcons();
}

async function handleUpdateScore(e) {
  e.preventDefault();
  const newScore = parseInt(document.getElementById('profile-new-score').value);
  if (isNaN(newScore) || newScore < 0 || newScore > 100) return;

  const btn = e.target.querySelector('button');
  btn.disabled = true;
  btn.innerText = 'Updating...';

  let newRole = 'student';
  if (newScore >= 92) newRole = 'elite';
  else if (newScore >= 85) newRole = 'scholar';
  else if (newScore >= 80) newRole = 'junior_scholar';

  const updates = { 
    percentage: newScore, 
    role: newRole 
  };

  const { error } = await supabaseClient
    .from('users')
    .update(updates)
    .eq('id', user.id);

  if (!error) {
    user = { ...user, ...updates };
    localStorage.setItem('scholarq_user', JSON.stringify(user));
    showToast(`Score updated! You are now a ${newRole.replace('_', ' ')}`, 'success');
    renderProfile();
    updateNavbar();
  } else {
    showToast('Failed to update score', 'error');
  }

  btn.disabled = false;
  btn.innerText = 'Update Score';
}

// Navigation
function navigateTo(view, param = null) {
  document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
  
  if (!user && view !== 'auth') {
    view = 'auth';
  }

  if (view === 'auth' && user) {
    view = 'home';
  }

  currentView = view;
  document.getElementById(`view-${view}`).style.display = 'block';

  const navbar = document.getElementById('navbar');
  if (user) {
    navbar.style.display = 'flex';
    updateNavbar();
    if(view === 'home' || view === 'dashboard' || view === 'question') {
      fetchQuestionsFromDB(); // Refresh data when navigating to data-heavy pages
    }
  } else {
    navbar.style.display = 'none';
  }

  if (view === 'home') renderHome();
  if (view === 'ask') renderAsk();
  if (view === 'dashboard') renderDashboard();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'settings') {
    // Initial UI state for settings
    const label = document.getElementById('current-hex-label');
    const picker = document.getElementById('custom-color-picker');
    if (label) label.innerText = currentTheme.primary.toUpperCase();
    if (picker) picker.value = currentTheme.primary;
  }
  if (view === 'profile') renderProfile();
  if (view === 'question') {
    currentQuestionId = param;
    renderQuestionDetail();
  }
  
  lucide.createIcons();
}

function updateNavbar() {
  if (!user) return;
  document.getElementById('nav-points').innerText = user.points;
  document.getElementById('nav-username').innerText = `${user.name} (${user.role.replace('_', ' ')})`;
  
  const dashLink = document.getElementById('nav-dashboard-link');
  if (user.role === 'scholar' || user.role === 'elite' || user.role === 'junior_scholar') {
    dashLink.style.display = 'flex';
  } else {
    dashLink.style.display = 'none';
  }
}

// Auth
async function handleJoin(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerText = 'Joining...';

  const name = document.getElementById('auth-name').value;
  const score = parseInt(document.getElementById('auth-score').value);
  const subject = document.getElementById('auth-subject').value;

  let role = 'student';
  let userSubject = subject;

  if (score >= 92) role = 'elite';
  else if (score >= 85) role = 'scholar';
  else if (score >= 80) role = 'junior_scholar';

  if (score < 80) userSubject = '';

  const newUser = {
    id: 'user_' + Date.now().toString(),
    name,
    percentage: score,
    role,
    subjects: userSubject ? [userSubject] : [],
    points: 50
  };

  const { error } = await supabaseClient.from('users').insert([newUser]);

  btn.disabled = false;
  btn.innerText = 'Enter Ecosystem';

  if (error) {
    alert("Error joining: " + error.message);
    return;
  }

  user = newUser;
  localStorage.setItem('scholarq_user', JSON.stringify(user));
  
  await fetchQuestionsFromDB();
  navigateTo('home');
}

function logout() {
  user = null;
  localStorage.removeItem('scholarq_user');
  navigateTo('auth');
}

// Home
let currentFilter = 'All';

function renderHomeFilters() {
  const subjects = ['All', 'Math', 'Science', 'History', 'Literature', 'Computer Science'];
  const filterContainer = document.getElementById('home-filters');
  if (!filterContainer) return;
  filterContainer.innerHTML = '';
  
  subjects.forEach(sub => {
    const btn = document.createElement('button');
    btn.className = `btn ${currentFilter === sub ? 'btn-primary' : 'btn-secondary'}`;
    btn.style.padding = '0.5rem 1rem';
    btn.style.fontSize = '0.875rem';
    btn.innerText = sub;
    btn.onclick = () => { currentFilter = sub; renderHome(); };
    filterContainer.appendChild(btn);
  });
}

function renderHome() {
  renderHomeFilters();
  
  const filtered = getFilteredQuestions();
  const qContainer = document.getElementById('home-questions');
  qContainer.innerHTML = '';

  if (filtered.length === 0) {
    qContainer.innerHTML = '<div class="text-center mt-8" style="grid-column: 1/-1; color: var(--text-muted);"><p>No questions found for this subject.</p></div>';
    return;
  }

  filtered.forEach(q => {
    const card = document.createElement('a');
    card.href = "#";
    card.className = "card";
    card.onclick = (e) => { e.preventDefault(); navigateTo('question', q.id); };
    
    card.innerHTML = `
      <div class="card-header">
        <h3 class="card-title">${escapeHTML(q.title)}</h3>
        ${q.status === 'resolved' ? '<span class="badge badge-success" style="background: var(--accent-success); color: white;">Resolved</span>' : ''}
      </div>
      <p class="card-body">${escapeHTML(q.body.length > 100 ? q.body.substring(0, 100) + '...' : q.body)}</p>
      <div class="card-footer">
        <span class="badge badge-subject">
          <i data-lucide="tag" style="width: 12px; height: 12px; margin-right: 0.25rem;"></i>
          ${q.subject}
        </span>
        <span class="badge" style="background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2); font-size: 0.75rem;">
          ${q.category || 'Doubt Solving'}
        </span>
        <div class="flex gap-4" style="color: var(--text-muted); font-size: 0.875rem;">
          <span class="flex items-center gap-2"><i data-lucide="message-square" style="width:16px; height:16px;"></i> ${q.answers?.length || 0}</span>
        </div>
      </div>
    `;
    qContainer.appendChild(card);
  });
  lucide.createIcons();
}

function getFilteredQuestions() {
  let filtered = [...questions];

  // Apply Subject Filter
  if (currentFilter !== 'All') {
    filtered = filtered.filter(q => q.subject === currentFilter);
  }

  // Apply Search Filter
  if (currentSearch) {
    const term = currentSearch.toLowerCase();
    filtered = filtered.filter(q => 
      q.title.toLowerCase().includes(term) || 
      q.body.toLowerCase().includes(term) ||
      q.subject.toLowerCase().includes(term)
    );
  }

  // Apply Sorting
  filtered.sort((a, b) => {
    if (currentSort === 'newest') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (currentSort === 'reward') {
      return (b.reward || 0) - (a.reward || 0);
    } else if (currentSort === 'answers') {
      return (b.answers?.length || 0) - (a.answers?.length || 0);
    }
    return 0;
  });

  return filtered;
}

function handleSearch(val) {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearch = val;
    renderHome();
  }, 300); // 300ms debounce
}

function handleSort(val) {
  currentSort = val;
  renderHome();
}

// Ask
function renderAsk() {
  document.getElementById('ask-points').innerText = user.points;
  updateAskCost();
}

function updateAskCost() {
  const select = document.getElementById('ask-category');
  const option = select.options[select.selectedIndex];
  const cost = option.getAttribute('data-cost');
  document.getElementById('ask-submit-btn').innerText = `Post Question (-${cost} pts)`;
}

async function handleAsk(e) {
  e.preventDefault();
  
  const categorySelect = document.getElementById('ask-category');
  const option = categorySelect.options[categorySelect.selectedIndex];
  const cost = parseInt(option.getAttribute('data-cost'));
  const reward = parseInt(option.getAttribute('data-reward'));
  const category = categorySelect.value;

  if (user.points < cost) {
    alert(`Not enough points! You need at least ${cost} points for this category.`);
    return;
  }

  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerText = 'Posting...';

  const title = document.getElementById('ask-title').value;
  const subject = document.getElementById('ask-subject').value;
  const body = document.getElementById('ask-body').value;

  const newQuestion = {
    id: 'q_' + Date.now().toString(),
    title, body, subject,
    category, cost, reward,
    asker_id: user.id,
    asker_name: user.name,
    status: 'open'
  };

  try {
    const { error } = await supabaseClient.from('questions').insert([newQuestion]);

    if (!error) {
      await updateUserPoints(user.points - cost);
      document.getElementById('ask-form').reset();
      updateAskCost();
      await fetchQuestionsFromDB();
      navigateTo('home');
    } else {
      alert("Failed to post question: " + error.message);
    }
  } catch (err) {
    alert("Unexpected error: " + err.message);
    console.error("Ask Error:", err);
  } finally {
    btn.disabled = false;
    btn.innerText = `Post Question (-${cost} pts)`;
  }
}

// Dashboard
function renderDashboard() {
  if (user.role === 'student') return;

  document.getElementById('dash-role').innerText = user.role.replace('_', ' ');
  document.getElementById('dash-points').innerText = user.points;
  
  const specContainer = document.getElementById('dash-specialties');
  specContainer.innerHTML = '';
  (user.subjects || []).forEach(s => {
    specContainer.innerHTML += `<span class="badge badge-subject">${s}</span>`;
  });

  const relevantQuestions = questions.filter(q => (user.subjects || []).includes(q.subject));
  const newQs = relevantQuestions.filter(q => q.status === 'open');
  const resQs = relevantQuestions.filter(q => q.status === 'resolved');

  const newCont = document.getElementById('dash-new-questions');
  const resCont = document.getElementById('dash-resolved-questions');
  
  newCont.innerHTML = '';
  resCont.innerHTML = '';

  if (newQs.length === 0) {
    newCont.innerHTML = `
      <div class="card mb-8 text-center" style="padding: 3rem 1rem; grid-column: 1/-1;">
        <i data-lucide="check-circle" style="width:48px; height:48px; color: var(--accent-success); margin: 0 auto 1rem; opacity: 0.5;"></i>
        <p style="color: var(--text-muted);">You're all caught up! No new questions.</p>
      </div>
    `;
  } else {
    newQs.forEach(q => newCont.appendChild(createDashCard(q, 'Open')));
  }

  resQs.forEach(q => {
    const c = createDashCard(q, 'Resolved');
    c.style.opacity = '0.7';
    resCont.appendChild(c);
  });
  
  lucide.createIcons();
}

function createDashCard(q, statusLabel) {
  const card = document.createElement('a');
  card.href = "#";
  card.className = "card";
  card.onclick = (e) => { e.preventDefault(); navigateTo('question', q.id); };
  
  const statusStyle = statusLabel === 'Open' ? 'badge-status' : 'badge-success';
  const statusColor = statusLabel === 'Resolved' ? 'background: rgba(16, 185, 129, 0.1); color: var(--accent-success);' : '';

  card.innerHTML = `
    <h3 class="card-title">${escapeHTML(q.title)}</h3>
    <div class="card-footer mt-4">
      <span class="badge badge-subject">
        <i data-lucide="tag" style="width: 12px; height: 12px; margin-right: 0.25rem;"></i>
        ${q.subject}
      </span>
      <span class="badge ${statusStyle}" style="${statusColor}">${statusLabel}</span>
    </div>
  `;
  return card;
}

// Question Detail
function renderQuestionDetail() {
  const q = questions.find(x => x.id === currentQuestionId);
  if (!q) {
    document.getElementById('qd-header').innerHTML = "<p>Question not found.</p>";
    document.getElementById('qd-answer-form-container').style.display = 'none';
    return;
  }

  const header = document.getElementById('qd-header');
  header.className = "card mb-8";
  header.innerHTML = `
    <div class="flex justify-between items-start mb-4">
      <h1 class="page-title" style="font-size: 1.75rem; margin-bottom: 0;">${escapeHTML(q.title)}</h1>
      ${q.status === 'resolved' ? `<span class="badge badge-success flex items-center gap-2" style="background: rgba(16, 185, 129, 0.1); color: var(--accent-success); padding: 0.5rem 1rem;"><i data-lucide="check-circle" style="width:16px;height:16px;"></i> Resolved</span>` : ''}
    </div>
    <div class="flex items-center gap-4 mb-6 pb-6" style="border-bottom: 1px solid var(--border-color); color: var(--text-muted); flex-wrap: wrap;">
      <span class="badge badge-subject">
        <i data-lucide="tag" style="width: 12px; height: 12px; margin-right: 0.25rem;"></i>
        ${q.subject}
      </span>
      <span class="badge" style="background: rgba(139, 92, 246, 0.1); color: #a78bfa; border: 1px solid rgba(139, 92, 246, 0.2);">
        ${q.category || 'Doubt Solving'}
      </span>
      <span>Asked by <strong style="color: var(--text-main);">${escapeHTML(q.asker_name)}</strong></span>
      <span class="badge" style="margin-left: auto; background: rgba(16, 185, 129, 0.1); color: var(--accent-success);">Reward: +${q.reward || 5} pts</span>
    </div>
    <p style="white-space: pre-wrap; line-height: 1.6; font-size: 1.125rem;">${escapeHTML(q.body)}</p>
  `;

  document.getElementById('qd-answer-count').innerText = q.answers?.length || 0;
  
  const aContainer = document.getElementById('qd-answers');
  aContainer.innerHTML = '';
  
  (q.answers || []).forEach(ans => {
    const aCard = document.createElement('div');
    aCard.className = `answer-card ${ans.is_best ? 'best-answer' : ''}`;
    
    let markBestBtn = '';
    if (user.id === q.asker_id && !q.best_answer_id) {
      markBestBtn = `<button class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem; margin-left: auto;" onclick="markBest('${ans.id}')"><i data-lucide="award" style="width:14px;height:14px;"></i> Mark as Best</button>`;
    }

    const canUpvote = ans.author_id !== user.id;

    aCard.innerHTML = `
      ${ans.is_best ? `<div class="best-answer-badge"><i data-lucide="award" style="width:14px;height:14px;"></i> Best Answer</div>` : ''}
      <div class="answer-header">
        <span class="flex items-center gap-2">
          <i data-lucide="user" style="width:14px;height:14px;"></i> 
          <strong style="color: var(--text-main);">${escapeHTML(ans.author_name)}</strong> 
          <span class="badge" style="font-size: 0.7rem; padding: 0.1rem 0.5rem; background: var(--bg-color);">${ans.author_role.replace('_', ' ')}</span>
        </span>
      </div>
      <p class="answer-body" style="white-space: pre-wrap;">${escapeHTML(ans.body)}</p>
      <div class="answer-footer">
        <button class="vote-btn" onclick="upvote('${ans.id}')" ${!canUpvote ? 'disabled' : ''}>
          <i data-lucide="thumbs-up" style="width:16px;height:16px; color:${ans.upvotes > 0 ? 'var(--accent-success)' : 'currentColor'};"></i> 
          <span style="color: ${ans.upvotes > 0 ? 'var(--accent-success)' : 'inherit'}">${ans.upvotes || 0} Upvotes</span>
        </button>
        ${markBestBtn}
      </div>
    `;
    aContainer.appendChild(aCard);
  });

  const formCont = document.getElementById('qd-answer-form-container');
  
  // Update answer prompt dynamic reward text
  const answerPrompt = formCont.querySelector('p');
  if(answerPrompt) {
    answerPrompt.innerHTML = `Earn <strong>+${q.reward || 5} points</strong> for answering, and a bonus if marked as Best Answer.`;
  }

  if (q.status === 'resolved' || q.asker_id === user.id) {
    formCont.style.display = 'none';
  } else {
    formCont.style.display = 'block';
  }

  lucide.createIcons();
}

async function handleAnswer(e) {
  e.preventDefault();
  const body = document.getElementById('answer-body').value;
  if (!body) return;

  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.innerText = 'Submitting...';

  const newAnswer = {
    id: 'a_' + Date.now().toString(),
    question_id: currentQuestionId,
    body,
    author_id: user.id,
    author_name: user.name,
    author_role: user.role,
    upvotes: 0,
    is_best: false
  };

    const q = questions.find(x => x.id === currentQuestionId);
    let reward = q?.reward || 5;
    await updateUserPoints(user.points + reward);
    document.getElementById('answer-form').reset();
    await fetchQuestionsFromDB();
  } else {
    alert("Failed to post answer: " + error.message);
  }

  btn.disabled = false;
  btn.innerText = 'Submit Answer';
}

async function upvote(ansId) {
  const q = questions.find(x => x.id === currentQuestionId);
  const ans = q.answers.find(x => x.id === ansId);
  if (ans.author_id === user.id) {
    alert("You cannot upvote your own answer!");
    return;
  }

  const newUpvotes = (ans.upvotes || 0) + 1;
  ans.upvotes = newUpvotes; // Optimistic update
  renderQuestionDetail();

  await supabaseClient
    .from('answers')
    .update({ upvotes: newUpvotes })
    .eq('id', ansId);
}

async function markBest(ansId) {
  const q = questions.find(x => x.id === currentQuestionId);
  const ans = q.answers.find(x => x.id === ansId);
  
  q.status = 'resolved';
  q.best_answer_id = ansId;
  ans.is_best = true;
  renderQuestionDetail(); // Optimistic update

  // Reward asker +2 points
  await updateUserPoints(user.points + 2);

  // Update question
  await supabaseClient
    .from('questions')
    .update({ status: 'resolved', best_answer_id: ansId })
    .eq('id', currentQuestionId);

  // Update answer
  await supabaseClient
    .from('answers')
    .update({ is_best: true })
    .eq('id', ansId);
    
  // Note: we should theoretically reward the scholar +10 points here, 
  // but since we don't have server-side functions set up, we'd have to 
  // fetch that user and update them. For MVP we skip updating the offline scholar's points.
}

// Leaderboard
async function renderLeaderboard() {
  const container = document.getElementById('leaderboard-container');
  container.innerHTML = '<p style="text-align: center; color: var(--text-muted);">Loading ranks...</p>';

  const { data, error } = await supabaseClient
    .from('users')
    .select('name, points, role')
    .order('points', { ascending: false })
    .limit(10);

  if (error || !data) {
    container.innerHTML = `<p style="color: red;">Error loading leaderboard: ${error?.message}</p>`;
    return;
  }

  container.innerHTML = '';
  data.forEach((u, index) => {
    let rankMedal = `#${index + 1}`;
    if (index === 0) rankMedal = '🥇';
    if (index === 1) rankMedal = '🥈';
    if (index === 2) rankMedal = '🥉';

    const item = document.createElement('div');
    item.className = 'card flex items-center justify-between';
    item.style.padding = '1rem 1.5rem';
    
    item.innerHTML = `
      <div class="flex items-center gap-4">
        <span style="font-size: 1.5rem; font-weight: bold; width: 40px; text-align: center;">${rankMedal}</span>
        <div>
          <h4 style="margin: 0; font-size: 1.125rem;">${escapeHTML(u.name)}</h4>
          <span class="badge" style="font-size: 0.7rem; padding: 0.1rem 0.5rem; background: var(--bg-color); margin-top: 0.25rem; display: inline-block;">${u.role.replace('_', ' ')}</span>
        </div>
      </div>
      <div style="text-align: right;">
        <span style="font-size: 1.25rem; font-weight: bold; color: var(--accent-success);">${u.points}</span>
        <span style="font-size: 0.875rem; color: var(--text-muted);">pts</span>
      </div>
    `;
    container.appendChild(item);
  });
}

// Utilities
function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
