package skcc.add.biz.acs.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skcc.add.biz.acs.entity.Department;
import java.util.Optional;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByDepartmentCode(String departmentCode);
    Optional<Department> findByName(String name);
} 