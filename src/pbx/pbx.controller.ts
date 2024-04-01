import {Body, Controller, Get, Post, Res} from '@nestjs/common';
import {PbxService} from "./pbx.service";
// import {rethrow} from "@nestjs/core/helpers/rethrow";
import {Response} from "express";

@Controller('pbx')
export class PbxController {
    constructor(private pbxService: PbxService) {}

    @Post()
    async getCaller(@Res() response: Response, @Body() body: any){
        if (body.event == 'call_missed' ){
            await this.pbxService.postCalledMessage(body)

        }

        return await response.status(200).json('ok')
    }

    @Get()
    async testCaller(@Res() response: Response){
        return await response.status(200).json({kek: 'lol'})
    }
}
