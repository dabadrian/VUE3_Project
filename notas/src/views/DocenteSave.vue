<template>
    <div>
      <h2>Crear nuevo Docente</h2>
      <crud-component :api-url="apiUrl"/>
    </div>
  </template>
  
  <script>
  import CrudComponent from "@/components/SaveDocente.vue";
  
  export default {
    components: {
      CrudComponent,
    },
    data() {
      return {
        apiUrl: process.env.VUE_APP_API,
      };
    },
  };
  </script>