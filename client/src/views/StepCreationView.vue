<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8">
      <h1 class="text-head-1 text-highlight">Step Creation</h1>
      <div class="mt-8">
        <label class="font-bold">Title</label>
        <input
          type="text"
          placeholder="Title"
          class="mt-4 w-full outline-none border-[0.1px] rounded-md px-4 py-3 border-dark flex items-center gap-2 border-opacity-20"
        />
      </div>
      <div class="mt-6">
        <label class="font-bold">Content</label>
        <QuillEditor theme="snow" />
      </div>
      <button
        class="text-center bg-light border-[1px] border-highlight w-full mt-6 py-2 rounded-sm text-highlight font-bold hover:bg-highlight hover:text-light transition-colors"
      >
        Create
      </button>
    </div>
  </main>
</template>

<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

export default {
  components: {
    QuillEditor
  }
}
</script>

<style>
.ql-editor {
  min-height: 30rem;
}
</style>
