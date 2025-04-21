import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">통합 입학 관리 시스템</h1>
        <p className="text-xl text-muted-foreground">
          대학 입학 전형의 전 과정을 효율적이고 체계적으로 관리하는 통합 솔루션
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>입학관리시스템 (AMS)</CardTitle>
            <CardDescription>
              원서 접수, 데이터 검증, 평가 관리, 사정 관리, 합격자 관리 등 입학 전형의 핵심 프로세스 관리
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/AMS">
              <Button className="w-full">바로가기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>면접·실기 평가시스템 (IES)</CardTitle>
            <CardDescription>면접 및 실기고사 출석 관리, 평가 진행, 결과 집계 등 현장 평가 업무 지원</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/IES">
              <Button className="w-full">바로가기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>녹취·충원관리 시스템 (RFS)</CardTitle>
            <CardDescription>
              충원 합격 대상자 대상 전화 녹취, SMS 발송, 충원 현황 관리 등 충원 업무 지원
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/RFS">
              <Button className="w-full">바로가기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>입학상담 솔루션 (ACS)</CardTitle>
            <CardDescription>
              모집 요강 정보 제공, 성적 기반 맞춤 상담, 상담 통계 관리 등 대외 상담 업무 지원
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/ACS">
              <Button className="w-full">바로가기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>등록금 수납·환불 시스템 (FRS)</CardTitle>
            <CardDescription>
              가상계좌 기반 실시간 등록금 수납 및 환불 처리, 금융기관 연계 등 재무 관련 업무 지원
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/FRS">
              <Button className="w-full">바로가기</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>공통 (CMN)</CardTitle>
            <CardDescription>
              시스템 전반에서 사용되는 공통 기능 (예: 수험생 데이터 조회, 공통 코드 관리 등) 제공
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/CMN/applicant">
              <Button className="w-full">바로가기</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
