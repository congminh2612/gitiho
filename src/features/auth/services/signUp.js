import { axiosInstance } from '../../../config/axios.config'

export const signUp = async (signUpData) => {
  try {
    const res = await axiosInstance.post('/api/home/register', signUpData)
    return res.data
  } catch (error) {
    throw new Error(error.response.data)
  }
}
