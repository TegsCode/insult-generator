import React, { useState, useMemo } from 'react';
import { Search, Book, Volume2, ArrowRight } from 'lucide-react';
import { MASTER_LEXICON } from '../data/lexicon';
import { LexiconEntry } from '../types/insult';
import { reciteTheatricalBurn } from '../utils/audioSpeech';

interface CodexOfScoundrelsProps {
  onSelectTermForAssembler: (term: LexiconEntry) => void;
}

export const CodexOfScoundrels: React.FC<CodexOfScoundrelsProps> = ({
  onSelectTermForAssembler,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrait, setSelectedTrait] = useState<string>('all');
  const [selectedEra, setSelectedEra] = useState<string>('all');

  const filteredEntries = useMemo(() => {
    return MASTER_LEXICON.filter(entry => {
      const matchesSearch =
        entry.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.modernMeaning.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTrait = selectedTrait === 'all' || entry.primaryTrait === selectedTrait;
      const matchesEra = selectedEra === 'all' || entry.era === selectedEra;

      return matchesSearch && matchesTrait && matchesEra;
    });
  }, [searchQuery, selectedTrait, selectedEra]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-2 shadow-sm">
        <h2 className="font-cinzel text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <Book className="w-5 h-5 text-amber-800 dark:text-amber-400" />
          <span>The Codex of Scoundrels & Archival Slurs</span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          A scholarly compendium of verified English calumnies from 1380 to 1880, drawn from Shakespeare, Chaucer, Francis Grose’s 1811 Dictionary of the Vulgar Tongue, and Old Bailey broadsides.
        </p>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg p-4 space-y-3 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search archaic terms, modern meanings, or definitions (e.g. 'fopdoodle', 'lazy', 'gossip')..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-md text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-800"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1 border-t border-stone-100 dark:border-stone-800">
          {/* Trait Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-sans mr-1">
              Trait:
            </span>
            {['all', 'laziness', 'nonsense', 'vibe', 'intellect'].map(t => (
              <button
                key={t}
                onClick={() => setSelectedTrait(t)}
                className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                  selectedTrait === t
                    ? 'bg-stone-900 text-white dark:bg-amber-800 font-medium'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Era Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-sans mr-1">
              Era:
            </span>
            {['all', 'elizabethan', 'jacobean', 'georgian', 'victorian', 'medieval'].map(e => (
              <button
                key={e}
                onClick={() => setSelectedEra(e)}
                className={`px-2.5 py-1 rounded text-xs capitalize transition-colors ${
                  selectedEra === e
                    ? 'bg-stone-900 text-white dark:bg-amber-800 font-medium'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dictionary Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredEntries.map((entry, idx) => (
          <div
            key={idx}
            className="bg-[#faf6ee] dark:bg-[#191614] border border-amber-900/20 dark:border-stone-800 rounded-lg p-5 flex flex-col justify-between space-y-4 hover:border-amber-700/40 dark:hover:border-stone-700 transition-all shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-editorial text-2xl font-bold text-stone-900 dark:text-stone-100 tracking-wide">
                      {entry.term}
                    </h3>
                    {entry.phonetic && (
                      <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
                        /{entry.phonetic}/
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    <span className="italic">{entry.partOfSpeech}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{entry.era} ({entry.date})</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{entry.primaryTrait}</span>
                  </div>
                </div>

                <button
                  onClick={() => reciteTheatricalBurn(entry.term, entry.era)}
                  className="p-1.5 text-stone-500 hover:text-amber-900 dark:hover:text-amber-300 rounded hover:bg-amber-100/50 dark:hover:bg-stone-800 transition-colors"
                  title="Pronounce"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <p className="mt-3 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                {entry.definition}
              </p>

              <div className="mt-2 text-xs text-amber-900 dark:text-amber-400 italic">
                Modern sense: &ldquo;{entry.modernMeaning}&rdquo;
              </div>

              <blockquote className="mt-3 pl-3 border-l-2 border-amber-800/30 text-xs italic text-stone-600 dark:text-stone-400 font-editorial leading-snug">
                &ldquo;{entry.exampleQuote}&rdquo;
                <footer className="text-[10px] text-stone-400 dark:text-stone-500 not-italic font-sans mt-0.5">
                  — {entry.source}
                </footer>
              </blockquote>
            </div>

            <div className="pt-3 border-t border-amber-900/10 dark:border-stone-800 flex items-center justify-end">
              <button
                onClick={() => onSelectTermForAssembler(entry)}
                className="text-xs font-semibold text-amber-900 dark:text-amber-400 hover:text-amber-950 dark:hover:text-amber-300 flex items-center gap-1 group"
              >
                <span>Forge Insult with this Slur</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-stone-900 rounded-lg border border-stone-200 dark:border-stone-800 p-8 space-y-2">
          <Book className="w-8 h-8 text-stone-400 mx-auto" />
          <p className="font-editorial text-lg text-stone-700 dark:text-stone-300">
            No archaic slander matches thy query in this volume.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedTrait('all');
              setSelectedEra('all');
            }}
            className="text-xs text-amber-800 dark:text-amber-400 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};
