module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties'],
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            esmodules: true,
          },
        },
      ],
    ],
  };
};
