
const path = require('path');
const { default: ArrayTransformer } = require('./transformers/ArrayTransformer');
const { default: NodeTransformer } = require('./transformers/NodeTransformer');
const { default: StringTransformer } = require('./transformers/StringTransformer');

module.exports = {
    entry: path.join(__dirname, '/app2.ts'),
    output: {
        filename: 'app2.js',
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
                          ArrayTransformer,
                          NodeTransformer,
                         StringTransformer(program),

                        ]
                    }
                },
                ignoreDiagnostics: [2345],
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