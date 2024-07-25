import { axiosInstance } from '../../../config/axios.config'

export const unlike = async (postId, accountId) => {
  try {
    const res = await axiosInstance.delete(
      `api/post/UnlikePost?postId=${postId}&accountId=${accountId}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}
