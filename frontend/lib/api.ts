import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
})

// will automatically attach token if ever available without attaching auth routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")
  if (
    token &&
    !config.url?.includes("/login") &&
    !config.url?.includes("/register")
  ) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api