import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionModule } from './question/question.module';
import { QuestionService } from './question/question.service';


@Module({
  imports: [QuestionModule],
  controllers: [AppController],
  providers: [AppService, QuestionService],
})
export class AppModule {}
