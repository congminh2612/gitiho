import { axiosInstance } from '../../../config/axios.config'

export const getPostByStatus = async (status, accountId) => {
  try {
    const res = await axiosInstance.get(
      `/api/post/getPostByStatus?status=${status}&accountId=${accountId}`
    )
    return res.data
  } catch (error) {
    throw new Error(error)
  }
}
