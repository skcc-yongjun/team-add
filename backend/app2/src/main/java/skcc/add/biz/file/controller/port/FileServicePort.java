package skcc.add.biz.file.controller.port;

import org.springframework.web.multipart.MultipartFile;
import skcc.add.biz.file.domain.FileDownload;
import skcc.add.biz.file.domain.FileModel;

import java.io.IOException;
import java.util.List;

public interface FileServicePort {

    FileModel storeFile(MultipartFile multipartFile, String policyKey) throws IOException;
    List<FileModel> storeFiles(List<MultipartFile> multipartFiles, String policyKey) throws IOException;
    FileDownload getFileDownload(FileModel fileModel);
}
