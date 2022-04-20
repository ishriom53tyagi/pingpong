module.exports = {
    entry: {
        app: './app.js'
    },
    target: 'node',
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
        chunkFilename: "[id].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    resolveLoader: {
        modules: [
            __dirname + '/node_modules'
        ]
    },
    node: {
      __dirname: true,
    },
    externals: {
        uws: "uws",
        yamlparser:"yamlparser",
        './config/config.json': 'require("./config/config.json")',
        '../../config/config.json': 'require("./config/config.json")',
        '../../config/config': 'require("./config/config.json")',
        '../config/config.json': 'require("./config/config.json")',
        './config.json': 'require("./config/config.json")',
        'apminsight': 'require("apminsight")'
    },
    optimization: {
        minimize: false,
    }
}