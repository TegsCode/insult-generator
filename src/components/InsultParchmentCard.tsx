import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Bookmark, BookmarkCheck, Info, ChevronDown, ChevronUp, Share2 } from 'lucide-react';
import { GeneratedInsult, InsultPart } from '../types/insult';
import { reciteTheatricalBurn, stopTheatricalBurn, soundEffects } from '../utils/audioSpeech';

interface InsultParchmentCardProps {
  insult: GeneratedInsult;
  isSaved: boolean;
  onToggleSave: (insult: GeneratedInsult) => void;
}

export const InsultParchmentCard: React.FC<InsultParchmentCardProps> = ({
  insult,
  isSaved,
  onToggleSave,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activePart, setActivePart] = useState<InsultPart | null>(null);
  const [showAnatomy, setShowAnatomy] = useState(true);

  const handleAudio = () => {
    if (isPlayingAudio) {
      stopTheatricalBurn();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      reciteTheatricalBurn(
        insult.fullText,
        insult.era,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  const handleCopy = () => {
    soundEffects.playParchmentRustle();
    const copyText = `📜 A Historical Warrant of Calumny 📜\n\n"${insult.fullText}"\n\n${insult.modernTranslation}\n\n🏛️ Era: ${insult.era.toUpperCase()} · ${insult.historicalContext}`;
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const eraLabels: Record<string, string> = {
    elizabethan: 'Elizabethan (c. 1590s)',
    jacobean: 'Restoration & Jacobean (c. 1660s)',
    georgian: 'Georgian / Regency (c. 1810s)',
    victorian: 'Victorian (c. 1880s)',
    medieval: 'Medieval (c. 1380s)'
  };

  return (
    <article className="relative bg-[#faf6ee] dark:bg-[#1c1815] border border-amber-900/30 dark:border-stone-700 shadow-md rounded-lg overflow-hidden transition-all duration-300">
      {/* Decorative antiqued header ribbon */}
      <div className="border-b border-amber-900/15 dark:border-stone-800 px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-amber-50/50 dark:bg-stone-900/40">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/images/wax_seal_emblem_1793805553644.jpg"
            alt="Royal Wax Seal of Calumny"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full shadow-inner object-cover border border-amber-900/30"
          />
          <div>
            <h2 className="font-cinzel text-xs uppercase tracking-widest text-amber-900 dark:text-amber-400 font-bold">
              Warrant of Public Calumny
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span>{eraLabels[insult.era] || insult.era}</span>
              <span aria-hidden="true">·</span>
              <span className="capitalize">{insult.vibe} Disposition</span>
              <span aria-hidden="true">·</span>
              <span>Venom: {insult.venom}</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleAudio}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              isPlayingAudio
                ? 'bg-amber-800 text-white dark:bg-amber-700'
                : 'text-stone-700 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800'
            }`}
            title="Recite with Theatrical Period Accent"
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAudio ? 'Silencing...' : 'Recite Aloud'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5"
            title="Copy Parchment Text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Inscribed!' : 'Copy'}</span>
          </button>

          <button
            onClick={() => onToggleSave(insult)}
            className={`p-1.5 rounded-md transition-colors ${
              isSaved
                ? 'text-amber-800 dark:text-amber-400 bg-amber-100/60 dark:bg-stone-800'
                : 'text-stone-500 dark:text-stone-400 hover:bg-amber-100/60 dark:hover:bg-stone-800'
            }`}
            title={isSaved ? 'In Grimoire' : 'Save to Grimoire'}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Parchment Reading Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Recipient lead */}
        <div className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans">
          To: {insult.target || 'A Certain Disagreeable Personage'}
        </div>

        {/* Primary Burn with Interactive Words */}
        <div className="relative">
          <blockquote className="font-editorial text-2xl sm:text-3xl lg:text-4xl leading-relaxed sm:leading-loose text-stone-900 dark:text-stone-100 italic tracking-wide">
            {insult.parts.map((part, index) => {
              const hasDetail = part.definition || part.modernEquivalent;
              return (
                <span
                  key={index}
                  onClick={() => hasDetail && setActivePart(part === activePart ? null : part)}
                  className={`transition-all duration-150 inline-block mr-1.5 ${
                    hasDetail
                      ? 'cursor-pointer hover:text-amber-900 dark:hover:text-amber-300 underline decoration-amber-700/30 hover:decoration-amber-800 dark:decoration-amber-400/40 decoration-1 underline-offset-4'
                      : ''
                  } ${activePart === part ? 'bg-amber-200/50 dark:bg-amber-900/40 text-amber-950 dark:text-amber-200 rounded px-1' : ''}`}
                  title={hasDetail ? `Click to inspect: "${part.text}"` : undefined}
                >
                  {part.text}
                </span>
              );
            })}
          </blockquote>

          {/* Interactive Term Inspector Popover */}
          {activePart && (
            <div className="mt-4 p-4 rounded-md border border-amber-900/20 dark:border-stone-700 bg-white/90 dark:bg-stone-900/90 shadow-sm text-sm transition-all animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-cinzel font-bold text-amber-900 dark:text-amber-400 text-base">
                      {activePart.text}
                    </span>
                    {activePart.century && (
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {activePart.century}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-stone-700 dark:text-stone-300 leading-normal">
                    {activePart.definition}
                  </p>
                  {activePart.modernEquivalent && (
                    <p className="mt-1.5 text-xs text-stone-500 dark:text-stone-400 font-sans italic">
                      Modern parlance: &ldquo;{activePart.modernEquivalent}&rdquo;
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setActivePart(null)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs px-2 py-1 rounded"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modern Translation & Context */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
          <p className="text-sm font-sans text-stone-700 dark:text-stone-300 bg-stone-100/70 dark:bg-stone-900/50 p-3 rounded-md border border-stone-200 dark:border-stone-800/80">
            {insult.modernTranslation}
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span>Historical Grounding</span>
            <span aria-hidden="true">·</span>
            <span>{insult.historicalContext}</span>
          </div>
        </div>

        {/* Anatomical Word Breakdown Accordion */}
        <div className="pt-2">
          <button
            onClick={() => setShowAnatomy(!showAnatomy)}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-amber-900 dark:hover:text-amber-300 py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>Anatomy of this Slander</span>
            </span>
            {showAnatomy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAnatomy && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {insult.parts
                .filter(p => p.type !== 'dismissal' && p.type !== 'salutation')
                .map((part, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-md"
                  >
                    <div className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-sans">
                      {part.type.replace('_', ' ')}
                    </div>
                    <div className="font-editorial text-lg font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                      {part.text}
                    </div>
                    {part.definition && (
                      <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                        {part.definition}
                      </p>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
