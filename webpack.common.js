const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./src/index.js", // specifies entry point of program
  plugins: [
    new HtmlWebpackPlugin({ // creates new index.html in dist directory with script main.js
      template: "./src/template.html" // specifies the template to use for generating new index.html
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // injects style tag in the DOM
          "css-loader", // turns css to common js
          "sass-loader" // turns sass to css
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      }
    ],
  }
}