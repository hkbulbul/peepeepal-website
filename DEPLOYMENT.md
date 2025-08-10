# Deployment Guide

## Environment Variables for Vercel

To deploy this project successfully, you need to add the following environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://foqibcxkbwnkixutqjji.supabase.co`

2. **NEXT_PUBLIC_SUPABASE_ANON_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcWliY3hrYndua2l4dXRxamppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3Njg3MDAsImV4cCI6MjA3MDM0NDcwMH0.4GxhV6ymMh0poBf1UotnuGZvd9OuKS7QCunqR50-Ako`

3. **NEXT_PUBLIC_APP_URL**
   - Value: Your production URL (e.g., `https://your-app.vercel.app`)

## How to Add Environment Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable with the name and value above
5. Make sure to select all environments (Production, Preview, Development)
6. Redeploy your application

## Database Setup:

Make sure you've run the SQL migration in your Supabase dashboard:

```sql
CREATE TABLE early_access_signups (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    device_type VARCHAR(20) NOT NULL CHECK (device_type IN ('ios', 'android')),
    source VARCHAR(100) DEFAULT 'hero-cta',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE early_access_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON early_access_signups
    FOR INSERT WITH CHECK (true);
```

## Troubleshooting:

- If build fails with "Missing Supabase environment variables", ensure all environment variables are added in Vercel
- If the early access signup doesn't work, check that the database table exists
- Check the browser console for detailed error messages