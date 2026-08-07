/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@hub/ui', '@hub/types', '@hub/utils', '@hub/contracts'],
  reactStrictMode: true,
};

export default nextConfig;
