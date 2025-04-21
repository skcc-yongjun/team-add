"use client"

// 화면ID: CMN-SCR-002

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { applicantService } from "@/api/services/applicant"
import type { ApplicantSearchResult, ApplicantDetail, ApplicationSummary } from "@/types/common"

export default function ApplicantSearchPage() {
  const [keywordType, setKeywordType] = useState<string>("name")
  const [keyword, setKeyword] = useState<string>("")
  const [searchResults, setSearchResults] = useState<ApplicantSearchResult[]>([])
  const [selectedApplicant, setSelectedApplicant] = useState<ApplicantDetail | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!keyword.trim()) {
      setError("검색어를 입력해주세요.")
      return
    }

    setError(null)
    setIsLoading(true)
    setSelectedApplicant(null)

    try {
      // API 호출
      const results = await applicantService.searchApplicants(keywordType, keyword)
      setSearchResults(results)

      if (results.length === 0) {
        setError("검색 결과가 없습니다.")
      }
    } catch (err) {
      setError("검색 중 오류가 발생했습니다.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectApplicant = async (applicantId: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // API 호출
      const details = await applicantService.getApplicantDetails(applicantId)
      setSelectedApplicant(details)
    } catch (err) {
      setError("상세 정보를 불러오는 중 오류가 발생했습니다.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 지원 상태에 따른 배지 색상 결정
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      접수완료: "default",
      평가중: "secondary",
      합격: "success",
      불합격: "destructive",
      등록완료: "success",
      환불완료: "warning",
    }

    return <Badge variant={(statusMap[status] as any) || "default"}>{status}</Badge>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">수험생 개별 데이터 통합</h1>

      {/* 검색 영역 */}
      <Card>
        <CardHeader>
          <CardTitle>수험생 검색</CardTitle>
          <CardDescription>수험번호, 이름, 연락처, 생년월일 등으로 수험생을 검색할 수 있습니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Select value={keywordType} onValueChange={setKeywordType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="검색 조건" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="examNumber">수험번호</SelectItem>
                <SelectItem value="name">이름</SelectItem>
                <SelectItem value="phone">연락처</SelectItem>
                <SelectItem value="birthDate">생년월일</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="검색어를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="flex-1"
            />

            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "검색 중..." : "검색"}
            </Button>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>

      {/* 검색 결과 목록 */}
      {searchResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>검색 결과</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>수험번호</TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>생년월일</TableHead>
                  <TableHead>상세보기</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((applicant) => (
                  <TableRow key={applicant.applicantId}>
                    <TableCell>{applicant.examNumber || "-"}</TableCell>
                    <TableCell>{applicant.name}</TableCell>
                    <TableCell>{applicant.birthDate}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleSelectApplicant(applicant.applicantId)}>
                        상세보기
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* 선택된 수험생 상세 정보 */}
      {selectedApplicant && (
        <Card>
          <CardHeader>
            <CardTitle>수험생 상세 정보</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic">
              <TabsList>
                <TabsTrigger value="basic">기본 정보</TabsTrigger>
                <TabsTrigger value="applications">지원 이력</TabsTrigger>
                <TabsTrigger value="evaluations">평가 결과</TabsTrigger>
                <TabsTrigger value="recruitment">충원 이력</TabsTrigger>
                <TabsTrigger value="counseling">상담 이력</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">인적 사항</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">이름:</span>
                        <span>{selectedApplicant.basicInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">생년월일:</span>
                        <span>{selectedApplicant.basicInfo.birthDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">성별:</span>
                        <span>{selectedApplicant.basicInfo.gender}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">연락처 정보</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">전화번호:</span>
                        <span>{selectedApplicant.basicInfo.phoneNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">이메일:</span>
                        <span>{selectedApplicant.basicInfo.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">주소:</span>
                        <span>{selectedApplicant.basicInfo.address}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="applications" className="mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>수험번호</TableHead>
                      <TableHead>모집시기</TableHead>
                      <TableHead>전형유형</TableHead>
                      <TableHead>모집단위</TableHead>
                      <TableHead>상태</TableHead>
                      <TableHead>점수/순위</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedApplicant.applicationHistory.map((app: ApplicationSummary) => (
                      <TableRow key={app.applicationId}>
                        <TableCell>{app.examNumber || "-"}</TableCell>
                        <TableCell>{app.round}</TableCell>
                        <TableCell>{app.type}</TableCell>
                        <TableCell>{app.dept}</TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell>
                          {app.score ? `${app.score}점` : "-"}
                          {app.rank ? ` / ${app.rank}등` : ""}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="evaluations" className="mt-4">
                <div className="p-4 text-center text-gray-500">
                  {selectedApplicant.evaluationSummary ? (
                    <pre className="text-left bg-gray-100 p-4 rounded">
                      {JSON.stringify(selectedApplicant.evaluationSummary, null, 2)}
                    </pre>
                  ) : (
                    "평가 결과 정보가 없습니다."
                  )}
                </div>
              </TabsContent>

              <TabsContent value="recruitment" className="mt-4">
                {selectedApplicant.recruitmentLogs && selectedApplicant.recruitmentLogs.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>충원차수</TableHead>
                        <TableHead>통화시간</TableHead>
                        <TableHead>결과</TableHead>
                        <TableHead>상담사</TableHead>
                        <TableHead>메모</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedApplicant.recruitmentLogs.map((log) => (
                        <TableRow key={log.logId}>
                          <TableCell>{log.recruitmentRound}차</TableCell>
                          <TableCell>
                            {new Date(log.callStartedAt).toLocaleString()} ~{new Date(log.callEndedAt).toLocaleString()}
                          </TableCell>
                          <TableCell>{log.result}</TableCell>
                          <TableCell>{log.counselorId}</TableCell>
                          <TableCell>{log.memo}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-4 text-center text-gray-500">충원 이력 정보가 없습니다.</div>
                )}
              </TabsContent>

              <TabsContent value="counseling" className="mt-4">
                {selectedApplicant.counselingLogs && selectedApplicant.counselingLogs.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>상담일시</TableHead>
                        <TableHead>상담사</TableHead>
                        <TableHead>상담내용</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedApplicant.counselingLogs.map((log) => (
                        <TableRow key={log.counselingLogId}>
                          <TableCell>{new Date(log.counseledAt).toLocaleString()}</TableCell>
                          <TableCell>{log.counselorId}</TableCell>
                          <TableCell>{log.counselingContent}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="p-4 text-center text-gray-500">상담 이력 정보가 없습니다.</div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
