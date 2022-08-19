/** @type {import('next').NextConfig} */

const path = require("path");
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: [
      "img.icons8.com",
      "picsum.photos",
      "www.accede.edu.np",
      "college.sunway.edu.my",
      "thumbs.dreamstime.com",
    ],
  },
};

module.exports = nextConfig;
