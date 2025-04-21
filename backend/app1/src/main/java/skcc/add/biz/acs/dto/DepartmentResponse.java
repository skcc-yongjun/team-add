package skcc.add.biz.acs.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;
import skcc.add.biz.acs.entity.Department;

@Schema(description = "학과 정보 응답 DTO")
@Getter
@Builder
public class DepartmentResponse {
    @Schema(description = "학과 코드")
    private String departmentCode;

    @Schema(description = "학과명")
    private String name;

    @Schema(description = "학과 소개")
    private String introduction;

    @Schema(description = "교육 과정")
    private String curriculum;

    @Schema(description = "졸업 후 진로")
    private String careerPath;

    @Schema(description = "전년도 입시 결과 요약")
    private String admissionResults;

    @Schema(description = "전년도 입시 결과 상세")
    private AdmissionStats lastYearStats;

    @Getter
    @Builder
    public static class AdmissionStats {
        private Double highestGpa;
        private Double averageGpa;
        private Double lowestGpa;
        private Integer highestRank;
        private Integer averageRank;
        private Integer lowestRank;
    }

    public static DepartmentResponse from(Department department) {
        return DepartmentResponse.builder()
                .departmentCode(department.getDepartmentCode())
                .name(department.getName())
                .introduction(department.getIntroduction())
                .curriculum(department.getCurriculum())
                .careerPath(department.getCareerPath())
                .admissionResults(department.getAdmissionResults())
                .lastYearStats(AdmissionStats.builder()
                        .highestGpa(department.getLastYearHighestGpa())
                        .averageGpa(department.getLastYearAverageGpa())
                        .lowestGpa(department.getLastYearLowestGpa())
                        .highestRank(department.getLastYearHighestRank())
                        .averageRank(department.getLastYearAverageRank())
                        .lowestRank(department.getLastYearLowestRank())
                        .build())
                .build();
    }
} 