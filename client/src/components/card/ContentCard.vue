<template>
  <div class="bg-light shadow-md rounded-md p-8 flex gap-4 w-full">
    <!-- <div class="flex flex-col items-center w-fit">
      <v-icon name="md-arrowdropup-sharp" scale="2" class="cursor-pointer hover:fill-highlight" />
      <p class="font-semibold">32</p>
      <v-icon name="md-arrowdropdown-sharp" scale="2" class="cursor-pointer hover:fill-highlight" />
    </div> -->
    <div>
      <h1 class="text-head-1 text-highlight" v-if="this.type === 'step'">{{ content.title }}</h1>
      <h4 class="text-head-4" v-if="this.type === 'comment'">{{ content.user.name }}</h4>
      <p class="mt-4 card-content" v-html="content.content"></p>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'

export default {
  components: {
    'v-icon': OhVueIcon
  },
  props: {
    type: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.card-content h1 {
  font-size: 3rem;
  font-weight: bold;
}

.card-content h2 {
  font-size: 2.25rem;
  font-weight: bold;
}

.card-content h3 {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-content h4 {
  font-size: 1.25rem;
  font-weight: bold;
}

* {
  font-size: 1rem;
  font-weight: normal;
}

.card-content a {
  color: #bc002d;
}

.card-content a:hover {
  text-decoration: underline;
}

.card-content a:visited {
  opacity: 60%;
}

.card-content ul {
  list-style: disc;
}

.card-content ol {
  list-style: decimal;
}
</style>
