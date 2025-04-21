# API 명세서 작성 가이드

## 1. API 문서 구조

각 API는 다음 구조로 작성되어야 합니다:

````markdown
## [API ID] [API 제목]

예시:

## USR-API-001 사용자 목록 조회

## GDS-API-002 상품 등록

## PCS-003 주문 상태 변경

### 개요

- **엔드포인트**: `/api/v1/[리소스]`
- **메소드**: `GET/POST/PUT/DELETE`
- **설명**: API의 주요 목적과 기능을 한 문장으로 설명

### 요청 (Request)

#### 헤더 (Headers)

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer [토큰]"
}
```

#### 파라미터 (Parameters)

- **Path Parameters**
  - `id` (string, required): 리소스 식별자
- **Query Parameters**
  - `page` (number, optional): 페이지 번호
  - `limit` (number, optional): 페이지당 항목 수
- **Request Body**

```json
{
  "field1": "string",
  "field2": "number"
}
```

### 응답 (Response)

#### 성공 응답 (200 OK)

```json
{
  "status": "success",
  "data": {
    "field1": "string",
    "field2": "number"
  },
  "message": "성공 메시지"
}
```

#### 에러 응답 (4xx/5xx)

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

### 예시

#### 요청 예시

```bash
curl -X POST \
  http://api.example.com/api/v1/resource \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer token' \
  -d '{
    "field1": "value1",
    "field2": 123
  }'
```

#### 응답 예시

```json
{
  "status": "success",
  "data": {
    "field1": "value1",
    "field2": 123
  },
  "message": "리소스가 성공적으로 생성되었습니다."
}
```
````

## 2. API 명명 규칙

### 엔드포인트 명명

- 소문자와 하이픈(-) 사용
- 리소스 중심의 명명
- 버전 정보 포함 (예: `/api/v1/`)
- 복수형 사용 (예: `/users`, `/posts`)

### HTTP 메소드 사용

- GET: 리소스 조회
- POST: 새 리소스 생성
- PUT: 리소스 전체 수정
- PATCH: 리소스 부분 수정
- DELETE: 리소스 삭제

## 3. 응답 형식 표준화

### 성공 응답

```json
{
  "status": "success",
  "data": {}, // 실제 데이터
  "message": "성공 메시지",
  "metadata": {
    // 선택적
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

### 에러 응답

```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지",
    "details": {} // 선택적 추가 정보
  }
}
```

## 4. 상태 코드 사용

- 200: 성공
- 201: 생성 성공
- 400: 잘못된 요청
- 401: 인증 실패
- 403: 권한 없음
- 404: 리소스 없음
- 500: 서버 에러

## 5. 보안 가이드라인

- 모든 API는 인증이 필요함
- JWT 토큰 사용
- HTTPS 필수
- 민감한 데이터는 암호화
- Rate limiting 구현

## 6. 버전 관리

- URL에 버전 정보 포함 (예: `/api/v1/`)
- 주요 변경 시 버전 업그레이드
- 이전 버전 지원 기간 명시

## 7. 문서화 체크리스트

- [ ] API 이름과 목적이 명확한가?
- [ ] 모든 파라미터가 상세히 설명되어 있는가?
- [ ] 요청/응답 예시가 포함되어 있는가?
- [ ] 에러 케이스가 문서화되어 있는가?
- [ ] 인증 요구사항이 명시되어 있는가?
- [ ] Rate limiting 정보가 포함되어 있는가?
