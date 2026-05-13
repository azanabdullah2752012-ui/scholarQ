-- ScholarQ | Backend Rebuild V111
-- RUN THIS IN THE SUPABASE SQL EDITOR

-- 1. DROP OLD TABLES (HARD RESET)
DROP TABLE IF EXISTS purchases CASCADE;
DROP TABLE IF EXISTS marketplace_items CASCADE;
DROP TABLE IF EXISTS answers CASCADE;
DROP TABLE IF EXISTS questions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 2. USERS (INSTITUTIONAL IDENTITY)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE,
  name TEXT,
  points INTEGER DEFAULT 50,
  role TEXT DEFAULT 'student',
  percentage INTEGER DEFAULT 0,
  credibility INTEGER DEFAULT 100,
  streak INTEGER DEFAULT 0,
  last_login DATE,
  last_challenge_date DATE,
  daily_boost_count INTEGER DEFAULT 0,
  last_boost_date DATE,
  daily_best_count INTEGER DEFAULT 0,
  last_best_date DATE,
  last_rewarder_id UUID
);

-- 3. QUESTIONS (DISCOVERY HUB)
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  subject TEXT NOT NULL,
  asker_id UUID REFERENCES users(id),
  asker_name TEXT,
  status TEXT DEFAULT 'open',
  boosted BOOLEAN DEFAULT FALSE,
  best_answer_id TEXT
);

-- 4. ANSWERS (PEER SOLUTIONS)
CREATE TABLE answers (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  question_id TEXT REFERENCES questions(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id),
  author_name TEXT,
  author_role TEXT,
  body TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0
);

-- 5. MARKETPLACE (THE VAULT)
CREATE TABLE marketplace_items (
  id TEXT PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  title TEXT NOT NULL,
  price INTEGER NOT NULL,
  link TEXT NOT NULL,
  seller_id UUID REFERENCES users(id),
  seller_name TEXT,
  downloads INTEGER DEFAULT 0
);

-- 6. PURCHASES (ECONOMY CIRCULATION)
CREATE TABLE purchases (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES users(id),
  item_id TEXT REFERENCES marketplace_items(id)
);

-- 7. ENABLE PUBLIC ACCESS (FOR LAUNCH TESTING)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read/Write User" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Question" ON questions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Answer" ON answers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Market" ON marketplace_items FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public Read/Write Purchase" ON purchases FOR ALL USING (true) WITH CHECK (true);
