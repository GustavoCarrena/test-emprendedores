import { useQuery } from '@tanstack/vue-query'
import optionsService from '@/api/optionsService'

export const useOptions = () => {
  const query = useQuery({
    queryKey: ['options'],
    queryFn: () => optionsService.getOptions(),
  })
  return query
}
