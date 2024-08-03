import { axiosInstance } from '../../../config/axios.config'

export const GetInforByEmailService = async (email) => {
  try {
    const res = await axiosInstance.get(`api/home/search?email=${email}`)
    return res.data
  } catch (e) {
    return e
  }
}
export const GetPhoneWithoutThisPhonedService = async (phone) => {
  try {
    const res = await axiosInstance.get(
      `api/user/getPhoneWithoutThisPhone?phone=${phone}`
    )
    return res.data
  } catch (e) {
    return e
  }
}

export const ChangePassowrdService = async (accountId, newPassword) => {
  try {
    const res = await axiosInstance.post(
      `api/user/changePassword?accountId=${accountId}&newPassword=${newPassword}`
    )
    return res.data
  } catch (e) {
    return e
  }
}

export const UpdateUserService = async (data) => {
  try {
    const res = await axiosInstance.post(`api/user/updateUser`, data)
    return res.data
  } catch (e) {
    return e
  }
}
