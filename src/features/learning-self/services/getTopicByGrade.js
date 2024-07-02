import { Await } from 'react-router-dom'
import { axiosInstance } from '../../../config/axios.config'

export const GetTopicByGrade = async (
  grade,
  subjectId,
  topicType,
  accountId
) => {
  try {
    const res = await axiosInstance.get(
      `api/Topics/getTopicByGrade?grade=${grade}&subjectId=${subjectId}&topicType=${topicType}&accountId=${accountId}`
    )
    return res.data
  } catch (error) {
    throw error
  }
}
