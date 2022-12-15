import { createFetch } from '@vueuse/core'

export const useMyFetch = createFetch({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  fetchOptions: {
    mode: 'cors',
  },
})
