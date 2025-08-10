-- Create early_access_signups table
CREATE TABLE IF NOT EXISTS early_access_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    device_type VARCHAR(20) NOT NULL CHECK (device_type IN ('ios', 'android')),
    source VARCHAR(100) DEFAULT 'unknown',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create unique constraint on email to prevent duplicates
ALTER TABLE early_access_signups 
ADD CONSTRAINT unique_email_early_access UNIQUE (email);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_early_access_email ON early_access_signups(email);

-- Create index on device_type for analytics
CREATE INDEX IF NOT EXISTS idx_early_access_device_type ON early_access_signups(device_type);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_early_access_created_at ON early_access_signups(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for signups)
CREATE POLICY "Allow public inserts" ON early_access_signups
    FOR INSERT WITH CHECK (true);

-- Create policy to allow reads for authenticated users only (for admin)
CREATE POLICY "Allow authenticated reads" ON early_access_signups
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_early_access_signups_updated_at
    BEFORE UPDATE ON early_access_signups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();