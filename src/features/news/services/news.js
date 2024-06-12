import { axiosInstance } from '../../../config/axios.config'

export const news = async () => {
  const res = await axiosInstance.get('/api/news/getAllNews')
  return res.data
}
