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
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios', // Agregamos el módulo de Axios
    '@nuxtjs/auth-next',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'http://localhost:8000/api', 
    
    credentials: true,
  },
  auth: {
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: 'http://localhost:8000',  // URL de tu backend
        endpoints: {
          login: {
            url: '/api/login', // La ruta de login
          },
          logout: {
            url: '/api/logout', // Ruta de logout (deberías implementarla)
          },
          user: {
            url: '/api/user', // Ruta para obtener el usuario autenticado
          }
        },
        token: {
          property: 'token', // Propiedad donde está el token
        },
        user: {
          property: 'user', // Propiedad donde está el usuario
        },
        cookie: {
          name: 'XSRF-TOKEN',
        },
      },
    },
  },
  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
