-- Simple migration for early_access_signups table
-- Copy and paste this into your Supabase SQL Editor

CREATE TABLE early_access_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    device_type VARCHAR(20) NOT NULL CHECK (device_type IN ('ios', 'android')),
    source VARCHAR(100) DEFAULT 'hero-cta',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (for signups)
CREATE POLICY "Allow public inserts" ON early_access_signups
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read (for admin)
CREATE POLICY "Allow authenticated reads" ON early_access_signups
    FOR SELECT USING (auth.role() = 'authenticated');