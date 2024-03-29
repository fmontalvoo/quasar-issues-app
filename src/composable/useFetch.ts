import { ref } from 'vue';

export const useFetch = async<T>(url: string, requestOptions?: RequestInit) => {
  const data = ref<T>()
  const error = ref()

  const fetchData = (): Promise<T> =>
    fetch(url, requestOptions)
      .then(res => res.ok ? res.json() : Promise.reject(res.status))
      .then(json => (data.value = json))
      .catch(err => (error.value = err))

  const refetch = async () => await fetchData()

  await fetchData()

  return { data, error, refetch }

}
