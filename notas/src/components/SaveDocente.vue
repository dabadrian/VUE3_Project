<template>
    <div>

      <form @submit.prevent="saveDocente" class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <input type="text" id="nombre" v-model="docente.nombre" required />
            <label for="nombre">Nombre:</label>
          </div>
          <div class="input-field col s6">
            <input type="text" id="apellido" v-model="docente.apellido" required />
            <label for="apellido">Apellido:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <input type="text" id="ci" v-model="docente.ci" required />
            <label for="ci">CI:</label>
          </div>
          <div class="input-field col s6">
            <input type="email" id="email" v-model="docente.email" required />
            <label for="email">Email:</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6">
            <select id="escalafon" v-model="docente.escalafon" required>
              <option value="Titular">Titular</option>
              <option value="Asociado">Asociado</option>
              <option value="Adjunto">Adjunto</option>
            </select>
            <label for="escalafon">Escalafon:</label>
          </div>
          <div class="input-field col s6" v-if="facultades.length > 0" >
            <select id="facultad" v-model="docente.facultad_id" required>
              <option v-for="facultad in facultades" :key="facultad.id_facultad" :value="facultad.id_facultad">
                {{ facultad.nombre }}
              </option>
            </select>
            <label for="facultad">Facultad:</label>
          </div>
        </div>
        <button type="submit" class="waves-effect waves-light btn">Save</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        docente: {
          nombre: '',
          apellido: '',
          ci: '',
          email: '',
          escalafon: 'Titular',
          facultad_id: null,
        },
        facultades: [],
      };
    },
    async mounted() {
        await this.getFacultades(); // Wait for facultades to be loaded
        this.initializeSelectElements();
    },
    methods: {
        async getEscalafon() {
        try {
          const response = await axios.get('http://localhost:4000/Escalafon');
          this.facultades = response.data;
          console.log(this.facultades);
        } catch (error) {
          console.error('Error fetching facultades:', error);
        }
      },

      async getFacultades() {
        try {
          const response = await axios.get('http://localhost:4000/Facultad');
          this.facultades = response.data;
          console.log(this.facultades);
        } catch (error) {
          console.error('Error fetching facultades:', error);
        }
      },
      async saveDocente() {
        try {
          await axios.post('http://localhost:4000/Docentes', this.docente);
          M.toast({ html: 'Docente guardado satisfactoriamente!', classes: 'green lighten-1' });
          // Optionally, you can redirect to another page or reset the form after saving.
          this.$router.push('/list-of-docentes');
          this.docente = {
             nombre: '',
             apellido: '',
             ci: '',
             email: '',
             escalafon: 'Titular',
             facultad_id: null,
          };
        } catch (error) {
          console.error('Error saving docente:', error);
          M.toast({ html: 'Failed to save docente.', classes: 'red lighten-1' });
        }
      },    
      initializeSelectElements() {
      // Initialize Materialize select elements after DOM rendering is complete
      // This should be called after facultades data is available
      M.FormSelect.init(document.querySelectorAll('select'));
      },        
    },
    watch: {
    // Watch for changes in facultades array and reinitialize select elements
    facultades: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.initializeSelectElements();
        }
      },
      immediate: false, // Set to true if you want to trigger the handler on component initialization
    },
  },    
  };
  </script>