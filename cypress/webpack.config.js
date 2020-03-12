module.exports = {
    resolve: {
      extensions: [".ts", ".js"]
    },
    node: { fs: "empty", child_process: "empty", readline: "empty" },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: "ts-loader"
            }
          ]
        },
        {
          test: /\.feature$/,
          use: [
            {
              loader: "cypress-cucumber-preprocessor/loader"
            }
          ]
        },
        {
          test: /\.features$/,
          use: [
            {
              loader: "cypress-cucumber-preprocessor/lib/featuresLoader"
            }
          ]
        }
      ]
    }
};  