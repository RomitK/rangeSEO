/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_HOST: process.env.API_HOST,
    GOOGLE_MAP_KEY: process.env.GOOGLE_MAP_KEY,
  },
};

module.exports = nextConfig;
