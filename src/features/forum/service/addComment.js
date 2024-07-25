import { axiosInstance } from '../../../config/axios.config'

export const addComment = async (commentData) => {
  try {
    const res = await axiosInstance.post(`api/comment/AddComment`, commentData)
    return res.data
  } catch (error) {
    throw error
  }
}
