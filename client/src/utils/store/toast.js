import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

export const useToastStore = defineStore('toast', {
  state: () => ({
    type: '',
    text: ''
  }),
  actions: {
    setToast(text, type = 'info', notify = false) {
      this.text = text;
      this.type = type;

      if(notify) this.notify();
    },
    notify() {
      if(this.text === '') return;

      toast(this.text, { type: this.type, position: 'top-center' });

      this.text = ''; this.type ='';

    }
  }
})
