import axios from 'axios'
import config from '@/config'

const api = {
  async getPlayerMatch(params = config.defaultParams) {
    try {
      const response = await axios.get(config.apiPath, { params })
      return response.data
    } catch (error) {
      console.error('API请求失败:', error)
      throw error
    }
  }
}

export default api 