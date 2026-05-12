-- Run this in the Supabase SQL Editor to update your questions table
-- This adds the new category system for different types of help

ALTER TABLE questions ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Doubt Solving';
ALTER TABLE questions ADD COLUMN IF NOT EXISTS cost INTEGER DEFAULT 2;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS reward INTEGER DEFAULT 5;
