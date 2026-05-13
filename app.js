// ScholarQ - Premium Academic Ecosystem (Design Optimized)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null;
let profile = null;
let questions = [];
let currentView = 'auth';
let authMode = 'login';
let currentQuestionId = null;
let currentSearch = '';
let currentFilter = 'All';
let isDarkMode = localStorage.getItem('scholarq_theme') === 'dark';

// Initialization
document.addEventListener('DOMContentLoaded', async () => {
  if (isDarkMode) document.documentElement.setAttribute('data-theme', 'dark');
  updateThemeIcon();
  lucide.createIcons();
  
  setTimeout(async () => {
    const { data: { session: initialSession } } = await supabaseClient.auth.getSession();
    await handleSessionUpdate(initialSession);

    supabaseClient.auth.onAuthStateChange(async (event, newSession) => {
      if (['SIGNED_IN', 'TOKEN_REFRESHED', 'USER_UPDATED'].includes(event)) {
        await handleSessionUpdate(newSession);
      } else if (event === 'SIGNED_OUT') {
        session = null; profile = null; navigateTo('auth');
      }
    });
  }, 500);

  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
  document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
  document.getElementById('finish-profile-form')?.addEventListener('submit', handleFinishProfile);
  document.getElementById('sell-form')?.addEventListener('submit', handleSell);
});

async function handleSessionUpdate(newS) {
  session = newS;
  const isInitializing = window.location.hash.includes('access_token');
  if (session) {
    const ok = await fetchProfile();
    if (ok) {
      await handleDailyLogin();
      await fetchQuestions();
      setupSubscriptions();
      if (currentView === 'auth') navigateTo('home');
    }
  } else {
    if (!isInitializing && currentView !== 'auth') navigateTo('auth');
  }
}

async function fetchProfile() {
  if (!session) return false;
  try {
    const { data, error } = await supabaseClient.from('users').select('*').eq('id', session.user.id).single();
    if (data && !error) {
      profile = data;
      updateGlobalUI();
      return true;
    } else if (error?.code === 'PGRST116') {
      navigateTo('finish-profile');
      return false;
    }
  } catch (e) { console.error(e); }
  return false;
}

async function fetchQuestions() {
  const { data: q } = await supabaseClient.from('questions').select('*').order('created_at', { ascending: false });
  const { data: a } = await supabaseClient.from('answers').select('*').order('created_at', { ascending: true });
  questions = (q || []).map(item => ({ ...item, answers: (a || []).filter(ans => ans.question_id === item.id) }));
  if (currentView === 'home') renderHome();
  if (currentView === 'question') renderQuestionDetail();
}

function navigateTo(view, param = null) {
  const isInitializing = window.location.hash.includes('access_token');
  if (!session && view !== 'auth') {
    if (isInitializing) return;
    view = 'auth';
  }
  if (session && view === 'auth') view = 'home';

  document.querySelectorAll('.view').forEach(v => { v.style.display = 'none'; v.style.opacity = '0'; });
  document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));

  currentView = view;
  const sidebar = document.getElementById('sidebar');
  const topBar = document.getElementById('top-bar');

  if (view === 'auth' || view === 'finish-profile') {
    sidebar.style.display = 'none'; topBar.style.display = 'none';
    document.getElementById('main-layout').style.padding = '0';
  } else {
    sidebar.style.display = 'flex'; topBar.style.display = 'flex';
    document.getElementById('main-layout').style.padding = (window.innerWidth > 768) ? '1.5rem 3rem' : '1rem';
    const nav = document.getElementById(`nav-${view}`);
    if (nav) nav.classList.add('active');
  }

  const el = document.getElementById(`view-${view}`);
  if (el) { el.style.display = 'block'; setTimeout(() => el.style.opacity = '1', 50); }

  if (view === 'home') { renderHome(); renderMicroTasks(); }
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
  if (view === 'marketplace') renderMarketplace();
  if (view === 'question') { currentQuestionId = param; renderQuestionDetail(); }
  lucide.createIcons();
}

// RENDERING
function renderHome() {
  const cont = document.getElementById('home-questions');
  const filt = document.getElementById('home-filters');
  cont.innerHTML = ''; filt.innerHTML = '';
  ['All', 'Math', 'Science', 'History', 'Computer Science', 'PPT Design', 'Creative Work', 'Assignments'].forEach(s => {
    const b = document.createElement('button');
    b.className = 'btn glass-card';
    b.style.cssText = `font-size: 0.7rem; padding: 10px 20px; border-radius: 12px; ${currentFilter === s ? 'background: var(--p-500); color: white;' : ''}`;
    b.innerText = s;
    b.onclick = () => { currentFilter = s; renderHome(); };
    filt.appendChild(b);
  });

  const list = questions.filter(q => (currentFilter === 'All' || q.subject === currentFilter) && q.title.toLowerCase().includes(currentSearch.toLowerCase()));
  if (list.length === 0) { cont.innerHTML = '<div class="glass-card" style="padding: 4rem; text-align: center; width: 100%;">No doubts broadcasted yet.</div>'; return; }
  
  cont.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(350px, 1fr)); gap: 1.5rem; width: 100%;">
      ${list.map(q => {
        const isHV = ['PPT Design', 'Creative Work', 'Assignments'].includes(q.subject);
        const isR = q.status === 'resolved';
        return `
          <div class="glass-card" style="padding: 1.5rem; cursor: pointer; border-left: 6px solid ${isR ? '#10b981' : (isHV ? '#ec4899' : 'transparent')};" onclick="navigateTo('question', '${q.id}')">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
              <span class="badge" style="background: rgba(139, 92, 246, 0.1);">${q.subject}</span>
              ${isR ? '<span style="color: #10b981; font-weight: 800; font-size: 0.7rem;">SOLVED</span>' : (isHV ? '⚡' : '')}
            </div>
            <h3 style="font-weight: 800; margin-bottom: 0.5rem; color: var(--text-primary);">${escapeHTML(q.title)}</h3>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
              <div style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--text-secondary);">
                <i data-lucide="user" style="width: 14px;"></i> ${q.asker_name}
              </div>
              <div style="display: flex; align-items: center; gap: 4px; font-size: 0.8rem; color: var(--p-500);">
                <i data-lucide="message-circle" style="width: 14px;"></i> ${q.answers?.length || 0}
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  lucide.createIcons();
}

async function renderLeaderboard() {
  const cont = document.getElementById('view-leaderboard');
  cont.innerHTML = '<div class="glass-card" style="padding: 4rem; text-align: center;">Tallying the best scholars...</div>';
  const { data } = await supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(20);
  if (data) {
    cont.innerHTML = `
      <div style="text-align: center; margin-bottom: 4rem;">
        <h1 style="font-size: 3.5rem; font-weight: 900; letter-spacing: -2px;">Hall of <span style="color: var(--p-500);">Fame</span></h1>
        <p style="color: var(--text-secondary);">The top 20 contributors in the ScholarQ ecosystem</p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 1.5rem;">
        ${data.map((u, i) => `
          <div class="glass-card" style="padding: 1.5rem; display: flex; align-items: center; gap: 20px; border-bottom: 4px solid ${i < 3 ? '#fbbf24' : 'transparent'}">
            <div style="font-size: 1.5rem; font-weight: 900; color: ${i < 3 ? '#fbbf24' : 'var(--text-secondary)'}; min-width: 40px;">#${i+1}</div>
            <div style="flex: 1;">
              <div style="font-weight: 800; font-size: 1.1rem;">${u.name}</div>
              <div class="badge" style="margin-top: 4px; display: inline-block;">${calculateRank(u.points)}</div>
            </div>
            <div style="text-align: right;"><strong style="color: var(--p-500); font-size: 1.2rem;">${u.points}</strong><br><small style="font-size: 0.6rem; opacity: 0.6;">POINTS</small></div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

function renderProfile() {
  if (!profile) return;
  document.getElementById('profile-name').innerText = profile.name;
  document.getElementById('profile-email').innerText = profile.email;
  document.getElementById('profile-avatar').innerText = profile.name[0].toUpperCase();
  document.getElementById('profile-points').innerText = profile.points;
  document.getElementById('profile-asked').innerText = questions.filter(q => q.asker_id === profile.id).length;
  
  const badgeCont = document.getElementById('profile-badges');
  badgeCont.innerHTML = '';
  if (profile.points >= 100) badgeCont.innerHTML += `<div class="badge floating" style="border-color: #3b82f6; color: #3b82f6; background: rgba(59, 130, 246, 0.1);">⭐ RISING STAR</div>`;
  if (profile.points >= 500) badgeCont.innerHTML += `<div class="badge floating" style="border-color: #fbbf24; color: #fbbf24; background: rgba(251, 191, 36, 0.1);">🏆 ELITE SCHOLAR</div>`;
  if (profile.streak >= 7) badgeCont.innerHTML += `<div class="badge floating" style="border-color: #f97316; color: #f97316; background: rgba(249, 115, 22, 0.1);">🔥 UNSTOPPABLE</div>`;
}

async function renderMarketplace() {
  const cont = document.getElementById('market-list');
  cont.innerHTML = '<div class="glass-card" style="padding: 4rem; text-align: center;">Opening the library...</div>';
  const { data: items } = await supabaseClient.from('marketplace_items').select('*').order('created_at', { ascending: false });
  const { data: myP } = await supabaseClient.from('purchases').select('item_id').eq('user_id', session.user.id);
  const pIds = (myP || []).map(p => p.item_id);

  if (items) {
    cont.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; width: 100%;">
        ${items.map(it => {
          const isB = pIds.includes(it.id) || it.seller_id === session.user.id;
          return `
            <div class="glass-card" style="padding: 2.5rem; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1.5rem;">
                  <i data-lucide="file-text" style="color: var(--p-500); width: 32px; height: 32px;"></i>
                  <strong style="color: var(--p-500); font-size: 1.2rem;">${it.price} PTS</strong>
                </div>
                <h3 style="font-weight: 800; font-size: 1.3rem; line-height: 1.2; margin-bottom: 0.5rem;">${escapeHTML(it.title)}</h3>
                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 2rem;">Listed by ${it.seller_name}</p>
              </div>
              ${isB ? `
                <a href="${it.link}" target="_blank" class="btn btn-primary" style="text-decoration: none; justify-content: center; width: 100%;">
                  <i data-lucide="download"></i> Download Access
                </a>
              ` : `
                <button onclick="handleBuyItem('${it.id}', ${it.price}, '${it.seller_id}')" class="btn-primary" style="justify-content: center; width: 100%; border-radius: 12px;">
                  Unlock Now
                </button>
              `}
            </div>
          `;
        }).join('')}
      </div>
    `;
  }
  lucide.createIcons();
}

function renderMicroTasks() {
  const cont = document.getElementById('challenges-list');
  const today = new Date().toISOString().split('T')[0];
  if (profile.role === 'scholar' || profile.last_challenge_date === today) {
    document.getElementById('student-challenges').style.display = (profile.role === 'scholar') ? 'none' : 'block';
    if (profile.last_challenge_date === today) cont.innerHTML = '<div class="glass-card" style="padding: 3rem; text-align: center; width: 100%;">✅ Daily Goal Accomplished!</div>';
    return;
  }
  document.getElementById('student-challenges').style.display = 'block';
  cont.innerHTML = `
    <div class="glass-card" style="padding: 2rem; background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), transparent);">
      <p style="font-size: 1.2rem; font-weight: 800; margin-bottom: 1.5rem;">Daily Challenge: Which law states F = ma?</p>
      <div style="display: flex; gap: 1rem;">
        <button onclick="handleMicroTask(true, 2)" class="btn glass-card" style="padding: 12px 24px; font-weight: 700;">Newton's 2nd Law</button>
        <button onclick="handleMicroTask(false, 0)" class="btn glass-card" style="padding: 12px 24px; font-weight: 700;">Newton's 1st Law</button>
      </div>
    </div>
  `;
}

// HANDLERS
async function handleMicroTask(correct, reward) {
  if (!correct) return showToast('Incorrect! Try again.', 'error');
  const today = new Date().toISOString().split('T')[0];
  await supabaseClient.from('users').update({ points: (profile.points || 0) + reward, last_challenge_date: today }).eq('id', session.user.id);
  showToast(`Correct! +${reward} points.`, 'success');
  await fetchProfile(); renderMicroTasks();
}

async function handleMarkBest(aId, auId) {
  if (!confirm("Is this the definitive answer?")) return;
  await supabaseClient.from('questions').update({ best_answer_id: aId, status: 'resolved' }).eq('id', currentQuestionId);
  const { data: au } = await supabaseClient.from('users').select('points').eq('id', auId).single();
  await supabaseClient.from('users').update({ points: (au.points || 0) + 20 }).eq('id', auId);
  showToast('Awarded Best Answer! +20 bonus sent.', 'success'); fetchQuestions();
}

async function handleUpvote(aId, auId) {
  if (auId === session.user.id) return;
  const { data: a } = await supabaseClient.from('answers').select('upvotes').eq('id', aId).single();
  await supabaseClient.from('answers').update({ upvotes: (a.upvotes || 0) + 1 }).eq('id', aId);
  await supabaseClient.from('users').update({ points: (profile.points || 0) + 1 }).eq('id', session.user.id);
  showToast('Upvoted! +1 pt earned.', 'success'); fetchQuestions(); fetchProfile();
}

async function handleBuyItem(id, price, sId) {
  if (profile.points < price) return showToast('Not enough points!', 'error');
  if (!confirm(`Unlock this for ${price} points?`)) return;
  await supabaseClient.from('purchases').insert([{ user_id: session.user.id, item_id: id }]);
  await supabaseClient.from('users').update({ points: (profile.points || 0) - price }).eq('id', session.user.id);
  const { data: s } = await supabaseClient.from('users').select('points').eq('id', sId).single();
  await supabaseClient.from('users').update({ points: (s.points || 0) + price }).eq('id', sId);
  showToast('Purchased successfully!', 'success'); fetchProfile(); renderMarketplace();
}

async function handleAsk(e) {
  e.preventDefault();
  const title = document.getElementById('ask-title').value;
  const subject = document.getElementById('ask-subject').value;
  const body = document.getElementById('ask-body').value;
  const { error } = await supabaseClient.from('questions').insert([{ id: 'q_'+Date.now(), title, subject, body, asker_id: session.user.id, asker_name: profile.name, status: 'open' }]);
  if (!error) { showToast('Broadcasted!', 'success'); document.getElementById('ask-form').reset(); fetchQuestions(); navigateTo('home'); }
}

async function handleAnswer(e) {
  e.preventDefault();
  const body = document.getElementById('answer-body').value;
  const { error } = await supabaseClient.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQuestionId, body, author_id: session.user.id, author_name: profile.name, author_role: profile.role, upvotes: 0 }]);
  if (!error) { showToast('Contribution added!', 'success'); document.getElementById('answer-form').reset(); fetchQuestions(); fetchProfile(); }
}

async function handleSell(e) {
  e.preventDefault();
  const title = document.getElementById('sell-title').value;
  const price = parseInt(document.getElementById('sell-price').value);
  const file = document.getElementById('sell-file').files[0];
  if (!file) return showToast('Please pick a document', 'error');
  showToast('Uploading to Vault...', 'info');
  const path = `${Date.now()}_${file.name}`;
  const { error: upErr } = await supabaseClient.storage.from('marketplace').upload(path, file);
  if (upErr) return showToast(upErr.message, 'error');
  const { data: { publicUrl: url } } = supabaseClient.storage.from('marketplace').getPublicUrl(path);
  const { error } = await supabaseClient.from('marketplace_items').insert([{ id: 'm_'+Date.now(), title, price, link: url, seller_id: session.user.id, seller_name: profile.name }]);
  if (!error) { showToast('Vault Item Listed!', 'success'); closeSellModal(); renderMarketplace(); }
}

// UTILS
async function handleAuth(e) {
  e.preventDefault();
  const email = document.getElementById('auth-email').value;
  const password = document.getElementById('auth-password').value;
  if (authMode === 'signup') {
    const name = document.getElementById('auth-name').value;
    const score = parseInt(document.getElementById('auth-score').value) || 0;
    const { data, error } = await supabaseClient.auth.signUp({ email, password });
    if (error) return showToast(error.message, 'error');
    const role = (score >= 90) ? 'scholar' : 'student';
    await supabaseClient.from('users').insert([{ id: data.user.id, name, points: 50, role, percentage: score, email }]);
    showToast('Success! Verify your email.', 'info');
  } else {
    const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
    if (error) return showToast(error.message, 'error');
  }
}

async function signInWithGoogle() {
  await supabaseClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + window.location.pathname } });
}

async function handleFinishProfile(e) {
  e.preventDefault();
  const score = parseInt(document.getElementById('finish-score').value);
  const subject = document.getElementById('finish-subject').value;
  const name = session.user.user_metadata.full_name || session.user.email.split('@')[0];
  const role = (score >= 90) ? 'scholar' : 'student';
  const newP = { id: session.user.id, name, points: 50, role, percentage: score, email: session.user.email, specialty: (score >= 80) ? subject : 'General' };
  const { error } = await supabaseClient.from('users').upsert([newP]);
  if (!error) { profile = newP; navigateTo('home'); }
}

async function handleDailyLogin() {
  const today = new Date().toISOString().split('T')[0];
  if (profile.last_login === today) return;
  const streak = (profile.streak || 0) + 1;
  let bonus = 2;
  if (streak === 3) bonus += 5;
  if (streak === 7) bonus += 15;
  await supabaseClient.from('users').update({ last_login: today, streak, points: (profile.points || 0) + bonus }).eq('id', session.user.id);
  showToast(`Welcome back! Streak: ${streak} | Bonus: +${bonus} pts`, 'success');
  await fetchProfile();
}

function updateGlobalUI() {
  const r = calculateRank(profile.points);
  document.querySelectorAll('#dash-points, #top-points').forEach(el => el.innerText = profile.points);
  document.getElementById('welcome-name').innerText = profile.name.split(' ')[0];
  document.getElementById('dash-role').innerText = r;
  document.getElementById('side-streak').innerText = `🔥 ${profile.streak || 0} Days`;
  document.getElementById('scholar-badge').style.display = (profile.role === 'scholar') ? 'block' : 'none';
  document.getElementById('scholar-hub').style.display = (profile.role === 'scholar') ? 'block' : 'none';
}

function calculateRank(pts) { if (pts >= 1000) return 'Sage'; if (pts >= 500) return 'Scholar'; if (pts >= 200) return 'Brainiac'; return 'Newbie'; }
function showToast(msg, type='info') { const cont = document.getElementById('toast-container'); const t = document.createElement('div'); t.className='glass-card'; t.style.cssText=`padding: 12px 24px; margin-bottom: 12px; font-weight: 800; border-left: 5px solid ${type==='error'?'#ef4444':'#8b5cf6'};`; t.innerText=msg; cont.appendChild(t); setTimeout(()=>t.remove(), 4000); }
function escapeHTML(s) { return s?.replace(/[&<>'"]/g, t => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":"&#39;",'"':"&quot;"}[t])) || ''; }
function getTagColor(s) { return 'rgba(139, 92, 246, 0.1)'; }
async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
function openSellModal() { document.getElementById('modal-sell').style.display = 'block'; }
function closeSellModal() { document.getElementById('modal-sell').style.display = 'none'; }
function handleSearch(v) { currentSearch = v; renderHome(); }
function toggleDarkMode() { isDarkMode = !isDarkMode; document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light'); localStorage.setItem('scholarq_theme', isDarkMode ? 'dark' : 'light'); updateThemeIcon(); }
function updateThemeIcon() { const i = document.getElementById('theme-icon'); if (i) i.setAttribute('data-lucide', isDarkMode ? 'sun' : 'moon'); lucide.createIcons(); }
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); }).subscribe(); }

function renderQuestionDetail() {
  const q = questions.find(x => x.id === currentQuestionId);
  if (!q) return;
  document.getElementById('qd-content').innerHTML = `
    <div class="glass-card" style="padding: 3rem;">
      <h2 style="font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; margin-bottom: 1.5rem;">${escapeHTML(q.title)}</h2>
      <p style="font-size: 1.2rem; line-height: 1.7; color: var(--text-primary);">${escapeHTML(q.body)}</p>
    </div>
  `;
  const ansCont = document.getElementById('qd-answers');
  ansCont.innerHTML = `<h3 style="margin: 3rem 0; font-size: 1.5rem; font-weight: 800;">${q.answers?.length || 0} Expert Solutions</h3>`;
  (q.answers || []).forEach(a => {
    const isB = q.best_answer_id === a.id;
    const isAsk = session && session.user.id === q.asker_id;
    ansCont.innerHTML += `
      <div class="glass-card" style="padding: 2rem; margin-bottom: 1.5rem; border-left: 6px solid ${isB ? '#10b981' : 'var(--p-500)'}; display: flex; justify-content: space-between;">
        <div style="flex: 1;">
          <strong style="font-size: 1.1rem;">${a.author_name}</strong>
          <p style="margin-top: 15px; font-size: 1.1rem; line-height: 1.6;">${escapeHTML(a.body)}</p>
          ${isAsk && !q.best_answer_id ? `<button onclick="handleMarkBest('${a.id}', '${a.author_id}')" class="btn-primary" style="font-size: 0.7rem; margin-top: 1.5rem; padding: 8px 16px;">Verify as Best</button>` : ''}
        </div>
        <div style="text-align: center; margin-left: 2rem;">
          <button onclick="handleUpvote('${a.id}', '${a.author_id}')" class="btn-icon glass-card" style="padding: 10px; border-radius: 12px;"><i data-lucide="arrow-big-up" style="width: 24px; color: var(--p-500);"></i></button>
          <div style="font-weight: 900; font-size: 1.2rem; margin-top: 8px;">${a.upvotes || 0}</div>
        </div>
      </div>
    `;
  });
  lucide.createIcons();
}
