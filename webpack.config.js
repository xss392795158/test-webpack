const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = { 
  entry: {
    main: './src/index.js',
    index: './src/mymy.js',
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].[chunkhash].js'
  },
  mode: 'development',
  resolve: {
    extensions: ['.js']
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
      template: path.resolve(__dirname, './src/views/index.html'),
      inject: true,
      chunks: ['main', 'abc'],
      hash: true
    }),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/views/index.html'),
      inject: true,
      chunks: ['index', 'abc'],
      hash: true
    }),
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin()
  ]
}