exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /node_modules[\\/]@fontsource[\\/].*\.css$/,
          enforce: "pre",
          loader: "string-replace-loader",
          options: {
            search: "font-display: swap",
            replace: "font-display: block",
            flags: "g",
          },
        },
      ],
    },
  });
};
