import { Module } from '@nestjs/common';
import { PbxService } from './pbx.service';
import {PbxController} from "./pbx.controller";

@Module({
  providers: [PbxService],
  controllers: [PbxController],

})
export class PbxModule {}
