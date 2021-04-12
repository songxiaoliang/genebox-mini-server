import { UploadResult } from './../interface/UploadResult';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { MiniUploadService } from '../service';

@Controller('mini')
export class MiniUploadController {
  constructor(private readonly service: MiniUploadService) {}

  @Get()
  async getHello() {
    this.service.crawl("https://www.baidu.com/");
  }

  @Post()
  async upload(@Body() body: { version: string, desc: string }): Promise<UploadResult> {
    await this.service.upload(body.version, body.desc);
    return { code: 200, message: '登录成功',  };
  }
}
