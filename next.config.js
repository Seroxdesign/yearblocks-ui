/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["shared"],
  headers: {
    "/api/auth/(.*)": [
      { key: "Access-Control-Allow-Origin", value: "*" },
      { key: "Access-Control-Allow-Credentials", value: "true" },
    ],
  },
};

module.exports = nextConfig;
