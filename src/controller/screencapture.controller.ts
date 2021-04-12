import { Controller, Get } from '@nestjs/common';
import { ScreenCaptureService } from '../service';

@Controller()
export class ScreenCaptureController {
  constructor(private readonly appService: ScreenCaptureService) {}

  @Get()
  async getHello() {
    this.appService.crawl("https://www.baidu.com/");
  }
}
