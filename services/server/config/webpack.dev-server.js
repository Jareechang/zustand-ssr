const path = require('path')
const merge = require('webpack-merge').merge
const common = require('./webpack.common')
const nodeExternals = require('webpack-node-externals')

process.env.NODE_ENV = 'development'

module.exports = merge(common, {
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    entry: path.join(__dirname, '../src/index.tsx'),
    externals: [
        nodeExternals({
            additionalModuleDirs: [
                path.resolve('../../node_modules')
            ]
        })
    ],
    resolve: {
        alias: {
            client: path.join(__dirname, '../../client')
        },
        extensions: [
            '.ts',
            '.tsx'
        ]
    },
})
