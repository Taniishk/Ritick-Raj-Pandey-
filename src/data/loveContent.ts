export type ReasonCategory =
  | 'Her Smile'
  | 'Personality'
  | 'Her Voice'
  | 'Kindness'
  | 'Little Habits'
  | 'Expressions'
  | 'Intelligence'
  | 'Beauty'
  | 'Innocence'
  | 'Emotional Depth'
  | 'Her Presence'
  | 'Uniqueness';

export interface ReasonCard {
  id: number;
  category: ReasonCategory;
  text: string;
}

export const HUNDRED_REASONS: ReasonCard[] = [
  // Her Smile (1-9)
  { id: 1, category: 'Her Smile', text: 'The way your whole face lights up before your laugh even reaches the air.' },
  { id: 2, category: 'Her Smile', text: 'How a single genuine smile from you can flip my worst day completely upside down.' },
  { id: 3, category: 'Her Smile', text: 'That shy half-smile you try to hide when you get caught blushing.' },
  { id: 4, category: 'Her Smile', text: 'The tiny crinkle near your eyes when you are smiling for real, not just for a photo.' },
  { id: 5, category: 'Her Smile', text: 'How your smile makes ordinary moments feel like scenes worth replaying forever.' },
  { id: 6, category: 'Her Smile', text: 'The sleepy morning smile that is softer and sweeter than anything else on earth.' },
  { id: 7, category: 'Her Smile', text: 'The victorious little grin you make when you win an argument you knew you were cute in.' },
  { id: 8, category: 'Her Smile', text: 'How your smile arrives like warm sunlight right after a storm.' },
  { id: 9, category: 'Her Smile', text: 'The effortless magic your smile has to calm every restless thought in my head.' },

  // Personality (10-18)
  { id: 10, category: 'Personality', text: 'Your chaotic mix of soft sweetheart and dramatic little firecracker.' },
  { id: 11, category: 'Personality', text: 'How you stay authentically yourself instead of trying to fit into anyone else’s mold.' },
  { id: 12, category: 'Personality', text: 'The playful sass that keeps me smiling even when you are pretending to be strict.' },
  { id: 13, category: 'Personality', text: 'How your excitement over small cute things makes life feel ten times brighter.' },
  { id: 14, category: 'Personality', text: 'Your stubborn honesty when something actually matters to your heart.' },
  { id: 15, category: 'Personality', text: 'The gentle warmth you carry without even trying to impress anyone.' },
  { id: 16, category: 'Personality', text: 'How you can be both endlessly comforting and dangerously adorable at the exact same time.' },
  { id: 17, category: 'Personality', text: 'Your delightful sense of humor that turns boring conversations into my favorite hours.' },
  { id: 18, category: 'Personality', text: 'The quiet strength underneath all that softness.' },

  // Her Voice (19-26)
  { id: 19, category: 'Her Voice', text: 'The way your voice softens when you are genuinely happy or sleepy.' },
  { id: 20, category: 'Her Voice', text: 'How hearing your voice immediately feels like arriving home.' },
  { id: 21, category: 'Her Voice', text: 'The cute little pitch change when you get excited telling a story.' },
  { id: 22, category: 'Her Voice', text: 'Your laugh—especially the unfiltered one where you cannot stop smiling.' },
  { id: 23, category: 'Her Voice', text: 'The dramatic little "hmmm" you do when you are thinking or pretending to be mad.' },
  { id: 24, category: 'Her Voice', text: 'How even a two-word voice note from you can stay in my head all afternoon.' },
  { id: 25, category: 'Her Voice', text: 'The soothing rhythm in the way you speak when you care about someone.' },
  { id: 26, category: 'Her Voice', text: 'That adorable sleepy mumble that somehow melts all my stress instantly.' },

  // Kindness (27-34)
  { id: 27, category: 'Kindness', text: 'The thoughtful little ways you check if the people around you are okay.' },
  { id: 28, category: 'Kindness', text: 'How your heart naturally notices small details others walk right past.' },
  { id: 29, category: 'Kindness', text: 'Your softness toward things and people who need a little extra patience.' },
  { id: 30, category: 'Kindness', text: 'The sincere empathy in you—when someone hurts, you actually feel it with them.' },
  { id: 31, category: 'Kindness', text: 'How you forgive with grace even when something took a toll on you.' },
  { id: 32, category: 'Kindness', text: 'The quiet generosity in your care that never asks for applause.' },
  { id: 33, category: 'Kindness', text: 'How you make people feel heard instead of brushed aside.' },
  { id: 34, category: 'Kindness', text: 'The pure warmth of your intentions, even on days when you are tired.' },

  // Little Habits (35-43)
  { id: 35, category: 'Little Habits', text: 'The way you react with pure concentration over tiny cute decisions.' },
  { id: 36, category: 'Little Habits', text: 'How you get adorably dramatic about small inconveniences in the cutest way.' },
  { id: 37, category: 'Little Habits', text: 'The little pauses you take when you are choosing the exact right words.' },
  { id: 38, category: 'Little Habits', text: 'How you notice tiny details in messages that I did not even realize I left.' },
  { id: 39, category: 'Little Habits', text: 'Your cute habit of over-caring even when you pretend you are totally chill.' },
  { id: 40, category: 'Little Habits', text: 'The way your energy shifts the instant you spot something sweet or pretty.' },
  { id: 41, category: 'Little Habits', text: 'How you say things in your own unmistakable Sonyyy style that nobody could copy.' },
  { id: 42, category: 'Little Habits', text: 'The little comfort routines that make you feel safe and cozy.' },
  { id: 43, category: 'Little Habits', text: 'How you secretly hold onto sweet words long after they are said.' },

  // Expressions (44-52)
  { id: 44, category: 'Expressions', text: 'Your dramatic angry pout that tries to look scary and fails completely because it is too cute.' },
  { id: 45, category: 'Expressions', text: 'That surprised wide-eyed look when something unexpected actually touches your heart.' },
  { id: 46, category: 'Expressions', text: 'The tiny eyebrow raise when you know someone is trying to flatter you.' },
  { id: 47, category: 'Expressions', text: 'Your fake-unimpressed expression right before you crack a smile.' },
  { id: 48, category: 'Expressions', text: 'How every single emotion writes itself honestly across your face.' },
  { id: 49, category: 'Expressions', text: 'The soft glowing look in your eyes when you feel genuinely cherished.' },
  { id: 50, category: 'Expressions', text: 'That concentrated thinking face you make when you are figuring something out.' },
  { id: 51, category: 'Expressions', text: 'The tiny nose scrunch that deserves its own museum wing.' },
  { id: 52, category: 'Expressions', text: 'How your eyes sparkle louder than words whenever you are happy.' },

  // Intelligence (53-60)
  { id: 53, category: 'Intelligence', text: 'How sharp your intuition is—you see straight through fake energy in seconds.' },
  { id: 54, category: 'Intelligence', text: 'The thoughtful perspective you bring to conversations without ever showing off.' },
  { id: 55, category: 'Intelligence', text: 'How quickly you catch subtle meanings between the lines.' },
  { id: 56, category: 'Intelligence', text: 'Your emotional intelligence—you understand feelings deeply, not just logic.' },
  { id: 57, category: 'Intelligence', text: 'The clever comebacks that catch me completely off guard and make me laugh.' },
  { id: 58, category: 'Intelligence', text: 'How curious your mind is when something genuinely fascinates you.' },
  { id: 59, category: 'Intelligence', text: 'The quiet wisdom in how you reflect on people and life.' },
  { id: 60, category: 'Intelligence', text: 'How effortlessly witty you are without even trying to be funny.' },

  // Beauty (61-69)
  { id: 61, category: 'Beauty', text: 'Eyes that feel like an entire starlit galaxy I never want to look away from.' },
  { id: 62, category: 'Beauty', text: 'The natural grace in how you carry yourself without needing loud attention.' },
  { id: 63, category: 'Beauty', text: 'How gorgeous you look even on messy, zero-effort, cozy days.' },
  { id: 64, category: 'Beauty', text: 'The soft elegance that follows you into every space you enter.' },
  { id: 65, category: 'Beauty', text: 'The way light seems to favor your face effortlessly.' },
  { id: 66, category: 'Beauty', text: 'How prettier than every sunset you look when you are genuinely happy.' },
  { id: 67, category: 'Beauty', text: 'Every tiny detail of your face that feels thoughtfully painted.' },
  { id: 68, category: 'Beauty', text: 'The timeless charm in your beauty—never loud, always unforgettable.' },
  { id: 69, category: 'Beauty', text: 'How looking at you still gives me butterflies every single time.' },

  // Innocence (70-76)
  { id: 70, category: 'Innocence', text: 'The pure, unfiltered joy you show over tiny thoughtful surprises.' },
  { id: 71, category: 'Innocence', text: 'How sincerely you care when you let someone close to your heart.' },
  { id: 72, category: 'Innocence', text: 'The sweet childlike wonder you still keep safe inside you.' },
  { id: 73, category: 'Innocence', text: 'How your heart still believes in genuine effort and soft love.' },
  { id: 74, category: 'Innocence', text: 'The adorable honesty in your reactions—zero fake games.' },
  { id: 75, category: 'Innocence', text: 'How gently you soften the moment someone shows real care.' },
  { id: 76, category: 'Innocence', text: 'The untouched sweetness in the way you love the little things.' },

  // Emotional Depth (77-84)
  { id: 77, category: 'Emotional Depth', text: 'How deeply you feel things—your heart never loves halfway.' },
  { id: 78, category: 'Emotional Depth', text: 'The honesty of your tears when something really hurts, because you care truly.' },
  { id: 79, category: 'Emotional Depth', text: 'How much meaning you look for beneath surface-level words.' },
  { id: 80, category: 'Emotional Depth', text: 'Your need for emotional safety and real understanding, which I respect deeply.' },
  { id: 81, category: 'Emotional Depth', text: 'How you value loyalty, effort, and consistency over empty grand speeches.' },
  { id: 82, category: 'Emotional Depth', text: 'The quiet depth behind your eyes when you are lost in thought.' },
  { id: 83, category: 'Emotional Depth', text: 'How your vulnerability is actually one of the bravest things about you.' },
  { id: 84, category: 'Emotional Depth', text: 'The way loving you teaches me to be gentler, more patient, and more present.' },

  // Her Presence (85-92)
  { id: 85, category: 'Her Presence', text: 'How an ordinary Tuesday feels special simply because you are in it.' },
  { id: 86, category: 'Her Presence', text: 'The instant calm that settles over me the second you are near.' },
  { id: 87, category: 'Her Presence', text: 'How your name popping up on my screen is automatically my favorite notification.' },
  { id: 88, category: 'Her Presence', text: 'The comforting warmth your presence leaves behind even after a conversation ends.' },
  { id: 89, category: 'Her Presence', text: 'How silence with you never feels awkward—it feels peaceful.' },
  { id: 90, category: 'Her Presence', text: 'The subtle way you make every place feel softer just by existing there.' },
  { id: 91, category: 'Her Presence', text: 'How easily you became the highlight of my whole day.' },
  { id: 92, category: 'Her Presence', text: 'The way missing you feels like waiting for my favorite song to play again.' },

  // Uniqueness (93-100)
  { id: 93, category: 'Uniqueness', text: 'There is literally nobody else on this planet with your exact blend of magic.' },
  { id: 94, category: 'Uniqueness', text: 'How you turn even simple moments into memories I want to keep forever.' },
  { id: 95, category: 'Uniqueness', text: 'The unmistakable Sonyyy energy that makes you irreplaceable in my world.' },
  { id: 96, category: 'Uniqueness', text: 'How you manage to be my favorite distraction and my greatest peace at once.' },
  { id: 97, category: 'Uniqueness', text: 'The rare combination of beauty, softness, humor, and depth in one person.' },
  { id: 98, category: 'Uniqueness', text: 'How you make me want to become the kind of man who always protects your smile.' },
  { id: 99, category: 'Uniqueness', text: 'That even your flaws and moody days are still part of someone I adore completely.' },
  { id: 100, category: 'Uniqueness', text: 'Because out of eight billion people, my heart still chooses you, Sonyyy, every single time.' },
];

export interface ChocolateTreat {
  id: string;
  name: string;
  flavor: string;
  compliment: string;
}

export const CHOCOLATE_TREATS: ChocolateTreat[] = [
  { id: 'c1', name: 'Velvet Rose Truffle', flavor: 'Dark Cocoa & Rose', compliment: 'Sweet, rich, and dangerously addictive—just like your smile when you look at me like that.' },
  { id: 'c2', name: 'Strawberry Heart Praline', flavor: 'Blush Berry Cream', compliment: 'Honestly? Strawberries dipped in chocolate still lose to the sweetness of your voice.' },
  { id: 'c3', name: 'Caramel Kiss Bonbon', flavor: 'Salted Golden Caramel', compliment: 'One taste melts slowly, kind of like my whole heart whenever you say my name softly.' },
  { id: 'c4', name: 'Hazelnut Crown Cup', flavor: 'Roasted Praline', compliment: 'A royal little bite for the girl who effortlessly owns the whole castle in my mind.' },
  { id: 'c5', name: 'Vanilla Cloud Square', flavor: 'White Ganache', compliment: 'Soft, dreamy, and comforting—exactly how your presence feels on a long day.' },
  { id: 'c6', name: 'Raspberry Spark Heart', flavor: 'Ruby Chocolate', compliment: 'A little tangy, a little bold, 100% irresistible—remind you of anyone, grumpy cutie?' },
  { id: 'c7', name: 'Mocha Midnight Drop', flavor: 'Espresso Fudge', compliment: 'Keeps me awake thinking about you way past midnight and smiling at my ceiling.' },
  { id: 'c8', name: 'Honeycomb Blush Bark', flavor: 'Golden Crunch', compliment: 'Golden, sweet, and impossible to share—just like how possessive I get about making you smile.' },
  { id: 'c9', name: 'Cherry Velvet Swirl', flavor: 'Creamy Cherry Cocoa', compliment: 'Warning: this chocolate causes instant blushing and a craving for forehead kisses.' },
  { id: 'c10', name: 'Butterscotch Teddy Bite', flavor: 'Warm Toffee', compliment: 'Warm, cozy, and hugs your soul—almost as good as a real hug from me (almost!).' },
  { id: 'c11', name: 'Lavender Cream Shell', flavor: 'Floral Milk Chocolate', compliment: 'Delicate and unforgettable—just like the peaceful aura you bring everywhere.' },
  { id: 'c12', name: 'The Final Golden Heart', flavor: '24K Sweet Cocoa', compliment: 'Plot twist: you do not need chocolate to be sweet—you already are my favorite sweetness.' },
];

export interface BlushCompliment {
  trait: string;
  line: string;
  reaction: string;
}

export const BLUSH_MACHINE_COMPLIMENTS: BlushCompliment[] = [
  { trait: 'Your Eyes', line: 'Warning: looking into your eyes for more than 3 seconds has been known to cause total loss of focus and helpless smiling.', reaction: 'Blush Level: 94% 💗' },
  { trait: 'Your Smile', line: 'Honestly, your smile should come with a warning label—it melts every stubborn thought I ever had in one second.', reaction: 'Heart Rate: Skyrocketing 💓' },
  { trait: 'Your Voice', line: 'How is it fair that your voice alone sounds prettier than every song on my playlist?', reaction: 'Butterflies Released: 400 🦋' },
  { trait: 'Your Beauty', line: 'Even in your most effortless, unbothered look, you still outshine everyone else without even trying.', reaction: 'Dazzled Mode: Activated ✨' },
  { trait: 'Your Expressions', line: 'Your fake-serious face when you are trying not to smile is genuinely one of the cutest sights on this planet.', reaction: 'Cuteness Overload 😭💗' },
  { trait: 'Your Personality', line: 'You have that rare combination of soft angel energy and playful little menace that I am completely weak for.', reaction: 'Charmed Beyond Repair 🧸' },
  { trait: 'Your Presence', line: 'When you walk in—or even just text—my entire mood upgrades instantly. You are literally my favorite notification.', reaction: 'Cheeks Turning Pink 🌸' },
  { trait: 'Your Little Habits', line: 'I notice all your tiny habits—the cute pauses, the dramatic sighs, the soft laughs—and somehow I fall for every single one.', reaction: 'Heart Melted 100% 💘' },
  { trait: 'Your Eyes', line: 'Forget stargazing. One glance from you already holds an entire universe I want to get lost in.', reaction: 'Starstruck Forever ✨' },
  { trait: 'Your Smile', line: 'If stealing a smile from your face were an Olympic sport, I would happily train every day for gold.', reaction: 'Smile Detected! 😊💗' },
  { trait: 'Your Beauty', line: 'You do not just look pretty, Sonyyy—you carry a glow that makes people feel warmer just being near you.', reaction: 'Radiant Aura 🌟' },
  { trait: 'Your Voice', line: 'Say one sweet word and watch how fast my whole day turns into cloud nine.', reaction: 'Weak in the Knees 🫶' },
  { trait: 'Your Expressions', line: 'Even when you are mad with that cute little pout, half of me wants to apologize and the other half wants to squish your cheeks.', reaction: 'Grumpy Heart Melting 🫠' },
  { trait: 'Your Personality', line: 'Being effortlessly adorable should be illegal, yet here you are breaking the law every day.', reaction: 'Guilty of Being Cute 💌' },
  { trait: 'Your Presence', line: 'My favorite place to be is wherever your laugh is echoing.', reaction: 'Maximum Warmth ☀️💗' },
  { trait: 'Your Little Habits', line: 'You have no idea how effortlessly you live rent-free in my favorite thoughts all day long.', reaction: 'Blushing Confirmed 🥰' },
];

export interface CafeMenuItem {
  id: string;
  label: string;
  price: string;
  surpriseTitle: string;
  surpriseBody: string;
  emoji: string;
}

export const CAFE_MENU_ITEMS: CafeMenuItem[] = [
  {
    id: 'hug',
    label: 'ONE EXTRA HUG',
    price: 'Free for Sonyyy',
    surpriseTitle: 'Warmest Espresso-Strength Hug Served! 🫂',
    surpriseBody: 'Two arms wrapped tight, zero rush to let go, and a forehead rest right on top of your head until all your tiredness disappears.',
    emoji: '🫂',
  },
  {
    id: 'kisses',
    label: 'UNLIMITED KISSES',
    price: 'Always on the House',
    surpriseTitle: 'Fresh Batch of Forehead & Cheek Kisses! 😘',
    surpriseBody: 'Served warm with zero expiration date—redeemable whenever you are happy, sleepy, grumpy, or just standing there looking cute.',
    emoji: '💋',
  },
  {
    id: 'chocolate',
    label: 'YOUR FAVOURITE CHOCOLATE',
    price: '100% Sweet',
    surpriseTitle: 'Velvet Hot Chocolate & Truffle Platter! 🍫',
    surpriseBody: 'Extra whipped cream, warm melted cocoa, and a sneaky sticky note underneath the saucer that says: "You are still sweeter than this."',
    emoji: '🍫',
  },
  {
    id: 'cuddles',
    label: 'A LIFETIME OF CUDDLES',
    price: 'Reserved Table',
    surpriseTitle: 'Cozy Rainy-Day Cuddle Booth Unlocked! 🧸',
    surpriseBody: 'Rain tapping softly outside the cafe window, warm fairy lights glowing, and a forever seat right next to me where you always feel safe.',
    emoji: '🧸',
  },
  {
    id: 'compliments',
    label: 'ONE MILLION COMPLIMENTS',
    price: 'Infinite Refills',
    surpriseTitle: 'Compliment Refill #1 of 1,000,000! ✨',
    surpriseBody: 'Your eyes look magical today, your heart is rare gold, your presence is calming, and every version of you deserves to be adored gently.',
    emoji: '✨',
  },
];

export interface MuseumFrame {
  id: number;
  title: string;
  pillar: string;
  description: string;
}

export const MUSEUM_FRAMES: MuseumFrame[] = [
  { id: 1, title: 'Portrait of Quiet Grace', pillar: 'Her Elegance', description: 'You carry an effortless poise that never needs loud attention—it simply commands warmth in every room.' },
  { id: 2, title: 'The Mind Behind the Spark', pillar: 'Her Intelligence', description: 'Sharp, perceptive, and emotionally wise—you understand nuances most people never even notice.' },
  { id: 3, title: 'A Heart Made of Gold', pillar: 'Her Character', description: 'Even when things are difficult, your values, loyalty, and honesty remain crystal clear.' },
  { id: 4, title: 'Softness Without Condition', pillar: 'Her Kindness', description: 'The gentle care you offer people around you leaves soft footprints everywhere you go.' },
  { id: 5, title: 'Motion Like Poetry', pillar: 'Her Grace', description: 'Every smile, turn, and expression of yours has a natural rhythm that feels like living art.' },
  { id: 6, title: 'Starlight in Human Form', pillar: 'Her Beauty', description: 'Not just breathtaking features, but the luminous warmth that shines straight from within.' },
  { id: 7, title: 'One of One', pillar: 'Her Individuality', description: 'Nobody laughs like you, cares like you, or lights up a space quite the way Sonyyy does.' },
  { id: 8, title: 'Deep Waters, Pure Love', pillar: 'Her Heart', description: 'Your heart feels deeply and honestly—loving wholeheartedly is your quiet superpower.' },
  { id: 9, title: 'The Room Changer', pillar: 'Her Magical Presence', description: 'Ordinary air turns golden the moment you arrive; your presence alone is comfort.' },
  { id: 10, title: 'Unfiltered Sunshine', pillar: 'Her Smile', description: 'A masterpiece capable of dissolving heavy clouds in a single second.' },
  { id: 11, title: 'The Thoughtful Listener', pillar: 'Her Empathy', description: 'You do not just hear words—you remember feelings and show up with sincerity.' },
  { id: 12, title: 'Gentle Strength', pillar: 'Her Resilience', description: 'Soft enough to stay tender, strong enough to rise gracefully through tough days.' },
  { id: 13, title: 'Playful Sparkle', pillar: 'Her Wit', description: 'Your spontaneous humor and adorable timing keep life full of genuine laughter.' },
  { id: 14, title: 'Constellation Gaze', pillar: 'Her Eyes', description: 'Two whole galaxies holding honesty, warmth, and a little bit of mischief.' },
  { id: 15, title: 'Velvet Authenticity', pillar: 'Her Honesty', description: 'Never pretending to be someone else—your realness is what makes you truly magnetic.' },
  { id: 16, title: 'Sacred Little Details', pillar: 'Her Thoughtfulness', description: 'You notice the tiny gestures, remember the small moments, and treasure genuine effort.' },
  { id: 17, title: 'Dreamer in Pastel', pillar: 'Her Imagination', description: 'The sweet dreams and tender hopes you hold inside make your world endlessly rich.' },
  { id: 18, title: 'Golden Voice Cadence', pillar: 'Her Voice', description: 'A sound softer than rain on petals and brighter than morning light.' },
  { id: 19, title: 'Crown Without Weight', pillar: 'Her Dignity', description: 'Self-respect wrapped in gentleness—you teach people how precious your heart is.' },
  { id: 20, title: 'The Final Exhibit: Sonyyy', pillar: 'Everything You Are', description: 'No canvas or sculpture could ever capture all of you—this gallery only holds a tiny fraction of how cherished you are.' },
];

export interface HeartLetter {
  id: number;
  tag: string;
  salutation: string;
  body: string;
  signOff: string;
}

export const HEART_LETTERS: HeartLetter[] = [
  {
    id: 1,
    tag: 'Short Love Note',
    salutation: 'Hey my favorite girl,',
    body: 'Just a gentle reminder in case today felt heavy: you are deeply appreciated, endlessly beautiful, and never hard to love.',
    signOff: 'Always cheering for you 💗',
  },
  {
    id: 2,
    tag: 'Playful Flirty Note',
    salutation: 'Excuse me, Miss Pretty,',
    body: 'Please stop being this adorable every single day. My heart is trying to act normal and you are making it completely impossible.',
    signOff: 'Helplessly yours 😘',
  },
  {
    id: 3,
    tag: 'Emotional Appreciation',
    salutation: 'Dear Sonyyy,',
    body: 'Thank you for every tiny effort you make, every moment of patience, and every time you still choose softness even after a disagreement.',
    signOff: 'I notice all of it 🧸',
  },
  {
    id: 4,
    tag: 'Cute Nicknames',
    salutation: 'To my sweetest babyyy,',
    body: 'Whether you are my sleepy princess, my grumpy cutie, my little sunshine, or my Sonyyyy—every version of you has my whole heart.',
    signOff: 'Forever your favorite fan ✨',
  },
  {
    id: 5,
    tag: 'Reassuring Message',
    salutation: 'My safe-kept heart,',
    body: 'You never have to shrink your feelings around me. Tell me when you are sad, tell me when I messed up, tell me everything—I am listening.',
    signOff: 'Right here beside you 🫂',
  },
  {
    id: 6,
    tag: 'Playful Note',
    salutation: 'Official Notice for Sonyyy:',
    body: 'You are owed 1,000 forehead kisses, 100 long hugs, and unlimited patience. Please present your cute face for immediate delivery.',
    signOff: 'Signed with 100% love 💌',
  },
  {
    id: 7,
    tag: 'Deep Gratitude',
    salutation: 'My dearest Sonyyy,',
    body: 'Having you in my life makes ordinary routines feel brighter, softer, and infinitely more meaningful. Thank you for just being you.',
    signOff: 'With all my heart ❤️',
  },
  {
    id: 8,
    tag: 'Comfort Note',
    salutation: 'For your tired days,',
    body: 'Rest your shoulders, take a deep breath, and let me hold the weight for a little while. You do not have to carry everything alone.',
    signOff: 'Your safe place always 🌙',
  },
  {
    id: 9,
    tag: 'Sweet Flirt',
    salutation: 'Dear Heart-Stealer,',
    body: 'How did you walk into my life and casually become my favorite thought in the morning and my last smile before sleep?',
    signOff: 'Still falling for you 🌹',
  },
  {
    id: 10,
    tag: 'Promise Note',
    salutation: 'To the girl worth choosing,',
    body: 'Not just on the sparkling easy days—I want to understand you, respect you, and grow kinder with you through the real ones too.',
    signOff: 'Today & every tomorrow 💗',
  },
];

export interface FlowerBloom {
  id: number;
  name: string;
  species: string;
  color: string;
  compliment: string;
}

export const FLOWER_SHOP_BLOOMS: FlowerBloom[] = [
  { id: 1, name: 'Blush Velvet Rose', species: 'Rose', color: '#f43f5e', compliment: 'Like a rose unfolding slowly, every layer of your heart is even more breathtaking than the last.' },
  { id: 2, name: 'Pastel Dawn Tulip', species: 'Tulip', color: '#fb7185', compliment: 'Simple, pure, and effortlessly graceful—you bring springtime wherever you step.' },
  { id: 3, name: 'Moonlight Stargazer Lily', species: 'Lily', color: '#e879f9', compliment: 'Your elegance turns quiet ordinary evenings into moments worth remembering.' },
  { id: 4, name: 'Golden Hour Sunflower', species: 'Sunflower', color: '#f59e0b', compliment: 'Your warmth makes people turn toward your light without even realizing why they are smiling.' },
  { id: 5, name: 'Cotton Candy Peony', species: 'Peony', color: '#f472b6', compliment: 'Soft, lush, and full of romance—just like the feeling of holding you close.' },
  { id: 6, name: 'Lavender Dream Orchid', species: 'Orchid', color: '#a855f7', compliment: 'Rare, delicate, and unforgettable—there is truly no one else like you, Sonyyy.' },
  { id: 7, name: 'Peach Blossom Camellia', species: 'Camellia', color: '#fb923c', compliment: 'Your gentle kindness warms hearts faster than any summer afternoon.' },
  { id: 8, name: 'Baby Pink Cherry Blossom', species: 'Sakura', color: '#f9a8d4', compliment: 'Every smile you give feels like petals drifting gently through golden air.' },
  { id: 9, name: 'Cream Gardenia', species: 'Gardenia', color: '#fde68a', compliment: 'Peaceful, soothing, and comforting—being around you feels like resting in a quiet garden.' },
  { id: 10, name: 'Crimson Heart Dahlia', species: 'Dahlia', color: '#e11d48', compliment: 'Vibrant, passionate, and full of life—you make every moment feel wonderfully alive.' },
  { id: 11, name: 'Sky Blue Forget-Me-Not', species: 'Forget-Me-Not', color: '#38bdf8', compliment: 'Even the smallest moments with you stay tucked safely inside my favorite thoughts.' },
  { id: 12, name: 'Forever Bouquet for Sonyyy', species: 'Bouquet', color: '#ec4899', compliment: 'Not one flower here blooms half as beautifully as your smile when you feel truly loved.' },
];

export interface StarReason {
  id: number;
  x: number; // percentage inside heart constellation canvas
  y: number;
  reason: string;
}

// 18 points arranged along a parametric heart silhouette (normalized 10..90%)
export const STAR_REASONS: StarReason[] = [
  { id: 1, x: 50, y: 31, reason: 'Because your smile makes my entire day brighter.' },
  { id: 2, x: 39, y: 21, reason: 'Because you care with your whole genuine heart.' },
  { id: 3, x: 26, y: 20, reason: 'Because your laugh is my favorite melody.' },
  { id: 4, x: 16, y: 29, reason: 'Because even your grumpy pout is dangerously cute.' },
  { id: 5, x: 15, y: 43, reason: 'Because your eyes hold a universe I adore.' },
  { id: 6, x: 21, y: 56, reason: 'Because you listen and remember the little things.' },
  { id: 7, x: 30, y: 68, reason: 'Because talking to you feels like home.' },
  { id: 8, x: 40, y: 78, reason: 'Because you make ordinary days feel magical.' },
  { id: 9, x: 50, y: 87, reason: 'Because your presence brings peace to my chaos.' },
  { id: 10, x: 60, y: 78, reason: 'Because you are brilliantly sharp and thoughtful.' },
  { id: 11, x: 70, y: 68, reason: 'Because your softness makes me want to be better.' },
  { id: 12, x: 79, y: 56, reason: 'Because you deserve gentleness on hard days.' },
  { id: 13, x: 85, y: 43, reason: 'Because you are effortlessly gorgeous inside and out.' },
  { id: 14, x: 84, y: 29, reason: 'Because your little habits make me fall harder.' },
  { id: 15, x: 74, y: 20, reason: 'Because you are bravely authentic in everything.' },
  { id: 16, x: 61, y: 21, reason: 'Because choosing you is the easiest thing I do.' },
  { id: 17, x: 50, y: 52, reason: 'Because my heart feels safest right next to yours.' },
  { id: 18, x: 50, y: 65, reason: 'Because Sonyyy, you are simply my favorite person.' },
];

export interface FlirtyQuestion {
  id: string;
  question: string;
  optionA: string;
  optionB: string;
  responseA: string;
  responseB: string;
}

export const FLIRTY_QUESTIONS: FlirtyQuestion[] = [
  {
    id: 'q1',
    question: 'A thousand forehead kisses or unlimited cuddles?',
    optionA: 'A thousand forehead kisses 😘',
    optionB: 'Unlimited cuddles 🫂',
    responseA: 'Deal! Starting with ten soft forehead kisses right now—and yes, I am keeping count just to sneak in extra.',
    responseB: 'Perfect choice! Clear your schedule because I am not letting go anytime soon, sleepyhead 🧸💗',
  },
  {
    id: 'q2',
    question: 'A surprise date or a surprise bouquet?',
    optionA: 'A surprise date ✨',
    optionB: 'A surprise bouquet 💐',
    responseA: 'Already planning the cutest sunset walk, cozy food, and watching you smile the whole evening!',
    responseB: 'Fresh pink roses and tulips arriving with a handwritten note—though you will still outshine the flowers.',
  },
  {
    id: 'q3',
    question: 'One long hug or a million tiny kisses?',
    optionA: 'One long hug 🧸',
    optionB: 'A million tiny kisses 💋',
    responseA: 'One of those quiet 5-minute hugs where the rest of the world pauses and your heart feels completely safe.',
    responseB: 'Accepted! Cheeks, forehead, nose tip—every spot gets covered until you are laughing and blushing.',
  },
  {
    id: 'q4',
    question: 'My favourite compliment or my favourite nickname?',
    optionA: 'My favourite compliment 💬',
    optionB: 'My favourite nickname 🥰',
    responseA: 'Here it is: you carry a softness and beauty that turns ordinary moments into things I treasure forever.',
    responseB: 'Come hereeee, my sweetest little wonder—my babyyyy Sonyyyy gets all the love today!',
  },
  {
    id: 'q5',
    question: 'A romantic sunset or a midnight conversation?',
    optionA: 'A romantic sunset 🌅',
    optionB: 'A midnight conversation 🌙',
    responseA: 'Golden pink sky, warm breeze, and me looking at you instead of the sunset the whole time.',
    responseB: 'Soft late-night voices, zero distractions, sharing silly thoughts and deep feelings till we fall asleep smiling.',
  },
  {
    id: 'q6',
    question: 'A teddy bear bigger than you or a teddy bear you can carry everywhere?',
    optionA: 'Teddy bigger than me! 🧸',
    optionB: 'Pocket teddy everywhere 👜',
    responseA: 'An absurdly giant fluffy teddy bear for giant cuddle sessions whenever I am not right next to you!',
    responseB: 'A cute pocket teddy that rides along everywhere as your tiny bodyguard—reminding you I adore you.',
  },
];

export interface DreamMemoryTree {
  id: number;
  title: string;
  season: string;
  dreamMessage: string;
}

export const DREAM_MEMORY_TREES: DreamMemoryTree[] = [
  { id: 1, title: 'Sunset Walk Tree', season: 'Future Evening', dreamMessage: 'An unhurried evening walk under pastel skies, laughing over silly jokes and stopping only for ice cream.' },
  { id: 2, title: 'Cozy Cafe Corner Tree', season: 'Rainy Afternoon', dreamMessage: 'Sitting across a tiny warm table while rain falls outside, sharing desserts and talking for hours.' },
  { id: 3, title: 'Stargazing Blanket Tree', season: 'Quiet Night', dreamMessage: 'Lying back under a blanket of stars, trading dreams and quiet wishes until midnight passes.' },
  { id: 4, title: 'Surprise Bouquet Tree', season: 'Any Random Tuesday', dreamMessage: 'Bringing you your favorite flowers on an ordinary day just to see that surprised smile appear.' },
  { id: 5, title: 'Long Drive Playlist Tree', season: 'Golden Hour', dreamMessage: 'Windows slightly cracked, your favorite songs playing, and nowhere we need to rush to.' },
  { id: 6, title: 'Photo Booth Laughs Tree', season: 'Weekend Adventure', dreamMessage: 'Silly candid moments, goofy poses, and snapshots where you are laughing uncontrollably.' },
  { id: 7, title: 'Movie & Blanket Fort Tree', season: 'Lazy Sunday', dreamMessage: 'Too many snacks, cozy blankets, and falling asleep halfway through because comfort won.' },
  { id: 8, title: 'Growing Together Tree', season: 'Every Season Ahead', dreamMessage: 'Learning each other more gently every year—celebrating highs and holding hands softly through lows.' },
];

export const HEART_PROMISES: string[] = [
  'I will listen when you need to be heard',
  'I will respect your feelings',
  'I will communicate instead of making assumptions',
  'I will keep learning how to love you better',
  'I will never make you feel guilty for expressing your emotions',
  'I want us to grow together not hurt each other',
];

export interface TeddyArmyRecruit {
  id: number;
  name: string;
  carrying: 'rose' | 'chocolate' | 'balloon' | 'apology' | 'gift';
  badge: string;
  compliment: string;
}

export const TEDDY_ARMY_BEARS: TeddyArmyRecruit[] = [
  { id: 1, name: 'Captain Cuddles', carrying: 'rose', badge: '🌹 Rose Carrier', compliment: 'Reporting for duty! Miss Sonyyy has been officially declared too cute to stay upset.' },
  { id: 2, name: 'Sergeant Sweettooth', carrying: 'chocolate', badge: '🍫 Cocoa Squad', compliment: 'Emergency chocolate delivery! Warning: may still be less sweet than Sonyyy.' },
  { id: 3, name: 'Corporal Floaty', carrying: 'balloon', badge: '🎈 Balloon Unit', compliment: 'Bringing floating hearts because your smile deserves to rise sky-high!' },
  { id: 4, name: 'Private Sorry-Bear', carrying: 'apology', badge: '💌 Peace Envoy', compliment: 'I brought a tiny apology scroll and very fluffy paws ready for forgiveness hugs.' },
  { id: 5, name: 'Major Sparkles', carrying: 'gift', badge: '🎁 Surprise Division', compliment: 'Unwrapping order #5: 100% pure adoration with zero expiration date.' },
  { id: 6, name: 'Lieutenant Blush', carrying: 'rose', badge: '🌹 Rose Carrier', compliment: 'Mission status: trying not to blush when Sonyyy smiles—mission failed immediately.' },
  { id: 7, name: 'Teddy Truffle', carrying: 'chocolate', badge: '🍫 Cocoa Squad', compliment: 'Scientifically proven: one laugh from Sonyyy cures 99.9% of bad moods.' },
  { id: 8, name: 'Officer Cloudpuff', carrying: 'balloon', badge: '🎈 Balloon Unit', compliment: 'Airspace cleared for unlimited cuddles and soft pastel skies!' },
  { id: 9, name: 'Little Note Bear', carrying: 'apology', badge: '💌 Peace Envoy', compliment: 'Reminder from HQ: your feelings always matter, even the tiny quiet ones.' },
  { id: 10, name: 'Sir Ribbon', carrying: 'gift', badge: '🎁 Surprise Division', compliment: 'This box contains 1,000 forehead kisses—handle gently and smile immediately!' },
  { id: 11, name: 'Commander Cozy', carrying: 'rose', badge: '🌹 Rose Carrier', compliment: 'Even a whole battalion of roses looks shy next to your face.' },
  { id: 12, name: 'Chef Cocoa Paws', carrying: 'chocolate', badge: '🍫 Cocoa Squad', compliment: 'Fresh fudge baked with extra admiration for your gorgeous eyes.' },
  { id: 13, name: 'Balloon Boop', carrying: 'balloon', badge: '🎈 Balloon Unit', compliment: 'Tying 50 balloons to lift every heavy worry off your cute shoulders.' },
  { id: 14, name: 'Gentleman Ted', carrying: 'apology', badge: '💌 Peace Envoy', compliment: 'Official plea: please accept one giant teddy hug and a tiny nose boop.' },
  { id: 15, name: 'General Giggles', carrying: 'gift', badge: '🎁 Surprise Division', compliment: 'Breaking alert: your grumpy expressions are still ranked #1 cutest on earth.' },
  { id: 16, name: 'Velvet Scout', carrying: 'rose', badge: '🌹 Rose Carrier', compliment: 'Patrolling the garden—confirming Sonyyy is still the prettiest bloom here.' },
  { id: 17, name: 'Snickers Bear', carrying: 'chocolate', badge: '🍫 Cocoa Squad', compliment: 'You are not you when you are grumpy—have a chocolate and a cuddle!' },
  { id: 18, name: 'Pinky Balloon', carrying: 'balloon', badge: '🎈 Balloon Unit', compliment: 'Each balloon holds one secret reason why you are completely irreplaceable.' },
  { id: 19, name: 'Softie Medic', carrying: 'apology', badge: '💌 Peace Envoy', compliment: 'Prescribing 20cc of warmth, 50cc of patience, and endless forehead kisses.' },
  { id: 20, name: 'Admiral Bowtie', carrying: 'gift', badge: '🎁 Surprise Division', compliment: 'Special delivery: a lifetime subscription to being cherished gently.' },
  { id: 21, name: 'Petal Patrol', carrying: 'rose', badge: '🌹 Rose Carrier', compliment: 'Laying down rose petals wherever Sonyyy walks today—queen protocol!' },
  { id: 22, name: 'Caramel Cub', carrying: 'chocolate', badge: '🍫 Cocoa Squad', compliment: 'Sweet, warm, and melts easily—wait, that describes my heart around you.' },
  { id: 23, name: 'Skyhugger Bear', carrying: 'balloon', badge: '🎈 Balloon Unit', compliment: 'Floating by to remind you that you are someone’s absolute favorite person.' },
  { id: 24, name: 'Sincere Teddy', carrying: 'apology', badge: '💌 Peace Envoy', compliment: 'No excuses, just genuine love and a promise to keep doing better for you.' },
  { id: 25, name: 'Treasure Cub', carrying: 'gift', badge: '🎁 Surprise Division', compliment: 'Inside this tiny box: 100% proof that your smile is worth every effort.' },
  { id: 26, name: 'Rosie Cheeks', carrying: 'rose', badge: '🌹 Rose Carrier', compliment: 'Warning: intense cute-attack incoming. Surrender your frown immediately!' },
  { id: 27, name: 'Praline Guard', carrying: 'chocolate', badge: '🍫 Cocoa Squad', compliment: 'Guarding Sonyyy’s happiness with chocolates, hugs, and terrible bear puns.' },
  { id: 28, name: 'Starlight Cub', carrying: 'balloon', badge: '🎈 Balloon Unit', compliment: 'Even the stars asked for your autograph after seeing your eyes.' },
  { id: 29, name: 'Honeyheart Bear', carrying: 'apology', badge: '💌 Peace Envoy', compliment: 'All 29 bears agree: making you feel safe and loved is top priority.' },
  { id: 30, name: 'Boss Bear #30', carrying: 'gift', badge: '🎁 Final Recruit', compliment: 'The whole teddy army salutes you, Sonyyy—now give us one tiny smile! 🧸💗' },
];

export const DEEP_LETTER_PARAGRAPHS: string[] = [
  'My dearest Sonyyy,',
  'If you are reading this, I hope the noise of the day has quieted down just a little, and that for a few gentle minutes, you can simply feel how deeply you matter to me.',
  'Sometimes in everyday life, we move too fast, say imperfect things, or misunderstand each other in moments where all either of us really wanted was to feel heard. And for every moment where my words, my timing, or my carelessness ever made your heart feel heavy or overlooked—I am genuinely, deeply sorry.',
  'You are not someone I ever want to take lightly. Your personality—that unforgettable blend of softness, warmth, sharp wit, emotional depth, and adorable little moods—is something so rare. I admire how honestly you feel things, how thoughtfully you notice tiny details, and how much quiet effort you put into caring even when you are tired.',
  'Your presence changes the temperature of my whole day. Even an ordinary conversation with you carries a comfort I cannot find anywhere else. When you smile, something in me immediately relaxes; when you are hurt, I do not want to brush past it—I want to understand it, sit with it gently, and learn how to love you with more care and patience.',
  'I am not going to make flashy, impossible promises about being flawless. I am human, and I will still have things to learn. What I can promise honestly is that I want to keep learning you—listening better, respecting your feelings without defensiveness, appreciating your little efforts, and choosing you with intention every single day.',
  'You deserve a love that feels calm, respectful, warm, and safe. You deserve to feel adored on your bright days and held softly on your difficult ones. Thank you for being you, Sonyyy—for your heart, your grace, and every little piece of magic you carry without even realizing it.',
];

export interface SecretObjectItem {
  id: string;
  sceneId: number;
  label: string;
  icon: string;
  message: string;
}

export const SECRET_OBJECTS: SecretObjectItem[] = [
  { id: 'sec-1', sceneId: 1, label: 'Twinkling Entrance Star', icon: '🌟', message: 'Secret #1: Every detail of this universe started with one thought—making your eyes sparkle.' },
  { id: 'sec-2', sceneId: 3, label: 'Tiny Peace Heart', icon: '🤍', message: 'Secret #2: Even when you are mad at me, you still look dangerously adorable.' },
  { id: 'sec-3', sceneId: 5, label: 'Hidden Monarch Butterfly', icon: '🦋', message: 'Secret #3: You have no idea how effortlessly you bring life to everything around you.' },
  { id: 'sec-4', sceneId: 7, label: 'Golden Tiara Gem', icon: '💎', message: 'Secret #4: Royal decree—Sonyyy is officially excused from stressing today.' },
  { id: 'sec-5', sceneId: 11, label: 'Secret Shooting Star', icon: '🌠', message: 'Secret #5: If I wished on a shooting star right now, it would still be about your happiness.' },
  { id: 'sec-6', sceneId: 14, label: 'Hidden Sugar Cube', icon: '🧁', message: 'Secret #6: Our cafe tab is permanently settled with smiles and warm hugs.' },
  { id: 'sec-7', sceneId: 16, label: 'Wax Seal Whisper', icon: '🕯️', message: 'Secret #7: You are my favorite notification of every single day.' },
  { id: 'sec-8', sceneId: 18, label: 'Disco Mirror Heart', icon: '🪩', message: 'Secret #8: Nobody else even comes close to being my favorite dance partner.' },
  { id: 'sec-9', sceneId: 20, label: 'Warm Candlelight', icon: '✨', message: 'Secret #9: On your quietest, most tired nights, you never have to pretend with me.' },
  { id: 'sec-10', sceneId: 23, label: 'Dream Garden Clover', icon: '🍀', message: 'Secret #10: Getting to meet and adore you feels like the luckiest plot twist ever.' },
  { id: 'sec-11', sceneId: 26, label: 'Moonlight Lantern', icon: '🏮', message: 'Secret #11: Sending a quiet wish up to the moon that your heart always feels safe.' },
  { id: 'sec-12', sceneId: 29, label: 'Golden Ribbon Bow', icon: '🎀', message: 'Secret #12: The biggest gift in this whole universe is honestly just having you in mine.' },
];

export const SCRATCH_NOTES: string[] = [
  'P.S. Look at you smiling right now—mission accomplished, my prettiest girl 💗',
  'Secret Voucher: Redeemable anytime for 1 extra-long hug + your favorite treat 🧸🍫',
  'No matter what happens on any day, you are deeply, genuinely loved, Sonyyy ✨',
];

export const RANDOM_COMPLIMENTS: string[] = [
  'Sonyyy, your smile genuinely upgrades the entire atmosphere around you.',
  'You are effortlessly pretty, dangerously cute, and deeply lovable.',
  'Even your dramatic little grumpy moments are somehow my favorite.',
  'Your heart is soft gold, and I never want to take that for granted.',
  'Out of all the things to think about today, you are still my favorite.',
  'Your eyes could outshine a whole midnight sky without even trying.',
  'Thank you for being the kind of person who makes life feel warmer.',
  'You deserve patience, softness, chocolates, and a million forehead kisses.',
  'Everything feels calmer the moment you are around.',
  'You have your own unmistakable little magic, Sonyyy, and it is unforgettable.',
];

export type SweetWordMood =
  | 'Chosen & Safe'
  | 'Overthinking Cure'
  | 'Little Details'
  | 'Unfiltered Pretty'
  | 'Always Yours';

export interface SweetWordItem {
  id: string;
  mood: SweetWordMood;
  hinglish: string;
  whisper: string;
}

export const SWEET_WORDS_FOR_GIRLS: SweetWordItem[] = [
  {
    id: 'sw-1',
    mood: 'Chosen & Safe',
    hinglish: 'Tum mere liye koi option nahi, mera sabse sukoon wala choice ho — aur hamesha rahogi.',
    whisper: 'You never have to compete for my attention. My heart already picked you.',
  },
  {
    id: 'sw-2',
    mood: 'Chosen & Safe',
    hinglish: 'Mere saamne tumhe kabhi strong banne ka dikhawa nahi karna — apni har thakan, har mood mere paas rakh sakti ho.',
    whisper: 'Your softness, your tears, and your quiet days are all completely safe with me.',
  },
  {
    id: 'sw-3',
    mood: 'Chosen & Safe',
    hinglish: 'Chahe din kitna bhi busy ho, tumhara ek message aate hi dil ko lagta hai sab theek hai.',
    whisper: 'No matter how hectic life gets, you will never be an afterthought to me.',
  },
  {
    id: 'sw-4',
    mood: 'Overthinking Cure',
    hinglish: 'Jab bhi tumhara dil raat ko zyada soche aur ghabraaye, bas itna yaad rakhna: main kahin nahi ja raha, Sonyyy.',
    whisper: 'Even on days we argue or misunderstand, leaving is never on my mind—fixing things together is.',
  },
  {
    id: 'sw-5',
    mood: 'Overthinking Cure',
    hinglish: 'Tum kabhi "too much" nahi ho — tumhari feelings, tumhara care karna, sab mere liye keemti hai.',
    whisper: 'Never shrink how deeply you feel just to seem easy. I adore your whole heart.',
  },
  {
    id: 'sw-6',
    mood: 'Overthinking Cure',
    hinglish: 'Agar kabhi meri baat se dil bhaari ho jaaye, mujhe seedha bol dena — main ego se zyada tumhe choose karta hoon.',
    whisper: 'Listening to understand you will always matter more to me than winning an argument.',
  },
  {
    id: 'sw-7',
    mood: 'Little Details',
    hinglish: 'Mujhe tumhari woh choti si muskurahat jo tum chhupane ki koshish karti ho, sabse pehle dikh jaati hai.',
    whisper: 'Every tiny shift in your voice, your mood, and your eyes—I notice it all because you matter.',
  },
  {
    id: 'sw-8',
    mood: 'Little Details',
    hinglish: 'Tumhara woh cute sa gussa aur phir do minute baad pighal jaana — meri sabse favourite cheez hai.',
    whisper: 'Even when you try to act strict with me, you still melt my heart effortlessly.',
  },
  {
    id: 'sw-9',
    mood: 'Little Details',
    hinglish: 'Tum jab kisi cheez ke liye genuinely excited hoti ho na, tumhari aankhein poori duniya roshan kar deti hain.',
    whisper: 'Watching you light up over little surprises is my favorite view on earth.',
  },
  {
    id: 'sw-10',
    mood: 'Unfiltered Pretty',
    hinglish: 'Bina makeup, messy hair aur sleepy eyes mein bhi tum mujhe duniya ki sabse khoobsurat ladki lagti ho.',
    whisper: 'You do not need filters or dressing up to take my breath away—you just have to be you.',
  },
  {
    id: 'sw-11',
    mood: 'Unfiltered Pretty',
    hinglish: 'Chaand aur phool sab apni jagah, par jab tum saamne aati ho toh nazar kahin aur tikti hi nahi.',
    whisper: 'Pretty looks fade quickly, but your grace and warmth stay unforgettable forever.',
  },
  {
    id: 'sw-12',
    mood: 'Unfiltered Pretty',
    hinglish: 'Tumhari awaaz mein ek aisa jaadu hai jo mere poore din ki thakan ek minute mein utaar deta hai.',
    whisper: 'Hearing your voice—even when you are half asleep—feels like home.',
  },
  {
    id: 'sw-13',
    mood: 'Always Yours',
    hinglish: 'Tumhari choti choti khushiyan poori karna mera farz nahi, meri sabse pyaari khwahish hai.',
    whisper: 'Making you feel cherished and spoiled is something I genuinely enjoy doing.',
  },
  {
    id: 'sw-14',
    mood: 'Always Yours',
    hinglish: 'Main perfect nahi hoon, par tumhe pyaar aur izzat dene ki koshish har din aur behtar karunga.',
    whisper: 'Every single version of my future feels brighter with your hand in mine, Sonyyy.',
  },
  {
    id: 'sw-15',
    mood: 'Always Yours',
    hinglish: 'Agar koi pooche zindagi mein sabse pyaari cheez kya mili, toh bina soche tumhara naam aayega.',
    whisper: 'Out of eight billion people, my heart still feels luckiest just getting to adore you.',
  },
];

export interface AboutUsQuestion {
  id: string;
  tag: string;
  question: string;
  options: [
    { label: string; reply: string },
    { label: string; reply: string },
    { label: string; reply: string },
  ];
}

export const ABOUT_US_QUESTIONS: AboutUsQuestion[] = [
  {
    id: 'us-1',
    tag: '2 AM Talks 🌙',
    question: 'Agar hum dono raat ke 2 baje bina kisi reason ke baat kar rahe ho, sabse pehle kya share karna chahogi?',
    options: [
      { label: 'Random cute gossip & hassi 😂', reply: 'Yes please! Main bina thake 3 ghante sirf tumhari baatein aur hansna sun sakta hoon.' },
      { label: 'Dil ki koi deep feeling 💭', reply: 'Mera poora dhyan sirf tum par hoga—no interruptions, bas hum dono aur dil ki baatein.' },
      { label: 'Bas quiet voice call & neend 🧸', reply: 'Sabse peaceful feeling—so jaana meri awaaz sunte hue, safe and warm.' },
    ],
  },
  {
    id: 'us-2',
    tag: 'Angry Bear Protocol 😤💗',
    question: 'Jab tum mujhse thoda sa gussa ho jaati ho, dil se sabse pehle kya chahti ho?',
    options: [
      { label: 'Extra pyaar aur manana 🥺', reply: 'Noted! Ek second ke andar extra sweetness, apologies, aur cute memes deploy ho jayenge.' },
      { label: 'Bina judge kiye sunna 🤍', reply: 'Promise: main pehle poori baat dil se sununga, bina argument ya excuses ke.' },
      { label: 'Chocolates + tight hug 🍫🫂', reply: 'Emergency chocolate + 5-minute bear hug permanently unlocked for Miss Sonyyy!' },
    ],
  },
  {
    id: 'us-3',
    tag: 'Our Drive Playlist 🚗🎵',
    question: 'Humari long drive par gaadi mein sabse zyada kiska vibe chalega?',
    options: [
      { label: 'Soft romantic Hindi songs 🎶', reply: 'Windows thodi si khuli, hawa, aur tumhare saath romantic gaane—pure Bollywood dream!' },
      { label: 'Tumhari choice + sing-along 🎤', reply: 'DJ Sonyyy ki playlist final! Main toh bas tumhe gaate hue dekh ke muskuraunga.' },
      { label: 'Music slow, sirf baatein ✨', reply: 'Best choice—duniya peeche chhoot jaaye aur bas humari baatein chalti rahein.' },
    ],
  },
  {
    id: 'us-4',
    tag: 'Tiny Habits 👀',
    question: 'Hum dono ke beech kaunsa cute moment tumhe sabse zyada special lagta hai?',
    options: [
      { label: 'Choti choti cheezein yaad rakhna 💌', reply: 'Tumhari har choti pasand yaad rakhna mera favorite kaam hai, Sonyyy.' },
      { label: 'Bina wajah "miss you" bolna 💗', reply: 'Aur abhi bhi bol raha hoon—tum saamne na ho toh sab kuch thoda adhoora lagta hai.' },
      { label: 'Ek dusre ko chhedna aur hassna 🤭', reply: 'Thodi si masti aur dher saara pyaar—yehi toh humara best combo hai!' },
    ],
  },
  {
    id: 'us-5',
    tag: 'Whole Day Together ☀️',
    question: 'Agar ek poora Sunday sirf hum dono ka ho, bina kisi kaam ya phone ke, kahaan se start karein?',
    options: [
      { label: 'Cozy breakfast & chai ☕', reply: 'Garama-garam chai, sleepy smiles, aur koi jaldi nahi kahin jaane ki!' },
      { label: 'Subah ki cute walk & ice cream 🍦', reply: 'Subah se hi dessert? Sonyyy ke rules mein bilkul allowed hai!' },
      { label: 'Lazy cuddles & movie marathon 🎬', reply: 'Blanket fort ready rakho, snacks meri taraf se—best Sunday ever!' },
    ],
  },
  {
    id: 'us-6',
    tag: 'Secret Wish 🌟',
    question: 'Mere baare mein ek cheez jo tum chahti ho main hamesha aise hi rakhoon?',
    options: [
      { label: 'Yahi softness aur care 🧸', reply: 'Dil se promise: waqt ke saath yeh care kam nahi, sirf aur gehri hogi.' },
      { label: 'Har mood mein samajhna 💞', reply: 'Chahe happy day ho ya tough day, main hamesha tumhari team mein hoon.' },
      { label: 'Chote surprises dete rehna 🎁', reply: 'Ready rehna phir—bina occasion ke bhi surprises aate rahenge!' },
    ],
  },
];

export interface DatingPlanItem {
  id: string;
  number: string;
  title: string;
  vibe: string;
  timeOfDay: string;
  emoji: string;
  description: string;
  whatIllBring: string;
  dressCode: string;
  sweetPromise: string;
}

export const DATING_PLANS: DatingPlanItem[] = [
  {
    id: 'date-1',
    number: 'DATE 01',
    title: 'Sunset Chai, Momos & Long Walk',
    vibe: 'Warm, Candid & Effortless',
    timeOfDay: '5:30 PM · Golden Hour',
    emoji: '☕🥟',
    description: 'Haath mein garam kulhad chai, spicy momos, aur pink-orange sunset ke neeche bina kisi jaldi ke lambi walk.',
    whatIllBring: 'Ek chota sa phool aur tumhare liye extra tissue + water bottle (full care mode!).',
    dressCode: 'Jo tumhe sabse cozy lage—tum kuch bhi pehno, sabse pyaari lagogi.',
    sweetPromise: 'Phone silent par rahega; poori evening sirf tumhari baatein aur hassi.',
  },
  {
    id: 'date-2',
    number: 'DATE 02',
    title: 'Midnight Long Drive + Playlist',
    vibe: 'Dreamy & Cinematic',
    timeOfDay: '10:30 PM · Starry Night',
    emoji: '🚗✨',
    description: 'Khali sadkein, thandi hawa, humare favourite romantic gaane aur ek random midnight ice cream stop.',
    whatIllBring: 'Tumhari favourite chocolates aur ek warm hoodie agar thand lage.',
    dressCode: 'Comfy aesthetic night outfit.',
    sweetPromise: 'Har red light par tumhari taraf dekh ke smile karna guaranteed hai.',
  },
  {
    id: 'date-3',
    number: 'DATE 03',
    title: 'Rainy Evening Blanket Fort & Movies',
    vibe: 'Ultra Cozy & Safe',
    timeOfDay: 'Evening · Rain Vibes',
    emoji: '🌧️🍿',
    description: 'Baahar halki baarish, andar fairy lights, soft pillows, popcorn, aur humari comfort romantic movie.',
    whatIllBring: 'Hot chocolate, fries, brownies, aur endless teddy cuddles.',
    dressCode: 'Cute pajamas / oversized tee!',
    sweetPromise: 'Agar tum movie ke beech so bhi jao, main bas sukoon se tumhe dekhta rahunga.',
  },
  {
    id: 'date-4',
    number: 'DATE 04',
    title: 'Aesthetic Cafe & Polaroid Date',
    vibe: 'Soft Pastel & Cute',
    timeOfDay: '3:30 PM · Afternoon',
    emoji: '📸🍰',
    description: 'Ek pyaare se floral cafe mein cheesecake share karna, silly Polaroid photos lena aur ek dusre ko cute notes likhna.',
    whatIllBring: 'Chota sa Polaroid camera aur ek handwritten card.',
    dressCode: 'Pastel pink / soft cream vibes.',
    sweetPromise: 'Tumhari 100 candid photos khinchunga jab tak tum blush na kar do!',
  },
  {
    id: 'date-5',
    number: 'DATE 05',
    title: 'Dress-Up Candlelight Dinner',
    vibe: 'Princess Treatment',
    timeOfDay: '8:00 PM · Dinner Date',
    emoji: '🌹🕯️',
    description: 'Tumhare liye ek dreamy dinner night jahan tum sirf baitho, muskurao aur queen ki tarah pamper ho.',
    whatIllBring: 'Fresh pink roses ka bouquet aur ek secret little bracelet/ring.',
    dressCode: 'Thoda sa glam—aur meri nazrein tum par se nahi hatengi.',
    sweetPromise: 'Tumhe feel hoga ki poori duniya mein aaj sirf tum special ho.',
  },
  {
    id: 'date-6',
    number: 'DATE 06',
    title: 'Terrace Stargazing & Deep Talks',
    vibe: 'Quiet Magic & Soulful',
    timeOfDay: '9:30 PM · Under Stars',
    emoji: '🌙🔭',
    description: 'Chhat par ek chatai/blanket, garam coffee, aasmaan ke taare aur sapno ki baatein bina kisi shor ke.',
    whatIllBring: 'Warm shawl, Bluetooth speaker (soft lo-fi), aur tumhari favourite sweets.',
    dressCode: 'Sweater weather coziness.',
    sweetPromise: 'Har toot-te taare par sirf tumhari khushi maangunga.',
  },
  {
    id: 'date-7',
    number: 'DATE 07',
    title: 'Bookstore & Cute Stationery Hunt',
    vibe: 'Playful & Thoughtful',
    timeOfDay: '1:00 PM · Weekend',
    emoji: '📚🎀',
    description: 'Ek dusre ke liye ek book choose karna, cute stickers aur journals dekhna, aur corner coffee pe baithna.',
    whatIllBring: 'Jo bhi cute cheez tumhe pasand aaye, woh bina soche tumhare bag mein!',
    dressCode: 'Casual chic + cute tote bag.',
    sweetPromise: 'Main tumhare liye jo book pick karunga uske first page par ek pyaara note likhunga.',
  },
  {
    id: 'date-8',
    number: 'DATE 08',
    title: 'No-Phone Whole Day Just For Us',
    vibe: 'Pure Presence',
    timeOfDay: '10 AM – 10 PM · Full Day',
    emoji: '💞🕰️',
    description: 'Subah ki hassi se lekar raat ki goodbye hug tak—zero social media, zero stress, bas 100% hum dono.',
    whatIllBring: 'Poora dil, poora patience, aur ek full itinerary of little surprises.',
    dressCode: 'Pure happy energy!',
    sweetPromise: 'Din khatam hone par tumhare chehre par duniya ki sabse badi smile hogi.',
  },
];

export interface SongLyricLine {
  timeSec: number;
  line: string;
  meaning: string;
}

export interface RomanticSongTrack {
  id: 'teri-hasi' | 'chaand-aur-tum';
  title: string;
  subtitle: string;
  durationSec: number;
  bpmLabel: string;
  lyrics: SongLyricLine[];
}

export const ROMANTIC_SONGS: RomanticSongTrack[] = [
  {
    id: 'teri-hasi',
    title: 'Teri Hasi (Sonyyy’s Song)',
    subtitle: 'Original Romantic Ballad · Written & Composed Just For You 💗',
    durationSec: 48,
    bpmLabel: '76 BPM · Acoustic & Warm Pad',
    lyrics: [
      {
        timeSec: 0,
        line: '♪ Raat ke khamosh aasmaan mein, ek naam sabse pyaara hai... ♪',
        meaning: 'In the quiet night sky, one name shines the sweetest — yours.',
      },
      {
        timeSec: 6,
        line: 'Teri choti si muskurahat pe, mera poora jahaan haara hai...',
        meaning: 'To just one tiny smile of yours, my entire world surrenders.',
      },
      {
        timeSec: 12,
        line: 'Jab tu thoda sa rooth jaaye, woh gussa bhi lage duaon sa...',
        meaning: 'Even when you pout and get mad, that cute anger feels like a blessing.',
      },
      {
        timeSec: 18,
        line: 'Tere saath har ek pal lage, kisi khoobsurat fasaane sa...',
        meaning: 'Every single moment with you feels like my favorite fairytale.',
      },
      {
        timeSec: 24,
        line: 'Chaand bhi pooche aake mujhse, kaun hai yeh jo itna chamakta hai...',
        meaning: 'Even the moon asks me softly, who is this girl glowing so effortlessly?',
      },
      {
        timeSec: 30,
        line: 'Maine hans ke kaha — yeh meri Sonyyy hai, jispe mera har din dhalta hai...',
        meaning: 'I smiled and said — she is my Sonyyy, the reason every day feels warm.',
      },
      {
        timeSec: 36,
        line: 'Haath thaam ke chalna hai sang, har dhoop mein har chhaaon mein...',
        meaning: 'I want to hold your hand through bright sunny days and cloudy ones too.',
      },
      {
        timeSec: 42,
        line: 'Tujhse hi shuru, tujhpe hi khatam — tu hi basi hai meri har duaon mein 💗',
        meaning: 'Beginning with you, ending with you — you live inside every prayer of mine.',
      },
    ],
  },
  {
    id: 'chaand-aur-tum',
    title: 'Chaand Aur Tum (Midnight Lullaby)',
    subtitle: 'Soft Dreamy Waltz · For Late Nights & Overthinking Cure 🌙',
    durationSec: 40,
    bpmLabel: 'Dreamy 3/4 · Music Box & Strings',
    lyrics: [
      {
        timeSec: 0,
        line: '♪ Dheeme dheeme chalti hai hawa, so jaaye saara shor abhi... ♪',
        meaning: 'A soft breeze blows gently, letting all the noise of the world fall asleep.',
      },
      {
        timeSec: 5,
        line: 'Dil ke is chote se kone mein, bas ek hi khwahish hai basi...',
        meaning: 'Inside this quiet corner of my heart, there lives just one gentle wish...',
      },
      {
        timeSec: 10,
        line: 'Kabhi aankhon mein nami aaye toh, mera kandha hamesha paas rahe...',
        meaning: 'Whenever tears ever touch your eyes, may my shoulder always be right beside you.',
      },
      {
        timeSec: 15,
        line: 'Teri har khamoshi samajh sakoon, bas itni si dua khaas rahe...',
        meaning: 'To understand even the words you do not say—that is my quiet promise.',
      },
      {
        timeSec: 20,
        line: 'Chaand ne bhi seekha hai tumse, bina shor kiye roshan karna...',
        meaning: 'Even the moon learned from you how to shine softly without making noise.',
      },
      {
        timeSec: 25,
        line: 'Tum ho toh har mushkil aasaan, tum bina sab kuch adhoora lagna...',
        meaning: 'With you, every hard day feels lighter; without you, everything feels half-lit.',
      },
      {
        timeSec: 30,
        line: 'Muskura do ab ek baar zara, yeh universe tumhara hi toh hai...',
        meaning: 'Give me one tiny smile now—after all, this whole universe belongs to you.',
      },
      {
        timeSec: 35,
        line: 'Har kal, har pal, bas tum aur main — meri pyaari Sonyyy 🧸✨',
        meaning: 'Every tomorrow, every heartbeat, just you and me — my sweetest Sonyyy.',
      },
    ],
  },
];

