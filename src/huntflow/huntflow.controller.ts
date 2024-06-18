import {Body, Controller, Get, HttpException, HttpStatus, Post, Put, UseGuards} from '@nestjs/common';
import {HuntflowService} from "./huntflow.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreateKeyPairDto} from "./dto/create-keypair.dto";

@Controller('huntflow')
export class HuntflowController {
    constructor(private huntService: HuntflowService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post('/add')
    async createKeyPair(@Body() dto: CreateKeyPairDto){
        const keyPair = await this.huntService.createKeyPair(dto);
        if(keyPair === false){
            throw new HttpException('KeyPair is already', HttpStatus.NOT_FOUND);

        }
        else return keyPair
    }
    @UseGuards(JwtAuthGuard)
    @Get()
    async getKeyPair(){
        const keyPair = await this.huntService.getKeyPair();
        if(keyPair === false){
            throw new HttpException('KeyPair not found', HttpStatus.NOT_FOUND);

        }else return keyPair
    }

    // @UseGuards(JwtAuthGuard)
    // @Put('/update')
    // async updateKeyPair(@Body() dto: CreateKeyPairDto){
    //    const keyPair = await this.huntService.updateKeyPair(dto)
    //     if(keyPair === false){
    //         throw new HttpException('KeyPair is not found', HttpStatus.NOT_FOUND);
    //     }return keyPair
    // }
}
