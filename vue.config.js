'use strict'
const path = require('path')
const webpack = require('webpack');
function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = 8080

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false, // 改为false可一定程度上解决浏览器f12查看到源码的问题
  devServer: {
    disableHostCheck: true,
    port: port,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: `http://localhost:8081/`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },

  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.plugin('provide')
    .use(webpack.ProvidePlugin, [{
        $: 'jquery',
        jquery: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        semantic: 'semantic-ui-css',
        Semantic: 'semantic-ui-css',
        'semantic-ui': 'semantic-ui-css'
    }]);
// 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
// 只要在chainwebpack的配置项下加一行config.resolve.symlinks(true)这样我们修改保存.vue文件以及js代码就会自动刷新，
config.resolve.symlinks(true);

// 创建 import 或 require 的别名，来确保模块引入变得更简单。
config.resolve
    .alias
    .set('@', resolve('src'))
    .set('vue$', 'vue/dist/vue.esm.js')
    .set('@api', resolve('src/api'))
    .set('@assets', resolve('src/assets'))
    .set('@scss', resolve('src/assets/scss'))
    .set('@components', resolve('src/components'))
    .set('@plugins', resolve('src/plugins'))
    .set('@views', resolve('src/views'))
    .set('@router', resolve('src/router'))
    .set('@store', resolve('src/store'))
    .set('@layout', resolve('src/layout'))
    .set('@static', resolve('src/static'))
    .set('@images', resolve('src/static/images'))
    .set('@css', resolve('src/static/css'))
    .set('vendor',resolve('src/vendor'));


    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
