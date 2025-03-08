import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray, IsNumber } from "class-validator";

export class CreateQuestionDto {
    @ApiProperty({ description: '질문 번호' })
    @IsNumber()
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: '질문 내용' })
    @IsString()
    @IsNotEmpty()
    content: string;

    @ApiProperty({ description: '질문 카테고리' })
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty({ description: '질문 타입' })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ description: '질문 옵션' })
    @IsArray()
    @IsNotEmpty()
    options: {
        answer: string;
        score: number;
    }[];

}
