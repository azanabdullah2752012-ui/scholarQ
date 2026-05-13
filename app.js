// ScholarQ - Elevate Auth Edition V401
const SUPA_URL = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const SUPA_KEY = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const db = window.supabase.createClient(SUPA_URL, SUPA_KEY);

let session = null, profile = null, questions = [], currentView = 'home';
let currentSearch = '', currentFilter = 'All', isBooting = false;
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
            const metadata = s.user.user_metadata;
            profile = { 
                id: s.user.id, 
                email: s.user.email, 
                name: metadata?.full_name || 'Student', 
                role: metadata?.role || 'STUDENT', 
                score_percentage: metadata?.score || 0 
            };
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
    } catch (e) { console.error(e); }
}

// ─── AUTH ACTIONS ────────────────────────────────────────────────────────────

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
            toast("Identity Synchronized. Proceed to Login."); toggleAuthMode();
        }
    }
}

async function loginWithGoogle() {
    const { error } = await db.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.href } });
    if (error) toast(error.message);
}

function toggleAuthMode() {
    authMode = authMode === 'login' ? 'signup' : 'login';
    document.getElementById('auth-btn').innerHTML = authMode === 'login' ? 'Log In <i data-lucide="arrow-right"></i>' : 'Create Account <i data-lucide="arrow-right"></i>';
    document.getElementById('auth-toggle-link').innerText = authMode === 'login' ? 'Sign up' : 'Log in';
    document.getElementById('role-fields').style.display = authMode === 'signup' ? 'block' : 'none';
    if (window.lucide) lucide.createIcons();
}

// ─── RENDERING ───────────────────────────────────────────────────────────────

function go(v, p) {
    currentView = v;
    document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
    const target = document.getElementById('view-' + v);
    if (target) target.style.display = 'block';
    if (v === 'home') renderHome();
    if (window.lucide) lucide.createIcons();
}

function updateRefMetrics() {
    if (!profile) return;
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
    set('user-greeting', `Good evening, ${profile.name.split(' ')[0]}! 👋`);
    set('side-score', (profile.score_percentage || 0) + '%');
    const pill = document.getElementById('status-pill');
    if (pill) {
        pill.innerHTML = `<i data-lucide="${profile.role === 'SCHOLAR' ? 'shield-check' : 'user'}"></i> ${profile.role}`;
        pill.style.color = profile.role === 'SCHOLAR' ? '#10b981' : '#6366f1';
        pill.style.background = profile.role === 'SCHOLAR' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)';
    }
}

function renderHome() {
    const feed = document.getElementById('home-feed');
    if (!feed) return;
    const list = questions.slice(0, 5);
    feed.innerHTML = list.map(q => `
        <div class="doubt-card-ref" onclick="go('question', '${q.id}')">
            <div class="pts-tag">10 pts</div>
            <div style="display:flex; gap:20px;">
                <div class="subject-circle circle-math" style="background:${stringToColor(q.subject)}22; color:${stringToColor(q.subject)}"><i data-lucide="help-circle"></i></div>
                <div>
                    <h3 class="doubt-title">${q.title}</h3>
                    <div class="doubt-meta">
                        <span style="color:#6366f1; font-weight:700;">${q.subject}</span>
                        <span>•</span>
                        <span>${q.asker_name}</span>
                        <span style="margin-left:auto; color:#6366f1;">${q.answers.length} Answers</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
    if (window.lucide) lucide.createIcons();
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function toast(m) {
    const c = document.getElementById('toast-container'); const t = document.createElement('div'); t.className = 'toast'; t.innerText = m; c.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}
function logout() { db.auth.signOut(); }
function stringToColor(str) {
  let hash = 0; for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return `hsl(${hash % 360}, 60%, 50%)`;
}
