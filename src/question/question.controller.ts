import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '새로운 질문 생성' })
  @ApiBody({
    type: CreateQuestionDto,
    examples: {
      example1: {
        summary: '기본 예시',
        value: {
          text: '연애에서 가장 중요하게 생각하는 것은?',
          options: [
            {
              id: 1,
              text: '서로를 이해하고 배려하는 것',
              score: 10,
            },
            {
              id: 2,
              text: '함께 성장하고 도전하는 것',
              score: 8,
            },
            {
              id: 3,
              text: '자유롭고 각자의 생활을 존중하는 것',
              score: 6,
            },
            {
              id: 4,
              text: '항상 설렘과 재미를 유지하는 것',
              score: 4,
            },
          ],
          type: 'personality',
        },
      },
      example2: {
        summary: '관계 유형 질문 예시',
        value: {
          text: '갈등이 생겼을 때 어떻게 해결하는 편인가요?',
          options: [
            {
              id: 1,
              text: '대화를 통해 서로의 입장을 이해하려고 노력한다',
              score: 10,
            },
            {
              id: 2,
              text: '시간을 두고 감정이 가라앉은 후 이야기한다',
              score: 8,
            },
            {
              id: 3,
              text: '문제의 원인을 분석하고 해결책을 찾는다',
              score: 6,
            },
            {
              id: 4,
              text: '갈등을 피하고 넘어가려고 한다',
              score: 4,
            },
          ],
          type: 'conflict',
        },
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: '질문 생성 성공',
    schema: {
      example: {
        text: '연애에서 가장 중요하게 생각하는 것은?',
        type: 'personality',
        options: [
          {
            id: 1,
            text: '서로를 이해하고 배려하는 것',
            score: 10,
          },
          {
            id: 2,
            text: '함께 성장하고 도전하는 것',
            score: 8,
          },
          {
            id: 3,
            text: '자유롭고 각자의 생활을 존중하는 것',
            score: 6,
          },
          {
            id: 4,
            text: '항상 설렘과 재미를 유지하는 것',
            score: 4,
          },
        ],
        id: 1,
        createdAt: '2025-03-12T04:04:24.451Z',
        updatedAt: '2025-03-12T04:04:24.451Z',
        version: 1,
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: '질문 생성 실패',
    schema: {
      example: {
        statusCode: 400,
        message: ['questionText must be a string', 'options must be an array'],
        error: 'Bad Request',
      },
    },
  })
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionService.remove(+id);
  }
}
