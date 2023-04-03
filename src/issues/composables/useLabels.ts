import { storeToRefs } from 'pinia'
import { useQuery } from '@tanstack/vue-query'

import { Label } from '../models/label.model'
import { useFetch } from 'src/composable/useFetch'
import { useIssuesStore } from 'src/stores/issues'

const apiURL = process.env.GITHUB_URL

const getLabels = async () => {
  const { data, error } = await useFetch<Label[]>(`${apiURL}/labels`)
  if (error.value)
    throw new Error(error.value)
  return data.value
}

export const useLabels = () => {

  const store = useIssuesStore();
  const { labels } = storeToRefs(store);

  const labelsQuery = useQuery(
    ['labels'],
    getLabels,
    {
      staleTime: 1000 * 60 * 60,
    }
  )

  return {
    labelsQuery,
    selectedLabels: labels,
    toggleLabel: store.toggleLabel
  }
}
