import { defineStore } from 'pinia'
import User from '@/request/User.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authUser: undefined,
  }),
  getters: {
    user: (state) => state.authUser,
    isAuthenticated: (state) => state.authUser !== undefined,
  },
  actions: {
    setUser(user) {
      this.authUser = user
    },
    removeUser() {
      this.authUser = undefined
    },
    setToken(token) {
      localStorage.setItem('token', token)
    },
    getToken() {
      return localStorage.getItem('token')
    },
    async registerUser(email, password, phone) {
      try {
          const response = await User.register(email, password, phone)
          this.setUser(response.user)
          this.setToken(response.user.uid);
        } catch (error) {
          console.error('Error registering user:', error.message);
      }
  },
}
})