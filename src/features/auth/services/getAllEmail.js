import { axiosInstance } from '../../../config/axios.config'

export const getAllEmail = async () => {
  try {
    const res = await axiosInstance.get('/api/superAdmin/getAllEmail')
    return res.data
  } catch (error) {
    throw new error()
  }
}
