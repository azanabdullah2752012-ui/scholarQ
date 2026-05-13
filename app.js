// ScholarQ - Institutional Elite Edition (V114)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null, profile = null, questions = [], currentView = 'auth';
let currentSearch = '', currentFilter = 'All';

document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  
  // 1. BOOT SEQUENCE
  const { data: { session: s } } = await supabaseClient.auth.getSession();
  await handleSessionUpdate(s);
  
  // 2. AUTH LISTENER
  supabaseClient.auth.onAuthStateChange(async (e, s) => {
    if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') await handleSessionUpdate(s);
  });

  // 3. EVENT BINDING
  document.getElementById('auth-form')?.addEventListener('submit', handleAuth);
  document.getElementById('ask-form')?.addEventListener('submit', handleAsk);
  document.getElementById('answer-form')?.addEventListener('submit', handleAnswer);
});

async function handleSessionUpdate(newS) {
  session = newS;
  if (session) {
    const ok = await fetchProfile();
    if (ok) {
      await fetchQuestions();
      setupSubscriptions();
      if (currentView === 'auth') navigateTo('home');
    } else {
      await handleFinishProfile();
    }
  } else {
    navigateTo('auth');
  }
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
  
  // View Toggle
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const target = document.getElementById(`view-${view}`);
  if (target) target.style.display = (view === 'auth' ? 'flex' : 'block');
  
  // Sidebar State
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById(`nav-${view}`)?.classList.add('active');

  if (view === 'home') renderHome();
  if (view === 'leaderboard') renderLeaderboard();
  if (view === 'profile') renderProfile();
  if (view === 'question') renderQuestionDetail(param);
  lucide.createIcons();
}

async function fetchQuestions() {
  const { data: q } = await supabaseClient.from('questions').select('*').order('created_at', { ascending: false });
  const { data: a } = await supabaseClient.from('answers').select('*');
  questions = (q || []).map(item => ({ ...item, answers: (a || []).filter(ans => ans.question_id === item.id) }));
  if (currentView === 'home') renderHome();
}

// ELITE RENDERING (V114)
function renderHome() {
  const cont = document.getElementById('home-feed');
  const list = questions.filter(q => {
    const matchFilt = currentFilter === 'All' || q.subject === currentFilter;
    const matchSearch = q.title.toLowerCase().includes(currentSearch.toLowerCase()) || q.body.toLowerCase().includes(currentSearch.toLowerCase());
    return matchFilt && matchSearch;
  });
  
  document.getElementById('pulse-doubts').innerText = questions.length;

  cont.innerHTML = list.map(q => `
    <div class="card-elite" style="cursor:pointer;" onclick="navigateTo('question', '${q.id}')">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; position:relative; z-index:2;">
        <span class="subject-chip">${q.subject}</span>
        <span style="font-size:0.75rem; color:var(--text-secondary); font-weight:600;">${getTimeAgo(q.created_at)}</span>
      </div>
      <h3 style="font-size:1.2rem; font-weight:800; margin-bottom:8px; line-height:1.4; position:relative; z-index:2;">${q.title}</h3>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:24px; font-size:0.8rem; color:var(--text-secondary); position:relative; z-index:2;">
        <span style="display:flex; align-items:center; gap:8px;"><i data-lucide="user" style="width:14px; opacity:0.6;"></i> By ${q.asker_name}</span>
        <span style="font-weight:800; color:var(--p-500); display:flex; align-items:center; gap:6px;">
          <i data-lucide="message-square" style="width:16px;"></i> ${q.answers?.length || 0} SOLUTIONS
        </span>
      </div>
    </div>
  `).join('');
  lucide.createIcons();
}

function handleSearch(val) { currentSearch = val; renderHome(); }
function setFilter(f) { currentFilter = f; renderHome(); }

async function handleAuth(e) {
  e.preventDefault();
  const em = document.getElementById('auth-email').value, pw = document.getElementById('auth-password').value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email: em, password: pw });
  if (error) {
    const { error: upErr } = await supabaseClient.auth.signUp({ email: em, password: pw });
    if (upErr) alert(upErr.message); else alert("Institutional Access Email sent!");
  }
}

async function handleAsk(e) {
  e.preventDefault();
  const t = document.getElementById('ask-title').value, s = document.getElementById('ask-subject').value, b = document.getElementById('ask-body').value;
  await supabaseClient.from('questions').insert([{ id: 'q_'+Date.now(), title: t, subject: s, body: b, asker_id: session.user.id, asker_name: profile.name }]);
  fetchQuestions(); navigateTo('home');
}

async function handleAnswer(e) {
  e.preventDefault();
  const b = document.getElementById('answer-body').value;
  await supabaseClient.from('answers').insert([{ id: 'a_'+Date.now(), question_id: currentQuestionId, author_id: session.user.id, author_name: profile.name, body: b }]);
  document.getElementById('answer-form').reset();
  fetchQuestions(); navigateTo('question', currentQuestionId);
}

async function handleFinishProfile() {
  const nm = session.user.user_metadata.full_name || session.user.email.split('@')[0];
  const newP = { id: session.user.id, email: session.user.email, name: nm, points: 50 };
  await supabaseClient.from('users').upsert([newP]);
  profile = newP; navigateTo('home');
}

function updateGlobalUI() {
  document.getElementById('side-points').innerText = profile.points;
}

function renderLeaderboard() {
  const cont = document.getElementById('view-leaderboard');
  cont.innerHTML = '<div style="padding:40px; text-align:center; opacity:0.5;">Ranking Academy Leaders...</div>';
  supabaseClient.from('users').select('*').order('points', { ascending: false }).limit(20).then(({data}) => {
    if(data) cont.innerHTML = `
      <h1 style="font-size:2.5rem; margin-bottom:40px; font-weight:800; letter-spacing:-1.5px;">Academy Leaders</h1>
      <div style="display:grid; gap:16px;">
        ${data.map((u, i) => `
          <div class="card-elite" style="display:flex; justify-content:space-between; align-items:center; padding:20px 32px;">
            <div style="display:flex; gap:32px; align-items:center; position:relative; z-index:2;">
              <div style="font-size:1.5rem; font-weight:800; color:var(--text-muted); width:40px; font-family:'Outfit';">#${i+1}</div>
              <strong style="font-size:1.1rem;">${u.name}</strong>
            </div>
            <div style="color:var(--p-500); font-weight:800; font-size:1.2rem; font-family:'Outfit'; position:relative; z-index:2;">${u.points} PTS</div>
          </div>
        `).join('')}
      </div>
    `;
  });
}

function renderProfile() {
  document.getElementById('profile-name').innerText = profile.name;
  document.getElementById('profile-email').innerText = profile.email;
  document.getElementById('profile-points').innerText = profile.points;
  document.getElementById('profile-asked').innerText = questions.filter(q => q.asker_id === profile.id).length;
  document.getElementById('profile-avatar').innerText = profile.name[0].toUpperCase();
}

let currentQuestionId = null;
function renderQuestionDetail(id) {
  currentQuestionId = id;
  const q = questions.find(x => x.id === id); if (!q) return;
  document.getElementById('qd-content').innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:24px; position:relative; z-index:2;">
      <span class="subject-chip">${q.subject}</span>
      <span style="font-size:0.8rem; color:var(--text-secondary); font-weight:600;">${getTimeAgo(q.created_at)}</span>
    </div>
    <h2 style="font-size:2rem; font-weight:800; line-height:1.3; position:relative; z-index:2;">${q.title}</h2>
    <p style="margin-top:32px; font-size:1.15rem; line-height:1.7; color:var(--text-primary); position:relative; z-index:2;">${q.body}</p>
    <div style="margin-top:40px; font-size:0.85rem; color:var(--text-secondary); position:relative; z-index:2; border-top:1px solid var(--border); padding-top:24px;">
      Broadcasted by <strong style="color:white;">${q.asker_name}</strong>
    </div>
  `;
  document.getElementById('qd-answers').innerHTML = `
    <h3 style="margin-top:48px; margin-bottom:24px; font-size:1.4rem;">${q.answers?.length || 0} Professional Solutions</h3>
    ${(q.answers || []).map(a => `
      <div class="card-elite" style="margin-top:16px;">
        <div style="font-weight:800; margin-bottom:12px; font-size:0.9rem; color:var(--p-500); font-family:'Outfit'; position:relative; z-index:2;">${a.author_name}</div>
        <p style="line-height:1.7; font-size:1.05rem; position:relative; z-index:2;">${a.body}</p>
      </div>`).join('')}
  `;
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
function setupSubscriptions() { supabaseClient.channel('any').on('postgres_changes', { event: '*', schema: 'public' }, () => { fetchQuestions(); fetchProfile(); }).subscribe(); }
