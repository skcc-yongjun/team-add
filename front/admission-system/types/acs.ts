// 모집 요강 관련 타입
export interface AdmissionGuideline {
  guidelineId: number
  admissionRound: string
  admissionType: string
  title: string
  content: string
  attachments?: Attachment[]
  lastUpdated: string
}

// 학과 정보 관련 타입
export interface Department {
  departmentCode: string
  departmentName: string
  college: string
  introduction: string
  curriculum: string
  career: string
  admissionResults?: AdmissionResult[]
  attachments?: Attachment[]
  lastUpdated: string
}

// 첨부 파일 타입
export interface Attachment {
  attachmentId: number
  fileName: string
  fileSize: number
  fileType: string
  fileUrl: string
  uploadedAt: string
}

// 입시 결과 타입
export interface AdmissionResult {
  year: string
  admissionRound: string
  admissionType: string
  applicants: number
  acceptedCount: number
  competitionRate: number
  minScore?: number
  avgScore?: number
}

// 상담 관련 타입
export interface CounselingRequest {
  counselorId?: string
  applicantName: string
  applicantContact: string
  applicantScores: {
    gpa?: Record<string, number>
    csat?: Record<string, number>
    nonAcademic?: string
  }
  counselingContent?: string
}

export interface CounselingLog extends CounselingRequest {
  counselingLogId: number
  counseledAt: string
}

// 성적 분석 결과 타입
export interface ScoreAnalysisResult {
  estimatedScores: {
    admissionType: string
    score: number | null
  }[]
  recommendations: {
    departmentName: string
    departmentCode: string
    admissionType: string
    likelihood: "안정" | "소신" | "불안"
  }[]
  advice: string
}

// 콘텐츠 관리 관련 타입
export interface Content {
  contentId: number
  contentType: "GUIDELINE" | "DEPARTMENT" | "FAQ" | "MATERIAL"
  title: string
  content: string
  targetId?: string // 모집 요강 ID, 학과 코드 등
  isPublished: boolean
  attachments?: Attachment[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

// 게시판 관련 타입
export interface Post {
  postId: number
  boardType: "NOTICE" | "QNA" | "FAQ"
  title: string
  content: string
  author: string
  authorRole: string
  viewCount: number
  isAnswered?: boolean
  answer?: string
  attachments?: Attachment[]
  createdAt: string
  updatedAt: string
}

// 통계 관련 타입
export interface CounselingStatistics {
  period: {
    startDate: string
    endDate: string
  }
  totalCount: number
  byType: {
    type: string
    count: number
    percentage: number
  }[]
  byDate: {
    date: string
    count: number
  }[]
  byCounselor?: {
    counselorId: string
    counselorName: string
    count: number
  }[]
  keywords?: {
    keyword: string
    count: number
  }[]
}
