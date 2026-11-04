import { Era, LexiconEntry, Vibe } from '../types/insult';

export interface TraitVocabulary {
  adjectives: {
    text: string;
    definition: string;
    modernEquivalent: string;
    century: string;
    source?: string;
  }[];
  descriptors: {
    text: string;
    definition: string;
    modernEquivalent: string;
    century: string;
    source?: string;
  }[];
  nouns: {
    text: string;
    definition: string;
    modernEquivalent: string;
    century: string;
    source: string;
  }[];
}

// Vocabulary organized by trait focus
export const LAZINESS_VOCAB: Record<number, TraitVocabulary> = {
  // Level 1: Mild Dawdler
  1: {
    adjectives: [
      { text: 'slow-bellied', definition: 'Sluggish in movement and digestive tempo', modernEquivalent: 'chronically sluggish', century: '16th Century' },
      { text: 'dronish', definition: 'Resembling a lazy male bee who feasts while others work', modernEquivalent: 'loafing around', century: '17th Century' },
      { text: 'snail-paced', definition: 'Moving with agonizing slowness', modernEquivalent: 'glacial', century: 'Elizabethan' }
    ],
    descriptors: [
      { text: 'time-wasting', definition: 'Squandering precious God-given daylight', modernEquivalent: 'procrastinating', century: '16th Century' },
      { text: 'cumber-ground', definition: 'One who merely occupies space upon the earth without benefit', modernEquivalent: 'taking up space', century: '17th Century' }
    ],
    nouns: [
      { text: 'dawdler', definition: 'An idle loiterer who delays all affairs of import', modernEquivalent: 'time-waster', century: '17th Century', source: 'Broadside Ballads' },
      { text: 'tardy-pate', definition: 'A dull fellow whose actions lag a league behind duty', modernEquivalent: 'perpetual latecomer', century: '16th Century', source: 'Thomas Dekker' }
    ]
  },
  // Level 2: Lethargic Drone
  2: {
    adjectives: [
      { text: 'cumber-legged', definition: 'Too heavy-limbed to undertake honest exertion', modernEquivalent: 'lethargic', century: '17th Century' },
      { text: 'leaden-heeled', definition: 'Weighed down by constitutional torpor', modernEquivalent: 'dragging your feet', century: '18th Century' },
      { text: 'heft-shirking', definition: 'Avoiding any burden heavier than a feather', modernEquivalent: 'effort-avoidant', century: '17th Century' }
    ],
    descriptors: [
      { text: 'pillow-clinging', definition: 'Attached to one’s bedding as a limpet to a rock', modernEquivalent: 'hates getting up', century: 'Elizabethan' },
      { text: 'bench-polishing', definition: 'Doing naught but wearing smooth the tavern benches', modernEquivalent: 'couch potato', century: '18th Century' }
    ],
    nouns: [
      { text: 'sluggard', definition: 'A habitually idle creature deaf to the rooster’s call', modernEquivalent: 'sloth', century: '14th Century', source: 'Chaucer, Parson’s Tale' },
      { text: 'drone', definition: 'A parasite that feeds upon the hive’s communal honey', modernEquivalent: 'freeloader', century: '16th Century', source: 'Shakespeare, Henry V' },
      { text: 'couch-louse', definition: 'An unmovable parasite adhering to the settle', modernEquivalent: 'permanent fixture on the sofa', century: '17th Century', source: 'Ben Jonson' }
    ]
  },
  // Level 3: Bed-Pressing Sluggard
  3: {
    adjectives: [
      { text: 'bed-pressing', definition: 'Spending the noon hour indenting mattress tick', modernEquivalent: 'sleeping until 2 PM', century: '16th Century' },
      { text: 'bone-idle', definition: 'Possessing marrow corrupted by pure indolence', modernEquivalent: 'lazy to the bone', century: '18th Century' },
      { text: 'lubber-worty', definition: 'Afflicted by the mythical herb that induces profound stupor', modernEquivalent: 'brain-fogged from doing nothing', century: '16th Century' }
    ],
    descriptors: [
      { text: 'yawn-mongering', definition: 'Producing infectious groans of exhaustion without labor', modernEquivalent: 'exhausting to watch', century: '17th Century' },
      { text: 'mattress-worshipping', definition: 'Treating the bed as one’s sole holy altar', modernEquivalent: 'addicted to sleeping in', century: '17th Century' }
    ],
    nouns: [
      { text: 'bed-presser', definition: 'A gross, fat sluggard who leaves a permanent trough in his bed', modernEquivalent: 'lazy mattress hugger', century: '1597', source: 'Shakespeare, Henry IV Pt 1' },
      { text: 'lubberwort', definition: 'The deity or spirit of utter sloth and stupid heaviness', modernEquivalent: 'sloth incarnate', century: '1553', source: 'Respublica' },
      { text: 'slug-a-bed', definition: 'A wretch who lies abed long after the sun hath mounted the sky', modernEquivalent: 'sleepyhead freeloader', century: '1597', source: 'Shakespeare, Romeo & Juliet' }
    ]
  },
  // Level 4: Complete Paralyzed Fopdoodle
  4: {
    adjectives: [
      { text: 'pasty-faced', definition: 'Having never seen sunlight due to relentless recumbence', modernEquivalent: 'pale goblin of indolence', century: '17th Century' },
      { text: 'drone-livered', definition: 'Having internal organs dedicated entirely to zero productive output', modernEquivalent: 'unemployable', century: '16th Century' },
      { text: 'torpid-spined', definition: 'Possessing a backbone as rigid as boiled asparagus', modernEquivalent: 'spineless loafer', century: '18th Century' }
    ],
    descriptors: [
      { text: 'foul-idling', definition: 'Rotting in place from stubborn refusal to lift a thumb', modernEquivalent: 'vegetating', century: '17th Century' },
      { text: 'blanket-mouldering', definition: 'Decomposing beneath coarse wool in broad daylight', modernEquivalent: 'living under blankets', century: '18th Century' }
    ],
    nouns: [
      { text: 'fopdoodle', definition: 'An insignificant, worthless fellow who never accomplished a single deed', modernEquivalent: 'useless waste of skin', century: '1668', source: 'Sir George Etherege' },
      { text: 'muckworm', definition: 'A wretched creature groveling in stagnant comfort rather than duty', modernEquivalent: 'bottom feeder', century: '1690', source: 'Dictionary of the Canting Crew' },
      { text: 'trencherman-drone', definition: 'One whose only industrious act is shoveling victuals down his gullet', modernEquivalent: 'free meal vacuum', century: '17th Century', source: 'Samuel Butler' }
    ]
  }
};

export const NONSENSE_VOCAB: Record<number, TraitVocabulary> = {
  // Level 1: Idle Babbler
  1: {
    adjectives: [
      { text: 'prattling', definition: 'Chattering with the pointless repetition of a magpie', modernEquivalent: 'yapping endlessly', century: '15th Century' },
      { text: 'chattering', definition: 'Making idle, hollow mouth noises', modernEquivalent: 'incessant rambling', century: '16th Century' }
    ],
    descriptors: [
      { text: 'airy-worded', definition: 'Speaking utterances composed 99% of empty wind', modernEquivalent: 'saying nothing with many words', century: '17th Century' },
      { text: 'shallow-pated', definition: 'Having an intellect no deeper than a saucer of weak tea', modernEquivalent: 'shallow thinker', century: '16th Century' }
    ],
    nouns: [
      { text: 'prattler', definition: 'A dispenser of petty, trifling nursery drivel', modernEquivalent: 'chatterbox', century: '1530', source: 'John Palsgrave' },
      { text: 'clatterfart', definition: 'One who babbles secrets and nonsense incessantly', modernEquivalent: 'loose-lipped blabbermouth', century: '1552', source: 'Richard Huloet' }
    ]
  },
  // Level 2: Purveyor of Moonshine
  2: {
    adjectives: [
      { text: 'mumpsimus-spouting', definition: 'Stubbornly repeating known errors and folklore', modernEquivalent: 'confidently incorrect', century: '1530', source: 'Henry VIII speech' },
      { text: 'rattle-pated', definition: 'Having a skull that rattles like peas in a dried bladder', modernEquivalent: 'empty-headed loudmouth', century: '17th Century' }
    ],
    descriptors: [
      { text: 'flummery-peddling', definition: 'Hawking sweet, gelatinous, utterly content-free discourse', modernEquivalent: 'spouting fluff', century: '18th Century' },
      { text: 'moonshine-sipping', definition: 'Intoxicated on absurd, ungrounded notions', modernEquivalent: 'living in delusion', century: '18th Century' }
    ],
    nouns: [
      { text: 'blatherskite', definition: 'A boastful, blustering person who emits torrents of foolish babble', modernEquivalent: 'talking loud, saying nothing', century: '1650', source: 'Scottish Ballad / Maggie Lauder' },
      { text: 'bleater', definition: 'One whose contribution to debate resembles a dyspeptic sheep', modernEquivalent: 'whining bloviator', century: '18th Century', source: 'Francis Grose' }
    ]
  },
  // Level 3: Windbag of Pure Fustian
  3: {
    adjectives: [
      { text: 'fustian-mouthed', definition: 'Employing pompous, bombastic vocabulary to disguise barren wits', modernEquivalent: 'thesaurus-swallowing pseudointellectual', century: '1590', source: 'Shakespeare, Henry IV' },
      { text: 'wind-broken', definition: 'Puffing like a decrepit horse with excessive bluster', modernEquivalent: 'exhaustingly overblown', century: '17th Century' }
    ],
    descriptors: [
      { text: 'balderdash-spewing', definition: 'Regurgitating a vile medley of nonsensical gibberish', modernEquivalent: 'bullshitter supreme', century: '1598', source: 'Thomas Nashe' },
      { text: 'gasconading', definition: 'Bragging with extravagant, fabricated valor', modernEquivalent: 'compulsive capper', century: '1709', source: 'The Tatler' }
    ],
    nouns: [
      { text: 'clapper-claw', definition: 'A reviler whose tongue flails like a scold in a pillory', modernEquivalent: 'incoherent rant machine', century: '1598', source: 'Shakespeare, Troilus and Cressida' },
      { text: 'flapdoodle', definition: 'A specimen of pure, unfiltered, brain-liquefying hogwash', modernEquivalent: 'pure unadulterated nonsense', century: '1833', source: 'Peter Simple' }
    ]
  },
  // Level 4: Foul Geyser of Balderdash
  4: {
    adjectives: [
      { text: 'gargantuan-jawed', definition: 'Armed with a maw that could devour and disgorge entire encyclopedias of rubbish', modernEquivalent: 'unstoppable sound pollution', century: '16th Century' },
      { text: 'bedlam-witted', definition: 'Raving with the unhinged logic of an escaped lunatic asylum patient', modernEquivalent: 'completely unhinged', century: '17th Century' }
    ],
    descriptors: [
      { text: 'cesspool-babbling', definition: 'Releasing conversational fumes toxic to civilized company', modernEquivalent: 'inflicting cognitive damage', century: '17th Century' },
      { text: 'tripe-furnishing', definition: 'Serving up decomposing offal under the guise of wisdom', modernEquivalent: 'talking pure garbage', century: '18th Century' }
    ],
    nouns: [
      { text: 'skite', definition: 'An odious, shrieking windbag whose mouth ought to be caulked with pitch', modernEquivalent: 'obnoxious blowhard', century: '1811', source: 'Grose’s Vulgar Tongue' },
      { text: 'coxcomb-orator', definition: 'A vain, feathered fool whose speeches cause horses to rear in terror', modernEquivalent: 'self-loving yap god', century: '1712', source: 'The Spectator' },
      { text: 'garrulous-buzzard', definition: 'A scavenging fowl that circles civilized conversation only to befoul it', modernEquivalent: 'meeting derailer', century: '17th Century', source: 'John Webster' }
    ]
  }
};

export const VIBE_VOCAB: Record<Vibe, { adjectives: string[]; nouns: string[]; dismissal: string[] }> = {
  pompous: {
    adjectives: ['haughty-crested', 'silk-bedecked', 'powder-puffed', 'high-sniffing', 'strutting'],
    nouns: ['dandiprat', 'macaroni', 'coxcomb', 'popinjay', 'feather-pated lordling'],
    dismissal: [
      'Thy pedigree is fit only to line a fishmonger’s basket!',
      'Thou hast not wit enough to keep thy boots upon the proper feet!',
      'The peacock hath more modest feathers, and infinitely sweeter voice!'
    ]
  },
  debauched: {
    adjectives: ['malt-scented', 'ale-drenched', 'pot-valiant', 'tavern-haunting', 'gouty-toed'],
    nouns: ['malt-worm', 'rakehell', 'bottle-knight', 'crapulous drunkard', 'spigot-sucker'],
    dismissal: [
      'Thy breath doth sour milk at twenty paces!',
      'Thy nose shineth like a lantern on a smuggler’s cove!',
      'Thou art composed of three parts gin, and one part sheer regret!'
    ]
  },
  treacherous: {
    adjectives: ['viper-tongued', 'two-faced', 'greasy-palmed', 'weasel-livered', 'Judas-hearted'],
    nouns: ['turncoat', 'pick-thank', 'jackanapes', 'smell-feast', 'backbiting varlet'],
    dismissal: [
      'I would not trust thee with the guardianship of a stale crust!',
      'Thy smile hath all the warmth of an open sepulchre!',
      'May thy shadow shrink until dogs mistake thee for a post!'
    ]
  },
  brainless: {
    adjectives: ['beef-witted', 'knotty-pated', 'clay-brained', 'beetle-headed', 'muddy-mettled'],
    nouns: ['mooncalf', 'clodpole', 'gudgeon', 'noddy', 'scullion of dull clay'],
    dismissal: [
      'Thou hast not a dram of intellect to salt a turnip!',
      'More of thy conversation would infect my brain!',
      'Thy skull is but a vacant garret where spiders spin their cobwebs in peace!'
    ]
  },
  sour: {
    adjectives: ['vinegar-faced', 'crab-apple-visaged', 'curdle-gutted', 'gall-dabbled', 'peevish'],
    nouns: ['curmudgeon', 'sour-swill', 'lemon-chewer', 'ill-tempered baggage', 'croaker'],
    dismissal: [
      'Thy grimace would turn sweet posset into bitter poison!',
      'The heavens wept when thou wast born, and the cows ceased their milk!',
      'I desire we be better strangers, and that immediately!'
    ]
  },
  miserly: {
    adjectives: ['penny-squeezing', 'parsimonious', 'skin-flinted', 'griping', 'muck-raking'],
    nouns: ['churl', 'skinflint', 'nip-cheese', 'usurer', 'scrooge-livered pinch-gut'],
    dismissal: [
      'Thou wouldst skin a flea for its tallow, and sue the dog for theft!',
      'Thy purse strings are tighter than the garters of a bishop!',
      'May thy golden coins melt and drip into thy boots!'
    ]
  }
};

export const ERA_MODIFIERS: Record<Era, {
  salutations: string[];
  grammarFormat: string;
  historicalTone: string;
  closingCurse: string[];
}> = {
  elizabethan: {
    salutations: ['Thou', 'Sirrah, thou', 'Hear me, base varlet: thou', 'By’r Lady, thou'],
    grammarFormat: 'thou/thee/thy archaic second-person singular with iambic cadence',
    historicalTone: '1590s Globe Theatre and Shakespearean wit',
    closingCurse: [
      'I desire we be better strangers!',
      'Out of my sight! Thou dost infect mine eyes!',
      'There’s neither honesty, manhood, nor good fellowship in thee!',
      'Thou art not worth another word, else I’d call thee knave!'
    ]
  },
  jacobean: {
    salutations: ['S’death, sir! Thou art a', 'O, monstrous wretch! Thou', 'Mark my words, dog: thou', 'Zounds, fellow! Thou art a'],
    grammarFormat: 'Dark Restoration & Jacobean bite, courtly cynicism',
    historicalTone: '1660s Restoration coffeehouses and comedy of manners',
    closingCurse: [
      'Thy very countenance is an indictment of God’s patience!',
      'Go hang thyself in thine own garters!',
      'Thy soul is as black as an apothecary’s kettle!',
      'May fleas by the gross take winter quarters in thy breeches!'
    ]
  },
  georgian: {
    salutations: ['Upon my honour, sir, you are a', 'Egads, madam! You are a', 'By Jove, sir! You are an abominable', 'Look’ee here, fellow, you are a'],
    grammarFormat: 'Late 18th/early 19th century Regency wit, Grose’s 1811 slang',
    historicalTone: '1810s Beau Brummell and Francis Grose’s Lexicon Balatronicum',
    closingCurse: [
      'A kick in the posterior is too distinguished an honour for you!',
      'You are fit only to drive night-carts through St. Giles!',
      'I shall have my footman cane you off the gravel!',
      'You have the manners of an oyster-wench and the face to match!'
    ]
  },
  victorian: {
    salutations: ['Sir, you are a', 'Madam, your conduct brands you as an', 'I must observe with cold revulsion that you are a', 'Permit me to inform you that you are a'],
    grammarFormat: 'Polite, razor-sharp 19th-century etiquette with icy venom',
    historicalTone: '1880s Victorian London society, Dickensian sharpness and clubroom snobbery',
    closingCurse: [
      'I shall instruct the butler never to admit your carriage again!',
      'Your social existence is an affront to decent sensibilities!',
      'You are a cad of the lowest water, and I bid you good day, sir!',
      'A gentleman would cut his own throat before wearing your company!'
    ]
  },
  medieval: {
    salutations: ['Hark, ye vile churl! Thou art a', 'By the Holy Rood, thou', 'O foul knave, thou', 'Avaunt, heathen! Thou art a'],
    grammarFormat: '14th-century Middle English & Chaucerian earthy directness',
    historicalTone: '1380s Canterbury pilgrimage, feudal tavern brawl',
    closingCurse: [
      'May the mange devour thy hide ere sundown!',
      'Back to the ditch where thy mother whelped thee!',
      'Thy breath stinketh worse than the king’s privy!',
      'Avaunt, scum, and choke upon thine own porridge!'
    ]
  }
};

export const MASTER_LEXICON: LexiconEntry[] = [
  {
    term: 'Fopdoodle',
    phonetic: 'fop-doo-dl',
    era: 'jacobean',
    primaryTrait: 'laziness',
    partOfSpeech: 'noun',
    definition: 'An insignificant, worthless, or foolish fellow; a simpleton who accomplishes nothing.',
    modernMeaning: 'A completely useless airhead.',
    exampleQuote: 'Where is that fopdoodle who undertook to deliver the dispatch?',
    source: 'Sir George Etherege, 1668',
    date: '1668'
  },
  {
    term: 'Lubberwort',
    phonetic: 'luh-ber-wurt',
    era: 'elizabethan',
    primaryTrait: 'laziness',
    partOfSpeech: 'noun',
    definition: 'A mythical herb or potion reputed to produce sluggish, heavy, idle stupor.',
    modernMeaning: 'The spirit of utter, immovable laziness.',
    exampleQuote: 'He hath eaten lubberwort, and cannot stir from his bed.',
    source: 'John Heywood, 1562',
    date: '1562'
  },
  {
    term: 'Blatherskite',
    phonetic: 'blath-er-skyte',
    era: 'jacobean',
    primaryTrait: 'nonsense',
    partOfSpeech: 'noun',
    definition: 'A person who talks at great length without making sense; a boastful, loud babbler.',
    modernMeaning: 'A rambling loudmouth full of hot air.',
    exampleQuote: 'Hark to that blatherskite drowning out the church bells with his conceit.',
    source: 'Scottish Folk Song (Maggie Lauder), c. 1650',
    date: '1650'
  },
  {
    term: 'Dandiprat',
    phonetic: 'dan-dee-prat',
    era: 'georgian',
    primaryTrait: 'vibe',
    partOfSpeech: 'noun',
    definition: 'Originally an insignificant small coin of Henry VII; applied to an insignificantly small, conceited person.',
    modernMeaning: 'A pint-sized, arrogant showoff.',
    exampleQuote: 'The little dandiprat strutted as if he commanded the fleet.',
    source: 'John Skelton & Francis Grose, 1811',
    date: '1515–1811'
  },
  {
    term: 'Muckworm',
    phonetic: 'muck-wurm',
    era: 'jacobean',
    primaryTrait: 'vibe',
    partOfSpeech: 'noun',
    definition: 'A mean, scraping miser who lives solely to hoard filthy lucre.',
    modernMeaning: 'A greedy, soulless penny-pincher.',
    exampleQuote: 'The old muckworm would sooner lose his eye than spare a farthing.',
    source: 'Thomas Shadwell, 1676',
    date: '1676'
  },
  {
    term: 'Clatterfart',
    phonetic: 'clat-ter-fart',
    era: 'elizabethan',
    primaryTrait: 'nonsense',
    partOfSpeech: 'noun',
    definition: 'One who babbles or chatters incessantly, leaking secrets like an unsealed barrel.',
    modernMeaning: 'An uncontrollable gossip and babbler.',
    exampleQuote: 'Trust no whisper to that clatterfart; all town will know before nightfall.',
    source: 'Richard Huloet, Abcedarium Anglico-Latinum, 1552',
    date: '1552'
  },
  {
    term: 'Mooncalf',
    phonetic: 'moon-kahf',
    era: 'elizabethan',
    primaryTrait: 'intellect',
    partOfSpeech: 'noun',
    definition: 'A misshapen monster born under the influence of the moon; hence a congenital fool.',
    modernMeaning: 'A hopeless, spaced-out idiot.',
    exampleQuote: 'How cam’st thou to be the siege of this mooncalf? can he vent Trinculos?',
    source: 'Shakespeare, The Tempest (Act II, Sc 2)',
    date: '1611'
  },
  {
    term: 'Bed-Presser',
    phonetic: 'bed-press-er',
    era: 'elizabethan',
    primaryTrait: 'laziness',
    partOfSpeech: 'noun',
    definition: 'A sluggish, indolent fellow whose principal occupation is lying abed.',
    modernMeaning: 'Someone who won’t get out of bed before mid-afternoon.',
    exampleQuote: 'This sanguine coward, this bed-presser, this horseback-breaker, this huge hill of flesh!',
    source: 'Shakespeare, Henry IV Pt 1 (Prince Hal to Falstaff)',
    date: '1597'
  },
  {
    term: 'Beef-Witted',
    phonetic: 'beef-wit-ted',
    era: 'elizabethan',
    primaryTrait: 'intellect',
    partOfSpeech: 'adjective',
    definition: 'Having wits dulled from excessive consumption of heavy beef without study.',
    modernMeaning: 'Dense, slow-thinking, and thick-headed.',
    exampleQuote: 'The beef-witted lord thinks everyone as slow in comprehension as himself.',
    source: 'Shakespeare, Troilus and Cressida',
    date: '1602'
  },
  {
    term: 'Popinjay',
    phonetic: 'pop-in-jay',
    era: 'medieval',
    primaryTrait: 'vibe',
    partOfSpeech: 'noun',
    definition: 'Originally a parrot; hence a vain, conceited, garrulous person dressed in absurd finery.',
    modernMeaning: 'A flashy, irritating try-hard.',
    exampleQuote: 'To be so pester’d with a popinjay, out of my grief and my impatience, answer’d neglectingly.',
    source: 'Shakespeare, Henry IV Pt 1 (Hotspur)',
    date: '1380–1597'
  },
  {
    term: 'Cumber-Ground',
    phonetic: 'cum-ber-ground',
    era: 'jacobean',
    primaryTrait: 'laziness',
    partOfSpeech: 'noun',
    definition: 'Anything or anyone that cumbers or uselessly occupies space upon the earth.',
    modernMeaning: 'A complete waste of space.',
    exampleQuote: 'Cut him down; why cumbereth he the ground?',
    source: 'Tyndale / King James Bible / 17th Century Cant',
    date: '1611'
  },
  {
    term: 'Rakehell',
    phonetic: 'rayk-hel',
    era: 'jacobean',
    primaryTrait: 'vibe',
    partOfSpeech: 'noun',
    definition: 'A lewd, thoroughly debauched, dissolute rogue whom hell itself would rake up.',
    modernMeaning: 'A wild, unrepentant degenerate.',
    exampleQuote: 'He is a notorious rakehell, frequenting gaming houses and tavern cellars.',
    source: 'Roger Ascham & John Milton',
    date: '1550–1667'
  },
  {
    term: 'Mumpsimus',
    phonetic: 'mump-see-mus',
    era: 'elizabethan',
    primaryTrait: 'nonsense',
    partOfSpeech: 'noun',
    definition: 'A person who obstinately adheres to old, erroneous ways despite overwhelming proof.',
    modernMeaning: 'Someone who stays aggressively wrong out of stubbornness.',
    exampleQuote: 'I will not change my old mumpsimus for your new sumpsimus!',
    source: 'Erasmus & King Henry VIII Speech',
    date: '1530'
  },
  {
    term: 'Muck-Snipe',
    phonetic: 'muck-snyp',
    era: 'victorian',
    primaryTrait: 'vibe',
    partOfSpeech: 'noun',
    definition: 'A miserable creature brought down into the gutter, down-at-heel and stripped of dignity.',
    modernMeaning: 'A wretched down-and-out scoundrel.',
    exampleQuote: 'Begone, you wretched muck-snipe, before I summon the constable!',
    source: 'Grose’s Dictionary of the Vulgar Tongue & Victorian London Slang',
    date: '1811–1880'
  },
  {
    term: 'Pot-Valiant',
    phonetic: 'pot-val-yant',
    era: 'jacobean',
    primaryTrait: 'vibe',
    partOfSpeech: 'adjective',
    definition: 'Brave and belligerent only when bolstered by drink from the ale-pot.',
    modernMeaning: 'Having liquid courage; brave only when drunk.',
    exampleQuote: 'He talks like Caesar when pot-valiant, but squeaks like a mouse when sober.',
    source: 'Thomas Nashe & Ben Jonson',
    date: '1592'
  },
  {
    term: 'Nip-Cheese',
    phonetic: 'nip-cheez',
    era: 'georgian',
    primaryTrait: 'vibe',
    partOfSpeech: 'noun',
    definition: 'A stingy purser or commissary who pares down rations to pinch pennies.',
    modernMeaning: 'A petty cheapskate.',
    exampleQuote: 'The captain is a true nip-cheese, measuring our cheese by the dram.',
    source: 'Francis Grose, 1811',
    date: '1811'
  }
];
