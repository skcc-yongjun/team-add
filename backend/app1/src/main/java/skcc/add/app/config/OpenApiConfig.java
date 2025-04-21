package skcc.add.app.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {
    @Value("${server.port}")
    private String serverPort;

    @Bean
    public OpenAPI openAPI() {
        Server localServer = new Server();
        localServer.setUrl("http://localhost:" + serverPort);
        localServer.setDescription("로컬 서버");

        return new OpenAPI()
                .servers(List.of(localServer))
                .info(new Info()
                        .title("SK Hackathon API")
                        .description("SK Hackathon API 문서")
                        .version("v1.0.0"));
    }
} 