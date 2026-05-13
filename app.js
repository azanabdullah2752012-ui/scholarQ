// ScholarQ - Vision Build V300
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
            profile = { id: s.user.id, email: s.user.email, name: 'Scholar', role: 'STUDENT', score_percentage: 0 };
            await db.from('users').upsert([profile]);
        }
    } catch (e) { console.error(e); }

    await refreshData();
    dismissShield();
    document.getElementById('view-auth').style.display = 'none';
    const app = document.getElementById('app');
    app.style.display = 'grid';
    setTimeout(() => app.style.opacity = '1', 50);
    
    updateVisionMetrics();
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
        if (currentView === 'home') renderHome();
        loadTopScholars();
    } catch (e) { console.error(e); }
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function go(v, p) {
    currentView = v;
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    const target = document.getElementById('view-' + v);
    if (target) target.style.display = 'block';

    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    // Simple nav mapping
    const navItems = document.querySelectorAll('.nav-item');
    if (v === 'home') navItems[0].classList.add('active');
    if (v === 'ask') navItems[1].classList.add('active');
    if (v === 'profile') navItems[6].classList.add('active');

    if (v === 'home') renderHome();
    if (v === 'ask') renderAsk();
    if (v === 'question') renderQuestion(p);
    if (v === 'profile') renderProfile();
    
    document.querySelector('.workspace-content').scrollTo(0,0);
    if (window.lucide) lucide.createIcons();
}

function updateVisionMetrics() {
    if (!profile) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    
    set('user-greeting', `Good evening, ${profile.name.split(' ')[0]}! 👋`);
    set('side-score', (profile.score_percentage || 0) + '%');
    set('side-subjects', '5');
    set('side-rep', profile.role === 'SCHOLAR' ? 'A+' : 'B');
    
    set('stat-unanswered', questions.filter(q => !q.best_answer_id).length);
    set('stat-solved', profile.total_answers_count || 0);
    set('stat-reputation', profile.role === 'SCHOLAR' ? '4.8' : '3.5');
    
    const badge = document.getElementById('status-badge');
    if (badge) {
        badge.innerHTML = `<i data-lucide="${profile.role === 'SCHOLAR' ? 'shield-check' : 'user'}"></i> ${profile.role}`;
        badge.className = profile.role === 'SCHOLAR' ? 'badge-scholar' : 'badge-student';
    }
}

// ─── RENDERING ───────────────────────────────────────────────────────────────

function renderHome() {
    const feed = document.getElementById('home-feed');
    if (!feed) return;
    
    const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter) && q.title.toLowerCase().includes(currentSearch.toLowerCase())).slice(0, 5);
    
    if (list.length === 0) {
        feed.innerHTML = `<div class="doubt-card text-center"><p class="text-muted">No recent doubts found.</p></div>`;
    } else {
        feed.innerHTML = list.map(q => `
            <div class="doubt-card" onclick="go('question', '${q.id}')">
                <div class="card-pts">10 pts</div>
                <div class="card-top">
                    <div class="author-av" style="background:${stringToColor(q.subject)}"></div>
                    <span class="badge-tag">Blitz</span>
                    <h3 style="font-size:1.1rem;">${q.title}</h3>
                </div>
                <div class="card-meta">
                    <span style="color:var(--primary); font-weight:700;">${q.subject}</span>
                    <span>•</span>
                    <span>Class 12</span>
                    <span>•</span>
                    <div class="card-author">
                        <div class="author-av" style="width:18px; height:18px;"></div>
                        <span>${q.asker_name || 'Scholar'}</span>
                    </div>
                    <span>•</span>
                    <span>${timeAgo(q.created_at)}</span>
                    <span style="margin-left:auto; color:var(--primary);">${q.answers.length} Answers</span>
                </div>
            </div>
        `).join('');
    }
    if (window.lucide) lucide.createIcons();
}

function renderAsk() {
    document.getElementById('ask-form').reset();
}

function renderQuestion(id) {
    currentQId = id; const q = questions.find(x => x.id === id); if (!q) return;

    const cont = document.getElementById('qd-container');
    cont.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
            <span class="badge-tag">${q.subject}</span>
            <span class="text-muted" style="font-size:0.8rem;">Target Identification: ${q.asker_name || 'Scholar'}</span>
        </div>
        <h1 style="font-size:2.5rem; line-height:1.1; margin-bottom:24px;">${q.title}</h1>
        <p style="font-size:1.1rem; color:var(--text-muted); white-space:pre-wrap; line-height:1.7;">${q.body}</p>
    `;

    const ansList = document.getElementById('qd-answers');
    ansList.innerHTML = q.answers.length === 0 
        ? '<div class="doubt-card text-center"><p class="text-muted">Awaiting Scholar Uplink...</p></div>' 
        : q.answers.map(a => `
            <div class="doubt-card ${a.id === q.best_answer_id ? 'best-answer' : ''}" style="cursor:default;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:12px;">
                        <div class="author-av" style="width:32px; height:32px;"></div>
                        <span style="font-weight:800; font-size:0.9rem;">${a.author_name}</span>
                    </div>
                    ${(profile.id === q.asker_id && !q.best_answer_id) ? `<button class="btn-link-sm" onclick="markBest('${a.id}', '${a.author_id}')">Accept Solution</button>` : ''}
                </div>
                <p style="color:var(--text-muted); line-height:1.7;">${a.body}</p>
            </div>
        `).join('');

    document.getElementById('answer-box').style.display = profile.role === 'SCHOLAR' ? 'block' : 'none';
}

function renderProfile() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('p-name', profile.name); set('p-email', profile.email); set('p-avatar', profile.name[0].toUpperCase());
    set('p-total', profile.total_answers_count || 0); set('p-best', profile.best_answers_count || 0);
}

function loadTopScholars() {
    db.from('users').select('*').order('best_answers_count', { ascending: false }).limit(5).then(({ data }) => {
        const cont = document.getElementById('side-scholars'); if (!cont || !data) return;
        cont.innerHTML = data.map((u, i) => `
            <div class="scholar-item">
                <div class="rank-num ${i<3 ? 'rank-'+(i+1) : ''}">${i+1}</div>
                <div class="scholar-av" style="background:${stringToColor(u.name)}"></div>
                <div class="scholar-info">
                    <div class="scholar-name">${u.name}</div>
                    <div class="scholar-sub">Physics, Math</div>
                </div>
                <div class="scholar-pct">${u.score_percentage || 90}%</div>
            </div>
        `).join('');
    });
}

// ─── ACTIONS ─────────────────────────────────────────────────────────────────

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
            toast("Identity Established. Log in."); toggleAuthMode();
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
    toast('Solution Broadcasted.'); document.getElementById('answer-form').reset(); await refreshData(); go('question', currentQId);
}

async function markBest(ansId, authorId) {
    await db.from('questions').update({ is_closed: true, best_answer_id: ansId }).eq('id', currentQId);
    const { data: scholar } = await db.from('users').select('best_answers_count').eq('id', authorId).single();
    await db.from('users').update({ best_answers_count: (scholar.best_answers_count || 0) + 1 }).eq('id', authorId);
    toast('Doubt Resolved.'); await refreshData(); go('question', currentQId);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    document.getElementById('auth-btn').innerText = authMode === 'login' ? 'Sign In' : 'Create Identity';
    document.getElementById('role-fields').style.display = authMode === 'signup' ? 'block' : 'none';
}

function setFilter(f) {
    currentFilter = f;
    renderHome();
}

function handleSearch(v) { currentSearch = v; renderHome(); }
function logout() { db.auth.signOut(); }
function toast(m) {
    const c = document.getElementById('toast-container'); const t = document.createElement('div'); t.className = 'toast'; t.innerText = m; c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}
function timeAgo(d) {
    const s = Math.floor((new Date() - new Date(d)) / 1000);
    if (s < 60) return 'now'; if (s < 3600) return Math.floor(s/60) + 'm ago'; return Math.floor(s/3600) + 'h ago';
}
function stringToColor(str) {
  let hash = 0; for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360}, 60%, 50%)`;
}
