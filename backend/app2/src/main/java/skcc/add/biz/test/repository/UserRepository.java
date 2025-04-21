package skcc.add.biz.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import skcc.add.biz.test.entity.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserId(String userId);
} 