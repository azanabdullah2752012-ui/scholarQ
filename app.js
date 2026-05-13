// ScholarQ - Master OS Engine V132 (Immediate Gateway)
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

  // Safety Timeout: Force show auth if it hangs for 2 seconds
  const safety = setTimeout(() => {
    const app = document.getElementById('app');
    const auth = document.getElementById('view-auth');
    if (app && auth && app.style.display === 'none' && auth.style.display === 'none') {
      console.warn("Safety: Showing gateway due to latency.");
      auth.style.display = 'flex';
    }
  }, 2000);

  try {
    const { data: { session: s } } = await db.auth.getSession();
    clearTimeout(safety);
    boot(s);
  } catch (e) {
    console.error("Auth init error:", e);
    clearTimeout(safety);
    document.getElementById('view-auth').style.display = 'flex';
  }

  db.auth.onAuthStateChange((_, s) => {
    if (!session && s) boot(s);
    else if (session && !s) window.location.reload();
  });

  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
  document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
  document.getElementById('sell-form')?.addEventListener('submit', handleSell);
});

async function boot(s) {
  if (isBooting) return;
  isBooting = true;
  session = s;

  const app = document.getElementById('app');
  const auth = document.getElementById('view-auth');

  if (!s) {
    if (app) app.style.display = 'none';
    if (auth) auth.style.display = 'flex';
    isBooting = false;
    return;
  }

  try {
    const { data } = await db.from('users').select('*').eq('id', s.user.id).maybeSingle();
    if (data) {
      profile = data;
    } else {
      const name = s.user.user_metadata?.full_name || s.user.email?.split('@')[0] || 'Scholar';
      profile = { id: s.user.id, email: s.user.email, name, points: 50, streak: 1, trust_score: 75, multiplier: 1.00, status_badge: 'SCHOLAR', gauntlet_progress: 0 };
      await db.from('users').upsert([profile]);
    }
  } catch (e) { console.error('Profile load error:', e); }

  await refreshData();

  if (auth) auth.style.display = 'none';
  if (app) {
    app.style.display = 'flex';
    setTimeout(() => app.style.opacity = '1', 50);
  }

  go('home');
  isBooting = false;
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
  } catch (e) { 
    console.error('Data refresh error:', e);
    questions = []; 
  }
}

// ─── NAVIGATION ──────────────────────────────────────────────────────────────

function navigateTo(v, p) {
  if (!session) { showAuth(); return; }
  go(v, p);
}

function go(v, p) {
  currentView = v;
  document.querySelectorAll('.view').forEach(el => el.style.display = 'none');
  const target = document.getElementById('view-' + v);
  if (target) target.style.display = 'block';

  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
  document.getElementById('nav-' + v)?.classList.add('active');

  if (v === 'home')         renderHome();
  if (v === 'warroom')      renderWarRoom();
  if (v === 'profile')      renderProfile();
  if (v === 'question')     renderQuestion(p);
  if (v === 'leaderboard')  renderLeaderboard();
  if (v === 'marketplace')  renderMarketplace();
  if (v === 'transactions') renderTransactions();
  if (v === 'gauntlet')     renderGauntlet();
  if (v === 'library')      renderLibrary();
  if (v === 'instructions') renderInstructions();

  if (window.lucide) lucide.createIcons();
}

function showAuth() {
  const app = document.getElementById('app');
  const auth = document.getElementById('view-auth');
  if (app) app.style.display = 'none';
  if (auth) auth.style.display = 'flex';
}

// ─── RENDER FUNCTIONS ────────────────────────────────────────────────────────

function renderHome() {
  updateMetrics();
  loadContributors();
  const feed = document.getElementById('home-feed');
  if (!feed) return;
  const list = questions.filter(q => q.title.toLowerCase().includes(currentSearch.toLowerCase())).slice(0, 5);
  if (list.length === 0) {
    feed.innerHTML = `<div class="empty-state"><div style="font-size:2.5rem;margin-bottom:16px;">📡</div><h3 style="margin-bottom:8px;color:white;">Broadcast Signal Idle</h3><p style="color:#71717a;margin-bottom:24px;">No doubts yet. Be the first to start a discussion.</p><button class="btn-primary" onclick="navigateTo('ask')">+ Post First Doubt</button></div>`;
  } else {
    feed.innerHTML = list.map(makeCard).join('');
  }
}

function renderWarRoom() {
  const cont = document.getElementById('warroom-feed');
  if (!cont) return;
  const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter) && q.title.toLowerCase().includes(currentSearch.toLowerCase()));
  cont.innerHTML = list.length === 0 ? '<div class="empty-state"><p style="color:#71717a;">No doubts match this filter.</p></div>' : list.map(makeCard).join('');
}

function renderProfile() {
  const cont = document.getElementById('profile-container');
  if (!cont || !profile) return;
  const doubts = questions.filter(q => q.asker_id === profile.id).length;
  const solutions = questions.reduce((a, q) => a + q.answers.filter(x => x.author_id === profile.id).length, 0);
  cont.innerHTML = `
    <div style="padding:60px 40px;text-align:center;">
      <div style="width:90px;height:90px;background:linear-gradient(135deg,#6366f1,#4f46e5);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:2.5rem;font-weight:800;color:white;margin-bottom:24px;">${profile.name[0].toUpperCase()}</div>
      <h1 style="font-size:2rem;font-weight:800;margin-bottom:8px;">${profile.name}</h1>
      <p style="color:#a1a1aa;margin-bottom:48px;">${profile.email}</p>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;border-top:1px solid rgba(255,255,255,0.06);padding-top:40px;">
        <div><div style="font-size:2rem;font-weight:800;color:#6366f1;">${profile.points}</div><div style="font-size:0.6rem;color:#71717a;font-weight:800;text-transform:uppercase;margin-top:4px;">Points</div></div>
        <div onclick="navigateTo('warroom')" style="cursor:pointer;"><div style="font-size:2rem;font-weight:800;color:white;">${doubts}</div><div style="font-size:0.6rem;color:#71717a;font-weight:800;text-transform:uppercase;margin-top:4px;">Doubts</div></div>
        <div onclick="navigateTo('gauntlet')" style="cursor:pointer;"><div style="font-size:2rem;font-weight:800;color:white;">${solutions}</div><div style="font-size:0.6rem;color:#71717a;font-weight:800;text-transform:uppercase;margin-top:4px;">Solutions</div></div>
      </div>
      <button class="btn-ghost" style="margin-top:48px; width:100%; justify-content:center;" onclick="navigateTo('transactions')">View Transaction History</button>
    </div>`;
}

function renderQuestion(id) {
  currentQId = id;
  const q = questions.find(x => x.id === id);
  if (!q) return;
  const qd = document.getElementById('qd-content');
  if (qd) qd.innerHTML = `<div style="padding:32px;"><div style="font-size:0.65rem;color:#6366f1;font-weight:800;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">${q.subject}</div><h2 style="font-size:1.6rem;font-weight:800;margin-bottom:20px;color:white;">${q.title}</h2><p style="color:#a1a1aa;line-height:1.8;">${q.body || 'No additional context provided.'}</p></div>`;
  const ans = document.getElementById('qd-answers');
  if (ans) ans.innerHTML = q.answers.length === 0 ? '<p style="color:#71717a;padding:20px 0;">No solutions yet. Be the first!</p>' : q.answers.map(a => `<div class="widget-content" style="margin-bottom:12px;padding:24px;"><div style="color:#6366f1;font-weight:800;font-size:0.75rem;letter-spacing:1px;margin-bottom:12px;">${a.author_name}</div><p style="color:white;line-height:1.7;">${a.body}</p></div>`).join('');
}

function renderLeaderboard() {
  const cont = document.getElementById('view-leaderboard');
  if (!cont) return;
  db.from('users').select('*').order('points', { ascending: false }).limit(20).then(({ data }) => {
    if (!data) return;
    cont.innerHTML = `<h1 style="font-size:2rem;font-weight:800;margin-bottom:40px;">Academy Leaderboard</h1>` + data.map((u, i) => `<div class="doubt-card" style="cursor:default;margin-bottom:12px;"><div class="subject-icon-box" style="font-weight:800;font-size:1rem;color:#6366f1;">#${i + 1}</div><div><div style="font-weight:700;color:white;">${u.name}</div><div style="font-size:0.7rem;color:#71717a;">${u.status_badge || 'SCHOLAR'}</div></div><div class="pts-badge">${u.points} PTS</div></div>`).join('');
  });
}

function renderMarketplace() {
  const cont = document.getElementById('market-list');
  if (!cont) return;
  db.from('marketplace').select('*').order('created_at', { ascending: false }).then(({ data }) => {
    if (!data || data.length === 0) {
      cont.innerHTML = '<div class="empty-state"><div style="font-size:2rem;margin-bottom:16px;">🗄️</div><h3 style="margin-bottom:8px;color:white;">Vault is Empty</h3><p style="color:#71717a;margin-bottom:24px;">No resources yet. Be the first to sell!</p><button class="btn-primary" onclick="openSellModal()">+ Sell Resource</button></div>';
      return;
    }
    cont.innerHTML = data.map(i => `<div class="widget-content" style="padding:28px;display:flex;flex-direction:column;gap:16px;"><div style="font-size:0.6rem;color:#6366f1;font-weight:800;letter-spacing:1px;">RESOURCE</div><h3 style="color:white;font-size:1rem;font-weight:700;">${i.title}</h3><p style="font-size:0.8rem;color:#71717a;">By ${i.seller_name}</p><div style="display:flex;justify-content:space-between;align-items:center;margin-top:auto;"><span style="font-weight:800;color:white;font-size:1.1rem;">${i.price} <span style="font-size:0.7rem;color:#71717a;">PTS</span></span><button class="btn-primary" style="padding:10px 20px;font-size:0.8rem;" onclick="buyItem('${i.id}',${i.price},'${i.link || '#'}','${i.seller_id}')">Unlock →</button></div></div>`).join('');
  });
}

async function buyItem(id, price, link, sellerId) {
  if ((profile.points || 0) < price) { toast('Not enough points!'); return; }
  await db.from('users').update({ points: (profile.points || 0) - price }).eq('id', session.user.id);
  const { data: s } = await db.from('users').select('points').eq('id', sellerId).maybeSingle();
  if (s) await db.from('users').update({ points: (s.points || 0) + price }).eq('id', sellerId);
  profile.points -= price; updateMetrics();
  await logTransaction(price, `Unlocked Resource: ${id}`, 'SPEND');
  toast('Unlocked! Opening resource...'); if (link && link !== '#') window.open(link, '_blank');
}

function renderTransactions() {
  const cont = document.getElementById('transaction-list');
  if (!cont) return;
  db.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false }).then(({ data }) => {
    if (!data || data.length === 0) { cont.innerHTML = '<div class="empty-state"><p style="color:#71717a;">No ledger entries found.</p></div>'; return; }
    cont.innerHTML = data.map(t => `<div class="doubt-card" style="cursor:default;"><div class="subject-icon-box">${t.type==='EARN'?'📈':'📉'}</div><div><div style="font-weight:700;color:white;">${t.description}</div><div style="font-size:0.7rem;color:#71717a;">${new Date(t.created_at).toLocaleDateString()}</div></div><div style="font-weight:800;color:${t.type==='EARN'?'#22c55e':'#ef4444'};">${t.type==='EARN'?'+':'-'}${t.amount} PTS</div></div>`).join('');
  });
}

function renderGauntlet() {
  const cont = document.getElementById('view-gauntlet');
  if (!cont) return;
  const prog = profile?.gauntlet_progress || 0;
  const done = prog >= 3;
  cont.innerHTML = `<h1 style="font-size:2rem;font-weight:800;margin-bottom:40px;">Daily Gauntlet</h1><div class="widget-content" style="padding:40px;margin-bottom:24px;border-top:3px solid #6366f1;"><h2 style="margin-bottom:8px;">Today's Mission</h2><p style="color:#71717a;margin-bottom:32px;">Answer 3 questions to earn a 50 PTS bonus.</p><div style="font-size:3.5rem;font-weight:800;color:#6366f1;font-family:'Outfit';margin-bottom:24px;">${prog} / 3</div><div class="progress-track"><div class="progress-fill" style="width:${Math.min(prog/3*100,100)}%;"></div></div><div style="margin-top:32px;">` + [1,2,3].map(n => `<div style="display:flex;align-items:center;gap:16px;padding:16px;background:${prog>=n?'rgba(99,102,241,0.1)':'#0a0a0a'};border-radius:12px;border:1px solid ${prog>=n?'#6366f1':'rgba(255,255,255,0.06)'};margin-bottom:12px;"><div style="width:32px;height:32px;border-radius:50%;background:${prog>=n?'#6366f1':'#27272a'};display:flex;align-items:center;justify-content:center;font-size:0.8rem;font-weight:800;">${prog>=n?'✓':n}</div><div style="flex:1;"><div style="font-weight:700;color:white;">Answer ${n} Question${n>1?'s':''}</div><div style="font-size:0.75rem;color:#71717a;">+${n*20} PTS reward</div></div></div>`).join('') + `</div><button class="btn-primary" style="margin-top:32px;width:100%;padding:16px;font-size:1rem;${done?'':'opacity:0.5;cursor:not-allowed;'}" ${done?'onclick="claimGauntlet()"':'disabled'}>${done?'🏆 Claim 50 PTS Bonus':'Go answer doubts to progress'}</button></div><div style="text-align:center;"><button class="btn-ghost" style="width:100%; justify-content:center;" onclick="navigateTo('warroom')">Find Doubts to Solve →</button></div>`;
}

async function claimGauntlet() {
  if ((profile?.gauntlet_progress || 0) < 3) return;
  await db.from('users').update({ points: (profile.points||0) + 50, gauntlet_progress: 0 }).eq('id', session.user.id);
  profile.points += 50; profile.gauntlet_progress = 0; updateMetrics();
  await logTransaction(50, "Gauntlet Mission Complete", "EARN");
  toast('🏆 Gauntlet Complete! +50 PTS claimed!'); go('gauntlet');
}

function renderLibrary() {
  const cont = document.getElementById('view-library');
  if (!cont) return;
  const saved = JSON.parse(localStorage.getItem('sq_library') || '[]');
  const bookmarked = questions.filter(q => saved.includes(q.id));
  cont.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:40px;"><h1 style="font-size:2rem;font-weight:800;">My Library</h1><span style="font-size:0.75rem;color:#71717a;">${bookmarked.length} saved</span></div>` + (bookmarked.length === 0 ? '<div class="empty-state"><div style="font-size:2rem;margin-bottom:16px;">📚</div><h3 style="margin-bottom:8px;color:white;">Library Empty</h3><p style="color:#71717a;margin-bottom:24px;">Bookmark questions to save them here.</p><button class="btn-primary" onclick="navigateTo(\'warroom\')">Browse War Room</button></div>' : bookmarked.map(q => `<div class="doubt-card" onclick="navigateTo('question','${q.id}')" style="margin-bottom:12px;"><div class="subject-icon-box">${ICONS[q.subject]||'🧠'}</div><div><h3 style="font-size:0.95rem;font-weight:700;color:white;margin-bottom:4px;">${q.title}</h3><span style="font-size:0.7rem;color:#71717a;">${q.subject}</span></div><button onclick="event.stopPropagation();removeBookmark('${q.id}')" style="background:none;border:1px solid rgba(255,255,255,0.1);color:#71717a;border-radius:8px;padding:6px 12px;cursor:pointer;font-size:0.7rem;">Remove</button></div>`).join(''));
}

function saveBookmarkFromDetail() { if (currentQId) saveBookmark(currentQId); }
function saveBookmark(id) {
  const saved = JSON.parse(localStorage.getItem('sq_library') || '[]');
  if (!saved.includes(id)) { saved.push(id); localStorage.setItem('sq_library', JSON.stringify(saved)); toast('Saved to Library!'); } else toast('Already in Library.');
}
function removeBookmark(id) {
  const saved = JSON.parse(localStorage.getItem('sq_library') || '[]').filter(x => x !== id);
  localStorage.setItem('sq_library', JSON.stringify(saved)); toast('Removed from Library.'); renderLibrary();
}

function renderInstructions() {
  const cont = document.getElementById('view-instructions');
  if (!cont) return;
  cont.innerHTML = `<h1 style="font-size:2rem;font-weight:800;margin-bottom:8px;">How to Use ScholarQ</h1><p style="color:#71717a;margin-bottom:48px;">Your complete guide to the Academy Operating System.</p>` + [
    { icon:'📡', title:'Post a Doubt', desc:'Click "+ Post Doubt" in the top bar. Pick a subject and broadcast it. Scholars spend 0 points to ask — earners gain from solving.' },
    { icon:'⚔️', title:'Solve in the War Room', desc:'Go to War Room to see all open doubts. Answer a question to earn 20+ PTS based on your multiplier. BLITZ doubts are unanswered.' },
    { icon:'🏆', title:'Daily Gauntlet', desc:'Answer 3 questions per day to complete the Gauntlet. Claim a 50 PTS bonus once done.' },
    { icon:'🗄️', title:'The Vault', desc:'Buy and sell academic resources (notes, PPTs). Set a price in PTS and earn when others unlock it.' },
    { icon:'📚', title:'My Library', desc:'Save important questions for later access.' },
    { icon:'⚡', title:'Hyper-Boost', desc:'Adds +0.5x to your multiplier temporarily.' },
    { icon:'🛡️', title:'Trust Score', desc:'Grows as you solve more. High trust unlocks better badges.' }
  ].map(s => `<div class="widget-content" style="padding:28px;margin-bottom:16px;display:flex;gap:24px;align-items:start;"><div style="font-size:2rem;flex-shrink:0;">${s.icon}</div><div><h3 style="font-size:1rem;font-weight:800;margin-bottom:8px;color:white;">${s.title}</h3><p style="color:#a1a1aa;line-height:1.7;font-size:0.9rem;">${s.desc}</p></div></div>`).join('');
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function makeCard(q) {
  const sym = ICONS[q.subject] || '🧠';
  const mult = isBoosted ? parseFloat(profile?.multiplier || 1) + 0.5 : parseFloat(profile?.multiplier || 1);
  const pts = Math.floor(20 * mult);
  return `<div class="doubt-card" onclick="navigateTo('question','${q.id}')"><div class="subject-icon-box">${sym}</div><div><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;"><h3 style="font-size:0.95rem;font-weight:700;color:white;">${q.title}</h3>${q.answers.length===0?'<span class="pts-badge" style="background:#ef4444;font-size:0.5rem;padding:2px 6px;">BLITZ</span>':''}</div><span style="font-size:0.7rem;color:#71717a;">${q.subject} · ${timeAgo(q.created_at)}</span></div><div class="pts-badge">+${pts} PTS</div></div>`;
}

function updateMetrics() {
  if (!profile) return;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.innerText = val; };
  set('hub-user-name', profile.name); set('side-points', profile.points); set('stat-status', profile.status_badge);
  set('stat-streak', profile.streak + ' Days'); set('stat-trust', profile.trust_score + '%');
  set('stat-multiplier', parseFloat(profile.multiplier).toFixed(2) + 'x');
  set('gauntlet-count', (profile.gauntlet_progress || 0) + ' / 3');
  const fill = document.getElementById('gauntlet-fill');
  if (fill) fill.style.width = Math.min(((profile.gauntlet_progress || 0) / 3) * 100, 100) + '%';
  const av = document.getElementById('user-avatar'); if (av) av.innerText = profile.name[0].toUpperCase();
}

async function loadContributors() {
  const { data } = await db.from('users').select('*').order('points', { ascending: false }).limit(3);
  const cont = document.getElementById('top-contributors-list'); if (!cont || !data) return;
  cont.innerHTML = data.map(u => `<div style="display:flex;justify-content:space-between;align-items:center;background:#121214;padding:16px;border-radius:16px;border:1px solid rgba(255,255,255,0.06);margin-bottom:12px;"><div style="display:flex;gap:12px;align-items:center;"><div style="width:36px;height:36px;background:var(--grad-main);border-radius:10px;display:flex;align-items:center;justify-content:center;color:white;font-weight:800;">${u.name[0]}</div><div><div style="font-size:0.85rem;font-weight:700;color:white;">${u.name}</div><div style="font-size:0.6rem;color:#6366f1;font-weight:800;">${u.status_badge || 'SCHOLAR'}</div></div></div><div style="font-weight:800;color:#71717a;">${(u.points/1000).toFixed(1)}k</div></div>`).join('');
}

async function logTransaction(amount, description, type) {
  try { await db.from('transactions').insert([{ user_id: session.user.id, amount, description, type }]); } catch(e) {}
}

async function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value, password = document.getElementById('auth-password').value;
  const { error } = await db.auth.signInWithPassword({ email, password });
  if (error) { const { error: e2 } = await db.auth.signUp({ email, password }); if (e2) toast(e2.message); else toast('Confirmation email sent!'); } else toast('Welcome back!');
}

async function handleAsk(e) {
  e.preventDefault();
  const title = document.getElementById('ask-title').value, subject = document.getElementById('ask-subject').value, body = document.getElementById('ask-body').value;
  await db.from('questions').insert([{ id: 'q_' + Date.now(), title, subject, body, asker_id: session.user.id, asker_name: profile.name }]);
  toast('Doubt broadcasted!'); await refreshData(); go('home');
}

async function handleAnswer(e) {
  e.preventDefault();
  const body = document.getElementById('answer-body').value;
  await db.from('answers').insert([{ id: 'a_' + Date.now(), question_id: currentQId, author_id: session.user.id, author_name: profile.name, body }]);
  const pts = Math.floor(20 * parseFloat(profile.multiplier || 1));
  await db.from('users').update({ points: (profile.points || 0) + pts, gauntlet_progress: (profile.gauntlet_progress || 0) + 1 }).eq('id', session.user.id);
  profile.points += pts; profile.gauntlet_progress += 1;
  await logTransaction(pts, "Solved Doubt", "EARN");
  toast('Solution posted! +' + pts + ' PTS'); document.getElementById('answer-form').reset();
  await refreshData(); go('question', currentQId);
}

async function handleSell(e) {
  e.preventDefault();
  await db.from('marketplace').insert([{ id: 'm_' + Date.now(), title: document.getElementById('sell-title').value, price: parseInt(document.getElementById('sell-price').value), link: document.getElementById('sell-link').value, seller_id: session.user.id, seller_name: profile.name }]);
  toast('Resource published!'); closeSellModal(); renderMarketplace();
}

async function signInWithGoogle() { await db.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } }); }
async function logout() { await db.auth.signOut(); window.location.reload(); }
function openSellModal() { document.getElementById('modal-sell').style.display = 'flex'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }
function handleSearch(val) { currentSearch = val; if (currentView === 'home') renderHome(); if (currentView === 'warroom') renderWarRoom(); }
function setFilter(f) { currentFilter = f; document.querySelectorAll('.filter-chip').forEach(c => c.classList.toggle('active', c.innerText === (f==='All'?'All Pulse':f==='Computer Science'?'CS':f))); renderWarRoom(); }
function toggleBoost() { isBoosted = !isBoosted; toast(isBoosted ? 'Hyper-Boost Active!' : 'Boost offline.'); renderHome(); }
function showInvite() { toast('Invite link copied!'); }
function showNotifications() { toast('No new alerts.'); }
function toast(msg) {
  const cont = document.getElementById('toast-container'); if (!cont) return;
  const t = document.createElement('div'); t.className = 'toast'; t.innerText = msg; cont.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}
function timeAgo(d) { const s = Math.floor((new Date() - new Date(d)) / 1000); if (s < 60) return 'now'; if (s < 3600) return Math.floor(s / 60) + 'm ago'; return Math.floor(s / 3600) + 'h ago'; }
