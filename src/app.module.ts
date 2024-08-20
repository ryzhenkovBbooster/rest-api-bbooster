import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import {User} from "./user/user.model";
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { ZoomModule } from './zoom/zoom.module';

import { RedisModule } from './redis/redis.module';
import {RedisService} from "./redis/redis.service";
// import { OnlineModule } from './pbx/online/online.module';
// import { PbxController } from './pbx/pbx.controller';
import { PbxModule } from './pbx/pbx.module';
import { HuntflowModule } from './huntflow/huntflow.module';
import { OutsidedbModule } from './outsidedb/outsidedb.module';
import { OutsideDb } from './outsidedb/outsidedb.model'


@Module({
  imports: [
      ConfigModule.forRoot({
            envFilePath: `.env`


      }),




      SequelizeModule.forRoot({
          dialect: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          username: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          models: [User],
          autoLoadModels: true,
      }),
      SequelizeModule.forRoot({
        name: 'secondDatabase',
        dialect: 'postgres',
        host: process.env.CHAT_INFO_HOST,
        port: 5432,
        username: process.env.CHAT_INFO_USERNAME,
        password: process.env.CHAT_INFO_PASSWORD,
        database: process.env.CHAT_INFO_USERNAME,
        models: [OutsideDb],
        autoLoadModels: true,
        synchronize: true,
      }),
      UserModule,
      AuthModule,
      AccountsModule,
      ZoomModule,
      RedisModule,
      PbxModule,
      HuntflowModule,
      OutsidedbModule,


  ],
  controllers: [AppController],
  providers: [AppService, RedisService],
    exports: [
        RedisService
    ]
})
export class AppModule {}
