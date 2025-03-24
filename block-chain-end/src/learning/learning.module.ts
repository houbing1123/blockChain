import { Module } from '@nestjs/common';
import { LearningService } from './learning.service';
import { LearningController } from './learning.controller';

@Module({
  providers: [LearningService],
  controllers: [LearningController]
})
export class LearningModule {}
