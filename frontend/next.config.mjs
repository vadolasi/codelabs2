/** @type {import("next").NextConfig} */
import WindiCSSWebpackPlugin from "windicss-webpack-plugin"

export default {
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: "@next/font/google", options: { subsets: ["latin"] } }
    ]
  },
  webpack(config, context) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  }
}
