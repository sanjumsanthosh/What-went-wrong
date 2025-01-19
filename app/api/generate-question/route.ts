/* eslint-disable */
import { NextResponse } from 'next/server';
import { generateQuestion } from '@/lib/ai-clients';
import { initialQuestions } from '@/lib/constants/questions';
import { Question, QuestionSchema } from '@/lib/store/types';

export async function POST(req: Request) {
  try {
    const { answers, modelType } = await req.json();
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    // Return static questions for first 6 questions
    if (answers.length < initialQuestions.length) {
      return NextResponse.json(initialQuestions[answers.length]);
    }

    const responseContent = await generateQuestion(token, modelType, answers);
    // ...rest of implementation...

  } catch (error) {
    console.error('Error generating question:', error);
    return NextResponse.error();
  }
}
