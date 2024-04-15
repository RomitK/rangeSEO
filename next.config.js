/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    API_HOST: process.env.API_HOST,
    MAP_ID:process.env.MAP_ID,
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
    FACEBOOK_LINK: process.env.FACEBOOK_LINK,
    INSTAGRAM_LINK: process.env.INSTAGRAM_LINK,
    TWITTER_LINK: process.env.TWITTER_LINK,
    LINKEDIN_LINK: process.env.LINKEDIN_LINK,
    YOUTUBE_LINK: process.env.YOUTUBE_LINK,
    TIKTOK_LINK: process.env.TIKTOK_LINK,
    WHATSAPP_LINK : process.env.WHATSAPP_LINK,
    WHATSAPP_NUMBER : process.env.WHATSAPP_NUMBER,
    GOOGLE_TAG_MANAGER: process.env.GOOGLE_TAG_MANAGER
  },
};
module.exports = {
  async headers() {
    return [
      {
        source: '/videos/dk-version-3.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, immutable',
          },
        ],
      },
      {
        source: '/videos/dk-mobile.mp4',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600', // Cache assets for 1 hour (3600 seconds)
          },
        ],
      },
      {
        source: '/static/:path*', // Apply caching headers to assets in the /static directory
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600', // Cache assets for 1 hour
          },
        ],
      },
    ];
  },
};
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 120,
  },
};
module.exports = nextConfig;
