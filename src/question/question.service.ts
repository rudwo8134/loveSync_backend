import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionModel } from './entities/question.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionModel)
    private questionRepository: Repository<QuestionModel>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    const savedQuestion = await this.questionRepository.save(question);
    return savedQuestion;
  }

  async findAll() {
    return this.questionRepository.find();
  }

  async findOne(id: number) {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    if (updateQuestionDto.text) {
      question.text = updateQuestionDto.text;
    }
    if (updateQuestionDto.options) {
      question.options = updateQuestionDto.options;
    }
    if (updateQuestionDto.type) {
      question.type = updateQuestionDto.type;
    }
    question.version++;
    question.updatedAt = new Date();
    const updatedQuestion = await this.questionRepository.save(question);
    return updatedQuestion;
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOne({ where: { id } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    await this.questionRepository.delete(id);
    return { message: 'Question deleted successfully' };
  }
}
