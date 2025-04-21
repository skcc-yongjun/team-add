package skcc.add.biz.acs.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import skcc.add.biz.acs.entity.AdmissionGuideline;

@Schema(description = "모집요강 응답 DTO")
@Getter
@Builder
public class GuidelineResponse {
    @Schema(description = "모집 시기", example = "2024 수시")
    private String admissionRound;

    @Schema(description = "전형 유형", example = "학생부종합")
    private String admissionType;

    @Schema(description = "평가 방식")
    private String evaluationMethod;

    @Schema(description = "제출 서류")
    private String requiredDocuments;

    @Schema(description = "전형 일정")
    private String schedule;

    @Schema(description = "추가 정보")
    private String additionalInfo;

    public static GuidelineResponse from(AdmissionGuideline guideline) {
        return GuidelineResponse.builder()
                .admissionRound(guideline.getAdmissionRound())
                .admissionType(guideline.getAdmissionType())
                .evaluationMethod(guideline.getEvaluationMethod())
                .requiredDocuments(guideline.getRequiredDocuments())
                .schedule(guideline.getSchedule())
                .additionalInfo(guideline.getAdditionalInfo())
                .build();
    }
} 