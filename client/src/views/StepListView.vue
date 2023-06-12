<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8">
      <h1 class="text-head-1 text-highlight">Step Submission</h1>
      <div class="flex justify-between mt-10">
        <!-- <div
          class="border-[0.1px] rounded-md min-w-fit w-4/12 px-4 py-3 border-dark flex items-center gap-2 border-opacity-20"
        >
          <input type="text" placeholder="Search for Step" class="w-full outline-none" />
          <v-icon name="bi-search" />
        </div> -->

        <RouterLink
          to="/step/create"
          class="text-highlight font-bold hover:scale-105 transition-transform"
        >
          + Create Step
        </RouterLink>
      </div>
      <div class="mt-6 gap-6 grid md:grid-cols-2 lg:grid-cols-3 flex-wrap">
        <StepCard v-for="step in steps" :key="step.id" :step="step" />
      </div>
      <button
        v-if="page <= pageCount"
        @click="loadMoreSteps()"
        class="text-center bg-light border-[1px] border-highlight w-full mt-6 py-2 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors"
      >
        Load More
      </button>
    </div>
  </main>
</template>

<script>
// import { OhVueIcon } from 'oh-vue-icons'
import StepCard from '@/components/card/StepCard.vue'
import Step from '@/utils/request/steps.js'
import User from '@/utils/request/users.js'

export default {
  components: {
    // 'v-icon': OhVueIcon,
    StepCard
  },
  data() {
    return {
      steps: [],
      page: 1,
      pageCount: -1
    }
  },
  async created() {
    try {
      const response = await Step.getAll()
      const responseLength = this.filterApproved(response).length
      this.pageCount = Math.ceil(responseLength / 12)
      console.log(response.length / 12)
      const tempSteps = await Step.getAll(this.page)
      this.page++

      tempSteps.forEach(async (step, idx) => {
        const userData = await User.getById(step['user_id'])
        delete step['user_id']
        step.user = userData
        if (idx === tempSteps.length - 1) {
          this.steps = this.filterApproved(tempSteps)
        }
      })
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async loadMoreSteps() {
      const tempSteps = await Step.getAll(this.page)
      this.page++

      tempSteps.forEach(async (step) => {
        const userData = await User.getById(step['user_id'])
        delete step['user_id']
        step.user = userData
        this.steps.push(step)
      })

      this.steps = this.filterApproved(this.steps)
    },
    filterApproved(tempSteps) {
      return tempSteps.filter((step) => step.approved !== 1)
    }
  }
}
</script>
