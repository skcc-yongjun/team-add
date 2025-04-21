"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { CounselingRequest } from "@/types/acs"

interface ScoreInputFormProps {
  onSubmit: (data: CounselingRequest["applicantScores"]) => void
  isLoading?: boolean
}

export function ScoreInputForm({ onSubmit, isLoading = false }: ScoreInputFormProps) {
  const [activeTab, setActiveTab] = useState("gpa")
  const [gpaScores, setGpaScores] = useState<Record<string, number>>({
    "1학년": 0,
    "2학년": 0,
    "3학년1학기": 0,
  })
  const [csatScores, setCsatScores] = useState<Record<string, number>>({
    국어: 0,
    수학: 0,
    영어: 0,
    탐구1: 0,
    탐구2: 0,
  })
  const [nonAcademic, setNonAcademic] = useState("")

  const handleGpaChange = (grade: string, value: string) => {
    const numValue = Number.parseFloat(value) || 0
    setGpaScores((prev) => ({ ...prev, [grade]: numValue }))
  }

  const handleCsatChange = (subject: string, value: string) => {
    const numValue = Number.parseInt(value) || 0
    setCsatScores((prev) => ({ ...prev, [subject]: numValue }))
  }

  const handleSubmit = () => {
    onSubmit({
      gpa: gpaScores,
      csat: csatScores,
      nonAcademic,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>성적 입력</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="gpa">학생부 교과</TabsTrigger>
            <TabsTrigger value="csat">수능</TabsTrigger>
            <TabsTrigger value="nonAcademic">비교과</TabsTrigger>
          </TabsList>

          <TabsContent value="gpa" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gpa1">1학년 평균 등급</Label>
                <Input
                  id="gpa1"
                  type="number"
                  step="0.1"
                  min="1"
                  max="9"
                  placeholder="1.0 ~ 9.0"
                  value={gpaScores["1학년"] || ""}
                  onChange={(e) => handleGpaChange("1학년", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa2">2학년 평균 등급</Label>
                <Input
                  id="gpa2"
                  type="number"
                  step="0.1"
                  min="1"
                  max="9"
                  placeholder="1.0 ~ 9.0"
                  value={gpaScores["2학년"] || ""}
                  onChange={(e) => handleGpaChange("2학년", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gpa3">3학년 1학기 평균 등급</Label>
                <Input
                  id="gpa3"
                  type="number"
                  step="0.1"
                  min="1"
                  max="9"
                  placeholder="1.0 ~ 9.0"
                  value={gpaScores["3학년1학기"] || ""}
                  onChange={(e) => handleGpaChange("3학년1학기", e.target.value)}
                />
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              * 등급은 1.0(최상위)~9.0(최하위) 사이의 값으로 입력해주세요.
            </p>
          </TabsContent>

          <TabsContent value="csat" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="korean">국어 표준점수</Label>
                <Input
                  id="korean"
                  type="number"
                  min="0"
                  max="200"
                  placeholder="0 ~ 200"
                  value={csatScores["국어"] || ""}
                  onChange={(e) => handleCsatChange("국어", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="math">수학 표준점수</Label>
                <Input
                  id="math"
                  type="number"
                  min="0"
                  max="200"
                  placeholder="0 ~ 200"
                  value={csatScores["수학"] || ""}
                  onChange={(e) => handleCsatChange("수학", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="english">영어 등급</Label>
                <Input
                  id="english"
                  type="number"
                  min="1"
                  max="9"
                  placeholder="1 ~ 9"
                  value={csatScores["영어"] || ""}
                  onChange={(e) => handleCsatChange("영어", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inquiry1">탐구1 표준점수</Label>
                <Input
                  id="inquiry1"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0 ~ 100"
                  value={csatScores["탐구1"] || ""}
                  onChange={(e) => handleCsatChange("탐구1", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inquiry2">탐구2 표준점수</Label>
                <Input
                  id="inquiry2"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="0 ~ 100"
                  value={csatScores["탐구2"] || ""}
                  onChange={(e) => handleCsatChange("탐구2", e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="nonAcademic" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="nonAcademic">비교과 활동 내용</Label>
              <Textarea
                id="nonAcademic"
                placeholder="교내 활동, 수상 경력, 봉사 활동 등 주요 비교과 활동을 입력해주세요."
                rows={6}
                value={nonAcademic}
                onChange={(e) => setNonAcademic(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <Button onClick={handleSubmit} disabled={isLoading} className="w-full">
            {isLoading ? "분석 중..." : "성적 분석"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
