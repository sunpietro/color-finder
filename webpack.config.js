const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: { module: 'CommonJS' },
          },
        },
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
    library: {
      name: 'ColorFinder',
      type: 'umd',
      export: 'default',
    },
  },
};
