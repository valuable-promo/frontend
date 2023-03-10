/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    loader: 'default',
    domains: [
      'localhost',
      'host.docker.internal',
      'valuable-promo-headless-dev.s3.nl-ams.scw.cloud',
      'valuable-promo-headless-prod.s3.nl-ams.scw.cloud',
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'valuable-promo-headless-dev.s3.nl-ams.scw.cloud',
    //     port: '',
    //     pathname: '**',
    //   },
    //   {
    //     protocol: 'https',
    //     hostname: 'valuable-promo-headless-prod.s3.nl-ams.scw.cloud',
    //     port: '',
    //     pathname: '**',
    //   },
    // ],
  },
};

module.exports = nextConfig;
