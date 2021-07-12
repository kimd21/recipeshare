const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    main: __dirname + '/public/javascripts/index.js'
  },
  output: {
    path: __dirname + '/public/javascripts/dist',
    filename: 'main.min.js',
    library: {
      name: 'lib',
      type: 'var'
    }
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
         "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                compileType: "icss"
              }
            }
          }, 
          "sass-loader"
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ]
};