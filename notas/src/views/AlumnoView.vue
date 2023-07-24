<template>
  <div>
    <h2>Alumnos</h2>
    <crud-component :api-url="apiUrl" />
  </div>
</template>

<script>
import CrudComponent from "@/components/CrudAlumno.vue";

export default {
  components: {
    CrudComponent,
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_API+'/Estudiantes',
      
    };
  },
};
</script>