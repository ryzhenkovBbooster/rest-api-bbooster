import { Controller, UseGuards, Get } from '@nestjs/common';
import { OutsidedbService } from './outsidedb.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('outsidedb')
export class OutsidedbController {
    constructor(private outsideService: OutsidedbService){}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getChatInfo(){
        return await this.outsideService.runRawQuery()
    }

}
