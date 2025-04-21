"use client"

import type React from "react"

// 화면ID: CMN-SCR-001

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { authService } from "@/api/services/auth"
import type { LoginRequest } from "@/types/common"

export default function LoginPage() {
  const router = useRouter()
  const [loginData, setLoginData] = useState<LoginRequest>({
    userId: "",
    password: "",
    loginType: "STAFF",
  })
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLoginTypeChange = (value: string) => {
    setLoginData((prev) => ({ ...prev, loginType: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // 입력값 검증
    if (!loginData.userId || !loginData.password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.")
      setIsLoading(false)
      return
    }

    try {
      // API 호출
      const response = await authService.login(loginData)

      if (response.success) {
        // 로그인 성공 시 리다이렉션
        router.push(response.initialUrl || "/")
      } else {
        // 로그인 실패 시 에러 메시지 표시
        setError(response.errorMessage || "로그인에 실패했습니다.")
      }
    } catch (err) {
      setError("서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">로그인</CardTitle>
          <CardDescription className="text-center">입학관리시스템에 로그인하세요</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <RadioGroup
              defaultValue={loginData.loginType}
              className="flex space-x-4 mb-4"
              onValueChange={handleLoginTypeChange}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="STAFF" id="staff" />
                <Label htmlFor="staff">교직원/관리자</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="APPLICANT" id="applicant" />
                <Label htmlFor="applicant">수험생</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="userId">아이디</Label>
              <Input
                id="userId"
                name="userId"
                placeholder="아이디를 입력하세요"
                value={loginData.userId}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={loginData.password}
                onChange={handleInputChange}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Button>

            {loginData.loginType === "APPLICANT" && (
              <Button variant="outline" className="w-full" onClick={() => router.push("/AMS/application")}>
                원서접수 바로가기
              </Button>
            )}

            <div className="text-center text-sm">
              <a href="#" className="text-blue-600 hover:underline">
                비밀번호 찾기
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
