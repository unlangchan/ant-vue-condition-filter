module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  css: { extract: false },
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
};
