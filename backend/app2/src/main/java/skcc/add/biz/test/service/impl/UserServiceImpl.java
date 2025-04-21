package skcc.add.biz.test.service.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import skcc.add.app.exception.CustomException;
import skcc.add.app.exception.ErrorCode;
import skcc.add.biz.test.dto.UserCreateRequest;
import skcc.add.biz.test.dto.UserResponse;
import skcc.add.biz.test.dto.UserUpdateRequest;
import skcc.add.biz.test.entity.User;
import skcc.add.biz.test.repository.UserRepository;
import skcc.add.biz.test.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserResponse::from)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(Long id) {
        return userRepository.findById(id)
                .map(UserResponse::from)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ELEMENT));
    }

    @Override
    public UserResponse createUser(UserCreateRequest request) {
        // 1. 중복 ID 체크
        if (userRepository.findByUserId(request.getUserId()).isPresent()) {
            throw new CustomException(ErrorCode.EXIST_ELEMENT);
        }

        // 2. 엔티티 생성 및 비밀번호 암호화
        User user = request.toEntity();
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // 3. 저장 및 응답 변환
        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public UserResponse updateUser(Long id, UserUpdateRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ELEMENT));

        // 1. 이름 업데이트
        user.setName(request.getName());

        // 2. 비밀번호 업데이트 (있는 경우에만)
        if (StringUtils.hasText(request.getPassword())) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        // 3. 역할 업데이트 (있는 경우에만)
        if (request.getRole() != null) {
            user.setRole(request.getRole());
        }

        // 4. 상태 업데이트 (있는 경우에만)
        if (request.getStatus() != null) {
            user.setStatus(request.getStatus());
        }

        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new CustomException(ErrorCode.NOT_FOUND_ELEMENT);
        }
        userRepository.deleteById(id);
    }
} 