<template>
  <main>
    <div class="max-w-container mx-auto py-6 px-8">
      <ContentCard type="step" />
      <div class="mt-14 flex justify-between items-center text-highlight">
        <h2 class="text-head-2">Comments</h2>
        <p class="font-bold">+ Create Content</p>
      </div>
      <div class="mt-8 flex flex-col gap-4">
        <ContentCard type="comment" />
        <ContentCard type="comment" />
        <ContentCard type="comment" />
        <ContentCard type="comment" />
        <ContentCard type="comment" />
      </div>
    </div>
  </main>
</template>

<script>
import ContentCard from '@/components/card/ContentCard.vue'

export default {
  components: {
    ContentCard
  }
}
</script>
