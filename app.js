// ScholarQ - Master OS V301 (Dual Mode)
const SUPA_URL = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const SUPA_KEY = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const db = window.supabase.createClient(SUPA_URL, SUPA_KEY);

let session = null, profile = null, questions = [], currentView = 'home';
let currentSearch = '', currentFilter = 'All', isBooting = false, currentQId = null;
let authMode = 'login';

// ─── INITIALIZATION ──────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    if (window.lucide) lucide.createIcons();
    setTimeout(dismissShield, 2000);

    const { data: { session: s } } = await db.auth.getSession();
    if (s) boot(s); else {
        dismissShield();
        document.getElementById('view-auth').style.display = 'flex';
    }

    db.auth.onAuthStateChange((event, s) => {
        if (event === 'SIGNED_IN' && !session) boot(s);
        if (event === 'SIGNED_OUT') window.location.reload();
    });

    document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
    document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
    document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
});

function dismissShield() {
    const s = document.getElementById('init-shield');
    if (s) { s.style.opacity = '0'; setTimeout(() => s.style.display = 'none', 800); }
}

async function boot(s) {
    if (isBooting) return;
    isBooting = true; session = s;

    try {
        const { data } = await db.from('users').select('*').eq('id', s.user.id).maybeSingle();
        if (data) profile = data;
        else {
            profile = { id: s.user.id, email: s.user.email, name: 'Student', role: 'STUDENT', score_percentage: 0 };
            await db.from('users').upsert([profile]);
        }
    } catch (e) { console.error(e); }

    await refreshData();
    dismissShield();
    document.getElementById('view-auth').style.display = 'none';
    const app = document.getElementById('app');
    app.style.display = 'grid';
    setTimeout(() => app.style.opacity = '1', 50);
    
    renderAppShell();
    go('home');
    isBooting = false;
}

async function refreshData() {
    try {
        const [{ data: q }, { data: a }] = await Promise.all([
            db.from('questions').select('*').order('created_at', { ascending: false }),
            db.from('answers').select('*')
        ]);
        questions = (q || []).map(x => ({ 
            ...x, 
            answers: (a || []).filter(ans => ans.question_id === x.id).sort((a, b) => b.is_best ? 1 : -1) 
        }));
        if (currentView === 'home') renderDashboard();
    } catch (e) { console.error(e); }
}

// ─── MORPHIC NAVIGATION ───────────────────────────────────────────────────────

function renderAppShell() {
    const isScholar = profile.role === 'SCHOLAR';
    
    // SIDEBAR NAV
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = isScholar ? `
        <div class="nav-item active" onclick="go('home')"><i data-lucide="layout-dashboard"></i> <span>Scholar Hub</span></div>
        <div class="nav-item" onclick="go('feed')"><i data-lucide="zap"></i> <span>Doubt Feed</span></div>
        <div class="nav-item" onclick="go('profile')"><i data-lucide="check-circle"></i> <span>My Answers</span></div>
        <div class="nav-item" onclick="go('students')"><i data-lucide="users"></i> <span>My Students</span></div>
        <div class="nav-item" onclick="go('leaderboard')"><i data-lucide="award"></i> <span>Leaderboard</span></div>
        <div class="nav-item" onclick="go('notifications')"><i data-lucide="bell"></i> <span>Notifications</span></div>
        <div class="nav-item" onclick="go('profile')"><i data-lucide="user"></i> <span>Profile</span></div>
    ` : `
        <div class="nav-item active" onclick="go('home')"><i data-lucide="home"></i> <span>Home</span></div>
        <div class="nav-item" onclick="go('ask')"><i data-lucide="plus-circle"></i> <span>Ask Doubt</span></div>
        <div class="nav-item" onclick="go('profile')"><i data-lucide="message-square"></i> <span>My Doubts</span></div>
        <div class="nav-item" onclick="go('leaderboard')"><i data-lucide="award"></i> <span>Top Scholars</span></div>
        <div class="nav-item" onclick="go('profile')"><i data-lucide="user"></i> <span>Profile</span></div>
    `;

    // SIDEBAR STATUS
    const status = document.getElementById('sidebar-status-area');
    status.innerHTML = isScholar ? `
        <div class="scholar-status-badge"><i data-lucide="shield-check"></i> Scholar Verified</div>
        <div class="points-card">
            <h4>Your Points</h4>
            <div class="points-val">2,450</div>
            <div class="points-sub">Available Balance</div>
            <button class="btn-primary" style="width:100%; font-size:0.7rem;">View Transactions</button>
        </div>
    ` : `
        <div class="points-card">
            <h4>Your Status</h4>
            <div style="font-weight:900; color:white; margin-bottom:12px;">STUDENT</div>
            <div style="display:flex; justify-content:space-between; font-size:0.8rem; color:var(--text-muted);"><span>Score</span><span>${profile.score_percentage}%</span></div>
            <button class="btn-primary" style="width:100%; font-size:0.7rem; margin-top:12px;" onclick="go('profile')">View Profile</button>
        </div>
    `;
    
    if (window.lucide) lucide.createIcons();
}

function go(v, p) {
    currentView = v;
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    const target = document.getElementById('view-' + v);
    if (target) target.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));

    if (v === 'home') renderDashboard();
    if (v === 'ask') renderAsk();
    if (v === 'question') renderQuestion(p);
    if (v === 'profile') renderProfile();
    
    document.querySelector('.workspace-content').scrollTo(0,0);
    if (window.lucide) lucide.createIcons();
}

// ─── DASHBOARD RENDERING ─────────────────────────────────────────────────────

function renderDashboard() {
    const isScholar = profile.role === 'SCHOLAR';
    const home = document.getElementById('view-home');
    
    if (isScholar) {
        renderScholarDashboard(home);
    } else {
        renderStudentDashboard(home);
    }
    if (window.lucide) lucide.createIcons();
}

function renderScholarDashboard(cont) {
    cont.innerHTML = `
        <div class="greeting">
            <h1>Good evening, <span class="pulse-purple">${profile.name}</span> 👋</h1>
            <p class="text-muted">Ready to help and make an impact today?</p>
        </div>
        <div class="stats-grid">
            <div class="stat-box box-purple"><div class="stat-icon"><i data-lucide="list"></i></div><div><div class="stat-num">${questions.length}</div><div class="text-muted text-xs">Doubts to Answer</div></div></div>
            <div class="stat-box box-green"><div class="stat-icon"><i data-lucide="check-circle"></i></div><div><div class="stat-num">${profile.total_answers_count || 128}</div><div class="text-muted text-xs">Answers Given</div></div></div>
            <div class="stat-box box-yellow"><div class="stat-icon"><i data-lucide="star"></i></div><div><div class="stat-num">96%</div><div class="text-muted text-xs">Success Rate</div></div></div>
            <div class="stat-box box-blue"><div class="stat-icon"><i data-lucide="trending-up"></i></div><div><div class="stat-num">2.3x</div><div class="text-muted text-xs">Impact Multiplier</div></div></div>
        </div>
        <div class="feed-header"><h2>High Priority Doubts <span class="badge-q" style="background:var(--primary); color:white;">${questions.length}</span></h2></div>
        <div id="home-feed" class="feed-stack"></div>
    `;
    renderFeed();
    renderScholarRightPanel();
}

function renderStudentDashboard(cont) {
    cont.innerHTML = `
        <div class="greeting"><h1>Good evening, ${profile.name.split(' ')[0]}! 👋</h1><p class="text-muted">Need help with something?</p></div>
        <div class="stats-grid">
            <div class="stat-box box-blue"><div class="stat-icon"><i data-lucide="help-circle"></i></div><div><div class="stat-num">${questions.filter(q=>!q.best_answer_id).length}</div><div class="text-muted text-xs">Unanswered Doubts</div></div></div>
            <div class="stat-box box-green"><div class="stat-icon"><i data-lucide="check-circle"></i></div><div><div class="stat-num">${questions.filter(q=>q.asker_id===profile.id).length}</div><div class="text-muted text-xs">My Doubts</div></div></div>
            <div class="stat-box box-yellow"><div class="stat-icon"><i data-lucide="award"></i></div><div><div class="stat-num">4.8</div><div class="text-muted text-xs">Reputation</div></div></div>
        </div>
        <div class="feed-header"><h2>Recent Doubts</h2></div>
        <div id="home-feed" class="feed-stack"></div>
    `;
    renderFeed();
    renderStudentRightPanel();
}

function renderFeed() {
    const feed = document.getElementById('home-feed');
    const isScholar = profile.role === 'SCHOLAR';
    const list = questions.slice(0, 5);
    feed.innerHTML = list.map(q => `
        <div class="doubt-card" onclick="go('question', '${q.id}')">
            <div class="card-pts">${isScholar ? '15 pts' : '10 pts'}</div>
            <div style="display:flex; gap:16px;">
                <div class="stat-icon" style="background:rgba(255,255,255,0.02); width:40px; height:40px;"><i data-lucide="atom"></i></div>
                <div>
                    <div style="display:flex; gap:8px; margin-bottom:8px;"><span class="badge-tag">NEW</span><span class="text-muted text-xs">10 min ago</span></div>
                    <h3 style="font-size:1rem; margin-bottom:8px;">${q.title}</h3>
                    <div class="text-muted text-xs">${q.subject} • Class 12</div>
                </div>
                ${isScholar ? `<button class="btn-answer" style="margin-left:auto; align-self:center;">Answer</button>` : ''}
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

// ─── RIGHT PANEL RENDERING ───────────────────────────────────────────────────

function renderScholarRightPanel() {
    const panel = document.getElementById('right-panel');
    panel.innerHTML = `
        <div class="perf-card">
            <h4 style="margin-bottom:16px;">Your Performance</h4>
            <div class="chart-container">
                <div class="circle-chart">128</div>
                <div class="chart-info">
                    <div class="chart-row"><span>Correct Answers</span><span>123</span></div>
                    <div class="chart-row"><span>Incorrect Answers</span><span>5</span></div>
                    <div class="chart-row"><span>Students Helped</span><span>87</span></div>
                </div>
            </div>
        </div>
        <div class="perf-card">
            <h4>7 Day Streak</h4>
            <div style="font-weight:900; font-size:1.4rem; margin:12px 0;">🔥 7 Days</div>
            <div class="streak-grid">
                ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>(`<div class="streak-day"><div>${d}</div><div class="day-circle done">✓</div></div>`)).join('')}
            </div>
        </div>
        <div class="perf-card">
            <h4>Your Subjects</h4>
            ${['Mathematics','Physics','Chemistry'].map(s=>(`
                <div class="subject-bar">
                    <div class="bar-meta"><span>${s}</span><span>96%</span></div>
                    <div class="bar-track"><div class="bar-fill" style="width:96%"></div></div>
                </div>
            `)).join('')}
        </div>
        <div class="action-grid">
            <div class="action-btn"><i data-lucide="target"></i><div>Daily Gauntlet</div></div>
            <div class="action-btn"><i data-lucide="user-plus"></i><div>Invite & Earn</div></div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
}

function renderStudentRightPanel() {
    const panel = document.getElementById('right-panel');
    panel.innerHTML = `
        <div class="perf-card"><h3>Top Scholars</h3><div id="side-scholars"></div></div>
        <div class="perf-card">
            <h3>How it works</h3>
            <div class="timeline">
                <div class="time-item"><div class="time-num">1</div><div class="time-content"><h4>Ask doubt</h4></div></div>
                <div class="time-item"><div class="time-num">2</div><div class="time-content"><h4>Scholars answer</h4></div></div>
            </div>
        </div>
    `;
    // Populate scholars list...
}

// ─── AUTH & ACTIONS ──────────────────────────────────────────────────────────

async function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value, password = document.getElementById('auth-password').value;
    if (authMode === 'login') {
        const { error } = await db.auth.signInWithPassword({ email, password });
        if (error) toast(error.message);
    } else {
        const name = document.getElementById('auth-name').value, score = parseInt(document.getElementById('auth-score').value);
        const role = score >= 85 ? 'SCHOLAR' : 'STUDENT';
        const { data, error } = await db.auth.signUp({ email, password, options: { data: { full_name: name, score, role } } });
        if (error) { toast(error.message); return; }
        if (data.user) {
            await db.from('users').upsert([{ id: data.user.id, email, name, score_percentage: score, role }]);
            toast("Identity Created."); toggleAuthMode();
        }
    }
}

async function handleAsk(e) {
    e.preventDefault();
    await db.from('questions').insert([{ id: 'q_' + Date.now(), title: document.getElementById('ask-title').value, subject: document.getElementById('ask-subject').value, body: document.getElementById('ask-body').value, asker_id: session.user.id, asker_name: profile.name }]);
    toast('Broadcast Sent.'); await refreshData(); go('home');
}

async function handleAnswer(e) {
    e.preventDefault();
    const body = document.getElementById('answer-body').value;
    await db.from('answers').insert([{ id: 'a_' + Date.now(), question_id: currentQId, author_id: session.user.id, author_name: profile.name, body }]);
    await db.from('users').update({ total_answers_count: (profile.total_answers_count || 0) + 1 }).eq('id', session.user.id);
    profile.total_answers_count = (profile.total_answers_count || 0) + 1;
    toast('Solution Sent.'); document.getElementById('answer-form').reset(); await refreshData(); go('question', currentQId);
}

async function markBest(ansId, authorId) {
    await db.from('questions').update({ is_closed: true, best_answer_id: ansId }).eq('id', currentQId);
    const { data: scholar } = await db.from('users').select('best_answers_count').eq('id', authorId).single();
    await db.from('users').update({ best_answers_count: (scholar.best_answers_count || 0) + 1 }).eq('id', authorId);
    toast('Verified.'); await refreshData(); go('question', currentQId);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    document.getElementById('auth-btn').innerText = authMode === 'login' ? 'Sign In' : 'Create Account';
    document.getElementById('role-fields').style.display = authMode === 'signup' ? 'block' : 'none';
}

function handleSearch(v) { currentSearch = v; renderFeed(); }
function logout() { db.auth.signOut(); }
function toast(m) {
    const c = document.getElementById('toast-container'); const t = document.createElement('div'); t.className = 'toast'; t.innerText = m; c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}
function timeAgo(d) { return 'just now'; }
