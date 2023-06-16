<template>
  <header>
    <div class="max-w-container mx-auto flex justify-between items-center py-6 px-8 relative">
      <RouterLink :to="{ name: 'home' }" class="flex items-center gap-3">
        <img src="@/assets/japan.png" class="w-12 aspect-square" alt="Website Logo" />
        <h4 class="font-head-4 font-bold text-highlight">Japan Youkoso</h4>
      </RouterLink>
      <button
        class="md:hidden cursor-pointer hover:scale-110 z-50 transition-transform"
        @click="toggleNav"
      >
        <v-icon name="gi-hamburger-menu" scale="1.5" />
      </button>
      <nav
        id="nav"
        class="items-center justify-center flex flex-col md:hidden w-screen h-screen inset-0 absolute bg-light"
        v-show="this.showNav"
      >
        <ul class="list-none flex items-center gap-8 flex-col md:flex-row">
          <li>
            <RouterLink :to="{ name: 'home' }" class="hover:underline">Home</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'home' }" class="hover:underline">Roadmap</RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'home' }"
              class="border-2 border-highlight py-2 px-6 rounded-full font-bold text-highlight hover:bg-highlight hover:text-light transition-colors"
              >Login</RouterLink
            >
          </li>
        </ul>
      </nav>
      <nav id="nav" class="items-center flex-row md:flex hidden">
        <ul class="list-none flex items-center gap-8 flex-col md:flex-row">
          <li>
            <RouterLink :to="{ name: 'home' }" class="hover:underline">Home</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'step-list' }" class="hover:underline">Step</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'roadmap' }" class="hover:underline">Roadmap</RouterLink>
          </li>
          <li>
            <RouterLink
              :to="{ name: 'register' }"
              class="border-2 border-highlight py-2 px-6 rounded-full font-bold text-highlight hover:bg-highlight hover:text-light transition-colors"
              >Register</RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'

export default {
  components: {
    'v-icon': OhVueIcon
  },
  data() {
    return {
      showNav: false
    }
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav
    }
  }
}
</script>
