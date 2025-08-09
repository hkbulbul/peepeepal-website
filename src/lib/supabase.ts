import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://foqibcxkbwnkixutqjji.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvcWliY3hrYndua2l4dXRxamppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3Njg3MDAsImV4cCI6MjA3MDM0NDcwMH0.4GxhV6ymMh0poBf1UotnuGZvd9OuKS7QCunqR50-Ako';

// Create Supabase client for frontend use
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface EmailSignup {
  id: string;
  email: string;
  source: string;
  created_at: string;
  updated_at: string;
}

// Email signup function
export async function signupEmail(email: string, source: string = 'unknown') {
  try {
    const { data, error } = await supabase
      .from('email_signups')
      .insert([
        {
          email,
          source,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return { success: true, data, message: 'Successfully signed up for early access!' };
  } catch (error: unknown) {
    console.error('Email signup error:', error);
    
    // Handle duplicate email error
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return { success: false, message: 'This email is already signed up for early access!' };
    }
    
    return { success: false, message: 'Failed to sign up. Please try again.' };
  }
}

// Get all email signups (for admin use)
export async function getEmailSignups() {
  try {
    const { data, error } = await supabase
      .from('email_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Get email signups error:', error);
    return { success: false, data: [] };
  }
}