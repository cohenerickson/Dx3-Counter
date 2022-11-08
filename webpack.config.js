const path = require("path");

module.exports = {
  entry: {
    bundle: "./src/client/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "./dist/public"),
    filename: "[name].js",
    clean: true
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    },
    compress: true,
    allowedHosts: "all",
    port: 3000,
    proxy: {
      "/count": "http://localhost:8080",
      "/ws": {
        target: "ws://localhost:8080",
        ws: true
      }
    }
  }
};
