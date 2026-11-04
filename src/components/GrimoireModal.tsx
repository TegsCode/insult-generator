import React, { useState } from 'react';
import { X, Trash2, Copy, Volume2, Printer, BookOpen, Check } from 'lucide-react';
import { GeneratedInsult } from '../types/insult';
import { reciteTheatricalBurn, soundEffects } from '../utils/audioSpeech';
import { ShareReceiptModal } from './ShareReceiptModal';

interface GrimoireModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedInsults: GeneratedInsult[];
  onRemoveInsult: (id: string) => void;
  onClearAll: () => void;
}

export const GrimoireModal: React.FC<GrimoireModalProps> = ({
  isOpen,
  onClose,
  savedInsults,
  onRemoveInsult,
  onClearAll,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [receiptInsultForShare, setReceiptInsultForShare] = useState<GeneratedInsult | null>(null);

  if (!isOpen) return null;

  const handleCopySingle = (insult: GeneratedInsult) => {
    soundEffects.playParchmentRustle();
    navigator.clipboard.writeText(`📜 Historical English Insult 📜\n\n"${insult.fullText}"\n\n${insult.modernTranslation}`);
    setCopiedId(insult.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#faf6ee] dark:bg-[#1a1715] border border-amber-900/30 dark:border-stone-700 rounded-lg max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header in modern English */}
        <div className="p-5 border-b border-amber-900/15 dark:border-stone-800 flex items-center justify-between bg-amber-50/60 dark:bg-stone-900/60">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-amber-900 dark:text-amber-400" />
            <div>
              <h3 className="font-cinzel text-base font-bold text-stone-900 dark:text-stone-100">
                Your Saved Historical Burns
              </h3>
              <div className="text-xs text-stone-500 dark:text-stone-400">
                {savedInsults.length} {savedInsults.length === 1 ? 'saved insult' : 'saved insults'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {savedInsults.length > 0 && (
              <>
                <button
                  onClick={handlePrint}
                  className="p-1.5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded hover:bg-amber-100/60 dark:hover:bg-stone-800 transition-colors"
                  title="Print all saved insults"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={onClearAll}
                  className="p-1.5 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-stone-800 rounded transition-colors"
                  title="Delete all saved insults"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded hover:bg-stone-200/50 dark:hover:bg-stone-800 transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {savedInsults.length === 0 ? (
            <div className="text-center py-12 text-stone-400 dark:text-stone-500 space-y-2">
              <BookOpen className="w-8 h-8 mx-auto opacity-30" />
              <p className="font-editorial italic text-lg">
                No saved insults yet.
              </p>
              <p className="text-xs">
                Click the bookmark icon on any insult card to save it here for quick access.
              </p>
            </div>
          ) : (
            savedInsults.map(insult => {
              const tweetText = encodeURIComponent(
                `📜 A historical English roast:\n\n"${insult.fullText}"\n\n(${insult.modernTranslation})\n\n#HistoricalInsult #OldSchoolBurn`
              );
              const shareOnXUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;

              return (
                <div
                  key={insult.id}
                  className="p-4 bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-md space-y-2 hover:border-amber-800/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-sans">
                      Target: {insult.target} · <span className="capitalize">{insult.era} Style</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => reciteTheatricalBurn(insult.fullText, insult.era)}
                        className="p-1 text-stone-500 hover:text-amber-800 dark:hover:text-amber-300 rounded"
                        title="Read aloud"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Share on X with Receipt */}
                      <button
                        onClick={() => setReceiptInsultForShare(insult)}
                        className="p-1 text-stone-500 hover:text-stone-900 dark:hover:text-stone-200 rounded"
                        title="Share on X with Roast Receipt"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleCopySingle(insult)}
                        className="p-1 text-stone-500 hover:text-stone-800 dark:hover:text-stone-200 rounded"
                        title="Copy text"
                      >
                        {copiedId === insult.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => onRemoveInsult(insult.id)}
                        className="p-1 text-stone-400 hover:text-rose-600 rounded"
                        title="Delete from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="font-editorial text-lg text-stone-900 dark:text-stone-100 italic leading-snug">
                    &ldquo;{insult.fullText}&rdquo;
                  </p>

                  <p className="text-xs text-stone-600 dark:text-stone-400">
                    {insult.modernTranslation}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-900/15 dark:border-stone-800 bg-amber-50/40 dark:bg-stone-900/40 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200/50 dark:hover:bg-stone-800 rounded transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {receiptInsultForShare && (
        <ShareReceiptModal
          isOpen={!!receiptInsultForShare}
          onClose={() => setReceiptInsultForShare(null)}
          insult={receiptInsultForShare}
        />
      )}
    </div>
  );
};
