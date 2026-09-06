import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Undo2,
  RotateCcw,
  ChevronRight,
} from 'lucide-react';

interface BinarySearchActionControlsProps {
  onSearchLeft: () => void;
  onSearchRight: () => void;
  onTargetFound: () => void;
  onTargetNotFound: () => void;
  onUndo: () => void;
  onResetLevel: () => void;
  onNext: () => void;
  canUndo: boolean;
  isSolved: boolean;
  isLastChallenge: boolean;
}

export const BinarySearchActionControls: React.FC<BinarySearchActionControlsProps> = ({
  onSearchLeft,
  onSearchRight,
  onTargetFound,
  onTargetNotFound,
  onUndo,
  onResetLevel,
  onNext,
  canUndo,
  isSolved,
  isLastChallenge,
}) => {
  return (
    <div className="space-y-4 pt-1">
      {/* Primary Decision Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Left */}
        <button
          onClick={onSearchLeft}
          disabled={isSolved}
          className={`px-4 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
            isSolved
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              : 'cursor-pointer bg-blue-600 hover:bg-blue-500 active:scale-98 text-white border-blue-500 shadow-md shadow-blue-500/20'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Search Left Half</span>
        </button>

        {/* Target Found */}
        <button
          onClick={onTargetFound}
          disabled={isSolved}
          className={`px-4 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
            isSolved
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              : 'cursor-pointer bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white border-emerald-500 shadow-md shadow-emerald-500/25'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Target Found</span>
        </button>

        {/* Search Right */}
        <button
          onClick={onSearchRight}
          disabled={isSolved}
          className={`px-4 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
            isSolved
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              : 'cursor-pointer bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white border-indigo-500 shadow-md shadow-indigo-500/20'
          }`}
        >
          <span>Search Right Half</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Target Not Found */}
        <button
          onClick={onTargetNotFound}
          disabled={isSolved}
          className={`px-4 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 border transition-all ${
            isSolved
              ? 'opacity-40 cursor-not-allowed bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
              : 'cursor-pointer bg-rose-600 hover:bg-rose-500 active:scale-98 text-white border-rose-500 shadow-md shadow-rose-500/20'
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>Target Not Found</span>
        </button>
      </div>

      {/* Auxiliary & Bottom Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          {/* Undo */}
          <button
            onClick={onUndo}
            disabled={!canUndo || isSolved}
            className={`px-3 py-2 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 border transition-all ${
              !canUndo || isSolved
                ? 'opacity-40 cursor-not-allowed text-slate-400 border-slate-200 dark:border-slate-800 bg-transparent'
                : 'text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer active:scale-95'
            }`}
          >
            <Undo2 className="w-3.5 h-3.5" />
            <span>Undo Move</span>
          </button>

          {/* Reset Level */}
          <button
            onClick={onResetLevel}
            className="px-3 py-2 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Level</span>
          </button>
        </div>

        {/* Next / Proceed Button (prominent when solved) */}
        {isSolved && (
          <button
            onClick={onNext}
            className="px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-wider bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-lg shadow-emerald-500/25 flex items-center gap-2 cursor-pointer active:scale-95 animate-bounce"
          >
            <span>{isLastChallenge ? 'Complete Level 🎉' : 'Next Challenge'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
