import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8001',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'menu.hackphiles.in',
        port: '',
        search: '',
      },
    ],
  },
};

export default nextConfig;
