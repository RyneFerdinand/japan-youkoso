import { defineStore } from 'pinia'
import router from '@/router/index'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {}
  }),
  getters: {
    isLoggedIn() {
      return Object.keys(this.user).length > 0
    }
  },
  actions: {
    setUser(user) {
      this.user = user
    },
    logoutUser() {
      this.user = {}

      router.push({ name: 'home' })
    }
  }
})
