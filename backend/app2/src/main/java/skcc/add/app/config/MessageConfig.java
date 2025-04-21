package skcc.add.app.config;

import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import skcc.add.app.exception.ErrorCode;

@Configuration
public class MessageConfig {

    @PostConstruct
    public void init() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasename("classpath:messages");
        messageSource.setDefaultEncoding("UTF-8");
        ErrorCode.setMessageSource(messageSource);
    }
}
