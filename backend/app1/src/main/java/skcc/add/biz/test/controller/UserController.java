package skcc.add.biz.test.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import skcc.add.biz.test.entity.User;
import skcc.add.biz.test.service.UserService;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Tag(name = "사용자 API", description = "사용자 관리를 위한 API")
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @Operation(summary = "모든 사용자 조회", description = "시스템에 등록된 모든 사용자를 조회합니다.")
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @Operation(
        summary = "사용자 조회", 
        description = "특정 ID를 가진 사용자를 조회합니다.",
        responses = {
            @ApiResponse(
                responseCode = "200",
                description = "사용자를 성공적으로 조회했습니다.",
                content = @Content(schema = @Schema(implementation = User.class))
            ),
            @ApiResponse(
                responseCode = "404",
                description = "사용자를 찾을 수 없습니다."
            )
        }
    )
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @Parameter(description = "조회할 사용자의 ID", required = true)
            @PathVariable(name = "id") Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "사용자 생성", description = "새로운 사용자를 생성합니다.")
    @PostMapping
    public ResponseEntity<User> createUser(
            @Parameter(description = "생성할 사용자 정보", required = true)
            @RequestBody User user) {
        return ResponseEntity.ok(userService.createUser(user));
    }

    @Operation(summary = "사용자 수정", description = "기존 사용자 정보를 수정합니다.")
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @Parameter(description = "수정할 사용자의 ID", required = true)
            @PathVariable(name = "id") Long id,
            @Parameter(description = "수정할 사용자 정보", required = true)
            @RequestBody User user) {
        user.setId(id);
        return ResponseEntity.ok(userService.updateUser(user));
    }

    @Operation(summary = "사용자 삭제", description = "특정 ID를 가진 사용자를 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @Parameter(description = "삭제할 사용자의 ID", required = true)
            @PathVariable(name = "id") Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
} 