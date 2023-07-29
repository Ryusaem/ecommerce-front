/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // compiler styledComponents is used to auto import styled-components
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
