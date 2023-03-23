import { useQuery } from '@tanstack/vue-query'

import { Issue } from '../models/issue.model'
import { useFetch } from 'src/composable/useFetch'
const apiURL = process.env.GITHUB_URL

const getIssue = async (id: number) => {
  const url = `${apiURL}/issues/${id}`

  const { data, error } = await useFetch<Issue>(url)
  if (error.value)
    throw new Error(error.value)
  return data.value
}

export const useIssue = (issueId: number) => {
  const issueQuery = useQuery(
    ['issue', issueId],
    () => getIssue(issueId),
    {
      staleTime: 1000 * 60 * 60,
    }
  )

  return {
    issueQuery,
  }
}
