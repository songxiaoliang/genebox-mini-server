import { Body, Injectable } from '@nestjs/common';
import type { Page } from 'puppeteer';
import { InjectPage } from 'nest-puppeteer';

const path = require('path');
const ci = require('miniprogram-ci');
const package = require('./package.json');

import { UploadConfig } from '../config';

@Injectable()
export class MiniUploadService {

  constructor(@InjectPage() private readonly page: Page) {}

  /**
   * 上传
   * @memberof MiniUploadService
   */
  async upload(version, desc) {
    try {
        const project = new ci.Project({
            type: "miniProgram",
            appid: UploadConfig.appid,
            ignores: ["node_modules/**/*"],
            privateKeyPath: argv.p, // 密钥路径
            projectPath: path.resolve(appDirectory, './dist'), // 项目路径
        });
        await ci.upload({
            project,
            desc: desc,
            version: version,
            setting: UploadConfig.setting,
            onProgressUpdate: console.log,
        });
    } catch (e: any) {
        console.log('upload error: ', e);
    }
  }

  /**
   * 截取二维码
   * @param {string} url
   * @returns
   * @memberof MiniUploadService
   */
  async crawl(url: string) {
    await this.page.goto(url, { waitUntil: 'networkidle2' });
    const content = await this.page.content();
    return { content };
  }

  /**
   * 通知群
   * @memberof MiniUploadService
   */
  async notify() {

  }
}