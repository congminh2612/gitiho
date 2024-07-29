import { axiosInstance } from '../../config/axios.config'

export const updateUser = async (user) => {
  try {
    const res = await axiosInstance.post(`/api/account/upDateAccountUser`, user)
    return res.data
  } catch (error) {
    throw new Error()
  }
}
