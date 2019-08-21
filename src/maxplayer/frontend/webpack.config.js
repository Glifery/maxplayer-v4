const path = require('path');

module.exports = {
    entry: '../core/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '.dist')
    },
    node: { // https://github.com/webpack-contrib/css-loader/issues/447
        crypto: true,
        stream: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    }
};