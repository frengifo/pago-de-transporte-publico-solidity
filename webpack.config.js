
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode:"development", // "development" || "production"
    entry:"./src/index.js",
    devServer: {
        static : "./dist",
        hot:true
    },
    plugins:[
        new HTMLWebpackPlugin({
            title: "AirdropOne",
            template:"index.html"
        })
    ]

}