-- Create email_signups table for PeePeePal landing page
CREATE TABLE email_signups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    source VARCHAR(50) DEFAULT 'unknown',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_email_signups_email ON email_signups(email);
CREATE INDEX idx_email_signups_created_at ON email_signups(created_at DESC);
CREATE INDEX idx_email_signups_source ON email_signups(source);

-- Enable Row Level Security (RLS)
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON email_signups TO anon;
GRANT ALL PRIVILEGES ON email_signups TO authenticated;

-- Create policy for inserting new signups (allow anonymous users)
CREATE POLICY "Allow anonymous email signups" ON email_signups
    FOR INSERT TO anon
    WITH CHECK (true);

-- Create policy for reading signups (allow authenticated users)
CREATE POLICY "Allow authenticated users to read signups" ON email_signups
    FOR SELECT TO authenticated
    USING (true);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_email_signups_updated_at
    BEFORE UPDATE ON email_signups
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();