import { axiosInstance } from '../../../config/axios.config'

export const newDetail = async (id) => {
  const res = await axiosInstance.get(`/api/news/displayNewDetail?newsId=${id}`)
  return res.data
}
