import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiProperty({ description: '질문 번호' })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
