const VueLoaderPlugin = require('vue-loader/lib/plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cdnDev = require("./cdn.dev")

// Get variable ENV, prod or dev
const env = process.env.NODE_ENV
const isAnalyze = !!process.env.ANALYSE
const analyzerMode = isAnalyze ? "server" : "disabled"

const config = {
    // Webpack start from this entry point
    entry: {
        myApp: [
            "./src/index.ts",
        ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    // Allow to tell to ts-loader: "If you see .vue file, handle it as a .ts"
                    appendTsSuffixTo: [/\.vue$/]
                }
            }, {
                test: /\.vue$/,
                loader: "vue-loader",
            }, {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader'
            },
        ],
    },
    // External lib that will not be put in bundle but use from CDN
    externals: {
        vue: 'Vue',
    },
    // The resolve object allows you to configure how webpack’s module resolution works
    resolve: {
        // Attempt to resolve these extensions in order
        extensions: ['.ts', '.js', '.vue'],
        // Just alias
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    },
    plugins: [
        // vue-loader is a loader for webpack that allows you to author Vue components in a format called Single-File Components
        new VueLoaderPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: isAnalyze,
            analyzerMode,
        }),
        // Need to be use in dev also since dev need an HTML page for working!
        new HtmlWebpackPlugin({
            title: 'Youtube Downloader',
            template: './src/index.html',
            cdn: cdnDev,
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        })
    ],
}

module.exports = config
