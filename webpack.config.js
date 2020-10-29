
const path = require('path');
const { default: commonTransformer } = require('./transformers/commonTransformer');
const { default: NodeTransformer } = require('./transformers/NodeTransformer');
const { default: ArrayStringTransformer } = require('./transformers/ArrayStringTransformer');

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
                    getCustomTransformers: program => {
                        return {
                      before: [
                          ArrayStringTransformer(program),
                          NodeTransformer,
                          commonTransformer
                        ]
                    }
                },
                ignoreDiagnostics: [2345,2531],
                   //transpileOnly: true,
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