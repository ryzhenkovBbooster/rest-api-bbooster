import { Injectable } from '@nestjs/common';
import {Huntflow} from "./huntflow.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateKeyPairDto} from "./dto/create-keypair.dto";
import axios from 'axios';


@Injectable()
export class HuntflowService {
    constructor(@InjectModel(Huntflow) private huntRepository: typeof Huntflow) {}


    async createKeyPair(dto: CreateKeyPairDto){
        const checkPair = await this.huntRepository.findAll()
        if (checkPair.length > 0){
            return false
        }
        return await this.huntRepository.create({...dto})
    }

    async getKeyPair(){
        const keyPair = await this.huntRepository.findAll()
        if(keyPair.length > 0){
            const checkValidToken = await this.refreshToken(keyPair[0].REFRESH)
            if (checkValidToken === false){
            return keyPair[0]
            }
            return checkValidToken.TOKEN
            
        }else return false

    }

    // async updateKeyPair(dto: CreateKeyPairDto){
    //     const keyPair = await this.huntRepository.findAll()
    //     if (keyPair.length > 0){
    //         return await this.huntRepository.update(dto, {
    //             where: {TOKEN: keyPair[0].TOKEN, REFRESH: keyPair[0].REFRESH}
    //         })
    //     }return false
    // }

    private async refreshToken(refreshToken: string){

        const url = 'https://api.huntflow.ai/v2/token/refresh';
        try{
        const response = await axios.post(url, {refresh_token: refreshToken})
        
        
            const data = {
            TOKEN: response.data['access_token'],
            REFRESH: response.data['refresh_token']
            }
            await this.huntRepository.update(data, {where : {REFRESH: data.REFRESH}})
            return data
        
        }catch (err){
            console.log(err.response.data)
            // console.log(err)
            return false
        }
    }
}
