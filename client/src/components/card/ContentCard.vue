<template>
  <div class="bg-light shadow-md rounded-md p-8 flex gap-4 w-full">
    <div class="flex flex-col items-center w-fit" v-if="!hideVote && type !== 'comment'">
      <v-icon name="md-arrowdropup-sharp" scale="2" class="cursor-pointer hover:fill-highlight"
        :class="{ 'fill-highlight': voteStatus === 1 }" @click="vote('upvote')" />
      <p class="font-semibold">{{ this.voteCount }}</p>
      <v-icon name="md-arrowdropdown-sharp" scale="2" class="cursor-pointer hover:fill-highlight"
        :class="{ 'fill-highlight': voteStatus === -1 }" @click="vote('downvote')" />
    </div>
    <div>
      <h1 class="text-head-1 text-highlight" v-if="this.type === 'step'">{{ content?.title }}</h1>
      <h4 class="text-head-4" v-if="this.type === 'comment'">{{ content.user?.name }}</h4>
      <p class="mt-4 card-content" v-html="content?.content"></p>
    </div>
  </div>
</template>

<script>
import { OhVueIcon } from 'oh-vue-icons'
import { useAuthStore } from '@/utils/store/auth.js'
import { useToastStore } from '@/utils/store/toast.js'
import Comment from '@/utils/request/comments.js'
import Step from '@/utils/request/steps.js'

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
    },
    status: {
      type: Number,
      required: false
    },
    hideVote: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      voteStatus: 0,
      voteCount: 0
    }
  },
  computed: {
    request() {
      if (this.content === 'comment') {
        return Comment;
      } else {
        return Step;
      }
    }
  },
  async created() {
    this.authStore = useAuthStore();
    this.toastStore = useToastStore();
    this.toastStore.notify();

    try {
      const voteList = await this.request.getVotesById(this.content._id);
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
  methods: {
    async vote(voteType) {
      let voteObject = {
        vote: voteType === 'upvote' ? 1 : -1,
        user_id: this.authStore.user._id,
      }

      const response = await this.request.voteByUserId(this.content._id, voteObject);
      console.log(response)

      this.voteCount += (response.data.vote - this.voteStatus)
      this.voteStatus = response.data.vote;

    },
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

.card-content * {
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
