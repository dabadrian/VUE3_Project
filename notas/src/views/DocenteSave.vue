<template>
    <div>
      <h2>Crear nuevo Docente</h2>
      <crud-component :api-url="apiUrl" entity-name="docentes" />
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
        apiUrl: "http://localhost:4000/Docentes",
      };
    },
  };
  </script>