// ScholarQ - Master OS Engine V132 (Remade Point Engine)
const SUPA_URL = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const SUPA_KEY = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const db = window.supabase.createClient(SUPA_URL, SUPA_KEY);

let session = null, profile = null, questions = [], currentView = 'home';
let currentSearch = '', currentFilter = 'All', isBoosted = false, currentQId = null;
let isBooting = false;

const ICONS = { 'Calculus':'$fx$','Math':'$fx$','Biology':'🍃','Data Structures':'</>','Computer Science':'</>','Science':'🧪','Physics':'🧪','General':'🧠','History':'📜' };

// ─── BOOT ────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', async () => {
  if (window.lucide) lucide.createIcons();

  const safety = setTimeout(() => {
    const app = document.getElementById('app'), auth = document.getElementById('view-auth');
    if (app && auth && app.style.display === 'none' && auth.style.display === 'none') auth.style.display = 'flex';
  }, 2000);

  try {
    const { data: { session: s } } = await db.auth.getSession();
    clearTimeout(safety); boot(s);
  } catch (e) { clearTimeout(safety); document.getElementById('view-auth').style.display = 'flex'; }

  db.auth.onAuthStateChange((_, s) => { if (!session && s) boot(s); else if (session && !s) window.location.reload(); });

  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
  document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
  document.getElementById('sell-form')?.addEventListener('submit', handleSell);
});

async function boot(s) {
  if (isBooting) return; isBooting = true; session = s;
  const app = document.getElementById('app'), auth = document.getElementById('view-auth');
  if (!s) { if (app) app.style.display = 'none'; if (auth) auth.style.display = 'flex'; isBooting = false; return; }

  try {
    const { data } = await db.from('users').select('*').eq('id', s.user.id).maybeSingle();
    if (data) profile = data;
    else {
      profile = { id: s.user.id, email: s.user.email, name: s.user.email.split('@')[0], points: 100, streak: 1, trust_score: 75, multiplier: 1.00, status_badge: 'SCHOLAR', gauntlet_progress: 0 };
      await db.from('users').upsert([profile]);
    }
  } catch (e) { console.error(e); }

  await refreshData();
  if (auth) auth.style.display = 'none';
  if (app) { app.style.display = 'flex'; setTimeout(() => app.style.opacity = '1', 50); }
  go('home'); isBooting = false;
}

async function refreshData() {
  try {
    const [{ data: q }, { data: a }] = await Promise.all([
      db.from('questions').select('*').order('created_at', { ascending: false }),
      db.from('answers').select('*')
    ]);
    questions = (q || []).map(x => ({ ...x, answers: (a || []).filter(ans => ans.question_id === x.id) }));
    if (currentView === 'home') renderHome();
    if (currentView === 'warroom') renderWarRoom();
  } catch (e) { questions = []; }
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function navigateTo(v, p) { if (!session) { showAuth(); return; } go(v, p); }

function go(v, p) {
  currentView = v;
  document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
  const target = document.getElementById('view-' + v); if (target) target.style.display = 'block';
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  document.getElementById('nav-' + v)?.classList.add('active');

  if (v === 'home') renderHome();
  if (v === 'warroom') renderWarRoom();
  if (v === 'profile') renderProfile();
  if (v === 'question') renderQuestion(p);
  if (v === 'leaderboard') renderLeaderboard();
  if (v === 'marketplace') renderMarketplace();
  if (v === 'transactions') renderTransactions();
  if (v === 'gauntlet') renderGauntlet();
  if (v === 'library') renderLibrary();
  if (v === 'instructions') renderInstructions();
  if (window.lucide) lucide.createIcons();
}

function showAuth() { document.getElementById('app').style.display = 'none'; document.getElementById('view-auth').style.display = 'flex'; }

// ─── POINT ENGINE ────────────────────────────────────────────────────────────

async function adjustPoints(amount, description, type = 'EARN') {
  if (!profile) return false;
  const current = parseInt(profile.points || 0);
  const next = type === 'EARN' ? current + amount : current - amount;
  if (next < 0) { toast(`Insufficient Funds! Need ${amount} PTS.`); return false; }

  try {
    const { data, error } = await db.from('users').update({ points: next }).eq('id', session.user.id).select('points').single();
    if (error) throw error;
    profile.points = data.points;
    await logTransaction(amount, description, type);
    updateMetrics();
    return true;
  } catch (e) { toast("Point Engine Error."); return false; }
}

// ─── RENDER FUNCTIONS ────────────────────────────────────────────────────────

function renderHome() {
  updateMetrics(); loadContributors();
  const feed = document.getElementById('home-feed'); if (!feed) return;
  const list = questions.slice(0, 5);
  feed.innerHTML = list.length === 0 ? '<div class="empty-state">No doubts yet.</div>' : list.map(makeCard).join('');
}

function renderWarRoom() {
  const cont = document.getElementById('warroom-feed'); if (!cont) return;
  const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter) && q.title.toLowerCase().includes(currentSearch.toLowerCase()));
  cont.innerHTML = list.length === 0 ? '<div class="empty-state">No matches.</div>' : list.map(makeCard).join('');
}

function renderProfile() {
  const cont = document.getElementById('profile-container'); if (!cont || !profile) return;
  const doubts = questions.filter(q => q.asker_id === profile.id).length;
  const solutions = questions.reduce((a, q) => a + q.answers.filter(x => x.author_id === profile.id).length, 0);
  cont.innerHTML = `<div style="padding:60px 40px;text-align:center;"><div style="width:90px;height:90px;background:var(--grad-main);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:800;color:white;margin-bottom:24px;">${profile.name[0].toUpperCase()}</div><h1 style="font-size:2rem;font-weight:800;margin-bottom:8px;">${profile.name}</h1><p style="color:#a1a1aa;margin-bottom:48px;">${profile.email}</p><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid rgba(255,255,255,0.06);padding-top:40px;"><div><div style="font-size:2rem;font-weight:800;color:#6366f1;">${profile.points}</div><div class="label-eyebrow">Points</div></div><div><div style="font-size:2rem;font-weight:800;color:white;">${doubts}</div><div class="label-eyebrow">Doubts</div></div><div><div style="font-size:2rem;font-weight:800;color:white;">${solutions}</div><div class="label-eyebrow">Solutions</div></div></div><button class="btn-ghost" style="margin-top:48px;width:100%;justify-content:center;" onclick="navigateTo('transactions')">View Ledger</button></div>`;
}

function renderQuestion(id) {
  currentQId = id; const q = questions.find(x => x.id === id); if (!q) return;
  const qd = document.getElementById('qd-content'); if (qd) qd.innerHTML = `<div style="padding:32px;"><div class="label-eyebrow" style="color:#6366f1;margin-bottom:16px;">${q.subject}</div><h2 style="font-size:1.6rem;font-weight:800;margin-bottom:20px;color:white;">${q.title}</h2><p style="color:#a1a1aa;line-height:1.8;">${q.body || ''}</p></div>`;
  const ans = document.getElementById('qd-answers'); if (ans) ans.innerHTML = q.answers.length === 0 ? '<p style="color:#71717a;">No solutions yet.</p>' : q.answers.map(a => `<div class="widget-content" style="margin-bottom:12px;"><div style="color:#6366f1;font-weight:800;font-size:0.75rem;margin-bottom:12px;">${a.author_name}</div><p style="color:white;">${a.body}</p></div>`).join('');
}

function renderLeaderboard() {
  const cont = document.getElementById('view-leaderboard'); if (!cont) return;
  db.from('users').select('*').order('points', { ascending: false }).limit(10).then(({ data }) => {
    cont.innerHTML = `<h1 style="font-size:2rem;font-weight:800;margin-bottom:40px;">Top Scholars</h1>` + data.map((u, i) => `<div class="doubt-card" style="cursor:default;"><div class="subject-icon-box">#${i+1}</div><div><div style="font-weight:700;color:white;">${u.name}</div><div style="font-size:0.7rem;color:#71717a;">${u.status_badge}</div></div><div class="pts-badge">${u.points} PTS</div></div>`).join('');
  });
}

function renderMarketplace() {
  const cont = document.getElementById('market-list'); if (!cont) return;
  db.from('marketplace').select('*').order('created_at', { ascending: false }).then(({ data }) => {
    cont.innerHTML = !data || data.length === 0 ? '<div class="empty-state">Vault is Empty.</div>' : data.map(i => `<div class="widget-content" style="display:flex;flex-direction:column;gap:16px;"><div class="label-eyebrow" style="color:#6366f1;">RESOURCE</div><h3 style="color:white;">${i.title}</h3><p style="font-size:0.8rem;color:#71717a;">By ${i.seller_name}</p><div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;"><span style="font-weight:800;color:white;">${i.price} PTS</span><button class="btn-primary" onclick="buyItem('${i.id}',${i.price},'${i.link}','${i.seller_id}')">Unlock</button></div></div>`).join('');
  });
}

async function buyItem(id, price, link, sellerId) {
  const success = await adjustPoints(price, `Bought Resource: ${id}`, 'SPEND');
  if (!success) return;
  const { data: s } = await db.from('users').select('points').eq('id', sellerId).maybeSingle();
  if (s) await db.from('users').update({ points: (s.points || 0) + price }).eq('id', sellerId);
  toast('Unlocked! Opening...'); window.open(link, '_blank');
}

function renderTransactions() {
  const cont = document.getElementById('transaction-list'); if (!cont) return;
  db.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }).then(({ data }) => {
    cont.innerHTML = !data || data.length === 0 ? '<div class="empty-state">No entries.</div>' : data.map(t => `<div class="doubt-card" style="cursor:default;"><div class="subject-icon-box">${t.type==='EARN'?'📈':'📉'}</div><div><div style="font-weight:700;color:white;">${t.description}</div><div style="font-size:0.7rem;color:#71717a;">${new Date(t.created_at).toLocaleDateString()}</div></div><div style="font-weight:800;color:${t.type==='EARN'?'#22c55e':'#ef4444'};">${t.type==='EARN'?'+':'-'}${t.amount} PTS</div></div>`).join('');
  });
}

function renderGauntlet() {
  const cont = document.getElementById('view-gauntlet'), prog = profile?.gauntlet_progress || 0, done = prog >= 3;
  cont.innerHTML = `<h1 style="font-size:2rem;font-weight:800;margin-bottom:40px;">Daily Gauntlet</h1><div class="widget-content" style="padding:40px;border-top:3px solid #6366f1;"><h2>Today's Mission</h2><p style="color:#71717a;margin-bottom:32px;">Answer 3 doubts to earn +50 PTS.</p><div style="font-size:3rem;font-weight:800;color:#6366f1;margin-bottom:24px;">${prog} / 3</div><div class="progress-track"><div class="progress-fill" style="width:${Math.min(prog/3*100,100)}%;"></div></div><button class="btn-primary" style="margin-top:32px;width:100%;${done?'':'opacity:0.5;'}" ${done?'onclick="claimGauntlet()"':'disabled'}>${done?'🏆 Claim 50 PTS Bonus':'Complete solutions to unlock'}</button></div>`;
}

async function claimGauntlet() {
  await db.from('users').update({ gauntlet_progress: 0 }).eq('id', session.user.id);
  profile.gauntlet_progress = 0;
  await adjustPoints(50, "Gauntlet Mission Bonus", "EARN");
  toast('🏆 Bonus Claimed!'); go('gauntlet');
}

function renderLibrary() {
  const cont = document.getElementById('view-library'), saved = JSON.parse(localStorage.getItem('sq_library') || '[]'), bookmarked = questions.filter(q => saved.includes(q.id));
  cont.innerHTML = `<h1 style="font-size:2rem;margin-bottom:40px;">My Library</h1>` + (bookmarked.length === 0 ? '<div class="empty-state">Library Empty.</div>' : bookmarked.map(q => `<div class="doubt-card" onclick="navigateTo('question','${q.id}')"><div class="subject-icon-box">${ICONS[q.subject]||'🧠'}</div><div><div style="font-weight:700;color:white;">${q.title}</div><div style="font-size:0.7rem;color:#71717a;">${q.subject}</div></div><button onclick="event.stopPropagation();removeBookmark('${q.id}')" class="btn-ghost" style="padding:6px 12px;font-size:0.7rem;">Remove</button></div>`).join(''));
}

function saveBookmarkFromDetail() { if (currentQId) { const s = JSON.parse(localStorage.getItem('sq_library') || '[]'); if (!s.includes(currentQId)) { s.push(currentQId); localStorage.setItem('sq_library', JSON.stringify(s)); toast('Saved!'); } } }
function removeBookmark(id) { const s = JSON.parse(localStorage.getItem('sq_library') || '[]').filter(x => x !== id); localStorage.setItem('sq_library', JSON.stringify(s)); toast('Removed!'); renderLibrary(); }

function renderInstructions() {
  const cont = document.getElementById('view-instructions');
  cont.innerHTML = `<h1 style="font-size:2rem;font-weight:800;margin-bottom:48px;">How to Use</h1>` + [
    { i:'📡', t:'Ask', d:'Costs 10 PTS to post.' }, { i:'⚔️', t:'Solve', d:'Earn 25+ PTS per solution.' }, { i:'🏆', t:'Gauntlet', d:'Solve 3 daily for +50 PTS.' }, { i:'🗄️', t:'Vault', d:'Buy/Sell academic resources.' }
  ].map(s => `<div class="widget-content" style="margin-bottom:16px;display:flex;gap:24px;"><h3>${s.i}</h3><div><h4 style="color:white;">${s.t}</h4><p style="color:#a1a1aa;">${s.d}</p></div></div>`).join('');
}

// ─── HANDLERS ────────────────────────────────────────────────────────────────

async function handleAuth(e) {
  e.preventDefault(); const email = document.getElementById('auth-email').value, password = document.getElementById('auth-password').value;
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) { const { error: e2 } = await db.auth.signUp({ email, password }); if (e2) toast(e2.message); else toast('Confirm email!'); } else toast('Welcome!');
}

async function handleAsk(e) {
  e.preventDefault(); const success = await adjustPoints(10, "Posted Doubt", "SPEND"); if (!success) return;
  await db.from('questions').insert([{ id: 'q_'+Date.now(), title: document.getElementById('ask-title').value, subject: document.getElementById('ask-subject').value, body: document.getElementById('ask-body').value, asker_id: session.user.id, asker_name: profile.name }]);
  toast('Broadcasted! (-10 PTS)'); await refreshData(); go('home');
}

async function handleAnswer(e) {
  e.preventDefault(); const q = questions.find(x => x.id === currentQId); if (!q || q.asker_id === session.user.id) { toast("Cannot earn points on own doubt."); return; }
  await db.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQId, author_id: session.user.id, author_name: profile.name, body: document.getElementById('answer-body').value }]);
  
  const trust = Math.min((profile.trust_score || 75) + 1, 100);
  const mult = (1.0 + (trust - 75) * 0.02).toFixed(2);
  const earned = Math.floor(25 * (isBoosted ? parseFloat(mult)+0.5 : parseFloat(mult)));

  await db.from('users').update({ trust_score: trust, multiplier: mult, gauntlet_progress: (profile.gauntlet_progress || 0) + 1 }).eq('id', session.user.id);
  profile.trust_score = trust; profile.multiplier = mult; profile.gauntlet_progress += 1;
  await adjustPoints(earned, `Solved: ${q.title}`, 'EARN');
  toast(`+${earned} PTS earned!`); document.getElementById('answer-form').reset(); await refreshData(); go('question', currentQId);
}

async function handleSell(e) {
  e.preventDefault(); await db.from('marketplace').insert([{ id: 'm_'+Date.now(), title: document.getElementById('sell-title').value, price: parseInt(document.getElementById('sell-price').value), link: document.getElementById('sell-link').value, seller_id: session.user.id, seller_name: profile.name }]);
  toast('Resource Published!'); closeSellModal(); renderMarketplace();
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function makeCard(q) {
  const mult = isBoosted ? (parseFloat(profile?.multiplier || 1) + 0.5) : parseFloat(profile?.multiplier || 1);
  return `<div class="doubt-card" onclick="navigateTo('question','${q.id}')"><div class="subject-icon-box">${ICONS[q.subject]||'🧠'}</div><div><h3 style="font-size:0.95rem;color:white;">${q.title}</h3><span style="font-size:0.7rem;color:#71717a;">${q.subject}</span></div><div class="pts-badge">+${Math.floor(25*mult)} PTS</div></div>`;
}

function updateMetrics() {
  if (!profile) return; const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
  const dMult = isBoosted ? (parseFloat(profile.multiplier || 1) + 0.5) : parseFloat(profile.multiplier || 1);
  set('hub-user-name', profile.name); set('side-points', profile.points); set('stat-status', profile.points > 1000 ? 'ELITE' : 'SCHOLAR');
  set('stat-streak', profile.streak + ' Days'); set('stat-trust', profile.trust_score + '%'); set('stat-multiplier', dMult.toFixed(2) + 'x');
  const fill = document.getElementById('gauntlet-fill'); if (fill) fill.style.width = Math.min(((profile.gauntlet_progress || 0) / 3) * 100, 100) + '%';
  const av = document.getElementById('user-avatar'); if (av) av.innerText = profile.name[0].toUpperCase();
}

function loadContributors() {
  db.from('users').select('*').order('points', { ascending: false }).limit(3).then(({ data }) => {
    const cont = document.getElementById('top-contributors-list'); if (!cont || !data) return;
    cont.innerHTML = data.map(u => `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><div style="display:flex;gap:12px;align-items:center;"><div class="avatar-sm">${u.name[0]}</div><div><div style="font-size:0.85rem;color:white;">${u.name}</div><div style="font-size:0.6rem;color:#6366f1;">${u.status_badge}</div></div></div><div style="font-weight:800;color:#71717a;">${(u.points/1000).toFixed(1)}k</div></div>`).join('');
  });
}

async function logTransaction(amount, description, type) { try { await db.from('transactions').insert([{ user_id: session.user.id, amount, description, type }]); } catch(e) {} }
async function logout() { await db.auth.signOut(); window.location.reload(); }
function openSellModal() { document.getElementById('modal-sell').style.display = 'flex'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }
function handleSearch(val) { currentSearch = val; if (currentView === 'home') renderHome(); if (currentView === 'warroom') renderWarRoom(); }
function setFilter(f) { currentFilter = f; renderWarRoom(); }
function toggleBoost() { isBoosted = !isBoosted; toast(isBoosted ? 'Hyper-Boost Active!' : 'Boost offline.'); updateMetrics(); }
function toast(msg) { const c = document.getElementById('toast-container'); const t = document.createElement('div'); t.className = 'toast'; t.innerText = msg; c.appendChild(t); setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000); }
