-- Run this in the Supabase SQL Editor to create your tables

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  percentage INTEGER NOT NULL,
  role TEXT NOT NULL,
  subjects TEXT[] DEFAULT '{}',
  points INTEGER DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  subject TEXT NOT NULL,
  asker_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  asker_name TEXT NOT NULL,
  status TEXT DEFAULT 'open',
  best_answer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ANSWERS TABLE
CREATE TABLE IF NOT EXISTS answers (
  id TEXT PRIMARY KEY,
  question_id TEXT NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  author_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_best BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Allow anonymous read/write access (for development MVP purposes)
-- NOTE: In a real production app, you would use Row Level Security (RLS) with Supabase Auth.
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read users" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update users" ON users FOR UPDATE USING (true);

CREATE POLICY "Allow public read questions" ON questions FOR SELECT USING (true);
CREATE POLICY "Allow public insert questions" ON questions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update questions" ON questions FOR UPDATE USING (true);

CREATE POLICY "Allow public read answers" ON answers FOR SELECT USING (true);
CREATE POLICY "Allow public insert answers" ON answers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update answers" ON answers FOR UPDATE USING (true);
