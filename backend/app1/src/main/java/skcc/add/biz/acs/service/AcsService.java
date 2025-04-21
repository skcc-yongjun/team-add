package skcc.add.biz.acs.service;

import skcc.add.biz.acs.dto.*;
import java.util.List;

/**
 * 입학 상담 서비스
 *
 * 관련 요구사항:
 * - ACS-REQ-001: 모집요강 정보 시스템화
 * - ACS-REQ-002: 상담 정보 및 성적 입력 화면 제공
 * - ACS-REQ-003: 모집단위·학과 정보 제공
 * - ACS-REQ-004: 학과·전형·성적별 맞춤 상담
 * - ACS-REQ-005: 성적 시각화 제공
 */
public interface AcsService {
    /**
     * 모집요강 조회
     *
     * API ID: ACS-API-001-01
     * 요구사항 ID: ACS-REQ-001
     * 화면 ID: ACS-SCR-001
     */
    GuidelineResponse getGuideline(String admissionRound, String admissionType);

    /**
     * 학과 정보 조회
     *
     * API ID: ACS-API-001-02
     * 요구사항 ID: ACS-REQ-003
     * 화면 ID: ACS-SCR-001
     */
    DepartmentResponse getDepartment(String departmentCode);

    /**
     * 상담 정보 저장 및 분석
     *
     * API ID: ACS-API-002-01
     * 요구사항 ID: ACS-REQ-002, ACS-REQ-004
     * 화면 ID: ACS-SCR-001
     */
    CounselingResponse saveCounseling(String counselorId, CounselingRequest request);

    /**
     * 성적 분석 시뮬레이션
     *
     * API ID: ACS-API-002-02
     * 요구사항 ID: ACS-REQ-004
     * 화면 ID: ACS-SCR-001
     */
    CounselingResponse simulateCounseling(CounselingRequest request);
} 