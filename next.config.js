/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  }
}

module.exports = nextConfig
