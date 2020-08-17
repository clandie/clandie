const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.tsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    proxy: {
      '/': 'http://localhost:3000',
    },
    hot: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/env'],
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
