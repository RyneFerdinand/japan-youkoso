<template>
  <div>
    <div class="relative h-96">
      <img src="../assets/hero_page.jpg" class="absolute inset-0 w-screen h-full object-cover" />
      <div class="h-full flex flex-col items-center justify-center bg-dark bg-opacity-60 relative">
        <h1 class="text-head-2 text-light">日 本 へ よ う こ そ !</h1>
        <h1 class="text-head-4 text-light">Your one Stop Platform for Moving to Japan</h1>
      </div>
    </div>
    <div class="container px-40 py-10 mx-auto">
      <div class="lg:-mx-6 lg:flex lg:items-center">
        <div class="mt-8 lg:w-2/3 lg:px-6 lg:mt-0">
          <h1 class="text-head-2 text-highlight dark:text-white lg:text-3xl">
            Moving to Japan is hard
          </h1>

          <p class="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
            Welcome to "Japan Youkoso," your ultimate guide to living, thriving, and immersing
            yourself in the incredible world of Japan! Whether you're captivated by the
            awe-inspiring landscapes, intrigued by the rich cultural heritage, or seeking
            professional opportunities in one of the most technologically advanced nations, our
            website is here to make your Japanese dreams a reality.
          </p>
          <p class="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
            At Japan Youkoso, we understand that moving to a new country can be both thrilling and
            overwhelming. That's why we've curated a comprehensive platform to cater to individuals
            who aspire to make Japan their home. Our user-friendly interface provides a wealth of
            resources, expert advice, and personalized support to ensure a smooth transition and
            help you navigate every aspect of your life in Japan.
          </p>
        </div>
        <img
          class="object-cover object-center lg:w-1/3 lg:mx-6 w-full rounded-lg"
          src="../assets/home_travel.svg"
          alt=""
        />
      </div>
    </div>

    <div class="container px-40 py-10 mx-auto">
      <div class="lg:-mx-6 lg:items-center">
        <div class="mt-8 lg:px-6 lg:mt-0">
          <h1 class="text-head-2 text-highlight lg:text-3xl text-center">The Roadmap</h1>
          <p class="max-w-lg mt-6 text-gray-500 dark:text-gray-400 text-center">
            Tell us where you are, we’ll give you a personalized checklist on what to do !
          </p>

          <div class="flex items-center justify-between mt-12 px-40">
            <button
              title="Before coming to japan"
              class="p-2 text-gray-800 transition-colors duration-300 border square-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
            >
              <img src="../assets/before_travel.svg" />
              <caption>
                Before coming to japan
              </caption>
            </button>
            <button
              title="After coming to japan"
              class="p-2 text-gray-800 transition-colors duration-300 border square-full rtl:-scale-x-100 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 lg:mx-6 hover:bg-gray-100"
            >
              <img src="../assets/after_travel.svg" />
              <caption>
                After coming to japan
              </caption>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { useToastStore } from '@/utils/store/toast.js'

export default {
  data() {
    return {
      toastStore : {}
    }
  },
  created() {
    this.toastStore = useToastStore();
    this.toastStore.notify();
  }
}
</script>