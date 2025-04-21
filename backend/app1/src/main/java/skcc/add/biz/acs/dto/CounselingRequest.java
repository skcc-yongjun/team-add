package skcc.add.biz.acs.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import java.util.Map;

@Schema(description = "상담 요청 DTO")
@Getter
@Setter
public class CounselingRequest {
    @Schema(description = "상담 대상자 이름")
    @NotBlank(message = "상담 대상자 이름은 필수입니다.")
    private String applicantName;

    @Schema(description = "연락처")
    private String applicantContact;

    @Schema(description = "상담 내용")
    private String counselingContent;

    @Schema(description = "학생부 교과 성적", example = "{\"1학년\": {\"국어\": 1, \"수학\": 2}, \"2학년\": {\"국어\": 2, \"수학\": 1}}")
    private Map<String, Map<String, Integer>> gpaScores;

    @Schema(description = "수능 성적", example = "{\"국어\": {\"표준점수\": 131, \"백분위\": 95}, \"수학\": {\"표준점수\": 137, \"백분위\": 98}}")
    private Map<String, Map<String, Integer>> csatScores;

    @Schema(description = "비교과 활동")
    private String extraActivities;

    @Schema(description = "관심 학과 코드")
    @NotBlank(message = "관심 학과는 필수입니다.")
    private String departmentCode;

    @Schema(description = "관심 전형", example = "학생부종합")
    @NotBlank(message = "관심 전형은 필수입니다.")
    private String admissionType;
} 