import React, { useState, useEffect } from 'react';
import { ArrowDownRight, Feather, Sparkles } from 'lucide-react';
import { TopNav } from './components/TopNav';
import { TraitAssembler } from './components/TraitAssembler';
import { InsultParchmentCard } from './components/InsultParchmentCard';
import { WitDuelArena } from './components/WitDuelArena';
import { ModernGrievanceTranslator } from './components/ModernGrievanceTranslator';
import { CodexOfScoundrels } from './components/CodexOfScoundrels';
import { GrimoireModal } from './components/GrimoireModal';
import type { GeneratedInsult, LexiconEntry, TraitSettings, Vibe } from './types/insult';
import { generateInsult, type PresetArchetype } from './utils/insultEngine';
import { soundEffects } from './utils/audioSpeech';

export default function App() {
  const [activeTab, setActiveTab] = useState<'assembler' | 'duel' | 'translator' | 'codex'>('assembler');
  const [isDark, setIsDark] = useState<boolean>(() => typeof window !== 'undefined' && localStorage.getItem('calumny_theme') === 'dark');
  const [settings, setSettings] = useState<TraitSettings>({ lazinessLevel: 3, nonsenseLevel: 3, vibe: 'pompous', era: 'elizabethan', venom: 'courtly', targetName: 'Sir Braggart' });
  const [currentInsult, setCurrentInsult] = useState<GeneratedInsult>(() => generateInsult({ lazinessLevel: 3, nonsenseLevel: 3, vibe: 'pompous', era: 'elizabethan', venom: 'courtly', targetName: 'Sir Braggart' }));
  const [savedInsults, setSavedInsults] = useState<GeneratedInsult[]>(() => {
    try {
      const stored = localStorage.getItem('calumny_grimoire');
      return stored ? JSON.parse(stored) as GeneratedInsult[] : [];
    } catch { return []; }
  });
  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('calumny_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => { localStorage.setItem('calumny_grimoire', JSON.stringify(savedInsults)); }, [savedInsults]);

  const handleGenerate = () => {
    soundEffects.playGavel();
    setCurrentInsult(generateInsult(settings));
  };

  const handleRandomize = () => {
    soundEffects.playFanfare();
    const vibes: Vibe[] = ['pompous', 'debauched', 'treacherous', 'brainless', 'sour', 'miserly'];
    const eras = ['elizabethan', 'jacobean', 'georgian', 'victorian', 'medieval'] as const;
    const venoms = ['gentle', 'courtly', 'scathing'] as const;
    const randomSettings: TraitSettings = {
      lazinessLevel: Math.floor(Math.random() * 4) + 1,
      nonsenseLevel: Math.floor(Math.random() * 4) + 1,
      vibe: vibes[Math.floor(Math.random() * vibes.length)],
      era: eras[Math.floor(Math.random() * eras.length)],
      venom: venoms[Math.floor(Math.random() * venoms.length)],
      targetName: settings.targetName || 'Varlet',
    };
    setSettings(randomSettings);
    setCurrentInsult(generateInsult(randomSettings));
  };

  const handleSelectArchetype = (archetype: PresetArchetype) => {
    soundEffects.playParchmentRustle();
    setSettings(archetype.settings);
    setCurrentInsult(generateInsult(archetype.settings));
  };

  const handleSelectTermForAssembler = (term: LexiconEntry) => {
    soundEffects.playParchmentRustle();
    const updatedSettings: TraitSettings = {
      ...settings,
      era: term.era,
      lazinessLevel: term.primaryTrait === 'laziness' ? 4 : settings.lazinessLevel,
      nonsenseLevel: term.primaryTrait === 'nonsense' ? 4 : settings.nonsenseLevel,
      vibe: term.primaryTrait === 'vibe' ? 'pompous' : settings.vibe,
    };
    setSettings(updatedSettings);
    setCurrentInsult(generateInsult(updatedSettings));
    setActiveTab('assembler');
  };

  const handleToggleSave = (insult: GeneratedInsult) => {
    soundEffects.playParchmentRustle();
    setSavedInsults(previous => previous.some(item => item.id === insult.id)
      ? previous.filter(item => item.id !== insult.id)
      : [insult, ...previous]);
  };

  const isCurrentInsultSaved = savedInsults.some(item => item.id === currentInsult.id);
  const tabTitles = { assembler: 'The Insult Forge', duel: 'Wit Duel Arena', translator: 'Grievance Translator', codex: 'Historical Wordbook' };

  return (
    <div className="flex min-h-screen flex-col bg-[#f8f6f1] font-sans text-stone-900 transition-colors duration-200 dark:bg-[#12110f] dark:text-stone-100">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} onInstantForge={handleRandomize} savedCount={savedInsults.length} onOpenGrimoire={() => setIsGrimoireOpen(true)} isDark={isDark} setIsDark={setIsDark} />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <section className="relative mb-8 overflow-hidden rounded-2xl border border-stone-200 bg-white px-5 py-7 shadow-sm dark:border-stone-800 dark:bg-stone-900/70 sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-amber-100/60 blur-3xl dark:bg-amber-900/10" />
          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-900/15 bg-amber-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-amber-900 dark:border-amber-200/10 dark:bg-amber-950/30 dark:text-amber-300">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />Historical wit · 1380—1880
            </div>
            <h1 className="font-cinzel text-3xl font-extrabold tracking-tight text-stone-950 dark:text-stone-50 sm:text-4xl lg:text-5xl">A sharper sort of insult.</h1>
            <p className="mx-auto mt-3 max-w-2xl font-editorial text-lg leading-relaxed text-stone-600 dark:text-stone-300 sm:text-xl">
              Mix a little old-world vocabulary with modern grievances, then forge a burn fit for the history books.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 dark:text-stone-500">
              <Feather className="h-3.5 w-3.5" aria-hidden="true" />{tabTitles[activeTab]}<ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
          </div>
        </section>

        {activeTab === 'assembler' && (
          <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-12 xl:gap-8">
            <div className="xl:col-span-6"><TraitAssembler settings={settings} setSettings={setSettings} onGenerate={handleGenerate} onSelectArchetype={handleSelectArchetype} onRandomize={handleRandomize} /></div>
            <div className="xl:col-span-6 xl:sticky xl:top-24"><InsultParchmentCard insult={currentInsult} isSaved={isCurrentInsultSaved} onToggleSave={handleToggleSave} /></div>
          </div>
        )}
        {activeTab === 'duel' && <WitDuelArena />}
        {activeTab === 'translator' && <ModernGrievanceTranslator />}
        {activeTab === 'codex' && <CodexOfScoundrels onSelectTermForAssembler={handleSelectTermForAssembler} />}
      </main>
      <GrimoireModal isOpen={isGrimoireOpen} onClose={() => setIsGrimoireOpen(false)} savedInsults={savedInsults} onRemoveInsult={id => setSavedInsults(previous => previous.filter(item => item.id !== id))} onClearAll={() => setSavedInsults([])} />
      <footer className="mt-auto border-t border-stone-200 bg-white/70 py-6 text-xs text-stone-500 dark:border-stone-800 dark:bg-stone-950/40 dark:text-stone-400">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <span className="font-cinzel font-bold text-stone-700 dark:text-stone-200">The Grand Lexicon of Calumny</span>
          <span>Inspired by historical English lexicons · Built for good-humoured roasts</span>
        </div>
      </footer>
    </div>
  );
}
