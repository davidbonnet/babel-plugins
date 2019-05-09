module.exports = (api) => {
  api.cache.never()
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: '6',
          },
        },
      ],
    ],
  }
}
