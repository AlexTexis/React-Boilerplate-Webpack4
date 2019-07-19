const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TersetJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  entry  : {
    app : path.resolve(__dirname,'src/index.js'),
  },
  mode : 'production',

  output : {
    path : path.resolve(__dirname,'dist'),
    filename : 'js/[name].js',
    chunkFilename :'js/[id][chunkhash].js'
  },
  optimization : {
    minimizer : [
      new TersetJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  module : {
    rules : [
      {
        test : /\.js$/,
        exclude : /node_modules/ ,
        use : {
          loader : 'babel-loader'
        }
      },
      {
        test : /\.css|scss$/,
        use : [
          { loader :  MiniCssExtractPlugin.loader } ,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test : /\.png|jpg|gif|ttf|mp4$/,
        use : {
          loader : 'url-loader',
          options : {
            limit : 1000,
            outputPath : 'static',
            name : '[hash].[ext]'
          }
        }
      },

    ]
  },
  plugins : [
    new HtmlWebpackPlugin({
      template : path.resolve(__dirname,'public/index.html'),
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename : 'css/[name].[hash].css',
      chunkFilename : path.resolve(__dirname,'css/[id].[hash].css')
    }) ,
    new webpack.DllReferencePlugin({
    manifest : require('./modules-manifest.json')
    }) ,
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist/js/*.dll.js'),
      outputPath: 'js',
      publicPath : 'js/'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/app.*'],
    }) 
  ]
}