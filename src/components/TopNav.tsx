import React from 'react';
import { BookOpen, Feather, Moon, Sparkles, Sun, Swords, ScrollText, BookMarked } from 'lucide-react';

type Tab = 'assembler' | 'duel' | 'translator' | 'codex';

interface TopNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onInstantForge: () => void;
  savedCount: number;
  onOpenGrimoire: () => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
}

const navigation: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: 'assembler', label: 'The Forge', icon: Feather },
  { id: 'duel', label: 'Wit Duel', icon: Swords },
  { id: 'translator', label: 'Grievances', icon: ScrollText },
  { id: 'codex', label: 'The Codex', icon: BookMarked },
];

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  setActiveTab,
  onInstantForge,
  savedCount,
  onOpenGrimoire,
  isDark,
  setIsDark,
}) => (
  <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-[#fbf9f5]/90 backdrop-blur-xl transition-colors dark:border-stone-800/80 dark:bg-[#151311]/90">
    <div className="mx-auto flex min-h-16 max-w-7xl flex-wrap items-center justify-between gap-x-4 px-4 sm:px-6 lg:flex-nowrap lg:px-8">
      <button type="button" onClick={() => setActiveTab('assembler')} className="group flex min-w-0 items-center gap-3 py-2 text-left" aria-label="Go to the insult forge">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-900/15 bg-amber-100/70 text-amber-950 shadow-sm transition-transform group-hover:-rotate-3 dark:border-amber-200/10 dark:bg-amber-950/50 dark:text-amber-200">
          <Feather className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block truncate font-cinzel text-sm font-bold tracking-wide text-stone-950 dark:text-stone-100 sm:text-base">The Grand Lexicon</span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400 sm:block">A workshop of wit & calumny</span>
        </span>
      </button>
      <nav aria-label="Main navigation" className="order-3 flex w-full items-center gap-1 overflow-x-auto border-t border-stone-200/70 py-2 lg:order-none lg:w-auto lg:justify-center lg:overflow-visible lg:border-0 lg:py-0">
        {navigation.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return <button key={id} type="button" onClick={() => setActiveTab(id)} aria-current={isActive ? 'page' : undefined} className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${isActive ? 'bg-stone-900 text-amber-50 shadow-sm dark:bg-amber-100 dark:text-stone-950' : 'text-stone-600 hover:bg-stone-200/70 hover:text-stone-950 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100'}`}>
            <Icon className="h-4 w-4" aria-hidden="true" />{label}
          </button>;
        })}
      </nav>
      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button type="button" onClick={onOpenGrimoire} aria-label={`Open saved insults${savedCount ? `, ${savedCount} saved` : ''}`} title="Saved insults" className="relative grid h-9 w-9 place-items-center rounded-lg text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100">
          <BookOpen className="h-[18px] w-[18px]" aria-hidden="true" />{savedCount > 0 && <span className="absolute -right-1 -top-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-amber-800 px-1 text-[10px] font-bold leading-none text-white">{savedCount}</span>}
        </button>
        <button type="button" onClick={() => setIsDark(!isDark)} aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'} title={isDark ? 'Light theme' : 'Dark theme'} className="grid h-9 w-9 place-items-center rounded-lg text-stone-600 transition-colors hover:bg-stone-200/70 hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100">
          {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
        </button>
        <button type="button" onClick={onInstantForge} className="inline-flex h-9 items-center gap-2 rounded-lg bg-amber-800 px-3 text-xs font-bold text-amber-50 shadow-sm transition-colors hover:bg-amber-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 dark:bg-amber-700 dark:hover:bg-amber-600 sm:px-4">
          <Sparkles className="h-4 w-4" aria-hidden="true" /><span className="hidden sm:inline">Surprise me</span><span className="sm:hidden">Random</span>
        </button>
      </div>
    </div>
  </header>
);
