<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8">
      <h1 class="text-head-1 text-highlight">Step Creation</h1>
      <form @submit.prevent="submitHandler">
        <div class="mt-8">
          <label class="font-bold">Title</label>
          <input type="text" name="title" placeholder="Title" v-model="title"
            class="mt-4 w-full outline-none border-[0.1px] rounded-md px-4 py-3 border-dark flex items-center gap-2 border-opacity-20" />
        </div>
        <div class="mt-6">
          <label class="font-bold">Content</label>
          <QuillEditor theme="snow" v-model:content="content" contentType="html" />
        </div>
        <div class="mt-6"><input type="checkbox" v-model="mandatory" /> Mandatory</div>
        <button type="submit"
          class="text-center bg-light border-[1px] border-highlight w-full mt-6 py-2 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors">
          Create
        </button>
      </form>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from '@/utils/store/auth.js'
import { QuillEditor } from '@vueup/vue-quill'
import Step from '@/utils/request/steps.js'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      title: '',
      content: '',
      mandatory: false,
      authStore: {}
    }
  },
  created() {
    this.authStore = useAuthStore()
  },
  methods: {
    async submitHandler() {
      const stepObject = {
        title: this.title,
        content: this.content,
        mandatory: this.mandatory,
        user_id: this.authStore.user._id
      }

      try {
        const response = await Step.create(stepObject)
        if (response.data.success) {
          this.$router.push('/step/list')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>
.ql-editor {
  min-height: 30rem;
}
</style>
