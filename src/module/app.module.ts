import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { ScreenCaptureController } from '../controller';
import { ScreenCaptureService } from '../service';

@Module({
  imports: [
    PuppeteerModule.forRoot({ pipe: true }),
  ],
  controllers: [ScreenCaptureController],
  providers: [ScreenCaptureService],
})

export class AppModule {}
