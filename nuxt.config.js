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
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' }
    ],
    link: [
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
    }
  }
};
