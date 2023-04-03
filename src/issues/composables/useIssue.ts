import { useQuery, useQueryClient } from '@tanstack/vue-query'

import { Comment, Issue } from '../models/issue.model'
import { useFetch } from 'src/composable/useFetch'

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

interface Options {
  enabled?: boolean;
}

export const useIssue = (issueId: number, options?: Options) => {
  const queryClient = useQueryClient()

  const { enabled = true } = options || {}

  const issueQuery = useQuery(
    ['issue', issueId],
    () => getIssue(issueId),
    {
      enabled,
      staleTime: 1000 * 60 * 60,
    }
  )

  const commentsQuery = useQuery(
    ['issue', issueId, 'comments'],
    () => getIssueComments(issueId),
    // () => getIssueComments(issueQuery.data.value?.number || 0),
    {
      enabled,
      staleTime: 1000 * 60,
      // enabled: computed(() => !!issueQuery.data.value) // Realiza la peticion si el valor de issueQuery.data.value es true
    }
  )

  const prefetchIssue = (issueNumber: number) => {
    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      {
        staleTime: 1000 * 60 * 60,
      }
    )

    queryClient.prefetchQuery(
      ['issue', issueId, 'comments'],
      () => getIssueComments(issueId),
      {
        staleTime: 1000 * 60,
      }
    )
  }

  const setIssueCacheData = (issue: Issue) => {
    queryClient.setQueryData(['issue', issue.id], issue)
  }

  return {
    issueQuery,
    commentsQuery,
    prefetchIssue,
    setIssueCacheData,
  }
}
