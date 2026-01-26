import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'satyawati.du.ac.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'staticprintenglish.theprint.in',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'techportal.in',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;