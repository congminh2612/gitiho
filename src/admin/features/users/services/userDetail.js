import { axiosInstance } from '../../../../config/axios.config'

export const user = async (id) => {
  try {
    const res = await axiosInstance.get(
      `/api/account/getModDetail?accountId=${id}`
    )
    return res.data
  } catch (error) {
    throw new error()
  }
}
