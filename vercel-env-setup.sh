#!/bin/bash

# Production Environment Variables
echo "Setting up Vercel environment variables..."

vercel env add DATABASE_URL production
vercel env add DIRECT_URL production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add JWT_SECRET production
vercel env add NEXTAUTH_URL production
vercel env add NEXTAUTH_SECRET production

# Preview Environment Variables
vercel env add DATABASE_URL preview
vercel env add DIRECT_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_URL preview
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
vercel env add JWT_SECRET preview
vercel env add NEXTAUTH_URL preview
vercel env add NEXTAUTH_SECRET preview

# Development Environment Variables
vercel env add DATABASE_URL development
vercel env add DIRECT_URL development
vercel env add NEXT_PUBLIC_SUPABASE_URL development
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY development
vercel env add JWT_SECRET development
vercel env add NEXTAUTH_URL development
vercel env add NEXTAUTH_SECRET development

echo "Environment variables setup complete!"
