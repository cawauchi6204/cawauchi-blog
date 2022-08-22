/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeFonts: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BLOG_API_KEY: process.env.API_KEY,
    BLOG_SERVICE_DOMAIN: process.env.SERVICE_DOMAIN
  },
  images: {
    domains: [
      'placehold.jp',
      'images.microcms-assets.io',
    ],
  },
}

module.exports = nextConfig
