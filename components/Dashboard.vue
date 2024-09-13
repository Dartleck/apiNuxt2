<template>
  <div class="dashboard">
    <h1>Bienvenido al Dashboard</h1>

    <!-- Botón para cerrar sesión -->
    <div>
      <button @click="logout">Cerrar Sesión</button>
    </div>

    <!-- Lista de blogs -->
    <div v-for="(component, index) in blogComponents" :key="component.id">
      <BlogComponent
        :title="component.title"
        @delete="removeBlogComponent(index, component.id)"
      >
        <p v-if="!component.isEditing">{{ component.content }}</p>

        <!-- Formulario para editar si está en modo edición -->
        <div v-if="component.isEditing">
          <input v-model="component.title" placeholder="Nuevo Título" />
          <textarea v-model="component.content" placeholder="Nuevo Contenido"></textarea>
          <button @click="saveBlogComponent(component.id, index)">Guardar</button>
          <button @click="cancelEdit(component)">Cancelar</button>
        </div>

        <!-- Botón de editar -->
        <button v-if="isBlogOwner(component.user_id) && !component.isEditing" @click="editBlogComponent(component)">
          Editar
        </button>

        <!-- Botón de eliminar -->
        <button v-if="isBlogOwner(component.user_id)" @click="removeBlogComponent(index, component.id)">
          Eliminar
        </button>
      </BlogComponent>
    </div>

    <!-- Botón para agregar un nuevo blog -->
    <div>
      <button @click="addBlogComponent">Agregar Blog</button>
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
      blogComponents: [],
      isLoggedIn: false
    };
  },
  async mounted() {
    await this.fetchBlogs();
    this.isLoggedIn = !!localStorage.getItem('token');
    this.fetchUser();
  },
  methods: {
    // Obtener los blogs
    async fetchBlogs() {
  try {
    const response = await this.$axios.get('http://localhost:8000/api/blogs', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    this.blogComponents = response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
  }
}
,

    // Agregar un nuevo blog
    async addBlogComponent() {
      const newBlog = {
        title: `Nuevo Blog #${this.blogComponents.length + 1}`,
        content: `Este es el contenido del nuevo blog #${this.blogComponents.length + 1}`
      };

      try {
        const response = await this.$axios.post('http://localhost:8000/api/blogs', newBlog, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Enviar token en los headers
          }
        });
        this.blogComponents.push({ ...response.data, isEditing: false });
      } catch (error) {
        console.error('Error agregando el blog:', error);
      }
    },

    // Eliminar un blog
    async removeBlogComponent(index, id) {
      if (confirm('¿Estás seguro de que deseas eliminar este blog?')) {
        try {
          await this.$axios.delete(`http://localhost:8000/api/blogs/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}` // Enviar token en los headers
            }
          });
          this.blogComponents.splice(index, 1); // Eliminar el blog de la lista en el frontend
        } catch (error) {
          console.error('Error eliminando el blog:', error);
        }
      }
    },

    // Editar un blog
    editBlogComponent(blog) {
      blog.isEditing = true; // Cambiar a modo de edición
    },

    cancelEdit(blog) {
      blog.isEditing = false; // Cancelar la edición
    },

    // Guardar un blog editado
    async saveBlogComponent(id, index) {
      const updatedBlog = this.blogComponents[index];
      try {
        const response = await this.$axios.put(`http://localhost:8000/api/blogs/${id}`, {
          title: updatedBlog.title,
          content: updatedBlog.content
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Enviar token en los headers
          }
        });
        this.blogComponents[index] = { ...response.data, isEditing: false }; // Guardar y salir de modo de edición
      } catch (error) {
        console.error('Error guardando el blog:', error);
      }
    },

    // Cerrar sesión
    logout() {
      if (process.client) {
        localStorage.removeItem('token'); // Eliminar el token del almacenamiento local
        localStorage.removeItem('user_id'); // Eliminar el user_id del almacenamiento local
        this.$router.push('/login'); // Redirigir a la página de login
      }
    },

    // Obtener el usuario autenticado
    async fetchUser() {
      try {
        const response = await this.$axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Enviar token en los headers
          }
        });
        localStorage.setItem('user_id', response.data.id); // Guardar el ID del usuario autenticado
      } catch (error) {
        console.error('Error obteniendo el usuario autenticado:', error);
      }
    },

    // Verificar si el usuario es el propietario del blog
    isBlogOwner(userId) {
      const currentUserId = localStorage.getItem('user_id'); // Obtener el ID del usuario autenticado
      return currentUserId && currentUserId == userId; // Verificar si es el dueño del blog
    }
  }
}
</script>
  