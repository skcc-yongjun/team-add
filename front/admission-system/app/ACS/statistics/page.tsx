"use client"

// 화면ID: ACS-SCR-003

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle as UITitle,
  CardDescription as UIDescription,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Download } from "lucide-react"
import { acsService } from "@/api/services/acs"
import { authService } from "@/api/services/auth"
import type { CounselingStatistics } from "@/types/acs"
import type { User } from "@/types/common"
import Chart from "chart.js/auto"

export default function ACSStatisticsPage() {
  const router = useRouter()

  // 사용자 정보
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  // 통계 조회 상태
  const [statisticType, setStatisticType] = useState<string>("usage-trends")
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 1)))
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [statistics, setStatistics] = useState<CounselingStatistics | null>(null)

  // 차트 참조
  const trendChartRef = useRef<HTMLCanvasElement | null>(null)
  const typeChartRef = useRef<HTMLCanvasElement | null>(null)
  const counselorChartRef = useRef<HTMLCanvasElement | null>(null)
  const keywordChartRef = useRef<HTMLCanvasElement | null>(null)

  // 로딩 및 에러 상태
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 사용자 권한 확인
  useEffect(() => {
    const user = authService.getCurrentUser()
    setCurrentUser(user)

    // 시스템 관리자 또는 입학처 담당자만 접근 가능
    const authorized = user?.userRole === "SYSTEM_ADMIN" || user?.userRole === "ADMISSION_OFFICER"
    setIsAuthorized(authorized)

    if (!authorized) {
      alert("접근 권한이 없습니다.")
      router.push("/")
    }
  }, [router])

  // 통계 조회
  const fetchStatistics = async () => {
    if (!isAuthorized) return

    setIsLoading(true)
    setError(null)

    try {
      const formattedStartDate = format(startDate, "yyyy-MM-dd")
      const formattedEndDate = format(endDate, "yyyy-MM-dd")

      const data = await acsService.getCounselingStatistics(statisticType, formattedStartDate, formattedEndDate)

      setStatistics(data)
    } catch (err) {
      console.error("Statistics fetch error:", err)
      setError("통계 데이터를 불러오는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 초기 데이터 로드
  useEffect(() => {
    if (isAuthorized) {
      fetchStatistics()
    }
  }, [isAuthorized])

  // 통계 데이터가 변경될 때 차트 생성
  useEffect(() => {
    if (!statistics) return

    // 추이 차트 생성
    if (trendChartRef.current && statistics.byDate) {
      const ctx = trendChartRef.current.getContext("2d")
      if (!ctx) return

      const chartData = {
        labels: statistics.byDate.map((item) => item.date),
        datasets: [
          {
            label: "상담 건수",
            data: statistics.byDate.map((item) => item.count),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      }

      const chart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "건수",
              },
            },
          },
        },
      })

      return () => {
        chart.destroy()
      }
    }
  }, [statistics])

  // 유형별 차트 생성
  useEffect(() => {
    if (!statistics || !typeChartRef.current || !statistics.byType) return

    const ctx = typeChartRef.current.getContext("2d")
    if (!ctx) return

    const chartData = {
      labels: statistics.byType.map((item) => item.type),
      datasets: [
        {
          data: statistics.byType.map((item) => item.count),
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }

    const chart = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: {
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [statistics])

  // 상담사별 차트 생성
  useEffect(() => {
    if (!statistics || !counselorChartRef.current || !statistics.byCounselor) return

    const ctx = counselorChartRef.current.getContext("2d")
    if (!ctx) return

    const chartData = {
      labels: statistics.byCounselor.map((item) => item.counselorName),
      datasets: [
        {
          label: "상담 건수",
          data: statistics.byCounselor.map((item) => item.count),
          backgroundColor: "rgba(153, 102, 255, 0.6)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
        },
      ],
    }

    const chart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "건수",
            },
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [statistics])

  // 키워드 차트 생성
  useEffect(() => {
    if (!statistics || !keywordChartRef.current || !statistics.keywords) return

    const ctx = keywordChartRef.current.getContext("2d")
    if (!ctx) return

    const chartData = {
      labels: statistics.keywords.map((item) => item.keyword),
      datasets: [
        {
          label: "언급 횟수",
          data: statistics.keywords.map((item) => item.count),
          backgroundColor: "rgba(255, 159, 64, 0.6)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    }

    const chart = new Chart(ctx, {
      type: "bar",
      data: chartData,
      options: {
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: "언급 횟수",
            },
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [statistics])

  // 보고서 다운로드 핸들러
  const handleDownloadReport = async (reportType: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const formattedStartDate = format(startDate, "yyyy-MM-dd")
      const formattedEndDate = format(endDate, "yyyy-MM-dd")

      const blob = await acsService.downloadStatisticsReport(reportType, formattedStartDate, formattedEndDate)

      // 파일 다운로드 처리
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `상담통계_${reportType}_${formattedStartDate}_${formattedEndDate}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error("Report download error:", err)
      setError("보고서 다운로드 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthorized) {
    return <div className="container mx-auto py-6">권한을 확인하는 중입니다...</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">ACS 통계</h1>

      <Card>
        <CardHeader>
          <UITitle>상담 사용 통계 조회</UITitle>
          <UIDescription>기간과 통계 유형을 선택하여 상담 사용 현황을 확인하세요.</UIDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="space-y-2">
              <span className="text-sm font-medium">통계 유형</span>
              <Select value={statisticType} onValueChange={setStatisticType}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="통계 유형 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usage-trends">상담 추이</SelectItem>
                  <SelectItem value="counseling-types">상담 유형별 분석</SelectItem>
                  <SelectItem value="counselor-performance">상담사별 처리 현황</SelectItem>
                  <SelectItem value="keyword-analysis">주요 문의 키워드 분석</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">시작일</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "yyyy-MM-dd") : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => date && setStartDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium">종료일</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[200px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "yyyy-MM-dd") : "날짜 선택"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={(date) => date && setEndDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex items-end">
              <Button onClick={fetchStatistics} disabled={isLoading}>
                {isLoading ? "조회 중..." : "통계 조회"}
              </Button>
            </div>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          {statistics && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">
                  {format(startDate, "yyyy-MM-dd")} ~ {format(endDate, "yyyy-MM-dd")} 통계 결과
                </h3>
                <Button variant="outline" onClick={() => handleDownloadReport(statisticType)}>
                  <Download className="mr-2 h-4 w-4" />
                  보고서 다운로드
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 상담 추이 차트 */}
                <Card>
                  <CardHeader>
                    <UITitle>상담 추이</UITitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <canvas ref={trendChartRef}></canvas>
                    </div>
                  </CardContent>
                </Card>

                {/* 상담 유형별 차트 */}
                <Card>
                  <CardHeader>
                    <UITitle>상담 유형별 분석</UITitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <canvas ref={typeChartRef}></canvas>
                    </div>
                  </CardContent>
                </Card>

                {/* 상담사별 처리 현황 */}
                {statistics.byCounselor && (
                  <Card>
                    <CardHeader>
                      <UITitle>상담사별 처리 현황</UITitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <canvas ref={counselorChartRef}></canvas>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* 주요 문의 키워드 분석 */}
                {statistics.keywords && (
                  <Card>
                    <CardHeader>
                      <UITitle>주요 문의 키워드 분석</UITitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64">
                        <canvas ref={keywordChartRef}></canvas>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* 요약 통계 */}
              <Card>
                <CardHeader>
                  <UITitle>요약 통계</UITitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-slate-50 rounded-md">
                      <div className="text-sm text-muted-foreground">총 상담 건수</div>
                      <div className="text-2xl font-bold">{statistics.totalCount}건</div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-md">
                      <div className="text-sm text-muted-foreground">일평균 상담 건수</div>
                      <div className="text-2xl font-bold">
                        {statistics.byDate && statistics.byDate.length > 0
                          ? (statistics.totalCount / statistics.byDate.length).toFixed(1)
                          : 0}
                        건
                      </div>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-md">
                      <div className="text-sm text-muted-foreground">주요 상담 유형</div>
                      <div className="text-2xl font-bold">
                        {statistics.byType && statistics.byType.length > 0
                          ? statistics.byType.sort((a, b) => b.count - a.count)[0].type
                          : "-"}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!statistics && !error && !isLoading && (
            <div className="flex items-center justify-center h-64 bg-slate-50 rounded-md">
              <p className="text-slate-500">통계 조회 버튼을 클릭하면 결과가 여기에 표시됩니다.</p>
            </div>
          )}

          {isLoading && !statistics && (
            <div className="flex items-center justify-center h-64">
              <p>통계 데이터를 불러오는 중입니다...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
