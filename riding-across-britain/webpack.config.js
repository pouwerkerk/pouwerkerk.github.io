const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        port: 8081,
        open: true
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(png|jpg|gif|svg|eot|ttf|woff2?)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {},
                },
            ],
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Ride Across Britain",
            template: 'src/template.html'
        }),
    ]
};
