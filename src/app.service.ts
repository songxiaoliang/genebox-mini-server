import { Injectable } from '@nestjs/common';
import { InjectPage } from 'nest-puppeteer';
import type { Page } from 'puppeteer';
@Injectable()
export class AppService {

  constructor(@InjectPage() private readonly page: Page) {}

  getHello(): string {
    return 'Hello World!';
  }

  async crawl(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle2' });
    const content = await this.page.content();
    console.log('---', content);
    return { content };
  }

}
