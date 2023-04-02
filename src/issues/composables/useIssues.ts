import { useQuery } from '@tanstack/vue-query'

import { Issue, State } from '../models/issue.model'
import { useFetch } from 'src/composable/useFetch'
import { useIssuesStore } from 'src/stores/issues'
import { storeToRefs } from 'pinia'

const apiURL = process.env.GITHUB_URL

const getIssues = async (labels: string[], state: State) => {
  const params = new URLSearchParams()
  params.append('per_page', '10')

  if (state) params.append('state', state)
  if (labels.length) params.append('labels', labels.join(','))

  const url = `${apiURL}/issues?${params.toString()}`

  const { data, error } = await useFetch<Issue[]>(url)
  if (error.value)
    throw new Error(error.value)
  return data.value
}

export const useIssues = () => {

  const store = useIssuesStore()
  const { labels, state } = storeToRefs(store)

  const issuesQuery = useQuery(
    ['issues', { labels, state }],
    () => getIssues(labels.value, state.value),
    {
      staleTime: 1000 * 60 * 60,
    }
  )

  return {
    issuesQuery,
  }
}
