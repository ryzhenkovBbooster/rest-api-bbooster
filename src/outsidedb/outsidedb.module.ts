import { forwardRef, Module } from '@nestjs/common';
import { OutsidedbController } from './outsidedb.controller';
import { OutsidedbService } from './outsidedb.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { OutsideDb } from './outsidedb.model'
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
        OutsideDb
    ]),
    forwardRef(() => AuthModule)
],
  controllers: [OutsidedbController],
  providers: [OutsidedbService],
  exports: [OutsidedbService]
})
export class OutsidedbModule {}
