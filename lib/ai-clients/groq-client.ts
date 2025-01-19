/* eslint-disable */
import { filter } from 'framer-motion/client';
import Groq from 'groq-sdk';

export const getGroqClient = (token: string) => {
  return new Groq({ apiKey: token });
};

export const generateGroqQuestion = async (token: string, previousAnswers: any[], customPrompt?: string) => {
  const groq = getGroqClient(token);
  const answers = previousAnswers.map((answer) => answer.answer).join(", ");
  
  const response = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: customPrompt || `Based on these previous answers: ${JSON.stringify(previousAnswers)}, what should be the next question to ask? Generate a single question.`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  if ((response as any).error) {
    throw new Error((response as any).error.message);
  }

  return response.choices[0]?.message?.content;
};
