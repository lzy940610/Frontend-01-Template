module.exports = {
    entry: './src/main.js',
    module: {
      rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              [
                "@babel/plugin-transform-react-jsx",
                { pragma: "createElement" }
              ]
            ]
          }
        }
      }
     ]
    },
    plugins: [
        // 带括号的new 比 不带括号的new 优先级要低
        new (require('html-webpack-plugin'))
    ],
    mode: "development",
    optimization: {
      minimize: false
    },
    devServer: {
        "open": true,
        "compress": false,
        "contentBase": "./src"
    }
  };