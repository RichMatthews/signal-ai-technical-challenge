const withReactSvg = require('next-react-svg')
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'static.tvmaze.com'],
  },
  ...withReactSvg({
    include: path.resolve(__dirname, 'assets'),
    webpack(config) {
      return config
    },
  }),
}

module.exports = nextConfig
