import { axiosInstance } from '../../../config/axios.config'

export const news = async () => {
  const res = await axiosInstance.get(
    'https://localhost:7207/api/news/getAllNews'
  )
  return res.data
}
