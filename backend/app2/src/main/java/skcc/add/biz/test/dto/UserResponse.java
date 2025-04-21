package skcc.add.biz.test.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import skcc.add.biz.test.entity.User;
import skcc.add.biz.test.entity.UserRole;
import skcc.add.biz.test.entity.UserStatus;

import java.time.LocalDateTime;

@Schema(description = "사용자 응답 DTO")
@Getter
@Builder
public class UserResponse {
    @Schema(description = "사용자 ID (PK)")
    private Long id;

    @Schema(description = "로그인 ID")
    private String userId;

    @Schema(description = "사용자 이름")
    private String name;

    @Schema(description = "사용자 역할")
    private UserRole role;

    @Schema(description = "계정 상태")
    private UserStatus status;

    @Schema(description = "마지막 로그인 시간")
    private LocalDateTime lastLoginDate;

    @Schema(description = "생성일시")
    private LocalDateTime createdDate;

    @Schema(description = "수정일시")
    private LocalDateTime lastModifiedDate;

    public static UserResponse from(User user) {
        return UserResponse.builder()
                .id(user.getId())
                .userId(user.getUserId())
                .name(user.getName())
                .role(user.getRole())
                .status(user.getStatus())
                .lastLoginDate(user.getLastLoginDate())
                .createdDate(user.getCreatedDate())
                .lastModifiedDate(user.getLastModifiedDate())
                .build();
    }
} 