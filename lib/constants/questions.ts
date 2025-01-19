import { Question } from '@/lib/store/types';

export const initialQuestions: Question[] = [
  {
    id: '1',
    question: "What was the last habit or resolution you struggled to maintain? How long did you stick with it before it fizzled out?",
    type: "textarea",
    hint: "Be specific about the habit and timeframe, e.g., \"I tried to meditate daily for 10 minutes, but only managed to keep it up for 3 weeks.\""
  },
  {
    id: '2',
    question: "When you stopped pursuing your habit/resolution, what were you doing instead? What filled that time or space?",
    type: "textarea",
    hint: "Think about your default behaviors, e.g., \"Instead of going to the gym, I found myself scrolling social media for an hour.\""
  },
  {
    id: '3',
    question: "What part of the habit or resolution felt most uncomfortable or difficult for you?",
    type: "textarea",
    hint: "Consider the moments when you felt resistance, e.g., \"Waking up early to go for a run was the hardest part for me.\""
  },
  {
    id: '4',
    question: "At what time do you like to do your habit or resolution? How does this time fit into your daily routine?",
    type: "textarea",
    hint: "Reflect on your daily schedule and when you have the most energy or free time, e.g., \"I prefer to read before bed because it helps me wind down.\""
  },
  {
    id: '5',
    question: "When you skipped your habit, what were the most common reasons or obstacles that got in the way? Were they external (like lack of time) or internal (like lack of interest)?",
    type: "textarea",
    hint: "Be honest about what stopped you, e.g., \"I was too tired after work\" or \"I didn't feel like it was making a difference.\""
  },
  {
    id: '6',
    question: "What was the smallest step you took towards your goal that still felt satisfying?",
    type: "textarea",
    hint: "Focus on minor victories, e.g., \"Even just putting on my running shoes and stepping outside felt like an accomplishment.\""
  }
] as const;
