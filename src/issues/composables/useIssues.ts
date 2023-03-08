import { useQuery } from '@tanstack/vue-query'

import { Issue } from '../models/issue.model'
import { useFetch } from 'src/composable/useFetch'

const apiURL = process.env.GITHUB_URL

const getIssues = async () => {
  const params = new URLSearchParams()
  params.append('per_page', '10')
  const url = `${apiURL}/issues?${params.toString()}`

  const { data, error } = await useFetch<Issue[]>(url)
  if (error.value)
    throw new Error(error.value)
  return data.value
}

export const useIssues = () => {
  const issuesQuery = useQuery(
    ['issues'],
    () => getIssues(),
    {
      staleTime: 1000 * 60 * 60,
    }
  )

  return {
    issuesQuery,
  }
}
