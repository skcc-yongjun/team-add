package skcc.add.biz.test.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import skcc.add.biz.test.entity.UserRole;
import skcc.add.biz.test.entity.UserStatus;

@Schema(description = "사용자 수정 요청 DTO")
@Getter
@Setter
public class UserUpdateRequest {
    @Schema(description = "사용자 이름", example = "김입학")
    @NotBlank(message = "사용자 이름은 필수 입력값입니다.")
    private String name;

    @Schema(description = "비밀번호", example = "newPassword123!")
    private String password;  // 선택적 수정 가능

    @Schema(description = "사용자 역할", example = "ADMISSION_OFFICER")
    private UserRole role;    // 선택적 수정 가능

    @Schema(description = "계정 상태", example = "ACTIVE")
    private UserStatus status;  // 선택적 수정 가능
} 