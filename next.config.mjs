/** @type {import('next').NextConfig} */
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
        hostname: "**", //! Insecure, don't do this with an actual app.
      },
      {
        protocol: "http",
        hostname: "**", //! Insecure, don't do this with an actual app.
      },
    ],
  },
}

export default nextConfig
