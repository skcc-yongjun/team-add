import type { CodeGroup, CodeDetail } from "@/types/common"
import { mockCodeGroups, mockCodeDetails } from "../mockData/common"

export const codeService = {
  // 코드 그룹 목록 조회
  getCodeGroups: async (): Promise<CodeGroup[]> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.CODE.GROUPS)
      // return response.data

      return mockCodeGroups
    } catch (error) {
      console.error("Code groups fetch error:", error)
      throw error
    }
  },

  // 코드 그룹 추가
  addCodeGroup: async (codeGroup: CodeGroup): Promise<CodeGroup> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.post(API_ENDPOINTS.CODE.GROUPS, codeGroup)
      // return response.data

      console.log("Code group added:", codeGroup)
      return codeGroup
    } catch (error) {
      console.error("Code group add error:", error)
      throw error
    }
  },

  // 코드 그룹 수정
  updateCodeGroup: async (groupCode: string, codeGroup: Partial<CodeGroup>): Promise<CodeGroup> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.put(API_ENDPOINTS.CODE.GROUP_DETAIL(groupCode), codeGroup)
      // return response.data

      console.log("Code group updated:", groupCode, codeGroup)
      return {
        groupCode,
        groupName: codeGroup.groupName || "",
        description: codeGroup.description,
        isActive: codeGroup.isActive !== undefined ? codeGroup.isActive : true,
      }
    } catch (error) {
      console.error("Code group update error:", error)
      throw error
    }
  },

  // 코드 그룹 삭제
  deleteCodeGroup: async (groupCode: string): Promise<void> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // await api.delete(API_ENDPOINTS.CODE.GROUP_DETAIL(groupCode))

      console.log("Code group deleted:", groupCode)
    } catch (error) {
      console.error("Code group delete error:", error)
      throw error
    }
  },

  // 상세 코드 목록 조회
  getCodeDetails: async (groupCode: string): Promise<CodeDetail[]> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.CODE.CODES(groupCode))
      // return response.data

      return mockCodeDetails[groupCode] || []
    } catch (error) {
      console.error("Code details fetch error:", error)
      throw error
    }
  },

  // 상세 코드 추가
  addCodeDetail: async (groupCode: string, codeDetail: CodeDetail): Promise<CodeDetail> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.post(API_ENDPOINTS.CODE.CODES(groupCode), codeDetail)
      // return response.data

      console.log("Code detail added:", groupCode, codeDetail)
      return codeDetail
    } catch (error) {
      console.error("Code detail add error:", error)
      throw error
    }
  },

  // 상세 코드 수정
  updateCodeDetail: async (groupCode: string, code: string, codeDetail: Partial<CodeDetail>): Promise<CodeDetail> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.put(API_ENDPOINTS.CODE.CODE_DETAIL(groupCode, code), codeDetail)
      // return response.data

      console.log("Code detail updated:", groupCode, code, codeDetail)
      return {
        groupCode,
        code,
        codeName: codeDetail.codeName || "",
        sortOrder: codeDetail.sortOrder || 0,
        isActive: codeDetail.isActive !== undefined ? codeDetail.isActive : true,
      }
    } catch (error) {
      console.error("Code detail update error:", error)
      throw error
    }
  },

  // 상세 코드 삭제
  deleteCodeDetail: async (groupCode: string, code: string): Promise<void> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // await api.delete(API_ENDPOINTS.CODE.CODE_DETAIL(groupCode, code))

      console.log("Code detail deleted:", groupCode, code)
    } catch (error) {
      console.error("Code detail delete error:", error)
      throw error
    }
  },
}
