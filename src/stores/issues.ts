import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useIssuesStore = defineStore('issues', () => {
  const labels = ref<string[]>([]);
  const state = ref<'all' | 'open' | 'closed'>('all');

  return {
    state,
    labels,
  }
})
