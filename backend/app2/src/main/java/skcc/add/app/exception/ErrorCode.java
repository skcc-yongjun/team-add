package skcc.add.app.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    NOT_FOUND_ELEMENT(10001, HttpStatus.NOT_FOUND, "error.notFoundElement"),
    EXIST_ELEMENT(10002, HttpStatus.BAD_REQUEST, "error.existElement"),
    NOT_MATCHED_PASSWORD(10003, HttpStatus.BAD_REQUEST, "error.notMatchedPassword"),
    NOT_FOUND_FILE(10004, HttpStatus.NOT_FOUND, "error.notFoundFile"),
    NOT_FOUND_END_POINT(90001, HttpStatus.NOT_FOUND, "error.notFoundEndPoint"),
    INTERNAL_SERVER_ERROR(90002, HttpStatus.INTERNAL_SERVER_ERROR, "error.internalServerError"),
    UNAUTHORIZED(90003, HttpStatus.UNAUTHORIZED, "error.unauthorized"),
    ACCESS_DENIED(90004, HttpStatus.FORBIDDEN, "error.accessDenied"),
    INVALID_REQUEST(90005, HttpStatus.BAD_REQUEST, "error.invalidRequest"),
    JWT_EXPIRED_TOKEN(90006, HttpStatus.UNAUTHORIZED, "error.jwtExpiredToken"),
    JWT_INVALID_SIGNATURE(90007, HttpStatus.UNAUTHORIZED, "error.jwtInvalidSignature"),
    JWT_INVALID(90008, HttpStatus.UNAUTHORIZED, "error.jwtInvalid"),
    JWT_NOT_FOUND(90009, HttpStatus.NOT_FOUND, "error.jwtNotFound")
    ;

    private final int code;
    private final HttpStatus status;
    private final String messageKey;

    @Setter
    private static MessageSource messageSource;

    // 메시지를 동적으로 가져오는 메서드 추가
    public String getMessage(Object... args) {
        if (messageSource == null) {
            throw new IllegalStateException("MessageSource has not been set!");
        }
        // 현재 Locale을 기반으로 메시지 제공
        return messageSource.getMessage(messageKey, args, LocaleContextHolder.getLocale());
    }
}
