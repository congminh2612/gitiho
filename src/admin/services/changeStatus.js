import { axiosInstance } from '../../config/axios.config'

export const ChangeStatusUser = async (accountId, status) => {
  try {
    const result = await axiosInstance.post(
      `api/user/ChangeStatusUser?accountId=${accountId}&newStatus=${status}`
    )
    return result.data
  } catch (error) {
    throw error
  }
}

export const ChangeStatusTopic = async (topicId, status) => {
  try {
    const result = await axiosInstance.post(
      `api/Topics/changeStatusTopic?topicId=${topicId}&status=${status}`
    )
    return result.data
  } catch (error) {
    throw error
  }
}

export const ChangeStatusPost = async (postId, status) => {
  try {
    const result = await axiosInstance.post(
      `api/post/ChangeStatusPost?postId=${postId}&status=${status}`
    )
    return result.data
  } catch (error) {
    throw error
  }
}
