const { resolve } = require('path');
const sassResourcesLoader = {
  loader: 'sass-resources-loader',
  options: {
    resources: [
      resolve(__dirname, 'assets/css/_variables.scss')
    ]
  }
};

function isVueRule (rule) {
  return rule.test.toString() === '/\\.vue$/'
}

function isSASSRule (rule) {
  return ['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Jelle Kralt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5' },
      { hid: 'description', name: 'description', content: 'Hi, I\'m Jelle Kralt. Front End Engineer at CODEZILLA. I ❤️ JavaScript' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#f7df1e' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.scss'],
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/font-awesome',
    '@nuxtjs/sitemap'
  ],
  /*
  ** Plugins
  */
  plugins: [
    '~plugins/filters.js',
    { src: '~plugins/ga.js', ssr: false }
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }

      config.module.rules.forEach((rule) => {
        if (isVueRule(rule)) {
          rule.options.loaders.sass.push(sassResourcesLoader);
          rule.options.loaders.scss.push(sassResourcesLoader);
        }
        if (isSASSRule(rule)) {
          rule.use.push(sassResourcesLoader);
        }
      });
    }
  }
};
