package skcc.add.biz.acs.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import skcc.add.biz.acs.entity.CounselingLog;
import java.util.Map;

@Schema(description = "상담 응답 DTO")
@Getter
@Builder
public class CounselingResponse {
    @Schema(description = "상담 ID")
    private Long id;

    @Schema(description = "상담 대상자 이름")
    private String applicantName;

    @Schema(description = "상담 내용")
    private String counselingContent;

    @Schema(description = "예상 환산 점수")
    private Map<String, Double> estimatedScores;

    @Schema(description = "지원 가능성", example = "안정/소신/불안")
    private String likelihood;

    @Schema(description = "조언")
    private String advice;

    public static CounselingResponse from(CounselingLog log, Map<String, Double> estimatedScores, String likelihood, String advice) {
        return CounselingResponse.builder()
                .id(log.getId())
                .applicantName(log.getApplicantName())
                .counselingContent(log.getCounselingContent())
                .estimatedScores(estimatedScores)
                .likelihood(likelihood)
                .advice(advice)
                .build();
    }
} 