/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable Webpack caching in development to completely prevent cache corruptions
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
