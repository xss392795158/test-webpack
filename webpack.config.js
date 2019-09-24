const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// function recursiveIssuer(m) {
//   if (m.issuer) {
//     return recursiveIssuer(m.issuer);
//   } else if (m.name) {
//     return m.name;
//   } else {
//     return false;
//   }
// }

module.exports = { 
  entry: {
    main: './src/main.js',
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[chunkhash].js',
    publicPath: '/'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          'pug-html-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 50,
      // maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name(module, chunks, cacheGroupKey) {// 新的chunk 名为 vendor
        return 'whoimi'
      },
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        abc: {
          // test: (module, c, entry = 'main') => {
          //   return m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry
          // },
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'abc',
        }
      }
    }
  },
  stats: { children: false },
  devtool: 'eval-source-map',
  plugins: [
    new htmlWebpackPlugin({
      filename: 'main.html',
      template: path.resolve(__dirname, './src/views/main.pug'),
      inject: true,
      chunks: ['main', 'abc'],
      hash: true
    }),
    new htmlWebpackPlugin({
      filename: 'hello.html',
      template: path.resolve(__dirname, './src/views/index.pug'),
      inject: true,
      chunks: ['index', 'abc'],
      hash: true
    }),
    new htmlWebpackPlugin({
      filename: '404.html',
      template: path.resolve(__dirname, './views/404.pug'),
      inject: true,
      // chunks: ['index', 'abc'],
      hash: true
    }),
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin()
  ]
}