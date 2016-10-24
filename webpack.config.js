module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'selectabular.js',
    library:'selectabular',
    libraryTarget:'umd'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    },
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  target: 'node'
};
