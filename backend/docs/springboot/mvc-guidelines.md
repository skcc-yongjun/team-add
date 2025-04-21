# Spring MVC 가이드라인

## 1. 패키지 구조

```
com.skcc.add
├── xxx (업무 모듈)
│   ├── controller
│   ├── service
│   │   └── impl
│   ├── repository
│   └── entity
├── common
│   ├── config
│   ├── exception
│   └── util
└── app
    ├── config
    ├── filter
    └── security
```

### 1.1 패키지 설명

- `xxx`: 업무 모듈 (예: user, order, product 등)
  - `controller`: REST API 엔드포인트 정의
  - `service`: 비즈니스 로직 인터페이스
  - `service.impl`: 비즈니스 로직 구현체
  - `repository`: 데이터 접근 계층
  - `entity`: 데이터베이스 엔티티
- `common`: 공통 모듈
  - `config`: 공통 설정
  - `exception`: 예외 처리
  - `util`: 유틸리티 클래스
- `app`: 애플리케이션 설정
  - `config`: 애플리케이션 설정
  - `filter`: 필터
  - `security`: 보안 설정

## 2. Controller 설계 규칙

### 2.1 기본 구조

```java
@Tag(name = "사용자 API", description = "사용자 관리를 위한 API")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @Operation(summary = "사용자 조회",
              description = "특정 ID를 가진 사용자를 조회합니다.",
              responses = {
                  @ApiResponse(
                      responseCode = "200",
                      description = "사용자를 성공적으로 조회했습니다.",
                      content = @Content(schema = @Schema(implementation = User.class))
                  ),
                  @ApiResponse(
                      responseCode = "404",
                      description = "사용자를 찾을 수 없습니다."
                  )
              })
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @Parameter(description = "조회할 사용자의 ID", required = true)
            @PathVariable(name = "id") Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
```

### 2.2 API 문서화 규칙

- `@Tag`: API 그룹 정의
  - name: API 그룹 이름
  - description: API 그룹 설명
- `@Operation`: API 엔드포인트 설명
  - summary: API 요약
  - description: API 상세 설명
  - responses: 응답 정의
- `@Parameter`: API 파라미터 설명
  - description: 파라미터 설명
  - required: 필수 여부
- `@ApiResponse`: API 응답 정의
  - responseCode: HTTP 상태 코드
  - description: 응답 설명
  - content: 응답 내용 스키마

## 3. Service 설계 규칙

### 3.1 인터페이스

```java
public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    User updateUser(User user);
    void deleteUser(Long id);
}
```

### 3.2 구현체

```java
@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    @Override
    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
```

### 3.3 Service 규칙

- 인터페이스와 구현체 분리
- `@Transactional` 적용
  - 조회 메서드: `@Transactional(readOnly = true)`
  - 수정 메서드: `@Transactional`
- 생성자 주입 사용 (`@RequiredArgsConstructor`)

## 4. Entity 설계 규칙

### 4.1 기본 구조

```java
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private Long id;
    private String name;
}
```

### 4.2 Entity 규칙

- `@Entity`, `@Table` 어노테이션 필수
- Getter/Setter 메서드 제공
- 기본 생성자 필수
- 테이블명은 복수형 사용
- ID 필드에 `@Id` 어노테이션 필수

## 5. Repository 설계 규칙

### 5.1 기본 구조

```java
public interface UserRepository extends JpaRepository<User, Long> {
}
```

### 5.2 Repository 규칙

- JpaRepository 상속
- 엔티티 클래스와 ID 타입 지정
- 필요한 경우 커스텀 쿼리 메서드 추가

## 6. 의존성 관리

```gradle
dependencies {
    // Spring Boot Starter
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'

    // Swagger/OpenAPI
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'
    implementation 'io.swagger.core.v3:swagger-annotations:2.2.20'

    // Lombok
    compileOnly 'org.projectlombok:lombok'
    annotationProcessor 'org.projectlombok:lombok'
}
```

## 7. API 응답 형식

### 7.1 성공 응답

```json
{
  "data": {
    "id": 1,
    "name": "사용자"
  },
  "message": "성공적으로 처리되었습니다."
}
```

### 7.2 실패 응답

```json
{
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "사용자를 찾을 수 없습니다."
  }
}
```

## 8. 예외 처리

### 8.1 글로벌 예외 처리

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e) {
        // 예외 처리 로직
    }
}
```

## 9. API 버전 관리

### 9.1 URL 버전 관리

- 형식: `/api/v{version}/...`
- 예시: `/api/v1/users`

### 9.2 버전 변경 규칙

- 주요 기능 변경: 메이저 버전 증가 (v1 → v2)
- 하위 호환성 유지: 마이너 버전 증가 (v1.1 → v1.2)
