import { Body, Injectable } from '@nestjs/common';
import type { Page } from 'puppeteer';
import { InjectPage } from 'nest-puppeteer';

const path = require('path');
const ci = require('miniprogram-ci');
// const package = require('./package.json');

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
            // privateKeyPath: argv.p, // 密钥路径
            // projectPath: path.resolve(appDirectory, './dist'), // 项目路径
        });
        const uploadResult = await ci.upload({
            project,
            desc: desc,
            version: version,
            setting: UploadConfig.setting,
            onProgressUpdate: console.log,
        });
        console.log(uploadResult)
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
    // base64需要添加前缀: data:image/jpeg;base64,
    const img = await this.page.screenshot({
        path: 'screenshot.png',
        // encoding: 'base64',
        // clip: {
        //     x: 20, // 裁剪区域相对于左上角（0， 0）的x坐标
        //     y: 20, // 裁剪区域相对于左上角（0， 0）的y坐标
        //     width: 100, // 裁剪的宽度
        //     height: 100, // 裁剪的高度
        // }
    });
    // 等待跳转到管理页面
    await this.page.waitForNavigation();
    // 选择版本管理
    const link = await this.page.$('.menu_item');
    await link.click();
    // 等待版本管理内部跳转
    await this.page.waitForSelector('.code_version_logs');
    // 选择版本

    // 设置为体验版

    // 打开验证码图片

    // 截取验证码
    const img2 = await this.page.screenshot({
        path: 'screenshot1.png',
    });
    // 将验证码回发给前端页面，并同步钉钉通知
    // 关闭页面
  }

  /**
   * 通知群
   * @memberof MiniUploadService
   */
  async notify() {

  }
}