import { axiosInstance } from '../../../config/axios.config'

export const getAllPhone = async () => {
  try {
    const res = await axiosInstance.get('/api/home/getAllPhone')
    return res.data
  } catch (error) {
    throw new error()
  }
}
