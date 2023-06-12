<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8" v-if="!isLoading">
      <ContentCard type="step" :content="step" />
      <h2 class="mt-14 text-head-2 text-highlight">Comments</h2>

      <div
        class="border-[0.1px] rounded-md mt-4 min-w-fit px-4 py-3 border-dark flex flex-col gap-2 border-opacity-20"
      >
        <textarea
          name=""
          id=""
          cols="30"
          rows="4"
          class="w-full resize-none outline-none"
          placeholder="Add Comment"
          v-model="comment"
        ></textarea>
        <button
          @click="submitCommentHandler"
          class="self-end text-small border-[1px] border-highlight py-1 px-2 rounded-sm font-bold text-highlight hover:bg-highlight hover:text-light transition-colors"
        >
          Create
        </button>
      </div>

      <div class="mt-8 flex flex-col gap-4">
        <ContentCard
          v-for="comment in step.comments"
          :key="comment.id"
          :content="comment"
          type="comment"
        />
      </div>
    </div>
  </main>
</template>

<script>
import ContentCard from '@/components/card/ContentCard.vue'
import Step from '@/utils/request/steps.js'
import User from '@/utils/request/users.js'
import Comment from '@/utils/request/comments.js'

export default {
  components: {
    ContentCard
  },
  data() {
    return {
      step: {},
      comment: '',
      isLoading: false
    }
  },
  async mounted() {
    try {
      const stepId = this.$route.params.id

      const tempStep = await Step.getById(stepId)

      tempStep.user = await User.getById(tempStep['user_id'])
      delete tempStep['user_id']

      tempStep.comments = await Comment.getByStepId(stepId)

      await tempStep.comments.forEach(async (comment, idx) => {
        const userData = await User.getById(comment['user_id'])
        delete comment['user_id']

        comment.user = userData

        if (idx === tempStep.comments.length - 1) {
          this.step = tempStep
        }
      })
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    async submitCommentHandler() {
      const stepId = this.$route.params.id
      try {
        const commentObject = { step_id: stepId, user_id: 1, content: this.comment }
        await Comment.create(commentObject)

        const newComments = await Comment.getByStepId(stepId)

        await newComments.forEach(async (comment, idx) => {
          const userData = await User.getById(comment['user_id'])
          delete comment['user_id']

          comment.user = userData

          if (idx === newComments.length - 1) {
            this.step.comments = newComments
            this.comment = ''
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
