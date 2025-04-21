package skcc.add.biz.test.service;

import java.util.List;
import java.util.Optional;

import skcc.add.biz.test.entity.User;

public interface UserService {
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    User createUser(User user);
    User updateUser(User user);
    void deleteUser(Long id);
} 