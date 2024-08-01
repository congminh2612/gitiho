import { axiosInstance } from '../../../config/axios.config'

export const AddTestDetail = async (accountId) => {
  try {
    const res = await axiosInstance.post(
      `/api/TestDetail/addTestDetail?accountId=${accountId}`
    )
    return res.data
  } catch (e) {
    return e
  }
}
export const AddQuestionTest = async (questionId, testDetailId, answerId) => {
  try {
    const res = await axiosInstance.post(
      `api/QuestionTest/addQuestionTest?questionId=${questionId}&testDetailId=${testDetailId}&answerId=${answerId}`
    )
    return res.data
  } catch (e) {
    return e
  }
}
export const UpdateTestDetailService = async (testDetailId) => {
  try {
    const res = await axiosInstance.put(
      `api/TestDetail/updateTestDetail?testdetailId=${testDetailId}`
    )
    return res.data
  } catch (e) {
    return e
  }
}
export const GetTestDetailByTestDetailId = async (testDetailId) => {
  try {
    const res = await axiosInstance.get(
      `api/TestDetail/getTestDetailByTestDetailId?testdetailId=${testDetailId}`
    )
    return res.data
  } catch (e) {
    return e
  }
}
