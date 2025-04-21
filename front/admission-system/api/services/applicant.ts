import type { ApplicantSearchResult, ApplicantDetail } from "@/types/common"
import { mockApplicantSearchResults, mockApplicantDetails } from "../mockData/common"

export const applicantService = {
  // 수험생 검색
  searchApplicants: async (keywordType: string, keyword: string): Promise<ApplicantSearchResult[]> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.APPLICANT.SEARCH, {
      //   params: { keywordType, keyword },
      // })
      // return response.data

      // 검색어로 필터링된 목업 데이터 반환
      if (!keyword) return []

      return mockApplicantSearchResults.filter((applicant) => {
        if (keywordType === "examNumber" && applicant.examNumber) {
          return applicant.examNumber.includes(keyword)
        } else if (keywordType === "name") {
          return applicant.name.includes(keyword)
        } else if (keywordType === "birthDate") {
          return applicant.birthDate.includes(keyword)
        }
        return false
      })
    } catch (error) {
      console.error("Applicant search error:", error)
      throw error
    }
  },

  // 수험생 상세 정보 조회
  getApplicantDetails: async (applicantId: string): Promise<ApplicantDetail> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.APPLICANT.DETAILS(applicantId))
      // return response.data

      // 수험생 ID로 필터링된 목업 데이터 반환
      const applicantDetail = mockApplicantDetails[applicantId]

      if (!applicantDetail) {
        throw new Error("Applicant not found")
      }

      return applicantDetail
    } catch (error) {
      console.error("Applicant details error:", error)
      throw error
    }
  },
}
