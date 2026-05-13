// ScholarQ - Pure Academic Utility V200
const SUPA_URL = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const SUPA_KEY = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const db = window.supabase.createClient(SUPA_URL, SUPA_KEY);

let session = null, profile = null, questions = [], currentView = 'home';
let currentSearch = '', currentFilter = 'All', isBooting = false, currentQId = null;
let authMode = 'login'; // 'login' or 'signup'

// ─── INITIALIZATION ──────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
    if (window.lucide) lucide.createIcons();
    
    const { data: { session: s } } = await db.auth.getSession();
    if (s) boot(s); else document.getElementById('view-auth').style.display = 'flex';

    db.auth.onAuthStateChange((event, s) => {
        if (event === 'SIGNED_IN' && !session) boot(s);
        if (event === 'SIGNED_OUT') window.location.reload();
    });

    document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
    document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
    document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
});

async function boot(s) {
    if (isBooting) return;
    isBooting = true;
    session = s;

    try {
        const { data } = await db.from('users').select('*').eq('id', s.user.id).maybeSingle();
        if (data) {
            profile = data;
        } else {
            // This should ideally happen during signup, but fallback here
            profile = { id: s.user.id, email: s.user.email, name: 'Student', role: 'STUDENT', score_percentage: 0 };
            await db.from('users').upsert([profile]);
        }
    } catch (e) { console.error("Profile Error:", e); }

    await refreshData();
    document.getElementById('view-auth').style.display = 'none';
    document.getElementById('app').style.display = 'block';
    
    updateHeader();
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
    } catch (e) { console.error("Data Sync Error:", e); }
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

function updateHeader() {
    const av = document.getElementById('nav-avatar');
    if (av && profile) av.innerText = (profile.name || 'S')[0].toUpperCase();
    
    const label = document.getElementById('role-label');
    const stats = document.getElementById('role-stats');
    if (label && stats && profile) {
        label.innerText = profile.role;
        label.className = `badge ${profile.role.toLowerCase()}`;
        stats.innerText = profile.role === 'SCHOLAR' 
            ? `Trusted Scholar • ${profile.total_answers_count || 0} Answers` 
            : `Student • ${profile.score_percentage}% Score`;
    }

    // Students can't answer, Scholars can't see the big 'Ask' button in nav? 
    // Actually, both can ask, but only Scholars see the answer box.
}

// ─── RENDERING ───────────────────────────────────────────────────────────────

function renderHome() {
    const feed = document.getElementById('home-feed');
    if (!feed) return;
    
    const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter));
    
    if (list.length === 0) {
        feed.innerHTML = `<div class="empty-state" style="padding:80px 20px; text-align:center; color:var(--text-muted);">
            <i data-lucide="info" style="width:48px; height:48px; margin-bottom:16px;"></i>
            <p>No doubts found in ${currentFilter}.</p>
        </div>`;
    } else {
        feed.innerHTML = list.map(q => `
            <div class="doubt-card" onclick="go('question', '${q.id}')">
                <div style="display:flex; justify-content:space-between; margin-bottom:12px;">
                    <span class="badge">${q.subject}</span>
                    <span class="text-muted text-sm">${timeAgo(q.created_at)}</span>
                </div>
                <h3>${q.title}</h3>
                <div class="card-meta">
                    <span>${q.answers.length} Answers</span>
                    ${q.best_answer_id ? '<span style="color:#22c55e; font-weight:700;">✓ Solved</span>' : ''}
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
        <div style="margin-bottom:32px;">
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:20px;">
                <span class="badge scholar">${q.subject}</span>
                <span class="text-muted text-sm">By ${q.asker_name || 'Student'}</span>
            </div>
            <h1 style="font-size:2rem; margin-bottom:16px;">${q.title}</h1>
            <p style="font-size:1.1rem; color:var(--text-muted); white-space:pre-wrap; line-height:1.7;">${q.body}</p>
        </div>
    `;

    const ansList = document.getElementById('qd-answers');
    document.getElementById('ans-count').innerText = `${q.answers.length} Answers`;
    
    ansList.innerHTML = q.answers.length === 0 
        ? '<p class="text-muted">No scholars have responded yet.</p>' 
        : q.answers.map(a => `
            <div class="doubt-card ${a.id === q.best_answer_id ? 'best-answer' : ''}" style="cursor:default;">
                ${a.id === q.best_answer_id ? '<span class="best-label">🏆 BEST ANSWER</span>' : ''}
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                        <div class="avatar-circle" style="width:24px; height:24px; font-size:0.6rem; margin:0;">${a.author_name[0]}</div>
                        <span class="text-sm font-bold">${a.author_name}</span>
                    </div>
                    ${(profile.id === q.asker_id && !q.best_answer_id) ? `<button class="btn-main-sm" onclick="markBest('${a.id}', '${a.author_id}')">Mark Best</button>` : ''}
                </div>
                <p style="color:var(--text); line-height:1.6;">${a.body}</p>
            </div>
        `).join('');

    // Only Scholars can answer
    document.getElementById('answer-box').style.display = profile.role === 'SCHOLAR' ? 'block' : 'none';
}

function renderProfile() {
    const cont = document.getElementById('profile-card');
    if (!cont || !profile) return;

    cont.innerHTML = `
        <div class="avatar-circle">${profile.name[0]}</div>
        <h2 style="margin-bottom:4px;">${profile.name}</h2>
        <p class="text-muted" style="margin-bottom:24px;">${profile.email}</p>
        
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; border-top:1px solid #eee; padding-top:24px;">
            <div class="stat-item">
                <div style="font-size:1.5rem; font-weight:800;">${profile.total_answers_count || 0}</div>
                <div class="text-muted text-xs">ANSWERS</div>
            </div>
            <div class="stat-item">
                <div style="font-size:1.5rem; font-weight:800;">${profile.best_answers_count || 0}</div>
                <div class="text-muted text-xs">BEST ANSWERS</div>
            </div>
        </div>
        
        <div style="margin-top:32px; padding:16px; background:#f3f4f6; border-radius:12px; text-align:left;">
            <div style="font-size:0.75rem; font-weight:800; color:var(--text-muted); margin-bottom:8px;">ACADEMIC STATUS</div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <span class="badge ${profile.role.toLowerCase()}">${profile.role}</span>
                <span style="font-weight:700;">${profile.score_percentage}%</span>
            </div>
        </div>
    `;
}

// ─── ACTIONS ─────────────────────────────────────────────────────────────────

async function handleAuth(e) {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    
    if (authMode === 'login') {
        const { error } = await db.auth.signInWithPassword({ email, password });
        if (error) toast(error.message);
    } else {
        const name = document.getElementById('auth-name').value;
        const score = parseInt(document.getElementById('auth-score').value);
        const role = score >= 85 ? 'SCHOLAR' : 'STUDENT';
        
        const { data, error } = await db.auth.signUp({ 
            email, password, 
            options: { data: { full_name: name, score, role } } 
        });
        
        if (error) { toast(error.message); return; }
        
        // Create user profile
        if (data.user) {
            await db.from('users').upsert([{ 
                id: data.user.id, email, name, score_percentage: score, role 
            }]);
            toast("Account created! Please login.");
            toggleAuthMode();
        }
    }
}

async function handleAsk(e) {
    e.preventDefault();
    const title = document.getElementById('ask-title').value;
    const subject = document.getElementById('ask-subject').value;
    const body = document.getElementById('ask-body').value;

    await db.from('questions').insert([{
        id: 'q_' + Date.now(),
        title, subject, body,
        asker_id: session.user.id,
        asker_name: profile.name
    }]);

    toast('Doubt posted successfully!');
    await refreshData();
    go('home');
}

async function handleAnswer(e) {
    e.preventDefault();
    const body = document.getElementById('answer-body').value;

    await db.from('answers').insert([{
        id: 'a_' + Date.now(),
        question_id: currentQId,
        author_id: session.user.id,
        author_name: profile.name,
        body
    }]);

    // Increment answer count
    await db.from('users').update({ 
        total_answers_count: (profile.total_answers_count || 0) + 1 
    }).eq('id', session.user.id);
    profile.total_answers_count = (profile.total_answers_count || 0) + 1;

    toast('Answer submitted!');
    document.getElementById('answer-form').reset();
    await refreshData();
    go('question', currentQId);
}

async function markBest(ansId, authorId) {
    // 1. Update Question
    await db.from('questions').update({ 
        is_closed: true, 
        best_answer_id: ansId 
    }).eq('id', currentQId);

    // 2. Update Scholar Stats
    const { data: scholar } = await db.from('users').select('best_answers_count').eq('id', authorId).single();
    await db.from('users').update({ 
        best_answers_count: (scholar.best_answers_count || 0) + 1 
    }).eq('id', authorId);

    toast('Best answer marked! Doubt closed.');
    await refreshData();
    go('question', currentQId);
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    document.getElementById('auth-sub').innerText = authMode === 'login' ? 'Academic Help. Organized.' : 'Create your ScholarQ ID';
    document.getElementById('auth-btn').innerText = authMode === 'login' ? 'Enter Platform' : 'Create Account';
    document.getElementById('auth-toggle').innerText = authMode === 'login' ? 'New here? Create Account' : 'Already have an account? Login';
    document.getElementById('role-fields').style.display = authMode === 'signup' ? 'block' : 'none';
}

function setFilter(f) {
    currentFilter = f;
    document.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c.innerText === f));
    renderHome();
}

function logout() { db.auth.signOut(); }
function toast(m) {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div'); t.className = 'toast'; t.innerText = m;
    c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}
function timeAgo(d) {
    const s = Math.floor((new Date() - new Date(d)) / 1000);
    if (s < 60) return 'now';
    if (s < 3600) return Math.floor(s/60) + 'm ago';
    return Math.floor(s/3600) + 'h ago';
}
