<template>
  <div>
    <h2>Docentes</h2>
    <crud-component :api-url="apiUrl" />
  </div>
</template>

<script>
import CrudComponent from "@/components/CrudDocente.vue";

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