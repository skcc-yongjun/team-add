package skcc.add.app.config;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import skcc.add.app.aop.LogFormatAop;
import skcc.add.app.filter.LogTraceIdFilter;
import skcc.add.biz.user.infrastructure.UserRepositoryPortJpaCustomImpl;
import skcc.add.biz.user.infrastructure.jpa.UserRepositoryJpa;
import skcc.add.biz.user.service.port.UserRepositoryPort;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

    private final UserRepositoryJpa userRepositoryJpa;
    private final JPAQueryFactory jpaQueryFactory;
//    private final UserRepositoryMybatis userRepositoryMybatis;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Jpa 또는 MyBatis 구현체 선택
     */
    @Bean
    public UserRepositoryPort userRepositoryPort() {
        return new UserRepositoryPortJpaCustomImpl(userRepositoryJpa, jpaQueryFactory);
//        return new UserRepositoryPortMybatisImpl(userRepositoryMybatis);
    }

    /**
     * LogTraceId 적용
     */
    @Bean
    public LogTraceIdFilter logTraceIdFilter() {
        return new LogTraceIdFilter();
    }

    /**
     * Log Format Custom AOP 적용 (시그니처 + Depth 표현)
     */
    @Bean
    public LogFormatAop logFormatAop() {
        return new LogFormatAop();
    }

}
