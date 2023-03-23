/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: 'default',
    domains: ['localhost', 'host.docker.internal', process.env.NEXT_PUBLIC_STORAGE_HOST],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
