import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, ValidateNested } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  pinCode: string | null;

  @Column()
  @IsBoolean()
  isCouple: boolean;

  @Column({ type: 'jsonb' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResultItem)
  response: ResultItem[];

  @Column({ type: 'jsonb', nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResultItem)
  coupleResponse: ResultItem[];

  @Column({ nullable: true })
  personResult: string | null;

  @Column({ nullable: true })
  coupleResult: string | null;
}

export class ResultItem {
  @IsNumber()
  id: number;
  @IsNumber()
  selection: number;
}
