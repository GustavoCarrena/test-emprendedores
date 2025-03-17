import { useQuery } from '@tanstack/vue-query'
import optionsService from '@/api/questionsService'

export const useQuestions = () => {
  const query = useQuery({
    queryKey: ['options'],
    queryFn: () => optionsService.getOptions(),
  })
  return query
}
