const path = require('path');

// Plugins
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => ({

    // Production specific settings
    ...(env.prod && {
      mode: 'production',
    }),

    // Develop specific settings
    ...(!env.prod && {
      mode: 'development',
      devtool: 'source-map',
      watch: true,
      
    }),

    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9000
    },

    // Define entry points
    entry: {
      script: [
        './src/index.tsx'
      ]
    },

    // Define script outputs
    output: {
      filename: '[name].js',
      path: path.resolve('dist'),
      publicPath: path.resolve('dist')
    },

    // Define loaders and loader options
    module: {
      rules: [
  
        // TypeScript, TSX
        {
          test: /\.(ts|tsx)$/,
          use: [
            {
              loader: 'ts-loader',
              options: {}
            }
          ]
        },
      ]
    },

    // Define module resolve settings
    resolve: {
      modules: [
        path.resolve('./src'),
        path.resolve('./node_modules'),
      ],
      extensions: ['.ts', '.tsx', '.js']
    },

    // Plugins
    plugins: env.prod ? [
      // Prod plugins
    ] : [
      new CopyWebpackPlugin([
        {
          from: 'static/**/*.{html,ico,svg,}',
          transformPath: (targetPath) => {
            return targetPath.replace('static/', '/');
          }
        },
      ])
    ]

});
