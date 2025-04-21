---

[SYSTEM FLOW – ROLE-BASED EXECUTION PATHS]

---

**[FOR: 수험생 (Applicant)]**

*   **주요 활동:** 원서 접수, 지원 상태 확인, 합격 확인, 등록금 납부, 환불 신청, 입학 상담 이용

[Flow Sequence - 원서 접수]
1.  [FOR: 수험생] 입학 시스템 웹사이트 접속 및 로그인 (최초 지원 시 회원가입 필요).
2.  [FOR: 수험생] 원서 접수 메뉴 선택 및 모집 시기/전형/모집단위 선택.
3.  [FOR: 수험생] 개인정보, 학력 정보, 연락처 등 원서 내용 입력 (AMS-REQ-001 기반).
4.  [FOR: 수험생] 필요한 경우, 자기소개서 등 추가 서류 입력/파일 업로드.
5.  [FOR: 수험생] 입력 내용 최종 확인 및 제출.
6.  [FOR: 시스템] 데이터 유효성 검증 (AMS-REQ-001).
7.  [FOR: 시스템] 검증 실패 시, 오류 메시지와 함께 수정 요청 [FOR: 수험생].
8.  [FOR: 시스템] 검증 성공 시, 접수 완료 처리 및 접수번호 발급 [FOR: 수험생].
9.  [FOR: 수험생] 지원서 출력 (AMS-REQ-002).

[Flow Sequence - 지원 상태 및 합격 확인]
1.  [FOR: 수험생] 시스템 로그인.
2.  [FOR: 수험생] 나의 지원 현황 메뉴 조회 (CMN-REQ-001 기반).
3.  [FOR: 수험생] 서류 제출 확인, 평가 진행 상태 등 단계별 현황 확인.
4.  [FOR: 수험생] 합격자 발표 기간 내 합격 여부 조회 (AMS-REQ-017).
5.  [FOR: 수험생] 합격 시 합격증 등 관련 출력물 확인/출력 (AMS-REQ-018).

[Flow Sequence - 등록금 납부]
1.  [FOR: 수험생] 합격 확인 후 등록금 고지서 확인/출력 (AMS-REQ-021).
2.  [FOR: 수험생] 고지서 상의 가상계좌로 등록금 입금 (FRS-REQ-002).
3.  [FOR: 시스템] 실시간 입금 확인 (금융기관 연동, FRS-REQ-001).
4.  [FOR: 시스템] 입금 확인 시 수험생에게 SMS 통보 (FRS-REQ-001).
5.  [FOR: 수험생] 시스템 로그인하여 납부 완료 상태 확인.

[Flow Sequence - 등록금 환불 신청]
1.  [FOR: 수험생] 시스템 로그인 및 등록금 환불 신청 메뉴 접근.
2.  [FOR: 수험생] 환불 사유 및 환불받을 계좌 정보 입력 후 신청 (FRS-REQ-003).
3.  [FOR: 시스템] 환불 신청 접수 및 DB 기록, 담당자 알림 (FRS-REQ-003).
4.  [FOR: 수험생] 환불 처리 상태 조회.

[Flow Sequence - 입학 상담]
1.  [FOR: 수험생] 입학상담 솔루션(ACS) 접속.
2.  [FOR: 수험생] 모집요강, 학과 정보 등 조회 (ACS-REQ-001, ACS-REQ-003).
3.  [FOR: 수험생] 성적 입력 화면 통해 본인 성적 입력 (ACS-REQ-002).
4.  [FOR: 수험생] 성적 기반 맞춤 상담 정보 확인 또는 상담 신청 (ACS-REQ-004).
5.  [FOR: 수험생] 성적 시각화 자료 확인 (ACS-REQ-005).

[Component Interaction]
*   [FOR: 수험생] → Frontend (UI_AMS, UI_ACS, UI_FRS) → API Gateway
*   API Gateway → Backend Services (SVC_AMS, SVC_ACS, SVC_FRS, SVC_CMN)
*   Backend Services → DB (Admissions DB)
*   Backend Services (SVC_FRS) → External (EXT_BANK for payment/refund, EXT_SMS for notifications)

[Data Flow - 원서 접수]
*   [FOR: 수험생] 입력: 로그인 정보, 지원 정보(전형, 학과 등), 개인정보, 학력, 서류 파일
*   처리: 데이터 유효성 검증, 고유 식별자 확인 (중복 지원 방지), 데이터 형식 변환/보정
*   저장/출력: APPLICATION, APPLICANT, APP_DOCUMENT 테이블 저장, 접수번호 생성, 지원서 출력 데이터 생성

[Data Flow - 합격 확인]
*   [FOR: 수험생] 입력: 로그인 정보, 조회 요청
*   처리: 지원자 ID 기반 ADMISSION_DECISION 테이블 조회
*   저장/출력: 합격 여부, 예비 순위, 합격증 데이터 반환

[Data Flow - 등록금 납부]
*   [FOR: 수험생] 입력: (외부) 은행 시스템 통해 가상계좌로 입금
*   처리: (FRS) 금융기관 Callback 수신, 입금 정보 검증, PAYMENT 테이블 상태 업데이트, AMS 시스템에 상태 전송, SMS 발송 요청
*   저장/출력: PAYMENT 테이블 업데이트, SMS_LOG 저장, 납부 완료 상태 [FOR: 수험생] 확인 가능

[Data Flow - 환불 신청]
*   [FOR: 수험생] 입력: 로그인 정보, 환불 사유, 환불 계좌
*   처리: REFUND 테이블에 신청 정보 저장, 환불 상태 '신청'으로 변경
*   저장/출력: REFUND 테이블 저장, 신청 접수 확인 메시지 [FOR: 수험생]

---

**[FOR: 입학처 담당자 (Admissions Officer)]**

*   **주요 활동:** 시스템 전반 관리, 데이터 업로드/다운로드/검증/보정, 평가/사정/합격/등록 관리, 통계/출력물 생성, 시스템 환경 설정, IES/RFS/ACS 관리 기능 수행

[Flow Sequence - 지원 데이터 관리]
1.  [FOR: 입학처 담당자] 시스템 로그인 (AMS).
2.  [FOR: 입학처 담당자] 지원자 리스트 조회 (AMS-REQ-005).
3.  [FOR: 입학처 담당자] 학생부/수능 데이터 업로드 (AMS-REQ-003, AMS-REQ-004).
4.  [FOR: 시스템] 업로드 데이터 형식/내용 검증. 오류 시 보고.
5.  [FOR: 입학처 담당자] 검증 결과 확인 및 오류 데이터 수정/보정 (AMS-REQ-001).
6.  [FOR: 입학처 담당자] 필요한 경우, 데이터 다운로드.

[Flow Sequence - 평가/사정 관리]
1.  [FOR: 입학처 담당자] 평가 관리 메뉴 접근 (AMS).
2.  [FOR: 입학처 담당자] 수능/학생부 기반 평가 기준 설정/관리 (AMS-REQ-006).
3.  [FOR: 입학처 담당자] 제출서류 평가요소 설정/관리 (AMS-REQ-007).
4.  [FOR: 입학처 담당자] 면접/실기 평가요소 설정/관리 (AMS-REQ-009).
5.  [FOR: 입학처 담당자] (IES 시스템 연동 후) 평가 결과 확인 및 보정 (AMS-REQ-008).
6.  [FOR: 입학처 담당자] 평가요소별 배점 기준 설정/관리 (AMS-REQ-011).
7.  [FOR: 입학처 담당자] 사정 단계별 점검 수행 (AMS-REQ-012).
8.  [FOR: 입학처 담당자] 점수 자동 계산 로직 실행 및 최종 배점 적용 확인 (AMS-REQ-013).
9.  [FOR: 입학처 담당자] 사정 결과 데이터 및 관련 출력물 생성/관리 (AMS-REQ-014).

[Flow Sequence - 합격/등록 관리]
1.  [FOR: 입학처 담당자] 사정 결과 기반 합격자 데이터 확정 (AMS-REQ-015).
2.  [FOR: 입학처 담당자] 필요한 경우 합격자 데이터 수정/보정 (AMS-REQ-015).
3.  [FOR: 입학처 담당자] 합격자 발표 설정 (일시, 방식 등) 및 개별 발표 기능 활성화 (AMS-REQ-017).
4.  [FOR: 입학처 담당자] 등록 업무 사전 데이터 가공 및 확인 (AMS-REQ-016).
5.  [FOR: 입학처 담당자] 등록금 데이터 확인/관리 (타 시스템 연동 확인) (AMS-REQ-020).
6.  [FOR: 입학처 담당자] 등록금 고지서 생성 로직 실행 및 확인 (AMS-REQ-021).
7.  [FOR: 입학처 담당자] 등록/환불/충원 관련 명부 조회 및 관리 (AMS-REQ-023).
8.  [FOR: 입학처 담당자] 장학 대상자 정보 연계 및 관리 (AMS-REQ-025).
9.  [FOR: 입학처 담당자] 미달 시 이월 선발 처리 로직 실행 및 확인 (AMS-REQ-019).
10. [FOR: 입학처 담당자] 추가모집 관련 업무 설정 및 지원 (AMS-REQ-024).

[Flow Sequence - IES 환경 설정 및 관리]
1.  [FOR: 입학처 담당자] IES 시스템 로그인.
2.  [FOR: 입학처 담당자] 모집시기/전형별 환경 설정 (평가항목, 배점 등) (IES-REQ-006).
3.  [FOR: 입학처 담당자] AMS에서 수험생/평가자 데이터 가져오기(Import) 및 명단 관리 (IES-REQ-007).
4.  [FOR: 입학처 담당자] 실기 평가위원 정보 관리 (IES-REQ-005).
5.  [FOR: 입학처 담당자] 출석 진행요원 정보 관리 (IES-REQ-004).
6.  [FOR: 입학처 담당자] 평가 종료 후, 평가 결과 확인 및 AMS로 전송 (IES-REQ-014 연계).
7.  [FOR: 입학처 담당자] 각종 출력물(확인대장, 명단, 조배정표, 결과표) 생성/관리 (IES-REQ-013, IES-REQ-014).
8.  [FOR: 입학처 담당자] 면접/실기 평가 통계 및 보고서 생성 (IES-REQ-015).

[Flow Sequence - RFS 관리 및 충원]
1.  [FOR: 입학처 담당자] RFS 시스템 로그인.
2.  [FOR: 입학처 담당자] 전형/차수별 충원 서비스 생성 및 설정 (RFS-REQ-006).
3.  [FOR: 입학처 담당자] AMS에서 충원 대상자 데이터 가져오기 (RFS-REQ-001). 필요시 수동 업로드/수정 (RFS-REQ-007).
4.  [FOR: 입학처 담당자] 충원 대상자 명부 (배수 설정) 출력 (RFS-REQ-010).
5.  [FOR: 입학처 담당자] 상담사에게 충원 업무 지시 및 진행 상황 모니터링.
6.  [FOR: 입학처 담당자] 교차 충원 발생 시 자동 인원 조정 결과 확인 (RFS-REQ-011).
7.  [FOR: 입학처 담당자] 당일 충원 인원 비교 통합표 조회 (RFS-REQ-012).
8.  [FOR: 입학처 담당자] 모집단위/전형/차수별 통계 조회 및 다운로드 (RFS-REQ-009).
9.  [FOR: 입학처 담당자] 등록/환불 기간 설정 관리 (RFS-REQ-014).
10. [FOR: 입학처 담당자] 학과별 로그인 조회 제한 설정 (RFS-REQ-013).

[Flow Sequence - ACS 관리]
1.  [FOR: 입학처 담당자] ACS 시스템 로그인 (관리자 계정).
2.  [FOR: 입학처 담당자] 모집요강, 학과 정보 등 상담 자료 업로드/수정/관리 (ACS-REQ-007).
3.  [FOR: 입학처 담당자] 공지사항 등 게시판 관리 (ACS-REQ-008).
4.  [FOR: 입학처 담당자] 상담 DB 조회 및 관리 (ACS-REQ-009).
5.  [FOR: 입학처 담당자] 상담 사용 통계 조회 (ACS-REQ-006).

[Flow Sequence - 학사 이관]
1.  [FOR: 입학처 담당자] 최종 등록 마감 후 학사 이관 메뉴 접근 (AMS).
2.  [FOR: 입학처 담당자] 학번 부여 로직 실행 (AMS-REQ-027).
3.  [FOR: 입학처 담당자] 학사 시스템 연계 데이터 생성 및 검증 (AMS-REQ-027).
4.  [FOR: 입학처 담당자] 학사 시스템으로 데이터 전송 실행 (AMS-REQ-027).
5.  [FOR: 시스템] 전송 성공/실패 결과 확인. 실패 시 재처리 또는 수동 조치.
6.  [FOR: 입학처 담당자] 최종 보고용 통계 및 출력물 생성/관리 (AMS-REQ-028).

[Component Interaction]
*   [FOR: 입학처 담당자] → Frontend (UI_AMS, UI_IES, UI_RFS, UI_ACS) → API Gateway
*   API Gateway → Backend Services (SVC_AMS, SVC_IES, SVC_RFS, SVC_ACS, SVC_CMN)
*   Backend Services → DB (Admissions DB)
*   Backend Services (SVC_AMS) → External (EXT_EDU, EXT_KICE for data import, EXT_SIS for transfer)
*   Backend Services (SVC_IES, SVC_RFS, SVC_ACS) → SVC_AMS (for data exchange)

[Data Flow - 평가/사정 관리]
*   [FOR: 입학처 담당자] 입력: 평가 기준 설정값, 배점 비율, 평가 결과 데이터(IES 연동), 사정 관련 설정
*   처리: 기준에 따른 점수 계산, 평가 결과 집계, 사정 로직 실행 (점수 합산, 순위 결정), 최종 점수 및 합격 여부 판정
*   저장/출력: EVALUATION, ADMISSION_DECISION 테이블 업데이트, 사정 결과 리포트 생성, 합격자 명단 데이터 생성

[Data Flow - 학사 이관]
*   [FOR: 입학처 담당자] 입력: 최종 등록자 명단 조회 조건, 학번 부여 규칙 설정
*   처리: 등록 완료된 APPLICANT/APPLICATION 데이터 조회, 학번 생성 로직 적용, 학사 시스템 포맷에 맞는 데이터 생성, 데이터 전송 API 호출
*   저장/출력: 생성된 학번 APPLICANT 테이블 등에 업데이트, 학사 시스템 전송용 파일/데이터 생성, 전송 결과 로그 기록

---

**[FOR: 평가위원 (Evaluator)]**

*   **주요 활동:** 면접/실기 평가 진행 및 결과 입력 (IES 시스템 활용)

[Flow Sequence - 평가 수행]
1.  [FOR: 평가위원] 면접/실기 평가 시스템(IES) 로그인.
2.  [FOR: 평가위원] 담당하고 있는 평가 세션(모집단위, 전형, 조 등) 선택.
3.  [FOR: 평가위원] 평가 대상 수험생 목록 확인 (가번호 기반) (IES-REQ-009).
4.  [FOR: 평가위원] 현재 평가할 수험생(가번호) 선택 또는 호출.
5.  [FOR: 평가위원] 면접/실기 진행.
6.  [FOR: 평가위원] 시스템 내 평가 화면에서 설정된 평가 항목에 따라 점수 또는 등급 입력 (IES-REQ-011).
7.  [FOR: 평가위원] 필요한 경우, 평가 의견 또는 특이사항(결시, 실격 등) 입력 (IES-REQ-012).
8.  [FOR: 평가위원] 입력 내용 저장/제출.
9.  [FOR: 시스템] 평가 데이터 저장 (EVALUATION 테이블).
10. [FOR: 평가위원] 다음 수험생 평가 진행 (4~9단계 반복).
11. [FOR: 평가위원] 평가 완료 후 최종 확인 및 로그아웃.

[Component Interaction]
*   [FOR: 평가위원] → Frontend (UI_IES) → API Gateway
*   API Gateway → Backend Service (SVC_IES)
*   Backend Service (SVC_IES) → DB (Admissions DB - EVALUATION Table)
*   Backend Service (SVC_IES) → SVC_AMS (평가 완료 후 결과 일괄 전송 또는 실시간 연동)

[Data Flow - 평가 점수 입력]
*   [FOR: 평가위원] 입력: 로그인 정보, 평가 대상 가번호, 평가 항목별 점수/등급, 평가 의견, 특이사항
*   처리: 입력값 유효성 검사(점수 범위 등), 평가자 ID와 함께 데이터 저장 준비
*   저장/출력: EVALUATION 테이블에 해당 가번호(temp_id) 및 application_id(매칭 정보 기반)에 대한 평가 결과 저장, 입력 완료 확인 메시지

---

**[FOR: 상담사 (Counselor - 교직원/입학사정관)]**

*   **주요 활동:** 충원 전화 및 녹취 (RFS 활용), 입학 상담 진행 (ACS 활용)

[Flow Sequence - 충원 전화 (RFS)]
1.  [FOR: 상담사] 녹취/충원관리 시스템(RFS) 로그인.
2.  [FOR: 상담사] 담당 배정된 충원 대상자 명단 확인 (전형/차수별) (RFS-REQ-008 기반).
3.  [FOR: 상담사] 충원 대상자 선택 후 '클릭 전화' 기능 사용 (RFS-REQ-002).
4.  [FOR: 시스템 (CTI 연동)] 전화 연결 및 통화 내용 자동 녹음 시작 (RFS-REQ-002).
5.  [FOR: 상담사] 수험생과 통화하며 등록 의사 확인. 필요한 경우 중복지원 정보 확인 (RFS-REQ-005).
6.  [FOR: 상담사] 통화 종료 후, 통화 결과(등록, 포기, 부재 등) 및 상담 메모 입력 (RFS-REQ-004).
7.  [FOR: 상담사] 입력 내용 저장.
8.  [FOR: 시스템] 통화 결과, 메모, 녹취 파일 경로 등을 RECRUITMENT_LOG 테이블에 저장 (RFS-REQ-002, RFS-REQ-004). 결과는 AMS로 전송 (RFS-REQ-001).
9.  [FOR: 상담사] 필요한 경우, SMS 발송 기능으로 안내 문자 발송 (RFS-REQ-003).
10. [FOR: 시스템] SMS 발송 요청 처리 및 SMS_LOG 저장.
11. [FOR: 상담사] 다음 대상자에게 3~10단계 반복.

[Flow Sequence - 입학 상담 (ACS)]
1.  [FOR: 상담사] 입학상담 솔루션(ACS) 로그인.
2.  [FOR: 상담사] 상담 대상자 정보 조회 또는 신규 입력 (ACS-REQ-002).
3.  [FOR: 상담사] 시스템화된 모집요강 정보 확인 (ACS-REQ-001).
4.  [FOR: 상담사] 상담 대상자의 성적 입력 및 관련 학과/전형 정보 조회 (ACS-REQ-003, ACS-REQ-004).
5.  [FOR: 상담사] 성적 시각화 도구 활용하여 상담 진행 (ACS-REQ-005).
6.  [FOR: 상담사] 상담 내용 및 결과 입력/저장 (COUNSELING_LOG).
7.  [FOR: 상담사] 상담 종료.

[Component Interaction (RFS)]
*   [FOR: 상담사] → Frontend (UI_RFS) → API Gateway
*   API Gateway → Backend Service (SVC_RFS)
*   Backend Service (SVC_RFS) → DB (Admissions DB - RECRUITMENT_LOG, SMS_LOG)
*   Backend Service (SVC_RFS) → External (EXT_CTI for calls/recording, EXT_SMS for messaging)
*   Backend Service (SVC_RFS) → SVC_AMS (충원 결과 업데이트)

[Component Interaction (ACS)]
*   [FOR: 상담사] → Frontend (UI_ACS) → API Gateway
*   API Gateway → Backend Service (SVC_ACS)
*   Backend Service (SVC_ACS) → DB (Admissions DB - COUNSELING_LOG)
*   Backend Service (SVC_ACS) → SVC_AMS (지원자 정보 조회 등)

[Data Flow - 충원 전화 결과 처리 (RFS)]
*   [FOR: 상담사] 입력: 로그인 정보, 통화 결과(등록/포기 등), 상담 메모
*   처리: 입력값 저장, 녹취 파일 경로 연결, 충원 상태 업데이트 로직 실행, AMS 시스템으로 결과 전송
*   저장/출력: RECRUITMENT_LOG 테이블 저장, ADMISSION_DECISION 테이블 상태 업데이트 (AMS 연동), 저장 완료 확인

[Data Flow - 입학 상담 기록 (ACS)]
*   [FOR: 상담사] 입력: 로그인 정보, 상담 대상자 정보, 입력 성적, 상담 내용
*   처리: 입력된 정보와 상담사 ID, 상담 일시 등을 결합하여 저장 준비
*   저장/출력: COUNSELING_LOG 테이블에 저장, 저장 완료 확인

---

**[FOR: 재무 담당자 (Finance Officer)]**

*   **주요 활동:** 등록금 수납 현황 모니터링, 환불 신청 승인 처리, 금융 기관 연계 관리(간접적)

[Flow Sequence - 등록금 수납 확인 (모니터링)]
1.  [FOR: 재무 담당자] 시스템 로그인 (FRS 또는 AMS의 재무 관련 메뉴).
2.  [FOR: 재무 담당자] 실시간 등록금 수납 현황 대시보드 또는 목록 조회 (FRS-REQ-001 연계).
3.  [FOR: 재무 담당자] 특정 조건(기간, 학과 등)으로 필터링하여 조회.
4.  [FOR: 재무 담당자] 문제 발생 시(이중 입금, 금액 오류 등) 관련 부서(입학처)와 협의하여 처리.

[Flow Sequence - 등록금 환불 승인]
1.  [FOR: 재무 담당자] 시스템 로그인 및 환불 관리 메뉴 접근.
2.  [FOR: 재무 담당자] 접수된 환불 신청 목록 조회 (FRS-REQ-003).
3.  [FOR: 재무 담당자] 개별 환불 신청 건 선택하여 상세 내역(신청자, 사유, 금액, 계좌) 확인.
4.  [FOR: 재무 담당자] 내부 규정 및 절차에 따라 환불 승인 또는 반려 결정.
5.  [FOR: 재무 담당자] 시스템에 승인/반려 상태 입력 및 저장 (FRS-REQ-004).
6.  [FOR: 시스템] 승인 시, 금융 기관 이체 처리 연동(자동 또는 수동 트리거) 및 결과 업데이트.
7.  [FOR: 시스템] 승인 시, 관련 시스템(AMS, RFS)에 환불(등록 포기) 상태 전송 (FRS-REQ-004).
8.  [FOR: 시스템] 처리 결과 SMS 발송 (자동).

[Component Interaction]
*   [FOR: 재무 담당자] → Frontend (UI_FRS, potentially UI_AMS) → API Gateway
*   API Gateway → Backend Service (SVC_FRS)
*   Backend Service (SVC_FRS) → DB (Admissions DB - PAYMENT, REFUND Tables)
*   Backend Service (SVC_FRS) → External (EXT_BANK for refund processing)
*   Backend Service (SVC_FRS) → SVC_AMS, SVC_RFS (status updates)

[Data Flow - 환불 승인]
*   [FOR: 재무 담당자] 입력: 로그인 정보, 환불 신청 건 선택, 승인/반려 결정
*   처리: REFUND 테이블 상태 업데이트('승인' 또는 '반려'), 승인 시 은행 이체 연계 로직 실행, AMS/RFS 상태 업데이트 API 호출
*   저장/출력: REFUND 테이블 업데이트, 이체 결과 로그 기록(별도 또는 REFUND 테이블), 처리 완료 확인

---

**[FOR: 시스템 관리자 (System Administrator)]**

*   **주요 활동:** 시스템 환경 설정(서버, DB 등), 사용자 계정 및 권한 관리, 시스템 백업/복구, 성능 모니터링, 로그 관리

[Flow Sequence - 사용자 계정 관리]
1.  [FOR: 시스템 관리자] 관리 콘솔 또는 시스템 관리 메뉴 로그인.
2.  [FOR: 시스템 관리자] 사용자 관리 메뉴 접근.
3.  [FOR: 시스템 관리자] 신규 사용자 생성, 기존 사용자 정보 수정, 또는 사용자 삭제/비활성화 수행.
4.  [FOR: 시스템 관리자] 사용자 역할(Role) 할당 및 권한 조정 (USER_ROLE 기반).
5.  [FOR: 시스템 관리자] 변경 사항 저장.
6.  [FOR: 시스템] SYSTEM_USER, USER_ROLE 테이블 업데이트.

[Flow Sequence - 시스템 모니터링 및 로그 확인]
1.  [FOR: 시스템 관리자] 시스템 모니터링 도구 또는 관리 콘솔 접근.
2.  [FOR: 시스템 관리자] 서버 리소스(CPU, Memory, Disk), DB 성능, 네트워크 트래픽 등 확인.
3.  [FOR: 시스템 관리자] 시스템 오류 로그, 접근 로그, 주요 작업 로그 등 확인.
4.  [FOR: 시스템 관리자] 이상 징후 발견 시 원인 분석 및 조치.

[Flow Sequence - 백업 및 복구]
1.  [FOR: 시스템 관리자] 정기적인 시스템 및 데이터베이스 백업 스케줄 설정 및 확인.
2.  [FOR: 시스템 관리자] 필요시 수동 백업 수행.
3.  [FOR: 시스템 관리자] 장애 발생 시, 백업 데이터를 이용한 시스템 복구 절차 수행.

[Component Interaction]
*   [FOR: 시스템 관리자] → Admin Console / System Management Interface (could be part of AMS/CMN or separate)
*   Admin Console → API Gateway (or direct backend access depending on architecture)
*   API Gateway → Backend Services (SVC_CMN for user/role, potentially others for specific configs)
*   Backend Services → DB (Admissions DB - SYSTEM_USER, USER_ROLE, potentially config tables)
*   [FOR: 시스템 관리자] → Infrastructure Management Tools (Server Monitoring, DB Admin Tools, Backup Software)

[Data Flow - 사용자 생성]
*   [FOR: 시스템 관리자] 입력: 신규 사용자 ID, 이름, 초기 비밀번호, 역할(Role)
*   처리: 입력값 유효성 검사, 비밀번호 해싱, DB 저장 준비
*   저장/출력: SYSTEM_USER 테이블에 신규 레코드 삽입, USER_ROLE 관계 설정, 생성 완료 확인 메시지

---