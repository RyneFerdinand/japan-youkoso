<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8 flex gap-8" v-if="!isLoading">
      <div class="bg-light shadow-md rounded-md p-8 w-1/3 h-fit">
        <h2 class="text-head-2 text-highlight">Roadmap</h2>
        <div class="mt-6 flex flex-col gap-4 w-full">
          <div
            class="hover:border-l-4 hover:pl-4 hover:border-highlight transition-all cursor-pointer font-bold"
            v-for="(stepId, index) in userStep.step_list"
            :key="stepId"
          >
            {{ `${index + 1}. ${getStepById(stepId).title}` }}
          </div>
          <div class="border-l-4 pl-4 border-highlight cursor-pointer font-bold" v-if="this.step">
            {{ `${userStep.step_list.length + 1}. ${step.title}` }}
          </div>
          <div v-else>You're done ! 🙂</div>
        </div>
      </div>
      <div class="flex flex-col w-full text-head-1" v-if="step">
        <ContentCard type="step" :content="step" />
        <div class="self-end mt-6 flex flex-row gap-6">
          <button
            @click="skipStep"
            class="text-center bg-light border-[1px] border-highlight py-2 px-6 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors"
          >
            Skip
          </button>
          <button
            @click="doneStep"
            class="text-center border-[1px] border-highlight py-2 px-6 rounded-sm text-light font-bold bg-highlight hover:opacity-60 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
      <div v-else-if="isRecommend" class="flex flex-col">
        <h1 class="text-head-1">Recommendations</h1>
        <div v-for="(recommendation, index) in recommendations" :key="index">
          <div class="py-4 cursor-pointer" @click="chooseStep(recommendation)">
            {{ '- ' + getStepById(recommendation).title }}
          </div>
        </div>
        <button
          @click="finishProcess"
          class="text-center bg-light border-[1px] border-highlight py-2 px-6 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors"
        >
          Finish
        </button>
      </div>
      <div class="w-full" v-else>You're done ! 🙂</div>
    </div>
  </main>
</template>

<script>
import ContentCard from '@/components/card/ContentCard.vue'
import Step from '@/utils/request/steps.js'
import StepUtils from '@/utils/utilities/stepUtils.js'
// import User from '@/utils/request/users.js'
// import Comment from '@/utils/request/comments.js'

export default {
  components: { ContentCard },
  data() {
    return {
      userStep: {},
      step: {},
      allSteps: [],
      allActiveSteps: [],
      comment: '',
      isLoading: true,
      recommendations: []
    }
  },
  async mounted() {
    try {
      this.isLoading = true
      this.allSteps = await Step.getAll()
      const totalLength = this.allSteps.length

      const allActiveSteps = await Step.getAllActiveSteps()
      this.allActiveSteps = allActiveSteps

      const userStep = await Step.getUsersSteps(1)
      this.userStep = userStep[0]
      const currentTotalLength = this.userStep.steps.length
      if (currentTotalLength < totalLength)
        for (let index = currentTotalLength; index < totalLength; index++)
          this.userStep.steps.push(0)

      const nextStep = StepUtils.getNextMandatoryStep(this.userStep.step_list, allActiveSteps)
      this.step = nextStep

      if (!nextStep) {
        this.isRecommend = true
        this.recommendations = StepUtils.getRecommendations(this.userStep.step_list, allActiveSteps)
        console.log(this.recommendations)
      }

      this.isLoading = false
    } catch (error) {
      console.error(error)
    }
  },
  computed: {
    isRecommend() {
      return this.recommendations.length > 1
    }
  },
  methods: {
    getStepById(id) {
      for (let index = 0; index < this.allSteps.length; index++) {
        const element = this.allSteps[index]
        if (element.id == id) return element
      }
    },
    async doneStep() {
      try {
        this.userStep.steps[this.step.id - 1] = 1
        this.userStep.step_list.push(this.step.id)

        Step.updateUserStep(this.userStep)

        const allSteps = await Step.getAll()
        const totalLength = allSteps.length

        const allActiveSteps = await Step.getAllActiveSteps()
        this.allActiveSteps = allActiveSteps

        const currentTotalLength = this.userStep.steps.length
        if (currentTotalLength < totalLength)
          for (let index = currentTotalLength; index < totalLength; index++)
            this.userStep.steps.push(0)

        const nextStep = StepUtils.getNextMandatoryStep(this.userStep.step_list, allActiveSteps)

        if (!nextStep) {
          this.isRecommend = true
          this.recommendations = StepUtils.getRecommendations(
            this.userStep.step_list,
            allActiveSteps
          )
          console.log(this.recommendations)
        }
        this.step = nextStep
      } catch (error) {
        console.error(error)
      }
    },
    finishProcess() {
      this.userStep.steps = this.userStep.steps.map((step) => (step === 0 ? -1 : step))
      Step.updateUserStep(this.userStep)
    },
    chooseStep() {
      this.step = this.getStepById
    }
  }
}
</script>
