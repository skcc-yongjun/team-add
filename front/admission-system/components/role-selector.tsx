"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { UserRole } from "@/types/common"

interface RoleSelectorProps {
  onChange: (role: UserRole) => void
  defaultRole?: UserRole
}

export function RoleSelector({ onChange, defaultRole = "APPLICANT" }: RoleSelectorProps) {
  const [role, setRole] = useState<UserRole>(defaultRole)

  const handleRoleChange = (value: string) => {
    const newRole = value as UserRole
    setRole(newRole)
    onChange(newRole)
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">역할:</span>
      <Select value={role} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="역할 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="APPLICANT">수험생</SelectItem>
          <SelectItem value="ADMISSION_OFFICER">입학처 담당자</SelectItem>
          <SelectItem value="EVALUATOR">평가위원</SelectItem>
          <SelectItem value="COUNSELOR">상담사</SelectItem>
          <SelectItem value="FINANCE_OFFICER">재무 담당자</SelectItem>
          <SelectItem value="SYSTEM_ADMIN">시스템 관리자</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
