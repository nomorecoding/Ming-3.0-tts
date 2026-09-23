// Demo tables. Rows come only from the release copy (WeChat article and X
// script); leave a field empty rather than inventing text. To publish a
// sample, drop the wav under static/audio/<section>/ and set its `audio`.
window.DEMOS = [
  {
    id: "voice-design",
    title: "Voice Design: Start From the Character Description",
    note: "No reference audio. The description alone decides the voice.",
    columns: [
      { key: "description", label: "Description" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { description: "成熟沉稳的男性纪录片旁白，吐字清晰，声音理性而有厚度。" },
      { description: "威严神秘的年长守门人，声音低沉有力，带有奇幻角色感。" },
      {
        description: "A calm, seasoned, quietly authoritative male documentary narrator, with clear articulation, a measured pace, and understated confidence.",
        text: "Before a character speaks, you can decide what that voice should sound like.",
      },
    ],
  },
  {
    id: "character-to-performance",
    title: "From Character to Performance: Voice Design Picks the Voice, Freeform Directs the Line",
    note: "One line in two designed voices; then one of them, directed two ways.",
    columns: [
      { key: "step", label: "Step" },
      { key: "instruction", label: "Voice Design / Freeform" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { step: "Voice 1", instruction: "成熟沉稳的男性纪录片旁白，吐字清晰，声音理性而有厚度。" },
      { step: "Voice 2", instruction: "威严神秘的年长守门人，声音低沉有力，带有奇幻角色感。" },
      { step: "Chosen voice, direction 1", instruction: "像向老朋友讲述往事，声音温暖、贴近，节奏轻缓，带一点怀念。" },
      { step: "Chosen voice, direction 2", instruction: "开始时略显惊讶，短暂停顿后，逐渐转为如释重负的轻声回应。" },
    ],
  },
  {
    id: "built-in-voices",
    title: "Built-in Voices: Go Straight to the First Line",
    note: "100+ built-in Chinese voices need no description at all. The four English voices are new in this release.",
    columns: [
      { key: "voice", label: "Voice", type: "code" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { voice: "UK_George", text: "Or start with a character voice and go straight to the first line." },
    ],
  },
  {
    id: "freeform",
    title: "Freeform: Direction in Everyday Words",
    note: "Instructions no control vocabulary enumerates: scene, intent, subtext, the shape of a pause.",
    columns: [
      { key: "instruction", label: "Instruction" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      {
        instruction: "Speak in a warm, intimate storytelling voice, with a gentle pace and a subtle sense of nostalgia. Keep the delivery natural and restrained.",
        text: "And sometimes the direction is simply this: tell it warmly, stay close, and leave a little room for memory.",
      },
    ],
  },
  {
    id: "paralinguistic",
    title: "Paralinguistic Tags: Laughs and Sighs in the Script",
    note: "The tag is written where the sound happens, and performed in the speaker's own voice.",
    columns: [
      { key: "tag", label: "Tag", type: "code" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { tag: "[Laughter]", text: "[Laughter] 你居然真的把那封信藏在旧钟后面了。" },
      { tag: "[Sigh]", text: "[Sigh] 雨还是没有停，我们只能把活动改到室内了。" },
      { tag: "[Sigh]", text: "[Sigh] You try to put it into words, and somehow it still comes out wrong." },
      { tag: "[Laughter]", text: "[Laughter] And maybe that's the point—some things aren't meant to be said, only heard." },
    ],
  },
  {
    id: "emotion",
    title: "Emotion: Same Words, a Different Heart",
    note: "The same voice and settings throughout; only the emotion changes.",
    columns: [
      { key: "emotion", label: "Emotion" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { emotion: "高兴", text: "You're finally here." },
      { emotion: "愤怒", text: "You're finally here." },
    ],
  },
  {
    id: "attributes",
    title: "Speed, Pitch and Volume: Exact and Repeatable",
    note: "Fixed text and voice; only one attribute moves. No speed-up in post.",
    columns: [
      { key: "control", label: "Control" },
      { key: "text", label: "Target Text" },
      { key: "setting1", label: "Setting 1" },
      { key: "audio1", label: "Result", type: "audio" },
      { key: "setting2", label: "Setting 2" },
      { key: "audio2", label: "Result", type: "audio" },
    ],
    rows: [],
  },
  {
    id: "multilingual",
    title: "Multilingual: One Character Across Seven Languages",
    note: "One story, carried line by line through seven languages.",
    columns: [
      { key: "language", label: "Language" },
      { key: "text", label: "Target Text" },
      { key: "english", label: "English" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { language: "Chinese", text: "一个故事，可以从一句话开始。", english: "A story can begin with a single sentence." },
      { language: "English", text: "Then it can travel farther than you imagined." },
      { language: "German", text: "In einer neuen Sprache findet es neue Zuhörer.", english: "In a new language, it finds new listeners." },
      { language: "Spanish", text: "Y cada versión merece sonar natural.", english: "And every version deserves to sound natural." },
      { language: "French", text: "Sans perdre son rythme, son émotion ni son intention.", english: "Without losing its rhythm, emotion, or intent." },
      { language: "Korean", text: "언어가 달라져도, 이야기의 마음은 이어져야 하니까요.", english: "Because even when the language changes, the heart of the story should carry through." },
      { language: "Japanese", text: "そうして物語は、もっと遠くまで届いていきます。", english: "That is how a story reaches farther." },
    ],
  },
  {
    id: "dialects",
    title: "Dialects: The Cadence Is Part of the Meaning",
    columns: [
      { key: "dialect", label: "Dialect" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { dialect: "川渝话", text: "有些表达还带着地方的味道嘛，熟悉的腔调和节奏，本身就是意思。" },
      { dialect: "粤语", text: "唔係淨係換幾個字，語氣同節奏自然，先至係當地人講嘢嘅感覺。" },
    ],
  },
];
