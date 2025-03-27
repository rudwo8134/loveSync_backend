import { Injectable } from '@nestjs/common';
import { CreateAiDto } from './dto/create-ai.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  async create(createAiDto: CreateAiDto) {
    const prompt = this.createPrompt(createAiDto.response);

    const response = await firstValueFrom(
      this.httpService.post(
        'https://api.aimlapi.com/v1/chat/completions',
        {
          model: 'deepseek/deepseek-r1',
          messages: [{ role: 'system', content: prompt }],
          max_tokens: 1000,
          temperature: 0.8,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stream: false,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.AI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    if (
      !response.data.choices ||
      !response.data.choices[0] ||
      !response.data.choices[0].message ||
      !response.data.choices[0].message.content
    ) {
      throw new Error('Invalid response from AI API');
    }
    return response.data.choices[0].message.content;
  }

  async createLocal(createAiDto: CreateAiDto) {
    const { systemPrompt, userPrompt } = this.createSplitPrompt(
      createAiDto.response,
    );

    const response = await firstValueFrom(
      this.httpService.post(
        `${process.env.STATIC_AI_URL}/v1/chat/completions`,
        {
          model: 'gemma-3-4b-it',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          max_tokens: 1000,
          temperature: 0.2,
          top_p: 0.85,
          top_k: 40,
          frequency_penalty: 0.5,
          presence_penalty: 0.5,
          repeat_penalty: 1.2,
          stop: ['\n\n\n'],
          seed: 42,
          stream: false,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    if (
      !response.data.choices ||
      !response.data.choices[0] ||
      !response.data.choices[0].message ||
      !response.data.choices[0].message.content
    ) {
      throw new Error('Invalid response from AI API');
    }
    return response.data.choices[0].message.content;
  }

  private createSplitPrompt(responseItems: CreateAiDto['response']): {
    systemPrompt: string;
    userPrompt: string;
  } {
    const systemPrompt = `당신은 연애 성향 분석 전문가입니다. 사용자의 설문 응답을 분석하여 정확하고 개인화된 내용을 제공해야 합니다.
항상 한국어로 응답하세요.
각 카테고리별 정확히 2-3문장으로만 분석하세요.
내부 사고 과정이나 불필요한 설명을 포함하지 마세요.
정확히 아래 형식으로만 응답하세요:

의사소통 방식: [분석]
애정 표현 스타일: [분석]
갈등 해결 성향: [분석]
관계에서의 우선순위: [분석]`;

    const userPrompt = `다음 연애 관련 질문에 대한 응답을 분석해 주세요:
${JSON.stringify(responseItems, null, 2)}`;

    return { systemPrompt, userPrompt };
  }

  private createPrompt(responseItems: CreateAiDto['response']): string {
    return `
Analyze the following responses to romantic relationship questions:

${JSON.stringify(responseItems, null, 2)}

Instructions:
1. Based on the data above, analyze the user's romantic tendencies in 4 categories.
2. Limit each category analysis to exactly 2-3 sentences.
3. Make the analysis specific and personalized.
4. Do not display your internal thought process.
5. Do not include unnecessary introductions, explanations, or interjections.
6. Respond only in the requested format.
7. Provide your analysis in Korean language.

Response format:
의사소통 방식: [2-3 sentences analyzing the user's communication style]
애정 표현 스타일: [2-3 sentences analyzing the user's style of expressing affection]
갈등 해결 성향: [2-3 sentences analyzing the user's conflict resolution tendencies]
관계에서의 우선순위: [2-3 sentences analyzing the user's relationship priorities]
`;
  }
}
