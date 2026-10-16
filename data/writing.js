(function () {
const STD_INTRO = 'Using your knowledge of dance education concepts, principles, and practices, write a response of approximately 400–600 words in which you:';
const STD_TASKS = [
  'select a grade or developmental level for this lesson;',
  'identify a specific student learning goal that aligns with the standard and the lesson;',
  'describe, in detail, one instructional activity that you would use to promote students\' achievement of the learning goal, including the use of appropriate resources and strategies;',
  'explain how the instructional activity supports the learning goal and the development of students\' knowledge and skills related to the lesson; and',
  'explain one way that student performance and achievement related to the learning goal could be measured and evaluated.',
];
const STD_ZH = '运用你的舞蹈教育知识，写一篇约 400–600 词的回答：① 选择这节课的年级或发展水平；② 写一个与标准和这节课一致的具体学习目标；③ 详细描述一个帮助学生达成目标的教学活动，包括资源和策略；④ 解释这个活动如何支持学习目标、发展学生的知识和技能；⑤ 说明一种衡量和评价学生表现的方法。';
const DIFF_INTRO = 'Using your knowledge of dance education concepts, principles, and practices, write a response of approximately 400–600 words in which you:';
const DIFF_TASKS = [
  'select a grade or developmental level for these students;',
  'identify a specific learning goal related to the difficulty described;',
  'describe, in detail, one instructional strategy or intervention you would use to address the difficulty, including the use of appropriate resources;',
  'explain how the strategy or intervention would help students overcome the difficulty and achieve the learning goal; and',
  'explain one way you would assess students\' progress and use the results to inform future instruction.',
];
const DIFF_ZH = '运用你的舞蹈教育知识，写一篇约 400–600 词的回答：① 选择学生的年级或发展水平；② 写一个与所述困难相关的具体学习目标；③ 详细描述一个用来解决这个困难的教学策略或干预措施，包括资源；④ 解释它如何帮助学生克服困难、达成目标；⑤ 说明一种评估学生进步的方法，以及如何用结果指导后续教学。';

window.WRITING = {
guide: `
<div class="card"><h3>📐 五段式结构（每篇都一样）</h3>
<p>题目永远让你做 <b>5 件事</b>。就按这 5 件事写 5 段（活动那段可以分 2 段），每段开头用题目里的关键词，阅卷人一眼就能找到。总共 <b>400–600 词</b>。</p>
<table>
<tr><th>段</th><th>任务</th><th>写什么</th><th>词数</th></tr>
<tr><td>1</td><td><b>Grade level</b></td><td>年级 + 一句为什么适合（发展特点 + 学生已有的基础）</td><td>40–60</td></tr>
<tr><td>2</td><td><b>Learning goal</b></td><td>Students will be able to…（可观察、可测量），并点明和标准、EU 的联系</td><td>40–70</td></tr>
<tr><td>3–4</td><td><b>Activity</b></td><td><b>一个</b>活动，按步骤写：热身/导入 → 示范和探索 → 小组创作/练习 → 分享 → 反思；写清<b>资源</b>（音乐、视频、图片、道具、卡片）和<b>策略</b>（示范、意象、分组、差异化）</td><td>180–250</td></tr>
<tr><td>5</td><td><b>Explain</b></td><td>为什么有效：联系目标、舞蹈概念和学生发展特点；至少给 2 个理由</td><td>80–120</td></tr>
<tr><td>6</td><td><b>Assessment</b></td><td>一种方法（checklist / rubric / 观察 / 自评），写出<b>具体标准</b>，以及结果怎样用于下一步教学</td><td>70–110</td></tr>
</table>
<div class="key">评分看三点：<b>Completeness</b>（5 个任务都答了吗）、<b>Accuracy</b>（舞蹈和教学知识准确吗）、<b>Depth of Support</b>（有具体例子和细节、推理合理吗）。语法不需要完美，但要清楚。</div></div>

<div class="card frame"><h3>✍️ 第 1 段：年级</h3>
<p class="en">This lesson is designed for a [third-grade general dance class / ninth-grade beginning dance class].</p>
<p class="en">At this age, students [are developing spatial awareness and can work cooperatively in small groups / are capable of abstract thinking and are interested in expressing their own ideas].</p>
<p class="en">In previous lessons, students have learned [locomotor movements / the elements of dance / basic choreographic devices], so they are ready to [explore… / apply…].</p></div>

<div class="card frame"><h3>✍️ 第 2 段：学习目标</h3>
<p class="en">The specific learning goal is: Students will be able to [create / perform / identify / analyze] [a 16-count phrase that uses at least three pathways and two levels].</p>
<p class="en">This goal aligns with the standard because [the enduring understanding states that… / students will use space, time, and energy to communicate an idea].</p></div>

<div class="card frame"><h3>✍️ 第 3–4 段：教学活动</h3>
<p class="en">To begin, I would lead a warm-up that [introduces the concept of… / uses the BrainDance / explores levels through imagery].</p>
<p class="en">Next, I would [demonstrate… / show a short video excerpt of… / post visual cards that illustrate…]. Students would [explore… / improvise…] while I [call out cues / monitor and give feedback].</p>
<p class="en">Then, students would work in groups of [three or four] to [create a short phrase that…]. Each group would [choose / draw a card / use a pathway map]…</p>
<p class="en">Finally, each group would share its phrase with the class, and the audience would [identify… / give feedback using the sentence starter “I noticed…”]. We would end with a cool-down and a short reflection.</p>
<p class="sub small">💡 资源要写出来：音乐、鼓、视频片段、海报、图片卡、路径图、道具（围巾、弹力带）、平板录像、检核表。</p></div>

<div class="card frame"><h3>✍️ 第 5 段：解释为什么有效</h3>
<p class="en">This activity supports the learning goal in several ways. First, by [exploring… physically], students [build a concrete understanding of…].</p>
<p class="en">Second, working in small groups allows students to [solve a movement problem together / make choices / learn from peers], which [builds creative and collaborative skills].</p>
<p class="en">In addition, the visual cards and demonstrations support [visual learners and English language learners], so all students can participate fully.</p></div>

<div class="card frame"><h3>✍️ 第 6 段：评估</h3>
<p class="en">I would assess student achievement using a [checklist / rubric] during the group performances. The criteria would include whether students [use at least three pathways], [change levels clearly], and [perform the phrase with clear beginning and ending shapes].</p>
<p class="en">I would also [video-record the performances / ask students to complete a self-assessment / use an exit ticket].</p>
<p class="en">The results would help me identify which students need more support with [ ] and plan future lessons, such as [ ].</p></div>

<div class="card"><h3>🧰 活动素材库（按标准）</h3>
<table>
<tr><th>标准</th><th>可以用的活动</th></tr>
<tr><td>Cr1 灵感来源</td><td>诗歌/图片/艺术作品/自然现象 → 即兴 → 选出动作 → 组成乐句</td></tr>
<tr><td>Cr2 组织发展</td><td>用编舞手法卡（retrograde、canon、change level…）改编一个乐句；ABA 结构小组编舞</td></tr>
<tr><td>Cr3 完善记录</td><td>录像 + 同伴反馈（I noticed / I wonder）→ 修改；用 motif 符号卡记录</td></tr>
<tr><td>Pr4 空间时间能量</td><td>路径站点轮换、路径图、Laban 动作词卡（float、punch）、节奏变化</td></tr>
<tr><td>Pr5 身体作为工具</td><td>解剖图 + 正确/错误对比、意象、身体排列检核、热身设计</td></tr>
<tr><td>Pr6 表演</td><td>投射、焦点练习、观众礼仪、班级展演、技术排练体验</td></tr>
<tr><td>Re7 感知分析</td><td>看大师作品片段 → 用舞蹈元素描述 → 图形组织器</td></tr>
<tr><td>Re8 诠释</td><td>看两遍视频，每人负责一个元素 → 小组诠释意义 → 用证据支持</td></tr>
<tr><td>Re9 评价标准</td><td>比较两种舞种（芭蕾 vs 嘻哈）的评价标准，共同制定量规</td></tr>
<tr><td>Cn10 个人经验</td><td>用自己生活中的动作/记忆创作独舞；跨学科（诗、科学、数学）</td></tr>
<tr><td>Cn11 社会文化背景</td><td>学习一种文化的舞蹈 + 背景研究 + 文化传承人/视频 + 表演</td></tr>
</table></div>

<div class="card"><h3>📊 评估素材库</h3>
<ul>
<li><b>Checklist</b>：做到/没做到（3 个以上具体标准）</li>
<li><b>Rubric</b>（4 级：Exceeds / Meets / Approaching / Beginning）：每个标准都有描述</li>
<li>录像 + 自评；同伴评价（用标准）</li>
<li>Exit ticket、journal、图形组织器、短的书面反思</li>
<li>Pre-assessment（导入时观察/提问）→ 和最后的表现比较 → 看进步</li>
</ul>
<p class="small">一定要写最后一句：<span class="en">The results would help me plan future instruction by…</span>（对应大纲 0005 e：用评估指导后续教学）</p></div>

<div class="card"><h3>🗣 加分词汇（准确地用 2–5 个）</h3>
<p class="small en">elements of dance (body, action, space, time, energy) · locomotor / nonlocomotor · levels · pathways · kinesphere · tempo · accent · phrase · motif · canon · unison · retrograde · ABA · choreographic devices · Laban Effort Actions · improvisation · movement problem · kinesthetic awareness · spatial awareness · alignment · warm-up / cool-down · scaffolding · differentiation · formative assessment · rubric · self-assessment · constructive feedback · enduring understanding</p></div>

<div class="card"><h3>⏱ 60 分钟怎么分</h3>
<ul>
<li>5 分钟：读题、划出标准的关键词（EU、EQ），列 5 点提纲</li>
<li>45 分钟：写</li>
<li>10 分钟：检查——5 个任务都有吗？目标可测量吗？评估标准具体吗？</li>
</ul>
<p><b>⚠️ 常见失分：</b>没写年级；目标太笼统（“appreciate dance”）；写了好几个活动但都不详细；没解释“为什么”；评估只写“I will observe”没有标准；和给定的标准无关。</p></div>
`,

prompts: [
{id:'W1',tag:'Performing · 4',title:'Space, time, and energy',titleZh:'表演 4：空间、时间与能量',
std:{proc:'Performing',n:'4',anchor:'Select, analyze, and interpret artistic work for presentation.',eu:'Space, time, and energy are basic elements of dance.',eq:'How do dancers work with space, time, and energy to communicate artistic expression?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'这是官方样题的标准。可以选：二年级探索 <b>Laban 动作质感</b>（float vs punch），或四年级探索 <b>tempo 和 level</b>。活动用“意象卡 + 鼓 + 小组乐句”。评估：checklist（能否清楚地对比两种能量、换水平、开始和结束定格）。范文选的是“能量对比”，和官方范文（路径）不同，可以对照看两种写法。',
model:`This lesson is designed for a second-grade dance class. Seven- and eight-year-olds have rich imaginations, enjoy movement games, and are developing the body control needed to start and stop on cue. In earlier lessons, my students explored locomotor and nonlocomotor movements, so they are ready to discover how changing energy changes the way a movement looks and feels.

The specific learning goal is: Students will be able to perform the same movement phrase with two contrasting energy qualities—light and floating versus strong and punching—and describe how the change affects the feeling of the dance. This goal aligns with the enduring understanding that space, time, and energy are basic elements of dance, and it helps students answer the essential question of how dancers use energy to communicate expression.

The lesson begins with a warm-up in which students travel through general space while I play a hand drum. When I tap softly, they move as if they were feathers drifting in the wind; when I strike the drum loudly, they move like robots or boxers. Next, I would show two picture cards, a feather and a boxing glove, and write the words "float" and "punch" under them. I would demonstrate a simple four-movement phrase—reach, turn, sink to the floor, and rise—first with floating energy and then with punching energy. Students would copy each version and talk with a partner about what was different.

Then students would work in groups of three. Each group would create its own four-movement phrase using one locomotor movement, one turn, one level change, and an ending shape. They would practice the phrase twice, once with floating energy and once with punching energy, while I circulate, ask guiding questions such as "Are your arms as light as the feather?", and offer imagery. Finally, each group would perform both versions for the class. The audience would raise a feather card or a glove card to show which energy they saw and complete the sentence "I noticed…". We would end with a slow, floating cool-down and a quick class discussion about which version felt happier, calmer, or stronger.

This activity supports the learning goal because students experience energy physically instead of only hearing about it. Performing the same phrase two ways isolates the element of energy, so children can clearly see that the movement stays the same while the expression changes. The imagery and picture cards make an abstract concept concrete for young learners and support visual learners and English language learners. Working in small groups also builds cooperation and gives every child a chance to make choices and perform.

I would assess student achievement with a checklist during the group performances. The criteria would be: the student performs the floating version with light, sustained, smooth movement; the student performs the punching version with strong, sudden movement; the student changes level clearly; and the student holds a clear ending shape. I would also record each child's spoken "I noticed…" statement. If several students cannot yet make a clear contrast, I would plan a follow-up lesson with more imagery and partner mirroring before moving on to time and tempo.`,
modelZh:'① 二年级，想象力强、在学控制开始和停止，已学过移动/非移动动作。② 目标：用两种对比的能量（漂浮 vs 冲击）完成同一乐句，并描述感觉的变化；联系 EU。③ 活动：鼓声热身（轻 = 羽毛，重 = 拳击手）→ 图片卡 float/punch + 示范同一乐句两种做法 → 三人小组自编 4 个动作的乐句，用两种能量练习，老师巡视提问 → 展示，观众举卡片识别并说 “I noticed…” → 漂浮式放松 + 讨论。④ 解释：亲身体验；同一动作只变能量，凸显元素；意象和图片支持低龄、视觉型和 ELL；小组合作和选择。⑤ 评估：检核表 4 条标准 + 记录学生的描述；没做到的学生 → 下节课更多意象和镜像练习。'},

{id:'W2',tag:'Responding · 8',title:'Interpreting meaning in dance',titleZh:'鉴赏 8：诠释舞蹈的意义',
std:{proc:'Responding',n:'8',anchor:'Interpret intent and meaning in artistic work.',eu:'Meaningful interpretations of dance consider artistic intent, style, genre, the elements of dance, technique, structure, and context.',eq:'How can dance be interpreted?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'官方样题的标准。范文用八年级 + Ailey 的 <b>Revelations</b> 片段（“Wade in the Water”）：第一遍看写感受 → 背景介绍 → 第二遍每人负责一个元素 → 小组用证据写诠释 → 用 2 个动作展示诠释。评估：诠释量规（证据、术语、背景）。',
model:`This lesson is designed for an eighth-grade dance class. Thirteen- and fourteen-year-olds are beginning to think abstractly and enjoy discussing ideas, but they often give opinions without evidence. My students already know the elements of dance and have watched several short works, so they are ready to move from describing a dance to interpreting its meaning.

The learning goal is: Students will be able to write and present an interpretation of a dance excerpt that is supported by at least three pieces of evidence drawn from the elements of dance, the production elements, and the cultural context of the work. This goal aligns with the enduring understanding that meaningful interpretations consider intent, style, the elements of dance, structure, and context.

I would use the "Wade in the Water" section of Alvin Ailey's Revelations. First, students would watch the excerpt once without any introduction and quickly write down words or images that came to mind. Next, I would briefly share the context: Ailey created Revelations in 1960 from his "blood memories" of growing up in Black churches in Texas, and the music comes from African American spirituals. I would show a photograph of a river baptism and post a word bank with terms such as fabric, parasol, sustained, unison, level, and focus.

For the second viewing, each student in a group of four would be assigned one lens: body and action, space, time and energy, or costumes and props. While watching, students would take notes on a graphic organizer for their lens. Afterward, groups would combine their notes to answer the essential question, "How can this dance be interpreted?" Each group would write a two-sentence interpretation using the frame "We think the dance is about… because…" and then create two short movements that show their interpretation, such as a rippling arm gesture inspired by the fabric. Groups would share their interpretations and movements, and classmates would identify which evidence was most convincing.

This activity supports the learning goal because it moves students step by step from personal response to evidence-based interpretation. The first viewing honors students' initial feelings, while the context and second viewing give them the knowledge and focus they need to look more closely. Assigning each student one lens makes the task manageable and ensures that every element is analyzed. Creating movement from their interpretation connects responding to creating and helps kinesthetic learners show understanding. Hearing other groups' ideas also teaches students that a dance can have more than one valid interpretation when each is supported by evidence.

I would evaluate each group's written interpretation and presentation with a four-level rubric. The criteria would be: the interpretation is clearly stated; it is supported by at least three specific pieces of evidence from the dance; it uses accurate dance vocabulary; and it considers the cultural context of the work. Students would also complete a short exit ticket naming one piece of evidence from another group that changed their thinking. The rubric results would show me whether students need more practice using vocabulary or connecting context to meaning before we analyze our next work.`,
modelZh:'① 八年级：开始抽象思维，但常给观点不给证据；已学舞蹈元素。② 目标：写出并展示对一段舞蹈的诠释，至少有 3 条来自元素、制作元素和文化背景的证据。③ 活动：Ailey《Revelations》“Wade in the Water”——第一遍看、写感受 → 介绍背景（血缘记忆、灵歌、洗礼照片、词汇墙）→ 第二遍，四人组每人负责一个“视角”（身体/空间/时间能量/服装道具），填图形组织器 → 小组用 “We think… because…” 写诠释，并创作 2 个动作 → 分享、同学指出最有说服力的证据。④ 解释：从个人感受逐步走向有证据的诠释；分工让任务可控；把鉴赏和创作连接；理解诠释可以多样但要有证据。⑤ 评估：四级量规（观点清楚、3 条证据、术语准确、考虑背景）+ exit ticket；用结果决定下一步。'},

{id:'W3',tag:'Creating · 1',title:'Generating ideas from sources',titleZh:'创作 1：从灵感来源产生想法',
std:{proc:'Creating',n:'1',anchor:'Generate and conceptualize artistic ideas and work.',eu:'Choreographers use a variety of sources as inspiration and transform concepts and ideas into movement for artistic expression.',eq:'Where do choreographers get ideas for dances?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'选五年级 + <b>一首关于天气/季节的诗</b>（或一幅画）。活动：读诗圈出动词和形容词 → 每个词即兴 → 选 3 个最好的动作 → 加过渡组成 16 拍乐句 → 分享，观众猜是哪行诗。也可以讲 literal vs abstract。评估：检核表（3 个来自诗的动作、至少一个抽象转化、有过渡、开始结束定格）+ 简短书面反思。',
model:`This lesson is designed for a fifth-grade dance class. Ten- and eleven-year-olds have stronger coordination and memory than younger children and can work productively in small groups. They are also learning to read poetry closely in their English classes, which makes this a good moment to show them that choreographers find ideas in many places, including literature.

The learning goal is: Students will be able to transform at least three words or images from a poem into original movements and organize them into a 16-count phrase with clear transitions. This goal aligns with the enduring understanding that choreographers use a variety of sources as inspiration and transform ideas into movement.

I would choose a short poem about a thunderstorm and display it on a poster. After a warm-up that explores contrasting movements—shaking, melting, exploding, and freezing—I would read the poem aloud twice. Students would then work with a partner to circle the strongest action words and images, such as "rumble," "flash," "pour," and "calm." For each word, I would lead a short improvisation: "Show me rumble in your feet. Now show me rumble in your shoulders." I would explain the difference between a literal movement, such as miming rain falling, and an abstract movement, such as fingers flickering quickly to suggest lightning.

Next, students would work in groups of three or four. Each group would select three words from the poem, create one movement for each word, and try at least one abstract version. They would then connect the movements with transitions and practice the phrase so that it lasts 16 counts, with a clear beginning and ending shape. I would circulate with guiding questions, such as "How could you change the level or size to make 'flash' more surprising?" I would also play a recording of rain and thunder to support the mood while groups rehearse. Finally, each group would perform for the class, and the audience would try to identify which lines of the poem inspired each movement.

This activity supports the learning goal because it gives students a concrete source and a clear process for turning ideas into movement: reading, improvising, selecting, and organizing. Improvising first frees students to explore many possibilities before choosing their best ideas, which mirrors the real choreographic process. Discussing literal and abstract choices deepens their understanding of how choreographers transform, rather than simply copy, a source. The guessing game also helps performers see whether their movements communicate clearly to an audience.

I would assess student achievement with a checklist during the performances. The criteria would include: the phrase contains at least three movements clearly inspired by the poem; at least one movement is an abstract interpretation; the movements are connected with smooth transitions; and the phrase has a clear beginning and ending shape. Each student would also write two sentences explaining which word inspired their favorite movement and how they changed it. This information would show me who is ready to develop phrases further with choreographic devices and who needs more guided practice in abstracting movement.`,
modelZh:'① 五年级：协调性和记忆提高，能小组合作，语文课在学读诗。② 目标：把诗中至少 3 个词或意象转化为原创动作，组织成有过渡的 16 拍乐句。③ 活动：对比动作热身 → 朗读雷雨诗两遍，圈出动词和意象 → 每个词即兴，讲 literal vs abstract → 小组选 3 个词，各编一个动作（至少一个抽象），加过渡，16 拍，有开始和结束造型；放雨声录音；老师提问 → 展示，观众猜是哪一行。④ 解释：明确的创作流程（读—即兴—选择—组织）；先即兴再选择，符合真实编舞；理解“转化而不是照搬”；猜诗句检验传达。⑤ 评估：检核表 4 条 + 两句书面反思；决定谁可以进入编舞手法、谁需要更多抽象练习。'},

{id:'W4',tag:'Creating · 2',title:'Choreographic devices and structure',titleZh:'创作 2：编舞手法与结构',
std:{proc:'Creating',n:'2',anchor:'Organize and develop artistic ideas and work.',eu:'The elements of dance, dance structures, and choreographic devices serve as both a foundation and a departure point for choreographers.',eq:'What influences choice-making in creating choreography?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'高中（9–10 年级初级舞蹈课）。活动：老师教一个 8 拍“母题乐句” → 抽“编舞手法卡”（retrograde、canon、accumulation、change level、instrumentation、fragmentation）→ 小组用 2 个手法发展母题 → 组成 ABA 结构（A = 原母题，B = 发展后的版本）→ 展示，观众识别手法。评估：量规（手法运用准确、ABA 清楚、过渡、表演的清晰度）+ 小组设计说明。',
model:`This lesson is designed for a ninth-grade beginning dance class. High school students can think abstractly, make independent artistic choices, and analyze their own work, but many beginners have not yet learned the tools choreographers use to develop movement. My students have already created short phrases and learned the elements of dance, so they are ready to learn how choreographic devices can transform a simple idea into a complete dance.

The learning goal is: Students will be able to apply at least two choreographic devices to develop a movement motif and organize the results into a dance in ABA form. This goal aligns with the enduring understanding that the elements of dance, structures, and choreographic devices serve as both a foundation and a departure point for choreographers.

First, I would teach the class an eight-count motif built from simple movements: a step forward, a reach up, a turn, a drop to a low level, and a rise into a still shape. I would then show a short video clip of a canon from Doris Humphrey's Water Study and demonstrate several devices with the motif: retrograde, change of level, change of tempo, instrumentation, fragmentation, and canon. Students would practice each device briefly as a whole class so they can see and feel the difference.

Next, students would form groups of four. Each group would draw two "device cards" from a basket and use those devices to create a developed version of the motif. The group would then build a short dance in ABA form: section A is the original motif performed in unison, section B is the developed version, and the final A returns to the motif with one small change, such as a new facing. Groups would plan transitions between sections and record their plan on a simple choreography map. During rehearsal, I would move between groups, ask questions such as "Why did you choose that device for section B?" and suggest ways to make the contrast clearer. Each group would perform its dance, and the audience would identify the devices used and the moment the A section returned.

This activity supports the learning goal because students learn devices through direct physical experimentation rather than memorizing definitions. Using one shared motif allows everyone to see clearly how each device changes the same material, while drawing cards encourages groups to solve a new creative problem. The ABA structure gives students a simple framework for organizing their choices and teaches the importance of contrast and return. Explaining their choices also helps students understand that choreographers make intentional decisions.

I would evaluate each group with a four-level rubric. The criteria would be: the two devices are applied accurately and are clearly visible; the dance follows an identifiable ABA structure; transitions between sections are smooth; and the group performs with clear focus and timing. Each group would also submit its choreography map with one sentence explaining why the devices were chosen. If the rubric shows that groups struggle with transitions, I would plan a mini-lesson on transitions before the next composition project.`,
modelZh:'① 九年级初级班：能抽象思考、独立选择，但还不会编舞工具；已会编短乐句。② 目标：用至少 2 个编舞手法发展母题，并组成 ABA 结构的舞蹈。③ 活动：教一个 8 拍母题 → 播放 Humphrey《Water Study》中的卡农 → 全班试做各种手法 → 四人组抽 2 张“手法卡”发展母题 → ABA：A 齐舞原母题，B 发展版，A′ 回到母题加一点变化；画编舞图；老师巡视提问 → 展示，观众识别手法和 A 的回归。④ 解释：在身体实验中学手法；同一母题便于比较；抽卡制造新的创作问题；ABA 提供框架，学会对比和回归；解释选择 = 有意识的决定。⑤ 评估：四级量规（手法准确可见、ABA 清楚、过渡流畅、表演清晰）+ 编舞图和一句说明；过渡弱 → 下节课专讲过渡。'},

{id:'W5',tag:'Creating · 3',title:'Revising with feedback and documentation',titleZh:'创作 3：通过反馈和记录完善作品',
std:{proc:'Creating',n:'3',anchor:'Refine and complete artistic work.',eu:'Choreographers analyze, evaluate, refine, and document their work to communicate meaning.',eq:'How do choreographers use self-reflection, feedback from others, and documentation to improve the quality of their work?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'七年级。活动：小组已有一段舞 → 平板录像 → 用简化的 Critical Response Process（“I noticed / I wonder / What if”）互评 → 每组选 2 条反馈修改 → 再录一次 → 用 motif 符号卡写下乐句顺序。评估：前后两版录像对比 + 修改记录单（改了什么、为什么）+ 检核表。',
model:`This lesson is designed for a seventh-grade dance class. Middle school students care a great deal about their peers' opinions and can be sensitive to criticism, so they need a safe, structured way to give and receive feedback. My students have already created short group dances about the theme of "change," and they are now ready to learn how choreographers improve their work through feedback, reflection, and documentation.

The learning goal is: Students will be able to use peer feedback and video self-review to make at least two specific revisions to their group dance and document the final structure using motif symbols. This goal aligns with the enduring understanding that choreographers analyze, evaluate, refine, and document their work to communicate meaning.

To begin, each group would perform its dance while a classmate records it on a tablet. Groups would watch their own video and write one thing they are proud of and one moment that does not yet show their idea clearly. Next, I would introduce a simplified version of Liz Lerman's Critical Response Process using a poster with three sentence starters: "I noticed…," "I wonder…," and "What if…?" I would model the process by giving feedback on a short phrase I perform, showing how to describe specific movements before offering suggestions.

Then pairs of groups would watch each other perform. The watching group would first share statements of what they noticed and found meaningful, then the performing group would ask one question about a part they were unsure of, and finally the watching group would offer "What if" suggestions. Each group would choose two pieces of feedback to try, such as adding a level change to show transformation or clarifying the ending shape. After revising, groups would record a second video. As the final step, each group would document its dance by arranging motif symbol cards—for traveling, turning, jumping, stillness, and level changes—on a large sheet of paper in the order of their dance.

This activity supports the learning goal because it teaches students that revision is a normal and valuable part of making art. Video allows students to see their work from the audience's point of view, which is difficult while dancing. The structured feedback protocol keeps comments specific and respectful, reducing anxiety and helping students accept suggestions. Choosing which feedback to use gives students ownership of their artistic decisions, and documenting with motif symbols helps them analyze the structure of their dance and remember it for future rehearsals.

I would assess achievement by comparing each group's first and second videos with a checklist. The criteria would be: the group made at least two clear revisions; the revisions respond to peer feedback or self-review; the revised dance communicates the theme more clearly; and the motif map accurately shows the order of the dance. Each student would also complete a revision log explaining what was changed and why. These results would show me which students can apply feedback independently and which need more modeling before our final performance.`,
modelZh:'① 七年级：在意同伴看法、怕被批评，需要安全的结构；已有关于“变化”的小组舞。② 目标：根据同伴反馈和录像自评至少做 2 处具体修改，并用 motif 符号记录最终结构。③ 活动：录像 → 小组自看写一个优点和一个不清楚的地方 → 介绍简化 CRP（I noticed / I wonder / What if）并示范 → 两组互看：先说注意到的，表演组提问，再给 What if 建议 → 每组选 2 条修改 → 再录像 → 用 motif 符号卡排出舞蹈顺序。④ 解释：修改是正常的创作过程；录像提供观众视角；结构化反馈具体、尊重、降低焦虑；自主选择；记谱帮助分析和记忆。⑤ 评估：前后录像对比检核表 + 修改记录；判断谁能独立运用反馈。'},

{id:'W6',tag:'Performing · 5',title:'The body as an instrument: alignment',titleZh:'表演 5：身体作为工具——身体排列',
std:{proc:'Performing',n:'5',anchor:'Develop and refine artistic techniques and work for presentation.',eu:'Dancers use the mind-body connection and develop the body as an instrument for artistry and artistic expression.',eq:'What must a dancer do to prepare the mind and body for artistic expression?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'高中（10 年级）。目标：在 plié 和落地时保持正确排列（膝对脚尖、骨盆中立）并解释其安全意义。活动：骨骼模型/解剖图 → 对比正确和错误的 plié（膝内扣、塌腰）→ 意象（“膝盖像车灯照向脚尖”）→ 同伴用检核表互相观察 → 小跳组合中应用。评估：同伴检核 + 录像自评 + 简短书面解释。',
model:`This lesson is designed for a tenth-grade intermediate dance class. High school dancers are strong enough to jump higher and train harder, but many still land with their knees rolling inward or their pelvis tilted, which increases the risk of injury as their training intensifies. Adolescents can understand basic anatomy and are capable of analyzing their own movement, so this is an ideal time to connect technique with knowledge of the body.

The learning goal is: Students will be able to maintain correct alignment—knees tracking over the toes and a neutral pelvis—during demi-plié and jump landings, and explain why this alignment protects the knees and ankles. This goal aligns with the enduring understanding that dancers develop the body as an instrument for artistic expression through the mind-body connection.

I would begin class with a warm-up that includes pliés in parallel and first position. Next, using a small skeleton model and an anatomical poster of the leg, I would show how the knee is a hinge joint that is designed mainly to bend and straighten, while turnout comes from rotation at the hip. I would demonstrate an incorrect plié, with the knees falling inward and the back arching, and then a correct plié. Students would describe the differences they see. I would then give imagery to help them feel correct alignment, such as "Imagine headlights on your kneecaps shining straight over your second toes" and "Let your tailbone grow long like a tail toward the floor."

Students would then work in pairs. One partner would perform four demi-pliés and four small sautés while the other partner observed from the front using a picture checklist with three points: knees over toes, heels down on landing, and pelvis neutral. Partners would give feedback and then switch roles. After practice, the class would perform a short petit allegro combination across the floor while I give individual corrections and use verbal cues. Finally, students would watch a short video of a professional dancer's jump landings and identify the same alignment principles.

This activity supports the learning goal because it combines knowledge of anatomy with direct physical experience. Seeing the skeleton helps students understand why the knee should not twist, which makes them more likely to correct themselves. Imagery connects the anatomical idea to a kinesthetic feeling, which supports the mind-body connection named in the standard. Peer observation with a clear checklist trains students' eyes and helps them recognize alignment in others and themselves. Applying the principle in a jumping combination ensures that the skill transfers to real dancing rather than staying a separate exercise.

I would assess achievement in two ways. First, during the partner activity, I would review each pair's completed checklists. Second, I would record students performing the petit allegro combination and use a three-point rubric to rate knee alignment, heel placement, and pelvic position as consistent, inconsistent, or not yet visible. Students would also write a short exit ticket explaining why correct alignment matters for injury prevention. I would use these results to give individual conditioning suggestions and decide which students need more practice before we add larger jumps.`,
modelZh:'① 十年级中级：跳得更高、练得更苦，但落地常内扣、塌腰，风险增加；能理解基础解剖、会分析自己。② 目标：在 demi-plié 和落地时保持正确排列（膝对脚尖、骨盆中立），并解释为什么能保护膝踝。③ 活动：plié 热身 → 骨骼模型和腿部解剖图（膝是铰链、外开来自髋）→ 示范错误和正确 plié，学生描述 → 意象（膝盖车灯、尾骨变长）→ 两人一组用图片检核表互看 plié 和小跳，交换 → 小跳组合 + 个别纠正 → 看专业舞者落地视频识别原则。④ 解释：知识 + 身体体验；知道“为什么”更会自我纠正；意象连接身心；同伴观察训练眼睛；在跳跃组合中迁移。⑤ 评估：同伴检核表 + 录像三点量规 + exit ticket；据此给个别体能建议，决定是否加大跳。'},

{id:'W7',tag:'Performing · 6',title:'Performance practices and projection',titleZh:'表演 6：表演实践与投射',
std:{proc:'Performing',n:'6',anchor:'Convey meaning through the presentation of artistic work.',eu:'Dancers use performance etiquette and performance practices during class, rehearsal, and performance.',eq:'How does a dancer heighten artistry in a public performance?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'四年级，准备学期末展演。目标：表演时保持焦点、投射、清晰的开始和结束造型，并遵守表演礼仪。活动：“三个房间”练习（给自己 / 给前排 / 给最后一排）→ 焦点练习（看向一个点）→ 舞台方位游戏 → 模拟演出（进场、表演、定格、谢幕）。评估：表演检核表 + 自评星级。',
model:`This lesson is designed for a fourth-grade dance class that is preparing for its first public performance for families. Nine- and ten-year-olds are eager to perform, but they often look at the floor, rush through endings, or wave to their families from the stage. They are developing more body control and can follow multi-step routines, so they are ready to learn the performance practices that make a dance clear and confident for an audience.

The learning goal is: Students will be able to perform their class dance with clear focus, projected energy, held beginning and ending shapes, and appropriate performance etiquette for entrances, exits, and bows. This goal aligns with the enduring understanding that dancers use performance etiquette and performance practices during class, rehearsal, and performance.

I would begin with a warm-up called "Three Rooms." Students perform a simple arm phrase three times: first as if dancing only for themselves in a tiny room, then for the front row, and finally for someone sitting in the very back row of the auditorium. We would discuss how their energy, size, and eyes changed. Next, I would teach a focus game: I place colorful paper stars on the walls, call out a color, and students must look at that star while performing a reach or turn. This helps them practice looking up and out instead of at the floor.

Then I would use tape on the floor to mark downstage, upstage, stage left, and stage right, and students would practice entering from the wings, finding their spots, and exiting quietly. Finally, we would hold a "mock performance." Half of the class would be the audience and practice good audience etiquette, while the other half performs the class dance from entrance to bow. I would remind performers to freeze in their starting shape for three counts, keep performing even if they make a mistake, hold the final shape until the music ends, and bow together. The groups would then switch roles and share one compliment and one goal for the next rehearsal.

This activity supports the learning goal because it makes abstract performance qualities concrete and practical. The "Three Rooms" exercise lets students feel the difference that projection makes, and the focus game gives them a specific target for their eyes. Practicing stage directions, entrances, and exits in a realistic setting reduces anxiety and builds confidence before the actual performance. Taking turns as performers and audience members helps students understand both sides of a performance and reinforces respectful behavior.

I would assess student achievement using a performance checklist during the mock performance. The criteria would be: the student holds the beginning and ending shapes; keeps focus up and out; performs with energy that reaches the back of the room; and follows entrance, exit, and bow procedures. Students would also rate themselves from one to three stars on each criterion and write one personal goal. I would compare the self-ratings with my checklist, then use the results to plan targeted coaching, such as extra focus practice for students who still look down.`,
modelZh:'① 四年级，准备第一次给家长的演出：常看地面、匆忙结束、在台上挥手；能遵循多步骤常规。② 目标：表演时有清晰的焦点、投射的能量、保持开始和结束造型，并遵守进出场和谢幕礼仪。③ 活动：“三个房间”（为自己/前排/最后一排）→ 焦点游戏（看指定颜色的星星）→ 地面胶带标出舞台方位，练进场找位置、安静退场 → 模拟演出：一半当观众练礼仪，一半从进场演到谢幕；提醒定格 3 拍、出错继续、保持结尾、一起鞠躬 → 交换，互相给一个赞美和一个目标。④ 解释：把抽象的表演品质具体化；真实情境减少焦虑；轮流当演员和观众。⑤ 评估：表演检核表 4 条 + 学生星级自评和个人目标；比较后有针对性地辅导。'},

{id:'W8',tag:'Responding · 9',title:'Criteria vary across genres',titleZh:'鉴赏 9：评价标准因舞种而异',
std:{proc:'Responding',n:'9',anchor:'Apply criteria to evaluate artistic work.',eu:'Criteria for evaluating dance vary across genres, styles, and cultures.',eq:'What criteria are used to evaluate dance?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'十一/十二年级。活动：看两段视频（古典芭蕾变奏 vs 嘻哈 battle / 或 Bharatanatyam）→ 小组列出每种舞蹈“好”的标准 → 研究资料/文化传承人视频验证 → 共同制定两份量规 → 用量规评价第三段视频。评估：小组量规的质量 + 个人书面评价（用对应标准 + 证据）。',
model:`This lesson is designed for an eleventh-grade advanced dance class. Older high school students can analyze complex ideas, consider multiple perspectives, and recognize their own biases. However, many of my students were trained mainly in one style and tend to judge every dance by the standards of that style. This lesson helps them understand that each genre has its own aesthetic values.

The learning goal is: Students will be able to identify genre-specific criteria for evaluating two different dance forms and apply those criteria to write an evidence-based evaluation of a performance. This goal aligns with the enduring understanding that criteria for evaluating dance vary across genres, styles, and cultures.

I would begin by asking students to write a quick answer to the question, "What makes a dance good?" and then share their answers, which I would list on the board. Next, students would watch two short videos: a classical ballet variation, such as the Sugar Plum Fairy variation from The Nutcracker, and a hip-hop battle between two experienced dancers. After each video, students would discuss in groups of four which qualities seemed most valued in that form. For ballet, they might list clean lines, turnout, control, and lightness; for hip-hop, they might list musicality, originality, foundational footwork, and response to the opponent.

Then each group would check its ideas against short readings and a video interview with a hip-hop artist and a ballet teacher. Using this research, each group would create a simple four-criterion rubric for each genre. As a class, we would compare the rubrics with the original list on the board and discuss which criteria were universal, such as commitment and musicality, and which were specific to a style. Finally, students would watch a third video—an excerpt from a Bharatanatyam performance—and, with guidance from a short article on its aesthetics, individually write a one-paragraph evaluation using criteria appropriate to that form.

This activity supports the learning goal because students discover the criteria themselves through observation and research rather than simply being told. Comparing two very different genres side by side makes the differences in aesthetic values easy to see and challenges the assumption that one style is the standard for all dance. Creating rubrics gives students a concrete tool and helps them understand how evaluation works. Applying the process to a third, unfamiliar form requires them to transfer their learning and to approach other cultures' dances with respect and curiosity.

I would evaluate student achievement in two parts. First, I would review each group's rubrics for accuracy and clarity. Second, I would grade each student's written evaluation of the Bharatanatyam excerpt using a rubric with these criteria: identifies criteria appropriate to the genre; supports judgments with at least two specific observations; uses accurate dance vocabulary; and avoids judging the work by the standards of a different style. The results would show me whether students can apply the concept independently and would guide our next unit on dance criticism.`,
modelZh:'① 十一年级高级班：能多视角分析、认识偏见，但很多人只学过一种风格，会用它评判一切。② 目标：识别两种舞蹈各自的评价标准，并用这些标准写出有证据的评价。③ 活动：先写“什么是好舞蹈” → 看芭蕾变奏和嘻哈 battle，小组讨论各自看重什么 → 用资料和艺术家访谈验证 → 每组为两种舞蹈各做 4 条量规 → 全班比较：哪些标准通用、哪些特有 → 看第三段（婆罗多舞）+ 短文，个人写评价。④ 解释：自己发现标准；并排比较凸显差异，挑战“一种标准”；量规是具体工具；迁移到陌生舞种，培养尊重。⑤ 评估：小组量规 + 个人评价量规（标准合适、2 条证据、术语、不用别的风格评判）。'},

{id:'W9',tag:'Connecting · 11',title:'Dance in cultural context',titleZh:'联结 11：文化背景中的舞蹈',
std:{proc:'Connecting',n:'11',anchor:'Relate artistic ideas and works with societal, cultural, and historical context to deepen understanding.',eu:'Dance literacy includes deep knowledge and perspectives about societal, cultural, historical, and community contexts.',eq:'How does knowing about societal, cultural, historical, and community experiences expand dance literacy?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'六年级，学习一种西非舞蹈（如加纳 Kpanlogo）或墨西哥 baile folklórico。活动：地图和背景介绍 → 视频/文化传承人 → 学基本步伐和与鼓的关系（鼓点 break）→ 小组研究一个方面（音乐/服装/功能/历史）→ 表演 + 小组讲解。评估：表演检核表 + 背景讲解量规。',
model:`This lesson is designed for a sixth-grade dance class. Eleven- and twelve-year-olds are curious about the wider world and are studying world cultures in social studies. They can learn short sequences, work in research groups, and begin to understand how history and culture shape the arts, which makes this an ideal time to study a dance in its cultural context.

The learning goal is: Students will be able to perform the basic steps of Kpanlogo, a social dance from Ghana, in response to drum cues, and explain at least two ways the dance reflects the culture and history of the Ga people. This goal aligns with the enduring understanding that dance literacy includes deep knowledge of societal, cultural, historical, and community contexts.

I would open the lesson by locating Ghana on a world map and sharing a brief introduction: Kpanlogo developed in Accra in the 1960s, around the time of Ghana's independence, as a recreational dance for young people, and it is accompanied by Kpanlogo drums, bells, and rattles. I would then show a short video of a community performance and ask students to notice the dancers' posture, energy, and interaction with the drummers and with each other. Whenever possible, I would invite a local Ghanaian dance artist or culture bearer to co-teach the class.

Next, I would lead a warm-up with bent knees, a relaxed and flexible torso, and grounded weight to prepare the body for the style. I would teach two or three basic Kpanlogo steps using the add-on method, first with clapping and counting and then with live or recorded drumming. Students would practice responding to a drum "break" that signals a change of step. I would also explain call and response and have half of the class answer the other half's movements.

Then students would form four research groups. Each group would explore one aspect of the dance—music and instruments, social function, historical context, or costume and community—using short articles and videos I provide. Each group would prepare a one-minute explanation. In the final part of the lesson, the whole class would perform the dance together, with each research group presenting its findings before or after the performance.

This activity supports the learning goal because students learn the dance both physically and intellectually. Practicing the posture and steps helps them feel the dance's grounded energy and relationship with the drums, while the research groups help them understand why the dance looks and feels the way it does. Watching authentic performances and learning from a culture bearer show respect for the tradition and avoid stereotypes. Connecting the dance to Ghana's independence also links our dance class to students' social studies learning.

I would assess student achievement with two tools. During the final performance, I would use a checklist to note whether each student performs the basic steps with the correct grounded posture, changes steps in response to the drum break, and participates in the call and response. I would also use a simple rubric to evaluate each group's presentation for accurate information and clear explanation of how the dance reflects culture and history. The results would help me plan the next lesson and decide which cultural ideas need to be revisited.`,
modelZh:'① 六年级：对世界好奇，社会课在学世界文化，能学短组合、做研究小组。② 目标：根据鼓点完成加纳 Kpanlogo 的基本步，并说出至少两点该舞蹈如何反映加族（Ga）的文化和历史。③ 活动：地图 + 简介（1960 年代阿克拉、独立时期、娱乐性社交舞、鼓铃）→ 观看社区表演视频，注意姿态、能量、与鼓手的互动；尽量请文化传承人合教 → 屈膝接地的热身 → 用叠加法教 2–3 个基本步，先拍手数拍再配鼓；练习鼓点 break 换步；呼应 → 四个研究小组（音乐、社会功能、历史、服装社群），各准备 1 分钟讲解 → 全班表演 + 小组讲解。④ 解释：身体 + 知识双重学习；真实视频和传承人体现尊重、避免刻板印象；联系社会课。⑤ 评估：表演检核表 + 讲解量规；用结果规划下一课。'},

{id:'W10',tag:'Connecting · 10',title:'Personal experience and other disciplines',titleZh:'联结 10：个人经验与跨学科',
std:{proc:'Connecting',n:'10',anchor:'Synthesize and relate knowledge and personal experiences to make art.',eu:'As dance is experienced, all personal experiences, knowledge, and contexts are integrated and synthesized to interpret meaning.',eq:'How does dance deepen our understanding of ourselves, other knowledge, and events around us?'},
intro:STD_INTRO,tasks:STD_TASKS,promptZh:STD_ZH,
hint:'三年级 + 科学课的“水循环”（蒸发、凝结、降水、汇集）。活动：用身体表现每个阶段（水平、能量、关系）→ 小组编一个 4 段的“水循环舞”（循环 = 可以用 rondo 或圆形队形）→ 加入个人经验（“你见过的雨”）。评估：检核表（4 个阶段都有、动作和科学概念对应、能解释）+ 画图说明。',
model:`This lesson is designed for a third-grade dance class. Eight- and nine-year-olds learn best through hands-on experiences, and they enjoy using their imaginations and working with partners. In science class, my students are currently studying the water cycle, so this lesson connects what they know from another subject and from their own experiences of weather with the elements of dance.

The learning goal is: Students will be able to create and perform a group dance that shows the four stages of the water cycle—evaporation, condensation, precipitation, and collection—using changes in level, energy, and relationship, and explain how each movement represents a stage. This goal aligns with the enduring understanding that personal experiences, knowledge, and contexts are integrated and synthesized in dance.

I would begin by asking students to share a time they saw rain, puddles, fog, or steam, and I would record their words on chart paper. Then I would lead a warm-up in which students explore movements inspired by these memories: rising slowly like steam from a cup of cocoa, clumping together like clouds, falling quickly like raindrops, and spreading out like a puddle. Next, I would display a diagram of the water cycle from their science class and connect each stage to a dance element. For evaporation, students rise from low to high level with light, sustained energy. For condensation, they move closer together and connect shapes. For precipitation, they travel downward with sudden, percussive energy. For collection, they gather and flow together at a low level.

Students would then work in groups of four to five to create a short dance with four sections, one for each stage. I would provide a large paper circle on the floor as a reminder that the cycle repeats, and groups would be encouraged to end in the same shape they started in, showing that the water cycle never stops. I would play gentle music for the rising sections and a rain-stick for precipitation to support the mood. While groups work, I would ask guiding questions, such as "How can your bodies show that the water is changing from a gas to a liquid?" Each group would perform its dance, and the audience would name the stages they recognized.

This activity supports the learning goal because it combines students' personal experiences, scientific knowledge, and dance concepts into one meaningful creative task. Remembering real experiences with water gives students personal ideas for movement, while connecting each stage to a specific element of dance deepens both their dance vocabulary and their understanding of the science. Performing the cycle physically helps kinesthetic learners remember the sequence, and the circular structure reinforces the idea of a repeating cycle.

I would assess student achievement with a checklist during the performances. The criteria would be: the dance includes all four stages in the correct order; each stage uses a clear change in level, energy, or relationship; the group performs with clear beginning and ending shapes; and each student can explain one movement and the stage it represents. Students would also draw and label one of their movements on a water-cycle diagram. I would share the results with the classroom teacher and use them to plan future interdisciplinary lessons.`,
modelZh:'① 三年级：动手体验学得最好，喜欢想象和合作；科学课正在学水循环。② 目标：创作并表演一支表现水循环四阶段（蒸发、凝结、降水、汇集）的群舞，用水平、能量、关系的变化，并能解释动作代表的阶段。③ 活动：分享看到雨、雾、蒸汽的经历并记录 → 由记忆启发的动作热身 → 水循环图，每个阶段对应舞蹈元素（蒸发 = 低到高、轻而持续；凝结 = 靠近连接；降水 = 突然的打击式向下；汇集 = 低水平聚合流动）→ 小组编 4 段舞，地上放大圆圈提醒“循环”，结尾回到开始造型；音乐和雨声棒；老师提问 → 展示，观众说出阶段。④ 解释：融合个人经验、科学知识和舞蹈概念；元素对应加深两门学科理解；动觉记忆；圆形结构强化循环。⑤ 评估：检核表 + 学生在水循环图上画并标注一个动作；和班主任分享。'},

{id:'W11',tag:'Learning difficulty',title:'Students collide during group traveling',titleZh:'学习困难：群舞移动时互相碰撞',
context:'During across-the-floor and general-space traveling activities, many students in your class move without awareness of others. They frequently bump into classmates, crowd together in one area of the room, and lose their place in group formations.',
std:null,
intro:DIFF_INTRO,tasks:DIFF_TASKS,promptZh:'【情境】在过地面和公共空间移动的活动中，班上很多学生移动时没有注意他人，常撞到同学、挤在房间的一个区域、在队形中找不到位置。<br>' + DIFF_ZH,
hint:'这是“干预学习困难”型题目（大纲说作文可能考这种）。困难 = <b>空间意识 / 动觉意识</b>不足。选二年级。干预：“个人空间泡泡”（呼啦圈）→ 用余光的“填空游戏”（Fill the Space）→ 速度和水平逐步增加 → 地面标记 + 路径图 → 小组队形游戏。评估：前后对比的观察记录（碰撞次数、空间分布）+ 学生自评。',
model:`These students are in a second-grade dance class. Seven- and eight-year-olds are energetic and love to move quickly, but their spatial awareness and peripheral vision are still developing, and they often focus only on their own movement. As a result, they crowd together, collide, and lose track of where they should be. Because collisions are unsafe and make group dancing difficult, developing spatial awareness is an important priority.

The learning goal is: Students will be able to travel through general space using at least three locomotor movements and changing pathways while maintaining their personal space bubble, avoiding contact with others, and spreading out to fill the room. This goal addresses the difficulty directly and builds the kinesthetic and spatial awareness needed for group choreography.

My intervention would begin with the concept of the personal space bubble. Each student would stand inside a hula hoop and explore reaching high, low, and to the sides without touching the edge. Then they would set the hoop aside and imagine that their bubble travels with them. I would use the image, "Your bubble is made of soap—if it touches someone, it pops!" Next, I would teach a clear freeze signal using a drum and practice it several times so students learn to stop instantly.

Then we would play "Fill the Space." Students walk slowly through the room, looking for empty spaces and moving into them. On my signal, they freeze and check: Is anyone too close? Are there empty corners? I would gradually add challenges—changing tempo from slow to medium to fast, switching locomotor movements such as skipping or galloping, and changing pathways between straight, curved, and zigzag. I would remind students to use their "side eyes," or peripheral vision, and to look up rather than down. To make the room easier to read, I would place colored floor tape in the four corners and the center and sometimes call out a color as a destination.

Finally, students would apply the skill in small groups. Each group of four would travel together in a line or a circle without touching and then spread out to new spots when the drum stops. At the end, we would talk about what helped them avoid collisions.

This intervention works because it starts with a concrete, visible boundary—the hula hoop—and then gradually moves to an imagined boundary, building awareness step by step. Slow tempos at first allow students to succeed before the challenge increases, which builds both skill and confidence. Freezing and checking the room teaches students to notice the space and other dancers, and the floor tape gives them visual landmarks. Practicing in small groups transfers the skill to the formations they will need in choreography.

To assess progress, I would use an observation checklist at the beginning of the intervention and again after two weeks. During a two-minute "Fill the Space" activity, I would count collisions and note whether students spread throughout the room, maintain personal space, and freeze on cue. Students would also rate themselves with a thumbs-up, sideways, or down. Comparing the two observations would show whether the intervention is working, and I would give extra support, such as partner guides, to students who still struggle.`,
modelZh:'① 二年级：精力旺盛、喜欢快，空间意识和余光还在发展，只关注自己 → 挤、撞、找不到位置；碰撞不安全，所以优先。② 目标：用至少 3 种移动动作和变化路径穿行公共空间，保持个人空间泡泡、不接触他人、散开占满房间。③ 干预：呼啦圈里探索个人空间 → 想象泡泡跟着走（“肥皂泡碰到就破”）→ 教清楚的鼓声 freeze 信号 → “Fill the Space”游戏：慢走找空位，freeze 检查；逐步加快速度、换移动方式、换路径；提醒用余光、抬头；四角和中心贴彩色胶带作为目的地 → 小组排成线/圈移动不接触，鼓停就散开 → 讨论什么帮助避免碰撞。④ 解释：从看得见的边界到想象的边界，循序渐进；先慢再快建立成功和自信；freeze 检查培养注意；地面标记提供视觉参照；迁移到小组队形。⑤ 评估：干预前和两周后的观察检核表（碰撞次数、分布、个人空间、定格）+ 拇指自评；对仍困难的学生安排同伴引导。'},

{id:'W12',tag:'Learning difficulty',title:'Students rush ahead of the music',titleZh:'学习困难：学生抢拍、跟不上音乐',
context:'While learning a jazz combination set to music, many students in your class rush ahead of the beat, lose the counts in the middle of the phrase, and finish before the music does. When dancing without music, they can perform the steps correctly.',
std:null,
intro:DIFF_INTRO,tasks:DIFF_TASKS,promptZh:'【情境】在学习一个配乐的爵士组合时，班上很多学生抢在拍子前面、在乐句中间数乱拍子、比音乐先结束。不配音乐时，他们能正确地完成舞步。<br>' + DIFF_ZH,
hint:'困难 = <b>音乐性 / 节奏感</b>（步子会，但和音乐脱节）。选七年级。干预：先听音乐找拍子（拍手、走拍）→ 识别 8 拍乐句和重音 → 慢速音乐 → 分段（add-on）配音乐 → 说出口令/唱出节奏 → 用拍手和鼓标重音 → 恢复原速。评估：录像对比 + 节奏检核表（落在拍上、乐句结束对齐、重音），据此分组辅导。',
model:`These students are in a seventh-grade jazz dance class. Twelve- and thirteen-year-olds can memorize steps quickly, but many have little formal musical training and are not yet listening closely to the music while they dance. Because they can perform the steps correctly without music, the difficulty is not memory or technique; it is musicality—hearing the beat and phrase structure and matching their movement to it.

The learning goal is: Students will be able to perform the 32-count jazz combination with each step landing on the correct count, accents matching the music, and the final shape arriving with the end of the musical phrase. This goal targets the specific difficulty and develops the rhythmic sense and musicality that all dance styles require.

My intervention would begin by separating listening from dancing. I would play the music and ask students to find the beat by clapping, then by walking on the beat around the room. Next, I would help them hear the structure of the music by having them raise a hand at the start of every eight-count phrase. We would also identify accents together—for example, a strong drum hit on count five—and clap only on the accents. I would explain that most popular music is in 4/4 time, so two measures equal one eight-count phrase.

Then I would reconnect the music and the movement gradually. Using software that slows down the tempo without changing the pitch, I would play the music at about seventy-five percent speed. Students would perform the first eight counts while saying the counts out loud, and I would use the add-on method to build the combination one phrase at a time. For sections where students rush, I would sing the rhythm of the steps—"and-five, six, hold, eight"—and use a drum to mark the accents. Students would also practice in pairs, with one partner dancing while the other claps the beat and gives feedback on whether the dancer stayed with the music. Finally, I would gradually return the music to full speed.

This intervention addresses the difficulty because it first develops listening skills on their own, so students can recognize the beat, phrases, and accents before trying to match them. Slowing the tempo and building the combination phrase by phrase reduces the cognitive load and lets students focus on timing rather than on remembering steps. Saying the counts aloud and singing the rhythm connect the auditory and kinesthetic channels, and partner clapping gives immediate feedback. Returning gradually to full tempo allows students to maintain their success as the challenge increases.

To assess progress, I would video-record the class performing the combination before and after the intervention. Using a timing checklist, I would note for each student whether steps land on the correct counts, accents match the music, and the final shape arrives with the music. Students would watch their own videos and mark one section where they stayed with the music and one where they rushed. I would use these results to form small groups for further practice and to choose music with a clearer beat for students who still struggle.`,
modelZh:'① 七年级爵士班：记步快，但缺乏音乐训练、跳时不听音乐；不配音乐时步子正确 → 问题不是记忆或技术，而是音乐性。② 目标：以正确拍数完成 32 拍组合，重音和音乐一致，结尾造型与乐句结束同时到达。③ 干预：先把“听”和“跳”分开——拍手找拍、走拍、每个 8 拍开头举手、只在重音拍手；讲 4/4（两小节 = 一个 8 拍）→ 逐步重新结合：用软件放慢到 75%，边跳边数拍，用叠加法一段段加；抢拍的地方唱出节奏、用鼓标重音；两人一组，一人跳一人拍拍子给反馈 → 逐步恢复原速。④ 解释：先单独发展听的能力；放慢和分段降低认知负荷；数拍和唱节奏连接听觉和动觉；同伴拍手即时反馈；逐步提速保持成功。⑤ 评估：干预前后录像 + 节奏检核表 + 学生看录像标出一段跟上的和一段抢拍的；据此分组练习、为仍困难的学生选节拍更清楚的音乐。'},
],
};
})();
