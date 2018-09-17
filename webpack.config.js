const path = require("path");

const nodeExternals = require("webpack-node-externals");

module.exports = {
    mode: "none",
    devtool: "source-map",
    entry: "./src/app.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js",
        libraryTarget: "umd"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader"
        }]
    },
    target: "node",
    externals: [nodeExternals()]
}