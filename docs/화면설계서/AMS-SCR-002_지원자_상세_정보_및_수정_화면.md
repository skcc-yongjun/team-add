# 지원자 상세 정보 및 수정 화면 (AMS-SCR-002)

## 사용 역할자: 입학처 담당자, 시스템 관리자

---

## 기능 1: 지원자 상세 정보 조회

-   **관련 요구사항:** CMN-REQ-001, AMS-REQ-001 (수정을 위한 조회)
-   **입력 정보:** 화면 로드 시 `applicationId` (URL 파라미터 또는 이전 화면에서 전달받음).
-   **출력 정보:**
    -   지원자 기본 정보 섹션: 수험번호, 이름, 생년월일, 연락처, 이메일 등.
    -   지원 정보 섹션: 모집 시기, 전형 유형, 모집 단위, 지원 일시, 현재 상태.
    -   지원서 내용 섹션: 자기소개서, 학업 계획 등 지원서 작성 항목 (읽기 전용).
    -   제출 서류 목록 섹션: 제출된 서류명, 파일 링크/미리보기, 제출 일시, 검증 상태 (AMS-REQ-010 관련).
    -   평가 진행 현황 섹션: 서류 평가 점수, 면접 평가 점수, 실기 평가 점수 등 (AMS-REQ-006, AMS-REQ-008 관련).
    -   납부 정보 섹션 (해당 시): 전형료 납부 여부, 등록금 납부 상태 (AMS-REQ-020, AMS-REQ-026 관련).
-   **프로세스 설명:**
    1.  화면이 로드될 때, 전달받은 `applicationId`를 사용하여 상세 정보 조회 API를 호출한다.
    2.  서버는 해당 지원자의 모든 관련 정보(기본 정보, 지원 내용, 서류, 평가 결과, 납부 상태 등)를 DB에서 조회하여 반환한다.
    3.  클라이언트는 수신된 데이터를 각 섹션에 맞게 표시한다.
-   **호출 API 정보:**
    -   HTTP 메서드: GET
    -   API 엔드포인트: `/api/ams/applications/{applicationId}`
    -   API 목적: 특정 지원자의 모든 상세 정보 조회
    -   요청 파라미터 (Path Variable): `applicationId` (long)
    -   응답 파라미터:
        ```json
        {
          "applicantInfo": { // APPLICANT 테이블 정보
            "applicantId": "2024S0001",
            "name": "홍길동", ...
          },
          "applicationInfo": { // APPLICATION 테이블 정보
            "applicationId": 1001,
            "admissionRound": "2024 수시", ...
            "applicationData": { "자기소개서": "...", "학업계획": "..." }
          },
          "documents": [ // APP_DOCUMENT 정보
            {"documentType": "학생부", "fileName": "student_record.pdf", "verified": true, ...}
          ],
          "evaluations": [ // EVALUATION 정보
            {"evaluationStage": "서류", "totalScore": 85.5, ...},
            {"evaluationStage": "면접", "status": "결시", ...}
          ],
          "paymentInfo": { // PAYMENT 정보 (nullable)
            "paymentStatus": "완료", ...
          }
        }
        ```
-   **Mockup 데이터 예시:**
    -   입력 (URL): `/ams/applicants/1001`
    -   출력: 상기 응답 구조의 데이터가 화면 각 섹션에 표시됨.

## 기능 2: 접수 데이터 수정 (인적사항 등)

-   **관련 요구사항:** AMS-REQ-001: 접수 데이터 검증·수정·보정
-   **입력 정보:**
    -   수정할 필드에 새로운 값 입력 (예: 연락처, 주소, 이메일 등 편집 가능한 필드).
    -   '저장' 또는 '수정 완료' 버튼 클릭.
-   **출력 정보:**
    -   수정 성공 시: "수정되었습니다." 메시지 표시 및 화면의 해당 정보 업데이트.
    -   수정 실패 시: 오류 메시지 표시 (예: "연락처 형식이 올바르지 않습니다.").
-   **프로세스 설명:**
    1.  사용자가 상세 정보 화면에서 '수정 모드'로 전환하거나, 편집 가능한 필드를 직접 수정한다.
    2.  수정할 내용을 입력하고 '저장' 버튼을 클릭한다.
    3.  클라이언트는 수정된 필드와 해당 지원자의 `applicationId`를 포함하여 수정 API를 호출한다.
    4.  서버는 입력값 유효성 검사 후 DB 데이터를 업데이트한다. (변경 이력 로그 기록 고려)
    5.  성공/실패 결과를 클라이언트에 반환하고, 클라이언트는 결과에 따라 메시지를 표시하고 화면을 갱신한다.
-   **호출 API 정보:**
    -   HTTP 메서드: PUT 또는 PATCH
    -   API 엔드포인트: `/api/ams/applications/{applicationId}/personal-info` (예시: 인적 정보 수정 분리)
    -   API 목적: 지원자의 특정 정보 수정
    -   요청 파라미터 (Path Variable): `applicationId`
    -   요청 파라미터 (Body): 수정할 필드와 값
        ```json
        {
          "phoneNumber": "010-9876-5432",
          "email": "gildong.new@email.com"
        }
        ```
    -   응답 파라미터 (Success):
        ```json
        { "success": true, "message": "수정되었습니다." }
        ```
    -   응답 파라미터 (Fail):
        ```json
        { "success": false, "errorCode": "VALIDATION_ERROR", "errorMessage": "이메일 형식이 올바르지 않습니다." }
        ```
-   **Mockup 데이터 예시:**
    -   입력 (PUT `/api/ams/applications/1001/personal-info`): 상기 요청 Body
    -   출력 (성공): 상기 성공 응답, 화면의 연락처/이메일 업데이트됨.

## 기능 3: 제출 서류 검증 상태 변경

-   **관련 요구사항:** AMS-REQ-001 (서류 검증 포함), AMS-REQ-010
-   **입력 정보:** 제출 서류 목록에서 특정 서류의 '검증' 버튼 또는 '검증 상태' 변경 드롭다운 선택 (예: 미검증 -> 확인 완료).
-   **출력 정보:** 해당 서류의 검증 상태가 화면에 업데이트됨. 성공/실패 메시지 표시.
-   **프로세스 설명:**
    1.  담당자가 제출된 서류를 확인하고, 해당 서류의 검증 상태를 변경한다.
    2.  클라이언트는 변경된 상태값과 해당 서류 ID(`documentId`), 지원자 ID(`applicationId`)를 API로 전송한다.
    3.  서버는 DB의 `APP_DOCUMENT` 테이블에서 해당 서류의 `is_verified` 상태를 업데이트한다.
    4.  결과를 클라이언트에 반환하고, 클라이언트는 화면을 갱신한다.
-   **호출 API 정보:**
    -   HTTP 메서드: PUT 또는 PATCH
    -   API 엔드포인트: `/api/ams/applications/{applicationId}/documents/{documentId}/verify`
    -   API 목적: 제출 서류의 검증 상태 변경
    -   요청 파라미터 (Path Variables): `applicationId`, `documentId`
    -   요청 파라미터 (Body):
        ```json
        { "verified": true }
        ```
    -   응답 파라미터: 성공/실패 정보
-   **Mockup 데이터 예시:**
    -   입력 (PUT `/api/ams/applications/1001/documents/505/verify`): `{ "verified": true }`
    -   출력: 해당 서류 옆에 "확인 완료" 표시, 성공 메시지.

## 기능 4: 지원서 출력

-   **관련 요구사항:** AMS-REQ-002: 지원서 출력
-   **입력 정보:** '지원서 출력' 버튼 클릭.
-   **출력 정보:** 해당 지원자의 지원서가 PDF 등으로 생성되어 다운로드/표시됨.
-   **프로세스 설명:** (AMS-SCR-001의 기능 4와 유사하나 단일 지원자에 대한 처리)
    1.  사용자가 '지원서 출력' 버튼을 클릭한다.
    2.  클라이언트는 현재 지원자의 `applicationId`를 사용하여 출력 API를 호출한다.
    3.  서버는 지원서 파일을 생성하여 반환한다.
    4.  클라이언트는 파일을 다운로드하거나 새 탭에서 연다.
-   **호출 API 정보:**
    -   HTTP 메서드: GET
    -   API 엔드포인트: `/api/ams/applications/{applicationId}/print`
    -   API 목적: 특정 지원자의 지원서 파일 생성 및 반환
    -   요청 파라미터 (Path Variable): `applicationId`
    -   응답 파라미터: PDF 파일 스트림 또는 파일 URL.
-   **Mockup 데이터:** 없음 (파일 출력)

---

