import { axiosInstance } from '../../../config/axios.config'
export const getSubject = async () => {
  try {
    const res = await axiosInstance.get('/api/Subject/getAllSubject')
    return res.data
  } catch (error) {
    throw error
  }
}
