import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LearningModule } from './learning/learning.module';
// import { QuizzesModule } from './quizzes/quizzes.module';
// import { CommunityModule } from './community/community.module';
// import { ResourcesModule } from './resources/resources.module';
import {DatabaseModule} from './db/db.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule, 
    UsersModule, 
    LearningModule, 
    // QuizzesModule, 
    // CommunityModule, 
    // ResourcesModule
  ],
})
export class AppModule {}
