module.exports = {
  plugins: [
    require('css-mqpacker')(),
    require('postcss-animation'),
    require('autoprefixer')({
      cascade: false
    })
  ]
}
