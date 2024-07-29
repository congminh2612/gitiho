import { axiosInstance } from '../../config/axios.config'

export const Topics = async () => {
  try {
    const res = await axiosInstance.get('/api/Topics/getAllTopic')
    return res.data
  } catch (error) {
    throw new error()
  }
}
