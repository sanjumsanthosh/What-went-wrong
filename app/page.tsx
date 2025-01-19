/* eslint-disable */
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuestionStore } from '@/lib/store/useQuestionStore';
import Summary from '@/components/Summary';
import ModelSetup from '@/components/ModelSetup';
import type { ModelSettings } from '@/lib/store/types';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(1);
  const [charCount, setCharCount] = useState(0);
  const [answerText, setAnswerText] = useState('');
  const maxChars = 200;
  const { 
    currentQuestion, 
    answers, 
    isLoading, 
    analysis,  // Added this
    addAnswer, 
    fetchNextQuestion, 
    reset, 
    initialize, 
    modelSettings, 
    setModelSettings, 
    generateAnalysis 
  } = useQuestionStore();
  
  useEffect(() => {
    initialize();
  }, [initialize]);

  // if currensection is 1 reset
  useEffect(() => {
    if (currentSection === 1) {
      reset();
    }
  }, [currentSection, reset]);

  const handleStartQuestions = async () => {
    setCurrentSection(3);
    await fetchNextQuestion();
  };

  const handleSubmitAnswer = async () => {
    if (!answerText.trim()) return;
    
    addAnswer({
      questionId: currentQuestion!.id,
      answer: answerText.trim(),
      timestamp: Date.now()
    });
    
    setAnswerText(''); // Reset the answer text
    setCharCount(0); // Reset the character count

    // If this was the 8th question, generate analysis instead of next question
    if (answers.length === 7) {
      await generateAnalysis();
    } else {
      await fetchNextQuestion();
    }
  };

  const handleReset = () => {
    reset();
    setCurrentSection(1);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setCharCount(text.length);
      setAnswerText(text);
    }
  };

  const handleModelSetup = (settings: ModelSettings) => {
    setModelSettings(settings);
    setCurrentSection(2);
  };

  const buttonBaseStyles = "px-8 py-3.5 text-lg font-semibold rounded-lg border-2 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95";
  const primaryButtonStyles = `${buttonBaseStyles} border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-700 hover:border-emerald-700`;
  const secondaryButtonStyles = `${buttonBaseStyles} border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500`;
  const dangerButtonStyles = `${buttonBaseStyles} border-red-500 text-red-500 hover:bg-red-500 hover:text-white`;

  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }
  };

  const getButtonText = () => {
    if (answers.length === 7) return "Submit";
    return "Continue";
  };

  const sections = {
    1: (
      <motion.div
        {...pageTransition}
        className="flex flex-col items-center gap-8 text-center max-w-2xl mx-auto px-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-200">
          What went wrong?
        </h1>
        {!modelSettings ? (
          <ModelSetup onComplete={handleModelSetup} />
        ) : (
          <>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Let's analyze and learn from your experience to prevent future setbacks
            </p>
            <button 
              onClick={() => setCurrentSection(2)}
              className={primaryButtonStyles}
            >
              Begin Analysis Journey
            </button>
          </>
        )}
      </motion.div>
    ),
    2: (
      <motion.div
        {...pageTransition}
        className="flex flex-col items-center gap-10 text-center max-w-3xl mx-auto px-4"
      >
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white">How it works</h2>
          
          <div className="space-y-4 text-lg">
            <p className="text-slate-600 dark:text-slate-300">
              Ever felt stuck in the cycle of <span className="font-semibold text-emerald-600 dark:text-emerald-400">starting strong</span> but 
              <span className="font-semibold text-red-500"> falling short</span>?
            </p>
            <p className="text-slate-700 dark:text-slate-200 font-medium">
              Let's break down those invisible barriers and transform your 
              <span className="italic text-slate-900 dark:text-white"> "what if" </span>
              into 
              <span className="font-bold text-emerald-600 dark:text-emerald-400"> "what's next"</span>.
            </p>
          </div>
        </div>

        <div className="w-full max-w-2xl bg-white/50 dark:bg-slate-800/50 rounded-2xl p-8 backdrop-blur-sm">
          <div className="grid gap-6">
            {[
              "Answer AI-guided questions that adapt to your unique situation",
              "Uncover patterns and hidden obstacles in your past attempts",
              "Get personalized insights and actionable next steps"
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-4 text-left">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600 text-white font-medium shrink-0">
                  {index + 1}
                </span>
                <span className="text-lg text-slate-700 dark:text-slate-200">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <button 
            onClick={handleStartQuestions}
            className={primaryButtonStyles}
          >
            Begin Your Journey
          </button>
          <button 
            onClick={handleReset}
            className={secondaryButtonStyles}
          >
            Go Back
          </button>
        </div>
      </motion.div>
    ),
    3: (
      <motion.div
        {...pageTransition}
        className="flex flex-col items-center gap-6 max-w-2xl mx-auto px-4 w-full"
      >
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-black dark:border-white border-t-transparent animate-spin" />
            <span className="text-lg text-slate-600 dark:text-slate-300">Thinking...</span>
          </div>
        ) : currentQuestion ? (
          <>
            <h2 className="text-3xl font-bold text-white">
              {currentQuestion.id}: {currentQuestion.question}
            </h2>
            {currentQuestion.description && (
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {currentQuestion.description}
              </p>
            )}
            <div className="w-full space-y-2">
              <textarea 
                value={answerText}
                className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-opacity-20 resize-none transition-all duration-200"
                rows={6}
                maxLength={maxChars}
                placeholder={currentQuestion.hint || "Type your answer here..."}
                onChange={handleTextChange}
              />
              <div className="flex justify-end text-sm text-slate-500 dark:text-slate-400">
                <span className={charCount >= maxChars ? 'text-red-500' : ''}>
                  {charCount}/{maxChars} characters
                </span>
              </div>
            </div>
            <div className="flex gap-4 w-full mt-6">
              <button 
                onClick={handleSubmitAnswer}
                className={primaryButtonStyles}
                disabled={!answerText.trim()}
              >
                {getButtonText()}
              </button>
              <button 
                onClick={handleReset}
                className={dangerButtonStyles}
              >
                Reset Analysis
              </button>
            </div>
          </>
        ) : (
          analysis ? (
            <Summary 
              analysis={analysis} 
              onStartNew={handleReset}
            />
          ) : (
            <div className="flex flex-col items-center gap-6">
              <div className="text-2xl font-semibold text-slate-800 dark:text-white">
                Analysis complete!
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={handleReset}
                  className={primaryButtonStyles}
                >
                  Start New Analysis
                </button>
                <button
                  onClick={() => console.log('View summary')}
                  className={secondaryButtonStyles}
                >
                  View Summary
                </button>
              </div>
            </div>
          )
        )}
      </motion.div>
    )
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
      <motion.main 
        className="flex-1 flex flex-col items-center justify-center py-16"
        layout
      >
        <AnimatePresence mode="wait" initial={false}>
          {sections[currentSection as keyof typeof sections]}
        </AnimatePresence>
      </motion.main>
      <motion.footer 
        className="py-6 text-center text-sm text-slate-500 dark:text-slate-400"
        layout
      >
        © 2025 Sanjay M Santhosh. All rights reserved.
      </motion.footer>
    </div>
  );
}
