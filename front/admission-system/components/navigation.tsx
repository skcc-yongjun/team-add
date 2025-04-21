"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import type { UserRole } from "@/types/common"
import { RoleSelector } from "./role-selector"
import { authService } from "@/api/services/auth"
import { Button } from "@/components/ui/button"

export function Navigation() {
  const pathname = usePathname()
  const [userRole, setUserRole] = useState<UserRole>("APPLICANT")
  const [userName, setUserName] = useState<string>("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (user) {
      setUserRole(user.userRole)
      setUserName(user.userName)
      setIsLoggedIn(true)
    }
  }, [])

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role)
  }

  const handleLogout = () => {
    authService.logout()
  }

  // 역할별 메뉴 구성
  const getMenuItems = () => {
    const commonMenus = [{ label: "홈", path: "/" }]

    const roleSpecificMenus: Record<UserRole, { label: string; path: string }[]> = {
      APPLICANT: [
        { label: "원서접수", path: "/AMS/application" },
        { label: "합격자 조회", path: "/AMS/result" },
      ],
      ADMISSION_OFFICER: [
        { label: "원서관리", path: "/AMS" },
        { label: "평가관리", path: "/AMS/evaluation" },
        { label: "합격자관리", path: "/AMS/admission" },
        { label: "수험생 조회", path: "/CMN/applicant" },
      ],
      EVALUATOR: [
        { label: "면접평가", path: "/IES/interview" },
        { label: "실기평가", path: "/IES/practical" },
      ],
      COUNSELOR: [
        { label: "입학상담", path: "/ACS" },
        { label: "상담이력", path: "/ACS/history" },
      ],
      FINANCE_OFFICER: [
        { label: "등록금관리", path: "/FRS" },
        { label: "환불관리", path: "/FRS/refund" },
      ],
      SYSTEM_ADMIN: [
        { label: "사용자관리", path: "/admin/users" },
        { label: "공통코드관리", path: "/CMN/code" },
        { label: "수험생 조회", path: "/CMN/applicant" },
      ],
    }

    return [...commonMenus, ...roleSpecificMenus[userRole]]
  }

  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            입학관리시스템
          </Link>
          <div className="hidden md:flex space-x-4">
            {getMenuItems().map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === item.path
                    ? "bg-slate-900 text-white"
                    : "text-gray-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-sm">{userName}님</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                로그아웃
              </Button>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                로그인
              </Button>
            </Link>
          )}
          <RoleSelector onChange={handleRoleChange} defaultRole={userRole} />
        </div>
      </div>
    </nav>
  )
}
