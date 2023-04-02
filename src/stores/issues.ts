import { ref } from 'vue';
import { defineStore } from 'pinia';
import { State } from 'src/issues/models/issue.model';

export const useIssuesStore = defineStore('issues', () => {
  const labels = ref<string[]>([]);
  const state = ref<State>(State.All);

  return {
    state,
    labels,
    toggleLabel: (label: string) => {
      if (labels.value.includes(label))
        labels.value = labels.value.filter(l => l !== label);
      else
        labels.value.push(label);
    }
  }
})
