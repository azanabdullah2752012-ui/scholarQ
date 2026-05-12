-- Run this in the Supabase SQL Editor to enable Realtime for your tables
-- This allows the frontend to listen for changes instantly

-- 1. Enable replication for the questions table
ALTER TABLE questions REPLICA IDENTITY FULL;

-- 2. Enable replication for the answers table
ALTER TABLE answers REPLICA IDENTITY FULL;

-- 3. Add tables to the realtime publication
-- Note: If you get an error that 'supabase_realtime' publication already exists, that's fine.
-- We use DO blocks to safely add tables.

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    CREATE PUBLICATION supabase_realtime;
  END IF;
END $$;

ALTER PUBLICATION supabase_realtime ADD TABLE questions;
ALTER PUBLICATION supabase_realtime ADD TABLE answers;
