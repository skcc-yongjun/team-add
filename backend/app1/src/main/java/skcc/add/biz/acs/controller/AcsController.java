package skcc.add.biz.acs.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import skcc.add.biz.acs.dto.*;
import skcc.add.biz.acs.service.AcsService;

@Tag(name = "입학 상담 API", description = "입학 상담 관련 API")
@RestController
@RequestMapping("/api/acs")
@RequiredArgsConstructor
public class AcsController {

    private final AcsService acsService;

    @Operation(summary = "모집요강 조회", description = "모집 시기와 전형 유형에 따른 모집요강을 조회합니다.")
    @GetMapping("/guidelines")
    public ResponseEntity<GuidelineResponse> getGuideline(
            @Parameter(description = "모집 시기", example = "2024 수시")
            @RequestParam(name = "admissionRound") String admissionRound,
            @Parameter(description = "전형 유형", example = "학생부종합")
            @RequestParam(name = "admissionType") String admissionType) {
        return ResponseEntity.ok(acsService.getGuideline(admissionRound, admissionType));
    }

    @Operation(summary = "학과 정보 조회", description = "학과 코드에 해당하는 학과 정보를 조회합니다.")
    @GetMapping("/departments/{departmentCode}")
    public ResponseEntity<DepartmentResponse> getDepartment(
            @Parameter(description = "학과 코드")
            @PathVariable(name = "departmentCode") String departmentCode) {
        return ResponseEntity.ok(acsService.getDepartment(departmentCode));
    }

    @Operation(summary = "상담 정보 저장", description = "상담 정보를 저장하고 성적 분석 결과를 반환합니다.")
    @PostMapping("/counseling/log")
    public ResponseEntity<CounselingResponse> saveCounseling(
            @Parameter(description = "상담사 ID")
            @RequestParam(name = "counselorId") String counselorId,
            @Valid @RequestBody CounselingRequest request) {
        return ResponseEntity.ok(acsService.saveCounseling(counselorId, request));
    }

    @Operation(summary = "성적 분석 시뮬레이션", description = "입력된 성적 정보를 바탕으로 지원 가능성을 분석합니다.")
    @PostMapping("/counseling/simulation")
    public ResponseEntity<CounselingResponse> simulateCounseling(
            @Valid @RequestBody CounselingRequest request) {
        return ResponseEntity.ok(acsService.simulateCounseling(request));
    }
} 