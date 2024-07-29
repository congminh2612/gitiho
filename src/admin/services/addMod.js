import { axiosInstance } from '../../config/axios.config'

export const addMods = async (mod) => {
  try {
    const res = await axiosInstance.post(`/api/account/addMod`, mod)
    return res.data
  } catch (error) {
    throw new error()
  }
}
