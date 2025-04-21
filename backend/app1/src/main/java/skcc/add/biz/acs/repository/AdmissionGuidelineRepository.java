package skcc.add.biz.acs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skcc.add.biz.acs.entity.AdmissionGuideline;
import java.util.List;
import java.util.Optional;

public interface AdmissionGuidelineRepository extends JpaRepository<AdmissionGuideline, Long> {
    List<AdmissionGuideline> findByAdmissionRound(String admissionRound);
    Optional<AdmissionGuideline> findByAdmissionRoundAndAdmissionType(String admissionRound, String admissionType);
} 