import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { QuestionService } from 'src/question/question.service';
import { QuestionModel } from 'src/question/entities/question.entity';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AiService } from 'src/ai/ai.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Result, QuestionModel]), HttpModule],
  controllers: [ResultController],
  providers: [ResultService, QuestionService, AiService],
  exports: [ResultService],
})
export class ResultModule {}
