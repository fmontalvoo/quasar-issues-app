import { useMutation } from '@tanstack/vue-query'

import { useFetch } from 'src/composable/useFetch'

const addIssue = async () => {

}

export const useCreateIssue = () => {

  const issueMutation = useMutation(addIssue)

  return {
    issueMutation,
  }
}
