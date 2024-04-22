import {forwardRef, Module} from '@nestjs/common';
import { HuntflowController } from './huntflow.controller';
import { HuntflowService } from './huntflow.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Huntflow} from "./huntflow.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [HuntflowController],
  providers: [HuntflowService],
  imports: [
      SequelizeModule.forFeature([Huntflow]),
      forwardRef(() => AuthModule)
  ],

})
export class HuntflowModule {}
