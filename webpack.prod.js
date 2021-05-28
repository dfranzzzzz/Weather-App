const path = require("path");
const common = require("./webpack.common"); 
const { merge } = require("webpack-merge");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

module.exports = merge (common, {
  mode: "production",
  output: {
    filename: "main.[contenthash].js", // creates contenthashed main.js
    path: path.resolve(__dirname, "dist"), // stores contenthashed main.js in dist folder
    assetModuleFilename: "./assets/[name].[contenthash].[ext]", // stores assets in a 'assets' folder
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!assets/**']
    })
  ] // removes excess main.js in dist directory when building
})