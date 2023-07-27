<template>
  <main>
    <div class="max-w-container w-full mx-auto py-6 px-8 flex gap-8" v-if="!isLoading">
      <div class="bg-light shadow-md rounded-md p-8 w-1/3 h-fit">
        <h2 class="text-head-2 text-highlight">Roadmap</h2>
        <div class="mt-6 flex flex-col gap-4 w-full">
          <div class="hover:border-l-4 hover:pl-4 border-highlight transition-all cursor-pointer font-bold" :class="{
            'border-l-4': step._id === currentlySelectedStep?._id,
            'pl-4': step._id === currentlySelectedStep?._id
          }" v-for="(step, index) in userSelectedSteps" :key="step._id" @click="goToStep(step)">
            {{ `${index + 1}. ${step.title}` }}
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full text-head-1" v-if="currentlySelectedStep">
        <ContentCard type="step" :content="currentlySelectedStep" :hideVote="true" />
        <div class="self-end mt-6 flex flex-row gap-6">
          <button @click="skipStep" v-if="!isMandatory"
            class="text-[1rem] text-center bg-light border-[1px] border-highlight py-2 px-6 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors">
            Skip
          </button>
          <button @click="doneStep"
            class="text-[1rem] text-center border-[1px] border-highlight py-2 px-6 rounded-sm text-light font-bold bg-highlight hover:opacity-60 transition-opacity">
            Done
          </button>
        </div>
      </div>
      <div v-else-if="isRecommend" class="flex flex-col  bg-light shadow-md rounded-md p-8 gap-4 w-full">
        <h1 class="text-head-1">Recommendations</h1>
        <div v-for="(step, idx) in allAvailableStepsForSelect" :key="step._id" class="flex flex-col gap-4">
          <div
            class="py-4 cursor-pointer bg-light border-[1px] border-highlight px-6 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors"
            @click="chooseStep(step, idx)">
            {{ `${idx + 1}. ${step.title}` }}
          </div>
        </div>
        <button @click="finishProcess"
          class="self-end w-fit text-center bg-light border-[1px] border-highlight py-2 px-6 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors">
          Finish
        </button>
      </div>
      <div class="w-full bg-light shadow-md rounded-md p-8 gap-4" v-else>
        <h2 class="text-head-2">You're done ! 👏</h2>
        <p class="mt-4">
          You can now be sure that you've done everything before coming to Japan ! Have a nice stay. You can
          always go back to see whenever a certain step is added. You can also select the steps you've skipped below !
        </p>
        <h4 class="text-head-4 mt-6">
          Skipped steps
        </h4>
        <div v-for="(step, idx) in allSkippedSteps" :key="step._id" class="flex flex-col mt-4">
          <div
            class="py-4 cursor-pointer bg-light border-[1px] border-highlight px-6 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors"
            @click="chooseStep(step, idx)">
            {{ `${idx + 1}. ${step.title}` }}
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '@/utils/store/auth.js'
import { useToastStore } from '@/utils/store/toast'
import ContentCard from '@/components/card/ContentCard.vue'
import Step from '@/utils/request/steps.js'

export default {
  components: { ContentCard },
  data() {
    return {
      authStore: {},
      currentlySelectedStep: {},
      userSelectedSteps: [],
      allAvailableStepsForSelect: [],
      allSkippedSteps: [],
      isLoading: true,
      isRecommend: false,
      isFinished: false,
      isMandatory: false
    }
  },
  async mounted() {
    this.authStore = useAuthStore();
    this.toastStore = useToastStore()

    try {
      // currently loading
      this.isLoading = true

      // get all the active steps
      const response = await Step.getAllWeightedActiveSteps()
      const activeSteps = response.data.steps
      this.allAvailableStepsForSelect = activeSteps.sort((a, b) => (a['weight'] > b['weight'] ? -1 : 1))

      const userResponse = await Step.getUserSelection(this.authStore.user._id);

      if (userResponse.data.doneSteps) {
        this.userSelectedSteps = userResponse.data.doneSteps
      }

      if (userResponse.data.steps?.length > 0) {
        const allDoneUserSteps = userResponse.data.steps

        this.allAvailableStepsForSelect = this.allAvailableStepsForSelect.map((availableStep) => {
          for (let index = 0; index < allDoneUserSteps.length; index++) {
            const element = allDoneUserSteps[index];
            if (availableStep._id === element._id) return null;
          }
          return availableStep
        }).filter(step => step !== null);

        this.allSkippedSteps = activeSteps.filter(step => {
          for (let index = 0; index < this.userSelectedSteps.length; index++) {
            const element = this.userSelectedSteps[index];

            if (step._id === element._id) return null;
          }
          return step;

        }).filter(step => step !== null)
      }

      this.currentlySelectedStep = this.getNextStep()
      this.isLoading = false

    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    getNextStep() {
      for (let index = 0; index < this.allAvailableStepsForSelect.length; index++) {
        const step = this.allAvailableStepsForSelect[index]
        // if it's not mandatory skip
        if (!step.mandatory) continue

        // if it is, then it's not a recommendation anymore
        this.isRecommend = false
        this.isMandatory = true

        // put it into the steps that the user selected
        this.userSelectedSteps?.push(step)

        this.allAvailableStepsForSelect.splice(index, 1)
        return step
      }

      if (this.allAvailableStepsForSelect.length > 0) {
        this.isMandatory = false
        this.isRecommend = true
      }
      return null
    },
    async doneStep() {
      try {
        const response = await Step.doneStep(this.currentlySelectedStep._id, this.authStore.user._id)

        if (response.data.success) {
          this.currentlySelectedStep = this.getNextStep()
          this.toastStore.setToast(response.data.message, 'success', true)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async skipStep() {

      if (this.allAvailableStepsForSelect.length === 0) {
        this.currentlySelectedStep = null;
        this.isMandatory = false;
        this.isRecommend = false;
      } else {
        try {
          const response = await Step.skipStep(this.currentlySelectedStep._id, this.authStore.user._id)
          if (response.data.success) {
            this.allAvailableStepsForSelect.push(this.currentlySelectedStep);
            this.userSelectedSteps.pop();
            this.currentlySelectedStep = this.getNextStep()
            this.toastStore.setToast(response.data.message, 'success', true)
          }
        } catch (error) {
          console.error(error)
        }
      }

    },
    async finishProcess() {
      this.isRecommend = false
      this.isFinished = true
      this.currentlySelectedStep = null;
      try {
        this.allAvailableStepsForSelect.forEach(async (step, idx) => {
          await Step.skipStep(step._id, this.authStore.user._id)

          if (idx === this.allAvailableStepsForSelect.length - 1) {
            this.toastStore.setToast('All steps finished !', 'success', true)
            const response = await Step.getAllWeightedActiveSteps()
            const activeSteps = response.data.steps

            this.allAvailableStepsForSelect = activeSteps.sort((a, b) => (a['weight'] > b['weight'] ? -1 : 1))

            this.allSkippedSteps = activeSteps.filter(step => {
              for (let index = 0; index < this.userSelectedSteps.length; index++) {
                const element = this.userSelectedSteps[index];

                if (step._id === element._id) return null;
              }
              return step;

            }).filter(step => step !== null)
          }
        });



      } catch (error) {
        console.error(error)
      }
    },
    chooseStep(step, index) {
      this.userSelectedSteps.push(step)
      if (this.allAvailableStepsForSelect.length > 0) {
        this.allAvailableStepsForSelect.splice(index, 1)
      }
      this.currentlySelectedStep = step
      this.isMandatory = step.mandatory
      this.isRecommend = false
    },
    goToStep(step) {
      this.currentlySelectedStep = step
      this.isMandatory = step.mandatory
    }
  }
}
</script>
