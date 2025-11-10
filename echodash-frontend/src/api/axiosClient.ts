import axios from "axios"

const axiosClient = axios.create({
  baseURL: "https://echodash-backend.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosClient
