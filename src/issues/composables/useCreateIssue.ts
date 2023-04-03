import { useMutation, useQueryClient } from '@tanstack/vue-query'

import { Issue, IssueCreate } from '../models/issue.model'
import { useFetch } from 'src/composable/useFetch'

const apiURL = process.env.GITHUB_URL

const addIssue = async ({ title, description = '', labels = [] }: IssueCreate) => {
  const body = { title, description, labels };

  const { data, error } = await useFetch<Issue>(`${apiURL}/issues`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    },
  });

  if (error.value)
    throw new Error(error.value);
  return data.value;
}

export const useCreateIssue = () => {

  const queryClient = useQueryClient()

  const issueMutation = useMutation(addIssue, {
    onSuccess: (issue) => {
      // Invalida la cache de la query 'issues'
      queryClient.invalidateQueries({
        queryKey: ['issues'],
        exact: false,
      });

      // Refresca la cache de la query 'issues'
      queryClient.refetchQueries(
        ['issues'],
        {
          exact: false,
        }
      );

      // Actualiza la cache de la query 'issue'
      queryClient.setQueryData(
        ['issue', issue?.number],
        issue
      );
    },
  })

  return {
    issueMutation,
  }
}
