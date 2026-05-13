// ScholarQ - Academy OS (V111 Backend-Sync Edition)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null, profile = null, questions = [], currentView = 'auth';
let currentFilter = 'All', gauntletStep = 0, isInitializing = true;
const HERO_IMG = 'scholar_hero_concept_1778662852223.png';

document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  const { data: { session: s } } = await supabaseClient.auth.getSession();
  await handleSessionUpdate(s);
  supabaseClient.auth.onAuthStateChange(async (e, s) => { if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') await handleSessionUpdate(s); });
  
  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
  document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
  document.getElementById('finish-profile-form')?.addEventListener('submit', handleFinishProfile);
  document.getElementById('sell-form')?.addEventListener('submit', handleSell);
});

async function handleSessionUpdate(newS) {
  session = newS;
  if (session) {
    const ok = await fetchProfile();
    if (ok) {
      await handleDailyLogin(); await fetchQuestions(); setupSubscriptions();
      if (currentView === 'auth' || isInitializing) navigateTo('home');
    } else { navigateTo('finish-profile'); }
  } else { navigateTo('auth'); }
  isInitializing = false;
  document.getElementById('init-overlay').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
}

async function fetchProfile() {
  if (!session) return false;
  const { data } = await supabaseClient.from('users').select('*').eq('id', session.user.id).maybeSingle();
  if (data) { profile = data; updateGlobalUI(); return true; }
  return false;
}

function navigateTo(view, param = null) {
  if (!session && view !== 'auth') view = 'auth';
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const target = document.getElementById(`view-${view}`);
  if (target) target.style.display = (view === 'auth' ? 'flex' : 'block');
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`nav-${view}`)?.classList.add('active');
  if (view === 'home') renderHome();
  if (view === 'marketplace') renderMarketplace();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
  if (view === 'question') renderQuestionDetail(param);
  lucide.createIcons();
}

async function fetchQuestions() {
  const { data: q } = await supabaseClient.from('questions').select('*').order('boosted', { ascending: false }).order('created_at', { ascending: false });
  const { data: a } = await supabaseClient.from('answers').select('*');
  questions = (q || []).map(item => ({ ...item, answers: (a || []).filter(ans => ans.question_id === item.id) }));
  if (currentView === 'home') renderHome();
}

function renderHome() {
  const view = document.getElementById('view-home');
  view.innerHTML = `
    <section class="hero-section">
      <div><h1 class="hero-title">Investing in <span>Knowledge</span></h1><p style="color:var(--text-secondary); margin-bottom:32px;">Join the elite academic ecosystem.</p><button onclick="navigateTo('ask')" class="btn-primary">Post Doubt</button></div>
      <div><img src="${HERO_IMG}" style="width:100%; border-radius:30px; box-shadow:var(--shadow-deep);"></div>
    </section>
    <div class="category-grid">
      <div class="category-card" style="background:var(--grad-pink);" onclick="setFilter('Math')"><i data-lucide="calculator"></i><h3>Math</h3></div>
      <div class="category-card" style="background:var(--grad-cyan);" onclick="setFilter('Science')"><i data-lucide="flask-conical"></i><h3>Science</h3></div>
      <div class="category-card" style="background:var(--grad-orange);" onclick="setFilter('History')"><i data-lucide="landmark"></i><h3>History</h3></div>
      <div class="category-card" style="background:var(--grad-purple);" onclick="setFilter('Comp Sci')"><i data-lucide="code"></i><h3>Computing</h3></div>
    </div>
    <div class="hub-grid">
      <div id="hub-questions"></div>
      <div><div id="mastery-widget" class="glass-card" style="margin-bottom:24px;"></div><div class="glass-card" style="padding:20px;"><h3>Pulse</h3><div id="pulse-data" style="font-size:0.75rem; margin-top:12px;"></div></div></div>
    </div>
  `;
  renderHubQuestions(); renderMicroTasks(); renderPulse();
}

function renderHubQuestions() {
  const cont = document.getElementById('hub-questions');
  const list = questions.filter(q => currentFilter === 'All' || q.subject === currentFilter);
  cont.innerHTML = list.map(q => `<div class="glass-card" style="margin-bottom:16px; border-left:4px solid ${q.boosted?'var(--p-500)':'var(--border)'}; cursor:pointer;" onclick="navigateTo('question', '${q.id}')"><span class="badge">${q.subject}</span><h3 style="margin:12px 0;">${q.title}</h3><div style="font-size:0.7rem; opacity:0.6;">By ${q.asker_name} • ${q.answers?.length || 0} Solutions</div></div>`).join('');
}

function renderMicroTasks() {
  const cont = document.getElementById('mastery-widget');
  const today = new Date().toISOString().split('T')[0];
  if (profile.last_challenge_date === today) { cont.innerHTML = `<h3>Daily Mastery</h3><p style="font-size:0.8rem; opacity:0.5; margin-top:8px;">✅ Complete.</p>`; return; }
  const c = [{q:"E = mc² creator?",a:"Einstein"}, {q:"H2O?",a:"Water"}, {q:"3x+5=20?",a:"5"}][gauntletStep];
  cont.innerHTML = `<div style="font-size:0.7rem; font-weight:900; color:var(--p-500); margin-bottom:12px;">DAILY MASTERY</div><p style="font-weight:700; margin-bottom:16px;">${c.q}</p><button onclick="handleGauntlet(true)" class="btn-primary" style="width:100%; justify-content:center;">${c.a}</button>`;
}

async function handleGauntlet(correct) { 
  gauntletStep++; 
  if (gauntletStep >= 3) {
    const today = new Date().toISOString().split('T')[0];
    await supabaseClient.from('users').update({ points: (profile.points || 0) + 10, last_challenge_date: today }).eq('id', session.user.id);
    gauntletStep = 0; await fetchProfile(); renderHome();
  } else { renderMicroTasks(); }
}

async function handleAuth(e) {
  e.preventDefault();
  const em = document.getElementById('auth-email').value, pw = document.getElementById('auth-password').value;
  const { data, error } = await supabaseClient.auth.signInWithPassword({ email: em, password: pw });
  if (error) {
    const { data: up, error: upErr } = await supabaseClient.auth.signUp({ email: em, password: pw });
    if (upErr) alert(upErr.message);
  }
}

async function handleFinishProfile(e) {
  e.preventDefault();
  const sc = parseInt(document.getElementById('finish-score').value), nm = session.user.email.split('@')[0];
  const newP = { id: session.user.id, email: session.user.email, name: nm, points: 50, role: (sc>=90?'scholar':'student'), percentage: sc, credibility: 100 };
  await supabaseClient.from('users').upsert([newP]);
  profile = newP; navigateTo('home');
}

async function handleAsk(e) {
  e.preventDefault();
  const t = document.getElementById('ask-title').value, s = document.getElementById('ask-subject').value, b = document.getElementById('ask-body').value;
  await supabaseClient.from('questions').insert([{ id: 'q_'+Date.now(), title: t, subject: s, body: b, asker_id: session.user.id, asker_name: profile.name, boosted: false }]);
  fetchQuestions(); navigateTo('home');
}

async function handleAnswer(e) {
  e.preventDefault();
  const b = document.getElementById('answer-body').value;
  await supabaseClient.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQuestionId, author_id: session.user.id, author_name: profile.name, body: b }]);
  fetchQuestions(); navigateTo('question', currentQuestionId);
}

function updateGlobalUI() { document.getElementById('profile-points').innerText = profile.points; document.getElementById('dash-points').innerText = profile.points; }
function renderPulse() { document.getElementById('pulse-data').innerHTML = `<div style="display:flex; justify-content:space-between;"><span>Trust Index</span><span style="color:var(--p-500); font-weight:800;">${profile.credibility}%</span></div>`; }
function setFilter(f) { currentFilter = f; renderHome(); }
async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
function openSellModal() { document.getElementById('modal-sell').style.display = 'flex'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); }).subscribe(); }
async function handleDailyLogin() { const today = new Date().toISOString().split('T')[0]; if (profile.last_login === today) return; await supabaseClient.from('users').update({ last_login: today, streak: (profile.streak || 0) + 1, points: (profile.points || 0) + 10 }).eq('id', session.user.id); await fetchProfile(); }
function renderMarketplace() { const cont = document.getElementById('market-list'); supabaseClient.from('marketplace_items').select('*').then(({data}) => { if (data) cont.innerHTML = `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(250px, 1fr)); gap:24px;">${data.map(it => `<div class="glass-card"><h3>${it.title}</h3><p>${it.price} PTS</p><button class="btn-primary" style="margin-top:16px;">Unlock</button></div>`).join('')}</div>`; }); }
function renderLeaderboard() { const cont = document.getElementById('view-leaderboard'); supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(20).then(({data}) => { if(data) cont.innerHTML = `<h1>Leaders</h1><div style="display:grid; gap:12px; margin-top:24px;">${data.map((u, i) => `<div class="glass-card" style="display:flex; justify-content:space-between; align-items:center;"><div><strong>#${i+1} ${u.name}</strong></div><div style="color:var(--p-500); font-weight:800;">${u.points}</div></div>`).join('')}</div>`; }); }
function renderProfile() { document.getElementById('profile-name').innerText = profile.name; document.getElementById('profile-email').innerText = profile.email; document.getElementById('profile-points').innerText = profile.points; }
function renderQuestionDetail(id) { currentQuestionId = id; const q = questions.find(x => x.id === id); if (!q) return; document.getElementById('qd-content').innerHTML = `<div class="glass-card"><h2>${q.title}</h2><p style="margin-top:16px;">${q.body}</p></div>`; document.getElementById('qd-answers').innerHTML = (q.answers || []).map(a => `<div class="glass-card" style="margin-top:12px;"><strong>${a.author_name}</strong><p>${a.body}</p></div>`).join(''); }
function handleSell(e) { e.preventDefault(); const t = document.getElementById('sell-title').value, p = parseInt(document.getElementById('sell-price').value); supabaseClient.from('marketplace_items').insert([{ id: 'm_'+Date.now(), title: t, price: p, link: '#', seller_id: session.user.id, seller_name: profile.name }]).then(() => { closeSellModal(); renderMarketplace(); }); }
