import { Injectable } from '@nestjs/common';
import {Huntflow} from "./huntflow.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateKeyPairDto} from "./dto/create-keypair.dto";

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
            return keyPair[0]
        }else return false

    }

    async updateKeyPair(dto: CreateKeyPairDto){
        const keyPair = await this.huntRepository.findAll()
        if (keyPair.length > 0){
            return await this.huntRepository.update(dto, {
                where: {TOKEN: keyPair[0].TOKEN, REFRESH: keyPair[0].REFRESH}
            })
        }return false
    }
}
