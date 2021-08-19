const withImages = require('next-images')

module.exports = withImages({
  // assetPrefix: 'https://example.com',
  // fileExtensions: ["jpg", "jpeg", "png", "gif"],
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: 'url-loader?limit=100000' 
      }
    )
    return config
  },
  images: {
    domains: ['i.etsystatic.com'],
    // loader: 'imgix',
  },
})
