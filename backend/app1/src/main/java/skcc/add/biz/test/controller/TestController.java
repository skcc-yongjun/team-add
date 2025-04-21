package skcc.add.biz.test.controller;

import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import skcc.add.app.dto.ApiResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController("/api")
public class TestController {
    
    @GetMapping("/test")
    public ApiResponse<Temp> getMethodName(@RequestParam(name = "name") String name) {
        return ApiResponse.ok(new Temp(name));
    }
    
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Temp {
        private String name;
    }
}
