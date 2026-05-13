// ScholarQ - Vault Recovery Patch (V118.2)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null, profile = null, questions = [], bookmarks = [], marketplaceItems = [], currentView = 'auth';
let currentSearch = '', currentFilter = 'All';

document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  const { data: { session: s } } = await supabaseClient.auth.getSession();
  await handleSessionUpdate(s);
  supabaseClient.auth.onAuthStateChange(async (e, s) => { if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') await handleSessionUpdate(s); });
  
  // Resilient Binding
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
  if (session) {
    const ok = await fetchProfile();
    if (ok) {
      await fetchQuestions(); await fetchBookmarks(); await fetchMarketplace(); setupSubscriptions();
      if (currentView === 'auth') navigateTo('home');
    } else { await handleFinishProfile(); }
  } else { navigateTo('auth'); }
  
  setTimeout(() => {
    const shield = document.getElementById('init-shield');
    const app = document.getElementById('app');
    if (shield) { shield.style.opacity = '0'; setTimeout(() => shield.style.display = 'none', 500); }
    if (app) { app.style.display = 'flex'; setTimeout(() => app.style.opacity = '1', 50); }
    bindForms(); // Re-bind after app is revealed
  }, 500);
}

function showToast(msg) {
  const cont = document.getElementById('toast-container');
  if(!cont) return;
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

async function fetchBookmarks() {
  if (!session) return;
  const { data } = await supabaseClient.from('bookmarks').select('question_id').eq('user_id', session.user.id);
  bookmarks = (data || []).map(b => b.question_id);
}

async function fetchMarketplace() {
  const { data, error } = await supabaseClient.from('marketplace').select('*').order('created_at', { ascending: false });
  if (error) { console.error("Vault Error:", error); return; }
  marketplaceItems = data || [];
  if (currentView === 'marketplace') renderMarketplace();
}

function navigateTo(view, param = null) {
  if (!session && view !== 'auth') view = 'auth';
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const target = document.getElementById(`view-${view}`);
  if (target) target.style.display = (view === 'auth' ? 'flex' : 'block');
  
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.m-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`nav-${view}`)?.classList.add('active');
  document.getElementById(`m-nav-${view}`)?.classList.add('active');

  const actionBtn = document.getElementById('main-action-btn');
  if (view === 'marketplace') {
    if(actionBtn) { actionBtn.innerText = "+ Publish Resource"; actionBtn.onclick = openSellModal; }
    renderMarketplace();
  } else {
    if(actionBtn) { actionBtn.innerText = "+ Post Doubt"; actionBtn.onclick = () => navigateTo('ask'); }
  }

  if (view === 'home') renderHome();
  if (view === 'library') renderLibrary();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
  if (view === 'question') renderQuestionDetail(param);
  lucide.createIcons();
}

function handleFabClick() {
  if (currentView === 'marketplace') openSellModal();
  else navigateTo('ask');
}

async function fetchQuestions() {
  const { data: q } = await supabaseClient.from('questions').select('*').order('created_at', { ascending: false });
  const { data: a } = await supabaseClient.from('answers').select('*').order('insightful_count', { ascending: false });
  questions = (q || []).map(item => ({ ...item, answers: (a || []).filter(ans => ans.question_id === item.id) }));
  if (currentView === 'home') renderHome();
  if (currentView === 'library') renderLibrary();
}

function renderHome() {
  const cont = document.getElementById('home-feed');
  const list = questions.filter(q => q.title.toLowerCase().includes(currentSearch.toLowerCase()) || q.body.toLowerCase().includes(currentSearch.toLowerCase()));
  if(document.getElementById('pulse-doubts')) document.getElementById('pulse-doubts').innerText = questions.length;
  renderNoticeBoard();
  const welcomeHTML = `<h2 style="font-size:1.6rem; margin-bottom:24px; font-weight:800; color:white;">${getGreeting()}, <span style="color:var(--p-500);">${profile?.name || 'Scholar'}</span></h2>`;
  if (list.length === 0) {
    cont.innerHTML = welcomeHTML + `<div class="empty-state"><h3>Academy Signal Idle</h3><p style="color:var(--text-secondary); margin-bottom:24px;">The network is quiet.</p><button onclick="navigateTo('ask')" class="btn-primary">Broadcast Doubt</button></div>`;
  } else {
    cont.innerHTML = welcomeHTML + list.map(q => renderQuestionCard(q)).join('');
  }
  lucide.createIcons();
}

function renderMarketplace() {
  const cont = document.getElementById('market-list');
  const list = marketplaceItems.filter(i => i.title.toLowerCase().includes(currentSearch.toLowerCase()));
  if (list.length === 0) {
    cont.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;"><h3>Vault Empty</h3><p style="color:var(--text-secondary);">Publish an asset to start.</p></div>`;
  } else {
    cont.innerHTML = list.map(i => `
      <div class="card-elite" style="display:flex; flex-direction:column; justify-content:space-between; min-height:180px;">
        <div>
            <div style="font-size:0.6rem; color:var(--p-500); font-weight:800; margin-bottom:8px; text-transform:uppercase;">ACADEMIC ASSET</div>
            <h3 style="font-size:1rem; line-height:1.4; color:white;">${i.title}</h3>
            <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:4px;">By ${i.seller_name}</div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border); padding-top:16px;">
            <div style="font-family:'Outfit'; font-weight:800; color:white;">${i.price} PTS</div>
            <button onclick="handlePurchase('${i.id}', ${i.price}, '${i.link}', '${i.seller_id}')" class="btn-primary" style="padding:8px 16px; font-size:0.75rem;">Unlock Access</button>
        </div>
      </div>
    `).join('');
  }
}

async function handlePurchase(itemId, price, link, sellerId) {
  if (profile.points < price) return showToast("Insufficient Academy Points.");
  if (confirm(`Unlock access for ${price} points?`)) {
    await supabaseClient.from('users').update({ points: profile.points - price }).eq('id', session.user.id);
    const { data: seller } = await supabaseClient.from('users').select('points').eq('id', sellerId).single();
    await supabaseClient.from('users').update({ points: (seller.points || 0) + price }).eq('id', sellerId);
    showToast("Resource Unlocked!");
    window.open(link, '_blank');
    fetchProfile();
  }
}

async function handleSell(e) {
  e.preventDefault();
  if(!profile || !session) return showToast("Institutional Session missing.");
  
  const t = document.getElementById('sell-title').value, p = parseInt(document.getElementById('sell-price').value), l = document.getElementById('sell-link').value;
  
  const { error } = await supabaseClient.from('marketplace').insert([{ id: 'm_'+Date.now(), title: t, price: p, link: l, seller_id: session.user.id, seller_name: profile.name }]);
  
  if (error) {
    console.error("Submission Error:", error);
    showToast("Error: Run the Vault SQL Script.");
  } else {
    showToast("Resource Published to Vault!");
    closeSellModal(); 
    document.getElementById('sell-form').reset();
    fetchMarketplace();
  }
}

function openSellModal() { document.getElementById('modal-sell').style.display = 'flex'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }

function renderLibrary() {
  const cont = document.getElementById('library-feed');
  const list = questions.filter(q => bookmarks.includes(q.id));
  if (list.length === 0) {
    cont.innerHTML = `<div class="empty-state"><h3>Library Empty</h3><p style="color:var(--text-secondary);">Save doubts to build your bank.</p></div>`;
  } else {
    cont.innerHTML = list.map(q => renderQuestionCard(q)).join('');
  }
  lucide.createIcons();
}

function renderQuestionCard(q) {
  const isBookmarked = bookmarks.includes(q.id);
  return `
    <div class="card-elite" style="margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
        <span class="subject-chip">${q.subject}</span>
        <div style="display:flex; align-items:center; gap:16px;">
            <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:600;">${getTimeAgo(q.created_at)}</span>
            <i data-lucide="bookmark" class="bookmark-icon ${isBookmarked?'active':''}" onclick="toggleBookmark(event, '${q.id}')" style="width:18px;"></i>
        </div>
      </div>
      <h3 style="font-size:1.1rem; font-weight:800; margin-bottom:8px; line-height:1.4; color:white;" onclick="navigateTo('question', '${q.id}')">${q.title}</h3>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; font-size:0.75rem; color:var(--text-secondary);">
        <span>By ${q.asker_name}</span>
        <span style="font-weight:800; color:var(--p-500); display:flex; align-items:center; gap:6px;">
          <i data-lucide="message-square" style="width:14px;"></i> ${q.answers?.length || 0} SOLUTIONS
        </span>
      </div>
    </div>
  `;
}

function renderNoticeBoard() {
  const cont = document.getElementById('notice-list');
  const trending = [...questions].sort((a,b) => b.answers.length - a.answers.length).slice(0, 3);
  cont.innerHTML = trending.map(q => `
    <div class="notice-item" onclick="navigateTo('question', '${q.id}')">
        <div style="font-size:0.6rem; font-weight:800; color:var(--p-500); margin-bottom:4px; text-transform:uppercase;">TRENDING DOUBT</div>
        <div style="font-size:0.8rem; font-weight:700; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:white;">${q.title}</div>
    </div>
  `).join('');
}

async function toggleBookmark(e, qid) {
  e.stopPropagation();
  if (bookmarks.includes(qid)) {
    await supabaseClient.from('bookmarks').delete().eq('user_id', session.user.id).eq('question_id', qid);
    bookmarks = bookmarks.filter(id => id !== qid);
    showToast("Removed from Library");
  } else {
    await supabaseClient.from('bookmarks').insert([{ user_id: session.user.id, question_id: qid }]);
    bookmarks.push(qid);
    showToast("Added to Library");
  }
  if (currentView === 'home') renderHome();
  if (currentView === 'library') renderLibrary();
}

async function endorseAnswer(aid) {
  const qid = currentQuestionId;
  const q = questions.find(x => x.id === qid);
  const a = q.answers.find(x => x.id === aid);
  await supabaseClient.from('answers').update({ insightful_count: (a.insightful_count || 0) + 1 }).eq('id', aid);
  showToast("Endorsement Sent!");
  fetchQuestions();
}

function getGreeting() {
  const hr = new Date().getHours();
  if (hr < 12) return "Good Morning";
  if (hr < 18) return "Good Afternoon";
  return "Good Evening";
}

function handleSearch(val) { currentSearch = val; if(currentView === 'home') renderHome(); if(currentView === 'marketplace') renderMarketplace(); }

async function handleAuth(e) {
  e.preventDefault();
  const em = document.getElementById('auth-email').value, pw = document.getElementById('auth-password').value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email: em, password: pw });
  if (error) {
    const { error: upErr } = await supabaseClient.auth.signUp({ email: em, password: pw });
    if (upErr) showToast(upErr.message); else showToast("Institutional Email sent!");
  } else { showToast("Academy Access Verified!"); }
}

async function handleAsk(e) {
  e.preventDefault();
  const t = document.getElementById('ask-title').value, s = document.getElementById('ask-subject').value, b = document.getElementById('ask-body').value;
  const { error } = await supabaseClient.from('questions').insert([{ id: 'q_'+Date.now(), title: t, subject: s, body: b, asker_id: session.user.id, asker_name: profile.name }]);
  if (error) { console.error(error); showToast("Error: Verification failure."); }
  else { showToast("Doubt Broadcasted!"); fetchQuestions(); navigateTo('home'); }
}

async function handleAnswer(e) {
  e.preventDefault();
  const b = document.getElementById('answer-body').value;
  await supabaseClient.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQuestionId, author_id: session.user.id, author_name: profile.name, body: b }]);
  showToast("Solution Published!");
  document.getElementById('answer-form').reset();
  fetchQuestions(); navigateTo('question', currentQuestionId);
}

async function handleFinishProfile() {
  const nm = session.user.user_metadata.full_name || (session.user.email ? session.user.email.split('@')[0] : 'Scholar');
  const newP = { id: session.user.id, email: session.user.email, name: nm, points: 50 };
  await supabaseClient.from('users').upsert([newP]);
  profile = newP; navigateTo('home');
}

function updateGlobalUI() {
  if(document.getElementById('side-points')) document.getElementById('side-points').innerText = profile?.points || 0;
}

function renderLeaderboard() {
  const cont = document.getElementById('view-leaderboard');
  cont.innerHTML = '<div style="padding:40px; text-align:center; color:white;">Ranking Academy Leaders...</div>';
  supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(20).then(({data}) => {
    if(data) cont.innerHTML = `<h1 style="font-size:2rem; margin-bottom:40px; font-weight:800; color:white;">Leaders</h1><div style="display:grid; gap:16px;">${data.map((u, i) => `<div class="card-elite" style="display:flex; justify-content:space-between; align-items:center; padding:16px 24px;"><div style="display:flex; gap:20px; align-items:center;"><div style="font-size:1.2rem; font-weight:800; color:var(--text-muted); width:30px;">#${i+1}</div><strong style="color:white;">${u.name}</strong></div><div style="color:var(--p-500); font-weight:800; font-size:1.1rem;">${u.points} PTS</div></div>`).join('')}</div>`;
  });
}

function renderProfile() {
  document.getElementById('profile-name').innerText = profile?.name || 'Scholar';
  document.getElementById('profile-email').innerText = profile?.email || '';
  document.getElementById('profile-points').innerText = profile?.points || 0;
  document.getElementById('profile-asked').innerText = questions.filter(q => q.asker_id === profile?.id).length;
  document.getElementById('profile-solved').innerText = questions.reduce((acc, q) => acc + q.answers.filter(a => a.author_id === profile?.id).length, 0);
  document.getElementById('profile-avatar').innerText = (profile?.name ? profile.name[0].toUpperCase() : 'S');
}

let currentQuestionId = null;
function renderQuestionDetail(id) {
  currentQuestionId = id;
  const q = questions.find(x => x.id === id); if (!q) return;
  document.getElementById('qd-content').innerHTML = `<div style="padding:24px;"><div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:20px;"><span class="subject-chip">${q.subject}</span><span style="font-size:0.75rem; color:var(--text-secondary);">${getTimeAgo(q.created_at)}</span></div><h2 style="font-size:1.6rem; font-weight:800; color:white; line-height:1.3;">${q.title}</h2><p style="margin-top:24px; font-size:1.05rem; line-height:1.7; color:white;">${q.body}</p></div>`;
  document.getElementById('qd-answers').innerHTML = `<h3 style="margin-top:32px; margin-bottom:20px; font-size:1.2rem; color:white; padding:0 8px;">${q.answers?.length || 0} Solutions</h3>` + (q.answers || []).map(a => `
    <div class="card-elite" style="margin-top:12px;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
        <div style="font-weight:800; font-size:0.85rem; color:var(--p-500); font-family:'Outfit';">${a.author_name}</div>
        <button class="btn-insightful" onclick="endorseAnswer('${a.id}')"><i data-lucide="sparkles" style="width:14px;"></i> ${a.insightful_count || 0}</button>
      </div>
      <p style="line-height:1.6; font-size:1rem; color:white;">${a.body}</p>
    </div>`).join('');
  lucide.createIcons();
}

function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return Math.floor(seconds/60) + 'm ago';
  return Math.floor(seconds/3600) + 'h ago';
}

async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
async function signInWithGoogle() { await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } }); }
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); fetchMarketplace(); }).subscribe(); }
