import { NextResponse } from 'next/server';
import { generateQuestion } from '@/lib/ai-clients';
import { WhatWentWrongAnalysis, Answer } from '@/lib/store/types';

export async function POST(req: Request) {
  try {
    const { answers, modelType } = await req.json();
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const answerText = (answers as Answer[]).map((a: Answer) => a.answer).join("\n");

    const prompt = `Analyze these responses about a failed habit/resolution:
"${answerText}"
Analyze input on someone's habit-building experience and provide feedback in JSON format with two sections: "whatwentwrong" and "whattodo". For each section, include: a) "text": a friendly, detailed explanation; b) "words": a list of key concepts as {"text": "concept", "weight": X.X} (weight ranges 0.1-1.0). In "whatwentwrong", identify issues like starting too big, inconsistency, environment challenges, or lack of motivation. Good to make the descriptions as points.Reflect on whether the effort felt genuine, how comfortable it was, and highlight both positive and negative aspects. In "whattodo", offer actionable advice: start smaller, build consistency, reduce friction for good habits, increase friction for bad ones, attach habits to things you enjoy, focus on repetition over duration, and make good habits unavoidable. Use habit theory like cue-craving-response-reward loops to explain why things happen and how to fix them. Tailor responses to the input with specific insights and keep the tone casual and engaging, like a friend giving thoughtful advice. Output format: {"whatwentwrong":{"text":"...","words":[{"text":"...","weight":...}]},"whattodo":{"text":"...","words":[{"text":"...","weight":...}]}}
`;

    const responseContent = await generateQuestion(token, modelType, answers, prompt);
    
    try {
      const jsonMatch = responseContent.match(/\{.*\}/s);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      const analysis: WhatWentWrongAnalysis = JSON.parse(jsonMatch[0]);
      return NextResponse.json(analysis);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      return NextResponse.error();
    }
  } catch (error) {
    console.error('Error generating analysis:', error);
    return NextResponse.error();
  }
}
