package skcc.add.biz.test.service;

import skcc.add.biz.test.dto.LoginRequest;
import skcc.add.biz.test.dto.LoginResponse;
import skcc.add.biz.test.dto.RegisterRequest;
import skcc.add.biz.test.dto.UserResponse;

public interface AuthService {
    /**
     * 사용자 로그인 처리
     *
     * API ID: CMN-API-001-01
     * 요구사항 ID: CMN-REQ-001
     * 화면 ID: CMN-SCR-001
     *
     * @param request 로그인 요청 정보
     * @return 로그인 응답 정보
     */
    LoginResponse login(LoginRequest request);
    UserResponse register(RegisterRequest request);
} 