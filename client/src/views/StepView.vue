<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8" v-if="!isLoading">
      <ContentCard type="step" :content="step" :key="step._id" />
      <h2 class="mt-14 text-head-2 text-highlight">Comments</h2>

      <div class="border-[0.1px] rounded-md mt-4 min-w-fit px-4 py-3 border-dark flex flex-col gap-2 border-opacity-20"
        v-if="authStore.isLoggedIn">
        <textarea name="" id="" cols="30" rows="4" class="w-full resize-none outline-none" placeholder="Add Comment"
          v-model="comment"></textarea>
        <button @click="submitCommentHandler"
          class="self-end text-small border-[1px] border-highlight py-1 px-2 rounded-sm font-bold text-highlight hover:bg-highlight hover:text-light transition-colors">
          Create
        </button>
      </div>

      <div class="mt-8 flex flex-col gap-4" v-if="step && step.comments">
        <ContentCard v-for="comment in step.comments" :key="comment._id" :content="comment" type="comment" />
      </div>
    </div>
  </main>
</template>

<script>
import ContentCard from '@/components/card/ContentCard.vue'
import Step from '@/utils/request/steps.js'
import User from '@/utils/request/users.js'
import { useAuthStore } from '@/utils/store/auth.js'
import { useToastStore } from '@/utils/store/toast.js'
import Comment from '@/utils/request/comments.js'

export default {
  components: {
    ContentCard
  },
  data() {
    return {
      step: {},
      authStore: {},
      toastStore: {},
      comment: '',
      isLoading: false,
    }
  },
  created() {
    this.authStore = useAuthStore();
    this.toastStore = useToastStore();
    this.toastStore.notify();
  },
  async mounted() {
    try {
      const stepId = this.$route.params.id

      const stepResponse = await Step.getById(stepId)
      const step = stepResponse.data.step;

      step.user = await User.getById(step['user_id'])
      delete step['user_id']
      step.comments = [];

      console.log(stepId)
      const commentResponse = await Step.getCommentById(stepId)
      let tempComments = commentResponse.data.comments;
      console.log(tempComments)

      tempComments.forEach(async (comment, idx) => {
        const userResponse = await User.getById(comment['user_id'])
        delete comment['user_id']

        comment.user = userResponse.data.user
        if (idx === tempComments.length - 1) this.step.comments = tempComments
      })

      this.step = step;

    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async submitCommentHandler() {
      const stepId = this.$route.params.id

      try {
        let commentObject = { step_id: stepId, user_id: this.authStore.user._id, content: this.comment, created_at: new Date() }
        const commentResponse = await Comment.create(commentObject)

        if (commentResponse.data.success) {
          this.comment = ''
          this.toastStore.setToast(commentResponse.data.message, 'success')
          delete commentObject['user_id']
          commentObject = { ...commentObject, 'user': this.authStore.user }

          this.step.comments.unshift(commentObject);
        } else {
          this.toastStore.setToast(commentResponse.data.message, 'error', true)
        }

      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
