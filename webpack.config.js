const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        bundle: path.resolve(__dirname, "src/main.js")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, "dist")
        },
        port: 3000,
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            title: "Book List",
            filename: "index.html",
            template: "./src/index.html"
        })
    ]
}