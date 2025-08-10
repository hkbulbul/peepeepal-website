import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.');
}

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

export interface EarlyAccessSignup {
  id: string;
  email: string;
  device_type: 'ios' | 'android';
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

// Early access signup function
export async function signupEarlyAccess(email: string, deviceType: 'ios' | 'android', source: string = 'hero-cta') {
  try {
    console.log('Attempting to insert:', { email, device_type: deviceType, source });
    
    const { data, error } = await supabase
      .from('early_access_signups')
      .insert([
        {
          email,
          device_type: deviceType,
          source,
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        full_error: error
      });
      
      // Handle specific error cases immediately
      if (error.code === '23505') {
        return { success: false, message: 'This email is already on our waitlist!' };
      }
      
      if (error.code === '42P01') {
        return { success: false, message: 'Database table not found. Please run the migration first.' };
      }
      
      if (error.message) {
        return { success: false, message: `Database error: ${error.message}` };
      }
      
      return { success: false, message: 'Database connection failed. Please try again.' };
    }

    console.log('Insert successful:', data);
    return { success: true, data, message: 'Successfully joined the waitlist! We\'ll notify you when we launch.' };
  } catch (error: unknown) {
    console.error('Unexpected error:', error);
    console.error('Error type:', typeof error);
    console.error('Error constructor:', error?.constructor?.name);
    
    return { success: false, message: 'An unexpected error occurred. Please try again.' };
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

// Get all early access signups (for admin use)
export async function getEarlyAccessSignups() {
  try {
    const { data, error } = await supabase
      .from('early_access_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Get early access signups error:', error);
    return { success: false, data: [] };
  }
}