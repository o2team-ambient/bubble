module.exports = {
  // environment variables
  env: {
    NODE_ENV: '"production"'
  },
  // define global constants for application see https://webpack.js.org/plugins/define-plugin/
  defineConstants: {
  },
  htmlSnippetDirectory: ['src'],
  module: {
    postcss: {
      sprites: {
        enable: true
      }
    },
    imageMin: {
      enable: true
    }
  }
}
