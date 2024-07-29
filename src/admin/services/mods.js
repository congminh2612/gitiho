import { axiosInstance } from '../../config/axios.config'

export const mods = async () => {
  try {
    const res = await axiosInstance.get('/api/account/getAllMod')
    return res.data
  } catch (error) {
    throw new error()
  }
}
