package skcc.add.biz.test.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import skcc.add.biz.common.infrastructure.jpa.BaseEntity;
import java.time.LocalDateTime;

@Entity
@Table(name = "sk_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String userId;  // 사용자 ID (로그인용)
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserStatus status;
    
    private int loginAttempts;  // 로그인 시도 횟수
    
    @Column(name = "last_login_date")
    private LocalDateTime lastLoginDate;  // 마지막 로그인 시간
    
    public void incrementLoginAttempts() {
        this.loginAttempts++;
    }
    
    public void resetLoginAttempts() {
        this.loginAttempts = 0;
    }
    
    public boolean isAccountLocked() {
        return this.loginAttempts >= 5;  // 5회 이상 실패시 계정 잠금
    }
    
    public void updateLastLoginDate() {
        this.lastLoginDate = LocalDateTime.now();
    }
} 