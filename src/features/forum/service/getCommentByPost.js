import { axiosInstance } from '../../../config/axios.config'

export const getCommentByPost = async (postId) => {
  try {
    const res = await axiosInstance.get(
      `/api/comment/getCommentByPost?postId=${postId}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}
