// 사용자 관련 타입
export interface User {
  userId: string
  userName: string
  userRole: UserRole
}

export type UserRole =
  | "APPLICANT" // 수험생
  | "ADMISSION_OFFICER" // 입학처 담당자
  | "EVALUATOR" // 평가위원
  | "COUNSELOR" // 상담사
  | "FINANCE_OFFICER" // 재무 담당자
  | "SYSTEM_ADMIN" // 시스템 관리자

export interface LoginRequest {
  userId: string
  password: string
  loginType?: string
}

export interface LoginResponse {
  success: boolean
  token?: string
  userName?: string
  userRole?: UserRole
  initialUrl?: string
  errorCode?: string
  errorMessage?: string
}

// 수험생 관련 타입
export interface Applicant {
  applicantId: string
  name: string
  birthDate: string
  gender: string
  phoneNumber: string
  email: string
  address: string
  createdAt: string
  uniqueId: string
}

export interface Application {
  applicationId: number
  applicantId: string
  admissionRound: string
  admissionType: string
  departmentCode: string
  appliedAt: string
  status: string
}

export interface ApplicantSearchResult {
  applicantId: string
  name: string
  birthDate: string
  examNumber?: string
}

export interface ApplicantDetail {
  basicInfo: Applicant
  applicationHistory: ApplicationSummary[]
  evaluationSummary?: Record<string, any>
  recruitmentLogs?: RecruitmentLog[]
  counselingLogs?: CounselingLog[]
}

export interface ApplicationSummary {
  applicationId: number
  round: string
  type: string
  dept: string
  status: string
  examNumber?: string
  score?: number
  rank?: number
}

export interface RecruitmentLog {
  logId: number
  applicationId: number
  recruitmentRound: number
  callStartedAt: string
  callEndedAt: string
  result: string
  memo: string
  recordingFilePath: string
  counselorId: string
}

export interface CounselingLog {
  counselingLogId: number
  applicantName: string
  applicantContact: string
  applicantScores: string
  counselingContent: string
  counselorId: string
  counseledAt: string
}

// 공통 코드 관련 타입
export interface CodeGroup {
  groupCode: string
  groupName: string
  description?: string
  isActive: boolean
}

export interface CodeDetail {
  groupCode: string
  code: string
  codeName: string
  sortOrder: number
  isActive: boolean
}
