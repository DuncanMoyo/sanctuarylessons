export type MissionCategory =
  | 'Foundations'
  | 'Courtyard'
  | 'Holy Place'
  | 'Most Holy'
  | 'Ministry & Prophecy';

export interface ScriptureRef {
  ref: string;
  focus: string;
  excerpt: string;
}

export interface QuizQuestion {
  q: string;
  a: string[];
  correct: number;
  ex: string;
}

export interface TypeAntitypeRow {
  typeRef: string;
  typeText: string;
  antitypeRef: string;
  antitypeText: string;
}

export interface HighPriestGarment {
  id: string;
  name: string;
  scripture: string;
  description: string;
  christMeaning: string;
}

export interface Lesson {
  id: number;
  title: string;
  tag: string;
  category: MissionCategory;
  reading: string;
  pdfPage: number;
  image: string;
  imageAlt: string;
  body: string[];
  haskellExcerpt: {
    quote: string;
    citation: string;
  };
  typeAntitype: TypeAntitypeRow[];
  verses: ScriptureRef[];
  challenge: string;
  quiz: QuizQuestion[];
}

export interface SanctuaryStation {
  id: string;
  number: string;
  name: string;
  zone: 'Outer Court' | 'Holy Place' | 'Most Holy Place';
  dimensions: string;
  material: string;
  earthlyRole: string;
  christFulfillment: string;
  scripture: string;
  missionIndex: number;
  pdfPage: number;
  svgPos: { x: number; y: number };
}

export const SOURCE_BOOK_PDF =
  '/assets/aistudio/The_Cross_and_Its_Shadow_-_S.N._Haskell__1914__6f701464.pdf';

export const HERO_IMAGE = '/src/assets/images/hero_sanctuary_tabernacle_1795179589452.jpg';
export const COURTYARD_IMAGE = '/src/assets/images/sanctuary_courtyard_altar_1795179588929.jpg';
export const HOLY_PLACE_IMAGE = '/src/assets/images/sanctuary_holy_place_1795179588251.jpg';
export const MOST_HOLY_IMAGE = '/src/assets/images/sanctuary_most_holy_ark_1795179587189.jpg';

export const HIGH_PRIEST_GARMENTS: HighPriestGarment[] = [
  {
    id: 'white-linen',
    name: 'White Linen Coat & Girdle',
    scripture: 'Exodus 28:32, 39–42 · Isaiah 61:10',
    description:
      'Woven of white linen in one seamless piece reaching nearly to the feet, bound at the waist with a girdle embroidered in blue, purple, and scarlet. Worn by common priests and by the high priest on ordinary days.',
    christMeaning:
      'A fit emblem of the Spotless One whose earthly tunic was woven in one piece (John 19:23), and who clothes believers with the clean white linen of His own righteousness.',
  },
  {
    id: 'blue-robe',
    name: 'Robe of Blue, Bells & Pomegranates',
    scripture: 'Exodus 28:31–35 · Luke 1:10',
    description:
      'A robe of solid blue woven in one piece and worn over the white coat, ornamented around the hem with golden bells alternating with pomegranates of blue, purple, and scarlet.',
    christMeaning:
      'As the people outside listened to the chiming golden bells to follow the high priest within the veil, believers today follow the living ministry of Christ by faith and heavenly signs.',
  },
  {
    id: 'ephod-onyx',
    name: 'Embroidered Ephod & Onyx Stones',
    scripture: 'Exodus 28:6–12 · Isaiah 9:6',
    description:
      'A shorter sleeveless vestment embroidered in gold, blue, purple, and scarlet. Mounted upon its gold-embroidered shoulder pieces were two onyx stones engraved with the names of the twelve tribes—six on each shoulder.',
    christMeaning:
      'Typifies the Mighty One of whom Isaiah wrote, “the government shall be upon His shoulder,” bearing the perplexities, burdens, and care of His people.',
  },
  {
    id: 'breastplate',
    name: 'Breastplate of Judgment & Urim/Thummim',
    scripture: 'Exodus 28:15–30 · Revelation 3:5',
    description:
      'A square span of matching embroidered cloth set with twelve precious stones in four rows of three, each engraved with a tribe of Israel, and fitted with two brilliant stones—the Urim and Thummim—to inquire of God.',
    christMeaning:
      'Called the “breastplate of judgment,” it points to Christ bearing His people over His heart before the Father, confessing each overcomer’s name in the book of life.',
  },
  {
    id: 'miter-plate',
    name: 'White Miter & “Holiness to Jehovah” Plate',
    scripture: 'Exodus 28:36–38 · Hebrews 7:26',
    description:
      'A white linen turban crowned on the forehead with a plate of pure gold fastened by a blue lace and engraved with the words “HOLINESS TO JEHOVAH.”',
    christMeaning:
      'Signifies our holy, harmless, undefiled High Priest who alone bears the iniquity of the holy things and presents His people faultless before God.',
  },
];

export const RANKS = [
  { name: 'Sanctuary Seeker', minXp: 0, description: 'Beginning the study of the sanctuary pattern.' },
  { name: 'Court Explorer', minXp: 100, description: 'Tracing sacrifice and cleansing in the outer court.' },
  { name: 'Holy Place Investigator', minXp: 200, description: 'Studying light, daily bread, and intercessory prayer.' },
  { name: 'Priesthood Apprentice', minXp: 300, description: 'Understanding Christ’s continual priestly mediation.' },
  { name: 'Atonement Scholar', minXp: 400, description: 'Connecting the annual feasts and Day of Atonement.' },
  { name: 'Sanctuary Master', minXp: 500, description: 'Tracing the whole plan of redemption to restoration.' },
] as const;

export function getRankForXp(xp: number) {
  const index = Math.min(RANKS.length - 1, Math.floor(xp / 100));
  return RANKS[index];
}

export const LESSONS: Lesson[] = [
  {
    id: 0,
    title: 'Light in the Darkness',
    tag: 'The promise of redemption',
    category: 'Foundations',
    reading: 'Chapter 1 — Light in the Darkness (pp. 6–9)',
    pdfPage: 6,
    image: HERO_IMAGE,
    imageAlt: 'The wilderness tabernacle under a twilight sky with warm lantern light at the gate',
    body: [
      'Our sanctuary journey begins before the tabernacle was built. Haskell traces the promise of redemption back to humanity’s fall at the gate of Eden, where God placed a compass of hope in Genesis 3:15.',
      'Across the Bible, Haskell highlights three interconnected temples—the heavenly temple where Christ intercedes, the earthly sanctuary built as an object lesson, and the temple of the human body.',
    ],
    haskellExcerpt: {
      quote:
        'The earthly sanctuary with its types and symbols is like the powerful lenses of the telescope, which make it possible to view heavenly bodies that otherwise would be invisible... Like the lenses of the telescope, they reveal wondrous beauties in the character of our blessed Redeemer, beauties that are revealed in no other way.',
      citation: 'Chapter 1 — Light in the Darkness, p. 8',
    },
    typeAntitype: [
      {
        typeRef: 'Genesis 3:15 · Revelation 13:8',
        typeText: 'The Edenic promise and first lamb confession pointed to the Seed of the woman.',
        antitypeRef: 'John 1:9 · Hebrews 2:14',
        antitypeText: 'Christ, the Lamb slain from the foundation of the world, brings light and deliverance from death.',
      },
      {
        typeRef: 'Hebrews 8:5 · Hebrews 9:23',
        typeText: 'The earthly tabernacle served as “the example and shadow of heavenly things.”',
        antitypeRef: 'Hebrews 8:2 · Revelation 11:19',
        antitypeText: 'In heaven stands “the true tabernacle, which the Lord pitched, and not man.”',
      },
      {
        typeRef: 'Exodus 25:8 · Psalms 102:19',
        typeText: 'God dwelt visibly in the earthly sanctuary to teach sinners how to approach Him.',
        antitypeRef: '1 Corinthians 6:19 · Ephesians 3:17',
        antitypeText: 'The consecrated believer becomes an earthly dwelling-place for God’s Spirit.',
      },
    ],
    verses: [
      {
        ref: 'Genesis 3:15',
        focus: 'The first gospel promise after the fall',
        excerpt: 'And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.',
      },
      {
        ref: 'Genesis 3:21',
        focus: 'Garments of skin provided by God',
        excerpt: 'Unto Adam also and to his wife did the LORD God make coats of skins, and clothed them.',
      },
      {
        ref: 'Hebrews 11:4',
        focus: 'Abel’s sacrifice offered in faith',
        excerpt: 'By faith Abel offered unto God a more excellent sacrifice than Cain, by which he obtained witness that he was righteous.',
      },
    ],
    challenge: 'Why does the sanctuary story begin with the promise of redemption instead of with the building of the tabernacle?',
    quiz: [
      {
        q: 'Where does Haskell trace the first promise of redemption?',
        a: ['Mount Sinai', 'The Garden of Eden', 'The temple in Jerusalem'],
        correct: 1,
        ex: 'Genesis 3:15 introduces the promise after the fall.',
      },
      {
        q: 'What central theme does Haskell emphasize in the sanctuary symbols?',
        a: ['Human achievement', 'Political power', 'Christ and the plan of redemption'],
        correct: 2,
        ex: 'Haskell frames sanctuary types and symbols as pointing to Christ.',
      },
    ],
  },
  {
    id: 1,
    title: 'The Sanctuary: God Dwelling With Us',
    tag: 'Why build a sanctuary?',
    category: 'Foundations',
    reading: 'Chapters 2 & 3 — The Tabernacle & History of the Sanctuary (pp. 10–15)',
    pdfPage: 10,
    image: HERO_IMAGE,
    imageAlt: 'The tabernacle set in the center of the Israelite encampment at dusk',
    body: [
      'God told Israel: “Let them make me a sanctuary; that I may dwell among them.” Haskell describes the four coverings, rainbow-tinted entrance curtain, and guiding pillar of cloud and fire as a living “kindergarten” object lesson after Egyptian bondage.',
      'From Sinai to Gilgal, Shiloh, Nob, Gibeon, and Solomon’s, Zerubbabel’s, and Herod’s temples, the two-apartment structure shadowed the two great phases of Christ’s work in heaven.',
    ],
    haskellExcerpt: {
      quote:
        'Because they could not grasp the truths without the simple illustrations, God gave them the system of worship that Abraham, Isaac, and Jacob had followed, but in kindergarten form... This sanctuary was a shadow, or model, of the heavenly sanctuary.',
      citation: 'Chapter 3 — History of the Sanctuary, p. 13',
    },
    typeAntitype: [
      {
        typeRef: 'Hebrews 8:1–5',
        typeText: 'The earthly sanctuary was built after the divine pattern as a shadow of the heavenly sanctuary.',
        antitypeRef: 'Revelation 11:19',
        antitypeText: 'There is a real temple of God in heaven revealed in prophetic vision.',
      },
      {
        typeRef: 'Hebrews 9:1–3',
        typeText: 'The worldly sanctuary was divided by veils into two distinct apartments.',
        antitypeRef: 'Hebrews 9:24',
        antitypeText: 'The heavenly sanctuary encompasses two phases of Christ’s mediatorial ministry.',
      },
      {
        typeRef: 'Exodus 26:36 · Exodus 40:38',
        typeText: 'A curtain of blue, purple, scarlet, and linen guarded the entrance beneath the pillar of cloud.',
        antitypeRef: 'Revelation 4:2–4 · Psalms 91:1',
        antitypeText: 'A rainbow of glory encircles the Father’s throne, sheltering His faithful people.',
      },
    ],
    verses: [
      {
        ref: 'Exodus 25:8–9',
        focus: 'The purpose and heavenly pattern',
        excerpt: 'And let them make me a sanctuary; that I may dwell among them. According to all that I shew thee, after the pattern of the tabernacle, and the pattern of all the instruments thereof, even so shall ye make it.',
      },
      {
        ref: 'Hebrews 8:1–5',
        focus: 'A shadow of heavenly realities',
        excerpt: 'Who serve unto the example and shadow of heavenly things, as Moses was admonished of God when he was about to make the tabernacle.',
      },
      {
        ref: 'Exodus 40:34–38',
        focus: 'The glory of the Lord fills the tabernacle',
        excerpt: 'Then a cloud covered the tent of the congregation, and the glory of the LORD filled the tabernacle.',
      },
    ],
    challenge: 'What does God’s desire to dwell among His people reveal about His character?',
    quiz: [
      {
        q: 'What reason does Exodus 25:8 give for building the sanctuary?',
        a: ['To store the tribes’ wealth', 'That God may dwell among them', 'To establish a royal palace'],
        correct: 1,
        ex: 'The sanctuary was a sign of God’s dwelling among His people.',
      },
      {
        q: 'Hebrews 8 connects the earthly sanctuary with what?',
        a: ['A pattern of heavenly things', 'A military camp', 'A market'],
        correct: 0,
        ex: 'Hebrews 8:5 describes the earthly service as a copy and shadow.',
      },
    ],
  },
  {
    id: 2,
    title: 'Explore the Courtyard',
    tag: 'The first approach',
    category: 'Courtyard',
    reading: 'Chapter 25 — The Court and Its Services (pp. 77–79)',
    pdfPage: 77,
    image: COURTYARD_IMAGE,
    imageAlt: 'The outer courtyard featuring the bronze altar of burnt offering and bronze laver',
    body: [
      'Enclosed by fine linen curtains half the height of the tabernacle—100 cubits long by 50 cubits wide—the outer court held the brazen altar of burnt offering and the polished bronze laver.',
      'Haskell notes that every sacrifice was slain in the court, never inside the tent itself, because the courtyard typifies this earth—the place where Christ offered Himself before ascending to heaven.',
    ],
    haskellExcerpt: {
      quote:
        'As the one outside the court, in order to behold the glories of the tabernacle, had to look above the court; so the one who by faith beholds the beauties of the heavenly sanctuary, must lift his thoughts above the things of this earth, and center them upon heavenly things.',
      citation: 'Chapter 25 — The Court and Its Services, p. 77',
    },
    typeAntitype: [
      {
        typeRef: 'Exodus 27:9–18 · Leviticus 4:4',
        typeText: 'There was a court surrounding the tabernacle, in which the offerings were slain.',
        antitypeRef: 'John 12:31–33',
        antitypeText: 'The great antitypical Offering was slain in the antitypical court—this earth.',
      },
      {
        typeRef: 'Leviticus 6:10',
        typeText: 'The priest was attired in priestly garments when he placed the ashes beside the altar.',
        antitypeRef: 'Hebrews 2:17',
        antitypeText: 'Christ is High Priest to make reconciliation for the sins of the people.',
      },
      {
        typeRef: 'Leviticus 6:10–11',
        typeText: 'Laying aside priestly robes for other garments, the priest carried the ashes to a clean place.',
        antitypeRef: 'Malachi 4:1–3 · Revelation 19:14–16',
        antitypeText: 'Christ lays aside priestly robes to return as King, leaving only ashes of sin on the new earth.',
      },
    ],
    verses: [
      {
        ref: 'Exodus 27:1–8',
        focus: 'Dimensions and construction of the courtyard altar',
        excerpt: 'And thou shalt make an altar of shittim wood, five cubits long, and five cubits broad; the altar shall be foursquare: and the height thereof shall be three cubits.',
      },
      {
        ref: 'Exodus 30:17–21',
        focus: 'The bronze laver between the tent and altar',
        excerpt: 'Thou shalt also make a laver of brass, and his foot also of brass, to wash withal: and thou shalt put it between the tabernacle of the congregation and the altar.',
      },
      {
        ref: 'John 1:29',
        focus: 'The Lamb of God',
        excerpt: 'The next day John seeth Jesus coming unto him, and saith, Behold the Lamb of God, which taketh away the sin of the world.',
      },
    ],
    challenge: 'Why might sacrifice and cleansing be the first lessons encountered in the courtyard?',
    quiz: [
      {
        q: 'Which major object stood in the courtyard?',
        a: ['Altar of burnt offering', 'Ark of the covenant', 'Showbread table'],
        correct: 0,
        ex: 'The altar of burnt offering was in the courtyard.',
      },
      {
        q: 'What did the laver provide for the priests?',
        a: ['A place to wash', 'A place to store grain', 'A throne'],
        correct: 0,
        ex: 'Priests washed at the laver before ministering.',
      },
    ],
  },
  {
    id: 3,
    title: 'The Altar of Sacrifice',
    tag: 'The cost of redemption',
    category: 'Courtyard',
    reading: 'Chapters 17–23 — The Offerings (pp. 53–71)',
    pdfPage: 53,
    image: COURTYARD_IMAGE,
    imageAlt: 'Warm embers and flame upon the bronze altar in the sanctuary courtyard',
    body: [
      'Haskell devotes seven chapters to the distinct offerings—sin, burnt, drink, meat (grain), trespass, red heifer, and peace offerings—showing that each reveals a unique facet of Christ’s sacrifice and the sinner’s consecration.',
      'Even the poorest worshipper unable to afford a lamb or doves could bring a handful of fine flour, and hear the priest’s assurance: “His sin shall be forgiven him.”',
    ],
    haskellExcerpt: {
      quote:
        'In none of the types was the individual worshiper brought into so close touch with the sanctuary service as in the sin-offering... In every sin-offering two things were essential on the part of the sinner: first, to realize his own sinfulness before God... second, to see by faith beyond his offering, the Son of God.',
      citation: 'Chapter 17 — The Sin-Offering, pp. 53–54',
    },
    typeAntitype: [
      {
        typeRef: 'Leviticus 4:3, 23, 28',
        typeText: 'Every sacrificial animal was required to be without blemish.',
        antitypeRef: '1 Peter 1:19',
        antitypeText: 'Christ offered Himself as “a lamb without blemish and without spot.”',
      },
      {
        typeRef: 'Leviticus 4:29 · Numbers 5:7',
        typeText: 'The sinner laid hands on the offering’s head, confessed, and slew it with his own hands.',
        antitypeRef: 'Isaiah 53:10 · 1 John 1:9',
        antitypeText: 'Christ’s soul was made an offering for sin; confession brings faithful forgiveness.',
      },
      {
        typeRef: 'Leviticus 1:9',
        typeText: 'The whole burnt-offering was consumed upon the altar as a sweet savor unto the Lord.',
        antitypeRef: 'Ephesians 5:2 · Romans 12:1',
        antitypeText: 'Christ gave Himself a sweet-smelling sacrifice, calling believers to be living sacrifices.',
      },
      {
        typeRef: 'Leviticus 7:15–18',
        typeText: 'Peace-offering flesh could be eaten on the first and second days, never on the third day.',
        antitypeRef: '1 Corinthians 15:3–4 · Matthew 28:6',
        antitypeText: 'Christ lay in the grave the first and second days, and rose alive on the third day.',
      },
    ],
    verses: [
      {
        ref: 'Leviticus 1',
        focus: 'The burnt offering without blemish',
        excerpt: 'He shall offer it of his own voluntary will at the door of the tabernacle of the congregation before the LORD. And he shall put his hand upon the head of the burnt offering.',
      },
      {
        ref: 'John 1:29',
        focus: 'Christ identified as the true Lamb',
        excerpt: 'Behold the Lamb of God, which taketh away the sin of the world.',
      },
      {
        ref: 'Hebrews 10:1–10',
        focus: 'Shadow versus once-for-all offering',
        excerpt: 'For the law having a shadow of good things to come... we are sanctified through the offering of the body of Jesus Christ once for all.',
      },
    ],
    challenge: 'Explain how the sacrifice points toward Jesus, using at least two Bible texts.',
    quiz: [
      {
        q: 'John the Baptist identifies Jesus as:',
        a: ['The temple builder', 'The Lamb of God', 'The high priest of Israel’s first temple'],
        correct: 1,
        ex: 'John 1:29 calls Jesus the Lamb of God.',
      },
      {
        q: 'Hebrews 10 describes sacrifices as:',
        a: ['The final solution for sin', 'A shadow of good things to come', 'Unrelated to Christ'],
        correct: 1,
        ex: 'Hebrews explains the shadow and fulfillment relationship.',
      },
    ],
  },
  {
    id: 4,
    title: 'The Laver: Cleansing',
    tag: 'Wash and be renewed',
    category: 'Courtyard',
    reading: 'Chapter 24 — Cleansing of the Leper & Chapter 25 — The Laver (pp. 72–75, 79)',
    pdfPage: 72,
    image: COURTYARD_IMAGE,
    imageAlt: 'The polished bronze laver reflecting twilight water in the outer court',
    body: [
      'Positioned between the brazen altar and the tabernacle entrance, the bronze laver demanded ceremonial washing under penalty of death before any priest approached the altar or entered the Holy Place.',
      'Haskell connects this courtyard washing with the cleansing of the leper (Leviticus 14)—two birds, cedar wood, scarlet wool, and hyssop over running water, followed by consecrating ear, hand, and foot.',
    ],
    haskellExcerpt: {
      quote:
        'As the people in the court beheld the priests wash in the water before they performed the work of the holy office, may it not have taught them the truth that Christ gave to Nicodemus, “Except a man be born of water and of the Spirit, he cannot enter into the kingdom of God”?',
      citation: 'Chapter 25 — The Court and Its Services, p. 79',
    },
    typeAntitype: [
      {
        typeRef: 'Exodus 30:17–21',
        typeText: 'Priests washed both hands and feet at the bronze laver before entering the tabernacle.',
        antitypeRef: 'John 3:5 · Ephesians 5:26',
        antitypeText: 'New birth of water and the Spirit, cleansing the church by the washing of the Word.',
      },
      {
        typeRef: 'Leviticus 14:6–7',
        typeText: 'Blood was sprinkled seven times on the leper; the live bird dipped in blood flew through the air.',
        antitypeRef: '1 Peter 1:2 · Revelation 21:1',
        antitypeText: 'The sprinkling of Jesus’ blood cleanses the sinner and promises a restored new earth.',
      },
      {
        typeRef: 'Leviticus 14:14, 17',
        typeText: 'Blood and oil were placed on the tip of the right ear, right thumb, and great toe of the right foot.',
        antitypeRef: 'Psalm 119:48 · Genesis 17:1',
        antitypeText: 'Ears, hands, and walk are consecrated to God’s service by the anointing of the Holy Spirit.',
      },
    ],
    verses: [
      {
        ref: 'Exodus 30:17–21',
        focus: 'Washing hands and feet before entering the tent',
        excerpt: 'When they go into the tabernacle of the congregation, they shall wash with water, that they die not.',
      },
      {
        ref: 'Psalm 51:1–10',
        focus: 'Inward cleansing and renewal of heart',
        excerpt: 'Create in me a clean heart, O God; and renew a right spirit within me.',
      },
      {
        ref: 'John 13:1–10',
        focus: 'Jesus washing the disciples’ feet',
        excerpt: 'If I wash thee not, thou hast no part with me.',
      },
    ],
    challenge: 'What is the difference between being forgiven and allowing God to renew our hearts?',
    quiz: [
      {
        q: 'What was the laver used for?',
        a: ['Washing', 'Burning incense', 'Displaying the law'],
        correct: 0,
        ex: 'The priests washed at the laver.',
      },
      {
        q: 'Psalm 51 asks God for:',
        a: ['A new heart and right spirit', 'A new kingdom', 'A new altar'],
        correct: 0,
        ex: 'David prays for inward cleansing and renewal.',
      },
    ],
  },
  {
    id: 5,
    title: 'The Holy Place',
    tag: 'Light, bread and prayer',
    category: 'Holy Place',
    reading: 'Chapters 5–7 — Candlestick, Showbread & Altar of Incense (pp. 20–27)',
    pdfPage: 20,
    image: HOLY_PLACE_IMAGE,
    imageAlt: 'Inside the Holy Place showing the golden lampstand, table of showbread, and incense altar',
    body: [
      'Inside the first apartment stood three golden furnishings: the seven-branched candlestick beaten from a single talent of gold on the south, the table of twelve unleavened loaves on the north, and the golden altar of incense directly before the veil.',
      'Haskell highlights how the hot showbread placed fresh every Sabbath day and eaten by the priests illustrates feeding personally on God’s living Word, while fragrant incense represents Christ’s righteousness mingled with prayer.',
    ],
    haskellExcerpt: {
      quote:
        'Eternal life does not come to the soul through forms and ceremonies. They are all right in their place; but eternal life results from feeding upon the true bread which comes from the presence of God, — God’s Holy Word, the blessed Bible.',
      citation: 'Chapter 6 — The Table of Showbread, p. 24',
    },
    typeAntitype: [
      {
        typeRef: 'Exodus 25:37 · 40:24–25',
        typeText: 'The golden candlestick with seven lamps burned continually on the south side.',
        antitypeRef: 'Revelation 1:12 · 4:2, 5',
        antitypeText: 'Christ walks among the seven golden candlesticks with the seven Spirits of God before His throne.',
      },
      {
        typeRef: 'Exodus 25:30 · Leviticus 24:5',
        typeText: 'Twelve cakes of showbread—one for each tribe—remained ever before the Lord.',
        antitypeRef: 'John 6:48 · 1 Corinthians 10:17',
        antitypeText: 'Christ is the Bread of Life, uniting His church as “one bread, and one body.”',
      },
      {
        typeRef: 'Exodus 30:1–3, 7–8',
        typeText: 'The golden altar stood before the veil where the high priest burned incense morning and evening.',
        antitypeRef: 'Revelation 8:3–4',
        antitypeText: 'At heaven’s golden altar, much incense of Christ’s righteousness ascends with the prayers of saints.',
      },
    ],
    verses: [
      {
        ref: 'Exodus 25:23–40',
        focus: 'The table of showbread and seven-branched lampstand',
        excerpt: 'And thou shalt set upon the table shewbread before me alway. And thou shalt make a candlestick of pure gold.',
      },
      {
        ref: 'Exodus 30:1–10',
        focus: 'The golden altar of incense before the veil',
        excerpt: 'And Aaron shall burn thereon sweet incense every morning: when he dresseth the lamps, he shall burn incense upon it.',
      },
      {
        ref: 'John 6:35',
        focus: 'Jesus as the Bread of Life',
        excerpt: 'And Jesus said unto them, I am the bread of life: he that cometh to me shall never hunger.',
      },
      {
        ref: 'John 8:12',
        focus: 'Jesus as the Light of the World',
        excerpt: 'Then spake Jesus again unto them, saying, I am the light of the world: he that followeth me shall not walk in darkness.',
      },
    ],
    challenge: 'What do the bread, light and incense suggest about the spiritual life? Ground your answer in Scripture.',
    quiz: [
      {
        q: 'Which items were in the Holy Place?',
        a: ['Ark and mercy seat only', 'Lampstand, bread table and incense altar', 'Laver and altar only'],
        correct: 1,
        ex: 'These three furnishings were in the Holy Place.',
      },
      {
        q: 'Jesus describes Himself in John 8:12 as:',
        a: ['The light of the world', 'A golden lampstand', 'The altar'],
        correct: 0,
        ex: 'Jesus says He is the light of the world.',
      },
    ],
  },
  {
    id: 6,
    title: 'The Ark and Mercy Seat',
    tag: 'Law and mercy',
    category: 'Most Holy',
    reading: 'Chapter 4 — The Ark (pp. 17–18)',
    pdfPage: 17,
    image: MOST_HOLY_IMAGE,
    imageAlt: 'The golden Ark of the Covenant and cherubim overshadowing the mercy seat',
    body: [
      'God’s first architectural command to Moses was for the Ark of the Covenant (2.5 × 1.5 × 1.5 cubits), housing nothing save the two tables of stone—the moral law whose transgression made every sacrifice necessary.',
      'Over that broken law God placed a solid gold mercy seat shadowed by beaten-gold cherubim and the Shekinah glory, revealing a throne where justice and pardoning mercy meet.',
    ],
    haskellExcerpt: {
      quote:
        'The ark was the central figure of the entire sanctuary. The broken law contained in the ark was the only reason for all the sacrificial services, both typical and antitypical... There is great consolation in the fact that the Lord Himself covered the broken law with a mercy-seat; and then He, the merciful God, took His position upon that seat.',
      citation: 'Chapter 4 — The Ark, p. 17',
    },
    typeAntitype: [
      {
        typeRef: 'Exodus 26:33',
        typeText: 'The ark was placed behind the inner veil in the most holy place.',
        antitypeRef: 'Revelation 11:19',
        antitypeText: 'The ark of God’s testament was seen within His opened heavenly sanctuary.',
      },
      {
        typeRef: 'Exodus 25:21–22',
        typeText: 'God’s visible presence was manifested above the mercy-seat between the cherubim.',
        antitypeRef: 'Exodus 34:5–7 · Hebrews 4:16',
        antitypeText: 'The Lord proclaims His name as Merciful, Gracious, and Longsuffering at the throne of grace.',
      },
      {
        typeRef: 'Exodus 31:18 · Leviticus 16:15',
        typeText: 'Tables of stone lay inside the ark while atoning blood was sprinkled above the mercy-seat.',
        antitypeRef: 'Galatians 3:13 · Romans 3:21',
        antitypeText: 'Christ’s blood frees believers from the condemnation of the broken law while upholding its righteousness.',
      },
    ],
    verses: [
      {
        ref: 'Exodus 25:10–22',
        focus: 'The ark, testimony, mercy seat, and cherubim',
        excerpt: 'And thou shalt put into the ark the testimony which I shall give thee. And thou shalt make a mercy seat of pure gold... And there I will meet with thee.',
      },
      {
        ref: 'Psalm 40:8',
        focus: 'God’s law within the heart',
        excerpt: 'I delight to do thy will, O my God: yea, thy law is within my heart.',
      },
      {
        ref: 'Hebrews 4:14–16',
        focus: 'Approaching the throne of grace boldly',
        excerpt: 'Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.',
      },
    ],
    challenge: 'How do law and mercy fit together in the sanctuary picture?',
    quiz: [
      {
        q: 'What was placed inside the ark according to Exodus 25?',
        a: ['The testimony', 'The lampstand', 'The laver'],
        correct: 0,
        ex: 'The testimony was placed inside the ark.',
      },
      {
        q: 'Hebrews 4 invites believers to approach God’s throne for:',
        a: ['Grace and mercy', 'Earthly riches', 'Political authority'],
        correct: 0,
        ex: 'We approach for mercy and grace in time of need.',
      },
    ],
  },
  {
    id: 7,
    title: 'The Priesthood',
    tag: 'Representing and serving',
    category: 'Ministry & Prophecy',
    reading: 'Chapters 8–12 — Christ Our High Priest & Garments (pp. 29–38)',
    pdfPage: 29,
    image: HOLY_PLACE_IMAGE,
    imageAlt: 'Sacred sanctuary interior illuminated for continual priestly service',
    body: [
      'Haskell contrasts the temporary Levitical order (divided into twenty-four courses) with Christ’s eternal Melchizedek priesthood: after shedding His blood in this earthly court, He entered “within the veil” as our Forerunner.',
      'In Chapter 12, every detail of the high priest’s sacred garments—from the seamless white linen robe to the twelve tribal stones on his breastplate—prefigures Christ confessing our names before His Father.',
    ],
    haskellExcerpt: {
      quote:
        'There is a touching significance in the high priest’s wearing the names of all Israel on his shoulders and over his heart as he performed the work which typified the judgment, when the case of every one will come up in review before God... Those names engraved on the stones were a type of the names of the overcomers, which Christ will confess before His Father and the angels.',
      citation: 'Chapter 12 — Garments of the Priests, p. 38',
    },
    typeAntitype: [
      {
        typeRef: 'Exodus 28:1–2 · 29:29',
        typeText: 'Aaron was called of God, and the earthly priesthood passed from father to son.',
        antitypeRef: 'Hebrews 3:1–3 · 7:23–24',
        antitypeText: 'Christ was appointed by God after the order of Melchizedek and lives forever.',
      },
      {
        typeRef: '1 Chronicles 24:1–19',
        typeText: 'The Levitical priests were divided into twenty-four courses with a chief over each course.',
        antitypeRef: 'Revelation 4:4 · 5:8–10',
        antitypeText: 'John beheld twenty-four elders seated around God’s throne singing the song of redemption.',
      },
      {
        typeRef: 'Exodus 28:32',
        typeText: 'The priestly robe was woven all of one piece.',
        antitypeRef: 'John 19:23',
        antitypeText: 'Christ’s earthly garment was woven from the top throughout in one piece.',
      },
      {
        typeRef: 'Exodus 28:15–21',
        typeText: 'The breastplate of judgment bore the twelve tribes’ names over the high priest’s heart.',
        antitypeRef: 'Revelation 3:5',
        antitypeText: 'Christ confesses the names of overcomers before the Father and keeps them in the book of life.',
      },
    ],
    verses: [
      {
        ref: 'Exodus 28–29',
        focus: 'Sacred garments for glory and beauty',
        excerpt: 'And thou shalt make holy garments for Aaron thy brother for glory and for beauty.',
      },
      {
        ref: 'Hebrews 4:14–16',
        focus: 'A compassionate High Priest touched with our infirmities',
        excerpt: 'For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin.',
      },
      {
        ref: 'Hebrews 7:23–28',
        focus: 'An unchangeable, eternal priesthood',
        excerpt: 'Wherefore he is able also to save them to the uttermost that come unto God by him, seeing he ever liveth to make intercession for them.',
      },
    ],
    challenge: 'What makes Jesus a uniquely qualified High Priest?',
    quiz: [
      {
        q: 'What does Hebrews emphasize about Jesus as High Priest?',
        a: ['He understands our weaknesses', 'He is distant from humanity', 'He needs repeated sacrifices'],
        correct: 0,
        ex: 'Hebrews presents Jesus as compassionate and sinless.',
      },
      {
        q: 'Priestly garments in Exodus were described as:',
        a: ['For glory and beauty', 'For military disguise', 'For ordinary farming'],
        correct: 0,
        ex: 'Exodus 28 describes garments for glory and beauty.',
      },
    ],
  },
  {
    id: 8,
    title: 'The Daily Ministry',
    tag: 'A continual ministry',
    category: 'Ministry & Prophecy',
    reading: 'Chapter 26 — The Work in the First Apartment of the Sanctuary (pp. 80–81)',
    pdfPage: 80,
    image: HOLY_PLACE_IMAGE,
    imageAlt: 'Incense ascending before the veil during the continual daily sanctuary service',
    body: [
      'Each morning and evening, while priests offered the continual burnt, meat, and drink offerings in the court and the multitude prayed outside, the high priest trimmed the seven lamps and renewed fragrant incense on the golden altar.',
      'Day by day, confessed sins were transferred in figure into the first apartment via the sprinkled blood or eaten flesh—foreshadowing how forgiven sins are covered by Christ’s blood until their final removal.',
    ],
    haskellExcerpt: {
      quote:
        'Day by day, as sinners presented their sin-offerings at the door of the first apartment, confessing their sins, either by the blood sprinkled before the Lord or a portion of the flesh eaten in the first apartment, the confessed sins were transferred in type to the first apartment of the sanctuary... The sinner could not look within the sanctuary, but by faith he knew that the priest was faithful.',
      citation: 'Chapter 26 — Work in the First Apartment, p. 80',
    },
    typeAntitype: [
      {
        typeRef: 'Exodus 30:7–8 · 40:24–25',
        typeText: 'The high priest trimmed and lighted the seven lamps morning and evening before the Lord.',
        antitypeRef: 'Revelation 1:13 · 4:2, 5',
        antitypeText: 'Christ stands among the golden candlesticks while the seven Spirits burn before the throne.',
      },
      {
        typeRef: 'Hebrews 9:6',
        typeText: '“The priests went always into the first tabernacle, accomplishing the service of God.”',
        antitypeRef: 'Hebrews 7:25',
        antitypeText: 'Christ ever liveth in heaven to make continual intercession for all who come unto God by Him.',
      },
      {
        typeRef: 'Leviticus 4:7 · 10:16–18',
        typeText: 'By the blood and flesh of sin-offerings, sins were transferred in type to the sanctuary.',
        antitypeRef: '1 Peter 2:24 · Jeremiah 2:22',
        antitypeText: 'Christ bore our sins in His own body; confessed sins are forgiven and marked before the Lord.',
      },
      {
        typeRef: 'Numbers 18:7',
        typeText: 'None but the priests could look within the veil; all else of the sin-offering was hidden.',
        antitypeRef: 'Psalm 32:1',
        antitypeText: 'When we confess our sins, they are covered by Christ’s righteousness if we remain faithful.',
      },
    ],
    verses: [
      {
        ref: 'Exodus 29:38–46',
        focus: 'The continual morning and evening offering',
        excerpt: 'This shall be a continual burnt offering throughout your generations at the door of the tabernacle of the congregation before the LORD: where I will meet you.',
      },
      {
        ref: 'Hebrews 9:1–14',
        focus: 'First tabernacle service pointing to Christ’s blood',
        excerpt: 'How much more shall the blood of Christ, who through the eternal Spirit offered himself without spot to God, purge your conscience from dead works?',
      },
    ],
    challenge: 'Summarize the daily service and explain what Haskell sees it foreshadowing.',
    quiz: [
      {
        q: 'Exodus 29 describes:',
        a: ['Daily offerings', 'The Feast of Tabernacles only', 'The building of Solomon’s temple'],
        correct: 0,
        ex: 'The passage gives instructions for daily offerings.',
      },
      {
        q: 'Hebrews 9 discusses:',
        a: ['The sanctuary and its services', 'Only the Garden of Eden', 'A genealogy'],
        correct: 0,
        ex: 'Hebrews 9 explores sanctuary service and Christ.',
      },
    ],
  },
  {
    id: 9,
    title: 'The Annual Feasts',
    tag: 'A prophetic calendar',
    category: 'Ministry & Prophecy',
    reading: 'Chapters 13–16 (Springtime Feasts, pp. 40–50) & Chapters 28, 32 (pp. 87–89, 103–105)',
    pdfPage: 40,
    image: COURTYARD_IMAGE,
    imageAlt: 'The sanctuary court where Israel gathered for the appointed annual feasts',
    body: [
      'Unlike daily or voluntary offerings, the seven annual convocations of Leviticus 23 fell on fixed dates, making Israel’s sacred year both commemorative of deliverance from Egypt and prophetic of salvation history.',
      'Haskell traces the exact calendar fulfillment of the spring feasts—Crucifixion on Passover (14 Nisan), rest in the tomb on Unleavened Bread (15 Nisan), Resurrection on Firstfruits (16 Nisan), and Spirit outpouring at Pentecost—before turning to the autumn trumpet warning, Day of Atonement, and Tabernacles.',
    ],
    haskellExcerpt: {
      quote:
        'All the annual feasts were prophetic as well as typical. While the Passover lamb, slain each year, was a shadow of “Christ our Passover,” who was sacrificed for us, the fact that the lamb could be slain only on the fourteenth day of the month Abib, was a prophecy that the antitypical Passover Lamb would yield up His life for the sins of the world on the fourteenth day of Abib.',
      citation: 'Chapter 13 — The Passover, p. 43',
    },
    typeAntitype: [
      {
        typeRef: 'Exodus 12:6, 46',
        typeText: 'Passover lamb slain on the 14th of Abib between the two evenings; not a bone broken.',
        antitypeRef: 'John 19:14, 30–36',
        antitypeText: 'Jesus died at the ninth hour on the 14th of Nisan with not a bone broken.',
      },
      {
        typeRef: 'Leviticus 23:6–7 · Deut. 16:3',
        typeText: 'The 15th of Abib was a ceremonial sabbath; unleavened bread eaten seven days.',
        antitypeRef: 'Luke 23:54–56 · 1 Cor. 5:7–8',
        antitypeText: 'Christ rested in the tomb on the seventh-day Sabbath; believers walk in sincerity and truth.',
      },
      {
        typeRef: 'Leviticus 23:5–11',
        typeText: 'A handful of barley firstfruits was waved on the 16th of Abib, the third day after Passover.',
        antitypeRef: '1 Corinthians 15:20 · Matt. 27:52–53',
        antitypeText: 'Christ arose on the third day as the firstfruits, presenting resurrected saints in heaven.',
      },
      {
        typeRef: 'Leviticus 23:16 · Exodus 23:16',
        typeText: 'Pentecost celebrated fifty days after Firstfruits at the harvest with freewill offerings.',
        antitypeRef: 'Acts 2:1, 41, 44–45',
        antitypeText: 'The Holy Spirit descended on Pentecost, yielding three thousand souls as the harvest.',
      },
      {
        typeRef: 'Leviticus 23:24–27',
        typeText: 'Feast of Trumpets sounded throughout Israel, warning that the Day of Atonement was near.',
        antitypeRef: 'Revelation 14:6–7 · 1 Cor. 15:51–53',
        antitypeText: 'Heralds “the hour of His judgment is come” and anticipates the final trumpet call.',
      },
    ],
    verses: [
      {
        ref: 'Leviticus 23',
        focus: 'The appointed feasts of the Lord',
        excerpt: 'Concerning the feasts of the LORD, which ye shall proclaim to be holy convocations, even these are my feasts.',
      },
      {
        ref: '1 Corinthians 5:7–8',
        focus: 'Christ our Passover',
        excerpt: 'For even Christ our passover is sacrificed for us: therefore let us keep the feast.',
      },
      {
        ref: 'Colossians 2:16–17',
        focus: 'Shadow of things to come',
        excerpt: 'Which are a shadow of things to come; but the body is of Christ.',
      },
    ],
    challenge: 'Create a timeline of the feasts. What themes and connections to Christ can you find?',
    quiz: [
      {
        q: 'Where are Israel’s annual feasts outlined?',
        a: ['Leviticus 23', 'Genesis 1', 'Acts 2'],
        correct: 0,
        ex: 'Leviticus 23 outlines the appointed feasts.',
      },
      {
        q: 'Paul calls Christ:',
        a: ['Our Passover', 'Our laver', 'Our lampstand'],
        correct: 0,
        ex: '1 Corinthians 5:7 refers to Christ our Passover.',
      },
    ],
  },
  {
    id: 10,
    title: 'The Day of Atonement',
    tag: 'The solemn service',
    category: 'Most Holy',
    reading: 'Chapters 29 & 30 — The Day of Atonement & Duty of the Congregation (pp. 90–98)',
    pdfPage: 90,
    image: MOST_HOLY_IMAGE,
    imageAlt: 'The Most Holy Place where the high priest ministered on the Day of Atonement',
    body: [
      'On the tenth day of the seventh month, the high priest entered within the second veil with the blood of the Lord’s goat to cleanse the sanctuary from the year’s accumulated record of confessed sins, before placing them on the scapegoat (Azazel).',
      'In Chapter 30, Haskell pairs the high priest’s Most Holy Place work with four solemn duties for the congregation: gathering in holy convocation, afflicting the soul in prayer and self-control, wholehearted consecration, and laying aside worldly distractions.',
    ],
    haskellExcerpt: {
      quote:
        'In type and shadow the confessed sins of Israel had been transferred to the sanctuary during all the year; the cleansing of the sanctuary was the removing of those sins... The word “atonement” means at-one-ment; and when Christ pronounces the decree which determines the eternal destiny of every soul, He and the subjects of His kingdom are at-one-ment.',
      citation: 'Chapter 29 — The Day of Atonement, pp. 90, 93',
    },
    typeAntitype: [
      {
        typeRef: 'Leviticus 16:29–30',
        typeText: 'On the tenth day of the seventh month the earthly sanctuary was cleansed.',
        antitypeRef: 'Daniel 8:14',
        antitypeText: '“Unto two thousand and three hundred days; then shall the sanctuary be cleansed.”',
      },
      {
        typeRef: 'Leviticus 16:15–19',
        typeText: 'Sins were removed from the sanctuary by the blood of the Lord’s goat at the year’s end.',
        antitypeRef: 'Acts 3:19–20',
        antitypeText: 'Sins are blotted from heavenly records near the close of Christ’s work as High Priest.',
      },
      {
        typeRef: 'Leviticus 16:20–22',
        typeText: 'Having made an end of reconciling, the high priest laid Israel’s sins on the scapegoat into the wilderness.',
        antitypeRef: 'Revelation 22:11–12 · 20:1–3',
        antitypeText: 'Christ closes probation, returns sin upon Satan, and confines him for a thousand years.',
      },
      {
        typeRef: 'Leviticus 23:27–30',
        typeText: 'The congregation assembled, afflicted their souls with prayer and fasting, and ceased from labor.',
        antitypeRef: 'Hebrews 10:25 · Luke 21:34–36',
        antitypeText: 'Believers forsake not worship, exercise self-control, and guard against worldly cares.',
      },
    ],
    verses: [
      {
        ref: 'Leviticus 16',
        focus: 'Entering within the veil to cleanse the sanctuary',
        excerpt: 'And he shall make an atonement for the holy place, because of the uncleanness of the children of Israel, and because of their transgressions in all their sins.',
      },
      {
        ref: 'Leviticus 23:26–32',
        focus: 'A solemn day of affliction of soul and atonement',
        excerpt: 'For on that day shall the priest make an atonement for you, to cleanse you, that ye may be clean from all your sins before the LORD.',
      },
      {
        ref: 'Hebrews 9:23–28',
        focus: 'Christ appearing to put away sin by His sacrifice',
        excerpt: 'So Christ was once offered to bear the sins of many; and unto them that look for him shall he appear the second time without sin unto salvation.',
      },
    ],
    challenge: 'Walk through the Day of Atonement service step-by-step from Leviticus 16.',
    quiz: [
      {
        q: 'Which chapter describes the Day of Atonement service in detail?',
        a: ['Leviticus 16', 'Exodus 3', 'Acts 15'],
        correct: 0,
        ex: 'Leviticus 16 gives detailed instructions for the service.',
      },
      {
        q: 'Who entered the Most Holy Place in the annual service?',
        a: ['The high priest', 'Every Israelite', 'The king'],
        correct: 0,
        ex: 'The high priest performed the specified service.',
      },
    ],
  },
  {
    id: 11,
    title: 'The Heavenly Sanctuary',
    tag: 'Christ our High Priest',
    category: 'Most Holy',
    reading: 'Chapter 8 (pp. 29–30) & Chapter 27 — A Wonderful Prophecy (pp. 82–85)',
    pdfPage: 82,
    image: MOST_HOLY_IMAGE,
    imageAlt: 'Luminous golden Ark illuminated from above, pointing to the heavenly sanctuary',
    body: [
      'Explore the New Testament witness to Christ’s ministry in heaven itself alongside Haskell’s exposition of Daniel 8:14 and Daniel 9:24–27—the 70-week prophecy cut off from the 2,300-day timeline.',
      'As Daniel 9 anchors Christ’s baptism (A.D. 27), crucifixion in the midst of the 70th week, and gospel call to the Gentiles (A.D. 34), the remaining 1,810 years extend to 1844, when Haskell locates the opening of the investigative judgment in the heavenly Most Holy Place.',
    ],
    haskellExcerpt: {
      quote:
        'God is a God of justice, and before either the sins of the faithful or the names of the unfaithful are blotted from the books of heaven, there will be an examination of the records, — an investigative judgment... The coming of Christ and His death on Calvary, like a great seal, fixes definitely the entire prophecy.',
      citation: 'Chapter 27 — A Wonderful Prophecy, pp. 82, 85',
    },
    typeAntitype: [
      {
        typeRef: 'Hebrews 9:6–7 · Leviticus 16:15',
        typeText: 'Earthly priests ministered daily in the first apartment, and the high priest entered the second once a year.',
        antitypeRef: 'Hebrews 6:19–20 · 9:24',
        antitypeText: 'Christ entered heaven itself as our Forerunner to appear in God’s presence for us.',
      },
      {
        typeRef: 'Exodus 40:9',
        typeText: 'The earthly tabernacle was anointed before the Levitical service began.',
        antitypeRef: 'Daniel 9:24 · Luke 3:21–22',
        antitypeText: 'At Christ’s baptism (A.D. 27), Messiah the Prince was anointed and the heavenly sanctuary inaugurated.',
      },
      {
        typeRef: 'Leviticus 16:30 · Daniel 8:14',
        typeText: 'The earthly cleansing of the sanctuary marked the close of the sacred year’s record.',
        antitypeRef: 'Daniel 7:9–10 · Daniel 8:14',
        antitypeText: 'At the close of the 2,300 prophetic days (1844), the judgment convened before the Ancient of Days.',
      },
    ],
    verses: [
      {
        ref: 'Hebrews 8:1–2',
        focus: 'Minister of the true tabernacle pitched by the Lord',
        excerpt: 'We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; a minister of the sanctuary, and of the true tabernacle.',
      },
      {
        ref: 'Hebrews 9:24',
        focus: 'Christ entered heaven itself for us',
        excerpt: 'For Christ is not entered into the holy places made with hands, which are the figures of the true; but into heaven itself, now to appear in the presence of God for us.',
      },
      {
        ref: 'Revelation 11:19',
        focus: 'The temple of God opened in heaven',
        excerpt: 'And the temple of God was opened in heaven, and there was seen in his temple the ark of his testament.',
      },
    ],
    challenge: 'What does the New Testament explicitly say about Christ’s ministry in heaven?',
    quiz: [
      {
        q: 'Hebrews describes Christ as ministering in:',
        a: ['The true tabernacle', 'The Roman temple', 'A human palace'],
        correct: 0,
        ex: 'Hebrews 8 describes the true tabernacle.',
      },
      {
        q: 'Hebrews 9:24 says Christ entered:',
        a: ['Heaven itself', 'The wilderness', 'A city gate'],
        correct: 0,
        ex: 'Christ appears in the presence of God for us.',
      },
    ],
  },
  {
    id: 12,
    title: 'Judgment and Restoration',
    tag: 'The story reaches its horizon',
    category: 'Ministry & Prophecy',
    reading: 'Chapters 31–34 — Judgment, Tabernacles, Jubilee & Cities of Refuge (pp. 99–114)',
    pdfPage: 99,
    image: HERO_IMAGE,
    imageAlt: 'The tabernacle under the wide starry horizon pointing to final restoration',
    body: [
      'Haskell brings the sanctuary story to its horizon through four closing pictures: the Three Books of Judgment (Life, Remembrance, Death), the joyful Feast of Tabernacles, the liberating fiftieth-year Jubilee, and the six Cities of Refuge.',
      'Together they trace redemption from our immediate flight to Christ our Refuge today to the final Jubilee trumpet, when our Kinsman-Redeemer restores Eden’s lost home and dwells with humanity forever.',
    ],
    haskellExcerpt: {
      quote:
        'In the type, the jubilee was ushered in at the close of the Day of Atonement. In like manner we understand that the antitypical jubilee will follow the antitypical Day of Atonement... The earth restored to its primeval beauty will be given to the children of men for their eternal home.',
      citation: 'Chapter 33 — The Jubilee, p. 110',
    },
    typeAntitype: [
      {
        typeRef: 'Leviticus 23:27, 34, 40–42',
        typeText: 'The Feast of Tabernacles followed the Day of Atonement as Israel dwelt in leafy booths.',
        antitypeRef: 'Revelation 22:11–12 · 20:9',
        antitypeText: 'Soon after the judgment closes, Christ gathers His people into the “camp of the saints.”',
      },
      {
        typeRef: 'Leviticus 25:9–10, 13',
        typeText: 'At the Jubilee trumpet after the Day of Atonement, liberty was proclaimed and lands restored.',
        antitypeRef: '1 Thessalonians 4:16–17 · Isaiah 35:1–10',
        antitypeText: 'At the trumpet of the Lord, living and resurrected saints inherit the redeemed earth forever.',
      },
      {
        typeRef: 'Leviticus 25:48–49 · Ruth 2:20',
        typeText: 'Only one “nigh of kin” had the right to redeem an enslaved person or lost land.',
        antitypeRef: 'Hebrews 2:14–16 · Ephesians 1:14',
        antitypeText: 'Christ took flesh and blood as our Elder Brother to redeem both His people and the purchased earth.',
      },
      {
        typeRef: 'Joshua 20:2–6 · Numbers 35:26–28',
        typeText: 'Six Levitical cities of refuge sheltered the fleeing slayer until the death of the high priest.',
        antitypeRef: 'Hebrews 6:18 · Matthew 25:34',
        antitypeText: 'Believers flee to Christ our Refuge now; when His priestly work ends, the redeemed inherit the kingdom.',
      },
    ],
    verses: [
      {
        ref: 'Daniel 8:14',
        focus: 'The cleansing of the sanctuary',
        excerpt: 'And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed.',
      },
      {
        ref: 'Revelation 20–22',
        focus: 'Final judgment and the new creation',
        excerpt: 'And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away.',
      },
      {
        ref: 'Revelation 21:3',
        focus: 'The tabernacle of God is with men',
        excerpt: 'Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them.',
      },
    ],
    challenge: 'How does the sanctuary theme move from God’s dwelling among Israel to God’s dwelling with the redeemed?',
    quiz: [
      {
        q: 'Revelation 21:3 promises:',
        a: ['God dwelling with humanity', 'The return to the wilderness', 'The end of God’s presence'],
        correct: 0,
        ex: 'God will dwell with His people.',
      },
      {
        q: 'What is the final picture in Revelation 22?',
        a: ['Restoration and life with God', 'A new sacrificial altar', 'The return to Egypt'],
        correct: 0,
        ex: 'Revelation closes with the promise of life and Christ’s return.',
      },
    ],
  },
];

export const SANCTUARY_STATIONS: SanctuaryStation[] = [
  {
    id: 'gate',
    number: '01',
    name: 'Courtyard Gate',
    zone: 'Outer Court',
    dimensions: '20 cubits wide (east entrance)',
    material: 'Blue, purple, scarlet, and fine twined linen',
    earthlyRole: 'The single eastern entrance welcoming sinners bringing their offering into the courtyard enclosure.',
    christFulfillment: 'Jesus declares, “I am the door: by me if any man enter in, he shall be saved” (John 10:9).',
    scripture: 'Exodus 27:16 · John 10:9',
    missionIndex: 2,
    pdfPage: 77,
    svgPos: { x: 84, y: 180 },
  },
  {
    id: 'altar',
    number: '02',
    name: 'Altar of Burnt Offering',
    zone: 'Outer Court',
    dimensions: '5 × 5 cubits square, 3 cubits high',
    material: 'Acacia wood overlaid with bronze',
    earthlyRole: 'First station inside the gate where morning, evening, and sin offerings were presented.',
    christFulfillment: 'Points directly to Calvary—Christ our Passover and the Lamb of God sacrificed once for all.',
    scripture: 'Exodus 27:1–8 · John 1:29 · Hebrews 10:10',
    missionIndex: 3,
    pdfPage: 53,
    svgPos: { x: 205, y: 180 },
  },
  {
    id: 'laver',
    number: '03',
    name: 'Bronze Laver',
    zone: 'Outer Court',
    dimensions: 'Circular basin & foot (from women’s bronze mirrors)',
    material: 'Polished bronze filled with water',
    earthlyRole: 'Placed between the altar and the tent door where priests washed hands and feet before ministering.',
    christFulfillment: 'Represents spiritual cleansing, regeneration, and the washing of water by the Word.',
    scripture: 'Exodus 30:17–21 · Psalm 51:10 · Ephesians 5:26',
    missionIndex: 4,
    pdfPage: 79,
    svgPos: { x: 325, y: 180 },
  },
  {
    id: 'lampstand',
    number: '04',
    name: 'Golden Lampstand',
    zone: 'Holy Place',
    dimensions: 'Seven-branched candelabrum (south side)',
    material: 'One talent of pure beaten gold',
    earthlyRole: 'Burned pure beaten olive oil continually, illuminating the enclosed Holy Place.',
    christFulfillment: 'Christ the Light of the World, shining through His Spirit and Word to guide His people.',
    scripture: 'Exodus 25:31–40 · John 8:12 · Revelation 4:5',
    missionIndex: 5,
    pdfPage: 25,
    svgPos: { x: 500, y: 245 },
  },
  {
    id: 'showbread',
    number: '05',
    name: 'Table of Showbread',
    zone: 'Holy Place',
    dimensions: '2 × 1 cubits, 1.5 cubits high (north side)',
    material: 'Acacia wood overlaid with pure gold',
    earthlyRole: 'Held twelve loaves of unleavened bread arranged in two rows, renewed each Sabbath.',
    christFulfillment: 'Christ the Living Bread come down from heaven—continual spiritual nourishment for every tribe.',
    scripture: 'Exodus 25:23–30 · John 6:35, 51',
    missionIndex: 5,
    pdfPage: 23,
    svgPos: { x: 500, y: 115 },
  },
  {
    id: 'incense',
    number: '06',
    name: 'Altar of Incense',
    zone: 'Holy Place',
    dimensions: '1 × 1 cubit square, 2 cubits high (before the veil)',
    material: 'Acacia wood overlaid with pure gold',
    earthlyRole: 'Fragrant incense ascended morning and evening directly before the veil separating the Most Holy.',
    christFulfillment: 'Symbolizes Christ’s continual intercession and the prayers of the saints perfumed by His righteousness.',
    scripture: 'Exodus 30:1–10 · Revelation 8:3–4',
    missionIndex: 8,
    pdfPage: 20,
    svgPos: { x: 585, y: 180 },
  },
  {
    id: 'ark',
    number: '07',
    name: 'Ark & Mercy Seat',
    zone: 'Most Holy Place',
    dimensions: '2.5 × 1.5 cubits, 1.5 cubits high',
    material: 'Acacia wood overlaid with pure gold; solid gold mercy seat',
    earthlyRole: 'Housed the Ten Commandments beneath the golden mercy seat overshadowed by two cherubim and the Shekinah glory.',
    christFulfillment: 'The throne of God in heaven where justice (His law) and mercy (atonement blood) meet in Christ.',
    scripture: 'Exodus 25:10–22 · Hebrews 4:16 · Revelation 11:19',
    missionIndex: 6,
    pdfPage: 17,
    svgPos: { x: 725, y: 180 },
  },
];

export interface AnnualFeast {
  id: string;
  number: string;
  name: string;
  season: 'Spring Feasts' | 'Autumn Feasts';
  calendarDate: string;
  scripture: string;
  historicalMeaning: string;
  propheticFulfillment: string;
  missionIndex: number;
}

export const ANNUAL_FEASTS: AnnualFeast[] = [
  {
    id: 'passover',
    number: '01',
    name: 'Passover',
    season: 'Spring Feasts',
    calendarDate: '1st Month (Nisan), Day 14',
    scripture: 'Leviticus 23:5 · 1 Corinthians 5:7',
    historicalMeaning: 'Commemorated Israel’s deliverance from Egypt through the blood of the lamb on the doorposts.',
    propheticFulfillment: 'Fulfilled on the exact day by Christ our Passover, crucified as the spotless Lamb of God.',
    missionIndex: 9,
  },
  {
    id: 'unleavened-bread',
    number: '02',
    name: 'Unleavened Bread',
    season: 'Spring Feasts',
    calendarDate: '1st Month (Nisan), Days 15–21',
    scripture: 'Leviticus 23:6–8 · John 6:51',
    historicalMeaning: 'Seven days eating unleavened bread, remembering the hasty departure from Egypt without yeast.',
    propheticFulfillment: 'Christ’s sinless body resting in the tomb and believers putting away the leaven of sin.',
    missionIndex: 9,
  },
  {
    id: 'firstfruits',
    number: '03',
    name: 'Firstfruits',
    season: 'Spring Feasts',
    calendarDate: '1st Month (Nisan), Day 16',
    scripture: 'Leviticus 23:9–14 · 1 Corinthians 15:20',
    historicalMeaning: 'The first sheaf of the barley harvest waved before the Lord as a pledge of the coming harvest.',
    propheticFulfillment: 'Fulfilled by Christ’s resurrection on the third day as the “firstfruits of them that slept.”',
    missionIndex: 9,
  },
  {
    id: 'pentecost',
    number: '04',
    name: 'Feast of Weeks (Pentecost)',
    season: 'Spring Feasts',
    calendarDate: '50 Days After Firstfruits (3rd Month)',
    scripture: 'Leviticus 23:15–21 · Acts 2:1–4',
    historicalMeaning: 'Two leavened loaves of wheat harvest presented before the Lord with thanksgiving.',
    propheticFulfillment: 'Outpouring of the Holy Spirit fifty days after the resurrection, inaugurating the gospel harvest.',
    missionIndex: 9,
  },
  {
    id: 'trumpets',
    number: '05',
    name: 'Feast of Trumpets',
    season: 'Autumn Feasts',
    calendarDate: '7th Month (Tishri), Day 1',
    scripture: 'Leviticus 23:23–25 · Revelation 14:6–7',
    historicalMeaning: 'A solemn blowing of trumpets announcing the sacred seventh month and calling Israel to prepare.',
    propheticFulfillment: 'Heralds the approaching Day of Atonement and calls humanity to solemn readiness before judgment.',
    missionIndex: 9,
  },
  {
    id: 'day-of-atonement',
    number: '06',
    name: 'Day of Atonement',
    season: 'Autumn Feasts',
    calendarDate: '7th Month (Tishri), Day 10',
    scripture: 'Leviticus 23:26–32 · Leviticus 16 · Daniel 8:14',
    historicalMeaning: 'The single day each year when the high priest entered the Most Holy Place to cleanse the sanctuary.',
    propheticFulfillment: 'Points to Christ’s final high-priestly ministry in the heavenly sanctuary and investigative judgment.',
    missionIndex: 10,
  },
  {
    id: 'tabernacles',
    number: '07',
    name: 'Feast of Tabernacles',
    season: 'Autumn Feasts',
    calendarDate: '7th Month (Tishri), Days 15–22',
    scripture: 'Leviticus 23:33–43 · Revelation 21:3',
    historicalMeaning: 'Seven days dwelling in leafy booths, celebrating the completed harvest and wilderness preservation.',
    propheticFulfillment: 'Anticipates the final ingathering of the redeemed when God pitches His tabernacle forever with humanity.',
    missionIndex: 12,
  },
];

export interface AtonementStep {
  step: string;
  title: string;
  reference: string;
  summary: string;
  typology: string;
}

export const ATONEMENT_STEPS: AtonementStep[] = [
  {
    step: 'Step 01',
    title: 'Washing & White Linen Garments',
    reference: 'Leviticus 16:4',
    summary: 'Setting aside the ornate golden robes, the high priest bathed in water and dressed in simple white linen garments.',
    typology: 'Highlights the spotless purity and humble self-giving of Christ as our righteous Mediator.',
  },
  {
    step: 'Step 02',
    title: 'Atonement for the Priesthood',
    reference: 'Leviticus 16:6, 11',
    summary: 'Before representing the congregation, Aaron offered a young bullock to make atonement for himself and his household.',
    typology: 'Contrasts earthly priests who needed atonement for their own sins with Jesus, our sinless High Priest (Hebrews 7:26–27).',
  },
  {
    step: 'Step 03',
    title: 'Lots Cast Over the Two Goats',
    reference: 'Leviticus 16:7–10',
    summary: 'Two goats stood at the sanctuary door; lots designated one as the Lord’s sin offering and the other as the scapegoat (Azazel).',
    typology: 'Separates the atoning blood that cleanses the sanctuary from the final bearing away of banished sin.',
  },
  {
    step: 'Step 04',
    title: 'Entering Within the Veil',
    reference: 'Leviticus 16:12–15',
    summary: 'With fragrant incense clouding the mercy seat, the high priest sprinkled the blood of the Lord’s goat upon and before the ark.',
    typology: 'Christ appears in the very presence of God in heaven itself, pleading His own sufficient sacrifice (Hebrews 9:24).',
  },
  {
    step: 'Step 05',
    title: 'Cleansing the Sanctuary & Altar',
    reference: 'Leviticus 16:16–19',
    summary: 'Moving outward from the Most Holy Place to the Holy Place and the courtyard altar, the priest reconciled and cleansed the sanctuary.',
    typology: 'Demonstrates that redemption addresses not only individual guilt, but the complete removal of sin’s record.',
  },
  {
    step: 'Step 06',
    title: 'Banishing the Live Goat',
    reference: 'Leviticus 16:20–22',
    summary: 'After completing reconciliation, Aaron confessed Israel’s transgressions upon the live goat’s head and sent it into an uninhabited wilderness.',
    typology: 'Foreshadows the final eradication of evil after judgment is complete, leaving a restored and clean creation.',
  },
];

export interface PropheticMilestone {
  id: string;
  year: string;
  propheticSpan: string;
  title: string;
  scripture: string;
  historicalEvent: string;
  sanctuaryMeaning: string;
  positionPct: number;
}

export const PROPHETIC_TIMELINE: PropheticMilestone[] = [
  {
    id: '457bc',
    year: '457 B.C.',
    propheticSpan: 'Start of 70 Weeks & 2,300 Days',
    title: 'Decree to Restore & Rebuild Jerusalem',
    scripture: 'Daniel 9:25 · Ezra 7:11–26',
    historicalEvent:
      'In the autumn of 457 B.C., Persian king Artaxerxes Longimanus issued the full decree empowering Ezra to restore Jerusalem’s civil and religious governance.',
    sanctuaryMeaning:
      'Establishes the fixed starting anchor for both the 490-year (70 weeks) period allotted to Israel and the full 2,300-year prophecy (Numbers 14:34; Ezekiel 4:6).',
    positionPct: 0,
  },
  {
    id: '408bc',
    year: '408 B.C.',
    propheticSpan: 'End of 7 Weeks (49 Years)',
    title: 'Jerusalem’s Street & Wall Completed',
    scripture: 'Daniel 9:25 · Nehemiah 6:15',
    historicalEvent:
      'Forty-nine literal years after 457 B.C., Jerusalem’s walls, streets, and temple worship stood restored amid opposition and “troublous times.”',
    sanctuaryMeaning:
      'Demonstrates the mathematical precision of the day-year prophetic scale before advancing 62 weeks (434 years) to the Messiah.',
    positionPct: 14,
  },
  {
    id: '27ad',
    year: 'A.D. 27',
    propheticSpan: 'End of 69 Weeks (483 Years)',
    title: 'Anointing of Messiah the Prince',
    scripture: 'Daniel 9:25 · Luke 3:1, 21–22',
    historicalEvent:
      'Exactly 483 years after 457 B.C., Jesus was baptized in the Jordan, anointed by the Holy Spirit, and proclaimed: “The time is fulfilled.”',
    sanctuaryMeaning:
      'As the earthly tabernacle was anointed before service began (Exodus 40:9), Messiah’s baptism inaugurated the antitypical sanctuary ministry.',
    positionPct: 30,
  },
  {
    id: '31ad',
    year: 'A.D. 31',
    propheticSpan: 'Midst of the 70th Week',
    title: 'Messiah Cut Off at Calvary',
    scripture: 'Daniel 9:26–27 · Matthew 27:50–51',
    historicalEvent:
      'Three and a half years into His public ministry, Christ died on Passover afternoon; the inner temple veil tore from top to bottom.',
    sanctuaryMeaning:
      'Haskell notes Calvary as the great seal fixing the entire prophecy: shadow sacrifices ceased in principle as the true Lamb gave His life.',
    positionPct: 42,
  },
  {
    id: '34ad',
    year: 'A.D. 34',
    propheticSpan: 'Close of 70 Weeks (490 Years)',
    title: 'Gospel Opens to the Gentiles',
    scripture: 'Daniel 9:24 · Acts 7:55–8:4',
    historicalEvent:
      'With the stoning of Stephen and the conversion of Saul, the covenant message moved outward from Jerusalem to all nations.',
    sanctuaryMeaning:
      'Completes the 490 years “cut off” (chathak) for Jerusalem, leaving exactly 1,810 years remaining of the 2,300-year span.',
    positionPct: 54,
  },
  {
    id: '1844ad',
    year: '1844',
    propheticSpan: 'End of 2,300 Prophetic Years',
    title: 'Cleansing of the Heavenly Sanctuary',
    scripture: 'Daniel 8:14 · Daniel 7:9–10 · Revelation 14:6–7',
    historicalEvent:
      'Adding the remaining 1,810 years to A.D. 34 reaches the autumn of 1844—marking the close of the longest prophetic period in Scripture.',
    sanctuaryMeaning:
      'In Chapter 27, Haskell links this date with the antitypical Day of Atonement in heaven’s Most Holy Place: the investigative judgment preceding Christ’s return.',
    positionPct: 100,
  },
];

export interface BookChapterJump {
  label: string;
  page: number;
}

export const BOOK_CHAPTER_JUMPS: BookChapterJump[] = [
  { label: 'Author’s Preface', page: 2 },
  { label: 'Ch. 1 · Light in Darkness', page: 6 },
  { label: 'Ch. 4 · Ark & Mercy Seat', page: 17 },
  { label: 'Ch. 5–7 · Holy Place', page: 20 },
  { label: 'Ch. 12 · High Priest Robes', page: 35 },
  { label: 'Ch. 13–16 · Spring Feasts', page: 40 },
  { label: 'Ch. 17–23 · Offerings', page: 53 },
  { label: 'Ch. 25 · Court & Laver', page: 77 },
  { label: 'Ch. 27 · 2,300 Days', page: 82 },
  { label: 'Ch. 29–30 · Atonement', page: 90 },
  { label: 'Ch. 31–34 · Jubilee & Refuge', page: 99 },
];

export interface TypologyDrillPair {
  id: string;
  round: 1 | 2 | 3;
  shadowLabel: string;
  shadowRef: string;
  fulfillmentLabel: string;
  fulfillmentRef: string;
  missionIndex: number;
}

export const TYPOLOGY_DRILL_PAIRS: TypologyDrillPair[] = [
  {
    id: 'gate',
    round: 1,
    shadowLabel: 'Single Eastern Courtyard Gate',
    shadowRef: 'Exodus 27:16',
    fulfillmentLabel: '“I am the door” — one entrance to salvation',
    fulfillmentRef: 'John 10:9',
    missionIndex: 2,
  },
  {
    id: 'altar',
    round: 1,
    shadowLabel: 'Altar of Burnt Offering',
    shadowRef: 'Exodus 27:1–8',
    fulfillmentLabel: 'Calvary — Christ sacrificed once for all',
    fulfillmentRef: 'Hebrews 10:10',
    missionIndex: 3,
  },
  {
    id: 'laver',
    round: 1,
    shadowLabel: 'Polished Bronze Laver',
    shadowRef: 'Exodus 30:17–21',
    fulfillmentLabel: 'Washing of regeneration by the Word',
    fulfillmentRef: 'Ephesians 5:26',
    missionIndex: 4,
  },
  {
    id: 'trespass-restitution',
    round: 1,
    shadowLabel: 'Trespass Offering + 20% Restitution',
    shadowRef: 'Leviticus 6:4–5',
    fulfillmentLabel: 'Grace paired with Zacchaeus-style restitution',
    fulfillmentRef: 'Luke 19:8–9',
    missionIndex: 3,
  },
  {
    id: 'showbread',
    round: 2,
    shadowLabel: 'Twelve Loaves of Showbread',
    shadowRef: 'Leviticus 24:5–9',
    fulfillmentLabel: 'Christ the Living Bread for every tribe',
    fulfillmentRef: 'John 6:35, 51',
    missionIndex: 5,
  },
  {
    id: 'lampstand',
    round: 2,
    shadowLabel: 'Seven-Branched Golden Lampstand',
    shadowRef: 'Exodus 25:31–40',
    fulfillmentLabel: 'Light of the World & Seven Spirits of God',
    fulfillmentRef: 'John 8:12 · Rev. 4:5',
    missionIndex: 5,
  },
  {
    id: 'incense',
    round: 2,
    shadowLabel: 'Golden Altar of Incense',
    shadowRef: 'Exodus 30:1–10',
    fulfillmentLabel: 'Christ’s merits ascending with saints’ prayers',
    fulfillmentRef: 'Revelation 8:3–4',
    missionIndex: 8,
  },
  {
    id: 'breastplate',
    round: 2,
    shadowLabel: 'Breastplate of Twelve Stones',
    shadowRef: 'Exodus 28:15–30',
    fulfillmentLabel: 'High Priest bearing His people over His heart',
    fulfillmentRef: 'Revelation 3:5',
    missionIndex: 7,
  },
  {
    id: 'passover',
    round: 3,
    shadowLabel: 'Passover Lamb Slain on 14 Abib',
    shadowRef: 'Exodus 12:6, 46',
    fulfillmentLabel: 'Christ crucified on 14 Nisan, no bone broken',
    fulfillmentRef: '1 Cor. 5:7 · John 19:36',
    missionIndex: 9,
  },
  {
    id: 'firstfruits',
    round: 3,
    shadowLabel: 'Wave Sheaf of Barley Firstfruits',
    shadowRef: 'Leviticus 23:10–11',
    fulfillmentLabel: 'Christ risen on the third day as Firstfruits',
    fulfillmentRef: '1 Corinthians 15:20',
    missionIndex: 9,
  },
  {
    id: 'scapegoat',
    round: 3,
    shadowLabel: 'Scapegoat Sent to the Wilderness',
    shadowRef: 'Leviticus 16:20–22',
    fulfillmentLabel: 'Sin returned on Satan & banished 1,000 years',
    fulfillmentRef: 'Revelation 20:1–3',
    missionIndex: 10,
  },
  {
    id: 'jubilee',
    round: 3,
    shadowLabel: 'Jubilee Trumpet & Cities of Refuge',
    shadowRef: 'Leviticus 25:9–10 · Josh. 20',
    fulfillmentLabel: 'Christ our Refuge now; redeemed earth restored',
    fulfillmentRef: 'Hebrews 6:18 · Rev. 21:3',
    missionIndex: 12,
  },
];

export interface ScriptureIndexEntry {
  key: string;
  verseIdx: number;
  ref: string;
  focus: string;
  missionId: number;
  missionTitle: string;
}

export function getScriptureIndex(): ScriptureIndexEntry[] {
  const entries: ScriptureIndexEntry[] = [];
  LESSONS.forEach((lesson) => {
    lesson.verses.forEach((verse, verseIdx) => {
      entries.push({
        key: `${lesson.id}-${verseIdx}`,
        verseIdx,
        ref: verse.ref,
        focus: verse.focus,
        missionId: lesson.id,
        missionTitle: lesson.title,
      });
    });
  });
  return entries;
}

