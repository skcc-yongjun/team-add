package skcc.add.biz.acs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skcc.add.biz.acs.entity.CounselingLog;
import java.util.List;

public interface CounselingLogRepository extends JpaRepository<CounselingLog, Long> {
    List<CounselingLog> findByCounselorId(String counselorId);
    List<CounselingLog> findByApplicantName(String applicantName);
    List<CounselingLog> findByDepartmentId(Long departmentId);
} 