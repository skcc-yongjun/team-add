package skcc.add.biz.file.infrastructure;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import skcc.add.biz.file.domain.FileModel;
import skcc.add.biz.file.infrastructure.jpa.FIleRepositoryJpa;
import skcc.add.biz.file.infrastructure.jpa.FileEntity;
import skcc.add.biz.file.service.port.FileRepositoryPort;

@Repository
@RequiredArgsConstructor
public class FileRepositoryJpaCustomImpl implements FileRepositoryPort {

    private final FIleRepositoryJpa repository;

    @Override
    public FileModel save(FileModel fileModel) {
        FileEntity savedEntity = repository.save(FileEntity.from(fileModel));

        return savedEntity.toModel();
    }

    @Override
    public FileModel findById(Long id) {
        FileEntity entity = repository.findById(id).orElse(null);
        return entity == null ? null : entity.toModel();
    }
}
