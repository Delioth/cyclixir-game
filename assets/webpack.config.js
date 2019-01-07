const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const config = {
  entry: [
    //'webpack-dev-server/client?http://0.0.0.0:8080',
    'webpack/hot/dev-server',
    './js/app.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'app.js',
    publicPath: 'http://localhost:8080/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: ['deps', 'node_modules'],
    alias: {
      '@src': path.join(__dirname, './js/'),
      '@type/*': path.join(__dirname, './js/types/'),
      '@game/*': path.join(__dirname, './js/game/'),
      '@enum/*': path.join(__dirname, './js/enums/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx)?$/,
        use: 'babel-loader'
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  mode: 'development',
  plugins: [new CopyWebpackPlugin([{ from: './static/' }])],
  devServer: {
    port: 8080,
    host: 'localhost',
    contentBase: path.join(__dirname, 'js'),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
}

module.exports = config
