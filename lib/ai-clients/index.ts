/* eslint-disable */
import { generateAzureQuestion } from './azure-client';
import { generateGroqQuestion } from './groq-client';

export const generateQuestion = async (token: string, modelType: 'groq' | 'github', previousAnswers: any[], customPrompt?: string) => {
  return modelType === 'groq' 
    ? generateGroqQuestion(token, previousAnswers, customPrompt)
    : generateAzureQuestion(token, previousAnswers, customPrompt);
};
