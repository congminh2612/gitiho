import { axiosInstance } from '../../../config/axios.config'

export const getAllPost = async () => {
  try {
    const res = await axiosInstance.get('/api/post/getAllPost')
    return res.data
  } catch (error) {
    throw new error()
  }
}
