import { Module, forwardRef } from '@nestjs/common';
import { ZoomController } from './zoom.controller';
import { ZoomService } from './zoom.service';
import {redisStore} from "cache-manager-redis-store";
import {CacheModule} from "@nestjs/cache-manager";
import {RedisModule} from "../redis/redis.module";
import {RedisService} from "../redis/redis.service";
import {AuthModule} from "../auth/auth.module";


@Module({
  imports: [RedisModule, forwardRef(() => AuthModule)],

  controllers: [ZoomController],
  providers: [ZoomService, RedisService],
  
})
export class ZoomModule {}
