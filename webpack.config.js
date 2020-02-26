const nodeExternals = require('webpack-node-externals')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path')

module.exports = {
    mode: "production",
    target: "node",
    entry: ["./index.js", "./sass/index.scss"],

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "./public"
    },

    externals: [nodeExternals()], // kommer ej packa några /node_modules/

    module: {
        rules: [
            { // sass / scss loader for webpack
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                })
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin({ // define where to save the css file
            filename: 'public/index.css'
        }),
    ],
}