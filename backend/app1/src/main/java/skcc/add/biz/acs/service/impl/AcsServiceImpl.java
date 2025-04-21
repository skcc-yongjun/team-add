package skcc.add.biz.acs.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import skcc.add.app.exception.CustomException;
import skcc.add.app.exception.ErrorCode;
import skcc.add.biz.acs.dto.*;
import skcc.add.biz.acs.entity.*;
import skcc.add.biz.acs.repository.*;
import skcc.add.biz.acs.service.AcsService;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AcsServiceImpl implements AcsService {

    private final AdmissionGuidelineRepository guidelineRepository;
    private final DepartmentRepository departmentRepository;
    private final CounselingLogRepository counselingRepository;
    private final ObjectMapper objectMapper;

    @Override
    @Transactional(readOnly = true)
    public GuidelineResponse getGuideline(String admissionRound, String admissionType) {
        return guidelineRepository.findByAdmissionRoundAndAdmissionType(admissionRound, admissionType)
                .map(GuidelineResponse::from)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ELEMENT));
    }

    @Override
    @Transactional(readOnly = true)
    public DepartmentResponse getDepartment(String departmentCode) {
        return departmentRepository.findByDepartmentCode(departmentCode)
                .map(DepartmentResponse::from)
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ELEMENT));
    }

    @Override
    @Transactional
    public CounselingResponse saveCounseling(String counselorId, CounselingRequest request) {
        // 1. 학과 정보 조회
        Department department = departmentRepository.findByDepartmentCode(request.getDepartmentCode())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ELEMENT));

        // 2. 상담 기록 생성
        CounselingLog counselingLog = new CounselingLog();
        counselingLog.setCounselorId(counselorId);
        counselingLog.setApplicantName(request.getApplicantName());
        counselingLog.setApplicantContact(request.getApplicantContact());
        counselingLog.setCounselingContent(request.getCounselingContent());
        counselingLog.setDepartment(department);
        counselingLog.setAdmissionType(request.getAdmissionType());

        try {
            // 성적 정보를 JSON으로 변환하여 저장
            counselingLog.setGpaScores(objectMapper.writeValueAsString(request.getGpaScores()));
            counselingLog.setCsatScores(objectMapper.writeValueAsString(request.getCsatScores()));
            counselingLog.setExtraActivities(request.getExtraActivities());
        } catch (Exception e) {
            throw new CustomException(ErrorCode.NOT_FOUND_ELEMENT);
        }

        CounselingLog savedLog = counselingRepository.save(counselingLog);

        // 3. 성적 분석 수행
        Map<String, Double> estimatedScores = calculateEstimatedScores(request, department);
        String likelihood = analyzeLikelihood(estimatedScores, department);
        String advice = generateAdvice(likelihood, request.getAdmissionType());

        return CounselingResponse.from(savedLog, estimatedScores, likelihood, advice);
    }

    @Override
    @Transactional(readOnly = true)
    public CounselingResponse simulateCounseling(CounselingRequest request) {
        Department department = departmentRepository.findByDepartmentCode(request.getDepartmentCode())
                .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_ELEMENT));

        Map<String, Double> estimatedScores = calculateEstimatedScores(request, department);
        String likelihood = analyzeLikelihood(estimatedScores, department);
        String advice = generateAdvice(likelihood, request.getAdmissionType());

        return CounselingResponse.builder()
                .applicantName(request.getApplicantName())
                .estimatedScores(estimatedScores)
                .likelihood(likelihood)
                .advice(advice)
                .build();
    }

    // 성적 환산 점수 계산
    private Map<String, Double> calculateEstimatedScores(CounselingRequest request, Department department) {
        Map<String, Double> scores = new HashMap<>();
        
        // 학생부 교과 전형 점수 계산
        if (request.getGpaScores() != null) {
            double gpaScore = calculateGpaScore(request.getGpaScores());
            scores.put("학생부교과", gpaScore);
        }

        // 수능 전형 점수 계산
        if (request.getCsatScores() != null) {
            double csatScore = calculateCsatScore(request.getCsatScores());
            scores.put("수능", csatScore);
        }

        return scores;
    }

    // 내신 점수 계산
    private double calculateGpaScore(Map<String, Map<String, Integer>> gpaScores) {
        // 실제 계산 로직 구현 필요
        return 90.0; // 임시 구현
    }

    // 수능 점수 계산
    private double calculateCsatScore(Map<String, Map<String, Integer>> csatScores) {
        // 실제 계산 로직 구현 필요
        return 85.0; // 임시 구현
    }

    // 지원 가능성 분석
    private String analyzeLikelihood(Map<String, Double> estimatedScores, Department department) {
        // 실제 분석 로직 구현 필요
        double averageScore = estimatedScores.values().stream()
                .mapToDouble(Double::doubleValue)
                .average()
                .orElse(0.0);

        if (averageScore >= 90) return "안정";
        else if (averageScore >= 80) return "소신";
        else return "불안";
    }

    // 조언 생성
    private String generateAdvice(String likelihood, String admissionType) {
        return switch (likelihood) {
            case "안정" -> "현재 성적으로 지원 가능성이 높습니다. " + admissionType + " 전형을 적극 고려해보세요.";
            case "소신" -> admissionType + " 전형에 도전해볼 만합니다. 남은 기간 동안 성적 향상에 집중하세요.";
            default -> "지원이 다소 어려울 수 있습니다. 다른 전형이나 학과도 고려해보세요.";
        };
    }
} 