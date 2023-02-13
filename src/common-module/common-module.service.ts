import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CommonModuleService {
  getUuid(): string {
    return uuid();
  }
}