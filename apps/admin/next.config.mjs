/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hub/ui', '@hub/types', '@hub/utils'],
  reactStrictMode: true,
};

export default nextConfig;
