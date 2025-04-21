package skcc.add.biz.test.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "로그인 요청 DTO")
@Getter
@Setter
public class LoginRequest {
    @Schema(description = "사용자 ID", example = "admission_admin")
    @NotBlank(message = "사용자 ID는 필수 입력값입니다.")
    private String userId;

    @Schema(description = "비밀번호", example = "password123!")
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    private String password;

    @Schema(description = "로그인 유형", example = "STAFF")
    private String loginType;
} 