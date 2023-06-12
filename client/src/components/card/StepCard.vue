<template>
  <div class="bg-light shadow-md rounded-md p-8 min-w-fit">
    <RouterLink :to="{ name: 'step-detail', params: { id: step.id } }" class="cursor-pointer">
      <h2 class="text-head-3">{{ step.title }}</h2>
    </RouterLink>
    <p class="mt-2">{{ step.user.name }}</p>
    <div class="flex justify-between items-center mt-12">
      <div class="flex items-center">
        <v-icon
          name="md-arrowdropup-sharp"
          scale="1.5"
          class="cursor-pointer hover:fill-highlight"
        />
        <p class="font-semibold">32</p>
        <v-icon
          name="md-arrowdropdown-sharp"
          scale="1.5"
          class="cursor-pointer hover:fill-highlight"
        />
      </div>
      <button
        @click="approveStep()"
        class="text-small border-[1px] border-highlight py-1 px-2 rounded-sm font-bold text-highlight hover:bg-highlight hover:text-light transition-colors"
      >
        Approve
      </button>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'
import Step from '@/utils/request/steps.js'

export default {
  components: {
    'v-icon': OhVueIcon
  },
  props: {
    step: {
      type: Object,
      required: true
    }
  },
  methods: {
    async approveStep() {
      await Step.approve(this.step.id)
      this.$router.go()
    }
  }
}
</script>
