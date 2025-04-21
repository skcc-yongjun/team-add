package skcc.add.biz.acs.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import skcc.add.biz.common.infrastructure.jpa.BaseEntity;

@Entity
@Table(name = "acs_counseling_logs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CounselingLog extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String counselorId;      // 상담사 ID

    @Column(nullable = false)
    private String applicantName;    // 상담 대상자 이름

    private String applicantContact; // 연락처

    @Column(columnDefinition = "TEXT")
    private String counselingContent; // 상담 내용

    // 성적 정보 (JSON 형태로 저장)
    @Column(columnDefinition = "TEXT")
    private String gpaScores;        // 학생부 교과 성적

    @Column(columnDefinition = "TEXT")
    private String csatScores;       // 수능 성적

    @Column(columnDefinition = "TEXT")
    private String extraActivities;  // 비교과 활동

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")
    private Department department;    // 관심 학과

    @Column(nullable = false)
    private String admissionType;    // 관심 전형
} 