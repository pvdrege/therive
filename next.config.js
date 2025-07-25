/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during production build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignore ESLint errors during production build  
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['localhost'],
  },
}

module.exports = nextConfig 