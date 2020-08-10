const path = require('path');

module.exports = [
  {
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
  },
  {
    entry: './src/serviceworker/sw.js',
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
      filename: 'sw.js',
      path: path.resolve(__dirname, 'public'),
    },
  },
  {
    entry: './src/offline/main.js',
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
      filename: 'offline.js',
      path: path.resolve(__dirname, 'public', 'js'),
    },
  },
  {
    entry: './src/serviceworker/app.js',
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
      filename: 'app.js',
      path: path.resolve(__dirname, 'public', 'js'),
    },
  },
  {
    entry: './src/mnist/main.js',
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
      filename: 'mnist.js',
      path: path.resolve(__dirname, 'public', 'js'),
    },
  }
]
