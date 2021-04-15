import { UploadResult } from './../interface/UploadResult';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MiniUploadService } from '../service';
import url from 'src/config/url';

@Controller('genebox/mini')
export class MiniUploadController {
  constructor(private readonly service: MiniUploadService) {}

  @Post()
  async upload(@Body() body: { version: string, desc: string }): Promise<UploadResult> {
    await this.service.upload(body.version, body.desc);
    return { code: 200, message: '上传成功' };
  }

  @Get()
  async testPuppteerWork() {
    this.service.puppteerWork(url.WX_MANAGER_URL);
  }
}
