<template>
    <div class="container">
      <!-- Search input -->
      <div class="row">
        <div class="input-field col s12">
          <input v-model="searchQuery" type="text" @input="searchObjects" />
          <label>Buscar por Nombre or Apellido</label>
        </div>
      </div>    


      <!-- List of objects -->
      <table v-if="filteredObjects.length" class="highlight">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>CI</th>
            <th>Email</th>
            <th>Escalafón</th>
            <th>Facultad</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="object in filteredObjects" :key="object.id">
            <td>{{ object.nombre }}</td>
            <td>{{ object.apellido }}</td>
            <td>{{ object.ci }}</td>
            <td>{{ object.email }}</td>
            <td>{{ object.escalafon }}</td>
            <td>{{ getFacultadName(object.facultad_id) }}</td>
            <td>
              <a :class="{ 'disabled-link': isAddingOrEditing }" @click="editObject(object)"><i class="material-icons">edit</i></a>
              <a :class="{ 'disabled-link': isAddingOrEditing }" @click="deleteObject(object.id)"><i class="material-icons">delete</i></a>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="center">No objects found.</div>
  
      <!-- Add or edit form -->
      <div v-if="showForm" class="row">
        <h3 class="col s12">{{ formTitle }}</h3>
        <form class="col s12" @submit.prevent="submitForm">

            <div class="row">

            <div class="input-field col s12" v-if="facultades.length>0">
            <select v-model="formData.facultad_id" required>

                <option v-for="facultad in facultades" :key="facultad.id_facultad" :value="facultad.id_facultad">
                     {{ facultad.nombre }}
            </option>
            </select>
            <label>Facultad</label>
          </div>
        </div>

        <div class="input-field col s6" :key="1">
            <select id="escalafon" v-model="formData.escalafon" required>
              <option value="Titular">Titular</option>
              <option value="Asociado">Asociado</option>
              <option value="Adjunto">Adjunto</option>
            </select>
            <label for="escalafon">Escalafon:</label>
          </div>


          <div class="input-field col s12">
            <input v-model="formData.nombre" type="text" required />
            <label>Nombre</label>
          </div>
  
          <div class="input-field col s12">
            <input v-model="formData.apellido" type="text" required />
            <label>Apellido</label>
          </div>
  
          <div class="input-field col s12">
            <input v-model="formData.ci" type="text" required />
            <label>CI</label>
          </div>
  
          <div class="input-field col s12">
            <input v-model="formData.email" type="email" required />
            <label>Email</label>
          </div>

       


  
          <div class="col s12">
            <button class="btn waves-effect waves-light" type="submit">
              Save
              <i class="material-icons right">send</i>
            </button>&nbsp;
            <button class="btn waves-effect waves-light red" type="button" @click="cancelForm">
              Cancel
              <i class="material-icons right">cancel</i>
            </button>
          </div>
        </form>
      </div>
  
      <!-- Add button -->
      <div class="fixed-action-btn">
        <a class="btn-floating btn-large waves-effect waves-light red" @click="showAddForm">
          <i class="large material-icons">add</i>
        </a>
      </div>
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
        objects: [],
        showForm: false,
        formTitle: "Nuevo Docente",
        formData: {
          id: null,
          nombre: "",
          apellido: "",
          ci: "",
          email: "",
          escalafon: "",
          facultad_id: "",
        },
        isAddingOrEditing: false,
        searchQuery: "", // Search query
        facultades: [],
      };
    },
    computed: {
      // Computed property to filter objects based on search query
      filteredObjects() {
        return this.objects.filter((object) => {
          const searchTerm = this.searchQuery.toLowerCase();
          const nombre = object.nombre.toLowerCase();
          const apellido = object.apellido.toLowerCase();
          return nombre.includes(searchTerm) || apellido.includes(searchTerm);
        });
      },
    },  
    async mounted() {
      await this.fetchObjects();
      await this.fetchFacultades();
      M.AutoInit();
      M.FormSelect.init(document.querySelectorAll('select'));
    },
   
    methods: {
      fetchObjects() {
        axios.get(this.apiUrl).then((response) => {
          this.objects = response.data;
        });
      },
      showAddForm() {
        this.formTitle = "Nuevo Docente";
        this.showForm = true;
        //this.clearFormData();
        this.isAddingOrEditing = true;
      },
      editObject(object) {
        this.formTitle = "Modificar Docente";
        this.formData = { ...object };
        this.showForm = true;      
        this.isAddingOrEditing = true;
      },
      deleteObject(id) {
        if (confirm("Are you sure you want to delete this object?")) {
          axios.delete(`${this.apiUrl}/${id}`).then(() => {
            this.fetchObjects();
          });
        }
      },
      submitForm() {
        if (this.formData.id) {
          // Update existing object
          axios
            .put(`${this.apiUrl}/${this.formData.id}`, this.formData)
            .then(() => {
              this.showForm = false;
              this.fetchObjects();
              this.isAddingOrEditing = false;
            });
        } else {
          // Create new object
          axios.post(this.apiUrl, this.formData).then(() => {
            this.showForm = false;
            this.fetchObjects();
            this.isAddingOrEditing = false;
          });
        }
      },
      clearFormData() {
        this.formData.id = null;
        this.formData.nombre = "";
        this.formData.apellido = "";
        this.formData.ci = "";
        this.formData.email = "";
        this.formData.escalafon = "";
        this.formData.facultad_id = null;
      },
      cancelForm() {
        this.showForm = false;
        this.clearFormData();
        this.isAddingOrEditing = false;
      },
      searchObjects() {
        // This method is triggered by the @input event on the search input field
        // It will automatically update the displayed objects based on the search query
        this.isAddingOrEditing = false; 
      },    

      async fetchFacultades() {
        axios.get('http://localhost:4000/Facultad').then((response) => {
            this.facultades = response.data;
            console.log(this.facultades);
        });
      },
      getFacultadName(facultadId) {
        const facultad = this.facultades.find((facultad) => facultad.id_facultad === facultadId);
        return facultad ? facultad.nombre : 'Unknown'; // Return 'Unknown' if facultad not found
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
  
  
  <style>
  /* Add custom styles for the "Add" button */
  .fixed-action-btn {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 998; /* Make sure it's above other content */
  }
  
  .fixed-action-btn a.btn-floating i {
    font-size: 32px; /* Increase icon size */
    line-height: 64px; /* Center the icon vertically */
  }
  
  .fixed-action-btn a.btn-floating:hover {
    background-color: #e53935; /* Change background color on hover */
  }
  
  /* Add cursor styles for "edit" and "delete" icons */
  .container .collection-item a.secondary-content,
  .fixed-action-btn a.btn-floating {
    cursor: pointer; /* Set cursor to pointer for edit and delete icons */
  }
  
  /* New style for disabled links */
  .disabled-link {
    opacity: 0.5; /* Reduce opacity to make it appear disabled */
    pointer-events: none; /* Disable pointer events to prevent interaction */
  }
  </style>