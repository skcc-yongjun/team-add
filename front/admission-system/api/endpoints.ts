// API 엔드포인트 정의 (기존 파일에 추가)
export const API_ENDPOINTS = {
  // 기존 엔드포인트...

  // ACS 관련 엔드포인트
  ACS: {
    // 상담 관련
    GUIDELINES: "/api/acs/guidelines",
    DEPARTMENTS: "/api/acs/departments",
    DEPARTMENT_DETAIL: (departmentCode: string) => `/api/acs/departments/${departmentCode}`,
    COUNSELING_LOG: "/api/acs/counseling/log",
    SCORE_ANALYSIS: "/api/acs/counseling/simulation",

    // 게시판 관련 (사용자용)
    BOARDS: (boardType: string) => `/api/acs/boards/${boardType}`,
    BOARD_DETAIL: (boardType: string, postId: number) => `/api/acs/boards/${boardType}/posts/${postId}`,

    // 관리자 기능
    ADMIN: {
      CONTENTS: "/api/acs/admin/contents",
      CONTENT_DETAIL: (contentId: number) => `/api/acs/admin/contents/${contentId}`,
      POSTS: (boardType: string) => `/api/acs/admin/boards/${boardType}/posts`,
      POST_DETAIL: (boardType: string, postId: number) => `/api/acs/admin/boards/${boardType}/posts/${postId}`,
      POST_ANSWER: (postId: number) => `/api/acs/admin/boards/qna/posts/${postId}/answer`,
      FILES: "/api/acs/admin/files",
    },

    // 통계 관련
    STATISTICS: (statisticType: string) => `/api/acs/statistics/${statisticType}`,
    STATISTICS_REPORT: (reportType: string) => `/api/acs/statistics/reports/${reportType}/download`,
  },
}
