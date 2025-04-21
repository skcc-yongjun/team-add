package skcc.add.app.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import skcc.add.app.aop.LogFormatAop;
import skcc.add.app.filter.LogTraceIdFilter;

@Configuration
@RequiredArgsConstructor
public class AppConfig {

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
