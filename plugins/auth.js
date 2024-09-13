export default async function({ $axios }) {
    // Solicita el token CSRF antes de cada acción relacionada con la autenticación
    await $axios.get('/sanctum/csrf-cookie')
  }
  