<template>
  <div class="bg-light shadow-md rounded-md p-8 min-w-fit">
    <h2 class="text-head-3">Apply for a SIM Card</h2>
    <p class="mt-2">John Doe</p>
    <div class="flex justify-between items-center mt-12">
      <div class="flex items-center">
        <v-icon
          name="md-arrowdropup-sharp"
          scale="1.5"
          class="cursor-pointer hover:fill-highlight"
        />
        <p class="font-semibold">32</p>
        <v-icon
          name="md-arrowdropdown-sharp"
          scale="1.5"
          class="cursor-pointer hover:fill-highlight"
        />
      </div>
      <button
        class="text-small border-[1px] border-highlight py-1 px-2 rounded-sm font-bold text-highlight hover:bg-highlight hover:text-light transition-colors"
      >
        Approve
      </button>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'

export default {
  components: {
    'v-icon': OhVueIcon
  }
}
</script>
