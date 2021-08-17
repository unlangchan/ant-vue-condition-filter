module.exports = {
  lintOnSave: process.env.NODE_ENV !== "production",
  configureWebpack: {
    resolve: {
      symlinks: false,
    },
  },
};
