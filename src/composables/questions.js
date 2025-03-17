import { useQuery } from '@tanstack/vue-query'
import questionsService from '@/api/questionsService'

export const useQuestions = () => {
  const query = useQuery({
    queryKey: ['questions'],
    queryFn: () => questionsService.getQuestions(),
    enabled: true,
  })
  return query
}
