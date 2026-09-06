import React, { useState } from 'react';
import {
  TrendingUp,
  Sparkles,
  Flame,
  Award,
  Layers,
  CheckCircle2,
  Lock,
  ArrowDownToLine,
  AlertTriangle,
  Zap,
  ShieldAlert,
  RotateCcw,
  ArrowRight,
  Compass,
  Filter,
  BookOpen,
  Gamepad2,
  HelpCircle,
  FlaskConical,
} from 'lucide-react';
import { TabType, UserProgress } from '../../types';
import { INITIAL_ACHIEVEMENTS } from '../../services/storage';
import { soundEffects } from '../../services/sound';

interface ProgressViewProps {
  progress: UserProgress;
  onResetProgress: () => void;
  onNavigateTab?: (tab: TabType) => void;
}

interface BinarySearchModule {
  id: number;
  code: string;
  title: string;
  description: string;
  category: 'Foundation' | 'Technique' | 'Analysis' | 'Problem Solving';
}

const BINARY_SEARCH_MODULES: BinarySearchModule[] = [
  {
    id: 1,
    code: 'BS-01',
    title: '01. What is Binary Search?',
    description: 'Understand the basic idea of searching a sorted array by repeatedly dividing the search space.',
    category: 'Foundation',
  },
  {
    id: 2,
    code: 'BS-02',
    title: '02. Sorted Array Requirement',
    description: 'Learn why Binary Search requires ordered data.',
    category: 'Foundation',
  },
  {
    id: 3,
    code: 'BS-03',
    title: '03. Search Space',
    description: 'Understand the current range in which the target can still exist.',
    category: 'Foundation',
  },
  {
    id: 4,
    code: 'BS-04',
    title: '04. Low, Mid & High',
    description: 'Learn how the three boundaries control the search.',
    category: 'Technique',
  },
  {
    id: 5,
    code: 'BS-05',
    title: '05. Finding the Middle',
    description: 'Calculate the middle index correctly.',
    category: 'Technique',
  },
  {
    id: 6,
    code: 'BS-06',
    title: '06. Comparing the Target',
    description: 'Compare the target with the middle value.',
    category: 'Technique',
  },
  {
    id: 7,
    code: 'BS-07',
    title: '07. Narrowing the Search Range',
    description: 'Eliminate the half that cannot contain the target.',
    category: 'Technique',
  },
  {
    id: 8,
    code: 'BS-08',
    title: '08. Binary Search Algorithm',
    description: 'Follow the complete Binary Search process step by step.',
    category: 'Technique',
  },
  {
    id: 9,
    code: 'BS-09',
    title: '09. Target Found & Not Found',
    description: 'Understand the stopping conditions for successful and unsuccessful searches.',
    category: 'Analysis',
  },
  {
    id: 10,
    code: 'BS-10',
    title: '10. Time & Space Complexity',
    description: 'Understand O(log n) time and iterative O(1) extra space.',
    category: 'Analysis',
  },
  {
    id: 11,
    code: 'BS-11',
    title: '11. Binary Search Problem Solving',
    description: 'Apply Binary Search to practical coding problems.',
    category: 'Problem Solving',
  },
  {
    id: 12,
    code: 'BS-12',
    title: '12. Applications & Variations',
    description: 'Explore useful Binary Search variations and practical uses.',
    category: 'Problem Solving',
  },
];

const CATEGORIES = [
  'All Modules',
  'Foundation',
  'Technique',
  'Analysis',
  'Problem Solving',
] as const;

export const ProgressView: React.FC<ProgressViewProps> = ({
  progress,
  onResetProgress,
  onNavigateTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Modules');

  // Dynamic Learning Areas Stats
  const completedLearn = Math.min(12, progress.completedTheoryChapters?.length || 0);
  const completedLabs = Math.min(2, progress.completedLabs?.length || 0);
  const completedGames = Math.min(6, progress.completedGameLevels?.length || 0);

  // Overall Mastery Calculation synchronized with Sidebar and 4 learning areas
  const totalActivities = 21; // 12 Theory + 2 Videos + 6 Games + 1 Quiz
  const completedActivities = Math.min(
    21,
    completedLearn + completedLabs + completedGames + (progress.quizCompleted ? 1 : 0)
  );
  const masteryPercentage = Math.round((completedActivities / totalActivities) * 100);

  // Quiz Stats
  const quizAnswered = progress.quizCompleted
    ? 10
    : Math.min(10, progress.quizTotalQuestionsAnswered || 0);
  const quizAccuracy = progress.quizCompleted
    ? Math.max(70, progress.quizHighScore || 100)
    : quizAnswered > 0
    ? progress.quizHighScore || 0
    : 0;
  const quizCorrect = Math.round((quizAccuracy / 100) * quizAnswered);

  // Dynamic Recommendation Logic based on current learning progress
  const getRecommendation = () => {
    if (completedLearn === 0) {
      return {
        title: 'BINARY SEARCH BASICS',
        description: 'Learn the foundation of Binary Search and understand why sorted data is required.',
        actionText: 'START THEORY',
        tab: 'theory' as TabType,
      };
    }
    if (completedLearn < 4) {
      return {
        title: 'LOW, MID & HIGH',
        description: 'Learn how Binary Search uses boundaries to control the current search range.',
        actionText: 'CONTINUE THEORY',
        tab: 'theory' as TabType,
      };
    }
    if (completedLearn < 8) {
      return {
        title: 'NARROW THE SEARCH RANGE',
        description: 'Practice choosing the correct half after comparing the target with MID.',
        actionText: 'CONTINUE THEORY',
        tab: 'theory' as TabType,
      };
    }
    if (completedLearn < 12) {
      const nextMod =
        BINARY_SEARCH_MODULES.find(
          (m) => !progress.completedTheoryChapters?.includes(m.id)
        ) || BINARY_SEARCH_MODULES[completedLearn];
      return {
        title: nextMod.title,
        description: nextMod.description,
        actionText: 'CONTINUE THEORY',
        tab: 'theory' as TabType,
      };
    }
    if (completedLabs < 2) {
      return {
        title: 'WATCH BINARY SEARCH VISUALIZATION',
        description: 'Reinforce your understanding with interactive animated visual demonstrations.',
        actionText: 'WATCH VIDEOS',
        tab: 'lab' as TabType,
      };
    }
    if (completedGames < 6) {
      return {
        title: 'TRY BINARY SEARCH CHALLENGES',
        description: 'Apply your knowledge by solving interactive Binary Search problems.',
        actionText: 'PLAY GAMES',
        tab: 'game' as TabType,
      };
    }
    if (!progress.quizCompleted) {
      return {
        title: 'TEST YOUR MASTERY WITH THE QUIZ',
        description: 'Demonstrate your command of Binary Search, search boundaries, and logarithmic time complexity.',
        actionText: 'TAKE QUIZ',
        tab: 'quiz' as TabType,
      };
    }
    return {
      title: 'BINARY SEARCH PROBLEM SOLVING',
      description: 'Test your skills with more challenging search problems and advanced variations.',
      actionText: 'PRACTICE PROBLEMS',
      tab: 'game' as TabType,
    };
  };

  const recommendation = getRecommendation();

  // Filtered modules based on category
  const filteredModules =
    selectedCategory === 'All Modules'
      ? BINARY_SEARCH_MODULES
      : BINARY_SEARCH_MODULES.filter((m) => m.category === selectedCategory);

  // Master Challenges
  const MASTER_CHALLENGES = [
    {
      id: 1,
      number: '01',
      title: 'Master Sorted Search',
      desc: 'Verify sorted array preconditions and calculate the initial middle element.',
      isDone: progress.completedGameLevels.includes(1),
    },
    {
      id: 2,
      number: '02',
      title: 'Master Low / Mid / High',
      desc: 'Master boundary pointers adjustments based on target comparisons.',
      isDone:
        progress.completedGameLevels.includes(2) ||
        progress.completedGameLevels.includes(3),
    },
    {
      id: 3,
      number: '03',
      title: 'Master Range Reduction',
      desc: 'Achieve optimal half-elimination with zero boundary overshoot.',
      isDone:
        progress.completedGameLevels.includes(4) ||
        progress.completedGameLevels.includes(6),
    },
    {
      id: 4,
      number: '04',
      title: 'Master Binary Search Problems',
      desc: 'Solve multi-step search problems and handle edge cases with precision.',
      isDone:
        progress.completedGameLevels.includes(5) ||
        progress.completedGameLevels.includes(11) ||
        progress.completedGameLevels.includes(16),
    },
  ];
  const masterSolvedCount = MASTER_CHALLENGES.filter((c) => c.isDone).length;

  const getAchievementIcon = (name: string) => {
    switch (name) {
      case 'ArrowDownToLine':
        return <ArrowDownToLine className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5" />;
      case 'FlaskConical':
        return <FlaskConical className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'Flame':
        return <Flame className="w-5 h-5" />;
      default:
        return <Award className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* ─── 1. HEADER BANNER WITH OVERALL COMPLETION ─── */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                <TrendingUp className="w-5 h-5" />
              </span>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">
                Binary Search Learning Progress
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Track your journey through Binary Search concepts, algorithms, problem solving, complexity, and practical applications.
            </p>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onResetProgress();
            }}
            title="Total Reset"
            aria-label="Total Reset"
            className="p-2.5 bg-slate-100 hover:bg-red-50 hover:text-red-700 dark:bg-slate-800 dark:hover:bg-red-950/50 dark:hover:text-red-400 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center cursor-pointer shadow-2xs active:scale-95 shrink-0"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* OVERALL COMPLETION */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-lg">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                OVERALL COMPLETION
              </span>
              <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                ({completedLearn} of 12 Binary Search Modules)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Overall mastery reflects your completed Binary Search learning activities.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
              {masteryPercentage}%
            </span>
            <div className="w-36 sm:w-48 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 transition-all duration-300"
                style={{ width: `${masteryPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN METRIC CARDS GRID (PERFORMANCE STATS) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Theory Progress */}
        <div
          onClick={() => {
            soundEffects.playClick();
            if (onNavigateTab) onNavigateTab('theory');
          }}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              THEORY
            </span>
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {completedLearn} / 12
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Chapters
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 transition-all duration-300"
              style={{ width: `${Math.round((completedLearn / 12) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            {completedLearn === 12
              ? 'All 12 chapters completed'
              : `${12 - completedLearn} chapters remaining`}
          </p>
        </div>

        {/* Visualize / Videos */}
        <div
          onClick={() => {
            soundEffects.playClick();
            if (onNavigateTab) onNavigateTab('lab');
          }}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              VIDEOS
            </span>
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {completedLabs} / 2
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Videos
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-500 transition-all duration-300"
              style={{ width: `${Math.round((completedLabs / 2) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            {completedLabs} / 2 Completed
          </p>
        </div>

        {/* Games Progress */}
        <div
          onClick={() => {
            soundEffects.playClick();
            if (onNavigateTab) onNavigateTab('game');
          }}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-emerald-300 dark:hover:border-emerald-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              GAMES
            </span>
            <Gamepad2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {completedGames} / 6
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Challenges
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-emerald-600 dark:bg-emerald-500 transition-all duration-300"
              style={{ width: `${Math.round((completedGames / 6) * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 font-medium">
            {completedGames === 6
              ? '✓ Completed'
              : completedGames > 0
              ? '◐ In Progress'
              : '○ Not Started'}
          </p>
        </div>

        {/* Quiz Progress */}
        <div
          onClick={() => {
            soundEffects.playClick();
            if (onNavigateTab) onNavigateTab('quiz');
          }}
          className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              QUIZ
            </span>
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
              {quizAnswered} / 10
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              Answered
            </span>
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
              style={{ width: `${quizAccuracy}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2">
            {progress.quizCompleted || quizAnswered > 0
              ? `${quizCorrect} Correct • ${quizAccuracy}% Accuracy`
              : '○ Not Started'}
          </p>
        </div>
      </div>

      {/* ─── 3. RECOMMENDED NEXT STEP CARD ─── */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-7 rounded-2xl border border-blue-800/60 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative overflow-hidden">
        <div className="space-y-1.5 z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase font-bold tracking-widest bg-blue-500/20 text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-400/30">
              RECOMMENDED NEXT STEP
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-black tracking-tight text-white uppercase">
            {recommendation.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {recommendation.description}
          </p>
        </div>
        <button
          onClick={() => {
            soundEffects.playClick();
            if (onNavigateTab) {
              onNavigateTab(recommendation.tab);
            }
          }}
          className="z-10 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
        >
          <span>{recommendation.actionText}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* ─── 4. RECOMMENDED LEARNING PATH & COMPLEXITY SUMMARY ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recommended Learning Path */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Recommended Learning Path
            </span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap text-[11px] font-mono font-semibold text-slate-700 dark:text-slate-300">
            <span className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300">
              Binary Search Basics
            </span>
            <span className="text-slate-400">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              Sorted Array
            </span>
            <span className="text-slate-400">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              Low / Mid / High
            </span>
            <span className="text-slate-400">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              Compare
            </span>
            <span className="text-slate-400">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              Narrow Search
            </span>
            <span className="text-slate-400">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              Found / Not Found
            </span>
            <span className="text-slate-400">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              Complexity
            </span>
            <span className="text-slate-400">➔</span>
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300">
              Problem Solving
            </span>
          </div>
        </div>

        {/* Complexity Card */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" />
            Complexity Information
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Best Case</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                O(1)
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Average Case</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                O(log n)
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Worst Case</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                O(log n)
              </span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <span className="text-slate-400 block text-[10px]">Space</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                O(1) iterative
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 5. FILTERS / CATEGORIES ─── */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Binary Search Modules
            </h2>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ─── 6. 12 BINARY SEARCH MODULES GRID ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredModules.map((mod) => {
            const isCompleted =
              progress.completedTheoryChapters?.includes(mod.id);
            const isInProgress =
              !isCompleted &&
              (mod.id === 1 ||
                progress.completedTheoryChapters?.includes(mod.id - 1));
            const statusText = isCompleted
              ? '✓ Completed'
              : isInProgress
              ? '◐ In Progress'
              : '○ Not Started';
            const modulePercent = isCompleted ? 100 : isInProgress ? 50 : 0;

            return (
              <div
                key={mod.id}
                onClick={() => {
                  soundEffects.playClick();
                  if (onNavigateTab) onNavigateTab('theory');
                }}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between cursor-pointer hover:border-blue-400 dark:hover:border-blue-500 ${
                  isCompleted
                    ? 'bg-white dark:bg-slate-900 border-emerald-300/80 dark:border-emerald-800/60 shadow-2xs'
                    : isInProgress
                    ? 'bg-white dark:bg-slate-900 border-blue-400 dark:border-blue-600 shadow-xs ring-1 ring-blue-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-2xs opacity-90'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {mod.code}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isCompleted
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                          : isInProgress
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {statusText}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                    {mod.category}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase leading-snug">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 dark:text-slate-500 text-[11px]">
                      Progress
                    </span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {modulePercent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isCompleted
                          ? 'bg-emerald-500'
                          : isInProgress
                          ? 'bg-blue-600'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                      style={{ width: `${modulePercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 7. MASTER CHALLENGES ─── */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Master Challenges
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Complete interactive problem-solving benchmarks to test your algorithmic speed and precision.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/80 px-3 py-1 rounded-xl border border-blue-200 dark:border-blue-800">
            {masterSolvedCount}/4 Solved
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MASTER_CHALLENGES.map((ch) => (
            <div
              key={ch.id}
              onClick={() => {
                soundEffects.playClick();
                if (onNavigateTab) onNavigateTab('game');
              }}
              className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition-all ${
                ch.isDone
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/30 dark:bg-emerald-950/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    CHALLENGE {ch.number}
                  </span>
                  {ch.isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1">
                  {ch.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                  {ch.desc}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">Status</span>
                <span
                  className={`font-semibold ${
                    ch.isDone
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  {ch.isDone ? 'Solved' : 'Locked'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 8. ACHIEVEMENT BADGES SECTION ─── */}
      <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Achievement Badges & Milestones
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Unlock badges by mastering Binary Search operations, challenges, and quizzes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_ACHIEVEMENTS.map((badge) => {
            const isUnlocked =
              progress.achievements?.includes(badge.id) ||
              (badge.id === 'first_push' &&
                ((progress.completedTheoryChapters?.length || 0) > 0 ||
                  (progress.completedLabs?.length || 0) > 0 ||
                  progress.awardedEventKeys.includes('first_push_award'))) ||
              (badge.id === 'lifo_master' &&
                (progress.completedGameLevels.includes(1) ||
                  progress.completedGameLevels.includes(2) ||
                  progress.awardedEventKeys.includes('game_level_2_completed'))) ||
              (badge.id === 'overflow_explorer' &&
                (progress.completedGameLevels.includes(3) ||
                  progress.completedGameLevels.includes(4) ||
                  (progress.completedTheoryChapters?.length || 0) >= 4)) ||
              (badge.id === 'speed_demon' &&
                (progress.completedGameLevels.includes(6) ||
                  progress.awardedEventKeys.includes('game_level_6_completed'))) ||
              (badge.id === 'debugger_pro' &&
                (progress.completedGameLevels.includes(5) ||
                  progress.awardedEventKeys.includes('game_level_5_completed'))) ||
              (badge.id === 'lab_explorer' &&
                ((progress.completedLabs?.length || 0) >= 1 ||
                  (progress.completedTheoryChapters?.length || 0) >= 6)) ||
              (badge.id === 'quiz_ace' &&
                (progress.quizCompleted || progress.quizHighScore >= 70)) ||
              (badge.id === 'streak_3' && progress.streakDays >= 3);

            return (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-gradient-to-br from-white to-blue-50/50 dark:from-slate-900 dark:to-blue-950/40 border-blue-200 dark:border-blue-800/80 shadow-xs'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white shadow-xs'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {getAchievementIcon(badge.iconName)}
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isUnlocked
                          ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {isUnlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {badge.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 dark:text-slate-500 font-medium text-[11px]">
                    Reward
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                    +{badge.xpReward} XP
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ─── 9. HISTORICAL MILESTONES LOG ─── */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xs space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Learning Event Timeline
        </h2>

        <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
          {progress.history.map((event, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex items-start justify-between gap-3"
            >
              <div>
                <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                  {event.title}
                </span>
                <span className="text-slate-500 dark:text-slate-400 block text-[11px]">
                  {event.description}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 block font-mono">
                  {event.timestamp}
                </span>
              </div>

              {event.xpEarned > 0 && (
                <span className="shrink-0 text-xs font-bold px-2 py-1 bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 rounded-lg">
                  +{event.xpEarned} XP
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
