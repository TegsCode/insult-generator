import React, { useState } from 'react';
import { Swords, Trophy, RefreshCcw, ShieldAlert, Award } from 'lucide-react';
import { reciteTheatricalBurn, soundEffects } from '../utils/audioSpeech';

interface DuelOpponent {
  id: string;
  name: string;
  title: string;
  portrait: string;
  vulnerability: string;
  taunt: string;
  era: 'elizabethan' | 'victorian' | 'jacobean';
  retorts: {
    text: string;
    traitCounter: string;
    score: number; // 1 to 3
    crowdReaction: string;
  }[];
}

const OPPONENTS: DuelOpponent[] = [
  {
    id: 'lord_sneer',
    name: 'Lord Archibald Sneer',
    title: 'Self-Appointed Arbiter of High London Society',
    portrait: '/src/assets/images/victorian_gentlemen_scorn_1793805555817.jpg',
    vulnerability: 'Expose his empty head and unearned inheritance',
    taunt: '“I declare, sir! Your presence in this establishment lowers the property values of the entire parish!”',
    era: 'victorian',
    retorts: [
      {
        text: '“Sir, you are a silk-bedecked, fustian-mouthed dandiprat! Thy wits would not salt a turnip, and your tailoring smells of borrowed credit!”',
        traitCounter: 'Counter-attack his pompous vanity & empty brain',
        score: 3,
        crowdReaction: 'The clubroom erupts in scandalous gasps and polite clinking of brandy glasses!'
      },
      {
        text: '“You are an idle prattler who hath accomplished naught save wearing out easy chairs at the Carlton Club!”',
        traitCounter: 'Call out his chronic laziness',
        score: 2,
        crowdReaction: 'A few elderly gentlemen chuckle into their broadsheets.'
      },
      {
        text: '“I care not for your opinion, sir.”',
        traitCounter: 'Weak deflection',
        score: 1,
        crowdReaction: 'The butler turns away in cold embarrassment.'
      }
    ]
  },
  {
    id: 'sir_falstaff_rake',
    name: 'Sir Toby the Ale-Knight',
    title: 'Veteran of Five Hundred Tavern Brawls',
    portrait: '/src/assets/images/tavern_wit_duel_1793805554565.jpg',
    vulnerability: 'Target his staggering drunkenness and refusal to work',
    taunt: '“Out of my way, thou water-drinking shadow, ere I crush thee like a stale walnut beneath my heel!”',
    era: 'elizabethan',
    retorts: [
      {
        text: '“Peace, thou malt-scented, bed-pressing lubberwort! Thou huge hill of flesh, thou art composed of four parts sour gin and zero parts honest labor!”',
        traitCounter: 'Demolish his drunkenness & sloth with Prince Hal’s fire',
        score: 3,
        crowdReaction: 'The entire tavern bangs their pewter mugs on the oak tables with roaring laughter!'
      },
      {
        text: '“Thou art a clapper-clawed blatherskite whose tongue waggeth like a scold at the ducking stool!”',
        traitCounter: 'Counter his endless drunken bluster',
        score: 2,
        crowdReaction: 'The barmaid snickers behind the ale barrels.'
      },
      {
        text: '“Thy breath doth offend me, fellow!”',
        traitCounter: 'Mild complaint',
        score: 1,
        crowdReaction: 'A dog barks in the corner, unimpressed.'
      }
    ]
  }
];

export const WitDuelArena: React.FC = () => {
  const [currentOpponentIdx, setCurrentOpponentIdx] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [roundHistory, setRoundHistory] = useState<string[]>([]);
  const [currentVerdict, setCurrentVerdict] = useState<string | null>(null);
  const [isDuelFinished, setIsDuelFinished] = useState(false);

  const opponent = OPPONENTS[currentOpponentIdx];

  const handleChooseRetort = (retort: DuelOpponent['retorts'][0]) => {
    soundEffects.playGavel();
    reciteTheatricalBurn(retort.text, opponent.era);

    const newScore = playerScore + retort.score;
    setPlayerScore(newScore);
    setCurrentVerdict(retort.crowdReaction);

    setRoundHistory(prev => [
      ...prev,
      `Vs. ${opponent.name}: "${retort.text}" (${retort.score === 3 ? 'CRITICAL HIT' : retort.score === 2 ? 'SOUND HIT' : 'WEAK BARB'})`
    ]);

    setTimeout(() => {
      if (currentOpponentIdx < OPPONENTS.length - 1) {
        setCurrentOpponentIdx(prev => prev + 1);
        setCurrentVerdict(null);
      } else {
        setIsDuelFinished(true);
      }
    }, 2800);
  };

  const handleRestart = () => {
    setCurrentOpponentIdx(0);
    setPlayerScore(0);
    setRoundHistory([]);
    setCurrentVerdict(null);
    setIsDuelFinished(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner Card */}
      <div className="bg-stone-900 text-stone-100 rounded-lg p-6 border border-stone-800 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-cinzel text-xl font-bold flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-400" />
              <span>Historical Insult Battle Arena</span>
            </h2>
            <p className="text-xs text-stone-300 mt-1 max-w-xl">
              Go head-to-head with historical snobs and blowhards. Read your opponent’s insult, identify their personality flaw, and select the best counter-roast to win the crowd’s favor!
            </p>
          </div>

          <div className="flex items-center gap-4 bg-stone-800/80 px-4 py-2.5 rounded-md border border-stone-700">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-stone-400 font-sans">
                Crowd Favor
              </div>
              <div className="font-editorial text-2xl font-bold text-amber-400">
                {playerScore} <span className="text-xs font-normal text-stone-400">/ 6 pts</span>
              </div>
            </div>
            <Trophy className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </div>

      {!isDuelFinished ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Opponent Portrait & Taunt */}
          <div className="md:col-span-5 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg overflow-hidden flex flex-col shadow-sm">
            <div className="relative aspect-4/3 overflow-hidden bg-stone-200 dark:bg-stone-800">
              <img
                src={opponent.portrait}
                alt={opponent.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                <div>
                  <h3 className="font-cinzel text-base font-bold text-white">
                    {opponent.name}
                  </h3>
                  <div className="text-xs text-stone-300">
                    {opponent.title}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-stone-500 font-sans block mb-1">
                  Opponent’s Opening Insult:
                </span>
                <blockquote className="font-editorial text-lg text-stone-900 dark:text-stone-100 italic leading-snug">
                  {opponent.taunt}
                </blockquote>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-900/20 rounded-md text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-700 dark:text-amber-400" />
                <div>
                  <strong>Their Personality Flaw:</strong> {opponent.vulnerability}
                </div>
              </div>
            </div>
          </div>

          {/* Player Retort Choices */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-stone-500 font-sans font-semibold">
                  Select Your Counter-Roast (Round {currentOpponentIdx + 1} of {OPPONENTS.length})
                </span>
              </div>

              {currentVerdict ? (
                <div className="p-6 bg-amber-50 dark:bg-stone-800 border border-amber-800/20 rounded-lg text-center space-y-2 animate-in fade-in duration-300">
                  <Award className="w-8 h-8 text-amber-800 dark:text-amber-400 mx-auto" />
                  <h4 className="font-cinzel font-bold text-stone-900 dark:text-stone-100 text-lg">
                    The Crowd Reacts!
                  </h4>
                  <p className="font-editorial italic text-base text-stone-800 dark:text-stone-200">
                    {currentVerdict}
                  </p>
                  <span className="text-xs text-stone-400 block pt-2">
                    Next challenger stepping forward...
                  </span>
                </div>
              ) : (
                <div className="space-y-3">
                  {opponent.retorts.map((retort, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleChooseRetort(retort)}
                      className="w-full text-left p-4 rounded-md border border-stone-200 dark:border-stone-800 hover:border-amber-800 dark:hover:border-amber-600 bg-stone-50/70 dark:bg-stone-800/40 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 transition-all group"
                    >
                      <div className="text-[11px] text-amber-900 dark:text-amber-400 font-semibold mb-1">
                        Tactical Strategy: {retort.traitCounter}
                      </div>
                      <div className="font-editorial text-base text-stone-900 dark:text-stone-100 group-hover:text-amber-950 dark:group-hover:text-amber-200 leading-normal">
                        {retort.text}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Duel Finished Victory Card */
        <div className="bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-800 rounded-lg p-8 text-center space-y-6 shadow-sm">
          <Trophy className="w-12 h-12 text-amber-700 dark:text-amber-400 mx-auto" />
          <div>
            <h3 className="font-cinzel text-2xl font-bold text-stone-900 dark:text-stone-100">
              Duel Completed!
            </h3>
            <p className="font-editorial text-xl italic text-stone-700 dark:text-stone-300 mt-1">
              Final Crowd Standing: {playerScore} / 6 Points
            </p>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 max-w-md mx-auto">
              {playerScore >= 5
                ? 'Your razor-sharp historical wit completely destroyed your rivals. The entire room is roaring in applause!'
                : 'You survived the duel, but your opponent landed a few solid blows. Head back to the generator to sharpen your vocabulary!'}
            </p>
          </div>

          <div className="max-w-md mx-auto text-left text-xs bg-stone-50 dark:bg-stone-800/50 p-4 rounded-md border border-stone-200 dark:border-stone-800 space-y-1">
            <div className="font-semibold text-stone-700 dark:text-stone-300 mb-1">Match History:</div>
            {roundHistory.map((h, i) => (
              <div key={i} className="text-stone-600 dark:text-stone-400">
                · {h}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            {/* Share score on X */}
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `🏆 Scored ${playerScore}/6 in the Historical Insult Battle! Traded 17th-century burns with haughty London aristocrats.\n\n#HistoricalInsult #OldSchoolBurn`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 rounded-md font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Share Score on X</span>
            </a>

            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-stone-900 dark:bg-amber-900 text-amber-50 rounded-md font-cinzel font-bold text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
