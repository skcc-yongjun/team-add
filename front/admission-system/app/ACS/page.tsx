"use client"

import type React from "react"

// 화면ID: ACS-SCR-001

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScoreInputForm } from "@/components/acs/score-input-form"
import { ScoreVisualization } from "@/components/acs/score-visualization"
import { acsService } from "@/api/services/acs"
import { authService } from "@/api/services/auth"
import type { AdmissionGuideline, Department, CounselingRequest, ScoreAnalysisResult } from "@/types/acs"
import type { User } from "@/types/common"

export default function ACSCounselingPage() {
  // 사용자 정보
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isUserCounselor, setIsUserCounselor] = useState(false)

  // 모집 요강 및 학과 정보 상태
  const [admissionRounds, setAdmissionRounds] = useState<string[]>([])
  const [admissionTypes, setAdmissionTypes] = useState<string[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [selectedRound, setSelectedRound] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null)
  const [departmentSearch, setDepartmentSearch] = useState<string>("")
  const [guideline, setGuideline] = useState<AdmissionGuideline | null>(null)

  // 상담 정보 상태
  const [counselingData, setCounselingData] = useState<CounselingRequest>({
    applicantName: "",
    applicantContact: "",
    applicantScores: {},
    counselingContent: "",
  })
  const [scores, setScores] = useState<CounselingRequest["applicantScores"]>({})
  const [analysisResult, setAnalysisResult] = useState<ScoreAnalysisResult | null>(null)

  // 로딩 및 에러 상태
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 사용자 정보 로드
  useEffect(() => {
    const user = authService.getCurrentUser()
    setCurrentUser(user)
    setIsUserCounselor(user?.userRole === "COUNSELOR" || user?.userRole === "ADMISSION_OFFICER")

    // 수험생인 경우 자동으로 정보 채우기
    if (user?.userRole === "APPLICANT") {
      setCounselingData((prev) => ({
        ...prev,
        applicantName: user.userName,
        // 연락처는 별도 API 호출 필요할 수 있음
      }))
    }
  }, [])

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        // 모집 시기 목록 로드 (실제로는 API 호출)
        setAdmissionRounds(["2024학년도 수시", "2024학년도 정시", "2023학년도 수시", "2023학년도 정시"])

        // 학과 목록 로드
        const deptData = await acsService.getDepartments()
        setDepartments(deptData)
      } catch (err) {
        console.error("Initial data load error:", err)
        setError("초기 데이터를 불러오는 중 오류가 발생했습니다.")
      }
    }

    loadInitialData()
  }, [])

  // 모집 시기 선택 시 전형 유형 로드
  useEffect(() => {
    if (!selectedRound) return

    // 실제로는 API 호출하여 해당 모집 시기의 전형 유형 목록을 가져옴
    setAdmissionTypes(["학생부교과", "학생부종합", "논술", "실기/실적"])
  }, [selectedRound])

  // 모집 요강 조회
  const handleGuidelineSearch = async () => {
    if (!selectedRound || !selectedType) {
      setError("모집 시기와 전형 유형을 모두 선택해주세요.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const guidelines = await acsService.getGuidelines(selectedRound, selectedType)
      if (guidelines.length > 0) {
        setGuideline(guidelines[0])
      } else {
        setGuideline(null)
        setError("선택한 조건에 맞는 모집 요강이 없습니다.")
      }
    } catch (err) {
      console.error("Guideline search error:", err)
      setError("모집 요강을 조회하는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 학과 검색
  const handleDepartmentSearch = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const deptData = await acsService.getDepartments(departmentSearch)
      setDepartments(deptData)
    } catch (err) {
      console.error("Department search error:", err)
      setError("학과 정보를 검색하는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 학과 선택
  const handleDepartmentSelect = async (departmentCode: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const deptDetail = await acsService.getDepartmentDetail(departmentCode)
      setSelectedDepartment(deptDetail)
    } catch (err) {
      console.error("Department detail error:", err)
      setError("학과 상세 정보를 불러오는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 상담 정보 입력 핸들러
  const handleCounselingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCounselingData((prev) => ({ ...prev, [name]: value }))
  }

  // 성적 분석 핸들러
  const handleScoreAnalysis = async (scoreData: CounselingRequest["applicantScores"]) => {
    setIsLoading(true)
    setError(null)
    setScores(scoreData)

    try {
      const result = await acsService.analyzeScores(scoreData)
      setAnalysisResult(result)
    } catch (err) {
      console.error("Score analysis error:", err)
      setError("성적 분석 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 상담 저장 핸들러 (상담사 전용)
  const handleSaveCounseling = async () => {
    if (!counselingData.applicantName || !counselingData.applicantContact) {
      setError("상담 대상자 이름과 연락처는 필수 입력 항목입니다.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await acsService.saveCounselingLog({
        ...counselingData,
        applicantScores: scores,
        counselorId: currentUser?.userId,
      })

      if (result.success) {
        alert("상담 내용이 저장되었습니다.")
        // 필요시 폼 초기화
      } else {
        setError(result.message || "상담 저장 중 오류가 발생했습니다.")
      }
    } catch (err) {
      console.error("Counseling save error:", err)
      setError("상담 저장 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">입학 상담</h1>

      <Tabs defaultValue="guideline">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guideline">모집 요강 조회</TabsTrigger>
          <TabsTrigger value="department">학과 정보 조회</TabsTrigger>
          <TabsTrigger value="counseling">성적 분석 및 상담</TabsTrigger>
        </TabsList>

        {/* 모집 요강 조회 탭 */}
        <TabsContent value="guideline" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>모집 요강 조회</CardTitle>
              <CardDescription>모집 시기와 전형 유형을 선택하여 모집 요강을 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <Label htmlFor="admissionRound">모집 시기</Label>
                  <Select value={selectedRound} onValueChange={setSelectedRound}>
                    <SelectTrigger id="admissionRound">
                      <SelectValue placeholder="모집 시기 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {admissionRounds.map((round) => (
                        <SelectItem key={round} value={round}>
                          {round}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <Label htmlFor="admissionType">전형 유형</Label>
                  <Select value={selectedType} onValueChange={setSelectedType} disabled={!selectedRound}>
                    <SelectTrigger id="admissionType">
                      <SelectValue placeholder="전형 유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {admissionTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button onClick={handleGuidelineSearch} disabled={isLoading}>
                    {isLoading ? "조회 중..." : "조회"}
                  </Button>
                </div>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              {guideline && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">{guideline.title}</h3>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: guideline.content }}></div>
                  {guideline.attachments && guideline.attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">첨부 파일</h4>
                      <ul className="space-y-1">
                        {guideline.attachments.map((file) => (
                          <li key={file.attachmentId}>
                            <a
                              href={file.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              {file.fileName} ({(file.fileSize / 1024 / 1024).toFixed(2)} MB)
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 학과 정보 조회 탭 */}
        <TabsContent value="department" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>학과 정보 조회</CardTitle>
              <CardDescription>학과명을 검색하거나 목록에서 선택하여 상세 정보를 확인하세요.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="학과명 검색"
                  value={departmentSearch}
                  onChange={(e) => setDepartmentSearch(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleDepartmentSearch} disabled={isLoading}>
                  {isLoading ? "검색 중..." : "검색"}
                </Button>
              </div>

              {error && <p className="text-red-500 mb-4">{error}</p>}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {departments.map((dept) => (
                  <Card
                    key={dept.departmentCode}
                    className={`cursor-pointer hover:bg-slate-50 ${
                      selectedDepartment?.departmentCode === dept.departmentCode ? "border-blue-500 bg-blue-50" : ""
                    }`}
                    onClick={() => handleDepartmentSelect(dept.departmentCode)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-medium">{dept.departmentName}</h3>
                      <p className="text-sm text-muted-foreground">{dept.college}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedDepartment && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-4">{selectedDepartment.departmentName}</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-medium mb-2">학과 소개</h4>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedDepartment.introduction }}
                      ></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">교육 과정</h4>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedDepartment.curriculum }}
                      ></div>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-2">졸업 후 진로</h4>
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: selectedDepartment.career }}
                      ></div>
                    </div>

                    {selectedDepartment.admissionResults && selectedDepartment.admissionResults.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-2">전년도 입시 결과</h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  연도
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  모집 시기
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  전형 유형
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  경쟁률
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  최저점
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  평균점
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedDepartment.admissionResults.map((result, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap">{result.year}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{result.admissionRound}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{result.admissionType}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {result.competitionRate.toFixed(1)}:1 ({result.acceptedCount}/{result.applicants})
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">{result.minScore || "-"}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">{result.avgScore || "-"}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {selectedDepartment.attachments && selectedDepartment.attachments.length > 0 && (
                      <div>
                        <h4 className="text-lg font-medium mb-2">첨부 파일</h4>
                        <ul className="space-y-1">
                          {selectedDepartment.attachments.map((file) => (
                            <li key={file.attachmentId}>
                              <a
                                href={file.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {file.fileName} ({(file.fileSize / 1024 / 1024).toFixed(2)} MB)
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* 성적 분석 및 상담 탭 */}
        <TabsContent value="counseling" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              {/* 상담 대상자 정보 */}
              <Card>
                <CardHeader>
                  <CardTitle>상담 대상자 정보</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="applicantName">이름</Label>
                      <Input
                        id="applicantName"
                        name="applicantName"
                        value={counselingData.applicantName}
                        onChange={handleCounselingInputChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="applicantContact">연락처</Label>
                      <Input
                        id="applicantContact"
                        name="applicantContact"
                        value={counselingData.applicantContact}
                        onChange={handleCounselingInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 성적 입력 폼 */}
              <ScoreInputForm onSubmit={handleScoreAnalysis} isLoading={isLoading} />

              {/* 상담사 전용 - 상담 내용 입력 */}
              {isUserCounselor && (
                <Card>
                  <CardHeader>
                    <CardTitle>상담 내용 (상담사 전용)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="counselingContent">상담 내용</Label>
                        <Textarea
                          id="counselingContent"
                          name="counselingContent"
                          rows={6}
                          value={counselingData.counselingContent}
                          onChange={handleCounselingInputChange}
                        />
                      </div>
                      <Button onClick={handleSaveCounseling} disabled={isLoading} className="w-full">
                        {isLoading ? "저장 중..." : "상담 저장"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="md:col-span-2">
              {/* 성적 분석 결과 */}
              {Object.keys(scores).length > 0 && (
                <div className="space-y-6">
                  {/* 성적 시각화 */}
                  <ScoreVisualization scores={scores} analysisResult={analysisResult || undefined} />

                  {/* 분석 결과 */}
                  {analysisResult && (
                    <Card>
                      <CardHeader>
                        <CardTitle>성적 분석 결과</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {/* 예상 환산 점수 */}
                          <div>
                            <h3 className="text-lg font-medium mb-2">예상 환산 점수</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {analysisResult.estimatedScores.map((item, index) => (
                                <div key={index} className="p-4 bg-slate-50 rounded-md">
                                  <div className="font-medium">{item.admissionType}</div>
                                  <div className="text-2xl font-bold">
                                    {item.score !== null ? `${item.score.toFixed(1)}점` : "정량화 불가"}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 추천 학과 */}
                          <div>
                            <h3 className="text-lg font-medium mb-2">추천 학과 및 전형</h3>
                            <div className="overflow-x-auto">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      학과명
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      전형 유형
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                      지원 가능성
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {analysisResult.recommendations.map((rec, index) => (
                                    <tr key={index}>
                                      <td className="px-6 py-4 whitespace-nowrap">{rec.departmentName}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">{rec.admissionType}</td>
                                      <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            rec.likelihood === "안정"
                                              ? "bg-green-100 text-green-800"
                                              : rec.likelihood === "소신"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-red-100 text-red-800"
                                          }`}
                                        >
                                          {rec.likelihood}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* 조언 */}
                          <div className="p-4 bg-blue-50 rounded-md">
                            <h3 className="text-lg font-medium mb-2">조언</h3>
                            <p>{analysisResult.advice}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {error && (
                <div className="p-4 bg-red-50 text-red-500 rounded-md">
                  <p>{error}</p>
                </div>
              )}

              {!Object.keys(scores).length && !error && (
                <div className="flex items-center justify-center h-64 bg-slate-50 rounded-md">
                  <p className="text-slate-500">성적을 입력하고 분석 버튼을 클릭하면 결과가 여기에 표시됩니다.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
