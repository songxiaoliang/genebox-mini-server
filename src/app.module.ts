import { Module } from '@nestjs/common';
import { PuppeteerModule } from 'nest-puppeteer';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PuppeteerModule.forRoot(
        {
            pipe: true,
        },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
