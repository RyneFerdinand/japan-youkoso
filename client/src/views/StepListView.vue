<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8">
      <h1 class="text-head-1 text-highlight">Step Submission</h1>
      <div class="flex justify-between mt-10">
        <div
          class="border-[0.1px] rounded-md min-w-fit w-4/12 px-4 py-3 border-dark flex items-center gap-2 border-opacity-20"
        >
          <input type="text" placeholder="Search for Step" class="w-full outline-none" />
          <v-icon name="bi-search" />
        </div>

        <button class="text-highlight font-bold hover:scale-105 transition-transform">
          + Create Step
        </button>
      </div>
      <div class="mt-6 gap-6 grid md:grid-cols-2 lg:grid-cols-3 flex-wrap">
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
        <StepCard />
      </div>
      <div class="flex flex-row-reverse mt-6">
        <ul class="flex flex-row items-center">
          <li class="px-2 py-1 bg-highlight font-bold text-light rounded-sm">1</li>
          <li class="px-2 py-1 font-bold rounded-sm">2</li>
          <li class="px-2 py-1 font-bold rounded-sm">3</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'
import StepCard from '@/components/card/StepCard.vue'

export default {
  components: {
    'v-icon': OhVueIcon,
    StepCard
  }
}
</script>
