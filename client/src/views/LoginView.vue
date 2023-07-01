<template>
  <div class="py-20 px-8">
    <div class="bg-light shadow-xl mx-auto px-12 py-8 max-w-[28rem] rounded-md">
      <form @submit.prevent="submitHandler" class="flex flex-col items-center gap-4">
        <h1 class="text-head-2">Login</h1>
        <div class="flex flex-col mt-2 w-full">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="formData.email"
            class="border-[1px] border-dark border-opacity-30 px-4 py-2 rounded-sm mt-2" required />
        </div>

        <div class="flex flex-col w-full">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="formData.password"
            class="border-[1px] border-dark border-opacity-30 px-4 py-2 rounded-sm mt-2" required />
        </div>
        <button
          class="w-full text-head-4 text-center border-[1px] border-highlight py-2 px-6 rounded-sm text-light font-bold bg-highlight hover:opacity-60 transition-opacity mt-3">
          Login
        </button>
      </form>
      <p class="mt-4">
        Don't have an account ?
        <RouterLink to="/register" class="text-highlight hover:underline">Register Here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import User from '@/utils/request/users.js'
import { useAuthStore } from '@/utils/store/auth.js'
import { useToastStore } from '@/utils/store/toast.js'

export default {
  name: 'RegistrationView',
  data() {
    return {
      formData: {
        email: 'ryne@mail.com',
        password: 'testingtesting'
      },
      authStore: {},
      toastStore: {}
    }
  },
  created() {
    this.authStore = useAuthStore()
    this.toastStore = useToastStore()

    this.toastStore.notify();
  },
  methods: {
    async submitHandler() {
      try {
        const loginResponse = await User.login(this.formData)

        if (loginResponse.data.success) {
          this.authStore.setUser(loginResponse.data.user)
          this.toastStore.setToast(loginResponse.data.message, 'success')
          localStorage.setItem('uid', loginResponse.data.user._id)
          this.$router.push('/')
        } else {
          this.toastStore.setToast(loginResponse.data.message, 'error', true)
        }
      } catch (error) {
        this.toastStore.setToast(error, 'error', true)
      }
    }
  }
}
</script>
