// ScholarQ - E-Online Aesthetic Edition (V109)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null, profile = null, questions = [], currentView = 'auth', currentQuestionId = null;
let currentSearch = '', currentFilter = 'All', isDarkMode = localStorage.getItem('scholarq_theme') === 'dark';
let gauntletStep = 0, isInitializing = true;

const HERO_IMG = 'scholar_hero_concept_1778662852223.png'; // Generated Asset

document.addEventListener('DOMContentLoaded', async () => {
  if (isDarkMode) document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeIcon(); lucide.createIcons();
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
  const overlay = document.getElementById('init-overlay');
  if (overlay) overlay.style.display = 'none';
}

async function fetchProfile() {
  if (!session) return false;
  try {
    const { data, error } = await supabaseClient.from('users').select('*').eq('id', session.user.id).maybeSingle();
    if (data && !error) { profile = data; updateGlobalUI(); return true; }
    return false;
  } catch (e) { return false; }
}

function navigateTo(view, param = null) {
  if (!session && view !== 'auth') view = 'auth';
  document.querySelectorAll('.view').forEach(v => { v.style.display = 'none'; v.style.opacity = '0'; });
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  currentView = view;
  const side = document.getElementById('sidebar'), top = document.getElementById('top-bar');
  if (view === 'auth' || view === 'finish-profile') { side.style.display = 'none'; }
  else { side.style.display = 'flex'; const nav = document.getElementById(`nav-${view}`); if (nav) nav.classList.add('active'); }
  const el = document.getElementById(`view-${view}`);
  if (el) { el.style.display = 'block'; setTimeout(() => el.style.opacity = '1', 50); }
  if (view === 'home') renderHome();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
  if (view === 'marketplace') renderMarketplace();
  if (view === 'question') { currentQuestionId = param; renderQuestionDetail(); }
  lucide.createIcons();
}

async function fetchQuestions() {
  const { data: q } = await supabaseClient.from('questions').select('*').order('boosted', { ascending: false }).order('created_at', { ascending: false });
  const { data: a } = await supabaseClient.from('answers').select('*').order('created_at', { ascending: true });
  const authors = (await supabaseClient.from('users').select('id, credibility')).data || [];
  const authMap = authors.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.credibility || 100 }), {});
  questions = (q || []).map(item => ({ ...item, answers: (a || []).filter(ans => ans.question_id === item.id).sort((x, y) => (authMap[y.author_id] || 0) - (authMap[x.author_id] || 0)) }));
  if (currentView === 'home') renderHome();
}

// E-ONLINE VISUAL HUB (V109)
function renderHome() {
  const view = document.getElementById('view-home');
  view.innerHTML = `
    <!-- HERO SECTION -->
    <section class="hero-section">
      <div>
        <h1 class="hero-title">Investing in <span>Knowledge</span> and Your Future</h1>
        <p style="font-size:1.2rem; color:var(--text-secondary); margin-bottom:40px; max-width:500px;">Our academic ecosystem is built to deliver multimedia learning solutions and peer-to-peer mentorship for your growth.</p>
        <div style="display:flex; gap:24px; align-items:center;">
          <button onclick="navigateTo('ask')" class="btn-primary">Post a Doubt</button>
          <div style="display:flex; gap:16px;">
            <div><strong style="font-size:1.5rem; display:block;">50+</strong><small style="color:var(--text-muted); font-weight:800; font-size:0.6rem;">SUBJECTS</small></div>
            <div style="width:1px; background:var(--border); height:40px;"></div>
            <div><strong style="font-size:1.5rem; display:block;">1M+</strong><small style="color:var(--text-muted); font-weight:800; font-size:0.6rem;">SOLUTIONS</small></div>
          </div>
        </div>
      </div>
      <div style="position:relative;">
        <img src="${HERO_IMG}" style="width:100%; border-radius:30px; box-shadow:var(--shadow-deep);">
        <div class="glass-card" style="position:absolute; top:-20px; left:-20px; padding:12px 20px; display:flex; align-items:center; gap:12px;">
          <div style="width:32px; height:32px; background:var(--p-500); border-radius:50%; display:flex; align-items:center; justify-content:center;"><i data-lucide="users" style="width:16px; color:white;"></i></div>
          <div><div style="font-weight:900; font-size:0.8rem;">175K</div><div style="font-size:0.5rem; opacity:0.6;">Active Students</div></div>
        </div>
      </div>
    </section>

    <!-- VIBRANT CATEGORY GRID -->
    <h2 style="margin-bottom:32px; font-weight:800;">Browse Academy Domains</h2>
    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:24px; margin-bottom:80px;">
      <div class="category-card" style="background:var(--grad-pink);" onclick="setFilter('Math')">
        <i data-lucide="calculator"></i>
        <h3>Advanced<br>Mathematics</h3>
      </div>
      <div class="category-card" style="background:var(--grad-cyan);" onclick="setFilter('Science')">
        <i data-lucide="flask-conical"></i>
        <h3>Theoretical<br>Science</h3>
      </div>
      <div class="category-card" style="background:var(--grad-orange);" onclick="setFilter('History')">
        <i data-lucide="landmark"></i>
        <h3>Historical<br>Archives</h3>
      </div>
      <div class="category-card" style="background:var(--grad-purple);" onclick="setFilter('Comp Sci')">
        <i data-lucide="code"></i>
        <h3>Computer<br>Science</h3>
      </div>
    </div>

    <!-- MAIN HUB GRID -->
    <div class="hub-grid">
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:24px;">
          <h2 style="font-weight:800;">Recent Activity</h2>
          <button onclick="setFilter('All')" style="background:none; border:none; color:var(--p-500); font-weight:800; cursor:pointer;">Browse All <i data-lucide="arrow-right" style="width:14px; vertical-align:middle;"></i></button>
        </div>
        <div id="hub-questions"></div>
      </div>
      <div>
        <div id="mastery-container" class="glass-card" style="margin-bottom:24px;"></div>
        <div class="glass-card">
          <h3 style="font-size:0.9rem; margin-bottom:12px;">Academy Pulse</h3>
          <div style="font-size:0.75rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:12px;">
            <div style="display:flex; justify-content:space-between;"><span>Status</span><span style="color:var(--success); font-weight:800;">🟢 STABLE</span></div>
            <div style="display:flex; justify-content:space-between;"><span>Network Load</span><span>LOW</span></div>
            <div style="display:flex; justify-content:space-between;"><span>Trust Index</span><span style="color:var(--p-500);">98.4%</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
  renderHubQuestions();
  renderMicroTasks();
  lucide.createIcons();
}

function setFilter(f) { currentFilter = f; renderHome(); }

function renderHubQuestions() {
  const cont = document.getElementById('hub-questions');
  const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter));
  cont.innerHTML = `<div style="display:grid; grid-template-columns:1fr; gap:16px;">
    ${list.map(q => `<div class="glass-card" style="padding:24px; cursor:pointer; border-left:${q.boosted?'4px solid var(--p-500)':'1px solid var(--border)'};" onclick="navigateTo('question', '${q.id}')">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <span class="badge" style="background:rgba(255,255,255,0.05); color:white;">${q.subject}</span>
        <span style="font-size:0.7rem; color:var(--text-secondary);">${getTimeAgo(q.created_at)}</span>
      </div>
      <h3 style="font-size:1.1rem; line-height:1.4; font-weight:700;">${escapeHTML(q.title)}</h3>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; font-size:0.75rem; color:var(--text-secondary);">
        <span>By ${q.asker_name}</span>
        <span style="font-weight:700; color:var(--p-500);">${q.answers?.length || 0} Solutions</span>
      </div>
    </div>`).join('')}
  </div>`;
}

function renderMicroTasks() {
  const cont = document.getElementById('mastery-container');
  const today = new Date().toISOString().split('T')[0];
  if (profile.last_challenge_date === today) {
    cont.innerHTML = `<h3>Daily Mastery</h3><p style="font-size:0.8rem; opacity:0.6;">✅ Challenge Complete. Check back tomorrow.</p>`;
    return;
  }
  const c = [{q:"E = mc² creator?",a:"Einstein",b:"Tesla"}, {q:"H2O name?",a:"Water",b:"Salt"}, {q:"3x+5=20?",a:"5",b:"6"}][gauntletStep];
  cont.innerHTML = `
    <div style="font-size:0.7rem; font-weight:900; color:var(--p-500); margin-bottom:12px;">DAILY MASTERY ${gauntletStep+1}/3</div>
    <p style="font-weight:700; font-size:1rem; margin-bottom:20px;">${c.q}</p>
    <div style="display:flex; gap:8px;">
      <button onclick="handleGauntlet(true)" class="btn-primary" style="flex:1; justify-content:center; padding:10px; font-size:0.8rem;">${c.a}</button>
      <button onclick="handleGauntlet(false)" class="glass-card" style="flex:1; justify-content:center; padding:10px; font-size:0.8rem;">${c.b}</button>
    </div>
  `;
}

// REST OF CORE (V108 HARDENED)
async function handleGauntlet(correct) { if (!correct) { gauntletStep = 0; showToast('Incorrect.', 'error'); return renderMicroTasks(); } gauntletStep++; if (gauntletStep >= 3) { await supabaseClient.from('users').update({ points: (profile.points || 0) + 10, last_challenge_date: new Date().toISOString().split('T')[0] }).eq('id', session.user.id); showToast(`Daily Mastery! +10 pts.`, 'success'); gauntletStep = 0; await fetchProfile(); renderHome(); } else { renderMicroTasks(); } }
function updateGlobalUI() { document.querySelectorAll('#dash-points, #top-points').forEach(el => el.innerText = profile.points); const role = (profile.points >= 1000) ? 'Verified Mentor' : (profile.points >= 500 ? 'Top Contributor' : 'Active Student'); document.getElementById('dash-role').innerText = role; const credCont = document.getElementById('profile-credibility') || document.createElement('div'); credCont.id = 'profile-credibility'; credCont.style.cssText = "margin-top:8px; font-size:0.75rem;"; credCont.innerHTML = `<div style="color:var(--p-500); font-weight:800;">Trust: ${profile.credibility || 100}%</div>`; document.getElementById('dash-role').appendChild(credCont); lucide.createIcons(); }
async function handleAuth(e) { e.preventDefault(); const em = document.getElementById('auth-email').value, pw = document.getElementById('auth-password').value; if (authMode === 'signup') { const nm = document.getElementById('auth-name').value, sc = parseInt(document.getElementById('auth-score').value) || 0; const { data, error } = await supabaseClient.auth.signUp({ email: em, password: pw }); if (error) return showToast(error.message, 'error'); await supabaseClient.from('users').insert([{ id: data.user.id, name: nm, points: 50, role: (sc >= 90 ? 'scholar' : 'student'), percentage: sc, email: em, credibility: 100 }]); showToast('Verification email sent.', 'info'); } else { const { error } = await supabaseClient.auth.signInWithPassword({ email: em, password: pw }); if (error) return showToast(error.message, 'error'); } }
async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
function openSellModal() { document.getElementById('modal-sell').style.display = 'block'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); }).subscribe(); }
function updateThemeIcon() { const i = document.getElementById('theme-icon'); if (i) i.setAttribute('data-lucide', isDarkMode ? 'sun' : 'moon'); lucide.createIcons(); }
function toggleDarkMode() { isDarkMode = !isDarkMode; document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light'); localStorage.setItem('scholarq_theme', isDarkMode ? 'dark' : 'light'); updateThemeIcon(); }
async function handleDailyLogin() { const today = new Date().toISOString().split('T')[0]; if (profile.last_login === today) return; await supabaseClient.from('users').update({ last_login: today, streak: (profile.streak || 0) + 1, points: (profile.points || 0) + 10 }).eq('id', session.user.id); await fetchProfile(); }
async function handleAsk(e) { e.preventDefault(); const t = document.getElementById('ask-title').value, s = document.getElementById('ask-subject').value, b = document.getElementById('ask-body').value; const { error } = await supabaseClient.from('questions').insert([{ id: 'q_'+Date.now(), title: t, subject: s, body: b, asker_id: session.user.id, asker_name: profile.name, status: 'open' }]); if (!error) { showToast('Question broadcasted.', 'success'); fetchQuestions(); navigateTo('home'); } }
async function handleAnswer(e) { e.preventDefault(); const b = document.getElementById('answer-body').value; const { error } = await supabaseClient.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQuestionId, body: b, author_id: session.user.id, author_name: profile.name, author_role: profile.role, upvotes: 0 }]); if (!error) { showToast('Solution submitted.', 'success'); fetchQuestions(); fetchProfile(); } }
async function handleFinishProfile(e) { e.preventDefault(); const sc = parseInt(document.getElementById('finish-score').value), nm = session.user.user_metadata.full_name || session.user.email.split('@')[0]; const newP = { id: session.user.id, name: nm, points: 50, role: (sc >= 90 ? 'scholar' : 'student'), percentage: sc, email: session.user.email, credibility: 100 }; const { error } = await supabaseClient.from('users').upsert([newP]); if (!error) { profile = newP; navigateTo('home'); } }
async function signInWithGoogle() { await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } }); }
function getTimeAgo(date) { const seconds = Math.floor((new Date() - new Date(date)) / 1000); if (seconds < 60) return 'Just now'; if (seconds < 3600) return Math.floor(seconds/60) + 'm ago'; return Math.floor(seconds/3600) + 'h ago'; }
function escapeHTML(s) { return s?.replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":"&#39;",'"':"&quot;"}[t])) || ''; }
function showToast(msg, type='info') { const cont = document.getElementById('toast-container'); const t = document.createElement('div'); t.className='glass-card'; t.style.cssText=`padding:12px 24px; margin-bottom:12px; font-weight:800; border-left:5px solid ${type==='error'?'#ef4444':'#8b5cf6'};`; t.innerText=msg; cont.appendChild(t); setTimeout(()=>t.remove(), 3000); }
async function renderMarketplace() { const cont = document.getElementById('market-list'); cont.innerHTML = '<div style="padding:40px; text-align:center; opacity:0.5;">Accessing Vault...</div>'; const { data: allItems } = await supabaseClient.from('marketplace_items').select('*'); const { data: myP } = await supabaseClient.from('purchases').select('item_id').eq('user_id', session.user.id); const pIds = (myP || []).map(p => p.item_id); if (allItems) { cont.innerHTML = `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:24px; width:100%;">${allItems.map(it => { const isB = pIds.includes(it.id) || it.seller_id === session.user.id; return `<div class="glass-card" style="padding:24px; display:flex; flex-direction:column; justify-content:space-between;"><div><div style="display:flex; justify-content:space-between; margin-bottom:16px;"><span class="badge">TRUSTED</span><strong style="color:var(--p-500);">${it.price} PTS</strong></div><h3 style="margin-bottom:8px;">${escapeHTML(it.title)}</h3><p style="font-size:0.8rem; margin-bottom:16px;">${it.seller_name}</p></div>${isB ? `<a href="${it.link}" target="_blank" class="btn-primary" style="text-decoration:none; justify-content:center;">Open</a>` : `<button onclick="handleBuyItem('${it.id}', ${it.price}, '${it.seller_id}')" class="btn-primary" style="justify-content:center;">Unlock</button>`}</div>`; }).join('')}</div>`; } lucide.createIcons(); }
function renderLeaderboard() { const cont = document.getElementById('view-leaderboard'); cont.innerHTML = '<div style="padding:40px; text-align:center; opacity:0.5;">Ranking Leaders...</div>'; supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(20).then(({data}) => { if(data) cont.innerHTML = `<h1 style="text-align:center; margin-bottom:40px;">Academy Leaders</h1><div style="display:grid; gap:16px;">${data.map((u, i) => `<div class="glass-card" style="display:flex; align-items:center; gap:24px; border-bottom:4px solid ${i<3?'var(--p-500)':'transparent'}"><div style="font-size:1.5rem; font-weight:900; color:var(--text-muted); min-width:40px;">#${i+1}</div><div style="flex:1;"><h3>${u.name}</h3><span class="badge" style="margin-top:4px; display:inline-block;">${(u.points >= 1000) ? 'Mentor' : 'Scholar'}</span></div><div style="text-align:right;"><strong style="color:var(--p-500); font-size:1.2rem;">${u.points}</strong></div></div>`).join('')}</div>`; }); }
function renderProfile() { if (!profile) return; document.getElementById('profile-name').innerText = profile.name; document.getElementById('profile-email').innerText = profile.email; document.getElementById('profile-avatar').innerText = profile.name[0].toUpperCase(); document.getElementById('profile-points').innerText = profile.points; document.getElementById('profile-asked').innerText = questions.filter(q => q.asker_id === profile.id).length; }
function renderQuestionDetail() { const q = questions.find(x => x.id === currentQuestionId); if (!q) return; document.getElementById('qd-content').innerHTML = `<div class="glass-card" style="padding:32px;"><h2 style="margin-bottom:16px;">${escapeHTML(q.title)}</h2><p style="color:var(--text-primary);">${escapeHTML(q.body)}</p></div>`; const ansCont = document.getElementById('qd-answers'); ansCont.innerHTML = `<h3 style="margin:32px 0 16px 0;">Solutions</h3>`; (q.answers || []).forEach(a => { const isB = q.best_answer_id === a.id; ansCont.innerHTML += `<div class="glass-card" style="padding:24px; margin-bottom:16px; border-left:4px solid ${isB?'var(--success)':'var(--border)'};"><div><strong>${a.author_name}</strong></div><p>${escapeHTML(a.body)}</p></div>`; }); lucide.createIcons(); }
