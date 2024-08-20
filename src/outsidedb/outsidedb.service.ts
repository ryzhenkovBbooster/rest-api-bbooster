import { Injectable, Inject } from '@nestjs/common';
import {InjectModel, InjectConnection} from "@nestjs/sequelize";
import { Sequelize } from 'sequelize';
import { OutsideDb } from './outsidedb.model'

@Injectable()
export class OutsidedbService {
    constructor(@InjectConnection('secondDatabase') private readonly sequelize: Sequelize,){}

    async runRawQuery() {
        const [results, metadata] = await this.sequelize.query(`
      SELECT ci.*, tc.*
      FROM public.chat_info ci
      JOIN public.tg_chat tc ON ci.chat = tc.chat_id;
    `);
        return results;
      }
}
