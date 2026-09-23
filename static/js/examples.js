// Demo tables: the release demo set, text and controls verbatim. To add a
// sample, drop the audio under static/audio/<section id>/ and add a row.
window.DEMOS = [
  {
    id: "cloning",
    title: "Zero-shot Cloning: Any Voice From a Short Reference",
    note: "The voice comes from a few seconds of reference audio; no control is set.",
    columns: [
      { key: "language", label: "Language" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { language: "Chinese", text: "傍晚的风从山口吹过来，远处的云慢慢染成了金色。", audio: "static/audio/cloning/zh.mp3" },
    ],
  },
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
      { description: "专业可靠的公共广播音色，音量适中，语速平稳，信息传达清楚而不生硬。", text: "请前往三号站台的旅客提前准备车票，并注意脚下安全。", audio: "static/audio/voice-design/announcer.mp3" },
      { description: "威严神秘的年长守门人，低沉有力，停顿明显，带有奇幻角色扮演感。", text: "凡人，你既然走到了这里，就该知道这扇门从不为胆怯者开启。", audio: "static/audio/voice-design/gatekeeper.mp3" },
      { description: "成熟沉稳的男性纪录片旁白，吐字清晰，节奏舒缓，语气理性而有厚度。", text: "冰川在漫长岁月中缓缓移动，也悄悄记录着气候变化的痕迹。", audio: "static/audio/voice-design/narrator.mp3" },
    ],
  },
  {
    id: "built-in-voices",
    title: "Built-in Voices: Go Straight to the First Line",
    note: "100+ built-in Chinese character voices and four new English ones, with no reference audio or description.",
    columns: [
      { key: "voice", label: "Voice", type: "code" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { voice: "水浒传_武松", text: "前面的路纵然凶险，也得亲自走一遭，才晓得深浅。", audio: "static/audio/built-in-voices/wusong.mp3" },
      { voice: "妲己", text: "大王今日来得这样迟，莫不是又把妾身忘在心外了？", audio: "static/audio/built-in-voices/daji.mp3" },
      { voice: "UK_Charlotte", text: "The garden will remain open until sunset, provided the weather stays clear.", audio: "static/audio/built-in-voices/uk_charlotte.mp3" },
      { voice: "US_James", text: "I reviewed the route twice, and we should reach the coast before noon.", audio: "static/audio/built-in-voices/us_james.mp3" },
    ],
  },
  {
    id: "freeform",
    title: "Freeform: Direction in Everyday Words",
    note: "Instructions no control vocabulary enumerates: character, accent, the arc of a line, the shape of a pause.",
    columns: [
      { key: "instruction", label: "Instruction" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { instruction: "Perform this as a mysterious fantasy narrator with a low pitch and dramatic pauses.", text: "Beyond the northern ridge lies a city that vanished from every map.", audio: "static/audio/freeform/fantasy_narrator.mp3" },
      { instruction: "Speak in a warm, intimate storytelling voice, with a gentle pace and a hint of nostalgia.", text: "The old radio crackled softly as the storm moved across the valley.", audio: "static/audio/freeform/storyteller.mp3" },
      { instruction: "Use a restrained British accent, beginning in surprise and settling into quiet relief.", text: "I honestly did not expect to see you standing here tonight.", audio: "static/audio/freeform/surprise_relief.mp3" },
    ],
  },
  {
    id: "emotion",
    title: "Emotion: Say It the Way It Feels",
    note: "Set the emotion explicitly, in Chinese or English.",
    columns: [
      { key: "emotion", label: "Emotion" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { emotion: "高兴", text: "所有测试都顺利通过了，我们终于可以把这个好消息告诉大家！", audio: "static/audio/emotion/happy.mp3" },
      { emotion: "愤怒", text: "I checked every file twice, so why was the same mistake submitted again?", audio: "static/audio/emotion/angry.mp3" },
      { emotion: "惊讶", text: "You completed the entire restoration in a single night? I can hardly believe it!", audio: "static/audio/emotion/surprised.mp3" },
    ],
  },
  {
    id: "attributes",
    title: "Speed, Pitch and Volume: Exact and Repeatable",
    note: "Same text and voice; only the speed moves, with pitch and volume held at 中. No speed-up in post.",
    columns: [
      { key: "controls", label: "Controls", type: "code" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { controls: "speed: 慢速, pitch: 中, volume: 中", text: "今晚的观测将在云层散开后开始，请耐心等待下一次通知。", audio: "static/audio/attributes/speed_slow.mp3" },
      { controls: "speed: 中速, pitch: 中, volume: 中", text: "今晚的观测将在云层散开后开始，请耐心等待下一次通知。", audio: "static/audio/attributes/speed_medium.mp3" },
      { controls: "speed: 快速, pitch: 中, volume: 中", text: "今晚的观测将在云层散开后开始，请耐心等待下一次通知。", audio: "static/audio/attributes/speed_fast.mp3" },
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
      { tag: "[Laughter]", text: "他们一进门就笑成一团，[Laughter]整个屋子都热闹起来了。", audio: "static/audio/paralinguistic/laughter.mp3" },
      { tag: "[Sigh] [Cough]", text: "[Sigh]雨还是没有停，[Cough]我们恐怕只能把活动改到室内了。", audio: "static/audio/paralinguistic/sigh_cough.mp3" },
      { tag: "[Question-huh]", text: "[Question-huh] You carried all of those boxes upstairs by yourself?", audio: "static/audio/paralinguistic/question_huh.mp3" },
    ],
  },
  {
    id: "multilingual",
    title: "Multilingual: Five New Languages",
    note: "German, Spanish, French, Korean and Japanese join Chinese and English.",
    columns: [
      { key: "language", label: "Language" },
      { key: "text", label: "Target Text" },
      { key: "audio", label: "Result", type: "audio" },
    ],
    rows: [
      { language: "Japanese", text: "週末、駅前の小さな喫茶店で、季節限定の抹茶パフェを食べました", audio: "static/audio/multilingual/ja.mp3" },
      { language: "Korean", text: "퇴근 후에 친구들과 한강 공원에서 치킨을 먹으며 야경을 구경했어요.", audio: "static/audio/multilingual/ko.mp3" },
      { language: "German", text: "Am Samstagmorgen kaufen wir frisches Brot und Käse auf dem Wochenmarkt.", audio: "static/audio/multilingual/de.mp3" },
      { language: "French", text: "Ce soir, nous prendrons un café en terrasse avant de nous promener dans le quartier.", audio: "static/audio/multilingual/fr.mp3" },
      { language: "Spanish", text: "Mañana iremos a la plaza para escuchar música y cenar unas tapas con amigos.", audio: "static/audio/multilingual/es.mp3" },
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
      { dialect: "川渝话", text: "你莫慌嘛，这个事情慢慢弄，肯定要得到好久。", audio: "static/audio/dialects/sichuan.mp3" },
      { dialect: "粤语", text: "今日天气几好，我哋食完饭一齐去海边行下啦。", audio: "static/audio/dialects/cantonese.mp3" },
    ],
  },
];
