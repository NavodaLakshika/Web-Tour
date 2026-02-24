
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function listTestimonials() {
    const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching testimonials:', error.message);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No testimonials found in the database.');
        return;
    }

    console.log('--- Current Testimonials in Database ---');
    data.forEach((t, i) => {
        console.log(`${i + 1}. [${t.status.toUpperCase()}] ${t.name} (${t.role})`);
        console.log(`   Location: ${t.location}`);
        console.log(`   Message: "${t.text.substring(0, 50)}..."`);
        console.log(`   Rating: ${t.rating} Stars`);
        console.log('---------------------------------------');
    });
}

listTestimonials();
