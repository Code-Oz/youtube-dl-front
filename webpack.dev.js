const path = require("path")
const commonConfig = require("./webpack.common")
const merge = require('webpack-merge')

// Get variable ENV, prod or dev
const env = process.env.NODE_ENV

const config = {
    mode: "development",
    devServer: {
        // Show info about dev server
        noInfo: false,
        // Port of dev server
        port: 8080,
        // Asking the server to fallback to index.html in the event that a requested resource cannot be found, need to vue router
        historyApiFallback: true,
        // Allows https in dev server
        // Use this https://stackoverflow.com/questions/35531347/localhost-blocked-on-chrome-with-privacy-error for allow https in localhost directly on chrome
        https: true,
    },
    // This is the output of Webpack
    output: {
        // From current folder + dist folder that will contains all bundle
        path: path.resolve(__dirname, "dist/"),
        // Public folder for load our files, webpack needs to know where you'll host the generated bundle !
        // You can use CDN and use base url as base for public path
        // Basically: ./dist/build.js in the filesystem becomes /dist/build.js
        publicPath: "/",
        // Name of the bundle
        filename: "index.js"
    },
    module: {
        rules: [
            {
                // Match file extension
                test: /\.(sa|sc|c)ss$/,
                // Use multiple loader
                // Order => from bottom to top
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            }
        ]
    }
}

// Merge commonConfig with dev config, priority to dev config
module.exports = merge(commonConfig, {
    ...config,
})
