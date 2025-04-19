// import { api } from './index'
import { loginOptions } from '@/constants/login/options.js'

const options = {
  getOptions: async () => {
    // const { data } = await api.get('/api/registro/opciones')
    const { data } = loginOptions
    return data
  },
}

export default options
