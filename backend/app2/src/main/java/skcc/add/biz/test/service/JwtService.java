package skcc.add.biz.test.service;

import skcc.add.biz.test.entity.User;

public interface JwtService {
    /**
     * 사용자 정보로 JWT 토큰 생성
     *
     * @param user 사용자 정보
     * @return JWT 토큰
     */
    String generateToken(User user);

    /**
     * JWT 토큰 검증
     *
     * @param token JWT 토큰
     * @return 검증 결과
     */
    boolean validateToken(String token);

    /**
     * JWT 토큰에서 사용자 ID 추출
     *
     * @param token JWT 토큰
     * @return 사용자 ID
     */
    String getUserIdFromToken(String token);
} 