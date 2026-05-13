// ScholarQ - Reference Match V400
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
    
    updateRefMetrics();
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
    const navItems = document.querySelectorAll('.nav-item');
    if (v === 'home') navItems[0].classList.add('active');
    if (v === 'ask') navItems[1].classList.add('active');

    if (v === 'home') renderHome();
    if (v === 'ask') renderAsk();
    if (v === 'question') renderQuestion(p);
    if (v === 'profile') renderProfile();
    
    document.querySelector('.scroll-view').scrollTo(0,0);
    if (window.lucide) lucide.createIcons();
}

function updateRefMetrics() {
    if (!profile) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    
    set('user-greeting', `Good evening, ${profile.name.split(' ')[0]}! 👋`);
    set('side-score', (profile.score_percentage || 0) + '%');
    
    set('stat-unanswered', questions.filter(q => !q.best_answer_id).length);
    set('stat-solved', profile.total_answers_count || 0);
    set('stat-reputation', profile.role === 'SCHOLAR' ? '4.8' : '3.5');
    
    const pill = document.getElementById('status-pill');
    if (pill) {
        pill.innerHTML = `<i data-lucide="${profile.role === 'SCHOLAR' ? 'shield-check' : 'user'}"></i> ${profile.role}`;
        pill.style.color = profile.role === 'SCHOLAR' ? '#10b981' : '#6366f1';
        pill.style.background = profile.role === 'SCHOLAR' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)';
    }
}

// ─── RENDERING ───────────────────────────────────────────────────────────────

function renderHome() {
    const feed = document.getElementById('home-feed');
    if (!feed) return;
    
    const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter) && q.title.toLowerCase().includes(currentSearch.toLowerCase())).slice(0, 5);
    
    feed.innerHTML = list.length === 0 
        ? `<div class="doubt-card-ref text-center"><p class="text-muted">No doubts found.</p></div>` 
        : list.map(q => makeRefCard(q)).join('');
    
    if (window.lucide) lucide.createIcons();
}

function makeRefCard(q) {
    const subMap = { 'Mathematics':'math','Chemistry':'chem','Physics':'phys','History':'hist','Biology':'chem','CS':'math' };
    const iconMap = { 'Mathematics':'fx','Chemistry':'flask-conical','Physics':'atom','History':'scroll','Biology':'leaf','CS':'code' };
    const sKey = subMap[q.subject] || 'math';
    const iKey = iconMap[q.subject] || 'help-circle';

    return `
        <div class="doubt-card-ref" onclick="go('question', '${q.id}')">
            <div class="pts-tag">10 pts</div>
            <div class="card-layout">
                <div class="subject-circle circle-${sKey}"><i data-lucide="${iKey}" style="width:20px;"></i></div>
                <div style="flex:1">
                    <div style="display:flex; gap:12px; margin-bottom:8px;">
                        <span style="background:rgba(99,102,241,0.1); color:#6366f1; padding:2px 8px; border-radius:4px; font-size:0.6rem; font-weight:800; text-transform:uppercase;">Blitz</span>
                        <span class="text-muted" style="font-size:0.7rem;">${timeAgo(q.created_at)}</span>
                    </div>
                    <h3 class="doubt-title">${q.title}</h3>
                    <div class="doubt-meta">
                        <span class="meta-subject">${q.subject}</span>
                        <span>•</span>
                        <span>Class 12</span>
                        <span>•</span>
                        <div class="author-pill">
                            <div class="author-av-sm" style="background:${stringToColor(q.asker_name)}"></div>
                            <span>${q.asker_name || 'Scholar'}</span>
                        </div>
                        <span style="margin-left:auto; color:#6366f1;">${q.answers.length} Answers</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderAsk() {
    document.getElementById('ask-form').reset();
}

function renderQuestion(id) {
    currentQId = id; const q = questions.find(x => x.id === id); if (!q) return;

    const cont = document.getElementById('qd-container');
    cont.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:24px;">
            <div class="subject-circle circle-math" style="width:32px; height:32px;"><i data-lucide="help-circle" style="width:16px;"></i></div>
            <span class="text-muted" style="font-size:0.8rem;">By ${q.asker_name}</span>
        </div>
        <h1 style="font-size:2.4rem; line-height:1.1; margin-bottom:20px;">${q.title}</h1>
        <p style="font-size:1.1rem; color:var(--text-muted); white-space:pre-wrap; line-height:1.7;">${q.body}</p>
    `;

    const ansList = document.getElementById('qd-answers');
    ansList.innerHTML = q.answers.length === 0 
        ? '<div class="doubt-card-ref text-center"><p class="text-muted">Awaiting Solution...</p></div>' 
        : q.answers.map(a => `
            <div class="doubt-card-ref ${a.id === q.best_answer_id ? 'best-answer' : ''}" style="cursor:default;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <div class="rank-circle" style="width:24px; height:24px; font-size:0.6rem;">${a.author_name[0]}</div>
                        <span style="font-weight:800; font-size:0.85rem;">${a.author_name}</span>
                    </div>
                    ${(profile.id === q.asker_id && !q.best_answer_id) ? `<button class="btn-view-all" style="background:#6366f1; color:white; padding:4px 12px; border-radius:6px;" onclick="markBest('${a.id}', '${a.author_id}')">Best Answer</button>` : ''}
                </div>
                <p style="color:var(--text-muted); line-height:1.7;">${a.body}</p>
            </div>
        `).join('');

    document.getElementById('answer-box').style.display = profile.role === 'SCHOLAR' ? 'block' : 'none';
}

function renderProfile() {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('p-name', profile.name); set('p-avatar', profile.name[0].toUpperCase());
    set('p-total', profile.total_answers_count || 0); set('p-best', profile.best_answers_count || 0);
}

function loadTopScholars() {
    db.from('users').select('*').order('best_answers_count', { ascending: false }).limit(5).then(({ data }) => {
        const cont = document.getElementById('side-scholars'); if (!cont || !data) return;
        cont.innerHTML = data.map((u, i) => `
            <div class="scholar-row">
                <div class="rank-circle ${i<3 ? 'rank-'+(i+1) : ''}">${i+1}</div>
                <div class="scholar-av-md" style="background:${stringToColor(u.name)}"></div>
                <div class="scholar-meta">
                    <div class="name">${u.name}</div>
                    <div class="sub">Physics, Math</div>
                </div>
                <div class="scholar-score">${u.score_percentage || 90}%</div>
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
            toast("Sync Success. Log in."); toggleAuthMode();
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
    toast('Solution Sent.'); document.getElementById('answer-form').reset(); await refreshData(); go('question', currentQId);
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
    document.getElementById('auth-toggle').innerText = authMode === 'login' ? 'Create Account' : 'Existing Key? Login';
    document.getElementById('auth-btn').innerText = authMode === 'login' ? 'Sign In' : 'Initialize Profile';
    document.getElementById('role-fields').style.display = authMode === 'signup' ? 'block' : 'none';
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
  return `hsl(${hash % 360}, 40%, 30%)`;
}
