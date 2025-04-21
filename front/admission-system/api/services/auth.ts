import type { LoginRequest, LoginResponse } from "@/types/common"

// 목업 사용자 데이터
const mockUsers = [
  {
    userId: "admin",
    password: "admin123",
    userName: "관리자",
    userRole: "SYSTEM_ADMIN",
  },
  {
    userId: "admission",
    password: "admission123",
    userName: "입학처 담당자",
    userRole: "ADMISSION_OFFICER",
  },
  {
    userId: "counselor",
    password: "counselor123",
    userName: "상담사",
    userRole: "COUNSELOR",
  },
  {
    userId: "student",
    password: "student123",
    userName: "홍길동",
    userRole: "APPLICANT",
  },
]

export const authService = {
  // 로그인 요청
  login: async (loginData: LoginRequest): Promise<LoginResponse> => {
    try {
      // 실제 API 호출 대신 목업 데이터 사용
      // const response = await api.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, loginData)

      // 목업 사용자 확인
      const user = mockUsers.find((u) => u.userId === loginData.userId && u.password === loginData.password)

      if (user) {
        // 로그인 성공
        const response: LoginResponse = {
          success: true,
          token: "mock-jwt-token-" + Math.random().toString(36).substring(2),
          userName: user.userName,
          userRole: user.userRole as any,
          initialUrl: "/",
        }

        // 토큰 저장
        localStorage.setItem("token", response.token)
        // 사용자 정보 저장
        localStorage.setItem(
          "user",
          JSON.stringify({
            userId: loginData.userId,
            userName: response.userName,
            userRole: response.userRole,
          }),
        )

        return response
      } else {
        // 로그인 실패
        return {
          success: false,
          errorCode: "INVALID_CREDENTIALS",
          errorMessage: "아이디 또는 비밀번호가 일치하지 않습니다.",
        }
      }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        errorCode: "NETWORK_ERROR",
        errorMessage: "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.",
      }
    }
  },

  // 로그아웃
  logout: () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.href = "/"
  },

  // 현재 로그인한 사용자 정보 가져오기
  getCurrentUser: () => {
    const userStr = localStorage.getItem("user")
    if (!userStr) return null

    try {
      return JSON.parse(userStr)
    } catch (e) {
      console.error("Error parsing user data:", e)
      return null
    }
  },
}
