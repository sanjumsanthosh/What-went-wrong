'use client';
import { useQuestionStore } from '@/lib/store/useQuestionStore';
import { useRouter } from 'next/navigation';

export default function ResetButton() {
  const clearStorage = useQuestionStore(state => state.clearStorage);
  const router = useRouter();

  const handleReset = () => {
    if (confirm('This will clear all your data and start fresh. Are you sure?')) {
      clearStorage();
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleReset}
      className="fixed top-4 right-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
    >
      Reset All Data
    </button>
  );
}
