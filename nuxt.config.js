export default {
    mode: 'universal',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'google-signin-client_id', content: '471491411598-u4sv7en368iq8tb0ilba18h5lsuf5g7b.apps.googleusercontent.com' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        script: [
            { src: 'https://cdn.jsdelivr.net/gh/dmuy/duDialog/duDialog.min.js' },
            { src: 'https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js' },
            { src: 'https://apis.google.com/js/platform.js' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
            { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/dmuy/duDialog/duDialog.min.css' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css' }
        ]
    },

    generate: {
        routes: [
            '/',
            '/addTodos',
            '/login'
        ]
    },

    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
    css: [
        '@assets/css/general'
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [],
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        'cookie-universal-nuxt'
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    },
    router: {}
}
