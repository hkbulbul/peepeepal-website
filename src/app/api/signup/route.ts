import { NextRequest, NextResponse } from 'next/server';
import { signupEmail } from '@/lib/supabase';
import { z } from 'zod';

// Validation schema for email signup
const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  source: z.string().optional().default('unknown'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = signupSchema.parse(body);
    
    // Sign up email using Supabase
    const result = await signupEmail(validatedData.email, validatedData.source);
    
    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          message: result.message,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: result.message,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('API signup error:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.issues[0]?.message || 'Invalid input data',
        },
        { status: 400 }
      );
    }
    
    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}