<template>
  <div class="py-20 px-8">
    <div class="bg-light shadow-xl mx-auto px-12 py-8 max-w-[28rem] rounded-md">
      <form @submit.prevent="submitHandler" class="flex flex-col items-center gap-4">
        <h1 class="text-head-2">Register</h1>

        <div class="flex flex-col mt-4 w-full">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            class="border-[1px] border-dark border-opacity-30 px-4 py-2 rounded-sm mt-2"
            required
          />
        </div>

        <div class="flex flex-col w-full">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="formData.email"
            class="border-[1px] border-dark border-opacity-30 px-4 py-2 rounded-sm mt-2"
            required
          />
        </div>

        <div class="flex flex-col w-full">
          <label for="dob">Date of Birth</label>
          <input
            type="text"
            id="dob"
            v-model="formData.dob"
            class="border-[1px] border-dark border-opacity-30 px-4 py-2 rounded-sm mt-2"
            required
          />
        </div>

        <div class="flex flex-col w-full">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="formData.password"
            class="border-[1px] border-dark border-opacity-30 px-4 py-2 rounded-sm mt-2"
            required
          />
        </div>

        <div class="flex flex-col w-full">
          <label for="password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            v-model="formData.confirmPassword"
            class="border-[1px] border-dark border-opacity-30 px-4 py-2 rounded-sm mt-2"
            required
          />
        </div>

        <button
          class="w-full text-head-4 text-center border-[1px] border-highlight py-2 px-6 rounded-sm text-light font-bold bg-highlight hover:opacity-60 transition-opacity mt-3"
        >
          Register
        </button>
      </form>
      <p class="mt-4">
        Already have an account ?
        <RouterLink to="/login" class="text-highlight hover:underline">Login Here</RouterLink>
      </p>
    </div>
  </div>
</template>

<script>
import User from '@/utils/request/users.js'
import { useToastStore } from '@/utils/store/toast.js'

export default {
  name: 'RegistrationView',
  data() {
    return {
      formData: {
        name: 'Ryne',
        email: 'ryne@mail.com',
        dob: '2002-12-12',
        gender: 'male',
        password: 'testingtesting',
        confirmPassword: 'testingtesting'
      },
      toastStore: {}
    }
  },
  created() {
    this.toastStore = useToastStore()
  },
  methods: {
    async submitHandler() {
      try {
        const registerResponse = await User.register(this.formData)

        if (registerResponse.data.success) {
          this.toastStore.setToast(registerResponse.data.message, 'success')
          this.$router.push('/login')
        } else {
          this.toastStore.setToast(registerResponse.data.message, 'error', true)
        }
      } catch (error) {
          this.toastStore.setToast(error, 'error', true)
      }
    }
  }
}
</script>
