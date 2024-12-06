/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "nextjs.org" }],
  },
};

export default nextConfig;
