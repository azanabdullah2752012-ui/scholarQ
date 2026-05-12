// State
let user = JSON.parse(localStorage.getItem('scholarq_user'));
let questions = JSON.parse(localStorage.getItem('scholarq_questions')) || [
  {
    id: 'q1',
    title: 'How to solve quadratic equations?',
    body: 'I am struggling with the equation x² + 5x + 6 = 0. Can someone explain the steps?',
    subject: 'Math',
    askerId: 'mock-user-1',
    askerName: 'Alice',
    status: 'open',
    answers: []
  },
  {
    id: 'q2',
    title: 'What is Newton\'s second law?',
    body: 'Can you explain it with an example?',
    subject: 'Science',
    askerId: 'mock-user-2',
    askerName: 'Bob',
    status: 'resolved',
    bestAnswerId: 'a1',
    answers: [
      {
        id: 'a1',
        body: 'Newton\'s second law states that Force = mass × acceleration (F = ma). For example, if you push a 10kg cart with an acceleration of 2m/s², you are applying a force of 20 Newtons.',
        authorId: 'mock-scholar-1',
        authorName: 'Dr. Smith',
        authorRole: 'scholar',
        upvotes: 5,
        isBest: true
      }
    ]
  }
];

let currentView = 'auth';
let currentQuestionId = null;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
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
    navigateTo('home');
  } else {
    navigateTo('auth');
  }
});

function saveState() {
  if (user) localStorage.setItem('scholarq_user', JSON.stringify(user));
  else localStorage.removeItem('scholarq_user');
  localStorage.setItem('scholarq_questions', JSON.stringify(questions));
  updateNavbar();
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
  } else {
    navbar.style.display = 'none';
  }

  if (view === 'home') renderHome();
  if (view === 'ask') renderAsk();
  if (view === 'dashboard') renderDashboard();
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
function handleJoin(e) {
  e.preventDefault();
  const name = document.getElementById('auth-name').value;
  const score = parseInt(document.getElementById('auth-score').value);
  const subject = document.getElementById('auth-subject').value;

  let role = 'student';
  let userSubject = subject;

  if (score >= 92) role = 'elite';
  else if (score >= 85) role = 'scholar';
  else if (score >= 80) role = 'junior_scholar';

  if (score < 80) userSubject = '';

  user = {
    id: Date.now().toString(),
    name,
    percentage: score,
    role,
    subjects: userSubject ? [userSubject] : [],
    points: 50
  };

  saveState();
  navigateTo('home');
}

function logout() {
  user = null;
  saveState();
  navigateTo('auth');
}

// Home
let currentFilter = 'All';
function renderHome() {
  const subjects = ['All', 'Math', 'Science', 'History', 'Literature', 'Computer Science'];
  const filterContainer = document.getElementById('home-filters');
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

  const filtered = currentFilter === 'All' ? questions : questions.filter(q => q.subject === currentFilter);
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
        <div class="flex gap-4" style="color: var(--text-muted); font-size: 0.875rem;">
          <span class="flex items-center gap-2"><i data-lucide="message-square" style="width:16px; height:16px;"></i> ${q.answers?.length || 0}</span>
        </div>
      </div>
    `;
    qContainer.appendChild(card);
  });
  lucide.createIcons();
}

// Ask
function renderAsk() {
  document.getElementById('ask-points').innerText = user.points;
}

function handleAsk(e) {
  e.preventDefault();
  if (user.points < 2) {
    alert("Not enough points to ask a question! You need at least 2 points.");
    return;
  }

  const title = document.getElementById('ask-title').value;
  const subject = document.getElementById('ask-subject').value;
  const body = document.getElementById('ask-body').value;

  const newQuestion = {
    id: Date.now().toString(),
    title, body, subject,
    askerId: user.id,
    askerName: user.name,
    status: 'open',
    answers: []
  };

  questions.unshift(newQuestion);
  user.points -= 2;
  
  saveState();
  document.getElementById('ask-form').reset();
  navigateTo('home');
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
  if (!q) return navigateTo('home');

  const header = document.getElementById('qd-header');
  header.className = "card mb-8";
  header.innerHTML = `
    <div class="flex justify-between items-start mb-4">
      <h1 class="page-title" style="font-size: 1.75rem; margin-bottom: 0;">${escapeHTML(q.title)}</h1>
      ${q.status === 'resolved' ? `<span class="badge badge-success flex items-center gap-2" style="background: rgba(16, 185, 129, 0.1); color: var(--accent-success); padding: 0.5rem 1rem;"><i data-lucide="check-circle" style="width:16px;height:16px;"></i> Resolved</span>` : ''}
    </div>
    <div class="flex items-center gap-4 mb-6 pb-6" style="border-bottom: 1px solid var(--border-color); color: var(--text-muted);">
      <span class="badge badge-subject">
        <i data-lucide="tag" style="width: 12px; height: 12px; margin-right: 0.25rem;"></i>
        ${q.subject}
      </span>
      <span>Asked by <strong style="color: var(--text-main);">${escapeHTML(q.askerName)}</strong></span>
    </div>
    <p style="white-space: pre-wrap; line-height: 1.6; font-size: 1.125rem;">${escapeHTML(q.body)}</p>
  `;

  document.getElementById('qd-answer-count').innerText = q.answers?.length || 0;
  
  const aContainer = document.getElementById('qd-answers');
  aContainer.innerHTML = '';
  
  (q.answers || []).forEach(ans => {
    const aCard = document.createElement('div');
    aCard.className = `answer-card ${ans.isBest ? 'best-answer' : ''}`;
    
    let markBestBtn = '';
    if (user.id === q.askerId && !q.bestAnswerId) {
      markBestBtn = `<button class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem; margin-left: auto;" onclick="markBest('${ans.id}')"><i data-lucide="award" style="width:14px;height:14px;"></i> Mark as Best</button>`;
    }

    const canUpvote = ans.authorId !== user.id;

    aCard.innerHTML = `
      ${ans.isBest ? `<div class="best-answer-badge"><i data-lucide="award" style="width:14px;height:14px;"></i> Best Answer</div>` : ''}
      <div class="answer-header">
        <span class="flex items-center gap-2">
          <i data-lucide="user" style="width:14px;height:14px;"></i> 
          <strong style="color: var(--text-main);">${escapeHTML(ans.authorName)}</strong> 
          <span class="badge" style="font-size: 0.7rem; padding: 0.1rem 0.5rem; background: var(--bg-color);">${ans.authorRole.replace('_', ' ')}</span>
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
  if (q.status === 'resolved') {
    formCont.style.display = 'none';
  } else {
    formCont.style.display = 'block';
  }

  lucide.createIcons();
}

function handleAnswer(e) {
  e.preventDefault();
  const body = document.getElementById('answer-body').value;
  if (!body) return;

  const q = questions.find(x => x.id === currentQuestionId);
  const newAnswer = {
    id: Date.now().toString(),
    body,
    authorId: user.id,
    authorName: user.name,
    authorRole: user.role,
    upvotes: 0,
    isBest: false
  };

  q.answers.push(newAnswer);
  user.points += 5;
  
  saveState();
  document.getElementById('answer-form').reset();
  renderQuestionDetail();
}

function upvote(ansId) {
  const q = questions.find(x => x.id === currentQuestionId);
  const ans = q.answers.find(x => x.id === ansId);
  if (ans.authorId === user.id) return; // Cannot upvote self

  ans.upvotes = (ans.upvotes || 0) + 1;
  saveState();
  renderQuestionDetail();
}

function markBest(ansId) {
  const q = questions.find(x => x.id === currentQuestionId);
  const ans = q.answers.find(x => x.id === ansId);
  
  q.status = 'resolved';
  q.bestAnswerId = ansId;
  ans.isBest = true;
  
  user.points += 2; // Reward asker
  
  saveState();
  renderQuestionDetail();
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
