import { useQuery } from '@tanstack/vue-query'

import { Label } from '../models/label.model'
import { useFetch } from 'src/composable/useFetch'

const apiURL = process.env.GITHUB_URL

const getLabels = async () => {
  const { data, error } = await useFetch<Label[]>(`${apiURL}/labels`)
  if (error.value)
    throw new Error(error.value)
  return data.value
}

export const useLabels = () => {
  const labels = useQuery(
    ['labels'],
    getLabels,
    {
      staleTime: 1000 * 60 * 60,
    }
  )

  console.log('labels', labels.data.value)

  return {
    labels
  }
}
