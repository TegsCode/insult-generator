import React from 'react';
import {
  Check,
  Dice5,
  Feather,
  Flame,
  Sparkles,
  SlidersHorizontal,
  UserRound,
} from 'lucide-react';
import type { Era, TraitSettings, VenomLevel, Vibe } from '../types/insult';
import { ARCHETYPE_PRESETS, type PresetArchetype } from '../utils/insultEngine';
import { soundEffects } from '../utils/audioSpeech';

interface TraitAssemblerProps {
  settings: TraitSettings;
  setSettings: React.Dispatch<React.SetStateAction<TraitSettings>>;
  onGenerate: () => void;
  onSelectArchetype: (archetype: PresetArchetype) => void;
  onRandomize: () => void;
}

const lazinessDescriptions = [
  { label: 'Mild procrastinator', short: 'A little slow to start', detail: 'Often puts things off, but can be persuaded to get moving.' },
  { label: 'Dedicated lounger', short: 'Work-shy by nature', detail: 'Avoids exertion whenever a comfortable seat is near.' },
  { label: 'Bed-pressing sluggard', short: 'The bed has a firm hold', detail: 'Would sooner greet noon from beneath the covers.' },
  { label: 'Champion idler', short: 'Industrious at avoiding work', detail: 'Has made a fine art of leaving every task to someone else.' },
];

const nonsenseDescriptions = [
  { label: 'Occasional chatterbox', short: 'A little too fond of a tale', detail: 'Fills a quiet moment with a few unnecessary words.' },
  { label: 'Confidently incorrect', short: 'Certain, if not quite right', detail: 'Repeats dubious notions with admirable conviction.' },
  { label: 'A full-grown windbag', short: 'Long on words, short on point', detail: 'Can turn a simple thought into a tiresome speech.' },
  { label: 'A fountain of balderdash', short: 'Nonsense without end', detail: 'Pours out such wild claims that reason begs leave to depart.' },
];

const vibes: { id: Vibe; label: string; desc: string; mark: string }[] = [
  { id: 'pompous', label: 'Pompous', desc: 'A grand opinion of themself', mark: '♛' },
  { id: 'debauched', label: 'Debauched', desc: 'A rowdy tavern regular', mark: '♨' },
  { id: 'treacherous', label: 'Treacherous', desc: 'Smiles, then schemes', mark: '♟' },
  { id: 'brainless', label: 'Beef-witted', desc: 'Not overburdened by thought', mark: '◈' },
  { id: 'sour', label: 'Ill-tempered', desc: 'A cloud in human form', mark: '☁' },
  { id: 'miserly', label: 'Miserly', desc: 'Guards every last farthing', mark: '¢' },
];

const eras: { id: Era; label: string; period: string; mood: string }[] = [
  { id: 'elizabethan', label: 'Elizabethan', period: '1590s', mood: 'Theatrical & lyrical' },
  { id: 'jacobean', label: 'Jacobean', period: '1660s', mood: 'Cynical & cutting' },
  { id: 'georgian', label: 'Georgian', period: '1810s', mood: 'Polished & pointed' },
  { id: 'victorian', label: 'Victorian', period: '1880s', mood: 'Coolly disapproving' },
  { id: 'medieval', label: 'Medieval', period: '1380s', mood: 'Rough & earthy' },
];

const venoms: { id: VenomLevel; label: string; detail: string }[] = [
  { id: 'gentle', label: 'Gentle', detail: 'A friendly nudge' },
  { id: 'courtly', label: 'Courtly', detail: 'Wit with good manners' },
  { id: 'scathing', label: 'Scathing', detail: 'A sharper retort' },
];

const SectionHeading: React.FC<{ number: string; title: string; note?: string }> = ({ number, title, note }) => (
  <div className="mb-4 flex items-start gap-3">
    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-amber-900/15 bg-amber-100/70 font-cinzel text-xs font-bold text-amber-950 dark:border-amber-200/10 dark:bg-amber-950/50 dark:text-amber-200">
      {number}
    </span>
    <div>
      <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100">{title}</h4>
      {note && <p className="mt-0.5 text-xs leading-relaxed text-stone-500 dark:text-stone-400">{note}</p>}
    </div>
  </div>
);

export const TraitAssembler: React.FC<TraitAssemblerProps> = ({
  settings,
  setSettings,
  onGenerate,
  onSelectArchetype,
  onRandomize,
}) => {
  const laziness = lazinessDescriptions[settings.lazinessLevel - 1] ?? lazinessDescriptions[2];
  const nonsense = nonsenseDescriptions[settings.nonsenseLevel - 1] ?? nonsenseDescriptions[2];

  const updateSetting = <K extends keyof TraitSettings>(key: K, value: TraitSettings[K]) => {
    soundEffects.playParchmentRustle();
    setSettings(previous => ({ ...previous, [key]: value }));
  };

  const updateLevel = (key: 'lazinessLevel' | 'nonsenseLevel', value: number) => {
    soundEffects.playParchmentRustle();
    setSettings(previous => ({ ...previous, [key]: value }));
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-[0_12px_40px_-28px_rgba(41,37,36,0.35)] dark:border-stone-800 dark:bg-stone-900/80">
      <div className="border-b border-stone-200/80 bg-gradient-to-br from-amber-50/80 via-white to-white px-5 py-5 dark:border-stone-800 dark:from-amber-950/20 dark:via-stone-900 dark:to-stone-900 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-900 text-amber-50 shadow-sm dark:bg-amber-700">
              <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-800 dark:text-amber-400">The insult forge</p>
              <h3 className="mt-1 font-cinzel text-lg font-bold text-stone-950 dark:text-stone-100">Build your character</h3>
              <p className="mt-1 max-w-md text-xs leading-relaxed text-stone-600 dark:text-stone-400">Choose their foibles; the scribe will find the words.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onRandomize}
            className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-semibold text-stone-700 transition hover:border-amber-700/40 hover:bg-amber-50 hover:text-amber-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-amber-200"
          >
            <Dice5 className="h-4 w-4" aria-hidden="true" />
            <span>Surprise me</span>
          </button>
        </div>

        <div className="mt-5 border-t border-amber-900/10 pt-4 dark:border-stone-700/80">
          <div className="mb-2 flex items-center justify-between gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500 dark:text-stone-400">Begin with an archetype</span>
            <span className="text-[10px] text-stone-400 dark:text-stone-500">Quick presets</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {ARCHETYPE_PRESETS.map(archetype => (
              <button
                key={archetype.id}
                type="button"
                onClick={() => onSelectArchetype(archetype)}
                title={archetype.description}
                className="shrink-0 rounded-lg border border-stone-200 bg-white px-3 py-2 text-left transition hover:border-amber-700/50 hover:bg-amber-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800"
              >
                <span className="block text-xs font-semibold text-stone-800 dark:text-stone-200">{archetype.name}</span>
                <span className="mt-0.5 block max-w-40 truncate text-[10px] text-stone-500 dark:text-stone-400">{archetype.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6 p-5 sm:p-6">
        <section aria-labelledby="trait-laziness-heading">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <SectionHeading number="01" title="Their work ethic" note="How readily do they flee from honest effort?" />
            </div>
            <span className="mb-4 shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-200">{laziness.label}</span>
          </div>
          <label className="sr-only" htmlFor="laziness-level">Laziness level: {laziness.label}</label>
          <input
            id="laziness-level"
            type="range"
            min="1"
            max="4"
            step="1"
            value={settings.lazinessLevel}
            aria-valuetext={laziness.label}
            onChange={event => updateLevel('lazinessLevel', Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-amber-800 dark:bg-stone-700"
          />
          <div className="mt-2 grid grid-cols-4 text-[10px] text-stone-500 dark:text-stone-400">
            {['Dawdler', 'Lounger', 'Bed-presser', 'Idler'].map((label, index) => (
              <span key={label} className={index === 0 ? 'text-left' : index === 3 ? 'text-right' : 'text-center'}>{label}</span>
            ))}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">{laziness.detail}</p>
        </section>

        <div className="border-t border-stone-200 dark:border-stone-800" />

        <section aria-labelledby="trait-nonsense-heading">
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <SectionHeading number="02" title="Their gift of the gab" note="How much hot air accompanies their opinions?" />
            </div>
            <span className="mb-4 shrink-0 rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-200">{nonsense.label}</span>
          </div>
          <label className="sr-only" htmlFor="nonsense-level">Nonsense level: {nonsense.label}</label>
          <input
            id="nonsense-level"
            type="range"
            min="1"
            max="4"
            step="1"
            value={settings.nonsenseLevel}
            aria-valuetext={nonsense.label}
            onChange={event => updateLevel('nonsenseLevel', Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-200 accent-amber-800 dark:bg-stone-700"
          />
          <div className="mt-2 grid grid-cols-4 text-[10px] text-stone-500 dark:text-stone-400">
            {['Chatterbox', 'Wrong', 'Windbag', 'Balderdash'].map((label, index) => (
              <span key={label} className={index === 0 ? 'text-left' : index === 3 ? 'text-right' : 'text-center'}>{label}</span>
            ))}
          </div>
          <p className="mt-2 text-xs leading-relaxed text-stone-500 dark:text-stone-400">{nonsense.detail}</p>
        </section>

        <div className="border-t border-stone-200 dark:border-stone-800" />

        <section>
          <SectionHeading number="03" title="Their particular disposition" note="Choose the flavor of their mischief." />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {vibes.map(vibe => {
              const selected = settings.vibe === vibe.id;
              return (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => updateSetting('vibe', vibe.id)}
                  aria-pressed={selected}
                  className={`group relative min-h-[76px] rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 ${selected
                    ? 'border-amber-800 bg-amber-50 shadow-sm ring-1 ring-amber-800/10 dark:border-amber-500 dark:bg-amber-950/30'
                    : 'border-stone-200 bg-white hover:border-amber-700/40 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800'
                  }`}
                >
                  {selected && <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-amber-800 dark:text-amber-300" aria-hidden="true" />}
                  <span className={`mb-1 block font-cinzel text-lg leading-none ${selected ? 'text-amber-900 dark:text-amber-300' : 'text-stone-500 dark:text-stone-400'}`} aria-hidden="true">{vibe.mark}</span>
                  <span className="block text-xs font-bold text-stone-900 dark:text-stone-100">{vibe.label}</span>
                  <span className="mt-0.5 block text-[10px] leading-snug text-stone-500 dark:text-stone-400">{vibe.desc}</span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="border-t border-stone-200 dark:border-stone-800" />

        <section>
          <SectionHeading number="04" title="Set the scene" note="A different century, a different sort of sting." />
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {eras.map(era => {
              const selected = settings.era === era.id;
              return (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => updateSetting('era', era.id)}
                  aria-pressed={selected}
                  className={`relative rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 ${selected
                    ? 'border-amber-800 bg-amber-50 dark:border-amber-500 dark:bg-amber-950/30'
                    : 'border-stone-200 bg-white hover:border-amber-700/40 hover:bg-stone-50 dark:border-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800'
                  }`}
                >
                  {selected && <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-amber-800 dark:text-amber-300" aria-hidden="true" />}
                  <span className="block text-xs font-bold text-stone-900 dark:text-stone-100">{era.label}</span>
                  <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">{era.period}</span>
                  <span className="mt-1 block text-[10px] text-stone-500 dark:text-stone-400">{era.mood}</span>
                </button>
              );
            })}
          </div>
        </section>

        <div className="border-t border-stone-200 dark:border-stone-800" />

        <section className="grid gap-5 sm:grid-cols-2">
          <div>
            <SectionHeading number="05" title="Choose the bite" note="How sharp should the retort be?" />
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-stone-100 p-1 dark:bg-stone-800/80" role="group" aria-label="Insult intensity">
              {venoms.map((venom, index) => {
                const selected = settings.venom === venom.id;
                return (
                  <button
                    key={venom.id}
                    type="button"
                    onClick={() => updateSetting('venom', venom.id)}
                    aria-pressed={selected}
                    title={venom.detail}
                    className={`rounded-lg px-2 py-2 text-center text-[11px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 ${selected
                      ? 'bg-white text-amber-950 shadow-sm dark:bg-stone-700 dark:text-amber-100'
                      : 'text-stone-600 hover:text-stone-950 dark:text-stone-400 dark:hover:text-stone-100'
                    }`}
                  >
                    <span className="mb-1 flex justify-center" aria-hidden="true">
                      {index === 0 ? <Sparkles className="h-3.5 w-3.5" /> : index === 1 ? <Feather className="h-3.5 w-3.5" /> : <Flame className="h-3.5 w-3.5" />}
                    </span>
                    {venom.label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-[10px] text-stone-500 dark:text-stone-400">{venoms.find(venom => venom.id === settings.venom)?.detail}</p>
          </div>

          <div>
            <label htmlFor="target-name" className="mb-3 flex items-start gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-amber-900/15 bg-amber-100/70 font-cinzel text-xs font-bold text-amber-950 dark:border-amber-200/10 dark:bg-amber-950/50 dark:text-amber-200">06</span>
              <span>
                <span className="block text-sm font-bold text-stone-900 dark:text-stone-100">Name the miscreant</span>
                <span className="mt-0.5 block text-xs text-stone-500 dark:text-stone-400">Optional; a title will do.</span>
              </span>
            </label>
            <div className="relative">
              <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden="true" />
              <input
                id="target-name"
                type="text"
                maxLength={60}
                placeholder="e.g. Sir Braggart"
                value={settings.targetName}
                onChange={event => setSettings(previous => ({ ...previous, targetName: event.target.value }))}
                className="h-10 w-full rounded-lg border border-stone-300 bg-white pl-9 pr-3 text-xs text-stone-900 placeholder:text-stone-400 focus:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-700/15 dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:placeholder:text-stone-500"
              />
            </div>
          </div>
        </section>

        <button
          type="button"
          onClick={onGenerate}
          className="group flex w-full items-center justify-center gap-2.5 rounded-xl bg-stone-950 px-5 py-3.5 font-cinzel text-sm font-bold tracking-wide text-amber-50 shadow-md shadow-stone-900/10 transition hover:-translate-y-0.5 hover:bg-amber-900 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:ring-offset-2 dark:bg-amber-700 dark:text-white dark:hover:bg-amber-600"
        >
          <Sparkles className="h-4 w-4 text-amber-300 transition-transform group-hover:rotate-12" aria-hidden="true" />
          Forge the insult
        </button>
      </div>
    </section>
  );
};
