/** @type {import('next').NextConfig} */
import { withVercelToolbar } from "@vercel/toolbar/plugins/next"
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

// Instead of module.exports = nextConfig, do this:
export default withVercelToolbar()(nextConfig)
