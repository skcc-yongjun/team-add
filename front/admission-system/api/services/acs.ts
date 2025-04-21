import type {
  AdmissionGuideline,
  Department,
  CounselingRequest,
  ScoreAnalysisResult,
  Content,
  Post,
  CounselingStatistics,
} from "@/types/acs"
import {
  mockGuidelines,
  mockDepartments,
  mockScoreAnalysisResult,
  mockContents,
  mockPosts,
  mockStatistics,
} from "../mockData/acs"

export const acsService = {
  // 모집 요강 조회
  getGuidelines: async (admissionRound?: string, admissionType?: string): Promise<AdmissionGuideline[]> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.ACS.GUIDELINES, {
      //   params: { admissionRound, admissionType },
      // })
      // return response.data

      // 필터링된 목업 데이터 반환
      let filteredGuidelines = [...mockGuidelines]

      if (admissionRound) {
        filteredGuidelines = filteredGuidelines.filter((g) => g.admissionRound === admissionRound)
      }

      if (admissionType) {
        filteredGuidelines = filteredGuidelines.filter((g) => g.admissionType === admissionType)
      }

      return filteredGuidelines
    } catch (error) {
      console.error("Guidelines fetch error:", error)
      throw error
    }
  },

  // 학과 정보 조회
  getDepartments: async (searchKeyword?: string): Promise<Department[]> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.ACS.DEPARTMENTS, {
      //   params: { keyword: searchKeyword },
      // })
      // return response.data

      // 검색어로 필터링된 목업 데이터 반환
      if (searchKeyword) {
        return mockDepartments.filter(
          (dept) => dept.departmentName.includes(searchKeyword) || dept.college.includes(searchKeyword),
        )
      }

      return mockDepartments
    } catch (error) {
      console.error("Departments fetch error:", error)
      throw error
    }
  },

  // 학과 상세 정보 조회
  getDepartmentDetail: async (departmentCode: string): Promise<Department> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.ACS.DEPARTMENT_DETAIL(departmentCode))
      // return response.data

      // 학과 코드로 필터링된 목업 데이터 반환
      const department = mockDepartments.find((dept) => dept.departmentCode === departmentCode)

      if (!department) {
        throw new Error("Department not found")
      }

      return department
    } catch (error) {
      console.error("Department detail fetch error:", error)
      throw error
    }
  },

  // 상담 기록 저장
  saveCounselingLog: async (counselingData: CounselingRequest): Promise<{ success: boolean; message: string }> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.post(API_ENDPOINTS.ACS.COUNSELING_LOG, counselingData)
      // return response.data

      // 목업 성공 응답 반환
      console.log("Counseling data saved:", counselingData)
      return {
        success: true,
        message: "상담 내용이 저장되었습니다.",
      }
    } catch (error) {
      console.error("Counseling log save error:", error)
      throw error
    }
  },

  // 성적 분석
  analyzeScores: async (scores: CounselingRequest["applicantScores"]): Promise<ScoreAnalysisResult> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.post(API_ENDPOINTS.ACS.SCORE_ANALYSIS, { scores })
      // return response.data

      // 목업 분석 결과 반환
      console.log("Analyzing scores:", scores)
      return mockScoreAnalysisResult
    } catch (error) {
      console.error("Score analysis error:", error)
      throw error
    }
  },

  // 콘텐츠 목록 조회 (관리자)
  getContents: async (contentType: string): Promise<Content[]> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.ACS.ADMIN.CONTENTS, {
      //   params: { type: contentType },
      // })
      // return response.data

      // 콘텐츠 유형으로 필터링된 목업 데이터 반환
      return mockContents.filter((content) => content.contentType === contentType)
    } catch (error) {
      console.error("Contents fetch error:", error)
      throw error
    }
  },

  // 콘텐츠 상세 조회 (관리자)
  getContentDetail: async (contentId: number): Promise<Content> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.ACS.ADMIN.CONTENT_DETAIL(contentId))
      // return response.data

      // 콘텐츠 ID로 필터링된 목업 데이터 반환
      const content = mockContents.find((c) => c.contentId === contentId)

      if (!content) {
        throw new Error("Content not found")
      }

      return content
    } catch (error) {
      console.error("Content detail fetch error:", error)
      throw error
    }
  },

  // 콘텐츠 생성 (관리자)
  createContent: async (content: Partial<Content>): Promise<Content> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.post(API_ENDPOINTS.ACS.ADMIN.CONTENTS, content)
      // return response.data

      // 목업 성공 응답 반환
      console.log("Content created:", content)
      return {
        contentId: Math.floor(Math.random() * 1000) + 10, // 임의의 ID 생성
        contentType: content.contentType || "GUIDELINE",
        title: content.title || "",
        content: content.content || "",
        targetId: content.targetId,
        isPublished: content.isPublished || false,
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "admin",
      }
    } catch (error) {
      console.error("Content create error:", error)
      throw error
    }
  },

  // 콘텐츠 수정 (관리자)
  updateContent: async (contentId: number, content: Partial<Content>): Promise<Content> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.put(API_ENDPOINTS.ACS.ADMIN.CONTENT_DETAIL(contentId), content)
      // return response.data

      // 목업 성공 응답 반환
      console.log("Content updated:", contentId, content)
      return {
        contentId,
        contentType: content.contentType || "GUIDELINE",
        title: content.title || "",
        content: content.content || "",
        targetId: content.targetId,
        isPublished: content.isPublished || false,
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: "admin",
      }
    } catch (error) {
      console.error("Content update error:", error)
      throw error
    }
  },

  // 콘텐츠 삭제 (관리자)
  deleteContent: async (contentId: number): Promise<{ success: boolean; message: string }> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.delete(API_ENDPOINTS.ACS.ADMIN.CONTENT_DETAIL(contentId))
      // return response.data

      // 목업 성공 응답 반환
      console.log("Content deleted:", contentId)
      return {
        success: true,
        message: "콘텐츠가 삭제되었습니다.",
      }
    } catch (error) {
      console.error("Content delete error:", error)
      throw error
    }
  },

  // 게시판 글 목록 조회
  getPosts: async (boardType: string): Promise<Post[]> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.ACS.ADMIN.POSTS(boardType))
      // return response.data

      // 게시판 유형으로 필터링된 목업 데이터 반환
      return mockPosts[boardType] || []
    } catch (error) {
      console.error("Posts fetch error:", error)
      throw error
    }
  },

  // 게시판 글 상세 조회
  getPostDetail: async (boardType: string, postId: number): Promise<Post> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.ACS.ADMIN.POST_DETAIL(boardType, postId))
      // return response.data

      // 게시판 유형과 글 ID로 필터링된 목업 데이터 반환
      const posts = mockPosts[boardType] || []
      const post = posts.find((p) => p.postId === postId)

      if (!post) {
        throw new Error("Post not found")
      }

      return post
    } catch (error) {
      console.error("Post detail fetch error:", error)
      throw error
    }
  },

  // 게시판 글 생성
  createPost: async (boardType: string, post: Partial<Post>): Promise<Post> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.post(API_ENDPOINTS.ACS.ADMIN.POSTS(boardType), post)
      // return response.data

      // 목업 성공 응답 반환
      console.log("Post created:", boardType, post)
      return {
        postId: Math.floor(Math.random() * 1000) + 10, // 임의의 ID 생성
        boardType: boardType as "NOTICE" | "QNA" | "FAQ",
        title: post.title || "",
        content: post.content || "",
        author: "관리자",
        authorRole: "ADMISSION_OFFICER",
        viewCount: 0,
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Post create error:", error)
      throw error
    }
  },

  // 게시판 글 수정
  updatePost: async (boardType: string, postId: number, post: Partial<Post>): Promise<Post> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.put(API_ENDPOINTS.ACS.ADMIN.POST_DETAIL(boardType, postId), post)
      // return response.data

      // 목업 성공 응답 반환
      console.log("Post updated:", boardType, postId, post)
      return {
        postId,
        boardType: boardType as "NOTICE" | "QNA" | "FAQ",
        title: post.title || "",
        content: post.content || "",
        author: "관리자",
        authorRole: "ADMISSION_OFFICER",
        viewCount: 0,
        attachments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    } catch (error) {
      console.error("Post update error:", error)
      throw error
    }
  },

  // 게시판 글 삭제
  deletePost: async (boardType: string, postId: number): Promise<{ success: boolean; message: string }> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.delete(API_ENDPOINTS.ACS.ADMIN.POST_DETAIL(boardType, postId))
      // return response.data

      // 목업 성공 응답 반환
      console.log("Post deleted:", boardType, postId)
      return {
        success: true,
        message: "게시글이 삭제되었습니다.",
      }
    } catch (error) {
      console.error("Post delete error:", error)
      throw error
    }
  },

  // Q&A 답변 등록/수정
  saveAnswer: async (postId: number, answer: string): Promise<{ success: boolean; message: string }> => {
    try {
      // 실제 API 호출 대신 성공 응답 반환
      // const response = await api.post(API_ENDPOINTS.ACS.ADMIN.POST_ANSWER(postId), { answer })
      // return response.data

      // 목업 성공 응답 반환
      console.log("Answer saved:", postId, answer)
      return {
        success: true,
        message: "답변이 등록되었습니다.",
      }
    } catch (error) {
      console.error("Answer save error:", error)
      throw error
    }
  },

  // 상담 통계 조회
  getCounselingStatistics: async (
    statisticType: string,
    startDate: string,
    endDate: string,
  ): Promise<CounselingStatistics> => {
    try {
      // 실제 API 호출 대신 목업 데이터 반환
      // const response = await api.get(API_ENDPOINTS.ACS.STATISTICS(statisticType), {
      //   params: { startDate, endDate },
      // })
      // return response.data

      // 목업 통계 데이터 반환
      console.log("Statistics requested:", statisticType, startDate, endDate)

      // 기간 정보 업데이트
      const statistics = { ...mockStatistics }
      statistics.period = {
        startDate,
        endDate,
      }

      return statistics
    } catch (error) {
      console.error("Statistics fetch error:", error)
      throw error
    }
  },

  // 통계 보고서 다운로드
  downloadStatisticsReport: async (reportType: string, startDate: string, endDate: string): Promise<Blob> => {
    try {
      // 실제 API 호출 대신 빈 Blob 반환
      // const response = await api.get(API_ENDPOINTS.ACS.STATISTICS_REPORT(reportType), {
      //   params: { startDate, endDate },
      //   responseType: "blob",
      // })
      // return response.data

      // 목업 Blob 반환
      console.log("Report download requested:", reportType, startDate, endDate)
      return new Blob(["Mock report data"], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      })
    } catch (error) {
      console.error("Report download error:", error)
      throw error
    }
  },
}
