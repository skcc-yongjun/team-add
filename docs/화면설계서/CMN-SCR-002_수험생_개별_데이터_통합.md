# 수험생 개별 데이터 통합 (CMN-SCR-002)

## 사용 역할자: 입학처 담당자, 시스템 관리자 (권한에 따라 접근)

---

## 기능 1: 수험생 정보 통합 검색 및 조회

-   **관련 요구사항:** CMN-REQ-001: 수험생 개별 데이터 조회
-   **입력 정보:**
    -   검색 키워드 입력 필드 (수험번호, 이름, 연락처, 주민번호 앞자리 등 다양한 식별자 지원).
    -   '검색' 버튼 클릭.
-   **출력 정보:**
    -   검색 결과 목록 (일치하는 수험생 리스트 - 수험번호, 이름, 생년월일).
    -   목록에서 특정 수험생 선택 시, 해당 수험생의 통합 정보 표시 영역:
        -   기본 인적 사항 (APPLICANT)
        -   모든 지원 이력 (APPLICATION - 여러 시기/전형/학과 지원 내역)
        -   각 지원 건별 상태 (접수, 평가, 사정 결과, 등록, 환불 등 - ADMISSION\_DECISION, PAYMENT, REFUND)
        -   주요 평가 결과 요약 (EVALUATION)
        -   충원 관련 통화 이력 요약 (RECRUITMENT\_LOG)
        -   상담 이력 요약 (COUNSELING\_LOG)
-   **프로세스 설명:**
    1.  사용자가 수험생 식별 정보를 입력하고 검색한다.
    2.  클라이언트는 검색 키워드를 공통 조회 API로 전송한다.
    3.  서버(CMN 서비스)는 해당 키워드로 `APPLICANT` 테이블 등에서 수험생을 찾는다.
    4.  검색 결과 목록을 반환하여 클라이언트가 표시한다.
    5.  사용자가 목록에서 특정 수험생을 선택하면, 클라이언트는 해당 수험생의 고유 ID(applicantId 등)를 사용하여 상세 통합 정보 조회 API를 호출한다.
    6.  서버(CMN 서비스)는 이 ID를 기반으로 관련된 모든 시스템(AMS, IES 결과 요약, RFS 로그 요약, ACS 로그 요약, FRS 상태)의 데이터를 조회하여 종합적인 정보를 구성하고 반환한다. (각 서비스의 API를 내부적으로 호출하거나, 통합 DB 직접 조회 - 아키텍처에 따라 결정)
    7.  클라이언트는 수신된 통합 정보를 구조화하여 화면에 표시한다.
-   **호출 API 정보:**
    -   수험생 검색 API:
        -   HTTP 메서드: GET
        -   API 엔드포인트: `/api/cmn/applicants/search`
        -   요청 파라미터: `keywordType`, `keyword`
        -   응답 파라미터: 검색 결과 목록 (기본 정보)
    -   수험생 통합 상세 조회 API:
        -   HTTP 메서드: GET
        -   API 엔드포인트: `/api/cmn/applicants/{applicantId}/details` (또는 다른 고유 식별자 사용)
        -   API 목적: 특정 수험생의 모든 관련 정보 통합 조회
        -   요청 파라미터 (Path Variable): `applicantId`
        -   응답 파라미터: 매우 포괄적인 JSON 구조 (각 시스템 정보 포함)
            ```json
            {
              "basicInfo": { ... }, // Applicant 정보
              "applicationHistory": [ // Application + AdmissionDecision + Payment/Refund 정보 요약
                { "applicationId": 1001, "round": "2024S", "type": "COMP", "dept": "CS", "status": "등록완료", ... },
                { "applicationId": 1088, "round": "2024S", "type": "SUBJ", "dept": "KOR", "status": "환불완료", ... }
              ],
              "evaluationSummary": { ... }, // 주요 평가 점수 요약
              "recruitmentLogs": [ ... ], // RFS 통화 기록 요약
              "counselingLogs": [ ... ] // ACS 상담 기록 요약
            }
            ```
-   **Mockup 데이터 예시:**
    -   입력: '홍길동' 검색 -> 목록에서 '홍길동(2024S0001)' 선택.
    -   출력: 홍길동 학생의 모든 지원 이력, 현재 상태, 평가/통화/상담 이력 등이 한 화면에 종합적으로 표시됨.

---

