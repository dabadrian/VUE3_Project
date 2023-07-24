<template>
  <div class="container">
    <nav>
      <div class="nav-wrapper">
        <a href="#!" class="brand-logo"></a>
        <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
          <li><router-link to="/">Home</router-link></li>

          <li>
        <!-- Parent menu item with a dropdown -->
            <a class="dropdown-trigger" href="#!" data-target="alumnoDropdown">
             Alumnos<i class="material-icons right">arrow_drop_down</i>
            </a>
        <!-- Submenu (dropdown content) -->
            <ul id="alumnoDropdown" class="dropdown-content">
              <li><router-link to="/alumnos">Listar</router-link></li>
              <li><router-link to="/alumno">Filtrar</router-link></li>
            <!-- Add more submenu items as needed -->
            </ul>
          </li>
      


          <li>
        <!-- Parent menu item with a dropdown -->
            <a class="dropdown-trigger" href="#!" data-target="docenteDropdown">
             Docentes<i class="material-icons right">arrow_drop_down</i>
            </a>
        <!-- Submenu (dropdown content) -->
            <ul id="docenteDropdown" class="dropdown-content">
              <li><router-link to="/docentes">Listar</router-link></li>
              <li><router-link to="/docente">Añadir</router-link></li>              
            <!-- Add more submenu items as needed -->
            </ul>
          </li>
      
      


          <li><router-link to="/notas">Notas</router-link></li>

  
        </ul>
      </div>
    </nav>

    <ul class="sidenav" id="mobile-demo">
      <li><router-link to="/">Home</router-link></li>


      <li>
    <a class="subheader">Alumnos</a>
    <ul>
      <li><router-link to="/alumnos">Listar</router-link></li>
      <li><router-link to="/alumno">Filtrar</router-link></li>
      <!-- Add more submenu items as needed -->
    </ul>
  </li>

      <li>
    <a class="subheader">Docentes</a>
    <ul>
      <li><router-link to="/docentes">Listar</router-link></li>
      <li><router-link to="/docente">Añadir</router-link></li>
      <!-- Add more submenu items as needed -->
    </ul>
  </li>


      <li><router-link to="/notas">Notas</router-link></li>
    </ul>    
  <router-view/>
  </div>
</template>

<style lang="scss">

</style>


<script>



export default {
  name: 'AppView',
  data(){
    return {
      
    }
  },
  methods:{
  },
  created() {
    document.addEventListener('DOMContentLoaded', function () {
      var elems = document.querySelectorAll('.sidenav');
      var instances = M.Sidenav.init(elems, {});

    });
  },
  mounted() {
  // Initialize dropdown triggers
  const options = {
    hover: true, // Set to true if you want dropdown to open on hover
    coverTrigger: false, // Set to true if you want dropdown to align with the trigger
  };
  const dropdowns = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(dropdowns, options);
},  
}
</script>