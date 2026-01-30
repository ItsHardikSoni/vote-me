-- SecureVote Database Schema
-- Run these queries in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- States Table
CREATE TABLE IF NOT EXISTS states (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Districts Table
CREATE TABLE IF NOT EXISTS districts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(name, state_id)
);

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    epic_number VARCHAR(20) UNIQUE NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 18),
    date_of_birth DATE NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female', 'Other')),
    phone_number VARCHAR(10) UNIQUE NOT NULL CHECK (phone_number ~ '^[0-9]{10}$'),
    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    aadhar_number VARCHAR(12) UNIQUE NOT NULL CHECK (aadhar_number ~ '^[0-9]{12}$'),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    pincode VARCHAR(6) NOT NULL CHECK (pincode ~ '^[0-9]{6}$'),
    address TEXT NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE,
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_epic_number ON users(epic_number);
CREATE INDEX IF NOT EXISTS idx_users_phone_number ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_aadhar_number ON users(aadhar_number);
CREATE INDEX IF NOT EXISTS idx_users_state ON users(state);
CREATE INDEX IF NOT EXISTS idx_users_district ON users(district);
CREATE INDEX IF NOT EXISTS idx_districts_state_id ON districts(state_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert initial states and districts data
-- You can run these separately after creating the tables

-- Sample States
INSERT INTO states (name) VALUES
    ('Andhra Pradesh'),
    ('Arunachal Pradesh'),
    ('Assam'),
    ('Bihar'),
    ('Chhattisgarh'),
    ('Goa'),
    ('Gujarat'),
    ('Haryana'),
    ('Himachal Pradesh'),
    ('Jharkhand'),
    ('Karnataka'),
    ('Kerala'),
    ('Madhya Pradesh'),
    ('Maharashtra'),
    ('Manipur'),
    ('Meghalaya'),
    ('Mizoram'),
    ('Nagaland'),
    ('Odisha'),
    ('Punjab'),
    ('Rajasthan'),
    ('Sikkim'),
    ('Tamil Nadu'),
    ('Telangana'),
    ('Tripura'),
    ('Uttar Pradesh'),
    ('Uttarakhand'),
    ('West Bengal'),
    ('Delhi'),
    ('Jammu and Kashmir'),
    ('Ladakh'),
    ('Puducherry'),
    ('Chandigarh'),
    ('Andaman and Nicobar Islands'),
    ('Dadra and Nagar Haveli and Daman and Diu'),
    ('Lakshadweep')
ON CONFLICT (name) DO NOTHING;

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE districts ENABLE ROW LEVEL SECURITY;

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

-- Public read access for states and districts
CREATE POLICY "Public read access for states" ON states
    FOR SELECT USING (true);

CREATE POLICY "Public read access for districts" ON districts
    FOR SELECT USING (true);
