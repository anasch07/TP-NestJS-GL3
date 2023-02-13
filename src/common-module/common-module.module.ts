import { Global, Module } from '@nestjs/common';
import { CommonModuleService } from './common-module.service';
import { v4 as uuid } from 'uuid';
const uuidProvider = {
  useValue: uuid,
  provide: 'UUID',
};
@Global()
@Module({
  providers: [uuidProvider, CommonModuleService],
  exports: [uuidProvider, CommonModuleService],
})
export class CommonModuleModule {}
