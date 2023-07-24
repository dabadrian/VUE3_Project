<template>
  <div>
    <h2>Alumnos</h2>
    <crud-component :api-url="apiUrl" entity-name="alumnos" />
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
      apiUrl: "http://localhost:4000/Estudiantes",
    };
  },
};
</script>