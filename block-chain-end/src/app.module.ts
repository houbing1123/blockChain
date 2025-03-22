import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LearningModule } from './learning/learning.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { CommunityModule } from './community/community.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [AuthModule, UsersModule, LearningModule, QuizzesModule, CommunityModule, ResourcesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
