import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { MiniUploadController } from '../controller';
import { MiniUploadService } from '../service';

@Module({
  imports: [
    PuppeteerModule.forRoot({ pipe: true }),
  ],
  controllers: [MiniUploadController],
  providers: [MiniUploadService],
})

export class AppModule {}
