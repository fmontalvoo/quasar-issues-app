import { useQuery } from '@tanstack/vue-query'

import { Comment, Issue } from '../models/issue.model'
import { useFetch } from 'src/composable/useFetch'
import { computed } from 'vue'
const apiURL = process.env.GITHUB_URL

const getIssue = async (id: number) => {
  const url = `${apiURL}/issues/${id}`

  const { data, error } = await useFetch<Issue>(url)

  if (error.value)
    throw new Error(error.value)
  return data.value
}

const getIssueComments = async (id: number) => {
  const url = `${apiURL}/issues/${id}/comments`

  const { data, error } = await useFetch<Comment[]>(url)

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

  const commentsQuery = useQuery(
    ['issue', issueId, 'comments'],
    () => getIssueComments(issueId),
    // () => getIssueComments(issueQuery.data.value?.number || 0),
    {
      staleTime: 1000 * 60,
      // enabled: computed(() => !!issueQuery.data.value) // Realiza la peticion si el valor de issueQuery.data.value es true
    }
  )

  return {
    issueQuery,
    commentsQuery,
  }
}
