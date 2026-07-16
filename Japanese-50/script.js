const columns = [
  { key: "a", label: "あ段" },
  { key: "i", label: "い段" },
  { key: "u", label: "う段" },
  { key: "e", label: "え段" },
  { key: "o", label: "お段" },
];

const rows = [
  {
    label: "あ行",
    items: [
      ["あ", "a"],
      ["い", "i"],
      ["う", "u"],
      ["え", "e"],
      ["お", "o"],
    ],
  },
  {
    label: "か行",
    items: [
      ["か", "ka"],
      ["き", "ki"],
      ["く", "ku"],
      ["け", "ke"],
      ["こ", "ko"],
    ],
  },
  {
    label: "さ行",
    items: [
      ["さ", "sa"],
      ["し", "shi"],
      ["す", "su"],
      ["せ", "se"],
      ["そ", "so"],
    ],
  },
  {
    label: "た行",
    items: [
      ["た", "ta"],
      ["ち", "chi"],
      ["つ", "tsu"],
      ["て", "te"],
      ["と", "to"],
    ],
  },
  {
    label: "な行",
    items: [
      ["な", "na"],
      ["に", "ni"],
      ["ぬ", "nu"],
      ["ね", "ne"],
      ["の", "no"],
    ],
  },
  {
    label: "は行",
    items: [
      ["は", "ha"],
      ["ひ", "hi"],
      ["ふ", "fu"],
      ["へ", "he"],
      ["ほ", "ho"],
    ],
  },
  {
    label: "ま行",
    items: [
      ["ま", "ma"],
      ["み", "mi"],
      ["む", "mu"],
      ["め", "me"],
      ["も", "mo"],
    ],
  },
  {
    label: "や行",
    items: [["や", "ya"], null, ["ゆ", "yu"], null, ["よ", "yo"]],
  },
  {
    label: "ら行",
    items: [
      ["ら", "ra"],
      ["り", "ri"],
      ["る", "ru"],
      ["れ", "re"],
      ["ろ", "ro"],
    ],
  },
  {
    label: "わ行",
    items: [["わ", "wa"], null, null, null, ["を", "wo"]],
  },
  {
    label: "ん",
    items: [null, null, null, null, ["ん", "n"]],
  },
];

const katakanaMap = {
  あ: "ア",
  い: "イ",
  う: "ウ",
  え: "エ",
  お: "オ",
  か: "カ",
  き: "キ",
  く: "ク",
  け: "ケ",
  こ: "コ",
  さ: "サ",
  し: "シ",
  す: "ス",
  せ: "セ",
  そ: "ソ",
  た: "タ",
  ち: "チ",
  つ: "ツ",
  て: "テ",
  と: "ト",
  な: "ナ",
  に: "ニ",
  ぬ: "ヌ",
  ね: "ネ",
  の: "ノ",
  は: "ハ",
  ひ: "ヒ",
  ふ: "フ",
  へ: "ヘ",
  ほ: "ホ",
  ま: "マ",
  み: "ミ",
  む: "ム",
  め: "メ",
  も: "モ",
  や: "ヤ",
  ゆ: "ユ",
  よ: "ヨ",
  ら: "ラ",
  り: "リ",
  る: "ル",
  れ: "レ",
  ろ: "ロ",
  わ: "ワ",
  を: "ヲ",
  ん: "ン",
};

const mnemonicMap = {
  あ: { hira: "あ 像一个人张开嘴说“啊”。", kata: "ア 像嘴角张开的形状，读作 a。" },
  い: { hira: "い 像两根细线并排站着，发音短促像 i。", kata: "イ 像人靠着一根斜线站立，读作 i。" },
  う: { hira: "う 上面一点像帽子，下面圆弯像“呜”的嘴形。", kata: "ウ 像房檐下探出的弯钩，读作 u。" },
  え: { hira: "え 像人向前伸手说“诶”。", kata: "エ 像工字形，读作 e。" },
  お: { hira: "お 像あ旁边多了小点，可记成“啊哦”的 o。", kata: "オ 像才字的骨架，读作 o。" },
  か: { hira: "か 像一把卡住的钩子，联想到 ka。", kata: "カ 像汉字“力”，用力读 ka。" },
  き: { hira: "き 像一把钥匙的齿纹，ki-ki 开锁。", kata: "キ 像钥匙齿，也读 ki。" },
  く: { hira: "く 像张开的鸟嘴，短促读 ku。", kata: "ク 像带小点的く，读 ku。" },
  け: { hira: "け 像一扇门旁有竖钩，记 ke。", kata: "ケ 像片假名カ加短撇，读 ke。" },
  こ: { hira: "こ 像上下两条鱼钩线，ko。", kata: "コ 像方框少一边，读 ko。" },
  さ: { hira: "さ 像钥匙多了尾巴，sa 轻轻甩出去。", kata: "サ 像草字头加竖，读 sa。" },
  し: { hira: "し 像弯弯的吸管，吸一口读 shi。", kata: "シ 三点斜排，像水滴滑下，读 shi。" },
  す: { hira: "す 像吊着一个小圈的线，su。", kata: "ス 像交叉的滑坡，读 su。" },
  せ: { hira: "せ 像两根桩穿过横线，se。", kata: "セ 像横线带钩，读 se。" },
  そ: { hira: "そ 像一条快速折返的线，so。", kata: "ソ 像两笔向下扫，读 so。" },
  た: { hira: "た 像太字被拆开，可联想 ta。", kata: "タ 像夕阳的“夕”，读 ta。" },
  ち: { hira: "ち 像数字 5 的弯身，读 chi。", kata: "チ 像千字头，读 chi。" },
  つ: { hira: "つ 像一个大弯钩，也像笑嘴，读 tsu。", kata: "ツ 两点一撇，方向和シ相反，读 tsu。" },
  て: { hira: "て 像手掌伸出去，te。", kata: "テ 像天线下垂，读 te。" },
  と: { hira: "と 像小钩接住东西，to。", kata: "ト 像树枝分叉，读 to。" },
  な: { hira: "な 像打了个结的绳子，na。", kata: "ナ 像十字带长撇，读 na。" },
  に: { hira: "に 像左柱加两条横线，ni。", kata: "ニ 就是两横，读 ni。" },
  ぬ: { hira: "ぬ 像め多一个圈，可记“nu 有圈”。", kata: "ヌ 像交叉的弯刀，读 nu。" },
  ね: { hira: "ね 像わ右边多了小圈，猫咪打结读 ne。", kata: "ネ 像衣字旁，读 ne。" },
  の: { hira: "の 像一个圆圈旋转，no。", kata: "ノ 一撇像点头说 no 的动作。" },
  は: { hira: "は 像左边柱子右边小圈，ha。", kata: "ハ 像八字分开，读 ha。" },
  ひ: { hira: "ひ 像一张笑脸的弧线，hi。", kata: "ヒ 像匕首的匕，读 hi。" },
  ふ: { hira: "ふ 像风吹散的四笔，fu。", kata: "フ 像吹出去的一口气，读 fu。" },
  へ: { hira: "へ 像山坡一折，he。", kata: "ヘ 与平假名很像，也读 he。" },
  ほ: { hira: "ほ 像は多一条横线，ho 比 ha 多一点结构。", kata: "ホ 像木字的骨架，读 ho。" },
  ま: { hira: "ま 像两横压住一个小圈，ma。", kata: "マ 像箭头折下来，读 ma。" },
  み: { hira: "み 像数字 3 拉长再收笔，mi。", kata: "ミ 三条短线，读 mi。" },
  む: { hira: "む 像一条线绕出小圈，mu。", kata: "ム 像三角屋顶，读 mu。" },
  め: { hira: "め 像ぬ少了圈，me。", kata: "メ 像叉号，读 me。" },
  も: { hira: "も 像鱼钩穿过两条线，mo。", kata: "モ 像两横接一钩，读 mo。" },
  や: { hira: "や 像弓箭搭在弦上，ya。", kata: "ヤ 也是弓箭形，读 ya。" },
  ゆ: { hira: "ゆ 像鱼在圈里游，yu。", kata: "ユ 像横着的 U 形，读 yu。" },
  よ: { hira: "よ 像钩子下面打了小结，yo。", kata: "ヨ 像三横开口，读 yo。" },
  ら: { hira: "ら 像小点后接一条大弧，ra。", kata: "ラ 像拉开的帘子，读 ra。" },
  り: { hira: "り 像两条下落的线，ri。", kata: "リ 两竖很直接，读 ri。" },
  る: { hira: "る 像ろ底部多了小圈，ru。", kata: "ル 像两条腿站着，读 ru。" },
  れ: { hira: "れ 像ね少一个圈、向右伸出去，re。", kata: "レ 像向右下的一折，读 re。" },
  ろ: { hira: "ろ 像数字 3 下半回收，ro。", kata: "ロ 像方框，读 ro。" },
  わ: { hira: "わ 像ね去掉小圈，右边大弧读 wa。", kata: "ワ 像碗口打开，读 wa。" },
  を: { hira: "を 像复杂的お，常作助词，现代多读 o。", kata: "ヲ 像フ加一横，读 wo/o。" },
  ん: { hira: "ん 像一条波浪线，鼻音 n 慢慢收住。", kata: "ン 两笔向上扫，和ソ方向相反，读 n。" },
};

const fallbackStrokes = {
  1: ["M 78 150 C 130 82, 220 86, 236 150 C 248 196, 188 215, 122 194"],
  2: ["M 82 88 C 128 126, 178 132, 232 102", "M 212 76 C 170 126, 144 178, 96 214"],
  3: [
    "M 96 80 C 120 118, 172 122, 224 90",
    "M 184 70 C 148 118, 126 168, 90 212",
    "M 142 134 C 190 140, 228 164, 214 198 C 200 230, 132 226, 112 194",
  ],
  4: [
    "M 96 72 C 128 106, 176 112, 222 88",
    "M 190 68 C 150 112, 126 166, 88 210",
    "M 110 134 C 148 126, 196 132, 222 160",
    "M 136 174 C 168 202, 204 208, 232 188",
  ],
};

const strokeData = {
  あ: {
    strokes: [
      "M 84 96 C 132 116, 184 110, 230 84",
      "M 158 66 C 152 106, 148 156, 152 218",
      "M 214 124 C 166 126, 102 158, 88 196 C 78 225, 130 226, 174 190 C 206 164, 222 142, 226 118",
    ],
    notes: ["横画轻轻向右上", "中线向下，略带弯", "从右向左下包回"],
  },
  い: {
    strokes: ["M 104 86 C 96 130, 104 176, 138 206", "M 194 88 C 222 122, 230 166, 218 204"],
    notes: ["左笔向下收", "右笔较短，末端放松"],
  },
  う: {
    strokes: ["M 144 70 C 170 88, 190 102, 206 118", "M 92 142 C 134 124, 220 124, 226 166 C 232 210, 160 226, 106 212"],
    notes: ["上点短而有方向", "横弯后向左收"],
  },
  え: {
    strokes: ["M 140 70 C 166 86, 186 100, 204 116", "M 98 138 C 142 122, 210 124, 220 148 C 192 166, 164 188, 136 214 C 166 196, 200 198, 232 218"],
    notes: ["上点稍斜", "折线后接长收笔"],
  },
  お: {
    strokes: ["M 92 102 C 138 116, 184 108, 228 84", "M 154 68 C 150 120, 150 170, 156 218", "M 210 128 C 164 126, 104 154, 94 190 C 84 226, 142 226, 176 194", "M 220 96 C 238 108, 250 122, 258 138"],
    notes: ["横画起势", "竖画保持中心", "下方圆转", "右上小点"],
  },
  か: {
    strokes: ["M 92 110 C 142 106, 190 104, 232 108", "M 168 76 C 148 122, 130 170, 100 216", "M 194 114 C 226 142, 234 180, 214 210", "M 228 78 C 246 92, 258 106, 266 124"],
    notes: ["先横穿过中部", "斜撇向左下", "右侧弯钩", "右上点"],
  },
  こ: {
    strokes: ["M 108 98 C 148 108, 194 106, 232 90", "M 96 184 C 136 210, 200 212, 250 192"],
    notes: ["上横从左向右，略向下弯", "下横从左向右，末端轻轻上收"],
  },
  き: {
    strokes: ["M 98 82 C 144 100, 194 98, 236 78", "M 94 122 C 144 140, 198 136, 244 112", "M 152 70 C 168 120, 188 168, 216 210", "M 106 188 C 132 220, 194 226, 226 202"],
    notes: ["第一横短", "第二横略长", "竖势贯穿", "底部收笔"],
  },
  し: {
    strokes: ["M 136 76 C 126 126, 126 178, 158 204 C 182 224, 222 214, 240 184"],
    notes: ["一笔完成，底部圆转"],
  },
  す: {
    strokes: ["M 86 112 C 130 120, 188 118, 238 104", "M 170 72 C 166 116, 164 164, 178 210 C 156 226, 116 214, 122 184 C 128 154, 174 154, 194 180"],
    notes: ["横画平稳", "竖弯与小圈连贯"],
  },
  た: {
    strokes: ["M 86 110 C 130 120, 180 114, 226 92", "M 146 74 C 134 124, 118 174, 92 220", "M 174 142 C 202 130, 230 130, 252 142", "M 168 194 C 194 218, 232 220, 256 204"],
    notes: ["横画", "左撇拉长", "右侧短横", "底部收束"],
  },
  ち: {
    strokes: ["M 94 102 C 138 116, 188 110, 232 88", "M 158 68 C 150 116, 140 152, 126 188 C 156 160, 228 154, 234 190 C 240 226, 164 230, 108 212"],
    notes: ["先横", "竖弯后向右展开"],
  },
  つ: {
    strokes: ["M 80 144 C 134 110, 234 108, 242 160 C 250 214, 164 232, 104 204"],
    notes: ["一笔宽弧，右侧圆转"],
  },
  て: {
    strokes: ["M 82 104 C 138 116, 192 112, 240 92 C 198 126, 170 162, 178 194 C 184 220, 220 226, 246 210"],
    notes: ["横折一笔写成"],
  },
  と: {
    strokes: ["M 132 78 C 146 118, 166 152, 188 178", "M 224 104 C 170 134, 106 174, 112 208 C 118 236, 194 232, 242 208"],
    notes: ["短斜线", "长弧向左再回"],
  },
  な: {
    strokes: ["M 86 106 C 132 116, 176 108, 214 86", "M 148 72 C 132 122, 116 170, 92 214", "M 196 128 C 226 136, 248 150, 260 170", "M 190 158 C 182 188, 188 220, 220 220 C 244 220, 248 194, 226 176"],
    notes: ["横", "左撇", "右上弧", "底部小结"],
  },
  に: {
    strokes: ["M 96 84 C 86 124, 84 174, 102 214", "M 154 120 C 190 130, 222 126, 252 112", "M 150 192 C 182 214, 226 216, 258 198"],
    notes: ["左竖", "上横", "下横"],
  },
  は: {
    strokes: ["M 90 82 C 80 124, 80 178, 98 218", "M 156 110 C 194 118, 230 114, 260 98", "M 218 74 C 214 124, 216 174, 226 220", "M 176 178 C 206 156, 250 170, 250 198 C 250 226, 190 224, 180 198"],
    notes: ["左竖", "右横", "右竖", "底部小圈"],
  },
  ほ: {
    strokes: ["M 86 82 C 78 124, 78 178, 96 218", "M 150 92 C 188 100, 226 96, 258 82", "M 150 134 C 190 142, 226 138, 258 126", "M 218 72 C 214 124, 216 174, 226 220", "M 174 178 C 204 156, 250 170, 250 198 C 250 226, 190 224, 180 198"],
    notes: ["左竖", "上横", "中横", "右竖", "底部小圈"],
  },
  ま: {
    strokes: ["M 96 88 C 144 104, 198 100, 242 80", "M 96 126 C 148 142, 204 138, 250 116", "M 174 68 C 170 126, 172 176, 186 222", "M 132 184 C 162 158, 226 170, 232 202 C 238 232, 160 232, 132 206"],
    notes: ["上横", "下横", "竖画", "底部圆收"],
  },
  も: {
    strokes: ["M 138 72 C 128 126, 122 176, 136 210 C 152 242, 220 220, 214 178", "M 96 114 C 138 126, 184 122, 226 104", "M 96 154 C 138 166, 186 164, 230 148"],
    notes: ["主竖弯", "上横", "中横"],
  },
  や: {
    strokes: ["M 82 150 C 132 120, 206 104, 250 128 C 238 154, 214 170, 184 178", "M 146 78 C 164 132, 188 184, 218 224", "M 96 94 C 116 104, 132 116, 144 132"],
    notes: ["横弧", "长斜线", "左上短线"],
  },
  ゆ: {
    strokes: ["M 96 112 C 78 156, 96 206, 146 212 C 216 220, 258 166, 232 126 C 210 92, 152 92, 126 126", "M 168 70 C 164 122, 164 174, 174 226"],
    notes: ["外圈一笔", "中线贯穿"],
  },
  よ: {
    strokes: ["M 176 72 C 168 122, 170 174, 184 222", "M 132 130 C 172 140, 214 136, 250 120", "M 138 184 C 168 160, 230 170, 236 204 C 242 236, 158 232, 132 206"],
    notes: ["竖弯", "横画", "底部结"],
  },
  り: {
    strokes: ["M 118 80 C 106 120, 108 164, 128 196", "M 202 76 C 214 130, 202 184, 160 222"],
    notes: ["左短竖", "右长弯"],
  },
  わ: {
    strokes: ["M 92 88 C 82 128, 82 178, 98 220", "M 92 148 C 136 108, 222 106, 240 154 C 258 204, 186 230, 130 212"],
    notes: ["左竖", "横接大弧"],
  },
  ん: {
    strokes: ["M 92 210 C 126 162, 160 106, 194 76 C 174 126, 174 190, 202 204 C 226 216, 250 194, 262 168"],
    notes: ["一笔波形，末端向右上"],
  },
};

const verifiedStrokeData = {
  あ: {
    strokes: ["M 84 98 C 132 116, 184 110, 230 84", "M 158 66 C 152 112, 148 166, 154 220", "M 218 122 C 166 124, 104 156, 88 196 C 78 224, 128 226, 174 190 C 204 166, 222 140, 224 116"],
    notes: ["第 1 笔：上方横画", "第 2 笔：中间竖弯", "第 3 笔：右侧起笔，圆转收束"],
  },
  い: {
    strokes: ["M 104 84 C 94 132, 104 178, 138 206", "M 194 88 C 222 124, 230 168, 218 206"],
    notes: ["第 1 笔：左侧下弯", "第 2 笔：右侧短弯"],
  },
  う: {
    strokes: ["M 144 72 C 168 86, 188 100, 206 116", "M 92 142 C 134 124, 220 124, 226 166 C 232 210, 160 226, 106 212"],
    notes: ["第 1 笔：上方短点", "第 2 笔：横入后向下圆收"],
  },
  え: {
    strokes: ["M 140 72 C 166 86, 186 100, 204 116", "M 96 138 C 142 122, 210 124, 220 148 C 192 166, 164 188, 136 214 C 166 196, 200 198, 232 218"],
    notes: ["第 1 笔：上方短点", "第 2 笔：折转后向右收"],
  },
  お: {
    strokes: ["M 92 102 C 138 116, 184 108, 228 84", "M 154 68 C 150 120, 150 170, 156 218 C 118 224, 86 208, 94 180 C 104 146, 170 126, 218 128", "M 220 96 C 238 108, 250 122, 258 138"],
    notes: ["第 1 笔：上横", "第 2 笔：竖弯并连到底部圆转", "第 3 笔：右上点"],
  },
  か: {
    strokes: ["M 94 112 C 134 108, 174 108, 214 112 C 206 150, 190 190, 168 218", "M 154 76 C 136 126, 118 174, 92 216", "M 226 82 C 246 96, 258 112, 266 130"],
    notes: ["第 1 笔：中部横折弯", "第 2 笔：左上向左下撇", "第 3 笔：右上短斜"],
  },
  き: {
    strokes: ["M 98 82 C 144 100, 194 98, 236 78", "M 94 122 C 144 140, 198 136, 244 112", "M 152 70 C 168 120, 188 168, 216 210", "M 106 188 C 132 220, 194 226, 226 202"],
    notes: ["第 1 笔：上横", "第 2 笔：中横", "第 3 笔：斜穿下行", "第 4 笔：下方弧线"],
  },
  く: {
    strokes: ["M 218 78 C 180 114, 144 144, 104 176 C 144 194, 184 212, 222 230"],
    notes: ["第 1 笔：折线一笔完成"],
  },
  け: {
    strokes: ["M 96 78 C 86 124, 86 176, 104 218", "M 152 108 C 190 116, 226 112, 258 96", "M 216 72 C 214 126, 208 178, 174 220"],
    notes: ["第 1 笔：左竖", "第 2 笔：右上横", "第 3 笔：右竖向下弯收"],
  },
  こ: {
    strokes: ["M 108 98 C 148 108, 194 106, 232 90", "M 96 184 C 136 210, 200 212, 250 192"],
    notes: ["第 1 笔：上横", "第 2 笔：下横"],
  },
  さ: {
    strokes: ["M 96 88 C 140 104, 190 100, 234 78", "M 158 68 C 174 122, 196 168, 224 208", "M 104 190 C 134 220, 194 226, 226 202"],
    notes: ["第 1 笔：上横", "第 2 笔：斜穿下行", "第 3 笔：下方弧线"],
  },
  し: {
    strokes: ["M 136 76 C 126 126, 126 178, 158 204 C 182 224, 222 214, 240 184"],
    notes: ["第 1 笔：一笔向下圆转"],
  },
  す: {
    strokes: ["M 86 112 C 130 120, 188 118, 238 104", "M 170 72 C 166 116, 164 164, 178 210 C 156 226, 116 214, 122 184 C 128 154, 174 154, 194 180"],
    notes: ["第 1 笔：横画", "第 2 笔：竖弯并绕小圈"],
  },
  せ: {
    strokes: ["M 80 124 C 128 118, 190 112, 252 104", "M 144 78 C 144 126, 146 168, 154 210", "M 214 82 C 212 128, 204 158, 178 178"],
    notes: ["第 1 笔：横画", "第 2 笔：中间竖画", "第 3 笔：右侧竖弯"],
  },
  そ: {
    strokes: ["M 120 78 C 154 92, 184 106, 212 122 C 178 132, 144 148, 112 170 C 148 170, 196 178, 236 206"],
    notes: ["第 1 笔：折转连写"],
  },
  た: {
    strokes: ["M 86 110 C 130 120, 180 114, 226 92", "M 146 74 C 134 124, 118 174, 92 220", "M 174 142 C 202 130, 230 130, 252 142", "M 168 194 C 194 218, 232 220, 256 204"],
    notes: ["第 1 笔：横画", "第 2 笔：左撇", "第 3 笔：右上短横", "第 4 笔：右下横收"],
  },
  ち: {
    strokes: ["M 94 102 C 138 116, 188 110, 232 88", "M 158 68 C 150 116, 140 152, 126 188 C 156 160, 228 154, 234 190 C 240 226, 164 230, 108 212"],
    notes: ["第 1 笔：上横", "第 2 笔：竖弯后右展"],
  },
  つ: {
    strokes: ["M 80 144 C 134 110, 234 108, 242 160 C 250 214, 164 232, 104 204"],
    notes: ["第 1 笔：一笔宽弧"],
  },
  て: {
    strokes: ["M 82 104 C 138 116, 192 112, 240 92 C 198 126, 170 162, 178 194 C 184 220, 220 226, 246 210"],
    notes: ["第 1 笔：横折一笔完成"],
  },
  と: {
    strokes: ["M 132 78 C 146 118, 166 152, 188 178", "M 224 104 C 170 134, 106 174, 112 208 C 118 236, 194 232, 242 208"],
    notes: ["第 1 笔：短斜", "第 2 笔：长弧回收"],
  },
  な: {
    strokes: ["M 86 106 C 132 116, 176 108, 214 86", "M 148 72 C 132 122, 116 170, 92 214", "M 196 128 C 226 136, 248 150, 260 170", "M 190 158 C 182 188, 188 220, 220 220 C 244 220, 248 194, 226 176"],
    notes: ["第 1 笔：横画", "第 2 笔：左撇", "第 3 笔：右上短弧", "第 4 笔：底部圆结"],
  },
  に: {
    strokes: ["M 96 84 C 86 124, 84 174, 102 214", "M 154 120 C 190 130, 222 126, 252 112", "M 150 192 C 182 214, 226 216, 258 198"],
    notes: ["第 1 笔：左竖", "第 2 笔：上横", "第 3 笔：下横"],
  },
  ぬ: {
    strokes: ["M 96 92 C 134 140, 180 178, 232 214", "M 214 86 C 164 110, 112 156, 98 198 C 88 226, 130 232, 174 202 C 214 174, 234 134, 226 104"],
    notes: ["第 1 笔：左上向右下", "第 2 笔：右上起笔，绕回成圈"],
  },
  ね: {
    strokes: ["M 94 82 C 84 126, 84 178, 100 220 M 94 150 C 126 116, 152 96, 172 90", "M 94 156 C 140 112, 226 110, 238 158 C 252 214, 176 230, 138 204"],
    notes: ["第 1 笔：左竖并带横接", "第 2 笔：右侧大弧收束"],
  },
  の: {
    strokes: ["M 184 82 C 126 92, 88 144, 104 188 C 118 226, 178 218, 212 176 C 242 138, 224 92, 184 82"],
    notes: ["第 1 笔：从上方入，圆转一笔"],
  },
  は: {
    strokes: ["M 90 82 C 80 124, 80 178, 98 218", "M 156 110 C 194 118, 230 114, 260 98", "M 218 74 C 214 124, 216 174, 226 220 C 188 228, 170 210, 182 186 C 196 160, 236 170, 250 198"],
    notes: ["第 1 笔：左竖", "第 2 笔：右横", "第 3 笔：右竖连底部小圈"],
  },
  ひ: {
    strokes: ["M 98 106 C 116 74, 178 70, 208 104 C 236 136, 226 196, 184 216 C 144 236, 98 210, 104 160"],
    notes: ["第 1 笔：一笔圆转"],
  },
  ふ: {
    strokes: ["M 154 70 C 174 82, 188 94, 200 110", "M 160 118 C 146 148, 128 174, 102 198", "M 174 128 C 188 154, 196 180, 194 210", "M 220 128 C 246 154, 260 182, 264 212"],
    notes: ["第 1 笔：上点", "第 2 笔：左下弧", "第 3 笔：中间短弯", "第 4 笔：右下弧"],
  },
  へ: {
    strokes: ["M 84 176 C 116 142, 142 116, 160 104 C 190 132, 220 160, 252 190"],
    notes: ["第 1 笔：折线一笔完成"],
  },
  ほ: {
    strokes: ["M 86 82 C 78 124, 78 178, 96 218", "M 150 92 C 188 100, 226 96, 258 82", "M 150 134 C 190 142, 226 138, 258 126", "M 218 72 C 214 124, 216 174, 226 220 C 188 228, 170 210, 182 186 C 196 160, 236 170, 250 198"],
    notes: ["第 1 笔：左竖", "第 2 笔：上横", "第 3 笔：中横", "第 4 笔：右竖连底部小圈"],
  },
  ま: {
    strokes: ["M 96 88 C 144 104, 198 100, 242 80", "M 96 126 C 148 142, 204 138, 250 116", "M 174 68 C 170 126, 172 176, 186 222 C 148 228, 124 214, 134 188 C 148 158, 218 170, 232 202"],
    notes: ["第 1 笔：上横", "第 2 笔：中横", "第 3 笔：竖画连底部圆收"],
  },
  み: {
    strokes: ["M 104 100 C 142 82, 186 84, 214 112 C 176 138, 142 166, 110 204 C 154 190, 212 200, 246 226", "M 222 86 C 220 136, 212 184, 190 222"],
    notes: ["第 1 笔：左上入，折转成下部", "第 2 笔：右侧下弯"],
  },
  む: {
    strokes: ["M 96 106 C 142 116, 186 108, 226 88", "M 154 72 C 146 124, 144 170, 154 204 C 170 234, 222 226, 220 184", "M 226 132 C 248 152, 260 174, 266 198"],
    notes: ["第 1 笔：横画", "第 2 笔：竖弯成小圈", "第 3 笔：右侧短弧"],
  },
  め: {
    strokes: ["M 98 92 C 134 140, 180 178, 232 214", "M 214 86 C 164 110, 112 156, 98 198 C 88 226, 130 232, 174 202 C 214 174, 234 134, 226 104"],
    notes: ["第 1 笔：左上向右下", "第 2 笔：右上起笔，圆转收束"],
  },
  も: {
    strokes: ["M 138 72 C 128 126, 122 176, 136 210 C 152 242, 220 220, 214 178", "M 96 114 C 138 126, 184 122, 226 104", "M 96 154 C 138 166, 186 164, 230 148"],
    notes: ["第 1 笔：主竖弯", "第 2 笔：上横", "第 3 笔：中横"],
  },
  や: {
    strokes: ["M 82 150 C 132 120, 206 104, 250 128 C 238 154, 214 170, 184 178", "M 146 78 C 164 132, 188 184, 218 224", "M 96 94 C 116 104, 132 116, 144 132"],
    notes: ["第 1 笔：横弧", "第 2 笔：长斜线", "第 3 笔：左上短线"],
  },
  ゆ: {
    strokes: ["M 96 112 C 78 156, 96 206, 146 212 C 216 220, 258 166, 232 126 C 210 92, 152 92, 126 126", "M 168 70 C 164 122, 164 174, 174 226"],
    notes: ["第 1 笔：外圈", "第 2 笔：中线"],
  },
  よ: {
    strokes: ["M 132 124 C 172 136, 214 132, 250 116", "M 176 72 C 168 122, 170 174, 184 222 C 146 230, 124 212, 138 188 C 154 160, 220 170, 236 204"],
    notes: ["第 1 笔：横画", "第 2 笔：竖弯连底部结"],
  },
  ら: {
    strokes: ["M 148 76 C 170 90, 188 104, 204 120", "M 104 154 C 146 124, 218 126, 232 166 C 248 214, 164 232, 108 212"],
    notes: ["第 1 笔：上点", "第 2 笔：横入后大弧收束"],
  },
  り: {
    strokes: ["M 118 80 C 106 120, 108 164, 128 196", "M 202 76 C 214 130, 202 184, 160 222"],
    notes: ["第 1 笔：左短竖", "第 2 笔：右长弯"],
  },
  る: {
    strokes: ["M 112 92 C 154 106, 196 104, 230 84 C 198 126, 164 160, 128 198 C 160 174, 224 176, 238 206 C 250 232, 178 236, 158 212 C 146 196, 174 184, 194 206"],
    notes: ["第 1 笔：折转后下方成圈"],
  },
  れ: {
    strokes: ["M 94 82 C 84 126, 84 178, 100 220 M 94 150 C 126 116, 152 96, 172 90", "M 94 156 C 136 116, 182 94, 198 124 C 212 154, 188 202, 216 214 C 236 224, 252 198, 260 176"],
    notes: ["第 1 笔：左竖并带横接", "第 2 笔：右侧折弯"],
  },
  ろ: {
    strokes: ["M 112 92 C 154 106, 196 104, 230 84 C 198 126, 164 160, 128 198 C 160 174, 224 176, 238 206 C 250 234, 174 236, 118 214"],
    notes: ["第 1 笔：折转后下方圆收"],
  },
  わ: {
    strokes: ["M 92 86 C 82 130, 84 178, 100 220", "M 92 148 C 130 112, 218 106, 240 152 C 264 204, 190 232, 130 212"],
    notes: ["第 1 笔：左侧短竖", "第 2 笔：从左中起笔，向右绕回"],
  },
  を: {
    strokes: ["M 96 92 C 140 106, 188 104, 232 84", "M 158 68 C 150 116, 136 154, 112 190", "M 222 126 C 176 134, 108 170, 112 206 C 116 238, 198 232, 248 208"],
    notes: ["第 1 笔：上横", "第 2 笔：中间下弯", "第 3 笔：右侧起笔，向左下绕回"],
  },
  ん: {
    strokes: ["M 92 210 C 126 162, 160 106, 194 76 C 174 126, 174 190, 202 204 C 226 216, 250 194, 262 168"],
    notes: ["第 1 笔：一笔波形，末端向右上"],
  },
};

const tips = [
  "先看整体方向，再练每一笔的起笔位置。",
  "假名的线条多带圆转，收笔不要写得太硬。",
  "跟读时可以先慢速，再恢复正常速度。",
  "写完后对照浅色底字，检查比例和重心。",
];

const kanaChart = document.querySelector("#kanaChart");
const selectedKana = document.querySelector("#selectedKana");
const currentLabel = document.querySelector("#currentLabel");
const pronunciation = document.querySelector("#pronunciation");
const selectedKatakana = document.querySelector("#selectedKatakana");
const groupTag = document.querySelector("#groupTag");
const hiraganaMnemonic = document.querySelector("#hiraganaMnemonic");
const katakanaMnemonic = document.querySelector("#katakanaMnemonic");
const playButton = document.querySelector("#playButton");
const slowButton = document.querySelector("#slowButton");
const strokeSvg = document.querySelector("#strokeSvg");
const strokeList = document.querySelector("#strokeList");
const showGuide = document.querySelector("#showGuide");
const resetStroke = document.querySelector("#resetStroke");
const tipText = document.querySelector("#tipText");
const learnedCount = document.querySelector("#learnedCount");

const learned = new Set(JSON.parse(localStorage.getItem("kanaLearned") || "[]"));
let current = { kana: "あ", romaji: "a", row: "あ行", column: "あ段" };

function buildChart() {
  kanaChart.append(createLabel(""));
  columns.forEach((column) => kanaChart.append(createLabel(column.label)));

  rows.forEach((row) => {
    kanaChart.append(createLabel(row.label));
    row.items.forEach((item, index) => {
      if (!item) {
        const empty = document.createElement("div");
        empty.className = "empty-cell";
        empty.setAttribute("aria-hidden", "true");
        kanaChart.append(empty);
        return;
      }

      const [kana, romaji] = item;
      const katakana = katakanaMap[kana];
      const button = document.createElement("button");
      button.className = "kana-cell";
      button.type = "button";
      button.dataset.kana = kana;
      button.dataset.romaji = romaji;
      button.dataset.row = row.label;
      button.dataset.column = columns[index].label;
      button.setAttribute("aria-label", `${kana}，读作 ${romaji}`);
      button.innerHTML = `
        <span>
          <span class="kana-main">${kana}</span>
          <span class="kana-roma">${romaji}</span>
        </span>
        <span class="kana-katakana" aria-hidden="true">${katakana}</span>
      `;
      button.addEventListener("click", () => selectKana(button, true));
      kanaChart.append(button);
    });
  });

  updateLearnedUI();
  const first = kanaChart.querySelector('[data-kana="あ"]');
  selectKana(first, false);
}

function createLabel(text) {
  const label = document.createElement("div");
  label.className = "chart-label";
  label.textContent = text;
  return label;
}

function selectKana(button, shouldPlay) {
  if (!button) return;
  document.querySelectorAll(".kana-cell").forEach((cell) => cell.classList.remove("is-active"));
  button.classList.add("is-active");
  button.classList.add("is-learned");

  current = {
    kana: button.dataset.kana,
    romaji: button.dataset.romaji,
    row: button.dataset.row,
    column: button.dataset.column,
  };

  learned.add(current.kana);
  localStorage.setItem("kanaLearned", JSON.stringify([...learned]));
  updateLearnedUI();
  renderDetail();
  if (shouldPlay) speak(current.romaji, 0.88);
}

function updateLearnedUI() {
  learnedCount.textContent = learned.size;
  document.querySelectorAll(".kana-cell").forEach((cell) => {
    cell.classList.toggle("is-learned", learned.has(cell.dataset.kana));
  });
}

function renderDetail() {
  selectedKana.textContent = current.kana;
  currentLabel.textContent = current.romaji;
  pronunciation.textContent = `[ ${current.romaji} ]`;
  selectedKatakana.textContent = katakanaMap[current.kana] || "ー";
  groupTag.textContent = `${current.column}・${current.row}`;
  const mnemonic = mnemonicMap[current.kana];
  hiraganaMnemonic.textContent = mnemonic?.hira || "观察字形轮廓，结合发音多读几遍。";
  katakanaMnemonic.textContent = mnemonic?.kata || "把片假名字形拆成简单线条记忆。";
  tipText.textContent = tips[(current.kana.codePointAt(0) + current.romaji.length) % tips.length];
  renderStroke();
}

function renderStroke() {
  const shape = getStrokeShape(current.kana);
  const guideOpacity = showGuide.checked ? 1 : 0;
  strokeSvg.innerHTML = `
    <text class="guide-kana" x="160" y="138" opacity="${guideOpacity}">${current.kana}</text>
  `;
  strokeList.innerHTML = "";

  shape.strokes.forEach((d, index) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("class", "stroke-line");
    path.style.animationDelay = `${index * 520}ms`;
    strokeSvg.append(path);
    const length = path.getTotalLength();
    path.style.setProperty("--dash", length);
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    const point = getStartPoint(d);
    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("class", "stroke-dot");
    dot.setAttribute("cx", point.x);
    dot.setAttribute("cy", point.y);
    dot.setAttribute("r", 12);
    strokeSvg.append(dot);

    const number = document.createElementNS("http://www.w3.org/2000/svg", "text");
    number.setAttribute("class", "stroke-number");
    number.setAttribute("x", point.x);
    number.setAttribute("y", point.y);
    number.textContent = index + 1;
    strokeSvg.append(number);

    const li = document.createElement("li");
    li.textContent = shape.notes[index] || `第 ${index + 1} 笔`;
    strokeList.append(li);
  });
}

function getStrokeShape(kana) {
  if (verifiedStrokeData[kana]) return verifiedStrokeData[kana];
  const count = estimateStrokeCount(kana);
  return {
    strokes: fallbackStrokes[count] || fallbackStrokes[2],
    notes: Array.from({ length: count }, (_, index) => `第 ${index + 1} 笔按红线方向书写`),
  };
}

function estimateStrokeCount(kana) {
  const one = "くこしつてのへろるん";
  const two = "いうえけせそとぬねひふめりれを";
  const three = "さすちにみむもら";
  if (one.includes(kana)) return 1;
  if (two.includes(kana)) return 2;
  if (three.includes(kana)) return 3;
  return 4;
}

function getStartPoint(path) {
  const match = path.match(/M\s*([\d.]+)\s+([\d.]+)/);
  return {
    x: match ? Number(match[1]) : 90,
    y: match ? Number(match[2]) : 90,
  };
}

function speak(text, rate) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text === "wo" ? "お" : current.kana);
  utterance.lang = "ja-JP";
  utterance.rate = rate;
  utterance.pitch = 1;
  playButton.classList.add("is-playing");
  utterance.onend = () => playButton.classList.remove("is-playing");
  utterance.onerror = () => playButton.classList.remove("is-playing");
  window.speechSynthesis.speak(utterance);
}

playButton.addEventListener("click", () => speak(current.romaji, 0.88));
slowButton.addEventListener("click", () => speak(current.romaji, 0.58));
showGuide.addEventListener("change", renderStroke);
resetStroke.addEventListener("click", renderStroke);

document.querySelector("#studyMode").addEventListener("click", () => {
  document.body.classList.toggle("focus-mode");
});

document.querySelector("#favoriteButton").addEventListener("click", (event) => {
  event.currentTarget.textContent = event.currentTarget.textContent.startsWith("★") ? "☆ 收藏" : "★ 已收藏";
});

buildChart();
