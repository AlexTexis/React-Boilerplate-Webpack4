const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry  : {
    app : path.resolve(__dirname,'src/index.js'),
  },
  output : {
    path : path.resolve(__dirname,'dist'),
    filename : 'js/[name].js',
    publicPath : 'http://localhost:3000/',
    chunkFilename :  'js/[id][chunkhash].js'
  },
  devServer : {
    contentBase: path.resolve(__dirname, 'dist'),
    port : 3000,
    hot : true,
    open : true
  },
  module : {
    rules : [
      {
        test : /\.html$/,
        use : {
          loader : 'html-loader'
        }
      },
      {
        test : /\.js$/,
        exclude : /node_modules/,
        use : {
          loader : 'babel-loader'
        }
      },
      {
        test : /\.css|scss$/,
        loader : ['style-loader','css-loader','sass-loader',]
        
      },
      {
        test : /\.png|jpg|gif|ttf|mp4$/,
        use : {
          loader : 'file-loader'
        }
      },

    ]
  },
    plugins : [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template : path.resolve(__dirname,'public/index.html')
      })
    ]
}