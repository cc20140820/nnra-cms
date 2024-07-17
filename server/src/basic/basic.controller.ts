import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + Math.round(Math.random() * 1e9);
    const extension = file.originalname.slice(
      file.originalname.lastIndexOf('.'),
    );
    cb(null, `${uniquePrefix}${extension}`);
  },
});

@Controller('basic')
export class BasicController {
  constructor() {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage,
      limits: {
        fileSize: 1024 * 1024 * 1, // 1MB
      },
      fileFilter: (req, file, cb) => {
        const isJpgOrPng =
          file.mimetype === 'image/jpeg' || file.mimetype === 'image/png';
        cb(null, isJpgOrPng);
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    const realPath = file.path.replace('public', 'static');
    return { url: realPath };
  }
}
