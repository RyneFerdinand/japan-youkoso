<template>
  <div class="bg-light shadow-md rounded-md p-8 min-w-fit">
    <RouterLink :to="{ name: 'step-detail', params: { id: step._id } }" class="cursor-pointer">
      <h2 class="text-head-3">{{ step.title }}</h2>
    </RouterLink>
    <p class="mt-2" v-if="step.user">{{ step.user?.name }}</p>
    <div class="flex justify-between items-center mt-12">
      <div class="flex items-center">
        <v-icon name="md-arrowdropup-sharp" scale="1.5" class="cursor-pointer hover:fill-highlight"
          :class="{ 'fill-highlight': voteStatus === 1 }" @click="vote('upvote')" />
        <p class="font-semibold">{{ this.voteCount }}</p>
        <v-icon name="md-arrowdropdown-sharp" scale="1.5" class="cursor-pointer hover:fill-highlight"
          :class="{ 'fill-highlight': voteStatus === -1 }" @click="vote('downvote')" />
      </div>
      <button v-if="authStore.user.isAdmin" @click="approveStep()"
        class="text-small border-[1px] border-highlight py-1 px-2 rounded-sm font-bold text-highlight hover:bg-highlight hover:text-light transition-colors">
        Approve
      </button>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'
import { useAuthStore } from '@/utils/store/auth.js'
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
  async created() {
    this.authStore = useAuthStore();

    try {
      const voteList = await Step.getVotesById(this.step._id);
      let tempVote = 0;
      voteList.data.steps.forEach(vote => {
        if (vote.user_id === this.authStore.user._id) this.voteStatus = vote.vote
        tempVote += vote.vote;
      });

      this.voteCount = tempVote;

    } catch (error) {
      console.log(error)
    }
  },
  data() {
    return {
      voteStatus: 0,
      voteCount: 0
    }
  },
  methods: {
    async approveStep() {
      try {
        await Step.approve(this.step._id)
        this.$router.go()
      } catch (error) {
        console.log(error)
      }
    },
    async vote(voteType) {
      let voteObject = {
        vote: voteType === 'upvote' ? 1 : -1,
        user_id: this.authStore.user._id,
      }

      const response = await Step.voteByUserId(this.step._id, voteObject);

      this.voteCount += (response.data.vote - this.voteStatus)
      this.voteStatus = response.data.vote;
    },
  }
}
</script>
