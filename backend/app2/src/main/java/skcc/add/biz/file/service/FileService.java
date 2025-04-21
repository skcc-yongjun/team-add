package skcc.add.biz.file.service;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import skcc.add.app.exception.CustomException;
import skcc.add.app.exception.ErrorCode;
import skcc.add.biz.file.controller.port.FileServicePort;
import skcc.add.biz.file.domain.FileDownload;
import skcc.add.biz.file.domain.FileCreate;
import skcc.add.biz.file.domain.FileModel;
import skcc.add.biz.file.service.port.FileRepositoryPort;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FileService implements FileServicePort {

    private final UploadPolicies uploadPolicies;
    private final FileRepositoryPort repository;

    /**
     * 단건 파일 저장
     */
    public FileModel storeFile(MultipartFile multipartFile, String policyKey) throws IOException
    {
        if (multipartFile.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어 있습니다.");
        }

        // 정책 정보 가져오기
        UploadPolicies.UploadPolicy policy = getPolicy(policyKey);

        // 파일생성 모델
        FileCreate fileCreate = FileCreate.from(multipartFile, policy);

        File file = new File(getFullPath(fileCreate.getDirPath(), fileCreate.getEncName()));
        if (!file.getParentFile().exists()) {
            if(!file.getParentFile().mkdirs()) {
                throw new RuntimeException("폴더 생성 실패");
            }
        }
        multipartFile.transferTo(file);

        // DB 저장 정책이 있을경우 DB에 저장한다
        if (policy.isSaveDb()) {
            return saveToDb(fileCreate);
        }else {
            return FileModel.from(fileCreate);
        }
    }

    /**
     * 다건 파일 저장
     */
    public List<FileModel> storeFiles(List<MultipartFile> multipartFiles, String policy) throws IOException {
        List<FileModel> storeFileModelResult = new ArrayList<>();
        for (MultipartFile multipartFile : multipartFiles) {
            if (!multipartFile.isEmpty()) {
                storeFileModelResult.add(storeFile(multipartFile, policy));
            }
        }
        return storeFileModelResult;
    }


    /**
     * 파일 다운로드
     */
    @Override
    public FileDownload getFileDownload(FileModel fileModel) {

        if(fileModel.getDirPath() != null && fileModel.getOrgName() != null) {
            return getDownloadFileByFilepath(getFullPath(fileModel.getDirPath(), fileModel.getOrgName()));
        } else if(fileModel.getId() != 0) {
            return getDownloadFileByFileId(fileModel.getId());
        }
        return null;
    }


    /**
     * 파일 경로로 다운로드
     */
    public FileDownload getDownloadFileByFilepath(String filePath) {

        Path path = Paths.get(filePath);
        InputStreamResource resource;
        try {
            resource = new InputStreamResource(Files.newInputStream(path));
        } catch (IOException e) {
            throw new CustomException(ErrorCode.NOT_FOUND_FILE);
        }
        String fileName = path.getFileName().toString();
        return new FileDownload(fileName, resource);
    }

    /**
     * 파일 id 정보로 파일을 찾는다.
     * 저장한 파일명은 오리지널 파일명이다
     */
    public FileDownload getDownloadFileByFileId(long id) {
        FileModel result = repository.findById(id);
        if (result == null) {
            throw new CustomException(ErrorCode.NOT_FOUND_FILE);
        }
        String filePath = getFullPath(result.getDirPath(), result.getEncName());
        FileDownload downloadFileByFilepath = getDownloadFileByFilepath(filePath);
        return new FileDownload(result.getOrgName(), downloadFileByFilepath.resource());
    }

    /**
     * 파일정보를 DB에 저장한다
     */
    private FileModel saveToDb(FileCreate createRequest) {
        return repository.save(FileModel.from(createRequest));
    }

    /**
     * 업로드 정책 정보를 가져온다
     */
    private UploadPolicies.UploadPolicy getPolicy(String policyKey) {
        UploadPolicies.UploadPolicy uploadPolicy = uploadPolicies.getUploadPolices().get(policyKey);
        if (uploadPolicy == null) {
            throw new IllegalStateException("정책 정보가 없습니다. policyKey :" + policyKey );
        }
        return uploadPolicy;
    }

    private String getFullPath(String dirPath, String filename) {
        return dirPath + "/" + filename;
    }

}
