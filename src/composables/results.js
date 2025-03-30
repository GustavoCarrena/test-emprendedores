import { useMutation } from '@tanstack/vue-query'
import resultsService from '../api/resultsService'

export const useResults = () => {
  const { mutateAsync, ...rest } = useMutation({
    mutationKey: ['results'],
    // mutationFn: (payload) => resultsService.results(payload),
    mutationFn: () => resultsService.results(),
  })
  return { fetchResults: mutateAsync, ...rest }
}
