const path = require('path')
const { ModuleFederationPlugin } = require('webpack').container

const config = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            minSize: 1 * 1024,
            chunks: 'all',
            name: 'vue'
        }
    },
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, 'node_modules', '.cache_temp')
    },
    module: {
        rules: [
            {
                test: /\.(jpg|jpeg|png|gif|webp|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 1024,
                    }
                },
                generator: {
                    filename: 'images/[name][hash:5][ext]'
                }
            }
        ]
    },
    experiments: {
        buildHttp: {
            allowedUris: [
                'https://fast-learn-oss.youbaobao.xyz/',
                'http://imooc-dev.youbaobao.xyz',
            ],
            frozen: false,
            cacheLocation: false,
            upgrade: true
        },
    },
    devServer: {
        host: 'localhost',
        port: '3000'
    },
    plugins: [
        new ModuleFederationPlugin({
            filename: 'app_a.js',
            name: 'main',
            exposes: {
                './moduleA': './src/index.js'
            }
        })
    ]
}

module.exports = config