const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');

module.exports = function (env) {
  const isDevelopment = env.NODE_ENV === 'development';
  const isProduction = env.NODE_ENV === 'production';

  return {
    mode: isProduction ? 'production' : isDevelopment && 'development',
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/i,
          use: [
            isDevelopment && {
              //开发环境使用style-loader
              loader: 'style-loader',
              options: {
                esModule: true,
              },
            },
            isProduction && {
              //生产环境使用mini-css-extract-plugin
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../../', //因为提取的CSS文件最终位于 static/css文件夹中，所以往上两层
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDevelopment ? '[path][name]__[local]' : '[hash:base64]',
                },
              },
            },
          ].filter(Boolean),
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        inject: 'body',
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
        }),
      new WebpackBar(),
    ].filter(Boolean),
    devtool: isProduction ? 'source-map' : false,
    devServer: {
      open: true,
      port: 9999,
      hot: true,
      noInfo: true,
      compress: true,
      writeToDisk: false,
    },
  };
};
