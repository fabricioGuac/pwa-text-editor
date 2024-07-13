// Imports the necessary modules for webpack configuration
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');



module.exports = () => {
  return {
    // Sets the mode to development
    mode: 'development',
    // Defines the entry points for webpack build
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // Configures the output path and filename for the bundled files
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Configures the plugins
    plugins: [
      // Generates the html file with the specified template
    new HtmlWebpackPlugin({
      template:'./index.html',
      title:'Text editor',
    }),

    // Injects the service worker into the build
    new InjectManifest({
      swSrc:'./src-sw.js',
      swDest:'src-sw.js',
    }),

    // Creates a web app manifest for the PWA
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Text editor',
      short_name: 'Textor',
      description: 'Create notes or code snippets with or without an internet connection',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    })
    ],

    // Configures the module rules for handling javascript and css files
    module: {
      rules: [
        // Handles css files
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        // Handles javascript files and uses babel as a transcompiler
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use:{
            loader:'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }
          }
        }
      ],
    },
  };
};
