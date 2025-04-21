# Spring Boot MVC 구조 가이드라인

## 프로젝트 구조

```
backend/
├── app1/                          # 첫 번째 마이크로서비스
├── app2/                          # 두 번째 마이크로서비스
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── skcc/         # 루트 패키지
│   │       │       └── add/      # 업무 모듈
│   │       │           ├── controller/     # REST API 엔드포인트 정의
│   │       │           ├── service/        # 비즈니스 로직 인터페이스
│   │       │           │   └── impl/       # 비즈니스 로직 구현체
│   │       │           ├── entity/         # JPA 엔티티 클래스
│   │       │           └── repository/     # 데이터 액세스 계층
│   │       └── resources/                  # 설정 파일
│   ├── build.gradle                        # 의존성 및 빌드 설정
│   ├── Dockerfile                          # 컨테이너화 설정
│   └── k8s/                               # 쿠버네티스 설정
└── docs/                                   # 프로젝트 문서
```

## 각 계층별 역할과 책임

### 1. Controller 계층

- REST API 엔드포인트를 정의하는 계층
- 클라이언트의 요청을 받아 적절한 서비스 계층으로 전달
- 요청의 유효성 검증
- HTTP 응답 생성
- `@RestController`, `@RequestMapping` 등의 어노테이션 사용

예시:

```java
@RestController
@RequestMapping("/api/v1/module1")
public class Module1Controller {
    private final Module1Service module1Service;

    // 엔드포인트 정의
}
```

### 2. Service 계층

- 비즈니스 로직을 정의하는 인터페이스
- 트랜잭션 관리
- 여러 Repository의 조합으로 비즈니스 로직 구현

예시:

```java
public interface Module1Service {
    // 비즈니스 메소드 정의
}
```

### 3. Service Implementation 계층

- Service 인터페이스의 실제 구현체
- 구체적인 비즈니스 로직 구현
- `@Service` 어노테이션 사용

예시:

```java
@Service
public class Module1ServiceImpl implements Module1Service {
    private final Module1Repository module1Repository;

    // 비즈니스 로직 구현
}
```

### 4. Entity 계층

- 데이터베이스 테이블과 매핑되는 JPA 엔티티 클래스
- `@Entity`, `@Table` 등의 어노테이션 사용
- 데이터베이스 스키마를 표현

예시:

```java
@Entity
@Table(name = "module1_table")
public class Module1Entity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 필드 정의
}
```

### 5. Repository 계층

- 데이터 액세스 계층
- JPA Repository 인터페이스 정의
- `@Repository` 어노테이션 사용 (선택적)

예시:

```java
public interface Module1Repository extends JpaRepository<Module1Entity, Long> {
    // 쿼리 메소드 정의
}
```

## 명명 규칙

1. 컨트롤러 클래스: `[모듈명]Controller`
2. 서비스 인터페이스: `[모듈명]Service`
3. 서비스 구현체: `[모듈명]ServiceImpl`
4. 엔티티 클래스: `[모듈명]Entity` 또는 도메인에 맞는 의미있는 이름
5. 레포지토리 인터페이스: `[모듈명]Repository`

## 패키지 구조 가이드라인

1. 각 업무 모듈은 독립적인 패키지로 구성
2. 공통 기능은 common 패키지에 구현
3. 각 계층은 명확히 분리된 패키지에 위치
4. 순환 참조가 발생하지 않도록 주의

## 모범 사례

1. Controller는 Service 계층만 참조
2. Service는 Repository 계층만 참조
3. Entity 클래스는 순수한 데이터 모델로 유지
4. Repository는 데이터 접근에 관한 책임만 가짐
5. 비즈니스 로직은 반드시 Service 계층에 구현

## 예외 처리

1. 각 계층별 적절한 예외 처리
2. GlobalExceptionHandler를 통한 일관된 에러 응답 처리
3. 커스텀 예외 클래스 활용

## 테스트 구조

각 계층별 테스트 클래스를 생성하여 단위 테스트 구현

```
src/test/java/
├── controller/
├── service/
└── repository/
```

## 추가 가이드라인

### 마이크로서비스 아키텍처 관련

1. 각 애플리케이션(app1, app2 등)은 독립적으로 배포 가능한 마이크로서비스로 구성
2. 각 마이크로서비스는 자체 데이터베이스를 가짐
3. 서비스 간 통신은 REST API를 통해 수행

### 빌드 및 배포

1. Gradle을 사용한 빌드 관리
2. Docker 컨테이너화 지원
3. Kubernetes 배포 설정 제공

### 설정 관리

1. application.yml/properties 파일을 통한 환경 설정
2. 프로파일별 설정 분리 (dev, prod 등)
3. 외부 설정은 ConfigMap/Secret으로 관리

## 프로젝트 설정

### Gradle 설정

```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    // 필요한 의존성 추가
}
```

### 애플리케이션 설정

```yaml
spring:
  application:
    name: app2
  datasource:
    url: jdbc:postgresql://localhost:5432/app2db
    username: ${DB_USERNAME}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
```
