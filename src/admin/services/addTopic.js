import { axiosInstance } from '../../config/axios.config'

export const AddTopic = async (data) => {
  try {
    const res = axiosInstance.post(`api/Topics/addTopic`, data)
    return res.data
  } catch (e) {
    return e
  }
}
