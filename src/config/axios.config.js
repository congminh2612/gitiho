import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7207/',
  headers: {
    'Content-Type': 'application/json'
  }
})
