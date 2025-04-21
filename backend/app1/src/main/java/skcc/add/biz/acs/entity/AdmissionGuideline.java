package skcc.add.biz.acs.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import skcc.add.biz.common.infrastructure.jpa.BaseEntity;

@Entity
@Table(name = "acs_admission_guidelines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdmissionGuideline extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String admissionRound;  // 모집 시기 (예: 2024 수시)

    @Column(nullable = false)
    private String admissionType;   // 전형 유형 (예: 학생부종합)

    @Column(columnDefinition = "TEXT")
    private String evaluationMethod;  // 평가 방식

    @Column(columnDefinition = "TEXT")
    private String requiredDocuments;  // 제출 서류

    @Column(columnDefinition = "TEXT")
    private String schedule;          // 전형 일정

    @Column(columnDefinition = "TEXT")
    private String additionalInfo;    // 추가 정보
} 