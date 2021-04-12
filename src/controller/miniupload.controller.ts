import { Controller, Get } from '@nestjs/common';
import { MiniUploadService } from '../service';

@Controller()
export class MiniUploadController {
  constructor(private readonly appService: MiniUploadService) {}

  @Get()
  async getHello() {
    this.appService.crawl("https://www.baidu.com/");
  }
}
