export default function({ $axios, store }) {
    $axios.onRequest(config => {
      // Añadir el token a cada solicitud si está presente
      const token = store.state.auth.token
      if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`
      }
    })
  
    $axios.onError(error => {
      // Manejar errores globalmente
      const code = parseInt(error.response && error.response.status)
      if (code === 400) {
        console.error('Solicitud incorrecta')
      }
    })
  }
  