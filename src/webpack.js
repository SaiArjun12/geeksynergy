const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Output bundle file
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      // Add your loaders and rules here
    ],
  },
  plugins: [
    // Add your plugins here
  ],
  resolve: {
    fallback: {
      console: require.resolve('console-browserify'),
      // Add other polyfills if necessary
    },
  },
};
