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
  },
};
module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600', // Cache assets for 1 hour (3600 seconds)
          },
        ],
      },
    ];
  },
};
module.exports = nextConfig;
