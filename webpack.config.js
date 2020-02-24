const path = require('path')

module.exports = {
    mode: "development",
    target: "node",
    entry: "./index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "./public"
    }
}