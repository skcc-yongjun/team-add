package skcc.add.biz.test.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import skcc.add.biz.test.entity.UserRole;

@Schema(description = "로그인 응답 DTO")
@Getter
@Builder
public class LoginResponse {
    @Schema(description = "성공 여부")
    private boolean success;

    @Schema(description = "JWT 토큰")
    private String token;

    @Schema(description = "사용자 이름")
    private String userName;

    @Schema(description = "사용자 역할")
    private UserRole userRole;

    @Schema(description = "초기 화면 URL")
    private String initialUrl;

    public static LoginResponse of(boolean success, String token, String userName, UserRole userRole) {
        String initialUrl = getInitialUrlByRole(userRole);
        return LoginResponse.builder()
                .success(success)
                .token(token)
                .userName(userName)
                .userRole(userRole)
                .initialUrl(initialUrl)
                .build();
    }

    private static String getInitialUrlByRole(UserRole role) {
        return switch (role) {
            case ADMISSION_OFFICER -> "/ams/dashboard";
            case APPLICANT -> "/applicant/portal";
            case EVALUATOR -> "/evaluator/dashboard";
            case COUNSELOR -> "/counselor/dashboard";
            case FINANCE_OFFICER -> "/finance/dashboard";
            case SYSTEM_ADMIN -> "/admin/dashboard";
        };
    }
} 