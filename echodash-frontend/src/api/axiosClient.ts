import axios from "axios"
const API_BASE_URL = import.meta.env.API_BASE_URL as string
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosClient
