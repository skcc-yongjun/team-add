package skcc.add.biz.user.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserCreate {

    private final String email;
    private final String password;
    private final String username;

}
