import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator';
import { ResultItem } from '../entities/result.entity';
import { Type } from 'class-transformer';

export class CreateResultDto {
  @IsString()
  pinCode: string | null;

  @IsBoolean()
  isCouple: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResultItem)
  response: ResultItem[];
}
