/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/designs/:id/public',
        destination: 'http://localhost:5004/v1/designs/:id/public',
      },
    ];
  },
};
export default nextConfig;
