module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3.19
      }
    ]
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties']
  ]
}
