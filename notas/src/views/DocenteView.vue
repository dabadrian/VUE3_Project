<template>
  <div>
    <h2>Docentes</h2>
    <crud-component :api-url="apiUrl" entity-name="docentes" />
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
      apiUrl: "http://localhost:4000/Docentes",
    };
  },
};
</script>