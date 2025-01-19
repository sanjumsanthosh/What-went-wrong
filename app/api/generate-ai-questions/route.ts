/* eslint-disable */
import { NextResponse } from 'next/server';
import { generateQuestion } from '@/lib/ai-clients';
import { Question, QuestionSchema } from '@/lib/store/types';
import { headers } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { answers, modelType } = await req.json();
    const token = req.headers.get('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    interface Answer {
      answer: string;
    }

    interface GenerateQuestionRequest {
      answers: Answer[];
      modelType: string;
    }

    const answerTexts: string = (answers as Answer[]).map((a: Answer) => a.answer).join("\n");

    const aiPrompt = `Based on these responses about habit formation: "${answerTexts}", generate two casual and specific questions in JSON format. Ensure to tailor to users feedback by including parts of their response like "you said that " etc. Focus on understanding the environment where the habit was performed and its influence, as well as identifying a daily routine that felt the most comfortable or enjoyable during that time. Output only the JSON array like this:[{"question":"Was there anything about the environment where you tried to stick with this habit that made it harder or easier for you?","hint":"Think about the physical space or surroundings—like noise, lighting, or how you felt in that setting."},{"question":"What daily routine felt the most enjoyable or easy during that time?","hint":"For instance, did you enjoy sipping coffee in the morning or relaxing after dinner? Could you have added a small habit to that part of your day?"}]`;
    const responseContent = await generateQuestion(token, modelType, answers, aiPrompt);
    
    try {
      const jsonMatch = responseContent.match(/\[.*\]/s);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      
      let parsedQuestions = JSON.parse(jsonMatch[0]);
      interface ParsedQuestion {
        question: string;
        hint: string;
      }

      interface ValidatedQuestion extends ParsedQuestion {
        id: string;
        type: string;
      }

      parsedQuestions = parsedQuestions.map((q: ParsedQuestion, i: number): ValidatedQuestion => ({
        id: String(answers.length + i + 1),
        question: q.question,
        type: "textarea",
        hint: q.hint
      }));
      
      const validatedQuestions: ValidatedQuestion[] = parsedQuestions.map((q: ValidatedQuestion) => QuestionSchema.parse(q));
      return NextResponse.json(validatedQuestions);
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      return NextResponse.error();
    }
  } catch (error) {
    console.error('Error generating AI questions:', error);
    return NextResponse.error();
  }
}
