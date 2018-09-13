const path = require("path");

const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "none",
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader"
        }]
    },
    target: "node",
    externals: [nodeExternals()]
}