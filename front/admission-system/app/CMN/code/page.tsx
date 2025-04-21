"use client"

import type React from "react"

// 화면ID: CMN-SCR-003

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { codeService } from "@/api/services/code"
import type { CodeGroup, CodeDetail } from "@/types/common"
import { toast } from "@/hooks/use-toast"

export default function CodeManagementPage() {
  // 코드 그룹 상태
  const [codeGroups, setCodeGroups] = useState<CodeGroup[]>([])
  const [selectedGroup, setSelectedGroup] = useState<CodeGroup | null>(null)
  const [isAddingGroup, setIsAddingGroup] = useState(false)
  const [isEditingGroup, setIsEditingGroup] = useState(false)
  const [newGroupData, setNewGroupData] = useState<Partial<CodeGroup>>({
    groupCode: "",
    groupName: "",
    description: "",
    isActive: true,
  })

  // 상세 코드 상태
  const [codeDetails, setCodeDetails] = useState<CodeDetail[]>([])
  const [isAddingDetail, setIsAddingDetail] = useState(false)
  const [isEditingDetail, setIsEditingDetail] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<CodeDetail | null>(null)
  const [newDetailData, setNewDetailData] = useState<Partial<CodeDetail>>({
    code: "",
    codeName: "",
    sortOrder: 0,
    isActive: true,
  })

  // 로딩 및 에러 상태
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 코드 그룹 목록 조회
  const fetchCodeGroups = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const groups = await codeService.getCodeGroups()
      setCodeGroups(groups)
    } catch (err) {
      setError("코드 그룹 목록을 불러오는 중 오류가 발생했습니다.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 상세 코드 목록 조회
  const fetchCodeDetails = async (groupCode: string) => {
    if (!groupCode) return

    setIsLoading(true)
    setError(null)

    try {
      const details = await codeService.getCodeDetails(groupCode)
      setCodeDetails(details)
    } catch (err) {
      setError("상세 코드 목록을 불러오는 중 오류가 발생했습니다.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 초기 데이터 로드
  useEffect(() => {
    fetchCodeGroups()
  }, [])

  // 그룹 선택 시 상세 코드 로드
  useEffect(() => {
    if (selectedGroup) {
      fetchCodeDetails(selectedGroup.groupCode)
    } else {
      setCodeDetails([])
    }
  }, [selectedGroup])

  // 코드 그룹 선택 핸들러
  const handleSelectGroup = (group: CodeGroup) => {
    setSelectedGroup(group)
  }

  // 코드 그룹 입력 핸들러
  const handleGroupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewGroupData((prev) => ({ ...prev, [name]: value }))
  }

  // 코드 그룹 활성화 상태 변경 핸들러
  const handleGroupActiveChange = (checked: boolean) => {
    setNewGroupData((prev) => ({ ...prev, isActive: checked }))
  }

  // 코드 그룹 추가 모달 열기
  const openAddGroupModal = () => {
    setNewGroupData({
      groupCode: "",
      groupName: "",
      description: "",
      isActive: true,
    })
    setIsAddingGroup(true)
    setIsEditingGroup(false)
  }

  // 코드 그룹 수정 모달 열기
  const openEditGroupModal = (group: CodeGroup) => {
    setNewGroupData({
      groupCode: group.groupCode,
      groupName: group.groupName,
      description: group.description,
      isActive: group.isActive,
    })
    setIsEditingGroup(true)
    setIsAddingGroup(true)
  }

  // 코드 그룹 저장 핸들러
  const handleSaveGroup = async () => {
    if (!newGroupData.groupCode || !newGroupData.groupName) {
      toast({
        title: "입력 오류",
        description: "그룹 코드와 그룹명은 필수 입력 항목입니다.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (isEditingGroup) {
        // 수정
        await codeService.updateCodeGroup(newGroupData.groupCode as string, {
          groupName: newGroupData.groupName,
          description: newGroupData.description,
          isActive: newGroupData.isActive,
        })
        toast({
          title: "수정 완료",
          description: "코드 그룹이 수정되었습니다.",
        })
      } else {
        // 추가
        await codeService.addCodeGroup(newGroupData as CodeGroup)
        toast({
          title: "저장 완료",
          description: "새 코드 그룹이 추가되었습니다.",
        })
      }

      // 목록 새로고침
      await fetchCodeGroups()
      setIsAddingGroup(false)
    } catch (err) {
      toast({
        title: "오류 발생",
        description: "코드 그룹 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 코드 그룹 삭제 핸들러
  const handleDeleteGroup = async (groupCode: string) => {
    if (!confirm("정말 삭제하시겠습니까? 관련된 모든 상세 코드도 함께 삭제됩니다.")) {
      return
    }

    setIsLoading(true)

    try {
      await codeService.deleteCodeGroup(groupCode)
      toast({
        title: "삭제 완료",
        description: "코드 그룹이 삭제되었습니다.",
      })

      // 목록 새로고침 및 선택 초기화
      await fetchCodeGroups()
      setSelectedGroup(null)
    } catch (err) {
      toast({
        title: "오류 발생",
        description: "코드 그룹 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 상세 코드 입력 핸들러
  const handleDetailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewDetailData((prev) => ({
      ...prev,
      [name]: name === "sortOrder" ? Number.parseInt(value) || 0 : value,
    }))
  }

  // 상세 코드 활성화 상태 변경 핸들러
  const handleDetailActiveChange = (checked: boolean) => {
    setNewDetailData((prev) => ({ ...prev, isActive: checked }))
  }

  // 상세 코드 추가 모달 열기
  const openAddDetailModal = () => {
    setNewDetailData({
      code: "",
      codeName: "",
      sortOrder: codeDetails.length + 1,
      isActive: true,
    })
    setIsAddingDetail(true)
    setIsEditingDetail(false)
  }

  // 상세 코드 수정 모달 열기
  const openEditDetailModal = (detail: CodeDetail) => {
    setSelectedDetail(detail)
    setNewDetailData({
      code: detail.code,
      codeName: detail.codeName,
      sortOrder: detail.sortOrder,
      isActive: detail.isActive,
    })
    setIsEditingDetail(true)
    setIsAddingDetail(true)
  }

  // 상세 코드 저장 핸들러
  const handleSaveDetail = async () => {
    if (!selectedGroup) return

    if (!newDetailData.code || !newDetailData.codeName) {
      toast({
        title: "입력 오류",
        description: "코드와 코드명은 필수 입력 항목입니다.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      if (isEditingDetail && selectedDetail) {
        // 수정
        await codeService.updateCodeDetail(selectedGroup.groupCode, selectedDetail.code, {
          codeName: newDetailData.codeName,
          sortOrder: newDetailData.sortOrder,
          isActive: newDetailData.isActive,
        })
        toast({
          title: "수정 완료",
          description: "상세 코드가 수정되었습니다.",
        })
      } else {
        // 추가
        await codeService.addCodeDetail(selectedGroup.groupCode, {
          groupCode: selectedGroup.groupCode,
          code: newDetailData.code as string,
          codeName: newDetailData.codeName as string,
          sortOrder: newDetailData.sortOrder as number,
          isActive: newDetailData.isActive as boolean,
        })
        toast({
          title: "저장 완료",
          description: "새 상세 코드가 추가되었습니다.",
        })
      }

      // 목록 새로고침
      await fetchCodeDetails(selectedGroup.groupCode)
      setIsAddingDetail(false)
    } catch (err) {
      toast({
        title: "오류 발생",
        description: "상세 코드 저장 중 오류가 발생했습니다.",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  // 상세 코드 삭제 핸들러
  const handleDeleteDetail = async (code: string) => {
    if (!selectedGroup) return

    if (!confirm("정말 삭제하시겠습니까?")) {
      return
    }

    setIsLoading(true)

    try {
      await codeService.deleteCodeDetail(selectedGroup.groupCode, code)
      toast({
        title: "삭제 완료",
        description: "상세 코드가 삭제되었습니다.",
      })

      // 목록 새로고침
      await fetchCodeDetails(selectedGroup.groupCode)
    } catch (err) {
      toast({
        title: "오류 발생",
        description: "상세 코드 삭제 중 오류가 발생했습니다.",
        variant: "destructive",
      })
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">공통 코드 관리</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 코드 그룹 목록 */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>코드 그룹</CardTitle>
            <Dialog open={isAddingGroup} onOpenChange={setIsAddingGroup}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={openAddGroupModal}>
                  그룹 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isEditingGroup ? "코드 그룹 수정" : "코드 그룹 추가"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="groupCode">그룹 코드</Label>
                    <Input
                      id="groupCode"
                      name="groupCode"
                      value={newGroupData.groupCode || ""}
                      onChange={handleGroupInputChange}
                      disabled={isEditingGroup}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="groupName">그룹명</Label>
                    <Input
                      id="groupName"
                      name="groupName"
                      value={newGroupData.groupName || ""}
                      onChange={handleGroupInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">설명</Label>
                    <Input
                      id="description"
                      name="description"
                      value={newGroupData.description || ""}
                      onChange={handleGroupInputChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="isActive" checked={newGroupData.isActive} onCheckedChange={handleGroupActiveChange} />
                    <Label htmlFor="isActive">사용 여부</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingGroup(false)}>
                    취소
                  </Button>
                  <Button onClick={handleSaveGroup} disabled={isLoading}>
                    {isLoading ? "저장 중..." : "저장"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {isLoading && codeGroups.length === 0 ? (
              <div className="text-center py-4">로딩 중...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">{error}</div>
            ) : codeGroups.length === 0 ? (
              <div className="text-center text-gray-500 py-4">등록된 코드 그룹이 없습니다.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>그룹 코드</TableHead>
                    <TableHead>그룹명</TableHead>
                    <TableHead>관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {codeGroups.map((group) => (
                    <TableRow
                      key={group.groupCode}
                      className={selectedGroup?.groupCode === group.groupCode ? "bg-slate-100" : ""}
                    >
                      <TableCell>
                        <div className="flex items-center">
                          <span className="cursor-pointer hover:text-blue-600" onClick={() => handleSelectGroup(group)}>
                            {group.groupCode}
                          </span>
                          {!group.isActive && (
                            <Badge variant="outline" className="ml-2">
                              비활성
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{group.groupName}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditGroupModal(group)}>
                            ✏️
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteGroup(group.groupCode)}>
                            🗑️
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* 상세 코드 목록 */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              {selectedGroup ? `상세 코드 - ${selectedGroup.groupName} (${selectedGroup.groupCode})` : "상세 코드"}
            </CardTitle>
            <Dialog open={isAddingDetail} onOpenChange={setIsAddingDetail}>
              <DialogTrigger asChild>
                <Button size="sm" onClick={openAddDetailModal} disabled={!selectedGroup}>
                  상세 코드 추가
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{isEditingDetail ? "상세 코드 수정" : "상세 코드 추가"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">코드</Label>
                    <Input
                      id="code"
                      name="code"
                      value={newDetailData.code || ""}
                      onChange={handleDetailInputChange}
                      disabled={isEditingDetail}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="codeName">코드명</Label>
                    <Input
                      id="codeName"
                      name="codeName"
                      value={newDetailData.codeName || ""}
                      onChange={handleDetailInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sortOrder">정렬 순서</Label>
                    <Input
                      id="sortOrder"
                      name="sortOrder"
                      type="number"
                      value={newDetailData.sortOrder || 0}
                      onChange={handleDetailInputChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="detailIsActive"
                      checked={newDetailData.isActive}
                      onCheckedChange={handleDetailActiveChange}
                    />
                    <Label htmlFor="detailIsActive">사용 여부</Label>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddingDetail(false)}>
                    취소
                  </Button>
                  <Button onClick={handleSaveDetail} disabled={isLoading}>
                    {isLoading ? "저장 중..." : "저장"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {!selectedGroup ? (
              <div className="text-center text-gray-500 py-4">좌측에서 코드 그룹을 선택해주세요.</div>
            ) : isLoading && codeDetails.length === 0 ? (
              <div className="text-center py-4">로딩 중...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-4">{error}</div>
            ) : codeDetails.length === 0 ? (
              <div className="text-center text-gray-500 py-4">등록된 상세 코드가 없습니다.</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>코드</TableHead>
                    <TableHead>코드명</TableHead>
                    <TableHead>정렬 순서</TableHead>
                    <TableHead>사용 여부</TableHead>
                    <TableHead>관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {codeDetails.map((detail) => (
                    <TableRow key={`${detail.groupCode}-${detail.code}`}>
                      <TableCell>{detail.code}</TableCell>
                      <TableCell>{detail.codeName}</TableCell>
                      <TableCell>{detail.sortOrder}</TableCell>
                      <TableCell>
                        {detail.isActive ? (
                          <Badge variant="success">사용</Badge>
                        ) : (
                          <Badge variant="secondary">비활성</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => openEditDetailModal(detail)}>
                            ✏️
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteDetail(detail.code)}>
                            🗑️
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
