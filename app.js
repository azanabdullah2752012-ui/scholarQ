// ScholarQ - Student-First Basics (V112)
const supabaseUrl = 'https://kkcuyoxbrblbocazsjfn.supabase.co';
const supabaseKey = 'sb_publishable_W42MaHoLDkYMkx3OmP0CcA_EGxcSpMW';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

let session = null, profile = null, questions = [], currentView = 'auth';

document.addEventListener('DOMContentLoaded', async () => {
  lucide.createIcons();
  
  // 1. BOOT
  const { data: { session: s } } = await supabaseClient.auth.getSession();
  await handleSessionUpdate(s);
  
  // 2. LISTEN
  supabaseClient.auth.onAuthStateChange(async (e, s) => {
    if (e === 'SIGNED_IN' || e === 'SIGNED_OUT') await handleSessionUpdate(s);
  });

  // 3. BIND
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
      if (currentView === 'auth') navigateTo('home');
    } else {
      // Create profile if missing
      await handleFinishProfile();
    }
  } else { navigateTo('auth'); }
  document.getElementById('top-nav').style.display = session ? 'block' : 'none';
}

async function fetchProfile() {
  if (!session) return false;
  const { data } = await supabaseClient.from('users').select('*').eq('id', session.user.id).maybeSingle();
  if (data) { profile = data; updateUI(); return true; }
  return false;
}

function navigateTo(view, param = null) {
  if (!session && view !== 'auth') view = 'auth';
  currentView = view;
  document.querySelectorAll('.view').forEach(v => v.style.display = 'none');
  const el = document.getElementById(`view-${view}`);
  if (el) el.style.display = 'block';

  if (view === 'home') renderFeed();
  if (view === 'profile') renderProfile();
  if (view === 'question') renderQuestionDetail(param);
  lucide.createIcons();
}

async function fetchQuestions() {
  const { data: q } = await supabaseClient.from('questions').select('*').order('created_at', { ascending: false });
  const { data: a } = await supabaseClient.from('answers').select('*');
  questions = (q || []).map(item => ({ ...item, answers: (a || []).filter(ans => ans.question_id === item.id) }));
  if (currentView === 'home') renderFeed();
}

function renderFeed() {
  const cont = document.getElementById('home-feed');
  cont.innerHTML = questions.map(q => `
    <div class="feed-item" onclick="navigateTo('question', '${q.id}')">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span class="badge">${q.subject}</span>
        <span style="font-size:0.75rem; color:var(--text-secondary);">${new Date(q.created_at).toLocaleDateString()}</span>
      </div>
      <h3 style="font-size:1.25rem; font-weight:700;">${q.title}</h3>
      <p style="color:var(--text-secondary); margin-top:8px;">By ${q.asker_name} • ${q.answers?.length || 0} Solutions</p>
    </div>
  `).join('');
}

async function handleAuth(e) {
  e.preventDefault();
  const em = document.getElementById('auth-email').value, pw = document.getElementById('auth-password').value;
  const { error } = await supabaseClient.auth.signInWithPassword({ email: em, password: pw });
  if (error) {
    const { error: upErr } = await supabaseClient.auth.signUp({ email: em, password: pw });
    if (upErr) alert(upErr.message); else alert("Check email to verify!");
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

function updateUI() { document.getElementById('nav-points').innerText = `${profile.points} PTS`; }
function renderProfile() { document.getElementById('profile-name').innerText = profile.name; document.getElementById('profile-email').innerText = profile.email; document.getElementById('profile-points').innerText = profile.points; document.getElementById('profile-questions').innerText = questions.filter(q => q.asker_id === profile.id).length; }

let currentQuestionId = null;
function renderQuestionDetail(id) {
  currentQuestionId = id;
  const q = questions.find(x => x.id === id); if (!q) return;
  document.getElementById('qd-content').innerHTML = `<h2>${q.title}</h2><p style="margin-top:16px; font-size:1.1rem;">${q.body}</p>`;
  document.getElementById('qd-answers').innerHTML = (q.answers || []).map(a => `<div class="card-basic" style="margin-top:12px;"><strong>${a.author_name}</strong><p style="margin-top:8px;">${a.body}</p></div>`).join('');
}

async function logout() { await supabaseClient.auth.signOut(); window.location.reload(); }
async function signInWithGoogle() { await supabaseClient.auth.signInWithOAuth({ provider: 'google' }); }
