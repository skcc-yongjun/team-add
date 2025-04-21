# Backend API 작성 가이드

## 1. API 문서화 구조

### 1.1 문서 관리

- API 문서는 `docs/apis` 디렉토리에서 관리
- `README.md`: API 목록 및 링크 관리
- 개별 API 문서: 각 API별 상세 명세

### 1.2 API ID 규칙

- 형식: `ADM-{화면ID}-API-{순번}`
  - ADM: 시스템 구분, 다른 시스템인 경우, 명칭이 달라질 수 있음.
  - API: API 문서임을 나타냄
  - 화면ID: 관련 화면 ID (예: SCR-XXX)
  - 순번: 001부터 시작하는 3자리 일련번호

## 2. API 문서 작성 형식

### 2.1 문서 구조

````markdown
# API 제목

## 개요

- 엔드포인트: `/api/...`
- 메소드: `GET/POST/PUT/DELETE`
- 목적: API의 주요 기능 설명

## 요청

### 헤더

| 이름          | 필수 여부 | 설명             |
| ------------- | --------- | ---------------- |
| Content-Type  | 필수      | application/json |
| Authorization | 필수      | Bearer {token}   |

### 파라미터

| 이름   | 타입   | 필수 여부 | 설명          |
| ------ | ------ | --------- | ------------- |
| param1 | string | 필수      | 파라미터 설명 |

## 응답

### 성공 응답 (200 OK)

```json
{
  "status": "success",
  "data": {
    // 응답 데이터 구조
  }
}
```
````

### 오류 응답 (4xx/5xx)

```json
{
  "status": "error",
  "code": "ERROR_CODE",
  "message": "오류 메시지"
}
```

## 예제

### 요청 예제

```bash
curl -X POST "http://api.example.com/endpoint" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer {token}" \
     -d '{
         "param1": "value1"
     }'
```

### 응답 예제

```json
{
  "status": "success",
  "data": {
    // 예시 응답 데이터
  }
}
```

````

## 3. 코드 작성 가이드

### 3.1 DTO 클래스 작성
```java
/**
 * API 요청/응답 DTO
 *
 * API ID: ADM-SCR-XXX-API-YYY
 * 요구사항 ID: ADM-REQ-XXX
 * 화면 ID: ADM-SCR-XXX
 *
 * 사용 목적:
 * - API의 요청/응답 데이터를 전달하기 위한 DTO
 * - 주요 필드 및 용도 설명
 */
@Schema(description = "API 설명")
@Getter
@Setter
public class ApiRequestDto {
    @Schema(description = "필드 설명")
    private String field;
}
```

### 3.2 Controller 클래스 작성

```java
/**
 * API Controller
 *
 * 관련 요구사항:
 * - ADM-REQ-XXX: 요구사항 설명
 *
 * 관련 화면:
 * - ADM-SCR-XXX: 화면 설명
 */
@Tag(name = "API 그룹명", description = "API 그룹 설명")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/...")
public class ApiController {

    /**
     * API 메소드
     *
     * API ID: ADM-SCR-XXX-API-001
     * 요구사항 ID: ADM-REQ-XXX
     * 화면 ID: ADM-SCR-XXX
     *
     * 처리 흐름:
     * 1. 첫 번째 처리 단계
     * 2. 두 번째 처리 단계
     * 3. 세 번째 처리 단계
     */
    @Operation(summary = "API 제목", description = "API 상세 설명")
    @PostMapping("/endpoint")
    public ResponseEntity<ApiResponseDto> apiMethod(
            @Valid @RequestBody ApiRequestDto request,
            @PathVariable(name = "id") Long id,
            @RequestParam(name = "type") String type) {
        // 구현
    }
}
```

### 3.3 Service 인터페이스 작성

```java
/**
 * Service 인터페이스
 *
 * 관련 요구사항:
 * - ADM-REQ-XXX: 요구사항 설명
 *
 * 관련 화면:
 * - ADM-SCR-XXX: 화면 설명
 *
 * 주의사항:
 * - Entity를 Controller에 직접 반환하지 않고, 반드시 DTO로 변환하여 반환
 * - Entity와 DTO 간의 매핑은 명시적으로 구현
 */
public interface ApiService {
    /**
     * 서비스 메소드
     *
     * API ID: ADM-SCR-XXX-API-001
     * 요구사항 ID: ADM-REQ-XXX
     * 화면 ID: ADM-SCR-XXX
     *
     * 처리 흐름:
     * 1. 요청 DTO 유효성 검증
     * 2. Entity 조회 및 비즈니스 로직 처리
     * 3. Entity를 ResponseDTO로 변환하여 반환
     *
     * @param request 요청 데이터
     * @return 응답 DTO
     */
    ApiResponseDto processRequest(ApiRequestDto request);
}
```

### 3.3.1 Service 구현 시 주의사항

```java
@Service
@RequiredArgsConstructor
public class ApiServiceImpl implements ApiService {

    private final EntityMapper entityMapper;

    @Override
    public ApiResponseDto processRequest(ApiRequestDto request) {
        // 1. Entity 조회
        Entity entity = repository.findById(request.getId())
            .orElseThrow(() -> new EntityNotFoundException());

        // 2. 비즈니스 로직 처리
        entity.process(request);

        // 3. Entity를 DTO로 변환하여 반환 (직접 Entity 반환 금지)
        return entityMapper.toDto(entity);
    }
}
```

### 3.4 단위 테스트 작성

```java
/**
 * API Controller 단위 테스트
 */
@WebMvcTest(ApiController.class)
class ApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ApiService apiService;

    @Test
    @DisplayName("API 성공 케이스 테스트")
    void apiMethod_shouldReturnSuccess() throws Exception {
        // Given
        ApiRequestDto request = new ApiRequestDto();
        request.setField("value");

        ApiResponseDto response = new ApiResponseDto();
        response.setStatus("success");

        when(apiService.processRequest(any())).thenReturn(response);

        // When & Then
        mockMvc.perform(post("/api/v1/endpoint")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("success"));
    }
}
```

### 3.5 통합 테스트 작성

```java
/**
 * API Controller 통합 테스트
 */
@SpringBootTest
@AutoConfigureMockMvc
class ApiControllerIT {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("API 통합 테스트")
    void apiMethod_shouldReturnSuccess() throws Exception {
        // Given
        ApiRequestDto request = new ApiRequestDto();
        request.setField("value");

        // When & Then
        mockMvc.perform(post("/api/v1/endpoint")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").exists());
    }
}
```

## 4. HTTP 파일 테스트 작성

### 4.1 HTTP 파일 구조

```http
###
# API 제목
# API ID: ADM-SCR-XXX-API-YYY
###

### 환경 변수 설정
@baseUrl = http://localhost:8080
@contentType = application/json

### API 요청 이름
# @name apiRequest
POST {{baseUrl}}/api/v1/endpoint
Content-Type: {{contentType}}
Accept: {{contentType}}

{
    "field": "value"
}

### 다른 API 요청
# @name anotherRequest
GET {{baseUrl}}/api/v1/another-endpoint
Accept: {{contentType}}
```

### 4.2 HTTP 파일 작성 규칙

- 파일명은 API 기능을 명확히 나타내는 이름으로 작성 (예: `user_authentication.http`)
- 파일 상단에 API ID와 설명을 주석으로 명시
- 각 요청 앞에는 `###`으로 구분하고 `# @name`으로 요청 이름 지정
- 환경 변수를 사용하여 중복 코드 최소화
- 요청 헤더와 바디를 명확히 구분
- 같은 API의 다양한 시나리오 테스트 케이스를 함께 작성
- 컨텍스트 경로가 설정된 경우 URL 경로 중복에 주의

### 4.3 HTTP 파일 관리

- `src/main/resources/api` 디렉토리에 저장
- `README.md` 파일에 모든 HTTP 파일 목록과 관련 API ID 정리
- API 그룹별로 파일 분리
- 관련 API들은 하나의 파일에 모아서 작성

### 4.4 테스트 환경 설정

```http
### 개발 환경
@devUrl = http://localhost:8080
@testToken = dev-token

### 테스트 환경
@testUrl = http://test-server
@testToken = test-token

### 현재 사용할 환경 선택
@baseUrl = {{devUrl}}
@token = {{devToken}}
```

## 5. 주석 작성 규칙

### 5.1 클래스 레벨 주석

- API ID, 요구사항 ID, 화면 ID 명시
- 클래스의 사용 목적 설명
- 주요 기능 및 특징 설명

### 5.2 메소드 레벨 주석

- API ID, 요구사항 ID, 화면 ID 명시
- 처리 흐름 단계별 설명
- 파라미터 및 반환값 설명

### 5.3 필드 레벨 주석

- @Schema 어노테이션 사용
- 필드의 용도 및 제약조건 설명
- 예시값 포함

## 6. 의존성 관리

### 6.1 필수 의존성

```gradle
dependencies {
    // Swagger/OpenAPI
    implementation 'io.swagger.core.v3:swagger-annotations:2.2.20'
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'

    // Validation
    implementation 'org.springframework.boot:spring-boot-starter-validation'

    // Lombok
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'

    // 테스트
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}
```
````
