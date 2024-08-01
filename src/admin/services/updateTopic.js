import { axiosInstance } from '../../config/axios.config'

export const UpdateTopic = async (data) => {
  try {
    const res = await axiosInstance.post(`/api/Topics/editTopic`, data)
    return res.data
  } catch (error) {
    throw new error()
  }
}
