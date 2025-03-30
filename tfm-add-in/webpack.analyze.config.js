const production = require('./webpack.config.js')
const { merge } = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = async (env, options) => {
    const baseConfig = await production(env, options);
    return merge(baseConfig,{
        plugins: [
            new BundleAnalyzerPlugin({
                analyzerMode: 'server',
                openAnalyzer: true
            })
        ]
    })
}