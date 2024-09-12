<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" v-model="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    async login() {
      try {
        // Obtener el token CSRF antes de hacer login
        await this.$axios.get('http://localhost:8000/sanctum/csrf-cookie');

        // Hacer la solicitud de login
        const response = await this.$axios.post('http://localhost:8000/api/login', {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          // Guardar el token en localStorage
          localStorage.setItem('token', response.data.token);
          // Redirigir al dashboard después del login exitoso
          this.$router.push('/dashboard');
        }
      } catch (error) {
        this.error = 'Credenciales inválidas. Intenta de nuevo.';
      }
    }
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.form-group {
  margin-bottom: 1rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}
button {
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
