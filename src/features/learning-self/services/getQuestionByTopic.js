import { axiosInstance } from '../../../config/axios.config'

export const GetQuestionByTopic = async (topicId) => {
  try {
    const res = await axiosInstance.get(
      `/api/Question/getQuestionByTopicId?topicId=${topicId}`
    )
    return res.data
  } catch (error) {
    throw new error()
  }
}
