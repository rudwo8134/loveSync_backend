import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { QuestionService } from 'src/question/question.service';
import { QuestionModel } from 'src/question/entities/question.entity';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Result, QuestionModel])],
  controllers: [ResultController],
  providers: [ResultService, QuestionService],
  exports: [ResultService],
})
export class ResultModule {}
