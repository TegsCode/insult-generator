import React from 'react';
import { Dice5, Sparkles, SlidersHorizontal } from 'lucide-react';
import { Era, TraitSettings, VenomLevel, Vibe } from '../types/insult';
import { ARCHETYPE_PRESETS, PresetArchetype } from '../utils/insultEngine';
import { soundEffects } from '../utils/audioSpeech';

interface TraitAssemblerProps {
  settings: TraitSettings;
  setSettings: React.Dispatch<React.SetStateAction<TraitSettings>>;
  onGenerate: () => void;
  onSelectArchetype: (archetype: PresetArchetype) => void;
  onRandomize: () => void;
}

export const TraitAssembler: React.FC<TraitAssemblerProps> = ({
  settings,
  setSettings,
  onGenerate,
  onSelectArchetype,
  onRandomize,
}) => {
  const lazinessDescriptions = [
    { label: 'Mild Procrastinator', sub: 'Always dragging their feet and putting things off' },
    { label: 'Lazy Couch Potato', sub: 'Avoids any physical work and sits around all day' },
    { label: 'Heavy Sleeper / Slacker', sub: 'Refuses to get out of bed before mid-afternoon' },
    { label: 'Completely Useless Freeloader', sub: 'Does zero productive work whatsoever' },
  ];

  const nonsenseDescriptions = [
    { label: 'Chatterbox / Yapper', sub: 'Never stops talking about trivial nonsense and drama' },
    { label: 'Confidently Incorrect', sub: 'Spouts rumors and fake facts with complete confidence' },
    { label: 'Loudmouth Windbag', sub: 'Uses fancy words and hot air to hide that they have no point' },
    { label: 'Fountain of Pure Garbage', sub: 'Complete unhinged nonsense that hurts your brain to hear' },
  ];

  const vibes: { id: Vibe; label: string; desc: string }[] = [
    { id: 'pompous', label: 'Arrogant & Pretentious', desc: 'Thinks they are royalty, acts superior to everyone' },
    { id: 'debauched', label: 'Loud & Rowdy Drunk', desc: 'Gets sloppy, loud, and disorderly after a few drinks' },
    { id: 'treacherous', label: 'Two-Faced & Sneaky', desc: 'Smiles to your face, stabs you in the back' },
    { id: 'brainless', label: 'Clueless & Dimwitted', desc: 'Not the sharpest tool in the shed, easily fooled' },
    { id: 'sour', label: 'Bitter & Sour-Tempered', desc: 'Always scowling, grumpy, and ruining the mood' },
    { id: 'miserly', label: 'Stingy Cheapskate', desc: 'Splits the bill to the cent, never buys a round' },
  ];

  const eras: { id: Era; label: string; period: string }[] = [
    { id: 'elizabethan', label: 'Shakespearean', period: '1590s · Theatrical poetry & drama' },
    { id: 'jacobean', label: 'Restoration', period: '1660s · Sarcastic, cynical tavern barbs' },
    { id: 'georgian', label: 'Georgian / Regency', period: '1810s · Posh Bridgerton-style snobbery' },
    { id: 'victorian', label: 'Victorian', period: '1880s · Ice-cold passive-aggressive cruelty' },
    { id: 'medieval', label: 'Medieval', period: '1380s · Gritty, raw tavern brawl burns' },
  ];

  const venoms: { id: VenomLevel; label: string; sub: string }[] = [
    { id: 'gentle', label: 'Playful Teasing', sub: 'Gentle ribbing between friends' },
    { id: 'courtly', label: 'Classy Burn', sub: 'Sharp, elegant put-down' },
    { id: 'scathing', label: 'Savage Takedown', sub: 'Full scorched-earth roast' },
  ];

  const handleSliderChange = (
    key: 'lazinessLevel' | 'nonsenseLevel',
    value: number
  ) => {
    soundEffects.playParchmentRustle();
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border border-stone-300 dark:border-stone-800 rounded-lg p-6 sm:p-7 space-y-7 shadow-sm">
      {/* Header and Archetype Quick Picks */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="font-cinzel text-base font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-800 dark:text-amber-400" />
              <span>Select Personality Traits</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Pick the specific vices of the person you want to roast in plain English.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRandomize}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Dice5 className="w-3.5 h-3.5" />
              <span>Randomize Traits</span>
            </button>
          </div>
        </div>

        {/* Archetype Quick Buttons */}
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-sans block mb-2">
            Quick Character Presets:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ARCHETYPE_PRESETS.map(archetype => (
              <button
                key={archetype.id}
                onClick={() => onSelectArchetype(archetype)}
                className="px-2.5 py-1 text-xs font-medium rounded-md bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/40 hover:text-amber-900 dark:hover:text-amber-300 transition-colors border border-stone-200 dark:border-stone-700"
              >
                {archetype.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trait 1: Laziness */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
            1. How lazy are they?
          </label>
          <span className="text-xs font-medium text-amber-900 dark:text-amber-400 font-semibold">
            {lazinessDescriptions[settings.lazinessLevel - 1].label}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="4"
          step="1"
          value={settings.lazinessLevel}
          onChange={e => handleSliderChange('lazinessLevel', parseInt(e.target.value))}
          className="w-full accent-amber-800 dark:accent-amber-600 h-2 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-0.5">
          <span>Mild Procrastinator</span>
          <span>Couch Potato</span>
          <span>Sleeps All Day</span>
          <span>Total Freeloader</span>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 italic">
          &ldquo;{lazinessDescriptions[settings.lazinessLevel - 1].sub}&rdquo;
        </p>
      </div>

      {/* Trait 2: Nonsense & Bluster */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
            2. How much nonsense do they talk?
          </label>
          <span className="text-xs font-medium text-amber-900 dark:text-amber-400 font-semibold">
            {nonsenseDescriptions[settings.nonsenseLevel - 1].label}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="4"
          step="1"
          value={settings.nonsenseLevel}
          onChange={e => handleSliderChange('nonsenseLevel', parseInt(e.target.value))}
          className="w-full accent-amber-800 dark:accent-amber-600 h-2 bg-stone-200 dark:bg-stone-800 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-0.5">
          <span>Chatterbox</span>
          <span>Confidently Wrong</span>
          <span>Loudmouth Windbag</span>
          <span>Pure Garbage</span>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 italic">
          &ldquo;{nonsenseDescriptions[settings.nonsenseLevel - 1].sub}&rdquo;
        </p>
      </div>

      {/* Trait 3: Overall Vibe */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
          3. What is their worst habit or vibe?
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {vibes.map(vibe => {
            const isSelected = settings.vibe === vibe.id;
            return (
              <button
                key={vibe.id}
                onClick={() => {
                  soundEffects.playParchmentRustle();
                  setSettings(prev => ({ ...prev, vibe: vibe.id }));
                }}
                className={`p-2.5 text-left rounded-md border transition-all text-xs ${
                  isSelected
                    ? 'border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="font-semibold">{vibe.label}</div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1">
                  {vibe.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trait 4: Historical Era */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
          4. Historical Era & Dialect (The Output Style)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {eras.map(era => {
            const isSelected = settings.era === era.id;
            return (
              <button
                key={era.id}
                onClick={() => {
                  soundEffects.playParchmentRustle();
                  setSettings(prev => ({ ...prev, era: era.id }));
                }}
                className={`p-2 text-left rounded-md border transition-all text-xs ${
                  isSelected
                    ? 'border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-semibold shadow-sm'
                    : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <div className="font-semibold">{era.label}</div>
                <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
                  {era.period}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Trait 5: Venom Severity & Target Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-1.5">
            5. Harshness Level
          </label>
          <div className="flex rounded-md border border-stone-200 dark:border-stone-800 p-0.5 bg-stone-100 dark:bg-stone-800/60">
            {venoms.map(v => (
              <button
                key={v.id}
                onClick={() => setSettings(prev => ({ ...prev, venom: v.id }))}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap text-center ${
                  settings.venom === v.id
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
                title={v.sub}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-1.5">
            6. Who are you roasting? (Target Name / Title)
          </label>
          <input
            type="text"
            placeholder="e.g., My roommate, Dave from accounting, My ex"
            value={settings.targetName}
            onChange={e => setSettings(prev => ({ ...prev, targetName: e.target.value }))}
            className="w-full text-xs px-3 py-2 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
          />
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="pt-2">
        <button
          onClick={onGenerate}
          className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 dark:bg-amber-900 dark:hover:bg-amber-800 text-amber-50 font-cinzel font-bold text-sm tracking-wide rounded-md shadow transition-all flex items-center justify-center gap-2 group"
        >
          <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Generate Historical Burn</span>
        </button>
      </div>
    </div>
  );
};
