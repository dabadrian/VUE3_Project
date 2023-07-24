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
          <div class="input-field col s6" v-if="escalafon.length > 0" >
            <select id="escalafon" v-model="docente.escalafon_id" required>
              <option value="" disabled>Seleccione un Escalafón</option>
              <option v-for="escalafon in escalafon" :key="escalafon.id_escalafon" :value="escalafon.id_escalafon">
                {{ escalafon.nombre }}
              </option>
            </select>
            <label for="escalafon">Escalafon:</label>
          </div>
          <div class="input-field col s6" v-if="facultades.length > 0" >
            <select id="facultad" v-model="docente.facultad_id" required>
              <option value="" disabled>Seleccione una Facultad</option>
              <option v-for="facultad in facultades" :key="facultad.id_facultad" :value="facultad.id_facultad">
                {{ facultad.nombre }}
              </option>
            </select>
            <label for="facultad">Facultad:</label>
          </div>
        </div>
        <button type="submit" class="waves-effect waves-light btn">Guardar Docente</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      apiUrl: {
        type: String,
        required: true,
      },
      entityName: {
        type: String,
        required: true,
      },
    },    
    data() {
      return {
        docente: {
          nombre: '',
          apellido: '',
          ci: '',
          email: '',
          escalafon_id: null,
          facultad_id: null,
        },
        facultades: [],
        escalafon: [],
      };
    },
    async mounted() {
        await this.getFacultades(); // Wait for facultades to be loaded
        await this.getEscalafon(); 
        this.initializeSelectElements();
    },
    methods: {
        async getEscalafon() {
        try {
          const response = await axios.get(this.apiUrl+'/Escalafon');
          this.escalafon = response.data;
          console.log(this.escalafon);
        } catch (error) {
          console.error('Error fetching escalafon:', error);
        }
      },

      async getFacultades() {
        try {
          const response = await axios.get(this.apiUrl+'/Facultad');
          this.facultades = response.data;
          console.log(this.facultades);
        } catch (error) {
          console.error('Error fetching facultades:', error);
        }
      },
      async saveDocente() {
        try {
          await axios.post(this.apiUrl+'/Docentes', this.docente);
          M.toast({ html: 'Docente guardado satisfactoriamente!', classes: 'green lighten-1' });
          // Optionally, you can redirect to another page or reset the form after saving.
          this.$router.push('/Docentes');
          this.docente = {
             nombre: '',
             apellido: '',
             ci: '',
             email: '',
             escalafon_id: null,
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