/* ==========================================================================
   SKILL DETAILS: edit this file to change what pops up in the Toolbox.

   How it works on the site:
     - Drag a skill pill onto the paw-print circle (or tap / click / press
       Enter on a pill) and a little sticky-note card pops out.
     - The card shows whatever you write for that skill below.

   Every field is OPTIONAL. Leave a field out (or '') and it is simply hidden.
   If a skill has no entry at all, it shows the friendly fallback at the bottom.

   ALL THE FIELDS (copy this block to add or change a skill):

     'Skill name exactly as spelled on the pill': {
       emoji:      '🎨',                        // little sticker next to the name
       tagline:    'my favorite way to relax',  // short handwritten line
       level:      4,                           // 0 hides the paws, 1 to 5 shows paws
       levelLabel: 'Comfort level',             // text beside the paws (e.g. 'Cat approval')
       details:    'What you use it for, what you made with it, anything you like.',
       tags:       ['Luminang', 'School project', 'Freelance'],   // small colored chips
       img:        'assets/images/Illustrations/bunnygirl.png',   // optional picture on top
       imgAlt:     'Describe the picture for screen readers',
       link:       { label: 'See the project', href: 'https://github.com/ellaiza9017/Luminang' }
     },

   The names must match the pill text exactly (capitals, spaces and symbols).
   Keep a comma after each entry. To add a brand-new pill, add its name to the
   SKILLS list in main.js too.
   ========================================================================== */

window.SKILL_INFO = {
  /* ---- Development & engines ---- */
  'Java': {
    emoji: '☕',
    tagline: 'The language that almost made me cry, but I didn\'t.',
    level: 1,
    levelLabel: 'we have a complicated relationship',
    details: 'I know the basics. I can read it, and write simple programs. Beyond that? We are still negotiating.',
  },

  'React': {
    emoji: '⚛️',
    tagline: 'Making interfaces one component at a time.',
    level: 2,
    levelLabel: 'Learning & building',
    details: 'Familiar with components, props, and basic React workflows. Have applied them in academic projects and am working on more independent implementations.',
  },

  'Flutter': {
    emoji: '🦋',
    tagline: 'Currently exploring this little ecosystem.',
    level: 1,
    levelLabel: 'Beginner',
    details: 'Basic familiarity with Flutter, Dart, and building simple app interfaces. Still exploring its development workflow.',
  },

  'HTML & CSS': { emoji: '🎨', tags: ['Certiport certified'], level: 3, levelLabel: 'competent', details: 'I can read and understand, confidently write and create basic design' },
  'Unity': { emoji: '🕹️', tags: ['Capstone Project'], level: 2, levelLabel: 'figuring it out', details: 'This toolbox is like Mount Everest, there\`s a giant learning curve. Uses C# (I mainly drop and design the assets and vibe-coded some features and functions as co-developer),' },
  'Git / GitHub': { emoji: '🐙', link: { label: 'My GitHub', href: 'https://github.com/ellaiza9017' } },

  /* ---- Database & backend ---- */
  'MySQL': {
    emoji: '🐬',
    tagline: 'We used to be closer.',
    level: 2,
    levelLabel: 'a little rusty',
    details: 'Know the fundamentals of SQL, queries, and relational databases. Might need a little refresher, but the knowledge is somewhere in there.',
  },

  'Oracle': { emoji: '🔮', tags: ['School Activities', 'Projects'], level: 2, levelLabel: 'advanced beginner', details: 'rusty but I know the basics' },
  'Supabase': { emoji: '⚡', tags: ['School Activities', 'Projects'], level: 3, levelLabel: 'competent' },
  'Firebase': { emoji: '🔥', tags: ['School Activities', 'Projects'], level: 3, levelLabel: 'competent' },
  'REST APIs': { emoji: '🔌' },
  'QA testing': { emoji: '🐞', tags: ['Capstone Project'], level: 3, levelLabel: 'competent' },
  'Database design': { emoji: '🗄️', tags: ['Certiport certified'], level: 3, levelLabel: 'competent' },

  /* ---- Creative & AI ---- */
  'Blender 3D': { emoji: '🧊', tagline: 'One of my favorite headaches, genuinely', level: 2, levelLabel: 'advanced beginner', details: 'Only 3D modeling software I used so far (mainly for luminang game assets) with a giant mountain learning curve' },
  'Procreate': { emoji: '🖌️', tagline: 'My comfort drawing software' },
  'Krita': { emoji: '✏️', tagline: 'Before Procreate was Krita, my first ex' },
  'Canva': { emoji: '🌈', tags: ['learning/exploring', 'designs/drafts', 'videos/presentations'], level: 3, levelLabel: 'intermediate', details: 'Started learning to make videos in Canva! It\'s pretty fun' },
  'CapCut': { emoji: '🎬', level: 3, levelLabel: 'intermediate', details: 'Started using CapCut recently to make videos! It\'s pretty fun' },
  'UI/UX layouts': { emoji: '📐', tagline: 'The part of IT I actually look forward to. The only part that don\'t make me cry', level: 3, levelLabel: 'getting there', details: 'Sadly I\'m still a baby chick with more worms to eat before I can fly' },
  'AI tooling': { emoji: '🤖', tagline: 'My academic survival kit.', details: 'Used for debugging, brainstorming, understanding unfamiliar concepts, and getting unstuck. No, I didn\'t get this far only because of them. It was tears, sleepless nights, existential dread, and the occasional "I quit" moments that got me this far.' }
};

/* What a skill shows when you haven't filled in that field.
   (Only used for fields you left empty.) */
window.SKILL_DEFAULT = {
  emoji: '✨'
};

/* The cats and coffee cups that fall in with the skills are draggable too.
   Change what they say here, or delete this block to keep the built-in jokes. */
window.SKILL_EXTRAS = {
  cat: { emoji: '🐈‍⬛', title: 'Not a skill, but…', tagline: 'essential equipment', details: 'They recharge me and supervise every project. Quality control is excellent.' },
  cup: { emoji: '☕', title: 'Not a skill, but…', tagline: 'fuel', details: 'Powers about 90% of this portfolio.' }
};