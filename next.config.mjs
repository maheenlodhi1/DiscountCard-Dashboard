/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",//
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "res.cloudinary.com", protocol: "https", pathname: "**" },
    ],
  },
};

export default nextConfig;
