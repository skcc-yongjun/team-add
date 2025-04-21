"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CounselingRequest, ScoreAnalysisResult } from "@/types/acs"
import Chart from "chart.js/auto"

interface ScoreVisualizationProps {
  scores: CounselingRequest["applicantScores"]
  analysisResult?: ScoreAnalysisResult
}

export function ScoreVisualization({ scores, analysisResult }: ScoreVisualizationProps) {
  const gpaChartRef = useRef<HTMLCanvasElement | null>(null)
  const csatChartRef = useRef<HTMLCanvasElement | null>(null)
  const comparisonChartRef = useRef<HTMLCanvasElement | null>(null)

  // GPA 차트 생성
  useEffect(() => {
    if (!scores.gpa || !gpaChartRef.current) return

    const ctx = gpaChartRef.current.getContext("2d")
    if (!ctx) return

    const chartData = {
      labels: Object.keys(scores.gpa),
      datasets: [
        {
          label: "학년별 평균 등급",
          data: Object.values(scores.gpa),
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    }

    const chartOptions = {
      scales: {
        y: {
          reverse: true, // 등급은 낮을수록 좋으므로 역순으로 표시
          min: 1,
          max: 9,
          title: {
            display: true,
            text: "등급",
          },
        },
      },
    }

    const chart = new Chart(ctx, {
      type: "line",
      data: chartData,
      options: chartOptions,
    })

    return () => {
      chart.destroy()
    }
  }, [scores.gpa])

  // 수능 차트 생성
  useEffect(() => {
    if (!scores.csat || !csatChartRef.current) return

    const ctx = csatChartRef.current.getContext("2d")
    if (!ctx) return

    // 영어는 등급이므로 별도 처리
    const subjects = Object.keys(scores.csat).filter((key) => key !== "영어")
    const values = subjects.map((key) => scores.csat![key])

    const chartData = {
      labels: subjects,
      datasets: [
        {
          label: "영역별 표준점수",
          data: values,
          backgroundColor: "rgba(153, 102, 255, 0.2)",
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
              text: "표준점수",
            },
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [scores.csat])

  // 비교 차트 생성 (분석 결과가 있을 경우)
  useEffect(() => {
    if (!analysisResult || !comparisonChartRef.current) return

    const ctx = comparisonChartRef.current.getContext("2d")
    if (!ctx) return

    // 추천 학과 중 상위 3개만 표시
    const topRecommendations = analysisResult.recommendations.slice(0, 3)
    const departments = topRecommendations.map((rec) => rec.departmentName)

    // 지원 가능성을 수치화 (안정: 3, 소신: 2, 불안: 1)
    const likelihoodMap: Record<string, number> = {
      안정: 3,
      소신: 2,
      불안: 1,
    }

    const likelihoodValues = topRecommendations.map((rec) => likelihoodMap[rec.likelihood])

    const chartData = {
      labels: departments,
      datasets: [
        {
          label: "지원 가능성",
          data: likelihoodValues,
          backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 206, 86, 0.6)", "rgba(255, 99, 132, 0.6)"],
          borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)", "rgba(255, 99, 132, 1)"],
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
            max: 3,
            ticks: {
              callback: (value) => {
                if (value === 1) return "불안"
                if (value === 2) return "소신"
                if (value === 3) return "안정"
                return ""
              },
            },
          },
        },
      },
    })

    return () => {
      chart.destroy()
    }
  }, [analysisResult])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>성적 시각화</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {scores.gpa && Object.keys(scores.gpa).length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">학년별 내신 등급 추이</h3>
              <div className="h-64">
                <canvas ref={gpaChartRef}></canvas>
              </div>
            </div>
          )}

          {scores.csat && Object.keys(scores.csat).length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-2">수능 영역별 점수</h3>
              <div className="h-64">
                <canvas ref={csatChartRef}></canvas>
              </div>
              {scores.csat["영어"] && (
                <div className="mt-2 text-center">
                  <span className="font-medium">영어 등급: </span>
                  <span>{scores.csat["영어"]}등급</span>
                </div>
              )}
            </div>
          )}

          {analysisResult && (
            <div>
              <h3 className="text-lg font-medium mb-2">추천 학과 및 지원 가능성</h3>
              <div className="h-64">
                <canvas ref={comparisonChartRef}></canvas>
              </div>
              <div className="mt-4 p-4 bg-slate-50 rounded-md">
                <p className="font-medium">조언:</p>
                <p className="text-sm">{analysisResult.advice}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
