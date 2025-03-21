import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateQuestionDto {
  @ApiPropertyOptional({ description: '질문 번호 (자동 생성됨)' })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty({ description: '질문 내용' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ description: '질문 옵션' })
  @IsArray()
  @IsNotEmpty()
  options: {
    id: number;
    text: string;
    score: number;
  }[];

  @ApiProperty({ description: '질문 타입' })
  @IsString()
  @IsNotEmpty()
  type: string;
}
