/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.project-kalian.rmecha.my.id',
        pathname: '/img/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        pathname: '/emojis/**',
      },
    ],
  },
}

module.exports = nextConfig
