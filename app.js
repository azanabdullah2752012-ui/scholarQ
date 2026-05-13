// ScholarQ - Stealth OS V201
const SUPA_URL = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const SUPA_KEY = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const db = window.supabase.createClient(SUPA_URL, SUPA_KEY);

let session = null, profile = null, questions = [], currentView = 'home';
let currentSearch = '', currentFilter = 'All', isBooting = false, currentQId = null;
let authMode = 'login';

// ─── INITIALIZATION ──────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    if (window.lucide) lucide.createIcons();
    
    // Safety dismiss shield after 2.5s
    setTimeout(dismissShield, 2500);

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
    isBooting = true;
    session = s;

    try {
        const { data } = await db.from('users').select('*').eq('id', s.user.id).maybeSingle();
        if (data) {
            profile = data;
        } else {
            profile = { id: s.user.id, email: s.user.email, name: 'Scholar', role: 'STUDENT', score_percentage: 0 };
            await db.from('users').upsert([profile]);
        }
    } catch (e) { console.error(e); }

    await refreshData();
    dismissShield();
    document.getElementById('view-auth').style.display = 'none';
    const app = document.getElementById('app');
    app.style.display = 'block';
    setTimeout(() => app.style.opacity = '1', 50);
    
    updateOSMetrics();
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
    } catch (e) { console.error(e); }
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function go(v, p) {
    currentView = v;
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    const target = document.getElementById('view-' + v);
    if (target) target.style.display = 'block';

    if (v === 'home') renderHome();
    if (v === 'ask') renderAsk();
    if (v === 'question') renderQuestion(p);
    if (v === 'profile') renderProfile();
    
    window.scrollTo(0,0);
    if (window.lucide) lucide.createIcons();
}

function updateOSMetrics() {
    if (!profile) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    
    set('nav-role', profile.role);
    set('nav-avatar', (profile.name || 'S')[0].toUpperCase());
    set('stat-rank', profile.role);
    set('stat-best', profile.best_answers_count || 0);
    set('stat-rep', (profile.role === 'SCHOLAR' ? '95%' : '75%'));
}

// ─── RENDERING ───────────────────────────────────────────────────────────────

function renderHome() {
    const feed = document.getElementById('home-feed');
    if (!feed) return;
    
    const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter));
    
    if (list.length === 0) {
        feed.innerHTML = `<div class="stealth-card p-large text-center"><p class="text-muted">Broadcast Signal Idle. No doubts found in ${currentFilter}.</p></div>`;
    } else {
        feed.innerHTML = list.map(q => `
            <div class="doubt-card" onclick="go('question', '${q.id}')">
                <div style="display:flex; justify-content:space-between; margin-bottom:16px;">
                    <span class="badge-subject">${q.subject}</span>
                    <span class="text-muted text-sm">${timeAgo(q.created_at)}</span>
                </div>
                <h3 style="font-size:1.2rem; margin-bottom:12px;">${q.title}</h3>
                <div style="display:flex; gap:16px; font-size:0.75rem; font-weight:700; color:var(--text-muted);">
                    <span>${q.answers.length} RESPONSES</span>
                    ${q.best_answer_id ? '<span style="color:#22c55e;">SOLVED</span>' : '<span style="color:var(--primary);">PULSE ACTIVE</span>'}
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
    currentQId = id;
    const q = questions.find(x => x.id === id);
    if (!q) return;

    const cont = document.getElementById('qd-container');
    cont.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
            <span class="badge-subject">${q.subject}</span>
            <span class="text-muted text-sm">Target: ${q.asker_name || 'Scholar'}</span>
        </div>
        <h1 style="font-size:2.2rem; margin-bottom:20px;">${q.title}</h1>
        <p style="font-size:1.1rem; color:var(--text-muted); white-space:pre-wrap; line-height:1.8;">${q.body}</p>
    `;

    const ansList = document.getElementById('qd-answers');
    ansList.innerHTML = q.answers.length === 0 
        ? '<div class="stealth-card p-medium text-center"><p class="text-muted">Awaiting Scholar Response...</p></div>' 
        : q.answers.map(a => `
            <div class="doubt-card ${a.id === q.best_answer_id ? 'best-answer' : ''}" style="cursor:default;">
                ${a.id === q.best_answer_id ? '<span class="best-label">✓ BEST SOLUTION</span>' : ''}
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div class="avatar-sm" style="width:24px; height:24px; font-size:0.6rem;">${a.author_name[0]}</div>
                        <span class="text-sm font-bold" style="color:white;">${a.author_name}</span>
                    </div>
                    ${(profile.id === q.asker_id && !q.best_answer_id) ? `<button class="btn-ask-plus" onclick="markBest('${a.id}', '${a.author_id}')">Mark Best</button>` : ''}
                </div>
                <p style="color:var(--text-muted); line-height:1.7;">${a.body}</p>
            </div>
        `).join('');

    document.getElementById('answer-box').style.display = profile.role === 'SCHOLAR' ? 'block' : 'none';
}

function renderProfile() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('profile-name', profile.name);
    set('profile-email', profile.email);
    set('profile-avatar', profile.name[0].toUpperCase());
    set('p-total', profile.total_answers_count || 0);
    set('p-best', profile.best_answers_count || 0);
    set('p-score', (profile.score_percentage || 0) + '%');
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
            toast("Identity Created. Redirecting...");
            toggleAuthMode();
        }
    }
}

async function handleAsk(e) {
    e.preventDefault();
    await db.from('questions').insert([{ id: 'q_' + Date.now(), title: document.getElementById('ask-title').value, subject: document.getElementById('ask-subject').value, body: document.getElementById('ask-body').value, asker_id: session.user.id, asker_name: profile.name }]);
    toast('Doubt Broadcasted.'); await refreshData(); go('home');
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
    toast('Best Answer Marked.'); await refreshData(); go('question', currentQId);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    document.getElementById('auth-sub').innerText = authMode === 'login' ? 'High-Performance Peer Learning.' : 'Create Scholar Identity';
    document.getElementById('auth-btn').innerText = authMode === 'login' ? 'Enter OS' : 'Initialize Profile';
    document.getElementById('auth-toggle').innerText = authMode === 'login' ? 'New Scholar? Register Account' : 'Access Existing Key? Login';
    document.getElementById('role-fields').style.display = authMode === 'signup' ? 'block' : 'none';
}

function setFilter(f) {
    currentFilter = f;
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.innerText === (f==='All'?'All Pulse':f)));
    renderHome();
}

function logout() { db.auth.signOut(); }
function toast(m) {
    const c = document.getElementById('toast-container'); const t = document.createElement('div'); t.className = 'toast'; t.innerText = m; c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}
function timeAgo(d) {
    const s = Math.floor((new Date() - new Date(d)) / 1000);
    if (s < 60) return 'now'; if (s < 3600) return Math.floor(s/60) + 'm ago'; return Math.floor(s/3600) + 'h ago';
}
