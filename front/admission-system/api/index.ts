import axios from "axios"

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// 요청 인터셉터 - 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 응답 인터셉터 - 에러 처리 및 토큰 만료 처리
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰 만료 또는 인증 오류
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export default api
