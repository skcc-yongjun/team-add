package skcc.add.biz.file.service.port;

import skcc.add.biz.file.domain.FileModel;

public interface FileRepositoryPort {
    FileModel save(FileModel fileModel);
    FileModel findById(Long id);
}
