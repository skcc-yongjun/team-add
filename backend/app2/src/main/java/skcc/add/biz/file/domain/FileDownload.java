package skcc.add.biz.file.domain;

import org.springframework.core.io.Resource;

public record FileDownload(
        String fileName,
        Resource resource
){
}
