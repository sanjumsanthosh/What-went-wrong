import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  description: z.string().optional(),
  hint: z.string().optional(),
  type: z.enum(['text', 'textarea', 'multiChoice']),
  options: z.array(z.string()).optional(),
});

export const AnswerSchema = z.object({
  questionId: z.string(),
  answer: z.string(),
  timestamp: z.number(),
});

export type Question = z.infer<typeof QuestionSchema>;
export type Answer = z.infer<typeof AnswerSchema>;

export interface Factor {
  text: string;
  weight: number; // 0-1, used for sizing in word cloud
}

export interface WhatWentWrongAnalysis {
  whatwentwrong: {
    text: string;
    words: Factor[];
  };
  whattodo: {
    text: string;
    words: Factor[];
  };
}

export interface ModelSettings {
  type: 'groq' | 'github';
  token: string;
}

export interface QuestionStore {
  // ...existing store interface...
  analysis: WhatWentWrongAnalysis | null;
  generateAnalysis: () => Promise<void>;
  modelSettings: ModelSettings | null;
  setModelSettings: (settings: ModelSettings) => void;
}
