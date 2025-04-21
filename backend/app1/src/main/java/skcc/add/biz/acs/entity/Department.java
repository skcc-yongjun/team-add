package skcc.add.biz.acs.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import skcc.add.biz.common.infrastructure.jpa.BaseEntity;

@Entity
@Table(name = "acs_departments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Department extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String departmentCode;    // 학과 코드

    @Column(nullable = false)
    private String name;              // 학과명

    @Column(columnDefinition = "TEXT")
    private String introduction;      // 학과 소개

    @Column(columnDefinition = "TEXT")
    private String curriculum;        // 교육 과정

    @Column(columnDefinition = "TEXT")
    private String careerPath;        // 졸업 후 진로

    @Column(columnDefinition = "TEXT")
    private String admissionResults;  // 전년도 입시 결과 요약

    // 전년도 입시 결과 상세 정보
    private Double lastYearHighestGpa;    // 전년도 최고 내신
    private Double lastYearAverageGpa;    // 전년도 평균 내신
    private Double lastYearLowestGpa;     // 전년도 최저 내신

    private Integer lastYearHighestRank;  // 전년도 최고 등수
    private Integer lastYearAverageRank;  // 전년도 평균 등수
    private Integer lastYearLowestRank;   // 전년도 최저 등수
} 