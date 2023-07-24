<template>
    <div class="container">
      <label>Filtro por rango de Fecha de Nacimiento:</label><br>  
      <div class="filter-item input-field">
        <span>De:</span>
        <input
          id="startDate"
          type="date"
          v-model="startDate"
          @change="filterStudents"
        />
        <span>A:</span>
        <input
          id="endDate"
          type="date"
          v-model="endDate"
          @change="filterStudents"
        />
      </div>
      <div v-for="student in filteredStudents" :key="student.id" class="student-card">
        <p class="student-name">{{ student.nombre }} {{ student.apellido }}</p>
        <p>CI: {{ student.ci }}</p>
        <p>Date of Birth: {{ student.fecha_nacimiento }}</p>
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
        students: [],
        startDate: null,
        endDate: null,
      };
    },
    computed: {
      filteredStudents() {
        if (!this.startDate && !this.endDate) return this.students;
  
        return this.students.filter((student) => {
          const studentDate = new Date(student.fecha_nacimiento);
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
  
          return studentDate >= start && studentDate <= end;
        });
      },
    },
    methods: {
      async fetchStudents() {
        try {
          const response = await axios.get(this.apiUrl+'/Estudiantes');
          this.students = response.data;
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      },
      filterStudents() {
        // The computed property already handles filtering based on the date range
      },
    },
    mounted() {
      this.fetchStudents();
    },
  };
  </script>
  
  <style>

    .static-label {
    font-size: 18px;
    font-weight: bold;
    }

    .filter-item {
    margin-bottom: 20px;
    }

    .student-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 5px;
    }

    .student-name {
    font-weight: bold;
    margin-bottom: 5px;
    }
  </style>