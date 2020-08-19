module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  pages: {
    index: {
      entry: './src/main.js',
      template: 'public/index.html',
      filename: 'app.html'
    }
  }
};