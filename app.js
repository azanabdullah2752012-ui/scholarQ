// ScholarQ - Complete OS Engine (V122)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null, profile = null, questions = [], bookmarks = [], marketplaceItems = [], transactions = [], currentView = 'home';
let currentSearch = '', currentFilter = 'All', isBoosted = false;

const SUBJECT_MAP = {
  'Calculus': '$fx$', 'Math': '$fx$', 'Biology': '🍃', 'Data Structures': '</>', 
  'Computer Science': '</>', 'Science': '🧪', 'Physics': '🧪', 'Fluid Mechanics': '🧪', 'History': '🏛️', 'General': '🧠'
};

document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  const { data: { session: s } } = await supabaseClient.auth.getSession();
  await handleSessionUpdate(s);
  supabaseClient.auth.onAuthStateChange(async (e, s) => { if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') await handleSessionUpdate(s); });
  bindForms();
});

function bindForms() {
  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
  document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
  document.getElementById('sell-form')?.addEventListener('submit', handleSell);
}

async function handleSessionUpdate(newS) {
  session = newS;
  const app = document.getElementById('app');
  const auth = document.getElementById('view-auth');
  const shield = document.getElementById('init-shield');

  try {
    if (session) {
      const ok = await fetchProfile();
      if (ok) {
        await fetchQuestions(); await fetchBookmarks(); await fetchMarketplace(); await fetchTransactions(); setupSubscriptions();
        if (currentView === 'auth') currentView = 'home';
        
        // SHOW APP, HIDE AUTH
        if (auth) auth.style.display = 'none';
        if (app) { app.style.display = 'flex'; setTimeout(() => app.style.opacity = '1', 50); }
      } else { 
        await handleFinishProfile(); 
      }
    } else {
      // SHOW AUTH, HIDE APP
      if (app) { app.style.display = 'none'; app.style.opacity = '0'; }
      if (auth) auth.style.display = 'flex';
    }
  } catch (err) {
    console.error("Institutional Calibration Error:", err);
  } finally {
    // ALWAYS DISMISS SHIELD
    setTimeout(() => {
      if (shield) { shield.style.opacity = '0'; setTimeout(() => shield.style.display = 'none', 500); }
      bindForms();
    }, 1000);
  }
}

function showToast(msg) {
  const cont = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerText = msg;
  cont.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}

async function fetchProfile() {
  if (!session) return false;
  const { data } = await supabaseClient.from('users').select('*').eq('id', session.user.id).maybeSingle();
  if (data) { profile = data; updateGlobalUI(); return true; }
  return false;
}

async function fetchTransactions() {
  const { data } = await supabaseClient.from('transactions').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
  transactions = data || [];
  if (currentView === 'transactions') renderTransactions();
}

async function logTransaction(amount, description, type) {
  await supabaseClient.from('transactions').insert([{ user_id: session.user.id, amount, description, type }]);
  fetchTransactions();
}

function navigateTo(view, param = null) {
  if (!session && view !== 'auth') view = 'auth';
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const target = document.getElementById(`view-${view}`);
  if (target) target.style.display = 'block';
  
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`nav-${view}`)?.classList.add('active');

  if (view === 'home') renderHome();
  if (view === 'warroom') renderWarRoom();
  if (view === 'marketplace') renderMarketplace();
  if (view === 'library') renderLibrary();
  if (view === 'gauntlet') renderGauntlet();
  if (view === 'transactions') renderTransactions();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
  if (view === 'question') renderQuestionDetail(param);
  lucide.createIcons();
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
  if(document.getElementById('hub-user-name')) document.getElementById('hub-user-name').innerText = profile?.name || 'Scholar';
  updateInstitutionalMetrics();
  renderContributors();
  cont.innerHTML = list.length === 0 ? `<div style="padding:40px; text-align:center; opacity:0.5; color:white;">No recent doubts.</div>` : list.map(q => renderQuestionCard(q)).join('');
  lucide.createIcons();
}

function renderWarRoom() {
  const cont = document.getElementById('warroom-feed');
  const list = questions.filter(q => {
    const matchSearch = q.title.toLowerCase().includes(currentSearch.toLowerCase());
    const matchFilt = currentFilter === 'All' || q.subject === currentFilter;
    return matchSearch && matchFilt;
  });
  cont.innerHTML = list.map(q => renderQuestionCard(q)).join('');
  lucide.createIcons();
}

function renderTransactions() {
  const cont = document.getElementById('transaction-list');
  if (transactions.length === 0) {
    cont.innerHTML = `<div class="card-elite" style="padding:40px; text-align:center; opacity:0.5;">No history recorded.</div>`;
  } else {
    cont.innerHTML = transactions.map(t => `
      <div class="card-elite" style="display:flex; justify-content:space-between; align-items:center; padding:16px 24px;">
        <div>
            <div style="font-size:0.85rem; font-weight:700; color:white;">${t.description}</div>
            <div style="font-size:0.7rem; color:var(--text-muted);">${new Date(t.created_at).toLocaleString()}</div>
        </div>
        <div style="font-weight:800; color:${t.type==='EARN'?'var(--success)':'var(--danger)'};">
            ${t.type==='EARN'?'+':''}${t.amount} PTS
        </div>
      </div>
    `).join('');
  }
}

function renderGauntlet() {
  const prog = profile?.gauntlet_progress || 0;
  if(document.getElementById('gauntlet-status-detailed')) document.getElementById('gauntlet-status-detailed').innerText = `${prog} / 3`;
}

function toggleBoost() {
  isBoosted = !isBoosted;
  const mult = isBoosted ? (parseFloat(profile.multiplier) + 0.50).toFixed(2) : profile.multiplier;
  document.getElementById('stat-multiplier').innerText = `${mult}x`;
  document.getElementById('stat-multiplier').style.color = isBoosted ? 'var(--p-500)' : 'white';
  showToast(isBoosted ? "Hyper-Boost Activated! (+0.50x Multiplier)" : "Hyper-Boost Expired.");
}

function updateInstitutionalMetrics() {
  if(!profile) return;
  document.getElementById('stat-streak').innerText = `${profile.streak || 0} Days`;
  document.getElementById('stat-trust').innerText = `${profile.trust_score || 75}%`;
  document.getElementById('stat-multiplier').innerText = `${profile.multiplier || '1.00'}x`;
  document.getElementById('stat-status').innerText = profile.status_badge || 'SCHOLAR';
  const fill = document.getElementById('gauntlet-fill');
  if(fill) fill.style.width = `${Math.min(((profile.gauntlet_progress || 0) / 3) * 100, 100)}%`;
  if(document.getElementById('gauntlet-count')) document.getElementById('gauntlet-count').innerText = `${profile.gauntlet_progress || 0} / 3`;
}

function renderQuestionCard(q) {
  const isBookmarked = bookmarks.includes(q.id);
  const isBlitz = q.answers.length === 0;
  const symbol = SUBJECT_MAP[q.subject] || '🧠';
  const mult = isBoosted ? parseFloat(profile.multiplier) + 0.5 : parseFloat(profile?.multiplier || 1.0);
  const reward = Math.floor(20 * mult);

  return `
    <div class="doubt-card" onclick="navigateTo('question', '${q.id}')">
      <div class="subject-icon-box">${symbol}</div>
      <div>
        <div style="display:flex; align-items:center; margin-bottom:4px;">
            ${isBlitz ? '<span class="blitz-tag">BLITZ</span>' : ''}
            <h3 style="font-size:0.95rem; font-weight:700; color:white;">${q.title}</h3>
        </div>
        <div style="display:flex; align-items:center; gap:12px;">
            <span class="subject-badge">${q.subject}</span>
            <span style="font-size:0.65rem; color:var(--text-muted); font-weight:700;">${getTimeAgo(q.created_at)}</span>
        </div>
      </div>
      <div class="pts-badge">${reward} PTS</div>
    </div>
  `;
}

async function handlePurchase(itemId, price, link, sellerId) {
  if (profile.points < price) return showToast("Insufficient Points.");
  if (confirm(`Unlock access for ${price} points?`)) {
    await supabaseClient.from('users').update({ points: profile.points - price }).eq('id', session.user.id);
    await logTransaction(price, "Purchased Vault Resource", "SPEND");
    const { data: s } = await supabaseClient.from('users').select('points').eq('id', sellerId).single();
    await supabaseClient.from('users').update({ points: (s.points || 0) + price }).eq('id', sellerId);
    showToast("Asset Unlocked!"); window.open(link, '_blank'); fetchProfile();
  }
}

async function handleAnswer(e) {
  e.preventDefault();
  const b = document.getElementById('answer-body').value;
  await supabaseClient.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQuestionId, author_id: session.user.id, author_name: profile.name, body: b }]);
  const reward = Math.floor(20 * (isBoosted ? parseFloat(profile.multiplier)+0.5 : parseFloat(profile.multiplier)));
  await supabaseClient.from('users').update({ points: profile.points + reward, gauntlet_progress: (profile.gauntlet_progress || 0) + 1 }).eq('id', session.user.id);
  await logTransaction(reward, "Provided Solution", "EARN");
  showToast(`Solution Published! +${reward} PTS`);
  document.getElementById('answer-form').reset(); fetchQuestions(); fetchProfile(); navigateTo('question', currentQuestionId);
}

function handleSearch(val) { currentSearch = val; if(currentView === 'home') renderHome(); if(currentView === 'warroom') renderWarRoom(); if(currentView === 'marketplace') renderMarketplace(); }
function setFilter(f) { currentFilter = f; renderWarRoom(); }

async function handleAuth(e) {
  e.preventDefault();
  const em = document.getElementById('auth-email').value, pw = document.getElementById('auth-password').value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email: em, password: pw });
  if (error) {
    const { error: upErr } = await supabaseClient.auth.signUp({ email: em, password: pw });
    if (upErr) showToast(upErr.message); else showToast("Institutional Email sent!");
  } else showToast("Access Verified!");
}

async function handleAsk(e) {
  e.preventDefault();
  const t = document.getElementById('ask-title').value, s = document.getElementById('ask-subject').value, b = document.getElementById('ask-body').value;
  await supabaseClient.from('questions').insert([{ id: 'q_'+Date.now(), title: t, subject: s, body: b, asker_id: session.user.id, asker_name: profile.name }]);
  showToast("Doubt Broadcasted!"); fetchQuestions(); navigateTo('home');
}

async function handleSell(e) {
  e.preventDefault();
  const t = document.getElementById('sell-title').value, p = parseInt(document.getElementById('sell-price').value), l = document.getElementById('sell-link').value;
  const { error } = await supabaseClient.from('marketplace').insert([{ id: 'm_'+Date.now(), title: t, price: p, link: l, seller_id: session.user.id, seller_name: profile.name }]);
  if(error) showToast("Submission Error."); else { showToast("Published to Vault!"); closeSellModal(); fetchMarketplace(); }
}

function openSellModal() { document.getElementById('modal-sell').style.display = 'flex'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }

function renderLibrary() {
  const cont = document.getElementById('library-feed');
  const list = questions.filter(q => bookmarks.includes(q.id));
  cont.innerHTML = list.length === 0 ? `<div style="padding:40px; text-align:center; opacity:0.5; color:white;">Library Empty.</div>` : list.map(q => renderQuestionCard(q)).join('');
  lucide.createIcons();
}

async function toggleBookmark(e, qid) {
  e.stopPropagation();
  if (bookmarks.includes(qid)) {
    await supabaseClient.from('bookmarks').delete().eq('user_id', session.user.id).eq('question_id', qid);
    bookmarks = bookmarks.filter(id => id !== qid); showToast("Removed from Library");
  } else {
    await supabaseClient.from('bookmarks').insert([{ user_id: session.user.id, question_id: qid }]);
    bookmarks.push(qid); showToast("Added to Library");
  }
  fetchQuestions();
}

function renderMarketplace() {
  const cont = document.getElementById('market-list');
  const list = marketplaceItems.filter(i => i.title.toLowerCase().includes(currentSearch.toLowerCase()));
  cont.innerHTML = list.map(i => `
    <div class="card-elite" style="min-height:180px; display:flex; flex-direction:column; justify-content:space-between; border-radius:16px;">
        <div>
            <div style="font-size:0.6rem; color:var(--p-500); font-weight:800; text-transform:uppercase; margin-bottom:8px;">ASSET</div>
            <h3 style="font-size:0.95rem; color:white;">${i.title}</h3>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:4px;">By ${i.seller_name}</div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:16px;">
            <div style="font-weight:800; color:white;">${i.price} PTS</div>
            <button onclick="handlePurchase('${i.id}', ${i.price}, '${i.link}', '${i.seller_id}')" class="btn-primary" style="padding:8px 16px; font-size:0.7rem;">Unlock</button>
        </div>
    </div>
  `).join('');
}

async function renderContributors() {
  const { data } = await supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(3);
  const cont = document.getElementById('top-contributors-list');
  if(!cont || !data) return;
  cont.innerHTML = data.map((u, i) => `
    <div style="display:flex; justify-content:space-between; align-items:center; background:var(--surface); padding:14px; border-radius:14px; border:1px solid var(--border);">
        <div style="display:flex; gap:12px; align-items:center;">
            <div style="width:36px; height:36px; background:var(--grad-main); border-radius:10px; display:flex; align-items:center; justify-content:center; color:white; font-weight:800; font-size:0.85rem;">${u.name[0]}</div>
            <div>
                <div style="font-size:0.85rem; font-weight:700; color:white;">${u.name}</div>
                <div style="font-size:0.65rem; color:var(--p-500); font-weight:800;">${u.status_badge || 'SCHOLAR'}</div>
            </div>
        </div>
        <div style="font-size:0.9rem; font-weight:800; color:var(--text-secondary); font-family:'Outfit';">${(u.points/1000).toFixed(1)}k pts</div>
    </div>
  `).join('');
}

function renderProfile() {
  const cont = document.getElementById('profile-container');
  cont.innerHTML = `
    <div id="profile-avatar" style="width:100px; height:100px; background:var(--grad-main); border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:2.5rem; font-weight:800; color:white; margin-bottom:24px;">${profile.name[0]}</div>
    <h1 style="font-size:2.5rem;">${profile.name}</h1>
    <p style="color:var(--text-secondary); margin-bottom:48px;">${profile.email}</p>
    <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:32px; border-top:1px solid var(--border); padding-top:48px;">
        <div><div style="font-size:2.2rem; font-weight:800; color:var(--p-500);">${profile.points}</div><div style="font-size:0.7rem; color:var(--text-muted); font-weight:800;">POINTS</div></div>
        <div><div style="font-size:2.2rem; font-weight:800;">${questions.filter(q => q.asker_id === profile.id).length}</div><div style="font-size:0.7rem; color:var(--text-muted); font-weight:800;">DOUBTS</div></div>
        <div><div style="font-size:2.2rem; font-weight:800;">${questions.reduce((acc, q) => acc + q.answers.filter(a => a.author_id === profile.id).length, 0)}</div><div style="font-size:0.7rem; color:var(--text-muted); font-weight:800;">SOLUTIONS</div></div>
    </div>
  `;
}

let currentQuestionId = null;
function renderQuestionDetail(id) {
  currentQuestionId = id;
  const q = questions.find(x => x.id === id); if (!q) return;
  document.getElementById('qd-content').innerHTML = `<div style="padding:32px;"><div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:20px;"><span class="subject-badge">${q.subject}</span><span style="font-size:0.75rem; color:var(--text-secondary);">${getTimeAgo(q.created_at)}</span></div><h2 style="font-size:1.6rem; font-weight:800; color:white; line-height:1.3;">${q.title}</h2><p style="margin-top:24px; font-size:1.1rem; line-height:1.7; color:white;">${q.body}</p></div>`;
  document.getElementById('qd-answers').innerHTML = `<h3 style="margin-top:32px; margin-bottom:20px; font-size:1.2rem; color:white; padding:0 8px;">${q.answers?.length || 0} Solutions</h3>` + (q.answers || []).map(a => `<div class="card-elite" style="margin-top:12px; padding:24px;"><div style="font-weight:800; font-size:0.85rem; color:var(--p-500); font-family:'Outfit'; margin-bottom:12px;">${a.author_name}</div><p style="line-height:1.6; font-size:1rem; color:white;">${a.body}</p></div>`).join('');
  lucide.createIcons();
}

async function handleFinishProfile() {
  const nm = session.user.user_metadata.full_name || (session.user.email ? session.user.email.split('@')[0] : 'Scholar');
  const newP = { id: session.user.id, email: session.user.email, name: nm, points: 50, streak: 1, trust_score: 75, multiplier: 1.00, status_badge: 'SCHOLAR' };
  await supabaseClient.from('users').upsert([newP]);
  profile = newP; navigateTo('home');
}

function updateGlobalUI() { if(document.getElementById('side-points')) document.getElementById('side-points').innerText = profile?.points || 0; }
function renderLeaderboard() {
  const cont = document.getElementById('view-leaderboard');
  cont.innerHTML = '<div style="padding:40px; text-align:center; color:white;">Ranking Scholars...</div>';
  supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(20).then(({data}) => {
    if(data) cont.innerHTML = `<h1 style="font-size:2rem; margin-bottom:40px; font-weight:800; color:white;">Academy Leaders</h1><div style="display:grid; gap:16px;">${data.map((u, i) => `<div class="card-elite" style="display:flex; justify-content:space-between; align-items:center; padding:16px 24px;"><div style="display:flex; gap:20px; align-items:center;"><div style="font-size:1.2rem; font-weight:800; color:var(--text-muted); width:30px;">#${i+1}</div><strong style="color:white;">${u.name}</strong></div><div style="color:var(--p-500); font-weight:800; font-size:1.1rem;">${u.points} PTS</div></div>`).join('')}</div>`;
  });
}

function getTimeAgo(d) { const s = Math.floor((new Date() - new Date(d)) / 1000); if (s < 60) return 'Just now'; if (s < 3600) return Math.floor(s/60) + 'm ago'; return Math.floor(s/3600) + 'h ago'; }
async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
async function signInWithGoogle() { await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } }); }
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); fetchMarketplace(); fetchTransactions(); }).subscribe(); }
function showInvite() { showToast("Referral Link: scholarq.academy/invite/" + profile.id); }
function showNotifications() { showToast("You have 0 new institutional alerts."); }
