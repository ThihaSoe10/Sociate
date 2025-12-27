import { createClient } from '@supabase/supabase-js';

// NOTE: In a real Next.js app, these would be process.env.NEXT_PUBLIC_SUPABASE_URL
// We provide your specific keys as fallbacks here to ensure the app connects to your backend.
const supabaseUrl = process.env.SUPABASE_URL || 'https://ijqjyfpqnwlauqhtpsmw.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqcWp5ZnBxbndsYXVxaHRwc213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MjM1NzYsImV4cCI6MjA4MjM5OTU3Nn0.Amgh_SdDVYAGvaWaiHZnQ5sk6X8JNtikMf3wrftXViM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * DATABASE SCHEMA REFERENCE (Supabase PostgreSQL)
 * 
 * Run this SQL in your Supabase SQL Editor to set up the backend:
 * 
 * -- Enable UUID extension
 * create extension if not exists "uuid-ossp";
 * 
 * -- 1. Profiles Table
 * create table profiles (
 *   id uuid references auth.users on delete cascade,
 *   email text,
 *   full_name text,
 *   avatar_url text,
 *   updated_at timestamp with time zone,
 *   created_at timestamp with time zone default timezone('utc'::text, now()),
 *   primary key (id)
 * );
 * 
 * -- 2. Posts Table
 * create table posts (
 *   id uuid default uuid_generate_v4() primary key,
 *   user_id uuid references profiles(id) on delete cascade not null,
 *   content text,
 *   platforms text[], -- Array of strings e.g. ['facebook', 'telegram']
 *   status text check (status in ('draft', 'scheduled', 'published')) default 'draft',
 *   scheduled_at timestamp with time zone,
 *   created_at timestamp with time zone default timezone('utc'::text, now())
 * );
 * 
 * -- 3. Row Level Security (RLS)
 * alter table profiles enable row level security;
 * alter table posts enable row level security;
 * 
 * create policy "Public profiles are viewable by everyone." on profiles for select using (true);
 * create policy "Users can insert their own profile." on profiles for insert with check (auth.uid() = id);
 * create policy "Users can update own profile." on profiles for update using (auth.uid() = id);
 * 
 * create policy "Users can view own posts." on posts for select using (auth.uid() = user_id);
 * create policy "Users can insert own posts." on posts for insert with check (auth.uid() = user_id);
 * create policy "Users can update own posts." on posts for update using (auth.uid() = user_id);
 * create policy "Users can delete own posts." on posts for delete using (auth.uid() = user_id);
 */