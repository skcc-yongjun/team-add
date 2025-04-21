"use client"

import type React from "react"

// 화면ID: ACS-SCR-002

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { acsService } from "@/api/services/acs"
import { authService } from "@/api/services/auth"
import type { Content, Post } from "@/types/acs"
import type { User } from "@/types/common"

export default function ACSContentManagementPage() {
  const router = useRouter()

  // 사용자 정보
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  // 콘텐츠 관리 상태
  const [activeTab, setActiveTab] = useState("guideline")
  const [contentType, setContentType] = useState<string>("GUIDELINE")
  const [contents, setContents] = useState<Content[]>([])
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)
  const [isAddingContent, setIsAddingContent] = useState(false)
  const [isEditingContent, setIsEditingContent] = useState(false)
  const [contentFormData, setContentFormData] = useState<Partial<Content>>({
    contentType: "GUIDELINE",
    title: "",
    content: "",
    isPublished: true,
  })
  const [contentFiles, setContentFiles] = useState<File[]>([])

  // 게시판 관리 상태
  const [boardType, setBoardType] = useState<string>("NOTICE")
  const [posts, setPosts] = useState<Post[]>([])
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [isEditingPost, setIsEditingPost] = useState(false)
  const [isAnsweringPost, setIsAnsweringPost] = useState(false)
  const [postFormData, setPostFormData] = useState<Partial<Post>>({
    boardType: "NOTICE",
    title: "",
    content: "",
  })
  const [postFiles, setPostFiles] = useState<File[]>([])
  const [answerContent, setAnswerContent] = useState<string>("")

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

  // 탭 변경 시 데이터 로드
  useEffect(() => {
    if (!isAuthorized) return

    if (activeTab === "board") {
      loadPosts(boardType)
    } else {
      // 콘텐츠 유형에 따라 contentType 설정
      let type = "GUIDELINE"
      if (activeTab === "department") type = "DEPARTMENT"
      else if (activeTab === "faq") type = "FAQ"
      else if (activeTab === "material") type = "MATERIAL"

      setContentType(type)
      loadContents(type)
    }
  }, [activeTab, boardType, isAuthorized])

  // 콘텐츠 목록 로드
  const loadContents = async (type: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await acsService.getContents(type)
      setContents(data)
    } catch (err) {
      console.error("Contents load error:", err)
      setError("콘텐츠 목록을 불러오는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 게시글 목록 로드
  const loadPosts = async (type: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await acsService.getPosts(type)
      setPosts(data)
    } catch (err) {
      console.error("Posts load error:", err)
      setError("게시글 목록을 불러오는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 콘텐츠 상세 조회
  const handleContentSelect = async (contentId: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await acsService.getContentDetail(contentId)
      setSelectedContent(data)
    } catch (err) {
      console.error("Content detail error:", err)
      setError("콘텐츠 상세 정보를 불러오는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 게시글 상세 조회
  const handlePostSelect = async (postId: number) => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await acsService.getPostDetail(boardType, postId)
      setSelectedPost(data)
      if (data.answer) {
        setAnswerContent(data.answer)
      }
    } catch (err) {
      console.error("Post detail error:", err)
      setError("게시글 상세 정보를 불러오는 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 콘텐츠 추가 모달 열기
  const openAddContentModal = () => {
    setContentFormData({
      contentType,
      title: "",
      content: "",
      isPublished: true,
    })
    setContentFiles([])
    setIsEditingContent(false)
    setIsAddingContent(true)
  }

  // 콘텐츠 수정 모달 열기
  const openEditContentModal = (content: Content) => {
    setContentFormData({
      contentId: content.contentId,
      contentType: content.contentType,
      title: content.title,
      content: content.content,
      targetId: content.targetId,
      isPublished: content.isPublished,
    })
    setContentFiles([])
    setIsEditingContent(true)
    setIsAddingContent(true)
  }

  // 게시글 추가 모달 열기
  const openAddPostModal = () => {
    setPostFormData({
      boardType,
      title: "",
      content: "",
    })
    setPostFiles([])
    setIsEditingPost(false)
    setIsAddingPost(true)
  }

  // 게시글 수정 모달 열기
  const openEditPostModal = (post: Post) => {
    setPostFormData({
      postId: post.postId,
      boardType: post.boardType,
      title: post.title,
      content: post.content,
    })
    setPostFiles([])
    setIsEditingPost(true)
    setIsAddingPost(true)
  }

  // 게시글 답변 모달 열기
  const openAnswerPostModal = (post: Post) => {
    setSelectedPost(post)
    setAnswerContent(post.answer || "")
    setIsAnsweringPost(true)
  }

  // 콘텐츠 폼 입력 핸들러
  const handleContentInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setContentFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 콘텐츠 공개 여부 변경 핸들러
  const handleContentPublishChange = (checked: boolean) => {
    setContentFormData((prev) => ({ ...prev, isPublished: checked }))
  }

  // 게시글 폼 입력 핸들러
  const handlePostInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPostFormData((prev) => ({ ...prev, [name]: value }))
  }

  // 파일 업로드 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isPost = false) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files)
      if (isPost) {
        setPostFiles(fileList)
      } else {
        setContentFiles(fileList)
      }
    }
  }

  // 콘텐츠 저장 핸들러
  const handleSaveContent = async () => {
    if (!contentFormData.title || !contentFormData.content) {
      setError("제목과 내용은 필수 입력 항목입니다.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 실제 구현에서는 파일 업로드 처리 필요
      // const uploadedFiles = await uploadFiles(contentFiles)

      if (isEditingContent && contentFormData.contentId) {
        await acsService.updateContent(contentFormData.contentId, contentFormData)
        alert("콘텐츠가 수정되었습니다.")
      } else {
        await acsService.createContent(contentFormData)
        alert("콘텐츠가 등록되었습니다.")
      }

      // 목록 새로고침
      loadContents(contentType)
      setIsAddingContent(false)
    } catch (err) {
      console.error("Content save error:", err)
      setError("콘텐츠 저장 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 게시글 저장 핸들러
  const handleSavePost = async () => {
    if (!postFormData.title || !postFormData.content) {
      setError("제목과 내용은 필수 입력 항목입니다.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // 실제 구현에서는 파일 업로드 처리 필요
      // const uploadedFiles = await uploadFiles(postFiles)

      if (isEditingPost && postFormData.postId) {
        await acsService.updatePost(boardType, postFormData.postId, postFormData)
        alert("게시글이 수정되었습니다.")
      } else {
        await acsService.createPost(boardType, postFormData)
        alert("게시글이 등록되었습니다.")
      }

      // 목록 새로고침
      loadPosts(boardType)
      setIsAddingPost(false)
    } catch (err) {
      console.error("Post save error:", err)
      setError("게시글 저장 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 답변 저장 핸들러
  const handleSaveAnswer = async () => {
    if (!selectedPost || !answerContent.trim()) {
      setError("답변 내용을 입력해주세요.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await acsService.saveAnswer(selectedPost.postId, answerContent)
      alert("답변이 등록되었습니다.")

      // 목록 새로고침
      loadPosts(boardType)
      setIsAnsweringPost(false)
    } catch (err) {
      console.error("Answer save error:", err)
      setError("답변 저장 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 콘텐츠 삭제 핸들러
  const handleDeleteContent = async (contentId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return

    setIsLoading(true)
    setError(null)

    try {
      await acsService.deleteContent(contentId)
      alert("콘텐츠가 삭제되었습니다.")

      // 목록 새로고침 및 선택 초기화
      loadContents(contentType)
      setSelectedContent(null)
    } catch (err) {
      console.error("Content delete error:", err)
      setError("콘텐츠 삭제 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  // 게시글 삭제 핸들러
  const handleDeletePost = async (postId: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return

    setIsLoading(true)
    setError(null)

    try {
      await acsService.deletePost(boardType, postId)
      alert("게시글이 삭제되었습니다.")

      // 목록 새로고침 및 선택 초기화
      loadPosts(boardType)
      setSelectedPost(null)
    } catch (err) {
      console.error("Post delete error:", err)
      setError("게시글 삭제 중 오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthorized) {
    return <div className="container mx-auto py-6">권한을 확인하는 중입니다...</div>
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-2xl font-bold">ACS 콘텐츠 관리</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="guideline">모집 요강</TabsTrigger>
          <TabsTrigger value="department">학과 정보</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="material">입시 자료</TabsTrigger>
          <TabsTrigger value="board">게시판 관리</TabsTrigger>
        </TabsList>

        {/* 콘텐츠 관리 탭 (모집 요강, 학과 정보, FAQ, 입시 자료) */}
        {(activeTab === "guideline" ||
          activeTab === "department" ||
          activeTab === "faq" ||
          activeTab === "material") && (
          <TabsContent value={activeTab} className="space-y-4 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>
                    {activeTab === "guideline"
                      ? "모집 요강 관리"
                      : activeTab === "department"
                        ? "학과 정보 관리"
                        : activeTab === "faq"
                          ? "FAQ 관리"
                          : "입시 자료 관리"}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "guideline"
                      ? "모집 요강 정보를 관리합니다."
                      : activeTab === "department"
                        ? "학과 정보를 관리합니다."
                        : activeTab === "faq"
                          ? "자주 묻는 질문을 관리합니다."
                          : "입시 관련 자료를 관리합니다."}
                  </CardDescription>
                </div>
                <Dialog open={isAddingContent} onOpenChange={setIsAddingContent}>
                  <DialogTrigger asChild>
                    <Button onClick={openAddContentModal}>
                      {activeTab === "guideline"
                        ? "모집 요강 추가"
                        : activeTab === "department"
                          ? "학과 정보 추가"
                          : activeTab === "faq"
                            ? "FAQ 추가"
                            : "자료 추가"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{isEditingContent ? "콘텐츠 수정" : "콘텐츠 추가"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">제목</Label>
                        <Input
                          id="title"
                          name="title"
                          value={contentFormData.title || ""}
                          onChange={handleContentInputChange}
                        />
                      </div>
                      {activeTab === "department" && (
                        <div className="space-y-2">
                          <Label htmlFor="targetId">학과 코드</Label>
                          <Input
                            id="targetId"
                            name="targetId"
                            value={contentFormData.targetId || ""}
                            onChange={handleContentInputChange}
                          />
                        </div>
                      )}
                      {activeTab === "guideline" && (
                        <div className="space-y-2">
                          <Label htmlFor="targetId">모집 시기/전형 코드</Label>
                          <Input
                            id="targetId"
                            name="targetId"
                            value={contentFormData.targetId || ""}
                            onChange={handleContentInputChange}
                          />
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="content">내용</Label>
                        <Textarea
                          id="content"
                          name="content"
                          rows={10}
                          value={contentFormData.content || ""}
                          onChange={handleContentInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="files">첨부 파일</Label>
                        <Input id="files" type="file" multiple onChange={(e) => handleFileChange(e)} />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="isPublished"
                          checked={contentFormData.isPublished}
                          onCheckedChange={handleContentPublishChange}
                        />
                        <Label htmlFor="isPublished">공개 여부</Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingContent(false)}>
                        취소
                      </Button>
                      <Button onClick={handleSaveContent} disabled={isLoading}>
                        {isLoading ? "저장 중..." : "저장"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {isLoading && contents.length === 0 ? (
                  <div className="text-center py-4">로딩 중...</div>
                ) : contents.length === 0 ? (
                  <div className="text-center py-4">등록된 콘텐츠가 없습니다.</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>제목</TableHead>
                        <TableHead>마지막 수정일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>관리</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contents.map((content) => (
                        <TableRow key={content.contentId}>
                          <TableCell>
                            <div
                              className="cursor-pointer hover:text-blue-600"
                              onClick={() => handleContentSelect(content.contentId)}
                            >
                              {content.title}
                            </div>
                          </TableCell>
                          <TableCell>{new Date(content.updatedAt).toLocaleString()}</TableCell>
                          <TableCell>
                            {content.isPublished ? (
                              <Badge variant="success">공개</Badge>
                            ) : (
                              <Badge variant="secondary">비공개</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" onClick={() => openEditContentModal(content)}>
                                수정
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleDeleteContent(content.contentId)}
                              >
                                삭제
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {selectedContent && (
                  <div className="mt-6 p-4 border rounded-md">
                    <h3 className="text-xl font-bold mb-4">{selectedContent.title}</h3>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{ __html: selectedContent.content }}
                    ></div>
                    {selectedContent.attachments && selectedContent.attachments.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-medium mb-2">첨부 파일</h4>
                        <ul className="space-y-1">
                          {selectedContent.attachments.map((file) => (
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
        )}

        {/* 게시판 관리 탭 */}
        <TabsContent value="board" className="space-y-4 mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>게시판 관리</CardTitle>
                <CardDescription>공지사항, Q&A 등의 게시판을 관리합니다.</CardDescription>
              </div>
              <div className="flex space-x-4">
                <Select value={boardType} onValueChange={setBoardType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="게시판 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NOTICE">공지사항</SelectItem>
                    <SelectItem value="QNA">Q&A</SelectItem>
                    <SelectItem value="FAQ">FAQ</SelectItem>
                  </SelectContent>
                </Select>
                <Dialog open={isAddingPost} onOpenChange={setIsAddingPost}>
                  <DialogTrigger asChild>
                    <Button onClick={openAddPostModal}>글쓰기</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{isEditingPost ? "게시글 수정" : "게시글 작성"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="postTitle">제목</Label>
                        <Input
                          id="postTitle"
                          name="title"
                          value={postFormData.title || ""}
                          onChange={handlePostInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postContent">내용</Label>
                        <Textarea
                          id="postContent"
                          name="content"
                          rows={10}
                          value={postFormData.content || ""}
                          onChange={handlePostInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postFiles">첨부 파일</Label>
                        <Input id="postFiles" type="file" multiple onChange={(e) => handleFileChange(e, true)} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddingPost(false)}>
                        취소
                      </Button>
                      <Button onClick={handleSavePost} disabled={isLoading}>
                        {isLoading ? "저장 중..." : "저장"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {error && <p className="text-red-500 mb-4">{error}</p>}

              {isLoading && posts.length === 0 ? (
                <div className="text-center py-4">로딩 중...</div>
              ) : posts.length === 0 ? (
                <div className="text-center py-4">등록된 게시글이 없습니다.</div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>번호</TableHead>
                      <TableHead>제목</TableHead>
                      <TableHead>작성자</TableHead>
                      <TableHead>작성일</TableHead>
                      <TableHead>조회수</TableHead>
                      {boardType === "QNA" && <TableHead>답변 상태</TableHead>}
                      <TableHead>관리</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {posts.map((post) => (
                      <TableRow key={post.postId}>
                        <TableCell>{post.postId}</TableCell>
                        <TableCell>
                          <div
                            className="cursor-pointer hover:text-blue-600"
                            onClick={() => handlePostSelect(post.postId)}
                          >
                            {post.title}
                          </div>
                        </TableCell>
                        <TableCell>{post.author}</TableCell>
                        <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{post.viewCount}</TableCell>
                        {boardType === "QNA" && (
                          <TableCell>
                            {post.isAnswered ? (
                              <Badge variant="success">답변 완료</Badge>
                            ) : (
                              <Badge variant="secondary">대기 중</Badge>
                            )}
                          </TableCell>
                        )}
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => openEditPostModal(post)}>
                              수정
                            </Button>
                            {boardType === "QNA" && !post.isAnswered && (
                              <Button variant="ghost" size="sm" onClick={() => openAnswerPostModal(post)}>
                                답변
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500"
                              onClick={() => handleDeletePost(post.postId)}
                            >
                              삭제
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}

              {selectedPost && (
                <div className="mt-6 p-4 border rounded-md">
                  <h3 className="text-xl font-bold mb-2">{selectedPost.title}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div>작성자: {selectedPost.author}</div>
                    <div>작성일: {new Date(selectedPost.createdAt).toLocaleString()}</div>
                  </div>
                  <div
                    className="prose max-w-none mb-4"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  ></div>
                  {selectedPost.attachments && selectedPost.attachments.length > 0 && (
                    <div className="mt-4 mb-4">
                      <h4 className="font-medium mb-2">첨부 파일</h4>
                      <ul className="space-y-1">
                        {selectedPost.attachments.map((file) => (
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

                  {boardType === "QNA" && selectedPost.isAnswered && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">답변</h4>
                      <div dangerouslySetInnerHTML={{ __html: selectedPost.answer || "" }}></div>
                    </div>
                  )}
                </div>
              )}

              {/* Q&A 답변 모달 */}
              <Dialog open={isAnsweringPost} onOpenChange={setIsAnsweringPost}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Q&A 답변 등록</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <h4 className="font-medium mb-2">질문</h4>
                      <p>{selectedPost?.title}</p>
                      <div
                        className="mt-2 text-sm"
                        dangerouslySetInnerHTML={{ __html: selectedPost?.content || "" }}
                      ></div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="answer">답변 내용</Label>
                      <Textarea
                        id="answer"
                        rows={8}
                        value={answerContent}
                        onChange={(e) => setAnswerContent(e.target.value)}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAnsweringPost(false)}>
                      취소
                    </Button>
                    <Button onClick={handleSaveAnswer} disabled={isLoading}>
                      {isLoading ? "저장 중..." : "답변 등록"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
