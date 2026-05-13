// ScholarQ - Master OS Engine (V129)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null, profile = null, questions = [], bookmarks = [], marketplaceItems = [], transactions = [], currentView = 'home';
let currentSearch = '', currentFilter = 'All', isBoosted = false;

const SUBJECT_MAP = {
  'Calculus': '$fx$', 'Math': '$fx$', 'Biology': '🍃', 'Data Structures': '</>',
  'Computer Science': '</>', 'Science': '🧪', 'Physics': '🧪', 'Fluid Mechanics': '🧪', 'History': '🏛️', 'General': '🧠'
};

function dismissShield() {
  const shield = document.getElementById('init-shield');
  if (shield) { shield.style.opacity = '0'; setTimeout(() => { shield.style.display = 'none'; }, 500); }
}

document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  setTimeout(dismissShield, 1200);
  const { data: { session: s } } = await supabaseClient.auth.getSession();
  handleSessionUpdate(s);
  supabaseClient.auth.onAuthStateChange((e, s) => { if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') handleSessionUpdate(s); });
  bindForms();
});

async function handleSessionUpdate(newS) {
  session = newS;
  const app = document.getElementById('app'), auth = document.getElementById('view-auth');
  try {
    if (session) {
      const ok = await fetchProfile();
      if (ok) {
        await fetchQuestions(); await fetchBookmarks(); await fetchMarketplace(); await fetchTransactions(); setupSubscriptions();
        if (currentView === 'auth') currentView = 'home';
        if (auth) auth.style.display = 'none';
        if (app) { app.style.display = 'flex'; setTimeout(() => app.style.opacity = '1', 50); }
      } else await handleFinishProfile();
    } else {
      if (app) { app.style.display = 'none'; app.style.opacity = '0'; }
      if (auth) auth.style.display = 'flex';
    }
  } catch (e) { console.error("OS Update Error:", e); }
  dismissShield();
}

async function fetchProfile() {
  if (!session) return false;
  const { data } = await supabaseClient.from('users').select('*').eq('id', session.user.id).maybeSingle();
  if (data) { profile = data; updateGlobalUI(); return true; }
  return false;
}

async function fetchQuestions() {
  const { data: q } = await supabaseClient.from('questions').select('*').order('created_at', { ascending: false });
  const { data: a } = await supabaseClient.from('answers').select('*').order('insightful_count', { ascending: false });
  questions = (q || []).map(item => ({ ...item, answers: (a || []).filter(ans => ans.question_id === item.id) }));
  if (currentView === 'home') renderHome();
  if (currentView === 'warroom') renderWarRoom();
}

function renderHome() {
  const cont = document.getElementById('home-feed');
  const list = questions.filter(q => q.title.toLowerCase().includes(currentSearch.toLowerCase())).slice(0, 5);
  if (document.getElementById('hub-user-name')) document.getElementById('hub-user-name').innerText = profile?.name || 'Scholar';
  updateInstitutionalMetrics();
  renderContributors();
  if (!cont) return;
  if (list.length === 0) {
    cont.innerHTML = `
      <div class="empty-state">
        <i data-lucide="radio" style="width:40px; color:var(--zinc-500); margin-bottom:16px;"></i>
        <h3 style="margin-bottom:8px;">Broadcast Signal Idle</h3>
        <p class="text-muted" style="margin-bottom:24px;">No active doubts in your proximity. Be the first to start a discussion.</p>
        <button class="btn-primary" onclick="navigateTo('ask')">+ Broadcast First Doubt</button>
      </div>
    `;
  } else {
    cont.innerHTML = list.map(q => renderQuestionCard(q)).join('');
  }
  lucide.createIcons();
}

function updateInstitutionalMetrics() {
  if (!profile) return;
  const s = document.getElementById('stat-streak'), t = document.getElementById('stat-trust'), m = document.getElementById('stat-multiplier'), st = document.getElementById('stat-status'), p = document.getElementById('side-points');
  if (s) s.innerText = `${profile.streak || 0} Days`;
  if (t) t.innerText = `${profile.trust_score || 75}%`;
  if (m) m.innerText = `${parseFloat(profile.multiplier || 1.0).toFixed(2)}x`;
  if (st) st.innerText = profile.status_badge || 'SCHOLAR';
  if (p) p.innerText = profile.points || 0;
  const fill = document.getElementById('gauntlet-fill'), count = document.getElementById('gauntlet-count');
  if (fill) fill.style.width = `${Math.min(((profile.gauntlet_progress || 0) / 3) * 100, 100)}%`;
  if (count) count.innerText = `${profile.gauntlet_progress || 0} / 3`;
}

async function renderContributors() {
  const { data } = await supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(3);
  const cont = document.getElementById('top-contributors-list');
  if (!cont || !data) return;
  cont.innerHTML = data.map((u, i) => `
    <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface); padding:16px; border-radius:16px; border:1px solid var(--border);">
        <div style="display:flex; gap:12px; align-items:center;">
            <div style="width:36px; height:36px; background:var(--grad-main); border-radius:10px; display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:0.85rem;">${u.name[0]}</div>
            <div>
                <div style="font-size:0.85rem; font-weight:700; color:white;">${u.name}</div>
                <div class="label-eyebrow" style="font-size:0.55rem; color:var(--p-500);">${u.status_badge || 'SCHOLAR'}</div>
            </div>
        </div>
        <div style="font-size:0.9rem; font-weight:800; color:var(--zinc-400); font-family:'Outfit';">${(u.points / 1000).toFixed(1)}k</div>
    </div>
  `).join('');
}

function renderQuestionCard(q) {
  const isBlitz = q.answers.length === 0, symbol = SUBJECT_MAP[q.subject] || '🧠';
  const mult = isBoosted ? parseFloat(profile?.multiplier || 1.0) + 0.5 : parseFloat(profile?.multiplier || 1.0);
  const reward = Math.floor(20 * mult);
  return `
    <div class="doubt-card" onclick="navigateTo('question', '${q.id}')">
      <div class="subject-icon-box">${symbol}</div>
      <div>
        <div style="display:flex; align-items:center; gap:12px; margin-bottom:4px;">
            <h3 style="font-size:1rem; font-weight:700; color:white;">${q.title}</h3>
            ${isBlitz ? '<span style="background:var(--danger); color:white; font-size:0.5rem; padding:2px 6px; border-radius:4px; font-weight:900; letter-spacing:1px;">BLITZ</span>' : ''}
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
            <span class="label-eyebrow" style="font-size:0.6rem;">${q.subject}</span>
            <span class="text-muted" style="font-size:0.7rem;">${getTimeAgo(q.created_at)}</span>
        </div>
      </div>
      <div class="pts-badge">+${reward} <span style="font-size:0.6rem; color:var(--zinc-500);">PTS</span></div>
    </div>
  `;
}

function navigateTo(v, p = null) {
  if (!session && v !== 'auth') v = 'auth';
  currentView = v;

  const app = document.getElementById('app');
  const auth = document.getElementById('view-auth');

  // FORCE VISIBILITY
  if (v === 'auth') {
    if (app) app.style.display = 'none';
    if (auth) auth.style.display = 'flex';
  } else {
    if (auth) auth.style.display = 'none';
    if (app) { app.style.display = 'flex'; app.style.opacity = '1'; }
  }

  document.querySelectorAll('.view').forEach(x => x.style.display = 'none');
  const t = document.getElementById(`view-${v}`);
  if (t) t.style.display = 'block';

  document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
  document.getElementById(`nav-${v}`)?.classList.add('active');

  if (v === 'home') renderHome();
  if (v === 'warroom') renderWarRoom();
  if (v === 'marketplace') renderMarketplace();
  if (v === 'transactions') renderTransactions();
  if (v === 'profile') renderProfile();
  if (v === 'question') renderQuestionDetail(p);
  lucide.createIcons();
}

async function handleAnswer(e) {
  e.preventDefault();
  const b = document.getElementById('answer-body').value;
  await supabaseClient.from('answers').insert([{ id: 'a_' + Date.now(), question_id: currentQuestionId, author_id: session.user.id, author_name: profile.name, body: b }]);
  const reward = Math.floor(20 * (isBoosted ? parseFloat(profile.multiplier) + 0.5 : parseFloat(profile.multiplier)));
  await supabaseClient.from('users').update({ points: (profile.points || 0) + reward, gauntlet_progress: (profile.gauntlet_progress || 0) + 1 }).eq('id', session.user.id);
  await logTransaction(reward, "Solved Doubt", "EARN");
  showToast(`Solution Broadcasted! +${reward} PTS`);
  document.getElementById('answer-form').reset(); fetchQuestions(); fetchProfile(); navigateTo('question', currentQuestionId);
}

async function handleAsk(e) {
  e.preventDefault();
  const t = document.getElementById('ask-title').value, s = document.getElementById('ask-subject').value, b = document.getElementById('ask-body').value;
  await supabaseClient.from('questions').insert([{ id: 'q_' + Date.now(), title: t, subject: s, body: b, asker_id: session.user.id, asker_name: profile.name }]);
  showToast("Doubt Broadcasted!"); fetchQuestions(); navigateTo('home');
}

async function handleAuth(e) {
  e.preventDefault();
  const em = document.getElementById('auth-email').value, pw = document.getElementById('auth-password').value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email: em, password: pw });
  if (error) {
    const { error: upErr } = await supabaseClient.auth.signUp({ email: em, password: pw });
    if (upErr) showToast(upErr.message); else showToast("Verification Signal Sent!");
  } else showToast("Access Verified.");
}

function handleSearch(val) { currentSearch = val; if (currentView === 'home') renderHome(); if (currentView === 'warroom') renderWarRoom(); }
function setFilter(f) { currentFilter = f; renderWarRoom(); }
async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
async function signInWithGoogle() { await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } }); }
function getTimeAgo(d) { const s = Math.floor((new Date() - new Date(d)) / 1000); if (s < 60) return 'Now'; if (s < 3600) return Math.floor(s / 60) + 'm'; return Math.floor(s / 3600) + 'h'; }
function showToast(m) { const c = document.getElementById('toast-container'); const t = document.createElement('div'); t.className = 'toast'; t.innerText = m; c.appendChild(t); setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000); }
function toggleBoost() { isBoosted = !isBoosted; showToast(isBoosted ? "Hyper-Boost Active!" : "Boost Offline."); renderHome(); }
function showInvite() { showToast("Invite Signal Copied!"); }
function showNotifications() { showToast("No new alerts."); }
async function fetchTransactions() { const { data } = await supabaseClient.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }); transactions = data || []; if (currentView === 'transactions') renderTransactions(); }
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); }).subscribe(); }

async function handleFinishProfile() {
  const nm = session.user.user_metadata.full_name || (session.user.email ? session.user.email.split('@')[0] : 'Scholar');
  const newP = { id: session.user.id, email: session.user.email, name: nm, points: 50, streak: 1, trust_score: 75, multiplier: 1.00, status_badge: 'SCHOLAR', gauntlet_progress: 0 };
  await supabaseClient.from('users').upsert([newP]);
  profile = newP; navigateTo('home');
}

async function fetchBookmarks() {
  bookmarks = [];
}

async function fetchMarketplace() {
  marketplaceItems = [];
}

function updateGlobalUI() {
  if (document.getElementById('side-points'))
    document.getElementById('side-points').innerText = profile?.points || 0;
}

function bindForms() {
  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
  document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
  document.getElementById('sell-form')?.addEventListener('submit', handleSell);
}

async function logTransaction(amount, description, type) {
  try {
    await supabaseClient.from('transactions').insert([{ user_id: session.user.id, amount, description, type }]);
  } catch (e) { }
}

function renderWarRoom() {
  const cont = document.getElementById('warroom-feed');
  if (!cont) return;
  const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter) && q.title.toLowerCase().includes(currentSearch.toLowerCase()));
  cont.innerHTML = list.length === 0 ? '<div class="empty-state"><p style="color:#71717a;">No doubts match.</p></div>' : list.map(q => renderQuestionCard(q)).join('');
  lucide.createIcons();
}

function renderMarketplace() { }
function renderTransactions() { }

function renderProfile() {
  const cont = document.getElementById('profile-container');
  if (!cont || !profile) return;
  cont.innerHTML = `<div style="padding:60px 40px;text-align:center;">
    <div style="width:80px;height:80px;background:linear-gradient(135deg,#6366f1,#4f46e5);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:2rem;font-weight:800;color:white;margin-bottom:24px;">${profile.name[0]}</div>
    <h1 style="font-size:2rem;font-weight:800;">${profile.name}</h1>
    <p style="color:#a1a1aa;margin-bottom:40px;">${profile.email}</p>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid rgba(255,255,255,0.06);padding-top:40px;">
      <div><div style="font-size:2rem;font-weight:800;color:#6366f1;">${profile.points}</div><div style="font-size:0.6rem;color:#71717a;font-weight:800;text-transform:uppercase;margin-top:4px;">Points</div></div>
      <div><div style="font-size:2rem;font-weight:800;">${questions.filter(q => q.asker_id === profile.id).length}</div><div style="font-size:0.6rem;color:#71717a;font-weight:800;text-transform:uppercase;margin-top:4px;">Doubts</div></div>
      <div><div style="font-size:2rem;font-weight:800;">${questions.reduce((a, q) => a + q.answers.filter(x => x.author_id === profile.id).length, 0)}</div><div style="font-size:0.6rem;color:#71717a;font-weight:800;text-transform:uppercase;margin-top:4px;">Solutions</div></div>
    </div></div>`;
}

let currentQuestionId = null;
function renderQuestionDetail(id) {
  currentQuestionId = id;
  const q = questions.find(x => x.id === id); if (!q) return;
  const qd = document.getElementById('qd-content');
  if (qd) qd.innerHTML = `<div style="padding:32px;"><div style="font-size:0.65rem;color:#6366f1;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">${q.subject}</div><h2 style="font-size:1.6rem;font-weight:800;margin-bottom:20px;">${q.title}</h2><p style="color:#a1a1aa;line-height:1.7;">${q.body || ''}</p></div>`;
  const ans = document.getElementById('qd-answers');
  if (ans) ans.innerHTML = (q.answers || []).map(a => `<div class="widget-content" style="margin-bottom:12px;padding:24px;"><div style="color:#6366f1;font-weight:800;font-size:0.75rem;margin-bottom:12px;">${a.author_name}</div><p style="color:white;">${a.body}</p></div>`).join('');
  lucide.createIcons();
}
function renderMarketplace() {
  const cont = document.getElementById('market-list');
  if (!cont) return;
  db.from('marketplace').select('*').order('created_at', { ascending: false }).then(({ data }) => {
    if (!data || data.length === 0) { cont.innerHTML = '<div class="empty-state"><p style="color:#71717a;">No resources yet. Sell the first one!</p><button class="btn-primary" style="margin-top:16px;" onclick="openSellModal()">+ Sell Resource</button></div>'; return; }
    cont.innerHTML = data.map(i => `<div class="widget-content" style="padding:24px;"><div style="font-size:0.6rem;color:#6366f1;font-weight:800;letter-spacing:1px;margin-bottom:8px;">ASSET</div><h3 style="color:white;margin-bottom:4px;">${i.title}</h3><p style="font-size:0.75rem;color:#71717a;margin-bottom:16px;">By ${i.seller_name}</p><div style="display:flex;justify-content:space-between;align-items:center;"><span style="font-weight:800;color:white;">${i.price} PTS</span><button class="btn-primary" style="padding:8px 16px;font-size:0.75rem;" onclick="buyItem('${i.id}',${i.price},'${i.link}','${i.seller_id}')">Unlock</button></div></div>`).join('');
  });
}

async function buyItem(id, price, link, sellerId) {
  if ((profile.points || 0) < price) { toast('Not enough points!'); return; }
  await db.from('users').update({ points: (profile.points || 0) - price }).eq('id', session.user.id);
  const { data: s } = await db.from('users').select('points').eq('id', sellerId).single();
  if (s) await db.from('users').update({ points: (s.points || 0) + price }).eq('id', sellerId);
  profile.points -= price; updateMetrics();
  toast('Unlocked! Opening resource...'); window.open(link, '_blank');
}

function renderTransactions() {
  const cont = document.getElementById('transaction-list');
  if (!cont) return;
  db.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }).then(({ data }) => {
    if (!data || data.length === 0) { cont.innerHTML = '<div class="empty-state"><p style="color:#71717a;">No transactions yet.</p></div>'; return; }
    cont.innerHTML = data.map(t => `<div class="doubt-card" style="cursor:default;"><div class="subject-icon-box">${t.type === 'EARN' ? '📈' : '📤'}</div><div><div style="font-weight:700;color:white;">${t.description}</div><div style="font-size:0.7rem;color:#71717a;">${new Date(t.created_at).toLocaleDateString()}</div></div><div style="font-weight:800;color:${t.type === 'EARN' ? '#22c55e' : '#ef4444'};">${t.type === 'EARN' ? '+' : ''}${t.amount} PTS</div></div>`).join('');
  });
}
