/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env:{
        POSTHOG_KEY: process.env.POSTHOG_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY,
        NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    }
    
  }
  
  module.exports = nextConfig
  
  