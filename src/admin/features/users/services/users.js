import { axiosInstance } from '../../../../config/axios.config'

export const users = async () => {
  try {
    const res = await axiosInstance.get('/api/account/getAllAccountUser')
    return res.data
  } catch (error) {
    throw new error()
  }
}
