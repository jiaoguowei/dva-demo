const path = require('path')
// let webpack = require('webpack')


export default {
  entry: 'src/index.js',
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr'
      ]
    },
    production: {
      extraBabelPlugins: [
        'transform-remove-console'
      ],
      comments: false
    }
  },
  alias: {
    '~': path.resolve(__dirname, './src')
  },
  // externals: {
  //   "react": "window.React",
  // },
  publicPath: '/',
  manifest: {
    "basePath": "/"
  },
  disableDynamicImport: true,
}