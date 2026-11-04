export type Era = 'elizabethan' | 'jacobean' | 'georgian' | 'victorian' | 'medieval';

export type Vibe = 
  | 'pompous' 
  | 'debauched' 
  | 'treacherous' 
  | 'brainless' 
  | 'sour' 
  | 'miserly';

export type VenomLevel = 'gentle' | 'courtly' | 'scathing';

export interface TraitSettings {
  lazinessLevel: number; // 1 to 4
  nonsenseLevel: number; // 1 to 4
  vibe: Vibe;
  era: Era;
  venom: VenomLevel;
  targetName: string;
}

export interface InsultPart {
  text: string;
  type: 'salutation' | 'compound_adjective' | 'historical_descriptor' | 'master_slur' | 'dismissal';
  definition?: string;
  etymology?: string;
  century?: string;
  modernEquivalent?: string;
}

export interface GeneratedInsult {
  id: string;
  fullText: string;
  target: string;
  era: Era;
  vibe: Vibe;
  lazinessLevel: number;
  nonsenseLevel: number;
  venom: VenomLevel;
  parts: InsultPart[];
  modernTranslation: string;
  historicalContext: string;
  literarySource?: string;
  createdAt: number;
}

export interface LexiconEntry {
  term: string;
  phonetic?: string;
  era: Era;
  primaryTrait: 'laziness' | 'nonsense' | 'vibe' | 'intellect' | 'temper';
  partOfSpeech: string;
  definition: string;
  modernMeaning: string;
  exampleQuote: string;
  source: string;
  date: string;
}

export interface DuelRound {
  opponentName: string;
  opponentTitle: string;
  opponentAvatar: string;
  opponentInsult: string;
  opponentWeakness: 'laziness' | 'nonsense' | 'vibe' | 'intellect';
  playerOptions: {
    text: string;
    traitFocus: 'laziness' | 'nonsense' | 'vibe' | 'intellect';
    effectiveness: number; // 1 to 3
    retortDescription: string;
  }[];
}
