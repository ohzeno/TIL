import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

const createFolder = (folder: string) => {
  // 강의에서는 try catch를 사용하는데, recursive 옵션을 사용하면 폴더가 이미 존재해도 에러가 발생하지 않으므로 코드가 간결해진다.
  console.log('💾 Create a root uploads folder...');
  fs.mkdirSync(path.join(__dirname, '..', `uploads`), { recursive: true });

  console.log(`💾 Create a ${folder} uploads folder...`);
  fs.mkdirSync(path.join(__dirname, '..', `uploads/${folder}`), {
    recursive: true,
  });
};

const storage = (folder: string): multer.StorageEngine => {
  createFolder(folder);
  return multer.diskStorage({
    // 저장경로
    destination(req, file, cb) {
      const folderName = path.join(__dirname, '..', `uploads/${folder}`);
      // cb는 콜백함수를 의미함. 첫번째 인자는 에러, 두번째 인자는 저장경로
      // 첫 인자가 null이므로 에러가 없고 folderName에 파일을 저장하라는 의미
      cb(null, folderName);
    },
    // 파일명
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      // basename은 파일명에서 확장자를 제외한 파일명을 반환한다.
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;
      cb(null, fileName);
    },
  });
};

export const multerOptions = (folder: string) => {
  const result: MulterOptions = {
    storage: storage(folder),
  };
  return result;
};
