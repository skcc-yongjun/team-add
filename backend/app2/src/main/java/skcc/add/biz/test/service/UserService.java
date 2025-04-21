package skcc.add.biz.test.service;

import java.util.List;
import skcc.add.biz.test.dto.UserCreateRequest;
import skcc.add.biz.test.dto.UserResponse;
import skcc.add.biz.test.dto.UserUpdateRequest;

public interface UserService {
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    UserResponse createUser(UserCreateRequest request);
    UserResponse updateUser(Long id, UserUpdateRequest request);
    void deleteUser(Long id);
} 