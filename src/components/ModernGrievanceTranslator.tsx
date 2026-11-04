import React, { useState } from 'react';
import { Scroll, Sparkles, Wand2, Volume2, Copy, Check } from 'lucide-react';
import { reciteTheatricalBurn, soundEffects } from '../utils/audioSpeech';

const PRESET_GRIEVANCES = [
  'Someone scheduled an hour-long meeting that could have been an email.',
  'A housemate stole my leftover roast dinner clearly labeled with my name.',
  'An acquaintance left me on read for three days, then replied with only an emoji.',
  'Someone cut into the queue at the bakery and pretended not to see everyone waiting.',
  'A coworker nodded through the whole project and did zero work before the deadline.'
];

export const ModernGrievanceTranslator: React.FC = () => {
  const [inputGrievance, setInputGrievance] = useState(PRESET_GRIEVANCES[0]);
  const [selectedEra, setSelectedEra] = useState<'elizabethan' | 'victorian' | 'georgian'>('elizabethan');
  const [translatedDecree, setTranslatedDecree] = useState<string | null>(null);
  const [modernSummary, setModernSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputGrievance.trim()) return;

    soundEffects.playParchmentRustle();
    setIsLoading(true);

    try {
      // Call server route
      const response = await fetch('/api/generate-ai-burn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grievance: inputGrievance,
          era: selectedEra
        })
      });

      if (response.ok) {
        const data = await response.json();
        setTranslatedDecree(data.burn);
        setModernSummary(data.context || 'Transmuted into formal period condemnation.');
      } else {
        throw new Error('Fallback to local engine');
      }
    } catch {
      // High-quality deterministic / algorithmic fallback
      generateLocalTranslation(inputGrievance, selectedEra);
    } finally {
      setIsLoading(false);
    }
  };

  const generateLocalTranslation = (grievance: string, era: 'elizabethan' | 'victorian' | 'georgian') => {
    let decree = '';
    let summary = '';

    if (grievance.toLowerCase().includes('meeting') || grievance.toLowerCase().includes('email')) {
      if (era === 'victorian') {
        decree = 'Sir, your insistence upon convening thirty gentlemen in parlor conclave merely to announce what a five-farthing penny-post could have conveyed brands you as a pompous, wind-broken nuisance of the first magnitude. I bid you good day, and pray your inkwell dries to dust!';
        summary = 'Indictment against pointlessly wasting an hour of collective human labor.';
      } else {
        decree = 'Hear me, thou rattle-pated, time-wasting blatherskite! Thou hast summoned an entire guild to listen to thine empty mouth-noises, when two strokes of a quill upon parchment would have served! Out of my sight, thou dronish cumber-ground!';
        summary = 'Shakespearean castigation for administrative bloviation.';
      }
    } else if (grievance.toLowerCase().includes('leftover') || grievance.toLowerCase().includes('dinner') || grievance.toLowerCase().includes('food')) {
      decree = 'Avaunt, thou greasy-palmed, trencherman-drone! Thou hast devoured victuals clearly inscribed with another gentleman’s seal, like a starved hound prowling the kitchen gutters! May thy belly rumble with sour bile and thy teeth turn to chalk!';
      summary = 'A warrant condemning petty culinary thievery and shameless gluttony.';
    } else if (grievance.toLowerCase().includes('read') || grievance.toLowerCase().includes('reply') || grievance.toLowerCase().includes('message')) {
      decree = 'Upon my honour, sir, to receive my earnest dispatch and maintain three solar cycles of stony silence, only to offer the grin of a painted fool, marks you as a hollow-headed, ill-bred dandiprat unworthy of honest correspondence!';
      summary = 'Denunciation of insolent disregard and modern ghosting.';
    } else {
      decree = `Hark, base varlet! Concerning thy contemptible deed of "${grievance}": thou hast proved thyself a beef-witted, bed-pressing fopdoodle whose conduct stinks in the nostrils of all honest company! May fleas feast upon thy petticoats!`;
      summary = 'Custom court indictment of base modern conduct.';
    }

    setTranslatedDecree(decree);
    setModernSummary(summary);
  };

  const handleCopy = () => {
    if (!translatedDecree) return;
    soundEffects.playParchmentRustle();
    navigator.clipboard.writeText(`📜 Historical Indictment of Grievance 📜\n\nOriginal modern offense: "${inputGrievance}"\n\nPeriod Condemnation:\n"${translatedDecree}"\n\n— Transcribed via The Grand Lexicon of Calumny`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-2 shadow-sm">
        <h2 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Scroll className="w-5 h-5 text-amber-800 dark:text-amber-400" />
          <span>Modern Grievance Transmuter</span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          Feed a petty 21st-century grievance into the machine—from pointless corporate calendar invites to pilfered oat milk—and receive a devastating, court-certified 17th-century indictment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Input Form */}
        <div className="md:col-span-6 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-5 shadow-sm">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-2">
              Your 21st-Century Annoyance
            </label>
            <textarea
              rows={4}
              value={inputGrievance}
              onChange={e => setInputGrievance(e.target.value)}
              placeholder="e.g. My friend said they were '5 minutes away' when they hadn't even left their house..."
              className="w-full text-sm p-3 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800 resize-none"
            />
          </div>

          <div>
            <span className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 font-sans block mb-1.5">
              Or Try A Classical Modern Scourge:
            </span>
            <div className="space-y-1.5">
              {PRESET_GRIEVANCES.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputGrievance(preset)}
                  className="w-full text-left text-xs p-2 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-amber-950/40 hover:text-amber-900 dark:hover:text-amber-300 transition-colors truncate block border border-transparent hover:border-amber-200"
                >
                  &ldquo;{preset}&rdquo;
                </button>
              ))}
            </div>
          </div>

          {/* Era choice */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 block mb-2">
              Indictment Style & Period
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['elizabethan', 'georgian', 'victorian'] as const).map(era => (
                <button
                  key={era}
                  onClick={() => setSelectedEra(era)}
                  className={`py-2 px-3 text-xs font-medium rounded-md border capitalize transition-colors ${
                    selectedEra === era
                      ? 'border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-950 dark:text-amber-200 font-bold'
                      : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  {era}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleTranslate}
            disabled={isLoading || !inputGrievance.trim()}
            className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 dark:bg-amber-900 text-amber-50 font-cinzel font-bold text-xs uppercase tracking-wider rounded-md shadow transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span>{isLoading ? 'Consulting the Royal Scribe...' : 'Inscribe Historical Decree'}</span>
          </button>
        </div>

        {/* Translation Output Parchment */}
        <div className="md:col-span-6 flex flex-col">
          <div className="flex-1 bg-[#faf6ee] dark:bg-[#1a1715] border border-amber-900/25 dark:border-stone-700 rounded-lg p-6 sm:p-7 flex flex-col justify-between shadow-sm space-y-6">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-amber-900/15 dark:border-stone-800">
                <span className="font-cinzel text-xs uppercase tracking-widest text-amber-900 dark:text-amber-400 font-bold">
                  Official Bill of Indictment
                </span>
                <span className="text-[11px] text-stone-500 capitalize">
                  {selectedEra} Court
                </span>
              </div>

              {translatedDecree ? (
                <div className="mt-5 space-y-4">
                  <blockquote className="font-editorial text-xl sm:text-2xl text-stone-900 dark:text-stone-100 italic leading-relaxed">
                    &ldquo;{translatedDecree}&rdquo;
                  </blockquote>

                  {modernSummary && (
                    <div className="p-3 bg-stone-100 dark:bg-stone-900/70 border border-stone-200 dark:border-stone-800 rounded-md text-xs text-stone-600 dark:text-stone-300">
                      <strong>The Jurist’s Note:</strong> {modernSummary}
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-16 text-center text-stone-400 dark:text-stone-500 space-y-2">
                  <Scroll className="w-8 h-8 mx-auto opacity-40" />
                  <p className="font-editorial italic text-lg">
                    Inscribe a grievance upon the left and call upon the scribe.
                  </p>
                </div>
              )}
            </div>

            {translatedDecree && (
              <div className="pt-4 border-t border-amber-900/15 dark:border-stone-800 flex items-center justify-end gap-2">
                <button
                  onClick={() => reciteTheatricalBurn(translatedDecree, selectedEra)}
                  className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-amber-100/60 dark:hover:bg-stone-800 rounded-md transition-colors flex items-center gap-1.5"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Proclaim Aloud</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 text-xs font-medium bg-stone-900 text-amber-50 dark:bg-amber-900 rounded-md hover:bg-stone-800 transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Indictment'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
