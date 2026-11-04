import React from 'react';
import { Dice5, Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';
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
    { label: 'Mild Dawdler', sub: 'Tardy loiterer, slow to stir' },
    { label: 'Lethargic Drone', sub: 'Bench-polishing couch-louse' },
    { label: 'Bed-Pressing Sluggard', sub: 'Mattress-worshipper & slug-a-bed' },
    { label: 'Bone-Idle Fopdoodle', sub: 'Total paralysis of productive duty' },
  ];

  const nonsenseDescriptions = [
    { label: 'Idle Prattler', sub: 'Airy-worded clatterfart' },
    { label: 'Purveyor of Moonshine', sub: 'Flummery-peddling bleater' },
    { label: 'Windbag of Fustian', sub: 'Balderdash-spewing blatherskite' },
    { label: 'Geyser of Balderdash', sub: 'Bedlam-witted torrent of rubbish' },
  ];

  const vibes: { id: Vibe; label: string; desc: string }[] = [
    { id: 'pompous', label: 'Pompous & Pretentious', desc: 'Silk-bedecked dandiprat' },
    { id: 'debauched', label: 'Drunk & Debauched', desc: 'Pot-valiant ale-knight' },
    { id: 'treacherous', label: 'Treacherous & Sneaky', desc: 'Viper-tongued jackanapes' },
    { id: 'brainless', label: 'Gullible & Brainless', desc: 'Beef-witted mooncalf' },
    { id: 'sour', label: 'Sour & Foul-Tempered', desc: 'Vinegar-faced curmudgeon' },
    { id: 'miserly', label: 'Penny-Pinching Miser', desc: 'Griping nip-cheese skinflint' },
  ];

  const eras: { id: Era; label: string; period: string }[] = [
    { id: 'elizabethan', label: 'Elizabethan', period: '1590s · Shakespeare' },
    { id: 'jacobean', label: 'Restoration', period: '1660s · Wit & Cynicism' },
    { id: 'georgian', label: 'Georgian / Regency', period: '1810s · Beau Brummell' },
    { id: 'victorian', label: 'Victorian', period: '1880s · Icy Club Disdain' },
    { id: 'medieval', label: 'Medieval', period: '1380s · Chaucerian Earth' },
  ];

  const venoms: { id: VenomLevel; label: string }[] = [
    { id: 'gentle', label: 'Gentle Ribbing' },
    { id: 'courtly', label: 'Courtly Slander' },
    { id: 'scathing', label: 'Scathing Tavern Brawl' },
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
              <span>Trait Calibrator</span>
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Tune your target’s vices to assemble a tailor-made period calumny.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onRandomize}
              className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md transition-colors flex items-center gap-1.5"
            >
              <Dice5 className="w-3.5 h-3.5" />
              <span>Roll Dice</span>
            </button>
          </div>
        </div>

        {/* Archetype Quick Buttons */}
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
          <span className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-sans block mb-2">
            Historical Offender Archetypes
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
            Degree of Laziness & Sloth
          </label>
          <span className="text-xs font-medium text-amber-900 dark:text-amber-400">
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
        <div className="flex justify-between text-[11px] text-stone-400 dark:text-stone-500 pt-0.5">
          <span>Mild Dawdler</span>
          <span>Lethargic Drone</span>
          <span>Bed-Presser</span>
          <span>Total Fopdoodle</span>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 italic">
          {lazinessDescriptions[settings.lazinessLevel - 1].sub}
        </p>
      </div>

      {/* Trait 2: Nonsense & Bluster */}
      <div className="space-y-2">
        <div className="flex justify-between items-baseline">
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300">
            Volume of Nonsense & Hot Air
          </label>
          <span className="text-xs font-medium text-amber-900 dark:text-amber-400">
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
        <div className="flex justify-between text-[11px] text-stone-400 dark:text-stone-500 pt-0.5">
          <span>Prattler</span>
          <span>Moonshine</span>
          <span>Windbag</span>
          <span>Geyser of Tripe</span>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 italic">
          {nonsenseDescriptions[settings.nonsenseLevel - 1].sub}
        </p>
      </div>

      {/* Trait 3: Overall Vibe */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block">
          Primary Demeanor & Vibe
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
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
                <div className="font-medium">{vibe.label}</div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5 truncate">
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
          Historical Era & Dialect
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
                <div>{era.label}</div>
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
            Severity & Venom
          </label>
          <div className="flex rounded-md border border-stone-200 dark:border-stone-800 p-0.5 bg-stone-100 dark:bg-stone-800/60">
            {venoms.map(v => (
              <button
                key={v.id}
                onClick={() => setSettings(prev => ({ ...prev, venom: v.id }))}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  settings.venom === v.id
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-1.5">
            Offender’s Title / Name
          </label>
          <input
            type="text"
            placeholder="e.g., Sir Reginald, Colleague, Landlord"
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
          <span>Assemble & Forge Insult</span>
        </button>
      </div>
    </div>
  );
};
