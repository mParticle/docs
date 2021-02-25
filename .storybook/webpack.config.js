const path = require('path');

const pathPrefix = process.env.PATH_PREFIX || '';
const imagePathPrefix = pathPrefix ? pathPrefix.replace(/\/?$/, '/') : '/';

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader'],
            },
            {
                test: /\.css$/,
                use: {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                },
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                modifyVars: {
                                    '@prefix': imagePathPrefix,
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(otf|ttf|png|woff|woff2|eot|svg)$/,
                loaders: ['file-loader'],
                include: path.resolve(__dirname, '../'),
            },
        ],
    },
};
