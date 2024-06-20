import { Controller, Get, Query, Post, Body, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('checkCrush')
  async checkCrush(){
    return 'succes'
  }
  @Get()
  async fishLink(@Query('number') number: number){
    const currentTime = new Date().toISOString()
    let message = `Пользователй перешел по уникальной ссылке с номером ${number}. Время перехода ${currentTime}`
    const sendMessage = ''
    if(sendMessage){
      return ''
    }
    return ''
  }
@Post('scrap')
  async scrap_links(@Body() data: any){
    const scraps = await this.appService.scrap(data['arr'])
    const scrapsJSON = JSON.stringify(scraps)

    if ("true" in scraps){
      await this.appService.sendMessageInTelegram(`@MaxViktorov\n${scrapsJSON}`)
    }
     
     return ''

  }
}
