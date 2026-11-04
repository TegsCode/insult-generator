import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, Bookmark, BookmarkCheck, Info, ChevronDown, ChevronUp, Printer } from 'lucide-react';
import { GeneratedInsult, InsultPart } from '../types/insult';
import { reciteTheatricalBurn, stopTheatricalBurn, soundEffects } from '../utils/audioSpeech';
import { ShareReceiptModal } from './ShareReceiptModal';

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
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handlePrint = () => {
    soundEffects.playParchmentRustle();
    window.print();
  };

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
    const copyText = `📜 Historical English Insult 📜\n\n"${insult.fullText}"\n\n${insult.modernTranslation}\n\n🏛️ Style: ${insult.era.toUpperCase()} · ${insult.historicalContext}`;
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const eraLabels: Record<string, string> = {
    elizabethan: 'Shakespearean (1590s)',
    jacobean: 'Restoration (1660s)',
    georgian: 'Georgian / Regency (1810s)',
    victorian: 'Victorian (1880s)',
    medieval: 'Medieval (1380s)'
  };

  const severityLabels: Record<string, string> = {
    gentle: 'Playful Teasing',
    courtly: 'Classy Burn',
    scathing: 'Savage Takedown'
  };

  const vibeLabels: Record<string, string> = {
    pompous: 'Arrogant & Pretentious',
    debauched: 'Rowdy Drunk',
    treacherous: 'Two-Faced & Sneaky',
    brainless: 'Clueless & Dimwitted',
    sour: 'Bitter & Sour-Tempered',
    miserly: 'Stingy Cheapskate'
  };

  // Pre-populated Tweet URL for X / Twitter
  const tweetText = encodeURIComponent(
    `📜 An authentic historical English roast:\n\n"${insult.fullText}"\n\n(${insult.modernTranslation})\n\n#HistoricalInsult #OldSchoolBurn`
  );
  const shareOnXUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

  return (
    <article className="relative bg-[#faf6ee] dark:bg-[#1c1815] border border-amber-900/30 dark:border-stone-700 shadow-md rounded-lg overflow-hidden transition-all duration-300 print-certificate-card">
      {/* Decorative antiqued header ribbon */}
      <div className="border-b border-amber-900/15 dark:border-stone-800 px-6 py-4 flex flex-wrap items-center justify-between gap-3 bg-amber-50/50 dark:bg-stone-900/40">
        <div className="flex items-center gap-3">
          <img
            src="/src/assets/images/wax_seal_emblem_1793805553644.jpg"
            alt="Royal Wax Seal"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full shadow-inner object-cover border border-amber-900/30"
          />
          <div>
            <h2 className="font-cinzel text-xs uppercase tracking-widest text-amber-900 dark:text-amber-400 font-bold">
              Historical Roast Certificate
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span>{eraLabels[insult.era] || insult.era}</span>
              <span aria-hidden="true">·</span>
              <span>{vibeLabels[insult.vibe] || insult.vibe}</span>
              <span aria-hidden="true">·</span>
              <span>{severityLabels[insult.venom] || insult.venom}</span>
            </div>
          </div>
        </div>

        {/* Action Controls - Hidden during print */}
        <div className="flex items-center gap-1.5 flex-wrap no-print">
          <button
            onClick={handleAudio}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              isPlayingAudio
                ? 'bg-amber-800 text-white dark:bg-amber-700'
                : 'text-stone-700 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800'
            }`}
            title="Listen to this insult read aloud with an authentic British period accent"
          >
            {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span>{isPlayingAudio ? 'Stop Voice' : 'Read Aloud'}</span>
          </button>

          {/* Share on X / Twitter with Receipt Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100 bg-amber-100/70 hover:bg-amber-200/80 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 rounded-md transition-colors flex items-center gap-1.5 border border-amber-800/30 dark:border-amber-700/50 shadow-xs"
            title="Generate and share this insult with a custom visual Roast Receipt on X (Twitter)"
          >
            <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>Share on X (Receipt)</span>
          </button>

          {/* Print Certificate Button */}
          <button
            onClick={handlePrint}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5 border border-stone-300 dark:border-stone-700 hover:text-stone-950 dark:hover:text-white"
            title="Print Certificate formatted as a historical legal document"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Certificate</span>
          </button>

          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5"
            title="Copy insult to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>

          <button
            onClick={() => onToggleSave(insult)}
            className={`p-1.5 rounded-md transition-colors ${
              isSaved
                ? 'text-amber-800 dark:text-amber-400 bg-amber-100/60 dark:bg-stone-800'
                : 'text-stone-500 dark:text-stone-400 hover:bg-amber-100/60 dark:hover:bg-stone-800'
            }`}
            title={isSaved ? 'Saved in Grimoire' : 'Bookmark this Burn'}
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Parchment Reading Body */}
      <div className="p-6 sm:p-8 space-y-6">
        {/* Recipient lead */}
        <div className="text-xs uppercase tracking-widest text-stone-500 dark:text-stone-400 font-sans">
          To: <span className="font-semibold text-stone-800 dark:text-stone-200">{insult.target || 'The Offender'}</span>
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
                  title={hasDetail ? `Click to see modern meaning of "${part.text}"` : undefined}
                >
                  {part.text}
                </span>
              );
            })}
          </blockquote>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2 italic no-print">
            Tip: Click any underlined archaic word above to inspect its real historical origin and modern translation.
          </p>

          {/* Interactive Term Inspector Popover */}
          {activePart && (
            <div className="mt-4 p-4 rounded-md border border-amber-900/20 dark:border-stone-700 bg-white/95 dark:bg-stone-900/95 shadow-sm text-sm transition-all animate-in fade-in slide-in-from-top-1 duration-200 no-print">
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
                    <strong>Historical Definition:</strong> {activePart.definition}
                  </p>
                  {activePart.modernEquivalent && (
                    <p className="mt-1.5 text-xs text-stone-600 dark:text-stone-300 font-sans">
                      <strong>Modern English Meaning:</strong> &ldquo;{activePart.modernEquivalent}&rdquo;
                    </p>
                  )}
                </div>
                <button
                  onClick={() => setActivePart(null)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-xs px-2 py-1 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modern Translation & Context */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2">
          <div className="bg-stone-100/90 dark:bg-stone-900/70 p-3.5 rounded-md border border-stone-200 dark:border-stone-800">
            <span className="text-[11px] uppercase tracking-wider text-amber-900 dark:text-amber-400 font-bold block mb-1">
              Plain English Translation:
            </span>
            <p className="text-sm font-sans text-stone-800 dark:text-stone-200">
              {insult.modernTranslation.replace(/^Modern Translation:\s*/, '')}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span>Historical Grounding:</span>
            <span>{insult.historicalContext}</span>
          </div>
        </div>

        {/* Anatomical Word Breakdown Accordion - Hidden during print */}
        <div className="pt-2 no-print">
          <button
            onClick={() => setShowAnatomy(!showAnatomy)}
            className="flex items-center justify-between w-full text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 hover:text-amber-900 dark:hover:text-amber-300 py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>How This Insult Was Built (Grammar & Anatomy)</span>
            </span>
            {showAnatomy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAnatomy && (
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {insult.parts
                .filter(p => p.type !== 'dismissal' && p.type !== 'salutation')
                .map((part, idx) => {
                  const partLabels: Record<string, string> = {
                    compound_adjective: 'Trait Adjective',
                    historical_descriptor: 'Vibe Descriptor',
                    master_slur: 'Core Historical Slur'
                  };
                  return (
                    <div
                      key={idx}
                      className="p-3 bg-white/70 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-md"
                    >
                      <div className="text-[11px] uppercase tracking-wider text-amber-800 dark:text-amber-400 font-sans font-semibold">
                        {partLabels[part.type] || part.type.replace('_', ' ')}
                      </div>
                      <div className="font-editorial text-lg font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                        {part.text}
                      </div>
                      {part.modernEquivalent && (
                        <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                          Means: &ldquo;{part.modernEquivalent}&rdquo;
                        </p>
                      )}
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        {/* Official Print-Only Certificate Seals, Docket & Signature */}
        <div className="hidden print:block pt-8 mt-6 border-t-2 border-stone-800 text-stone-800 font-sans">
          <div className="flex items-end justify-between gap-6">
            <div className="space-y-1">
              <div className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-900">
                Official Warrant of Recorded Calumny
              </div>
              <div className="font-mono text-[10px] text-stone-600">
                DOCKET NO: CAL-{insult.id.slice(-8).toUpperCase()} · JURISDICTION: {insult.era.toUpperCase()}
              </div>
              <div className="text-[10px] italic text-stone-600">
                Inscribed and witnessed under the High Authority of The Grand Lexicon of Calumny (1380–1880)
              </div>
            </div>

            <div className="text-right space-y-1">
              <div className="w-56 border-b border-stone-800 inline-block mb-1"></div>
              <div className="font-cinzel text-[10px] uppercase tracking-widest text-stone-700 font-bold">
                Royal Scribe & Jurist Signature
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Roast Receipt Sharing Modal */}
      <ShareReceiptModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        insult={insult}
      />
    </article>
  );
};
