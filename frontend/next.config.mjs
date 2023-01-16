/** @type {import("next").NextConfig} */

export default {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } }
    ]
  }
}
