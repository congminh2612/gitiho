import { axiosInstance } from '../../config/axios.config'

export const GetAllNewsCategory = async () => {
  try {
    const res = await axiosInstance.get(`api/news/getAllNewsCategory`)
    return res.data
  } catch (e) {
    return e
  }
}

export const AddNews = async (data) => {
  try {
    const res = await axiosInstance.post(`api/news/addnews`, data)
    return res.data
  } catch (e) {
    return e
  }
}

export const EditNewsService = async (data) => {
  try {
    const res = await axiosInstance.post(`api/news/editNews`, data)
    return res.data
  } catch (e) {
    return e
  }
}
