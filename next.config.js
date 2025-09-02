/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: true,
  },
  api: {
    bodyParser: false,
  },
}

module.exports = nextConfig