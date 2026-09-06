import React from 'react';
import { motion } from 'motion/react';
import { Compass, Lightbulb, Calculator, GitBranch, ArrowRight, X } from 'lucide-react';

interface BinarySearchGuidedSolveProps {
  low: number;
  high: number;
  mid: number;
  array: number[];
  target: number;
  onClose: () => void;
}

export const BinarySearchGuidedSolve: React.FC<BinarySearchGuidedSolveProps> = ({
  low,
  high,
  mid,
  array,
  target,
  onClose,
}) => {
  const isOutOfRange = low > high;
  const midVal = mid >= 0 && mid < array.length ? array[mid] : null;

  let comparisonText = '';
  let recommendation = '';
  let ruleExplanation = '';

  if (isOutOfRange) {
    comparisonText = `low (${low}) > high (${high})`;
    recommendation = 'Click "TARGET NOT FOUND"';
    ruleExplanation =
      'The pointers have crossed, which means the active search window is completely empty. The target does not exist anywhere in this array.';
  } else if (midVal === target) {
    comparisonText = `arr[${mid}] (${midVal}) === target (${target})`;
    recommendation = 'Click "TARGET FOUND"';
    ruleExplanation =
      'The value at the middle index matches the target value! You have found the target in this step.';
  } else if (midVal !== null && target < midVal) {
    comparisonText = `target (${target}) < arr[${mid}] (${midVal})`;
    recommendation = 'Click "SEARCH LEFT HALF"';
    ruleExplanation = `Because the array is sorted in ascending order, all elements at and to the right of index [${mid}] (${midVal} or greater) cannot be the target (${target}). Setting high = ${mid - 1} eliminates that entire half.`;
  } else if (midVal !== null && target > midVal) {
    comparisonText = `target (${target}) > arr[${mid}] (${midVal})`;
    recommendation = 'Click "SEARCH RIGHT HALF"';
    ruleExplanation = `Because the array is sorted in ascending order, all elements at and to the left of index [${mid}] (${midVal} or smaller) cannot be the target (${target}). Setting low = ${mid + 1} eliminates that entire half.`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-amber-400/60 dark:border-amber-500/40 space-y-4 shadow-md"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
          <div className="p-1.5 rounded-lg bg-amber-500 text-white">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider font-mono">
              Guided Solve: Step-by-Step Navigation
            </h4>
            <p className="text-[11px] text-amber-700 dark:text-amber-400">
              Follow the algorithmic deduction for the current board state.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          title="Close Guided Solve"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* 3 Structured Stages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Stage 1: Midpoint Calculation */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>1. Midpoint Formulas</span>
          </div>
          <div className="text-xs font-mono text-slate-700 dark:text-slate-300 space-y-0.5">
            {isOutOfRange ? (
              <span className="text-rose-500 font-bold">Range exhausted: low &gt; high</span>
            ) : (
              <>
                <p>
                  Standard: Math.floor(({low} + {high}) / 2) = <strong className="text-indigo-600 dark:text-indigo-400 font-black">[{mid}]</strong>
                </p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Safe: {low} + Math.floor(({high} - {low}) / 2) = <strong>[{mid}]</strong>
                </p>
              </>
            )}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            {midVal !== null ? `Element at arr[${mid}] is ${midVal}.` : 'No element at index.'}
          </p>
        </div>

        {/* Stage 2: Value Comparison */}
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase">
            <GitBranch className="w-3.5 h-3.5" />
            <span>2. Compare with Target</span>
          </div>
          <p className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
            {comparisonText}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Target is {target}. Mid value is {midVal ?? '—'}.
          </p>
        </div>

        {/* Stage 3: Recommended Action */}
        <div className="p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/80 dark:border-amber-500/60 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-700 dark:text-orange-300 uppercase">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>3. Recommended Action</span>
          </div>
          <p className="text-xs font-mono font-black text-orange-600 dark:text-orange-300">
            {recommendation}
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2">
            {ruleExplanation}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
