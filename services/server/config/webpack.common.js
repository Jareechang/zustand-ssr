const path = require('path')

module.exports = {
    entry: '',
    target: 'node',
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.(ts|tsx)$/,
                exclude: [/node_modules/],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'index.js'
    },
    plugins: [],
}

