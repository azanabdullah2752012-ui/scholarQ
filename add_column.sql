-- Run this in your Supabase SQL Editor:
ALTER TABLE public.doubts ADD COLUMN IF NOT EXISTS target_scholar_id UUID REFERENCES public.profiles(id);
