const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: global.process.env === 'DEV' ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'ColorFinder.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'ColorFinder',
  },
};
