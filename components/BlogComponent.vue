<template>
  <div class="blog-component">
    <img :src="logoUrl" alt="Blog Logo" class="logo" />
    <h1>{{ title }}</h1>
    <div class="content-area">
      <slot></slot> <!-- Esto permitirá que el contenido sea dinámico -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'BLOG'
    }
  },
  data() {
    return {
      logoUrl: '/path/to/your/logo.png', // Asegúrate de usar una URL válida
      isLoggedIn: false
    };
  },
  mounted() {
    if (process.client) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  }
}
</script>

<style scoped>
.blog-component {
  border: 1px solid #ddd;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}
.logo {
  max-width: 100px;
  margin-bottom: 1rem;
}
.buttons {
  margin-top: 1rem;
}
button {
  margin-right: 10px;
  padding: 10px 20px;
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
