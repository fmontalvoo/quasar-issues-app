import { useMutation } from '@tanstack/vue-query'

import { Issue, IssueCreate } from '../models/issue.model'
import { useFetch } from 'src/composable/useFetch'

const apiURL = process.env.GITHUB_URL

const addIssue = async ({ title, description = '', labels = [] }: IssueCreate) => {
  const body = { title, description, labels }
  const { data, error } = await useFetch<Issue>(`${apiURL}/issues`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    },
  })
  if (error.value)
    throw new Error(error.value)
  return data.value
}

export const useCreateIssue = () => {

  const issueMutation = useMutation(addIssue)

  return {
    issueMutation,
  }
}
