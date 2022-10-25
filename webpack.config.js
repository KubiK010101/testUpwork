const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
     entry: "./main.tsx",
     output: {
          path: path.join(__dirname, "/bundle"),
          filename: "bundle.js",
     },   
     module: {
          rules: [
               {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
               },
          ],
     },
     resolve: {
          extensions: ['.tsx', '.ts', '.js'],
     },   
     plugins: [
          new HtmlWebpackPlugin({
               template: "./index.html",
          }),
     ],
};
