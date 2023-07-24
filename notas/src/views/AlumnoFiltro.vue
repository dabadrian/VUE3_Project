<template>
    <div>
      <h2>Filtro Alumnos</h2>
      <Filtro-Alumno :api-url="apiUrl" />
    </div>
  </template>
  
  <script>
  import FiltroAlumno from "@/components/FiltroAlumno.vue";
  
  export default {
    components: {
        FiltroAlumno,
    },
    data() {
      return {
        apiUrl: process.env.VUE_APP_API,
      };
    },
  };
  </script>