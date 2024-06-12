import { axiosInstance } from '../../../config/axios.config'

export const signIn = async (userData) => {
  try {
    const res = await axiosInstance.post('/api/home/login', userData)
    return res.data
  } catch (error) {
    throw new Error(error.response.data)
  }
}
