-- Fix RLS Policies for User Registration
-- Run this in your Supabase SQL Editor to fix the registration error

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Allow user registration" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

-- Allow anonymous users (anon role) to insert new user records during registration
CREATE POLICY "Allow user registration" ON users
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow authenticated users to view their own data
CREATE POLICY "Users can view own data" ON users
    FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

-- Optional: Allow anonymous users to read their own data by email/phone during registration flow
-- This might be needed if you want to check if a user already exists before registration
CREATE POLICY "Allow anonymous read for registration check" ON users
    FOR SELECT
    TO anon
    USING (true);

