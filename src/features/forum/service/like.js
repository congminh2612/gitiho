import { axiosInstance } from '../../../config/axios.config'

export const like = async (postId, accountId) => {
  try {
    const res = await axiosInstance.post(
      `api/post/likePost?postId=${postId}&accountId=${accountId}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}
