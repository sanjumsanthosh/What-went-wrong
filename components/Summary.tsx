'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { WhatWentWrongAnalysis } from '@/lib/store/types';

interface SummaryProps {
  analysis: WhatWentWrongAnalysis;
  onStartNew: () => void;
}

export default function Summary({ analysis, onStartNew }: SummaryProps) {
  const [showSolutions, setShowSolutions] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-4xl mx-auto space-y-8"
    >
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">What Went Wrong</h2>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
          <p className="text-lg text-slate-300">{analysis.whatwentwrong.text}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {analysis.whatwentwrong.words.map((factor, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 rounded-lg p-3 text-center"
                style={{
                  fontSize: `${Math.max(1, Math.min(2, 1 + factor.weight * 0.5))}rem`
                }}
              >
                {factor.text}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {!showSolutions ? (
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => setShowSolutions(true)}
          className="w-full py-4 px-6 bg-emerald-600 text-white rounded-xl font-semibold text-lg"
        >
          What Can Be Done?
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Solutions</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 space-y-4">
            <p className="text-lg text-slate-300">{analysis.whattodo.text}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {analysis.whattodo.words.map((suggestion, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-emerald-800/50 rounded-lg p-3 text-center"
                  style={{
                    fontSize: `${Math.max(1, Math.min(2, 1 + suggestion.weight * 0.5))}rem`
                  }}
                >
                  {suggestion.text}
                </motion.div>
              ))}
            </div>
          </div>
          
          <button
            onClick={onStartNew}
            className="w-full py-4 px-6 bg-slate-700 text-white rounded-xl font-semibold text-lg"
          >
            Start New Analysis
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}