import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';

@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @ApiOperation({ summary: '결과 생성' })
  @ApiResponse({ status: 200, description: '결과 생성 성공' })
  @ApiResponse({ status: 400, description: '결과 생성 실패' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiBody({
    type: CreateResultDto,
    examples: {
      example1: {
        value: {
          pinCode: '1F2F3F4F',
          isCouple: false,
          response: [{ id: 1, selection: 2 }],
        },
      },
    },
  })
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @ApiOperation({
    summary: '결과 생성 - 아직 사용하지 마세여 local 컴퓨터필요합니다. ',
  })
  @ApiResponse({ status: 200, description: '결과 생성 성공' })
  @ApiResponse({ status: 400, description: '결과 생성 실패' })
  @ApiResponse({ status: 401, description: '인증 실패' })
  @ApiBody({
    type: CreateResultDto,
    examples: {
      example1: {
        value: {
          pinCode: '1F2F3F4F',
          isCouple: false,
          response: [{ id: 1, selection: 2 }],
        },
      },
    },
  })
  @Post('local')
  createLocal(@Body() createResultDto: CreateResultDto) {
    return this.resultService.createLocal(createResultDto);
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Get(':pinCode')
  findByPinCode(@Param('pinCode') pinCode: string) {
    return this.resultService.findByPinCode(pinCode);
  }

  @Patch(':pinCode')
  updateByPinCode(
    @Param('pinCode') pinCode: string,
    @Body() updateResultDto: UpdateResultDto,
  ) {
    return this.resultService.updateByPinCode(pinCode, updateResultDto);
  }

  @Delete(':pinCode')
  removeByPinCode(@Param('pinCode') pinCode: string) {
    return this.resultService.removeByPinCode(pinCode);
  }
}
