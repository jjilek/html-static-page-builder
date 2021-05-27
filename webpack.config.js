const glob = require('glob');
const path = require('path');
const {ScriptsHtmlPlugin} = require('./custom-webpack-plugin');

const loadingEntry = () => (glob.sync('./src/js/*.js').reduce((acc, p) =>  {
    const entry = path.parse(p).name;
    acc[entry] = p;
    return acc
}, {}));

module.exports = {
    entry: loadingEntry(),
    output: {
        filename: '[name].js',
        path: __dirname + '/dist/js',
    },
    mode: "production",
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/js',
        compress: true,
        port: 9999,
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    plugins: [new ScriptsHtmlPlugin()],
};
