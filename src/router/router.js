import { getAuth, onAuthStateChanged } from "firebase/auth";
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
    path: '/contacts',
    name: 'Contacts',
    component: () => import('@/views/ContactsView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/new-contact',
    name: 'new-contact',
    component: () => import('@/views/NewContact.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/send-money',
    name: 'SendMoney',
    component: () => import('@/views/SendMoneyView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/transactions',
    name: 'Transactions',
    component: () => import('@/views/TransactionsView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue'),
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/piggy-bank',
    name: 'PiggyBank',
    component: () => import('@/views/PiggyBankView.vue'),
    meta: {
      requiresAuth: true
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  onAuthStateChanged(getAuth(), (user) => {
    if (to.meta.requiresAuth && user == null) {
      next({name: 'Register'})
    }
    next()
  })
})

export default router