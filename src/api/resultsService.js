// import { api } from './index'
import { responsesMock } from '@/constants/response/responses'

const resultsService = {
  results: async (payload) => {
    // const { data } = await api.post('/registro/new', payload)
    // Payload es el array de preguntas_id
    const { data } = responsesMock
    return data
  },
}

export default resultsService
