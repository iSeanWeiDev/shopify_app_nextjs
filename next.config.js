const { parsed: localEnv } = require('dotenv').config();

const webpack = require('webpack');
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);

module.exports = {
  env: { ...localEnv },
  webpack: (config) => {
    const env = { API_KEY: apiKey };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto'
    });

    // Add Graphql Loader
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader'
    });

    // Add Graphql Loader
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'svg-url-loader',
          options: {
            limit: 10000
          }
        }
      ]
    });

    return config;
  }
};
