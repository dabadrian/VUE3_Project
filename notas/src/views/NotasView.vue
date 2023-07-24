<template>
    <div>
      <h2>Notas</h2>
      <Registro-Nota :api-url="apiUrl"  />
    </div>
  </template>
  
  <script>
  import RegistroNota from "@/components/RegistroNota.vue";
  
  export default {
    components: {
        RegistroNota,
    },
    data() {
    return {
      apiUrl: process.env.VUE_APP_API,
    };
  },

  };
  </script>