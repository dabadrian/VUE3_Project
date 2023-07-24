<template>
    <div class="container">
      <h3>Registrar Nota</h3>
      <div class="row">
        <form class="col s12" @submit.prevent="submitNota">

          <div v-if="docentes.length>0 && estudiantes.length>0 && asignaturas.length>0 && semestres.length>0">

          <div class="input-field col s6" >
            <select v-model="selectedDocente">
              <option value="" disabled>Seleccione un Docente</option>
              <option v-for="docente in docentes" :value="docente.id" :key="docente.id">
                {{ docente.nombre }} {{ docente.apellido }}
              </option>
            </select>
            <label>Docente</label>
          </div>

          <div class="input-field col s6">
            <select v-model="selectedEstudiante">
              <option value="" disabled>Seleccione un Estudiante</option>  
              <option v-for="estudiante in estudiantes" :value="estudiante.id" :key="estudiante.id">
                {{ estudiante.nombre }} {{ estudiante.apellido }}
              </option>
            </select>
            <label>Estudiante</label>
          </div>
        
          <div class="input-field col s6">
            <select v-model="selectedSemestre">
              <option value="" disabled>Seleccione un Semestre</option>  
              <option v-for="semestre in semestres" :value="semestre.id" :key="semestre.id">{{ semestre.descripcion }}</option>
            </select>
            <label>Semestre</label>
          </div>

          <div class="input-field col s6">
            <select v-model="selectedAsignatura">
              <option value="" disabled>Seleccione una Asignatura</option>  
              <option v-for="asignatura in asignaturas" :value="asignatura.id" :key="asignatura.id">{{ asignatura.nombre }}</option>
            </select>
            <label>Asignatura</label>
          </div>

          <div class="input-field col s6">
            <input type="number" v-model="nota" step="0.1">
            <label>Nota</label>
          </div>

          <div class="input-field col s6">
            <input type="date" v-model="fecha_registro">
            <label>Fecha de Registro</label>
          </div>
  
          <button class="btn waves-effect waves-light" type="submit">Registrar Nota</button>
        </div>
        </form>
      </div>
  
      <h3>Lista de Notas</h3>


      <table class="highlight">
  <thead>
    <tr>
      <th>Alumno</th>
      <th>Docente</th>
      <th>Asignatura</th>
      <th>Semestre</th>
      <th>Nota</th>
      <th>Fecha Registro</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(nota, index) in notas" :key="index">
      <td>{{ getEstudianteName(nota.id_estudiante) }}</td>
      <td>{{ getDocenteName(nota.id_docente) }}</td>
      <td>{{ getAsignaturaName(nota.id_asignatura) }}</td>
      <td>{{ getSemestreName(nota.id_semestre) }}</td>
      <td>{{ nota.nota }}</td>
      <td>{{ nota.fecha_registro }}</td>
    </tr>
  </tbody>
</table>


    </div>
  </template>
  
  <script>
  import axios from "axios";
  
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
        docentes: [],
        estudiantes: [],
        asignaturas: [],
        semestres: [],
        notas: [],
        selectedDocente: null,
        selectedEstudiante: null,
        selectedAsignatura: null,
        selectedSemestre: null,
        // Add other form fields' data
        // ...
      };
    },
    methods: {
      async fetchDocentes() {
        try {
          const response = await axios.get(this.apiUrl+'/Docentes');
          this.docentes = response.data;
          console.log(this.docentes);
        } catch (error) {
          console.error('Error fetching docentes:', error);
        }
      },
      async fetchEstudiantes() {
        await axios.get(this.apiUrl+"/Estudiantes").then((response) => {
          this.estudiantes = response.data;
          console.log(this.estudiantes);
        });
      },
      async fetchAsignaturas() {
        await axios.get(this.apiUrl+"/Asignatura").then((response) => {
          this.asignaturas = response.data;
          console.log(this.asignaturas);
        });
      },
      async fetchSemestres() {
        await axios.get(this.apiUrl+"/Semestre").then((response) => {
          this.semestres = response.data;
          console.log(this.semestres);
        });
      },
      fetchNotas() {
        axios.get(this.apiUrl+"/Nota").then((response) => {
          this.notas = response.data;
          console.log(this.notas);
        });
      },
      submitNota() {
        // Implement the submission logic to register the nota
        const newNota = {
          id_docente: this.selectedDocente,
          id_estudiante: this.selectedEstudiante,
          id_semestre: this.selectedSemestre,
          id_asignatura: this.selectedAsignatura,
          nota: this.nota,
          fecha_registro: this.fecha_registro
        };
  
        // Example: Post the newNota to the backend API
        axios.post(this.apiUrl+"/Nota", newNota).then((response) => {
          // If the registration is successful, add the newNota to the list
          this.notas.push(newNota);
        });
      },
      getDocenteName(id) {
        const docente = this.docentes.find((doc) => doc.id === id);
        return docente ? `${docente.nombre} ${docente.apellido}` : "";
      },
      getEstudianteName(id) {
        const estudiante = this.estudiantes.find((est) => est.id === id);
        return estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : "";
      },
      getAsignaturaName(id) {
        const asignatura = this.asignaturas.find((asig) => asig.id === id);
        return asignatura ? asignatura.nombre : "";
      },
      getSemestreName(id) {
        const semestre = this.semestres.find((sem) => sem.id === id);
        return semestre ? semestre.descripcion : "";
      },
      initializeSelectElements() {
      // Initialize Materialize select elements after DOM rendering is complete
      // This should be called after facultades data is available
      M.FormSelect.init(document.querySelectorAll('select'));
      },
    },
    async mounted() {
  try {
    await this.fetchDocentes();
    await this.fetchEstudiantes();
    await this.fetchAsignaturas();
    await this.fetchSemestres();
    await this.fetchNotas();
    this.initializeSelectElements();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
},
  };
  </script>
  
  <style>
  /* Add custom styles if needed */
  </style>