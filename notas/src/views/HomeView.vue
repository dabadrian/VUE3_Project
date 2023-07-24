<template>
  <div class="center-align">
    <img alt="Vue logo" src="../assets/logo.png" style="position: relative;">
    <HelloWorld msg="Bienvenido a la aplicación Vue.js del sistema de Notas "/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
