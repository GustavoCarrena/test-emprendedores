// import { api } from './index'
import { questionsMock } from '@/constants/questions/questionsMock.js'

const questions = {
  getQuestions: async () => {
    // const { data } = await api.get('/test')
    const { data } = questionsMock
    return data
  },
}

export default questions
