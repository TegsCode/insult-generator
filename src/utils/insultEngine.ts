import { Era, GeneratedInsult, InsultPart, TraitSettings, Vibe, VenomLevel } from '../types/insult';
import { ERA_MODIFIERS, LAZINESS_VOCAB, NONSENSE_VOCAB, VIBE_VOCAB } from '../data/lexicon';

function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function generateInsult(settings: TraitSettings): GeneratedInsult {
  const eraData = ERA_MODIFIERS[settings.era];
  const lazinessData = LAZINESS_VOCAB[settings.lazinessLevel] || LAZINESS_VOCAB[2];
  const nonsenseData = NONSENSE_VOCAB[settings.nonsenseLevel] || NONSENSE_VOCAB[2];
  const vibeData = VIBE_VOCAB[settings.vibe] || VIBE_VOCAB.pompous;

  // Choose Salutation based on era and target
  let salutationText = pickRandom(eraData.salutations);
  if (settings.targetName.trim()) {
    if (settings.era === 'victorian' || settings.era === 'georgian') {
      salutationText = `${settings.targetName}, you are an`;
    } else {
      salutationText = `${settings.targetName}! Thou art a`;
    }
  }

  // Pick compound adjective based on primary driver (blend laziness and nonsense)
  const isLazinessDominant = settings.lazinessLevel >= settings.nonsenseLevel;
  const primaryAdj = isLazinessDominant
    ? pickRandom(lazinessData.adjectives)
    : pickRandom(nonsenseData.adjectives);

  // Pick secondary descriptor from the complementary trait or vibe
  const secondaryDesc = isLazinessDominant
    ? pickRandom(nonsenseData.descriptors)
    : pickRandom(lazinessData.descriptors);

  // Vibe specific flavor adjective
  const vibeAdj = pickRandom(vibeData.adjectives);

  // Master Slur Noun: pick either from vibe or the highest trait
  let masterNounObj: { text: string; definition: string; modernEquivalent: string; century: string; source: string };
  if (settings.lazinessLevel === 4) {
    masterNounObj = pickRandom(LAZINESS_VOCAB[4].nouns);
  } else if (settings.nonsenseLevel === 4) {
    masterNounObj = pickRandom(NONSENSE_VOCAB[4].nouns);
  } else {
    // Pick from vibe or trait nouns
    const pool = [
      ...lazinessData.nouns,
      ...nonsenseData.nouns,
      ...vibeData.nouns.map(n => ({
        text: n,
        definition: `A creature steeped in ${settings.vibe} insolence.`,
        modernEquivalent: `A ${settings.vibe} irritant.`,
        century: '17th Century',
        source: 'Period Ballads'
      }))
    ];
    masterNounObj = pickRandom(pool);
  }

  // Pick dismissal based on venom level and era
  let dismissalText = '';
  if (settings.venom === 'gentle') {
    dismissalText = settings.era === 'victorian' 
      ? 'I pray you mend your habits ere evening falls.'
      : 'I pray thee mend thy manners ere next Sunday!';
  } else if (settings.venom === 'courtly') {
    dismissalText = pickRandom(vibeData.dismissal);
  } else {
    // Scathing tavern brawl
    dismissalText = `${pickRandom(eraData.closingCurse)} ${pickRandom(vibeData.dismissal)}`;
  }

  // Construct parts list
  const parts: InsultPart[] = [
    {
      text: salutationText,
      type: 'salutation',
      definition: 'Historical formal address or challenge to the offender.'
    },
    {
      text: primaryAdj.text,
      type: 'compound_adjective',
      definition: primaryAdj.definition,
      modernEquivalent: primaryAdj.modernEquivalent,
      century: primaryAdj.century
    },
    {
      text: vibeAdj,
      type: 'historical_descriptor',
      definition: `Reflecting the offender’s ${settings.vibe} disposition.`,
      modernEquivalent: `Distinctly ${settings.vibe}`,
      century: 'Historical Cant'
    },
    {
      text: secondaryDesc.text,
      type: 'historical_descriptor',
      definition: secondaryDesc.definition,
      modernEquivalent: secondaryDesc.modernEquivalent,
      century: secondaryDesc.century
    },
    {
      text: masterNounObj.text,
      type: 'master_slur',
      definition: masterNounObj.definition,
      modernEquivalent: masterNounObj.modernEquivalent,
      century: masterNounObj.century
    },
    {
      text: dismissalText,
      type: 'dismissal',
      definition: 'The theatrical historical parting shot and condemnation.'
    }
  ];

  // Assemble full text
  const fullText = `${salutationText} ${primaryAdj.text}, ${vibeAdj}, ${secondaryDesc.text} ${masterNounObj.text}! ${dismissalText}`;

  // Formulate modern translation
  const modernTranslation = `Modern Translation: "${settings.targetName ? settings.targetName + ', you' : 'You'} ${primaryAdj.modernEquivalent}, ${settings.vibe} individual who is ${secondaryDesc.modernEquivalent}. You are basically a ${masterNounObj.modernEquivalent}."`;

  const historicalContext = `Attested in ${masterNounObj.century} English literature (${masterNounObj.source}). Formatted in authentic ${eraData.historicalTone}.`;

  return {
    id: `burn-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    fullText,
    target: settings.targetName || 'Base Knave',
    era: settings.era,
    vibe: settings.vibe,
    lazinessLevel: settings.lazinessLevel,
    nonsenseLevel: settings.nonsenseLevel,
    venom: settings.venom,
    parts,
    modernTranslation,
    historicalContext,
    literarySource: masterNounObj.source,
    createdAt: Date.now()
  };
}

export interface PresetArchetype {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  settings: TraitSettings;
}

export const ARCHETYPE_PRESETS: PresetArchetype[] = [
  {
    id: 'lazy_coworker',
    name: 'The Slacker Coworker',
    subtitle: 'Always Missing When Work Starts',
    description: 'For the coworker who vanishes the second there is actual work to do.',
    settings: {
      lazinessLevel: 4,
      nonsenseLevel: 1,
      vibe: 'sour',
      era: 'elizabethan',
      venom: 'courtly',
      targetName: 'Coworker'
    }
  },
  {
    id: 'gasconading_braggart',
    name: 'The Endless Yapper',
    subtitle: 'All Talk, Zero Substance',
    description: 'For the person who talks for forty minutes without saying a single useful thing.',
    settings: {
      lazinessLevel: 2,
      nonsenseLevel: 4,
      vibe: 'pompous',
      era: 'georgian',
      venom: 'scathing',
      targetName: 'The Meeting Yapper'
    }
  },
  {
    id: 'pompous_aristocrat',
    name: 'The Arrogant Snob',
    subtitle: 'Thinks They Are Better Than You',
    description: 'For someone who acts high-and-mighty with zero accomplishments to back it up.',
    settings: {
      lazinessLevel: 3,
      nonsenseLevel: 3,
      vibe: 'pompous',
      era: 'victorian',
      venom: 'courtly',
      targetName: 'The Snob'
    }
  },
  {
    id: 'tavern_drunkard',
    name: 'The Rowdy Party Animal',
    subtitle: 'Loud & Sloppy After Two Drinks',
    description: 'For the friend who gets way too loud and creates scenes on a night out.',
    settings: {
      lazinessLevel: 3,
      nonsenseLevel: 2,
      vibe: 'debauched',
      era: 'jacobean',
      venom: 'scathing',
      targetName: 'The Messy Friend'
    }
  },
  {
    id: 'cheapskate_miser',
    name: 'The Penny-Pinching Cheapskate',
    subtitle: 'Splits the Bill Down to 3 Cents',
    description: 'For the friend who always disappears when it is their turn to pay.',
    settings: {
      lazinessLevel: 1,
      nonsenseLevel: 2,
      vibe: 'miserly',
      era: 'medieval',
      venom: 'scathing',
      targetName: 'The Cheapskate'
    }
  }
];
