// ScholarQ - Professional Academic Edition (V106)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null, profile = null, questions = [], currentView = 'auth', currentQuestionId = null;
let currentSearch = '', currentFilter = 'All', isDarkMode = localStorage.getItem('scholarq_theme') === 'dark';
let gauntletStep = 0;

document.addEventListener('DOMContentLoaded', async () => {
  if (isDarkMode) document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeIcon(); lucide.createIcons();
  setTimeout(async () => {
    const { data: { session: s } } = await supabaseClient.auth.getSession();
    await handleSessionUpdate(s);
    supabaseClient.auth.onAuthStateChange((e, s) => handleSessionUpdate(s));
  }, 500);
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
    if (ok) { await handleDailyLogin(); await fetchQuestions(); setupSubscriptions(); if (currentView === 'auth') navigateTo('home'); }
  } else if (!window.location.hash.includes('access_token') && currentView !== 'auth') { navigateTo('auth'); }
}

async function fetchProfile() {
  if (!session) return false;
  const { data, error } = await supabaseClient.from('users').select('*').eq('id', session.user.id).single();
  if (data && !error) { profile = data; updateGlobalUI(); return true; }
  if (error?.code === 'PGRST116') { navigateTo('finish-profile'); return false; }
  return false;
}

async function fetchQuestions() {
  const { data: q } = await supabaseClient.from('questions').select('*').order('boosted', { ascending: false }).order('created_at', { ascending: false });
  const { data: a } = await supabaseClient.from('answers').select('*').order('created_at', { ascending: true });
  const { data: authors } = await supabaseClient.from('users').select('id, credibility');
  const authMap = (authors || []).reduce((acc, curr) => ({ ...acc, [curr.id]: curr.credibility || 100 }), {});
  questions = (q || []).map(item => ({ ...item, answers: (a || []).filter(ans => ans.question_id === item.id).sort((x, y) => (authMap[y.author_id] || 0) - (authMap[x.author_id] || 0)) }));
  if (currentView === 'home') renderHome();
  if (currentView === 'question') renderQuestionDetail();
}

function navigateTo(view, param = null) {
  if (!session && view !== 'auth' && !window.location.hash.includes('access_token')) view = 'auth';
  document.querySelectorAll('.view').forEach(v => { v.style.display = 'none'; v.style.opacity = '0'; });
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
  currentView = view;
  if (view === 'auth' || view === 'finish-profile') { document.getElementById('sidebar').style.display = 'none'; document.getElementById('top-bar').style.display = 'none'; }
  else { document.getElementById('sidebar').style.display = 'flex'; document.getElementById('top-bar').style.display = 'flex'; const nav = document.getElementById(`nav-${view}`); if (nav) nav.classList.add('active'); }
  const el = document.getElementById(`view-${view}`);
  if (el) { el.style.display = 'block'; setTimeout(() => el.style.opacity = '1', 50); }
  if (view === 'home') { renderHome(); renderMicroTasks(); }
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
  if (view === 'marketplace') renderMarketplace();
  if (view === 'question') { currentQuestionId = param; renderQuestionDetail(); }
  lucide.createIcons();
}

// THE REFINEMENT ENGINE (V106 - Professional Clarity)
async function handleMarkBest(aId, auId, ansBody) {
  if (!confirm("Verify this solution? Quality and depth will be calculated.")) return;
  const today = new Date().toISOString().split('T')[0];
  const { data: au } = await supabaseClient.from('users').select('*').eq('id', auId).single();
  const q = questions.find(x => x.id === currentQuestionId);
  
  // Quality Check (Implicit Depth Engine)
  const isDetailed = ansBody.length > 50;
  let multiplier = isDetailed ? 1.0 : 0.6;
  
  // Economy Balance
  const dailyCount = (au.last_best_date === today) ? (au.daily_best_count || 0) : 0;
  if (dailyCount >= 5) multiplier *= 0.9;
  if (dailyCount >= 10) multiplier *= 0.7;
  
  // Anti-Collusion Check
  if (au.last_rewarder_id === session.user.id) multiplier *= 0.4;

  let reward = Math.round(50 * multiplier);
  if (dailyCount === 0 || au.last_best_date !== today) reward += 25;

  const currentCred = au.credibility || 100;
  let credGain = (currentCred >= 95) ? 1 : 5;
  const newCred = Math.min(100, currentCred + credGain);

  await supabaseClient.from('users').update({ 
    points: (au.points || 0) + reward, credibility: newCred, daily_best_count: dailyCount + 1,
    last_best_date: today, last_rewarder_id: session.user.id
  }).eq('id', auId);
  
  await supabaseClient.from('questions').update({ best_answer_id: aId, status: 'resolved' }).eq('id', currentQuestionId);
  showToast(isDetailed ? `Quality Reward Applied: +${reward} pts.` : `Verified (+${reward} pts). Aim for more detail next time.`, isDetailed ? 'success' : 'info');
  fetchQuestions();
}

// DAILY MASTERY (Professional Gauntlet V106)
function renderMicroTasks() {
  const cont = document.getElementById('challenges-list');
  const today = new Date().toISOString().split('T')[0];
  if (profile.last_challenge_date === today) {
    cont.innerHTML = '<div class="glass-card" style="padding: 2rem; text-align: center; width: 100%;">✅ Daily Mastery Challenge Complete. (+10 pts)</div>';
    return;
  }
  const isHardMode = (profile.streak || 0) >= 3;
  const easySet = [{q:"E = mc² creator?",a:"Einstein",b:"Tesla"}, {q:"H2O chemical name?",a:"Water",b:"Salt"}, {q:"3x+5=20, solve for x?",a:"5",b:"6"}];
  const hardSet = [{q:"Planck's Constant?",a:"6.626e-34",b:"3.14e-12"}, {q:"Discovery of Electrons?",a:"J.J. Thomson",b:"Bohr"}, {q:"Integral of 1/x?",a:"ln|x|",b:"x^2"}];
  const tasks = isHardMode ? hardSet : easySet;
  const c = tasks[gauntletStep];
  cont.innerHTML = `<div class="glass-card" style="padding: 2rem; border-top: 5px solid ${isHardMode?'#ec4899':'var(--p-500)'}">
    <div style="font-size:0.7rem;font-weight:900;color:${isHardMode?'#ec4899':'var(--p-500)'};margin-bottom:1rem;">${isHardMode?'🔥 ELITE MASTERY':'DAILY MASTERY'}: STEP ${gauntletStep+1}/3</div>
    <p style="font-size:1.2rem;font-weight:800;margin-bottom:1.5rem;">${c.q}</p>
    <div style="display:flex;gap:1rem;"><button onclick="handleGauntlet(true)" class="btn-primary">${c.a}</button><button onclick="handleGauntlet(false)" class="btn glass-card">${c.b}</button></div>
  </div>`;
}

// SYSTEM HEALTH (Professional Governance Dashboard)
function updateGlobalUI() {
  document.querySelectorAll('#dash-points, #top-points').forEach(el => el.innerText = profile.points);
  const roleDisplay = (profile.points >= 1000) ? 'Verified Mentor' : (profile.points >= 500 ? 'Top Contributor' : 'Active Student');
  document.getElementById('dash-role').innerText = roleDisplay;
  document.getElementById('side-streak').innerText = `🔥 ${profile.streak || 0} Day Mastery`;
  
  const credCont = document.getElementById('profile-credibility') || document.createElement('div');
  credCont.id = 'profile-credibility';
  credCont.style.cssText = "margin-top:10px; font-size:0.7rem;";
  
  let healthHTML = `<div style="color:var(--p-500); font-weight:800;"><i data-lucide="shield"></i> Trust Score: ${profile.credibility || 100}%</div>`;
  if (profile.points >= 500) {
    healthHTML += `<div style="color:#10b981; font-size:0.6rem; margin-top:5px; opacity:0.8;">Community Status: 🟢 STABLE | Openness: HIGH</div>`;
  }
  credCont.innerHTML = healthHTML;
  document.getElementById('dash-role').appendChild(credCont);
  lucide.createIcons();
}

// DOUBT HUB (V106 Professional Refresh)
function renderHome() {
  const cont = document.getElementById('home-questions'), filt = document.getElementById('home-filters');
  cont.innerHTML = ''; filt.innerHTML = '';
  ['All', 'Math', 'Science', 'History', 'Comp Sci'].forEach(s => {
    const b = document.createElement('button');
    b.className = 'btn glass-card';
    b.style.cssText = `font-size:0.7rem; padding:10px 20px; border-radius:12px; ${currentFilter === s ? 'background: var(--p-500); color: white;' : ''}`;
    b.innerText = s; b.onclick = () => { currentFilter = s; renderHome(); };
    filt.appendChild(b);
  });
  const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter) && q.title.toLowerCase().includes(currentSearch.toLowerCase()));
  const boosted = list.filter(q => q.boosted), normal = list.filter(q => !q.boosted);
  const displayList = [...boosted, ...normal.slice(0, 5).sort(() => Math.random() - 0.5), ...normal.slice(5)];
  cont.innerHTML = `<div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(350px, 1fr)); gap:1.5rem; width:100%;">${displayList.map(q => {
    const isBoosted = q.boosted === true;
    return `<div class="glass-card" style="padding:1.5rem; cursor:pointer; border:2px solid ${isBoosted?'var(--p-500)':'transparent'}; position:relative;" onclick="navigateTo('question', '${q.id}')">${isBoosted ? '<div style="position:absolute; top:-10px; left:15px; background:var(--p-500); color:white; font-size:0.5rem; padding:2px 8px; border-radius:10px; font-weight:900;">PRIORITY</div>' : ''}<div style="display:flex; justify-content:space-between; margin-bottom:1rem;"><span class="badge">${q.subject}</span><span style="font-size:0.6rem; opacity:0.6;">${getTimeAgo(q.created_at)}</span></div><h3 style="font-weight:800;margin-bottom:0.5rem;">${escapeHTML(q.title)}</h3><div style="display:flex; justify-content:space-between; align-items:center; margin-top:1.5rem; font-size:0.7rem; opacity:0.7;"><span>By ${q.asker_name}</span><span style="color:var(--p-500); font-weight:800;"><i data-lucide="shield-check" style="width:12px;"></i> ${q.answers?.length || 0} Solutions</span></div></div>`; }).join('')}</div>`; lucide.createIcons(); }

// CORE LOGIC (V105 Hardened)
async function handleGauntlet(correct) { if (!correct) { gauntletStep = 0; return showToast('Mastery attempt failed. Re-read the concept.', 'error'); } gauntletStep++; if (gauntletStep >= 3) { const today = new Date().toISOString().split('T')[0]; const points = Math.round(10 * (profile.streak >= 7 ? 1.5 : 1)); await supabaseClient.from('users').update({ points: (profile.points || 0) + points, last_challenge_date: today }).eq('id', session.user.id); showToast(`Daily Mastery Gained! +${points} pts.`, 'success'); gauntletStep = 0; await fetchProfile(); renderMicroTasks(); } else { showToast('Progressing...', 'success'); renderMicroTasks(); } }
async function renderMarketplace() { const cont = document.getElementById('market-list'); cont.innerHTML = '<div class="glass-card" style="padding: 4rem; text-align: center;">Opening the Vault...</div>'; const { data: allItems } = await supabaseClient.from('marketplace_items').select('*'); const { data: myP } = await supabaseClient.from('purchases').select('item_id').eq('user_id', session.user.id); const pIds = (myP || []).map(p => p.item_id); if (allItems) { const legends = allItems.filter(i => (i.downloads || 0) > 20).sort((a,b) => b.downloads - a.downloads), rising = allItems.filter(i => (i.downloads || 0) <= 20).sort((a,b) => new Date(b.created_at) - new Date(a.created_at)); const displayList = [...rising.slice(0, 2), ...legends, ...rising.slice(2)]; cont.innerHTML = `<div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:2rem;width:100%;">${displayList.map(it => { const isB = pIds.includes(it.id) || it.seller_id === session.user.id, downloads = it.downloads || 0, isNew = (Date.now() - new Date(it.created_at).getTime()) < 86400000 * 2; return `<div class="glass-card" style="padding:2.5rem; display:flex; flex-direction:column; justify-content:space-between; border-top: 4px solid ${isNew ? '#06b6d4' : (downloads > 20 ? 'var(--p-500)' : 'transparent')}"><div><div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:1.5rem;"><div style="font-size:0.6rem; opacity:0.6; font-weight:900; color:${isNew ? '#06b6d4' : 'inherit'}">${isNew ? 'RISING RESOURCE' : 'TRUSTED SOURCE'}</div><strong style="color:var(--p-500);font-size:1.1rem;">${it.price} PTS</strong></div><h3 style="font-weight:800;font-size:1.2rem;line-height:1.2;margin-bottom:0.5rem;">${escapeHTML(it.title)}</h3><p style="font-size:0.7rem; color:var(--text-secondary); margin-bottom:1.5rem;">Author: ${it.seller_name}</p></div>${isB ? `<a href="${it.link}" target="_blank" class="btn btn-primary" style="text-decoration:none;justify-content:center;width:100%;">Open Resource</a>` : `<button onclick="handleBuyItem('${it.id}', ${it.price}, '${it.seller_id}')" class="btn-primary" style="justify-content:center;width:100%;border-radius:12px;">Unlock Now</button>`}</div>`; }).join('')}</div>`; } lucide.createIcons(); }
function renderQuestionDetail() { const q = questions.find(x => x.id === currentQuestionId); if (!q) return; document.getElementById('qd-content').innerHTML = `<div class="glass-card" style="padding:3rem;"><h2 style="font-size:2.5rem;font-weight:900;letter-spacing:-1px;margin-bottom:1.5rem;">${escapeHTML(q.title)}</h2><p style="font-size:1.2rem;line-height:1.7;">${escapeHTML(q.body)}</p></div>`; const ansCont = document.getElementById('qd-answers'); ansCont.innerHTML = `<h3 style="margin: 3rem 0; font-size: 1.5rem; font-weight: 800;">Solutions (Ranked by Trust)</h3>`; (q.answers || []).forEach(a => { const isB = q.best_answer_id === a.id; ansCont.innerHTML += `<div class="glass-card" style="padding:2rem;margin-bottom:1.5rem;border-left:6px solid ${isB?'#10b981':'var(--p-500)'};"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem;"><strong>${a.author_name}</strong><span style="font-size:0.7rem; font-weight:900; color:var(--p-500);">TRUST SCORE: ${a.author_credibility || 100}%</span></div><p style="font-size:1.1rem; line-height:1.6;">${escapeHTML(a.body)}</p>${session && session.user.id === q.asker_id && !q.best_answer_id ? `<button onclick="handleMarkBest('${a.id}','${a.author_id}', '${a.body.replace(/'/g, "\\'")}')" class="btn-primary" style="margin-top:1.5rem;">Confirm Solution</button>`:''}</div>`; }); lucide.createIcons(); }
async function handleAuth(e) { e.preventDefault(); const em = document.getElementById('auth-email').value, pw = document.getElementById('auth-password').value; if (authMode === 'signup') { const nm = document.getElementById('auth-name').value, sc = parseInt(document.getElementById('auth-score').value) || 0; const { data, error } = await supabaseClient.auth.signUp({ email: em, password: pw }); if (error) return showToast(error.message, 'error'); const rl = (sc >= 90) ? 'scholar' : 'student'; await supabaseClient.from('users').insert([{ id: data.user.id, name: nm, points: 50, role: rl, percentage: sc, email: em, credibility: 100, daily_best_count: 0, daily_boost_count: 0 }]); showToast('Verify Email!', 'info'); } else { const { error } = await supabaseClient.auth.signInWithPassword({ email: em, password: pw }); if (error) return showToast(error.message, 'error'); } }
function getTimeAgo(date) { const seconds = Math.floor((new Date() - new Date(date)) / 1000); if (seconds < 60) return 'Just now'; if (seconds < 3600) return Math.floor(seconds/60) + 'm ago'; return Math.floor(seconds/3600) + 'h ago'; }
function showToast(msg, type='info') { const cont = document.getElementById('toast-container'); const t = document.createElement('div'); t.className='glass-card'; t.style.cssText=`padding:12px 24px; margin-bottom:12px; font-weight:800; border-left:5px solid ${type==='error'?'#ef4444':'#8b5cf6'};`; t.innerText=msg; cont.appendChild(t); setTimeout(()=>t.remove(), 3000); }
function escapeHTML(s) { return s?.replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":"&#39;",'"':"&quot;"}[t])) || ''; }
async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
function openSellModal() { document.getElementById('modal-sell').style.display = 'block'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }
function handleSearch(v) { currentSearch = v; renderHome(); }
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); }).subscribe(); }
function updateThemeIcon() { const i = document.getElementById('theme-icon'); if (i) i.setAttribute('data-lucide', isDarkMode ? 'sun' : 'moon'); lucide.createIcons(); }
function toggleDarkMode() { isDarkMode = !isDarkMode; document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light'); localStorage.setItem('scholarq_theme', isDarkMode ? 'dark' : 'light'); updateThemeIcon(); }
async function handleDailyLogin() { const today = new Date().toISOString().split('T')[0]; if (profile.last_login === today) return; const streak = (profile.streak || 0) + 1; const bonus = (streak >= 7) ? 25 : (streak >= 3 ? 10 : 5); await supabaseClient.from('users').update({ last_login: today, streak, points: (profile.points || 0) + bonus }).eq('id', session.user.id); showToast(`Mastery Bonus: +${bonus} pts.`, 'success'); await fetchProfile(); }
async function handleAsk(e) { e.preventDefault(); const t = document.getElementById('ask-title').value, s = document.getElementById('ask-subject').value, b = document.getElementById('ask-body').value; const today = new Date().toISOString().split('T')[0], isNewDay = profile.last_boost_date !== today, dailyBoosts = isNewDay ? 0 : (profile.daily_boost_count || 0); let isBoost = false; if (dailyBoosts < 2) { isBoost = confirm(`Prioritize this doubt for 10 pts? (${2-dailyBoosts} left today)`); } if (isBoost && profile.points < 10) return showToast("Insufficient points.", "error"); if (isBoost) { await supabaseClient.from('users').update({ points: profile.points - 10, daily_boost_count: dailyBoosts + 1, last_boost_date: today }).eq('id', session.user.id); } const { error } = await supabaseClient.from('questions').insert([{ id: 'q_'+Date.now(), title: t, subject: s, body: b, asker_id: session.user.id, asker_name: profile.name, status: 'open', boosted: isBoost }]); if (!error) { showToast('Question broadcasted.', 'success'); fetchQuestions(); navigateTo('home'); } }
async function handleAnswer(e) { e.preventDefault(); const b = document.getElementById('answer-body').value; const { error } = await supabaseClient.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQuestionId, body: b, author_id: session.user.id, author_name: profile.name, author_role: profile.role, upvotes: 0 }]); if (!error) { showToast('Solution submitted.', 'success'); fetchQuestions(); fetchProfile(); } }
function handleSell(e) { e.preventDefault(); const t = document.getElementById('sell-title').value, p = parseInt(document.getElementById('sell-price').value), f = document.getElementById('sell-file').files[0]; if (!f) return showToast('File required.', 'error'); showToast('Preparing resource...', 'info'); const path = `${Date.now()}_${f.name}`; supabaseClient.storage.from('marketplace').upload(path, f).then(({error: upErr}) => { if (upErr) return showToast(upErr.message, 'error'); supabaseClient.storage.from('marketplace').getPublicUrl(path).data.publicUrl; const url = supabaseClient.storage.from('marketplace').getPublicUrl(path).data.publicUrl; supabaseClient.from('marketplace_items').insert([{ id: 'm_'+Date.now(), title: t, price: p, link: url, seller_id: session.user.id, seller_name: profile.name, downloads: 0 }]).then(({error}) => { if (!error) { showToast('Resource Published.', 'success'); closeSellModal(); renderMarketplace(); } }); }); }
async function handleBuyItem(id, price, sId) { const fee = Math.floor(price * 0.1); if (profile.points < price) return showToast('Insufficient points.', 'error'); await supabaseClient.from('purchases').insert([{ user_id: session.user.id, item_id: id }]); await supabaseClient.from('users').update({ points: (profile.points || 0) - price }).eq('id', session.user.id); const { data: s } = await supabaseClient.from('users').select('points').eq('id', sId).single(); await supabaseClient.from('users').update({ points: (s.points || 0) + (price - fee) }).eq('id', sId); const { data: item } = await supabaseClient.from('marketplace_items').select('downloads').eq('id', id).single(); await supabaseClient.from('marketplace_items').update({ downloads: (item.downloads || 0) + 1 }).eq('id', id); showToast(`Resource unlocked.`, 'success'); fetchProfile(); renderMarketplace(); }
async function handleFinishProfile(e) { e.preventDefault(); const sc = parseInt(document.getElementById('finish-score').value), nm = session.user.user_metadata.full_name || session.user.email.split('@')[0], rl = (sc >= 90) ? 'scholar' : 'student'; const newP = { id: session.user.id, name: nm, points: 50, role: rl, percentage: sc, email: session.user.email, credibility: 100, daily_best_count: 0, daily_boost_count: 0 }; const { error } = await supabaseClient.from('users').upsert([newP]); if (!error) { profile = newP; navigateTo('home'); } }
async function signInWithGoogle() { await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } }); }
function renderProfile() { if (!profile) return; document.getElementById('profile-name').innerText = profile.name; document.getElementById('profile-email').innerText = profile.email; document.getElementById('profile-avatar').innerText = profile.name[0].toUpperCase(); document.getElementById('profile-points').innerText = profile.points; document.getElementById('profile-asked').innerText = questions.filter(q => q.asker_id === profile.id).length; const badgeCont = document.getElementById('profile-badges'); badgeCont.innerHTML = ''; if (profile.points >= 100) badgeCont.innerHTML += `<div class="badge">⭐ RISING STAR</div>`; if (profile.points >= 500) badgeCont.innerHTML += `<div class="badge">🏆 TOP CONTRIBUTOR</div>`; if (profile.streak >= 7) badgeCont.innerHTML += `<div class="badge">🔥 MASTERY PRO</div>`; }
async function handleUpvote(aId, auId) { if (auId === session.user.id) return; const { data: a } = await supabaseClient.from('answers').select('upvotes').eq('id', aId).single(); await supabaseClient.from('answers').update({ upvotes: (a.upvotes || 0) + 1 }).eq('id', aId); showToast('Solution upvoted.', 'success'); fetchQuestions(); }
