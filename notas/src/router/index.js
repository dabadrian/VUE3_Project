import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/Alumnos',
    name: 'Alumnos',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Alumnos" */ '../views/AlumnoView.vue')
  },
  {
    path: '/Docentes',
    name: 'Docentes',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Docentes" */ '../views/DocenteView.vue')
  }, 
  {
    path: '/Docente',
    name: 'Docente',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Docente" */ '../views/DocenteSave.vue')
  },  
  {
    path: '/Alumno',
    name: 'Alumno',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Alumno" */ '../views/AlumnoFiltro.vue')
  },    
  {
    path: '/Notas',
    name: 'Notas',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Notas" */ '../views/NotasView.vue')
  },    

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
