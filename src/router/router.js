//import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/new-contact',
    name: 'new-contact',
    component: () => import('@/views/NewContact.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})



export default router
