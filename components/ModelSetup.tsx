'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { ModelSettings } from '@/lib/store/types';

interface ModelSetupProps {
  onComplete: (settings: ModelSettings) => void;
}

export default function ModelSetup({ onComplete }: ModelSetupProps) {
  const [modelType, setModelType] = useState<'groq' | 'github'>('groq');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setError('Please enter a valid API token');
      return;
    }
    onComplete({ type: modelType, token: token.trim() });
  };

  const buttonBaseStyles = "px-6 py-2.5 rounded-lg transition-all duration-200";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-lg font-medium text-slate-700 dark:text-slate-200">
            Select Model Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setModelType('groq')}
              className={`${buttonBaseStyles} ${
                modelType === 'groq'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Groq
            </button>
            <button
              type="button"
              onClick={() => setModelType('github')}
              className={`${buttonBaseStyles} ${
                modelType === 'github'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              GitHub
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-slate-700 dark:text-slate-200">
            {modelType === 'groq' ? 'Groq API Token' : 'GitHub Token'}
          </label>
          <input
            type="password"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
            placeholder="Enter your API token"
          />
          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {modelType === 'groq' 
              ? 'You can get your Groq API token from the Groq dashboard'
              : 'You can create a GitHub token with read access from your GitHub settings'}
          </p>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Continue
        </button>
      </form>
    </motion.div>
  );
}
