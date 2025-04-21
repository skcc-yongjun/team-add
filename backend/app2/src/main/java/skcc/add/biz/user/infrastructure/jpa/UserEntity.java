package skcc.add.biz.user.infrastructure.jpa;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import skcc.add.biz.common.infrastructure.jpa.BaseEntity;
import skcc.add.biz.user.domain.User;
import skcc.add.biz.user.domain.UserRole;
import skcc.add.biz.user.domain.UserStatus;

@Getter
@Entity
@Table(name = "users")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserEntity extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String email;

    private String password;

    private String username;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Enumerated(EnumType.STRING)
    private UserStatus status;

    public static UserEntity from(User user) {
        UserEntity userEntity = new UserEntity();
        userEntity.id = user.getId();
        userEntity.email = user.getEmail();
        userEntity.password = user.getPassword();
        userEntity.username = user.getUsername();
        userEntity.role = user.getRole();
        userEntity.status = user.getStatus();
        return userEntity;
    }

    public User toModel() {
        return User.builder()
                .id(id)
                .email(email)
                .password(password)
                .username(username)
                .role(role)
                .status(status)
                .createdDate(super.getCreatedDate())
                .lastModifiedDate(super.getLastModifiedDate())
                .build();
    }

}
