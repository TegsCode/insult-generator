import React from 'react';
import { Sparkles, Moon, Sun, BookOpen } from 'lucide-react';

interface TopNavProps {
  activeTab: 'assembler' | 'duel' | 'translator' | 'codex';
  setActiveTab: (tab: 'assembler' | 'duel' | 'translator' | 'codex') => void;
  onInstantForge: () => void;
  savedCount: number;
  onOpenGrimoire: () => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onInstantForge,
  savedCount,
  onOpenGrimoire,
  isDark,
  setIsDark,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#f7f4ee]/95 dark:bg-[#151210]/95 backdrop-blur-md border-b border-stone-300 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => setActiveTab('assembler')}
            className="text-left font-cinzel text-lg sm:text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
          >
            Historical English Insult Generator
          </button>

          {/* Zone 2: 4 clean single-line text navigation links in modern English */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-700 dark:text-stone-300">
            <button
              onClick={() => setActiveTab('assembler')}
              className={`hover:text-amber-900 dark:hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'assembler'
                  ? 'border-amber-800 dark:border-amber-400 font-semibold text-stone-950 dark:text-white'
                  : 'border-transparent text-stone-600 dark:text-stone-400'
              }`}
            >
              Insult Generator
            </button>
            <button
              onClick={() => setActiveTab('duel')}
              className={`hover:text-amber-900 dark:hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'duel'
                  ? 'border-amber-800 dark:border-amber-400 font-semibold text-stone-950 dark:text-white'
                  : 'border-transparent text-stone-600 dark:text-stone-400'
              }`}
            >
              Insult Battle Game
            </button>
            <button
              onClick={() => setActiveTab('translator')}
              className={`hover:text-amber-900 dark:hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'translator'
                  ? 'border-amber-800 dark:border-amber-400 font-semibold text-stone-950 dark:text-white'
                  : 'border-transparent text-stone-600 dark:text-stone-400'
              }`}
            >
              Modern Annoyances
            </button>
            <button
              onClick={() => setActiveTab('codex')}
              className={`hover:text-amber-900 dark:hover:text-amber-300 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeTab === 'codex'
                  ? 'border-amber-800 dark:border-amber-400 font-semibold text-stone-950 dark:text-white'
                  : 'border-transparent text-stone-600 dark:text-stone-400'
              }`}
            >
              Historical Dictionary
            </button>
          </nav>

          {/* Zone 3: 1 primary action + minimal utility toggles */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenGrimoire}
              aria-label="View Saved Burns"
              className="relative p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
              title="Saved Insults"
            >
              <BookOpen className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-800 text-amber-50 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle Theme"
              className="p-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={onInstantForge}
              className="px-4 py-2 text-xs font-semibold text-amber-50 bg-stone-900 dark:bg-amber-900/90 dark:text-amber-100 rounded-md hover:bg-stone-800 dark:hover:bg-amber-800 transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Random Burn</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
