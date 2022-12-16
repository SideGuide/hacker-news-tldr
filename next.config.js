/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env:{
        POSTHOG_KEY: process.env.POSTHOG_KEY,
        OPENAI_API_KEY: process.env.OPENAI_API_KEY
    }
    
  }
  
  module.exports = nextConfig
  
  