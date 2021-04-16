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
  async puppteerWork(url: string) {
    // launch 微信公众平台
    await this.page.goto(url, { waitUntil: 'networkidle2' });

    // 获取登录二维码位置
    const wxLoginCode = await this.page.$('.login__type__container__scan__qrcode');
    const wxLoginCodeboundingBox = await wxLoginCode.boundingBox();
    
    // 截取登录二维码 
    await this.page.screenshot({
        // encoding: 'base64',
        path: 'wx_login_code.png',
        clip: {
            x: wxLoginCodeboundingBox.x,
            y: wxLoginCodeboundingBox.y,
            width: wxLoginCodeboundingBox.width,
            height: wxLoginCodeboundingBox.height,
        }
    });
    
    // 将二维码回传前端展示

    // 等待扫描登录二维码，跳转到管理页面
    await this.page.waitForNavigation();
    await this.page.waitForSelector('.menu_item');
  
    // 选择版本管理
    const link = await this.page.click('.menu_item');
    
    // 等待版本管理内部跳转
    await this.page.waitForSelector('.code_version_logs');
    
    // 选择版本
    
    // 设为体验版
    
    // 打开体验版二维码
    await this.page.click('.js_show_exp_version');

    // 获取体验版二维码位置 
    await this.page.waitForSelector('.code_qrcode');
    const devMiniCode = await this.page.$('.code_qrcode');
   
    // 截取体验版二维码
    await devMiniCode.screenshot({
        // encoding: 'base64',
        path: 'mini_dev_code.png',
    });

    // 将体验版回发给前端页面，并同步钉钉通知
    this.notify();
  
    // 关闭页面
    this.page.close();
  }

  /**
   * 通知群
   * @memberof MiniUploadService
   */
  async notify() {

  }
}