/* eslint-disable */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, Answer, QuestionSchema } from './types';
import { initialQuestions } from '@/lib/constants/questions';

interface QuestionStore {
  currentQuestion: Question | null;
  answers: Answer[];
  isLoading: boolean;
  isInitialized: boolean;
  aiQuestions: Question[];
  analysis: any;
  modelSettings: any;
  setCurrentQuestion: (question: Question | null) => void;
  addAnswer: (answer: Answer) => void;
  fetchNextQuestion: () => Promise<void>;
  prefetchAIQuestions: () => Promise<void>;
  generateAnalysis: () => Promise<void>;
  reset: () => void;
  initialize: () => void;
  setModelSettings: (settings: any) => void;
  clearStorage: () => void;
}

export const useQuestionStore = create<QuestionStore>()(
  persist(
    (set, get) => ({
      currentQuestion: null,
      answers: [],
      isLoading: false,
      isInitialized: false,
      aiQuestions: [],
      analysis: null,
      modelSettings: null,

      initialize: () => {
        const { isInitialized, answers, modelSettings } = get();
        if (!modelSettings) return; // Don't initialize if no model settings
        if (!isInitialized || answers.length === 0) {
          const firstQuestion = QuestionSchema.parse(initialQuestions[0]);
          set({ 
            currentQuestion: firstQuestion,
            isInitialized: true 
          });
        }
      },

      setCurrentQuestion: (question) => set({ currentQuestion: question }),
      
      addAnswer: (answer) => {
        console.log('Adding answer:', answer);
        set((state) => ({
          answers: [...state.answers, answer]
        }));
      },

      fetchNextQuestion: async () => {
        const { modelSettings } = get();
        if (!modelSettings) return;

        set({ isLoading: true });
        try {
          const { answers, aiQuestions } = get();
          
          // If we're moving to question 6, use the last static question
          if (answers.length === 5) {
            set({ currentQuestion: initialQuestions[5] });
            // Trigger background fetch of AI questions
            get().prefetchAIQuestions();
            return;
          }

          // If we have AI questions cached and we're past question 6
          if (answers.length >= 6 && aiQuestions.length > 0) {
            const nextAiQuestion = aiQuestions[answers.length - 6];
            if (nextAiQuestion) {
              set({ currentQuestion: nextAiQuestion });
              return;
            }
          }

          // Fallback to API call if needed -- TODO: handle this better (NOT FULLY IMPLEMENTED)
          const response = await fetch('/api/generate-question', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${modelSettings.token}`
            },
            body: JSON.stringify({ answers, modelType: modelSettings.type })
          });
          
          const question = await response.json();
          set({ currentQuestion: question });
        } catch (error) {
          console.error('Failed to fetch next question:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      prefetchAIQuestions: async () => {
        const { modelSettings } = get();
        if (!modelSettings) return;

        try {
          const { answers } = get();
          const response = await fetch('/api/generate-ai-questions', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${modelSettings.token}`
            },
            body: JSON.stringify({ answers, modelType: modelSettings.type })
          });
          
          const aiQuestions = await response.json();
          set({ aiQuestions });
        } catch (error) {
          console.error('Failed to prefetch AI questions:', error);
        }
      },

      generateAnalysis: async () => {
        const { modelSettings } = get();
        if (!modelSettings) return;

        set({ isLoading: true });
        try {
          const { answers } = get();
          const response = await fetch('/api/generate-analysis', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${modelSettings.token}`
            },
            body: JSON.stringify({ answers, modelType: modelSettings.type })
          });
          
          const analysis = await response.json();
          set({ 
            analysis,
            currentQuestion: null,
            isLoading: false
          });
        } catch (error) {
          console.error('Failed to generate analysis:', error);
          set({ isLoading: false });
        }
      },

      reset: () => {
        const firstQuestion = QuestionSchema.parse(initialQuestions[0]);
        set({
          currentQuestion: firstQuestion,
          answers: [],
          aiQuestions: [],
          analysis: null,
          isLoading: false,
          isInitialized: true
        });
      },

      setModelSettings: (settings) => set({ modelSettings: settings }),

      clearStorage: () => {
        localStorage.removeItem('question-store');
        set({
          currentQuestion: null,
          answers: [],
          aiQuestions: [],
          analysis: null,
          isLoading: false,
          isInitialized: false,
          modelSettings: null
        });
      }
    }),
    {
      name: 'question-store',
      onRehydrateStorage: () => (state) => {
        // When storage is rehydrated, initialize if needed
        if (state) {
          state.initialize();
        }
      }
    }
  )
);
