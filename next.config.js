/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    })
    return config
  },
}

module.exports = nextConfig
