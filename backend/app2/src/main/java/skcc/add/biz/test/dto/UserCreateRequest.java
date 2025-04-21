package skcc.add.biz.test.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import skcc.add.biz.test.entity.User;
import skcc.add.biz.test.entity.UserRole;
import skcc.add.biz.test.entity.UserStatus;

@Schema(description = "사용자 생성 요청 DTO")
@Getter
@Setter
public class UserCreateRequest {
    @Schema(description = "로그인 ID", example = "admission_admin")
    @NotBlank(message = "로그인 ID는 필수 입력값입니다.")
    private String userId;

    @Schema(description = "비밀번호", example = "password123!")
    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    private String password;

    @Schema(description = "사용자 이름", example = "김입학")
    @NotBlank(message = "사용자 이름은 필수 입력값입니다.")
    private String name;

    @Schema(description = "사용자 역할", example = "ADMISSION_OFFICER")
    @NotNull(message = "사용자 역할은 필수 입력값입니다.")
    private UserRole role;

    public User toEntity() {
        User user = new User();
        user.setUserId(this.userId);
        user.setPassword(this.password);  // 실제 사용시에는 서비스 레이어에서 암호화
        user.setName(this.name);
        user.setRole(this.role);
        user.setStatus(UserStatus.ACTIVE);  // 기본값으로 ACTIVE 설정
        return user;
    }
} 