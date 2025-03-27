import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { QuestionService } from 'src/question/question.service';
import { AiService } from 'src/ai/ai.service';
@Injectable()
export class ResultService {
  constructor(
    private readonly questionService: QuestionService,
    private readonly aiService: AiService,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const userResult = await Promise.all(
      createResultDto.response.map(async (item) => {
        const question = await this.questionService.findOne(item.id);
        const option = question.options.find(
          (option) => option.id === item.selection,
        );
        const type = question.type;
        return {
          text: question.text,
          optionText: option.text,
          score: option.score,
          type,
        };
      }),
    );
    const result = await Promise.all(userResult);
    const aiResult = await this.aiService.create({ response: result });
    return aiResult;
  }

  async createLocal(createResultDto: CreateResultDto) {
    const userResult = await Promise.all(
      createResultDto.response.map(async (item) => {
        const question = await this.questionService.findOne(item.id);
        const option = question.options.find(
          (option) => option.id === item.selection,
        );
        const type = question.type;
        return {
          text: question.text,
          optionText: option.text,
          score: option.score,
          type,
        };
      }),
    );
    const result = await Promise.all(userResult);
    const aiResult = await this.aiService.createLocal({ response: result });
    return aiResult;
  }

  async findAll() {
    const questions = await this.questionService.findAll();
    const result = questions.map((question) => {
      return {
        id: question.id,
        text: question.text,
        options: question.options,
      };
    });
    return result;
  }

  findByPinCode(pinCode: string) {
    return `This action returns a #${pinCode} result`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateByPinCode(pinCode: string, updateResultDto: UpdateResultDto) {
    return `This action updates a #${pinCode} result`;
  }

  removeByPinCode(pinCode: string) {
    return `This action removes a #${pinCode} result`;
  }
}
