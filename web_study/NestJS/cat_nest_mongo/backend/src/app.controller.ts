import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AwsService } from './aws.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly awsService: AwsService) {}

  @Get()
  getHello() {
    return 'hello, aws s3';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return await this.awsService.uploadFileToS3('cats', file);
  }

  @Post('cats') // key에 '/'가 있어서 url로 넣으면 제대로 라우팅이 안됨. body에 넣어서 보내기 위해 post로 보냄
  getImageUrl(@Body('key') key: string) {
    return this.awsService.getAwsS3FileUrl(key);
  }

  @Post('delete')
  deleteS3Object(@Body('key') key: string) {
    return this.awsService.deleteS3Object(key);
  }
}
