import { Module } from '@nestjs/common';
import { DateCommonEntity } from './entities/date-common.entity';

@Module({
  imports: [DateCommonEntity],
})
export class GlobalModule {}
