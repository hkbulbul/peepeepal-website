// Test Supabase connection and table existence
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing');

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing environment variables!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n🔍 Testing Supabase connection...');
    
    // Test basic connection
    const { data, error } = await supabase
      .from('early_access_signups')
      .select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Table does not exist or connection failed:', error.message);
      console.log('\n📝 You need to run the SQL migration in your Supabase dashboard:');
      console.log('1. Go to https://supabase.com/dashboard');
      console.log('2. Select your project');
      console.log('3. Go to SQL Editor');
      console.log('4. Copy and paste the content from supabase-migration.sql');
      console.log('5. Run the migration');
    } else {
      console.log('✅ Connection successful! Table exists with', data?.length || 0, 'records');
    }
  } catch (err) {
    console.error('❌ Connection error:', err.message);
  }
}

testConnection();