package skcc.add.biz.test.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skcc.add.app.exception.CustomException;
import skcc.add.app.exception.ErrorCode;
import skcc.add.biz.test.dto.LoginRequest;
import skcc.add.biz.test.dto.LoginResponse;
import skcc.add.biz.test.dto.RegisterRequest;
import skcc.add.biz.test.dto.UserResponse;
import skcc.add.biz.test.entity.User;
import skcc.add.biz.test.entity.UserStatus;
import skcc.add.biz.test.repository.UserRepository;
import skcc.add.biz.test.service.AuthService;
import skcc.add.biz.test.service.JwtService;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    @Transactional
    public LoginResponse login(LoginRequest request) {
        // 1. 사용자 ID로 사용자 조회
        User user = userRepository.findByUserId(request.getUserId())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ELEMENT));

        // 2. 계정 상태 확인
        if (user.getStatus() != UserStatus.ACTIVE) {
            throw new CustomException(ErrorCode.UNAUTHORIZED);
        }

        // 3. 계정 잠금 확인
        if (user.isAccountLocked()) {
            throw new CustomException(ErrorCode.ACCESS_DENIED);
        }

        // 4. 비밀번호 확인
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            user.incrementLoginAttempts();
            userRepository.save(user);
            throw new CustomException(ErrorCode.NOT_MATCHED_PASSWORD);
        }

        // 5. 로그인 성공 처리
        user.resetLoginAttempts();
        user.updateLastLoginDate();
        userRepository.save(user);

        // 6. JWT 토큰 생성
        String token = jwtService.generateToken(user);

        // 7. 로그인 응답 생성
        return LoginResponse.of(true, token, user.getName(), user.getRole());
    }

    @Override
    @Transactional
    public UserResponse register(RegisterRequest request) {
        User user = request.toEntity();
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        User savedUser = userRepository.save(user);
        return UserResponse.from(savedUser);
    }
} 