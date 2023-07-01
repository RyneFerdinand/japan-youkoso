<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8">
      <h1 class="text-head-1 text-highlight">Step Submission</h1>
      <div class="flex justify-between mt-10">
        <RouterLink v-if="authStore.isLoggedIn" to="/step/create"
          class="text-highlight font-bold hover:scale-105 transition-transform">
          + Create Step
        </RouterLink>
      </div>
      <div class="mt-6 gap-6 grid md:grid-cols-2 lg:grid-cols-3 flex-wrap" v-if="stepExists">
        <StepCard v-for="step in steps" :key="step._id" :step="step" />
      </div>
      <button v-if="page <= totalPage" @click="loadMoreSteps()"
        class="text-center bg-light border-[1px] border-highlight w-full mt-6 py-2 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors">
        Load More
      </button>
    </div>
  </main>
</template>

<script>
// import { OhVueIcon } from 'oh-vue-icons'
import { useAuthStore } from '@/utils/store/auth.js'
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
      totalPage: -1
    }
  },
  computed: {
    stepExists() {
      return this.steps.length > 0
    }
  },
  created() {
    this.authStore = useAuthStore()
  },
  async mounted() {
    await this.loadMoreSteps()
  },
  methods: {
    async loadMoreSteps() {
      try {
        const response = await Step.getAllInactiveSteps(this.page)

        this.totalPage = response.data.totalPage
        const tempSteps = response.data.steps
        this.page++

        tempSteps.forEach(async (step, idx) => {
          const userResponse = await User.getById(step['user_id'])
          const userData = userResponse.data.user
          delete step['user_id']
          step.user = userData

          const voteResponse = await Step.getVotesById(step._id);
          let tempVote = 0;
          voteResponse.data.steps.forEach(vote => {
            tempVote += vote.vote;
          });

          step.voteCount = tempVote;

          if (idx === tempSteps.length - 1) {
            this.steps.push(...tempSteps)
            this.steps.sort((a, b) => a['voteCount'] > b['voteCount'] ? -1 : 1)
          }
        })

      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
