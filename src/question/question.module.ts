import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModel } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
