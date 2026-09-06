import React from 'react';
import { FlaskConical, Play, Sparkles, ArrowRight, Layers, Sliders, CheckCircle2 } from 'lucide-react';

interface BinarySearchLabCardProps {
  onOpenLab: () => void;
}

export const BinarySearchLabCard: React.FC<BinarySearchLabCardProps> = ({ onOpenLab }) => {
  return (
    <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-slate-900/60 dark:from-blue-950/50 dark:via-indigo-950/60 dark:to-slate-950/80 border-2 border-blue-500/40 shadow-xl relative overflow-hidden backdrop-blur-md">
      {/* Decorative background glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-400 text-xs font-mono font-bold uppercase tracking-wider">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Interactive Sandbox</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white font-mono tracking-wide">
            BINARY SEARCH EXPERIMENT LAB
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Free-form algorithm playground: input any custom sorted array, set any target value, step through comparisons in real time, inspect pointer updates, test edge cases (missing items, extreme duplicates), and observe step-by-step trace execution.
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 text-blue-300 border border-slate-700/80 flex items-center gap-1.5">
              <Sliders className="w-3 h-3 text-blue-400" />
              Custom Arrays & Targets
            </span>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 text-emerald-300 border border-slate-700/80 flex items-center gap-1.5">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              Duplicates & Missing Edge Cases
            </span>
            <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-lg bg-slate-800/80 text-purple-300 border border-slate-700/80 flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-purple-400" />
              Step, Auto-Play & Speed Slider
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0 flex items-center">
          <button
            onClick={onOpenLab}
            className="w-full sm:w-auto px-7 py-4 rounded-2xl font-mono text-sm sm:text-base font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 cursor-pointer transition-all hover:scale-102 active:scale-98 border border-blue-400/30"
          >
            <FlaskConical className="w-5 h-5 text-cyan-300" />
            <span>OPEN LAB</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
