/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "search1.kakaocdn.net",
      "t4.ftcdn.net"
    ],
  },
};

module.exports = nextConfig; 