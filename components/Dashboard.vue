<template>
  <div class="dashboard">
    <h1>Bienvenido al Dashboard</h1>

    <!-- Botón para agregar nuevos componentes -->
    <div class="add-component-button" v-if="isLoggedIn">
      <button @click="addBlogComponent">Agregar Componente</button>
    </div>

    <!-- Botón de cerrar sesión -->
    <div v-if="isLoggedIn" class="logout-button">
      <button @click="logout">Cerrar Sesión</button>
    </div>

    <!-- Lista de componentes dinámicos sin imágenes -->
    <div v-for="(component, index) in blogComponents" :key="index">
      <BlogComponent
        :title="component.title"
        @delete="removeBlogComponent(index)"
      >
        <p>{{ component.content }}</p>
      </BlogComponent>
    </div>
  </div>
</template>

<script>
import BlogComponent from '~/components/BlogComponent.vue';

export default {
  components: {
    BlogComponent
  },
  data() {
    return {
      isLoggedIn: false,  // Inicializamos la variable en false
      blogComponents: [
        {
          title: 'Mi Primer Blog',
          content: 'Este es el contenido de mi primer blog.'
        }
      ]
    };
  },
  mounted() {
    // Solo accedemos a localStorage cuando el componente está montado (en el cliente)
    if (process.client) {
      this.isLoggedIn = !!localStorage.getItem('token');
    }
  },
  methods: {
    addBlogComponent() {
      const newComponent = {
        title: `Nuevo Blog #${this.blogComponents.length + 1}`,
        content: `Este es el contenido del nuevo blog #${this.blogComponents.length + 1}`
      };
      this.blogComponents.push(newComponent);
    },
    removeBlogComponent(index) {
      if (confirm('¿Estás seguro de que deseas borrar este componente?')) {
        this.blogComponents.splice(index, 1);
      }
    },
    logout() {
      if (process.client) {
        localStorage.removeItem('token');
        this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
h1 {
  text-align: center;
  margin-bottom: 2rem;
}
.add-component-button, .logout-button {
  text-align: right;
  margin-bottom: 1rem;
}
button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #218838;
}
</style>
