/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: process.env.API_KEY,
    SERVICE_DOMAIN: process.env.SERVICE_DOMAIN
  },
  images: {
    domains: [
      'placehold.jp',
      'images.microcms-assets.io',
    ],
  },
}

module.exports = nextConfig
