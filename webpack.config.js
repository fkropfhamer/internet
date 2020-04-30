const path = require('path');

module.exports = {
  entry: './src/swarm/main.js',
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.js' ],
  },
  output: {
    filename: 'swarm.js',
    path: path.resolve(__dirname, 'public', 'js'),
  },
};