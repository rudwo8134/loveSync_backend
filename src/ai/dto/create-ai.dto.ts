import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class ResponseItem {
  text: string;
  optionText: string;
  score: number;
  type: string;
}

export class CreateAiDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponseItem)
  response: ResponseItem[];
}
