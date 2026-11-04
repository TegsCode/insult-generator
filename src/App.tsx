import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { TraitAssembler } from './components/TraitAssembler';
import { InsultParchmentCard } from './components/InsultParchmentCard';
import { WitDuelArena } from './components/WitDuelArena';
import { ModernGrievanceTranslator } from './components/ModernGrievanceTranslator';
import { CodexOfScoundrels } from './components/CodexOfScoundrels';
import { GrimoireModal } from './components/GrimoireModal';
import { GeneratedInsult, LexiconEntry, TraitSettings, Vibe } from './types/insult';
import { generateInsult, PresetArchetype, ARCHETYPE_PRESETS } from './utils/insultEngine';
import { soundEffects } from './utils/audioSpeech';

export default function App() {
  const [activeTab, setActiveTab] = useState<'assembler' | 'duel' | 'translator' | 'codex'>('assembler');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('calumny_theme') === 'dark';
    }
    return false;
  });

  const [settings, setSettings] = useState<TraitSettings>({
    lazinessLevel: 3,
    nonsenseLevel: 3,
    vibe: 'pompous',
    era: 'elizabethan',
    venom: 'courtly',
    targetName: 'Sir Braggart'
  });

  const [currentInsult, setCurrentInsult] = useState<GeneratedInsult>(() =>
    generateInsult({
      lazinessLevel: 3,
      nonsenseLevel: 3,
      vibe: 'pompous',
      era: 'elizabethan',
      venom: 'courtly',
      targetName: 'Sir Braggart'
    })
  );

  const [savedInsults, setSavedInsults] = useState<GeneratedInsult[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('calumny_grimoire');
        if (stored) return JSON.parse(stored);
      } catch {
        // ignore error
      }
    }
    return [];
  });

  const [isGrimoireOpen, setIsGrimoireOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('calumny_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('calumny_theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('calumny_grimoire', JSON.stringify(savedInsults));
  }, [savedInsults]);

  const handleGenerate = () => {
    soundEffects.playGavel();
    const newInsult = generateInsult(settings);
    setCurrentInsult(newInsult);
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
      targetName: settings.targetName || 'Varlet'
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
    let newLaziness = settings.lazinessLevel;
    let newNonsense = settings.nonsenseLevel;
    let newVibe = settings.vibe;

    if (term.primaryTrait === 'laziness') newLaziness = 4;
    if (term.primaryTrait === 'nonsense') newNonsense = 4;
    if (term.primaryTrait === 'vibe') newVibe = 'pompous';

    const updatedSettings: TraitSettings = {
      ...settings,
      era: term.era,
      lazinessLevel: newLaziness,
      nonsenseLevel: newNonsense,
      vibe: newVibe
    };

    setSettings(updatedSettings);
    setCurrentInsult(generateInsult(updatedSettings));
    setActiveTab('assembler');
  };

  const handleToggleSave = (insult: GeneratedInsult) => {
    soundEffects.playParchmentRustle();
    setSavedInsults(prev => {
      const exists = prev.some(item => item.id === insult.id);
      if (exists) {
        return prev.filter(item => item.id !== insult.id);
      } else {
        return [insult, ...prev];
      }
    });
  };

  const isCurrentInsultSaved = savedInsults.some(item => item.id === currentInsult.id);

  return (
    <div className="min-h-screen bg-[#f7f4ee] dark:bg-[#12100e] text-stone-900 dark:text-stone-100 flex flex-col font-sans transition-colors duration-200">
      {/* 3-Zone Top Navigation Contract */}
      <TopNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onInstantForge={handleRandomize}
        savedCount={savedInsults.length}
        onOpenGrimoire={() => setIsGrimoireOpen(true)}
        isDark={isDark}
        setIsDark={setIsDark}
      />

      {/* Main Content Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Curatorial Editorial Marquee */}
        <section className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-cinzel uppercase tracking-widest text-amber-900 dark:text-amber-400 font-bold">
            Archival Slander · Est. 1590
          </div>
          <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 leading-tight">
            The Historical English Insult Generator
          </h1>
          <p className="font-editorial italic text-lg sm:text-xl text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl mx-auto">
            Calibrate an offender’s laziness, bluster, and disposition to synthesize a hyper-specific, historically attested period burn with full etymological breakdown.
          </p>

          {/* Interactive Workspace Navigation Tabs */}
          <div className="pt-2 flex justify-center">
            <div className="inline-flex items-center gap-1 p-1 bg-stone-200/70 dark:bg-stone-900 rounded-lg border border-stone-300 dark:border-stone-800 text-xs">
              <button
                onClick={() => setActiveTab('assembler')}
                className={`px-3.5 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'assembler'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Burn Assembler
              </button>
              <button
                onClick={() => setActiveTab('duel')}
                className={`px-3.5 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'duel'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Wit Duel Arena
              </button>
              <button
                onClick={() => setActiveTab('translator')}
                className={`px-3.5 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'translator'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Modern Grievances
              </button>
              <button
                onClick={() => setActiveTab('codex')}
                className={`px-3.5 py-1.5 font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeTab === 'codex'
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                Lexicon Codex
              </button>
            </div>
          </div>
        </section>

        {/* Tab 1: Trait Assembler & Live Parchment Card */}
        {activeTab === 'assembler' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Trait Calibrator */}
            <div className="lg:col-span-6 space-y-6">
              <TraitAssembler
                settings={settings}
                setSettings={setSettings}
                onGenerate={handleGenerate}
                onSelectArchetype={handleSelectArchetype}
                onRandomize={handleRandomize}
              />
            </div>

            {/* Right: The Parchment Warrant Display */}
            <div className="lg:col-span-6 space-y-6">
              <InsultParchmentCard
                insult={currentInsult}
                isSaved={isCurrentInsultSaved}
                onToggleSave={handleToggleSave}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Wit Duel Arena */}
        {activeTab === 'duel' && <WitDuelArena />}

        {/* Tab 3: Modern Grievance Transmuter */}
        {activeTab === 'translator' && <ModernGrievanceTranslator />}

        {/* Tab 4: Lexicon Codex */}
        {activeTab === 'codex' && (
          <CodexOfScoundrels onSelectTermForAssembler={handleSelectTermForAssembler} />
        )}
      </main>

      {/* Grimoire Modal */}
      <GrimoireModal
        isOpen={isGrimoireOpen}
        onClose={() => setIsGrimoireOpen(false)}
        savedInsults={savedInsults}
        onRemoveInsult={id => setSavedInsults(prev => prev.filter(i => i.id !== id))}
        onClearAll={() => setSavedInsults([])}
      />

      {/* Institutional Archival Footer */}
      <footer className="mt-auto border-t border-stone-300 dark:border-stone-800 bg-[#f7f4ee] dark:bg-[#151210] py-8 text-xs text-stone-500 dark:text-stone-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-cinzel font-bold text-stone-800 dark:text-stone-200">
              The Grand Lexicon of Calumny
            </span>
            <span aria-hidden="true">·</span>
            <span>Grounded in Elizabethan, Georgian & Victorian Lexicography</span>
          </div>

          <div className="flex items-center gap-3">
            <span>Sources: Shakespeare First Folio</span>
            <span aria-hidden="true">·</span>
            <span>Grose’s 1811 Vulgar Tongue</span>
            <span aria-hidden="true">·</span>
            <span>Dekker’s Gull’s Hornbook</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
