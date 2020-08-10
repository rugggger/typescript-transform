
const path = require('path');
const { default: ArrayTransformer } = require('./transformers/ArrayTransformer');
const { default: NodeTransformer } = require('./transformers/NodeTransformer');

module.exports = {
    entry: path.join(__dirname, '/app.ts'),
    output: {
        filename: 'app.js',
        path: __dirname
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    getCustomTransformers: program => ({
                      before: [ArrayTransformer,NodeTransformer]
                    }),
                    transpileOnly: true,
                    compilerOptions: {
                      sourceMap: true
                    }
                  }
        
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
};