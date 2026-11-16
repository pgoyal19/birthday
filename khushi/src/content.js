
// Placeholder image maker. Replace any `img: ph(...)` with '/memes/my-meme.jpg' (put files in /public/memes).
import photo1 from './images/img1.jpeg';
import photo2 from './images/img1 (2).jpeg';
import photo3 from './images/img1 (3).jpeg';
import photo4 from './images/img1 (4).jpeg';
import photo5 from './images/img1 (5).jpeg';
import photo6 from './images/img1 (6).jpeg';
import photo7 from './images/img1 (7).jpeg';
import photo8 from './images/img1 (8).jpeg';
import photo9 from './images/img1 (9).jpeg';
import billu from './images/billu.png';
import whatIf from './images/whatif.png';
import hmm from './images/hmm.png';
import fun from './images/fun.png';
import mafia from './images/mafia.png';
import video1 from './images/img1 (2).mp4';
import video2 from './images/img1 (3).mp4';
import video3 from './images/img1 (4).mp4';
import video4 from './images/ved1-landscape.mp4';

const ph = (text, bg = '#ffd6e0', fg = '#c1121f') =>
  'data:image/svg+xml;utf8,' + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="600" height="600" fill="${bg}"/>` +
    `<text x="300" y="285" font-size="64" text-anchor="middle">🖼️</text>` +
    `<text x="300" y="350" font-size="30" font-family="sans-serif" font-weight="700" fill="${fg}" text-anchor="middle">${text}</text>` +
    `<text x="300" y="390" font-size="20" font-family="sans-serif" fill="${fg}" text-anchor="middle">replace me in content.js</text></svg>`);

export default {
  name: 'Khushi',
  musicUrl: '', // optional: '/music/song.mp3' (put in /public/music). Empty = built-in music-box tune.

  hero: {
    title: 'HAPPY BIRTHDAY KHUSHI!!! 🎀',
    subtitle: 'Another year of being iconic, problematic and absolutely irreplaceable.',
    button: 'ENTER AT YOUR OWN RISK 💗',
  },

  memeCategories: [
    {
      id: 'khushi', title: 'Khushi being Khushi', emoji: '💅', cards: [
        { img: billu, cap: 'Khushi: "5 minutes, I\'m almost ready." *45 minutes later* "Wait, where are my keys?"' },
        { img: whatIf, cap: 'Walks into a room like the room was waiting for her. (It was.)' },
      ]
    },
    {
      id: 'survived', title: 'Things we survived together', emoji: '🪖', cards: [
        { img: hmm, cap: 'Exams, bad haircuts, worse decisions, and each other\'s singing.' },
        { img: fun, cap: 'Us at 3am deciding to "just quickly" fix our lives.' },
        { img: mafia, cap: 'Red flag: knows all my secrets. Green flag: has never used them. Yet.' },
      ]
    },

  ],

  photos: [
    { img: photo1, cap: 'office work' },
    { img: photo2, cap: 'trying to study (maybe)' },
    { img: photo3, cap: 'caught in a giggle' },
    { img: photo4, cap: 'the iconic serious selfie' },
    { img: photo5, cap: 'main character at the cafe' },
    { img: photo6, cap: 'study era' },
    { img: photo7, cap: 'campus days with you' },
    { img: photo8, cap: 'one more cafe memory' },
    { img: photo9, cap: 'sunny-day duo' },
  ],

  videos: [
    { src: video1, cap: 'a little moment worth replaying' },
    { src: video2, cap: 'the giggles never stop' },
    { src: video3, cap: 'another one for the memory book' },
    { src: video4, cap: 'our chaos, on camera' },
  ],


  vault: {
    title: 'THE SECRET VAULT',
    subtitle: 'TOP SECRET KHUSHI FILES',
    warning: 'Only Khushi is authorised to access these classified documents.',
    wrong: [
      'Wrong password. Are you even Khushi?? 🕵️',
      'Nope. The vault laughed at you. 💀',
      'Access denied. Bestie, think harder.',
      'Incorrect. The FBI has been notified (jk) (maybe).',
    ],
    tooMany: 'Too many attempts. The vault is sulking. Try again in 15 minutes.',
    error: 'The password was accepted, but the private video could not be loaded. Check the server private media folder and try again.',
    unlocked: 'ACCESS GRANTED. Welcome back, Agent Khushi 💗',
  },

  letter: {
    to: 'Dear Khushi,',

    body:
      `Happy Birthday Khushiiii!❤️

Who would have thought that the same college, same class, same office nd the same madness of organising events would give me someone who would become such an important part of my college journey

from organising events together to judging people together, from sharing notes and helping each other survive college to having the most random conversations, we have literally collected so many little memories.

nd honestly, one thing I love about us is that we can fight with each other without ever forgetting that we have each other's backs. We can disagree, argue, have completely different perspectives, and still choose to understand each other. We don't have to agree on everything to respect each other's opinions. We can fight with each other but when it comes to the world, we know how to fight for each other. And that's something I genuinely cherish.

I love how there is no unnecessary jealousy or competition between us. We can celebrate each other's little and big achievements, share things, help each other grow and be genuinely happy for one another. In a world where friendships sometimes turn into competitions, I'm glad ours feels more like having someone on the same team.

Of course, we are not perfect. We have our own opinions, our own ways of looking at things nd sometimes our own ways of being dramatic but I guess that's what makes this friendship so special. We are two different people who don't always see things the same way but still make an effort to understand each other.

I hope you never lose that crazy, ambitious, slightly dramatic (okay sometimes VERY dramatic😂) version of yourself. I hope you achieve everything you dream of, get all the happiness u deserve, meet the right people nd never have to settle for anything less than what makes u happy.

nd please, let's keep making memories, organising events, judging people (strictly for research purposes obviously😭), sharing notes, having random fights nd making up like nothing happened.

Here's to more college memories, more office stories, more adventures and a friendship that continues long after college is over.

Happy Birthday once again, Khushi!❤️

P.S. No matter how many times we fight, remember that u are stuck with me. No refunds, no exchanges. 😭🫶🏻

Lots of love,`,
    from: 'Yr forever partner-in-crime💗',
  },


  surprises: [
    'You are the plot twist nobody saw coming and everybody needed.',
    'Fun fact: you are the reason there are screenshots in my camera roll.',
    'This message will self-destruct. Just kidding, you\'re stuck with me.',
    'Reminder: you owe me food. Forever. No refunds.',
    'If friendship were a crime, we\'d both be serving life. Worth it.',
    'Today\'s forecast: 100% chance of cake and unsolicited advice.',
  ],

  reasons: [
    'You make the worst days funny.',
    'You\'d fight anyone for me (and win).',
    'Your laugh is a public service.',
    'You tell me the truth even when I hate it.',
    'You remember the tiny things.',
    'You\'re the first person I tell everything to.',
  ],

  compliments: [
    'Your energy could power a small city. A chaotic one. 🏙️',
    'You\'re the human version of a warm hug and a plot twist.',
    'If vibes were currency, you\'d own the bank.',
    'You make "being yourself" look like a full-time talent.',
    'Your heart is bigger than your drama. And that\'s saying A LOT.',
    'People like you are why friendship playlists exist.',
  ],

  finale: {
    title: 'HAPPY BIRTHDAY TO MY FAVOURITE HUMAN! ❤️',
    message: 'Thank you for every laugh, every rant, every yaar ajj kya hua pta h call. Never change (except maybe your punctuality).💗',
    button: 'Click for the final surprise 🎁',
  },
};
