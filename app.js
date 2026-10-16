/* Dance 备考 — NYSTCE Field 164 Dance CST study app (vanilla JS, offline PWA) */
(function () {
  'use strict';

  // ---------- Data ----------
  const COMPS = [
    { id: 1, en: 'Creating', zh: '创作（编舞与制作）', mc: '22–23', pct: '20%' },
    { id: 2, en: 'Performing', zh: '表演（舞蹈元素·技术·身体）', mc: '22–23', pct: '20%' },
    { id: 3, en: 'Responding', zh: '鉴赏（分析·评价·记录）', mc: '22–23', pct: '20%' },
    { id: 4, en: 'Connecting', zh: '联结（舞蹈史·文化·跨学科）', mc: '22–23', pct: '20%' },
    { id: 5, en: 'Pedagogical Content Knowledge', zh: '教学法（作文）', mc: '作文', pct: '20%' },
  ];
  const comp = (id) => COMPS.find((c) => c.id === id);
  const MOCK_COMPS = [1, 2, 3, 4];

  const ALLQ = [].concat(window.Q || []);
  const QMAP = {};
  ALLQ.forEach((q) => { QMAP[q.id] = q; });
  const VOCAB = window.VOCAB || [];
  const WR = window.WRITING || { prompts: [] };
  const NOTES = window.NOTES || {};

  // ---------- Storage ----------
  const KEY = 'dance_prep_v1';
  const blank = () => ({ stats: {}, wrong: {}, star: {}, vocab: {}, daily: {}, drafts: {}, examDate: '', showZh: false, history: [], stageBest: 0 });
  let S;
  try { S = Object.assign(blank(), JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { S = blank(); }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* storage unavailable */ } };
  const dkey = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const today = () => dkey(new Date());

  function record(q, ok) {
    const st = S.stats[q.id] || { n: 0, ok: 0 };
    st.n++; if (ok) st.ok++; st.last = ok ? 1 : 0;
    S.stats[q.id] = st;
    if (ok) delete S.wrong[q.id]; else S.wrong[q.id] = Date.now();
    const d = today(); S.daily[d] = (S.daily[d] || 0) + 1;
    save();
  }
  function streak() {
    let n = 0; const d = new Date();
    if (!S.daily[today()]) d.setDate(d.getDate() - 1);
    while (S.daily[dkey(d)]) { n++; d.setDate(d.getDate() - 1); }
    return n;
  }
  function compStats(cid) {
    const qs = ALLQ.filter((q) => q.c === cid);
    let done = 0, n = 0, ok = 0;
    qs.forEach((q) => { const st = S.stats[q.id]; if (st) { done++; n += st.n; ok += st.ok; } });
    return { total: qs.length, done, acc: n ? Math.round((ok / n) * 100) : null };
  }

  // ---------- Helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const view = $('#view');
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const LET = 'ABCD';
  function setTitle(t, back) {
    $('#title').textContent = t;
    $('#backBtn').hidden = !back;
    $('#backBtn').onclick = () => { if (typeof back === 'function') back(); else location.hash = back; };
  }
  function setTopRight(h) { $('#topRight').innerHTML = h || ''; }
  function focusMode(on) { document.body.classList.toggle('focus', !!on); }

  // Speech: English by default; ballet terms are read with a French voice.
  const voices = { en: null, fr: null };
  function pickVoices() {
    if (!('speechSynthesis' in window)) return;
    const vs = speechSynthesis.getVoices();
    voices.en = vs.find((v) => v.lang === 'en-US' && /Samantha|Ava|Allison|Google US/.test(v.name)) || vs.find((v) => v.lang === 'en-US') || null;
    voices.fr = vs.find((v) => v.lang === 'fr-FR' && /Thomas|Amélie|Audrey|Google/.test(v.name)) || vs.find((v) => /^fr/.test(v.lang)) || null;
  }
  if ('speechSynthesis' in window) { pickVoices(); speechSynthesis.onvoiceschanged = pickVoices; }
  function speak(text, lang) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const fr = lang === 'fr';
    const u = new SpeechSynthesisUtterance(text);
    u.lang = fr ? 'fr-FR' : 'en-US'; u.rate = fr ? 0.8 : 0.88;
    const v = fr ? voices.fr : voices.en; if (v) u.voice = v;
    speechSynthesis.speak(u);
  }
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-say]');
    if (b) { e.preventDefault(); e.stopPropagation(); speak(b.getAttribute('data-say'), b.getAttribute('data-lang')); }
  });
  const sayBtn = (t, lang) => `<button class="speak" data-say="${esc(t)}"${lang ? ` data-lang="${lang}"` : ''} aria-label="朗读">🔊</button>`;

  function openSheet(title, html) {
    $('#sheetTitle').textContent = title;
    $('#sheetBody').innerHTML = html;
    $('#sheetBody').scrollTop = 0;
    $('#sheet').hidden = false;
  }
  function closeSheet() { $('#sheet').hidden = true; }
  $('#sheetClose').onclick = closeSheet;
  $('#sheet').addEventListener('click', (e) => { if (e.target.id === 'sheet') closeSheet(); });

  // ---------- Timer ----------
  let timerId = null;
  function stopTimer() { if (timerId) clearInterval(timerId); timerId = null; setTopRight(''); }
  const fmt = (s) => { s = Math.max(0, Math.round(s)); const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60); return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s % 60).padStart(2, '0'); };

  // ---------- Router ----------
  const routes = {};
  function render() {
    stopTimer();
    closeSheet();
    focusMode(false);
    if ('speechSynthesis' in window) speechSynthesis.cancel();
    const h = location.hash.slice(1) || 'home';
    const [name, ...args] = h.split('/');
    document.querySelectorAll('#tabbar a').forEach((a) => a.classList.toggle('active', a.dataset.tab === tabOf(name)));
    (routes[name] || routes.home)(...args);
    window.scrollTo(0, 0);
  }
  const tabOf = (n) => ({ home: 'home', learn: 'learn', practice: 'practice', quiz: 'practice', result: 'practice', stage: 'practice', vocab: 'vocab', write: 'write' }[n] || 'home');
  window.addEventListener('hashchange', render);

  // ---------- Home ----------
  routes.home = function () {
    setTitle('Dance 备考');
    const answered = Object.keys(S.stats).length;
    let n = 0, ok = 0; Object.values(S.stats).forEach((s) => { n += s.n; ok += s.ok; });
    const acc = n ? Math.round((ok / n) * 100) : 0;
    const wrongN = Object.keys(S.wrong).length;
    let cd = '';
    if (S.examDate) {
      const diff = Math.ceil((new Date(S.examDate + 'T00:00:00') - new Date(today() + 'T00:00:00')) / 86400000);
      cd = diff >= 0 ? `<div class="stat">${diff}<span class="sub"> 天</span></div><div class="sub">距离考试 ${esc(S.examDate)}</div>` : `<div class="sub">考试日期已过：${esc(S.examDate)}</div>`;
    } else cd = `<div class="sub">设置考试日期，开启倒计时 ⏳</div>`;
    view.innerHTML = `
      <div class="card">
        <div class="row"><div class="grow">${cd}</div>
        <input type="date" id="examDate" value="${esc(S.examDate)}" aria-label="考试日期"></div>
      </div>
      <div class="grid2">
        <div class="card"><div class="sub">今日已做</div><div class="stat">${S.daily[today()] || 0}</div><div class="sub small">连续打卡 ${streak()} 天 🔥</div></div>
        <div class="card"><div class="sub">总正确率</div><div class="stat">${acc}%</div><div class="sub small">已练 ${answered}/${ALLQ.length} 题</div></div>
      </div>
      <a class="btn block" href="#practice/daily" style="margin-top:12px">⚡ 每日一练（20 题）</a>
      <div class="btns">
        <a class="btn ghost" href="#practice/wrong">❌ 错题本 ${wrongN ? '(' + wrongN + ')' : ''}</a>
        <a class="btn ghost" href="#practice/mock">⏱ 模拟考试</a>
      </div>
      <a class="card tap" href="#learn/strategy">
        <div class="row"><span class="big-emoji">🎯</span><div class="grow"><b>先看这个：Dance CST 答题秘诀</b><div class="sub small">出题人的价值观 + 常见陷阱 + 高频考点清单</div></div><span class="sub">›</span></div>
      </a>
      <a class="card tap" href="#learn/exam">
        <div class="row"><span class="big-emoji">🗺</span><div class="grow"><b>考试结构 & 备考计划</b><div class="sub small">90 道选择 + 1 篇长作文，195 分钟，520 分及格</div></div><span class="sub">›</span></div>
      </a>
      <h3>各部分掌握情况</h3>
      <div class="card">
        ${COMPS.map((c) => { const cs = compStats(c.id); const pct = cs.total ? Math.round((cs.done / cs.total) * 100) : 0; return `
          <a href="#practice/c/${c.id}" style="display:block;color:inherit;text-decoration:none;margin:10px 0">
            <div class="row"><span class="pill c${c.id}">${c.id}</span><span class="grow">${c.zh}</span><span class="sub small">${cs.acc == null ? '未练习' : '正确率 ' + cs.acc + '%'}</span></div>
            <div class="bar" style="margin-top:6px"><i style="width:${pct}%;background:var(--c${c.id})"></i></div>
          </a>`; }).join('')}
      </div>
      <details class="card"><summary>⚙️ 设置 / 添加到主屏幕</summary>
        <p class="small">在 iPhone Safari 中打开本页 → 点底部“分享”按钮 → 选“添加到主屏幕”，就能像 App 一样全屏使用，离线也能用。</p>
        <label class="row" style="margin:10px 0"><input type="checkbox" id="zhDef" ${S.showZh ? 'checked' : ''}> <span>题目默认显示中文翻译</span></label>
        <button class="btn sm plain" id="resetBtn">清空所有做题记录</button>
      </details>`;
    $('#examDate').onchange = (e) => { S.examDate = e.target.value; save(); render(); };
    $('#zhDef').onchange = (e) => { S.showZh = e.target.checked; save(); };
    $('#resetBtn').onclick = () => { if (confirm('确定清空所有记录？此操作无法恢复。')) { const d = S.examDate; S = blank(); S.examDate = d; save(); render(); } };
  };

  // ---------- Learn ----------
  routes.learn = function (sub, id) {
    if (sub === 'c') return learnComp(+id);
    if (sub === 'strategy') return learnPage('strategy', '🎯 答题秘诀');
    if (sub === 'exam') return learnPage('exam', '🗺 考试结构 & 计划');
    if (sub === 'sheets') return learnPage('sheets', '📋 速查表');
    setTitle('知识点');
    view.innerHTML = `
      <p class="sub">按官方考试大纲（Framework）的 5 个部分整理，中文讲解 + 英文关键词。⭐ 是高频考点。</p>
      <a class="card tap" href="#learn/strategy"><div class="row"><span class="big-emoji">🎯</span><div class="grow"><b>答题秘诀（必看）</b><div class="sub small">How to pick the BEST answer</div></div><span class="sub">›</span></div></a>
      <a class="card tap" href="#learn/exam"><div class="row"><span class="big-emoji">🗺</span><div class="grow"><b>考试结构 & 备考计划</b><div class="sub small">Test design & study plan</div></div><span class="sub">›</span></div></a>
      <a class="card tap" href="#learn/sheets"><div class="row"><span class="big-emoji">📋</span><div class="grow"><b>考前速查表</b><div class="sub small">Laban 八大动作 · 舞台方位 · 编舞手法 · 舞蹈史时间线</div></div><span class="sub">›</span></div></a>
      ${COMPS.map((c) => `
        <a class="card tap" href="#learn/c/${c.id}">
          <div class="row"><span class="pill c${c.id}">${c.id}</span><div class="grow"><b>${c.zh}</b><div class="sub small">${c.en} · ${c.id === 5 ? '1 篇长作文 (20%)' : '约 ' + c.mc + ' 道选择 (' + c.pct + ')'}</div></div><span class="sub">›</span></div>
        </a>`).join('')}`;
  };
  function learnPage(key, title) {
    setTitle(title, '#learn');
    const n = NOTES[key];
    view.innerHTML = `<div class="note">${n ? n.html : '<p class="empty">内容加载失败</p>'}</div>`;
  }
  function learnComp(id) {
    const c = comp(id); const n = NOTES['c' + id];
    if (!c) { location.hash = '#learn'; return; }
    setTitle(c.zh, '#learn');
    view.innerHTML = `
      <div class="card"><span class="pill c${id}">Competency 000${id}</span>
        <h2 style="margin:8px 0 2px">${c.en}</h2><div class="sub">${c.zh} · ${id === 5 ? '1 篇长作文，占 20%' : '约 ' + c.mc + ' 道选择 (' + c.pct + ')'}</div></div>
      <div class="note">${n ? n.sections.map((s, i) => `<details class="card" ${i === 0 ? 'open' : ''}><summary>${s.t}</summary>${s.h}</details>`).join('') : ''}</div>
      <a class="btn block" href="#practice/c/${id}">✏️ 练习这一部分的题目</a>
      ${id === 5 ? '<a class="btn block plain" href="#write" style="margin-top:10px">📝 去练长作文</a>' : ''}`;
  }

  // ---------- Practice menu ----------
  routes.practice = function (sub, arg) {
    if (sub === 'c') { const c = comp(+arg); if (!c) { location.hash = '#practice'; return; } return startQuiz(ALLQ.filter((q) => q.c === +arg), { title: c.zh, order: 'smart' }); }
    if (sub === 'daily') return startQuiz(dailyPick(20), { title: '每日一练', order: 'keep' });
    if (sub === 'wrong') {
      const ids = Object.keys(S.wrong).filter((k) => QMAP[k]);
      if (!ids.length) { setTitle('错题本', '#practice'); view.innerHTML = `<div class="empty"><div class="big-emoji">🎉</div><p>错题本是空的！<br>做错的题会自动收集到这里，答对一次就会移出。</p><a class="btn" href="#practice">去刷题</a></div>`; return; }
      return startQuiz(ids.map((k) => QMAP[k]), { title: '错题本', order: 'shuffle' });
    }
    if (sub === 'star') {
      const ids = Object.keys(S.star).filter((k) => QMAP[k]);
      if (!ids.length) { setTitle('收藏', '#practice'); view.innerHTML = `<div class="empty"><div class="big-emoji">⭐</div><p>还没有收藏题目。做题时点右上角 ☆ 即可收藏。</p></div>`; return; }
      return startQuiz(ids.map((k) => QMAP[k]), { title: '收藏的题', order: 'keep' });
    }
    if (sub === 'random') return startQuiz(shuffle(ALLQ).slice(0, 20), { title: '随机 20 题', order: 'keep' });
    if (sub === 'mock') return mockMenu();
    setTitle('刷题');
    const wrongN = Object.keys(S.wrong).length, starN = Object.keys(S.star).length;
    view.innerHTML = `
      <div class="grid2">
        <a class="card tap" href="#practice/daily"><div class="big-emoji">⚡</div><b>每日一练</b><div class="sub small">20 题，优先错题和新题</div></a>
        <a class="card tap" href="#practice/mock"><div class="big-emoji">⏱</div><b>模拟考试</b><div class="sub small">计时，交卷后看解析</div></a>
        <a class="card tap" href="#practice/wrong"><div class="big-emoji">❌</div><b>错题本</b><div class="sub small">${wrongN} 题</div></a>
        <a class="card tap" href="#practice/star"><div class="big-emoji">⭐</div><b>收藏</b><div class="sub small">${starN} 题</div></a>
      </div>
      <h3>按考试部分练习</h3>
      ${COMPS.map((c) => { const cs = compStats(c.id); return `
        <a class="card tap" href="#practice/c/${c.id}">
          <div class="row"><span class="pill c${c.id}">${c.id}</span><div class="grow"><b>${c.zh}</b><div class="sub small">${c.en}${c.id === 5 ? ' · 帮你准备作文的教学法小题' : ''}</div></div>
          <div class="sub small" style="text-align:right">${cs.done}/${cs.total}<br>${cs.acc == null ? '' : cs.acc + '%'}</div></div>
        </a>`; }).join('')}
      <h3>专项小练习</h3>
      <a class="card tap" href="#stage"><div class="row"><span class="big-emoji">🎭</span><div class="grow"><b>舞台方位练习</b><div class="sub small">Upstage / Downstage / Stage Left / Stage Right 一次分清${S.stageBest ? ' · 最好成绩 ' + S.stageBest + '/10' : ''}</div></div><span class="sub">›</span></div></a>
      <a class="btn block plain" href="#practice/random" style="margin-top:8px">🎲 随机 20 题</a>`;
  };

  function dailyPick(n) {
    const wrong = shuffle(Object.keys(S.wrong).filter((k) => QMAP[k]).map((k) => QMAP[k]));
    const fresh = shuffle(ALLQ.filter((q) => !S.stats[q.id]));
    const weak = shuffle(ALLQ.filter((q) => S.stats[q.id] && !S.wrong[q.id] && S.stats[q.id].ok / S.stats[q.id].n < 1));
    const rest = shuffle(ALLQ);
    const out = []; const seen = new Set();
    const take = (arr, k) => { for (const q of arr) { if (out.length >= n || k <= 0) break; if (!seen.has(q.id)) { seen.add(q.id); out.push(q); k--; } } };
    take(wrong, 6); take(fresh, n); take(weak, n); take(rest, n);
    return shuffle(out);
  }

  function mockMenu() {
    setTitle('模拟考试', '#practice');
    const hist = (S.history || []).slice(-5).reverse();
    view.innerHTML = `
      <div class="card"><b>📋 真实考试</b><p class="small">90 道选择题（占 80%）+ 1 篇 400–600 词的教学设计作文（占 20%），总共 195 分钟。官方建议：选择题约 135 分钟（平均 1.5 分钟/题），作文约 60 分钟。</p></div>
      <a class="card tap" id="full"><div class="row"><span class="big-emoji">🏁</span><div class="grow"><b>完整模考：90 题 / 135 分钟</b><div class="sub small">按真题比例：创作 22 + 表演 23 + 鉴赏 22 + 联结 23</div></div></div></a>
      <a class="card tap" id="mini"><div class="row"><span class="big-emoji">⏲</span><div class="grow"><b>迷你模考：30 题 / 45 分钟</b><div class="sub small">时间不够时用这个</div></div></div></a>
      <a class="card tap" href="#write"><div class="row"><span class="big-emoji">📝</span><div class="grow"><b>作文模考：60 分钟</b><div class="sub small">去“写作”页选一个题目，点“开始 60 分钟计时”</div></div><span class="sub">›</span></div></a>
      <p class="sub small">模考中不显示对错，交卷后统一看解析。时间到会自动交卷。模考里仍然可以点“中”看翻译——考前一周建议尽量不看。</p>
      ${hist.length ? `<h3>最近成绩</h3><div class="card">${hist.map((h) => `<div class="row" style="padding:4px 0"><span class="grow small">${esc(h.d)} · ${esc(h.t)}</span><b>${h.s}/${h.n}</b><span class="sub small">${Math.round((h.s / h.n) * 100)}%</span></div>`).join('')}</div>` : ''}`;
    const build = (counts) => {
      let out = [];
      MOCK_COMPS.forEach((cid, i) => { out = out.concat(shuffle(ALLQ.filter((q) => q.c === cid)).slice(0, counts[i])); });
      return shuffle(out);
    };
    $('#full').onclick = () => startQuiz(build([22, 23, 22, 23]), { title: '完整模考', mode: 'exam', limit: 135 * 60, order: 'keep', back: '#practice/mock' });
    $('#mini').onclick = () => startQuiz(build([8, 7, 7, 8]), { title: '迷你模考', mode: 'exam', limit: 45 * 60, order: 'keep', back: '#practice/mock' });
  }

  // ---------- Quiz engine ----------
  let Z = null; // current session
  function startQuiz(qs, opt) {
    if (!qs.length) { setTitle(opt.title, '#practice'); view.innerHTML = '<p class="empty">暂无题目</p>'; return; }
    let list = qs.slice();
    if (opt.order === 'shuffle') list = shuffle(list);
    if (opt.order === 'smart') {
      // unseen first, then wrong, then the rest — each group shuffled
      const un = shuffle(list.filter((q) => !S.stats[q.id]));
      const wr = shuffle(list.filter((q) => S.stats[q.id] && S.wrong[q.id]));
      const ot = shuffle(list.filter((q) => S.stats[q.id] && !S.wrong[q.id]));
      list = un.concat(wr, ot);
    }
    Z = {
      title: opt.title, mode: opt.mode || 'practice', back: opt.back || '#practice',
      items: list.map((q) => ({ q, ord: shuffle([0, 1, 2, 3]) })),
      i: 0, ans: {}, done: {}, zh: {}, start: Date.now(), limit: opt.limit || 0, submitted: false,
    };
    if (location.hash !== '#quiz') location.hash = '#quiz'; else render();
  }
  routes.quiz = function () {
    if (!Z) { location.hash = '#practice'; return; }
    if (Z.submitted && Z.mode === 'exam' && !Z.review) { location.hash = '#result'; return; }
    drawQuestion();
  };

  function drawQuestion() {
    const it = Z.items[Z.i]; const q = it.q;
    focusMode(true);
    setTitle(`${Z.title}  ${Z.i + 1}/${Z.items.length}`, () => {
      if (Z.mode === 'exam' && !Z.submitted) { if (!confirm('退出模考？本次进度不会保存。')) return; }
      location.hash = Z.back;
    });
    if (Z.mode === 'exam' && !Z.submitted && Z.limit) {
      const tick = () => {
        const left = Z.limit - (Date.now() - Z.start) / 1000;
        setTopRight('⏱ ' + fmt(left));
        if (left <= 0) { stopTimer(); alert('时间到，自动交卷'); submitExam(); }
      };
      tick(); timerId = setInterval(tick, 1000);
    }
    const reveal = Z.mode === 'practice' ? Z.done[Z.i] : Z.submitted;
    const chosen = Z.ans[Z.i];
    const zh = Z.zh[Z.i] != null ? Z.zh[Z.i] : S.showZh;
    const c = comp(q.c);
    const starred = !!S.star[q.id];

    const optsHTML = it.ord.map((oi, pos) => {
      let cls = 'opt';
      if (reveal) { if (oi === q.a) cls += ' right'; else if (chosen === oi) cls += ' wrong'; }
      else if (chosen === oi) cls += ' sel';
      return `<li class="${cls}" data-oi="${oi}"><span class="L">${LET[pos]}</span><div class="t">${esc(q.o[oi])}${zh && q.oz ? `<div class="zh">${esc(q.oz[oi])}</div>` : ''}</div></li>`;
    }).join('');

    let fb = '';
    if (reveal) {
      const ok = chosen === q.a;
      const letter = LET[it.ord.indexOf(q.a)];
      fb = `<div class="card explain ${ok ? '' : 'bad'}">
        <b style="color:var(${ok ? '--ok' : '--bad'})">${chosen == null ? '未作答' : ok ? '✅ 回答正确' : '❌ 回答错误'}</b>　正确答案：<b>${letter}</b>
        <p>${q.e}</p>
        ${q.k ? `<div class="tip"><b>💡 记住：</b>${q.k}</div>` : ''}
        ${q.v && q.v.length ? `<ul class="vlist">${q.v.map((v) => `<li>${sayBtn(v[0], v[2])}<b>${esc(v[0])}</b><span class="sub">${esc(v[1])}</span></li>`).join('')}</ul>` : ''}
      </div>`;
    }

    view.innerHTML = `
      <div class="qmeta">
        <span class="pill c${q.c}">${c.id} ${c.en}</span>
        <span class="grow"></span>
        <button class="toggle ${zh ? 'on' : ''}" id="zhT">中</button>
        ${sayBtn(q.q)}
        <button class="speak" id="starB" aria-label="收藏">${starred ? '⭐' : '☆'}</button>
      </div>
      <div class="card">
        ${q.fig ? `<div class="fig">${q.fig}</div>` : ''}
        <div class="qtext">${esc(q.q)}</div>
        ${zh && q.qz ? `<div class="zh">${esc(q.qz)}</div>` : ''}
        <ul class="opts">${optsHTML}</ul>
      </div>
      ${fb}
      ${Z.mode === 'exam' ? `<div class="dots" id="dots">${Z.items.map((x, k) => {
        let cl = '';
        if (Z.submitted) cl = Z.ans[k] === x.q.a ? 'ok' : 'no'; else if (Z.ans[k] != null) cl = 'done';
        return `<button class="${cl} ${k === Z.i ? 'cur' : ''}" data-k="${k}">${k + 1}</button>`; }).join('')}</div>` : ''}
      <div class="quizbar">
        <button class="btn plain" id="prevB" ${Z.i === 0 ? 'disabled' : ''}>上一题</button>
        ${Z.mode === 'exam' && !Z.submitted ? `<button class="btn ghost" id="subB">交卷</button>` : ''}
        ${Z.i < Z.items.length - 1 ? `<button class="btn" id="nextB">下一题</button>` : (Z.mode === 'exam' ? (Z.submitted ? `<button class="btn" id="resB">成绩单</button>` : '') : `<button class="btn" id="finB">完成</button>`)}
      </div>`;

    view.querySelectorAll('.opt').forEach((li) => li.onclick = () => {
      const oi = +li.dataset.oi;
      if (Z.mode === 'practice') {
        if (Z.done[Z.i]) return;
        Z.ans[Z.i] = oi; Z.done[Z.i] = true; record(q, oi === q.a);
        drawQuestion();
        const ex = view.querySelector('.explain'); if (ex) setTimeout(() => ex.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 50);
      } else if (!Z.submitted) { Z.ans[Z.i] = oi; drawQuestion(); }
    });
    $('#zhT').onclick = () => { Z.zh[Z.i] = !zh; S.showZh = !zh; save(); drawQuestion(); };
    $('#starB').onclick = () => { if (S.star[q.id]) delete S.star[q.id]; else S.star[q.id] = 1; save(); drawQuestion(); };
    const go = (k) => { stopTimer(); Z.i = k; drawQuestion(); window.scrollTo(0, 0); };
    $('#prevB').onclick = () => go(Z.i - 1);
    if ($('#nextB')) $('#nextB').onclick = () => go(Z.i + 1);
    if ($('#subB')) $('#subB').onclick = () => {
      const left = Z.items.length - Object.keys(Z.ans).length;
      if (confirm(left ? `还有 ${left} 题没做，确定交卷？` : '确定交卷？')) submitExam();
    };
    if ($('#resB')) $('#resB').onclick = () => { Z.review = false; location.hash = '#result'; };
    if ($('#finB')) $('#finB').onclick = () => { location.hash = '#result'; };
    if ($('#dots')) $('#dots').onclick = (e) => { const b = e.target.closest('button'); if (b) go(+b.dataset.k); };
  }

  function submitExam() {
    stopTimer();
    Z.submitted = true; Z.review = false;
    Z.items.forEach((it, k) => { if (Z.ans[k] != null) record(it.q, Z.ans[k] === it.q.a); });
    const s = Z.items.filter((it, k) => Z.ans[k] === it.q.a).length;
    S.history = (S.history || []).concat([{ d: today(), t: Z.title, s, n: Z.items.length, sec: Math.round((Date.now() - Z.start) / 1000) }]).slice(-30);
    save();
    if (location.hash !== '#result') location.hash = '#result'; else render();
  }

  routes.result = function () {
    if (!Z) { location.hash = '#practice'; return; }
    setTitle(Z.title + ' · 结果', Z.back);
    const answered = Z.items.filter((it, k) => Z.ans[k] != null);
    const right = Z.items.filter((it, k) => Z.ans[k] === it.q.a).length;
    const n = Z.mode === 'exam' ? Z.items.length : answered.length;
    const pct = n ? Math.round((right / n) * 100) : 0;
    const per = COMPS.map((c) => {
      const its = Z.items.map((it, k) => ({ it, k })).filter((x) => x.it.q.c === c.id && (Z.mode === 'exam' || Z.ans[x.k] != null));
      return { c, n: its.length, r: its.filter((x) => Z.ans[x.k] === x.it.q.a).length };
    }).filter((x) => x.n);
    const mins = Math.round((Date.now() - Z.start) / 60000);
    const msg = pct >= 80 ? '太棒了！保持这个状态 💪' : pct >= 70 ? '不错！把错题再过一遍 👍' : '别灰心，先看知识点再刷错题 🌱';
    view.innerHTML = `
      <div class="card" style="text-align:center">
        <div class="result-ring" style="color:var(${pct >= 70 ? '--ok' : '--bad'})">${pct}%</div>
        <div>答对 <b>${right}</b> / ${n} 题 · 用时 ${mins} 分钟</div>
        <p class="sub">${msg}</p>
        ${Z.mode === 'exam' ? '<p class="sub small">真实考试总分 400–600，520 分及格。选择题占 80%，大约答对 70% 以上、作文拿 3 分（满分 4）比较稳。</p>' : ''}
      </div>
      <div class="card">${per.map((x) => `<div class="row" style="margin:8px 0"><span class="pill c${x.c.id}">${x.c.id}</span><span class="grow small">${x.c.zh}</span><b>${x.r}/${x.n}</b></div>`).join('')}</div>
      <div class="btns">
        ${Z.mode === 'exam' ? '<button class="btn" id="revAll">查看全部解析</button>' : ''}
        <a class="btn ghost" href="#practice/wrong">去错题本</a>
      </div>
      <a class="btn block plain" href="${Z.back}">返回</a>`;
    if ($('#revAll')) $('#revAll').onclick = () => { Z.review = true; Z.i = 0; location.hash = '#quiz'; };
  };

  // ---------- Stage directions drill ----------
  // Grid as seen from the audience (audience at the bottom). Stage right is the
  // performer's right when facing the audience, so it appears on the viewer's left.
  const STAGE = [
    ['USR', 'Upstage Right', '舞台右后区'], ['USC', 'Upstage Center', '舞台后区中央'], ['USL', 'Upstage Left', '舞台左后区'],
    ['SR', 'Center Stage Right', '舞台右（中区）'], ['C', 'Center Stage', '舞台中心'], ['SL', 'Center Stage Left', '舞台左（中区）'],
    ['DSR', 'Downstage Right', '舞台右前区'], ['DSC', 'Downstage Center', '舞台前区中央'], ['DSL', 'Downstage Left', '舞台左前区'],
  ];
  routes.stage = function () {
    setTitle('舞台方位练习', '#practice');
    focusMode(true);
    const order = shuffle(STAGE.map((_, i) => i)).concat(shuffle(STAGE.map((_, i) => i))).slice(0, 10);
    let r = 0, score = 0, picked = null;
    const draw = () => {
      if (r >= order.length) {
        if (score > (S.stageBest || 0)) { S.stageBest = score; save(); }
        view.innerHTML = `<div class="empty"><div class="big-emoji">${score >= 9 ? '🏆' : score >= 7 ? '👏' : '💪'}</div><p>本轮得分 <b>${score}/10</b></p>
          <div class="card" style="text-align:left"><b>口诀</b><p class="small">站在舞台上、<b>面向观众</b>：你的右手边 = Stage Right，左手边 = Stage Left。离观众近 = Downstage（舞台前区），离观众远 = Upstage（舞台后区）。<br>坐在观众席看，方向是<b>反的</b>：观众看到的左边是 Stage Right。<br>“Upstage”这个词来自过去的<b>倾斜舞台</b>（raked stage）——后面比前面高。</p></div>
          <div class="btns"><button class="btn" id="again">再来一轮</button><a class="btn plain" href="#practice">返回</a></div></div>`;
        focusMode(false);
        $('#again').onclick = () => render();
        return;
      }
      const target = order[r];
      const done = picked != null;
      view.innerHTML = `
        <div class="sub small" style="text-align:center">${r + 1} / 10 · 得分 ${score}</div>
        <div class="card" style="text-align:center"><div class="sub small">请点出这个位置（你坐在观众席看舞台）</div>
          <div class="stat" style="font-size:22px">${STAGE[target][1]} <span class="sub">(${STAGE[target][0]})</span></div>
          ${S.showZh ? `<div class="zh">${STAGE[target][2]}</div>` : ''}</div>
        <div class="stage-wrap">
          <div class="stage-lbl">⬆ 舞台后区 Upstage（离观众远）</div>
          <div class="stage">${STAGE.map((s, i) => {
            let cls = '';
            if (done) { if (i === target) cls = 'right'; else if (i === picked) cls = 'wrong'; }
            return `<button class="${cls}" data-i="${i}">${done ? s[0] : ''}</button>`; }).join('')}</div>
          <div class="stage-lbl">⬇ 舞台前区 Downstage（离观众近）</div>
          <div class="audience">👀 观众席 AUDIENCE 👀</div>
        </div>
        ${done ? `<div class="card explain ${picked === target ? '' : 'bad'}"><b>${picked === target ? '✅ 正确' : '❌ 不对'}</b>
          <p class="small">${STAGE[target][1]} 在观众看来位于<b>${['左', '中', '右'][target % 3]}</b>侧、<b>${['后', '中', '前'][Math.floor(target / 3)]}</b>区。记住：Stage Right/Left 是按<b>演员面向观众</b>时的左右来定的，所以和观众看到的左右相反。</p></div>` : ''}
        <div class="quizbar">${done ? `<button class="btn" id="nx">${r === order.length - 1 ? '看成绩' : '下一题'}</button>` : `<button class="btn plain" disabled>点击上面舞台的一个区域</button>`}</div>`;
      view.querySelectorAll('.stage button').forEach((b) => b.onclick = () => {
        if (picked != null) return;
        picked = +b.dataset.i; if (picked === target) score++;
        draw();
      });
      if ($('#nx')) $('#nx').onclick = () => { r++; picked = null; draw(); };
    };
    draw();
  };

  // ---------- Vocab ----------
  const vlevel = (t) => (S.vocab[t] || 0);
  const vlang = (v) => (v.fr ? 'fr' : '');
  const vsay = (v) => (v.fr ? v.t : v.f || v.t);
  routes.vocab = function (sub) {
    if (sub === 'cards') return vocabCards();
    if (sub === 'list') return vocabList();
    setTitle('术语');
    const tot = VOCAB.length;
    const known = VOCAB.filter((v) => vlevel(v.t) >= 2).length;
    view.innerHTML = `
      <p class="sub">考试里反复出现的专业术语：编舞手法、Laban、芭蕾法语、解剖、舞蹈史人物。认识这些词，题目就能看懂一大半。芭蕾术语用法语发音朗读。</p>
      <div class="card"><div class="row"><div class="grow"><div class="sub">已掌握</div><div class="stat">${known}<span class="sub"> / ${tot}</span></div></div><span class="big-emoji">🧠</span></div>
      <div class="bar" style="margin-top:8px"><i style="width:${tot ? (known / tot) * 100 : 0}%"></i></div></div>
      <h3>选择卡组</h3>
      <div class="chips" id="deck">
        <button class="chip on" data-d="due">没掌握的</button>
        <button class="chip" data-d="all">全部</button>
        <button class="chip" data-d="fr">🩰 芭蕾法语</button>
        ${COMPS.map((c) => `<button class="chip" data-d="${c.id}">${c.id} ${c.en}</button>`).join('')}
        <button class="chip" data-d="g">考试用语</button>
      </div>
      <button class="btn block" id="goCards">🃏 开始背术语</button>
      <a class="btn block plain" href="#vocab/list" style="margin-top:10px">📚 术语表 / 查词</a>`;
    let deck = 'due';
    $('#deck').onclick = (e) => { const b = e.target.closest('.chip'); if (!b) return; deck = b.dataset.d; view.querySelectorAll('#deck .chip').forEach((x) => x.classList.toggle('on', x === b)); };
    $('#goCards').onclick = () => { VC = { deck }; location.hash = '#vocab/cards'; };
  };
  let VC = { deck: 'due' };
  function vocabCards() {
    setTitle('背术语', '#vocab');
    focusMode(true);
    const d = VC.deck;
    let pool = VOCAB.filter((v) => (d === 'all' || d === 'due') ? true : d === 'g' ? v.c === 0 : d === 'fr' ? v.fr : v.c === +d);
    if (d === 'due') pool = pool.filter((v) => vlevel(v.t) < 2);
    pool = shuffle(pool).sort((a, b) => vlevel(a.t) - vlevel(b.t)).slice(0, 25);
    if (!pool.length) { view.innerHTML = `<div class="empty"><div class="big-emoji">🎉</div><p>这组术语都掌握了！</p><a class="btn" href="#vocab">返回</a></div>`; return; }
    let i = 0, flipped = false, good = 0;
    const draw = () => {
      if (i >= pool.length) {
        view.innerHTML = `<div class="empty"><div class="big-emoji">✅</div><p>本组完成：${pool.length} 个词，${good} 个“认识”。</p><a class="btn" href="#vocab">返回</a></div>`;
        focusMode(false); return;
      }
      const v = pool[i];
      view.innerHTML = `
        <div class="sub small" style="text-align:center">${i + 1} / ${pool.length} · 点卡片翻面</div>
        <div class="card flash" id="fc">
          <div class="term">${esc(v.t)}${v.fr ? '<span class="lang-fr">FR</span>' : ''}</div>
          ${v.f ? `<div class="full">${esc(v.f)}</div>` : ''}
          <div style="margin-top:8px">${sayBtn(vsay(v), vlang(v))}</div>
          ${flipped ? `<div class="cn">${esc(v.z)}</div><div class="def">${v.d}</div>` : ''}
        </div>
        <div class="quizbar">
          ${flipped ? `<button class="btn plain" data-r="0">😵 不认识</button><button class="btn ghost" data-r="1">🤔 模糊</button><button class="btn" data-r="2">😎 认识</button>`
            : `<button class="btn" id="flipB">翻面看意思</button>`}
        </div>`;
      $('#fc').onclick = (e) => { if (e.target.closest('[data-say]')) return; flipped = !flipped; draw(); };
      if ($('#flipB')) $('#flipB').onclick = () => { flipped = true; draw(); };
      view.querySelectorAll('[data-r]').forEach((b) => b.onclick = () => {
        const r = +b.dataset.r; const cur = vlevel(v.t);
        S.vocab[v.t] = r === 0 ? 0 : r === 1 ? Math.max(1, cur) : Math.min(3, cur + 2);
        if (r === 2) good++;
        if (r === 0) pool.push(v);
        save(); i++; flipped = false; draw();
      });
      if (!flipped) speak(vsay(v), vlang(v));
    };
    draw();
  }
  function vocabList() {
    setTitle('术语表', '#vocab');
    view.innerHTML = `<input class="search" id="vs" placeholder="搜索英文、法文或中文…" autocomplete="off"><div id="vl"></div>`;
    const draw = (kw) => {
      kw = (kw || '').trim().toLowerCase();
      const list = VOCAB.filter((v) => !kw || (v.t + ' ' + (v.f || '') + ' ' + v.z + ' ' + v.d).toLowerCase().includes(kw));
      $('#vl').innerHTML = list.map((v) => `
        <div class="card"><div class="row"><div class="grow"><b>${esc(v.t)}</b>${v.fr ? '<span class="lang-fr">FR</span>' : ''}${v.f ? ` <span class="sub small">${esc(v.f)}</span>` : ''}</div>${sayBtn(vsay(v), vlang(v))}
        <span class="small">${['⚪', '🟡', '🟢', '🟢'][vlevel(v.t)]}</span></div>
        <div style="color:var(--zh);font-weight:600">${esc(v.z)}</div><div class="small">${v.d}</div></div>`).join('') || '<p class="empty">没有找到</p>';
    };
    draw();
    $('#vs').oninput = (e) => draw(e.target.value);
  }

  // ---------- Writing ----------
  const CHECK = [
    '写明了年级/发展水平（例如 Grade 3、9th grade beginning dance class），并说明为什么适合这个年龄',
    '学习目标具体、可观察、可测量（Students will be able to…），并且明确联系到给定的标准',
    '描述了“一个”详细的教学活动：步骤、分组、时间、资源（音乐、视频、图片、道具）',
    '解释了活动“为什么”能帮助达成目标——联系舞蹈概念和学生的发展特点',
    '写了一个具体的评估方法（checklist / rubric / 观察 / 自评），说明看什么标准、结果怎样用于下一步教学',
    '400–600 词，用了准确的舞蹈术语（elements of dance, pathways, canon, Laban…）',
  ];
  routes.write = function (sub, id) {
    if (sub === 'guide') { setTitle('作文模板', '#write'); view.innerHTML = `<div class="note">${WR.guide || ''}</div>`; return; }
    if (sub === 'p') return writePrompt(id);
    setTitle('写作');
    view.innerHTML = `
      <div class="card"><b>📝 作文怎么考？</b><p class="small">考试只有 <b>1 篇</b>长作文（Competency 0005 教学法），约 <b>400–600 词</b>，建议 <b>60 分钟</b>，占总分 <b>20%</b>，按 4 分制评分。题目给你一条纽约州舞蹈学习标准，你要设计一节课：<b>① 选年级 → ② 写学习目标 → ③ 详细描述一个教学活动 → ④ 解释为什么有效 → ⑤ 说明怎么评估</b>。也可能考“学生遇到某种学习困难，你如何干预”。</p></div>
      <a class="card tap" href="#write/guide"><div class="row"><span class="big-emoji">🧩</span><div class="grow"><b>万能模板 + 句型（必背）</b><div class="sub small">五段式结构、可以直接套用的句子、活动和评估清单</div></div><span class="sub">›</span></div></a>
      <h3>练习题目</h3>
      ${(WR.prompts || []).map((p) => `<a class="card tap" href="#write/p/${p.id}"><div class="row"><span class="pill c5">${esc(p.tag)}</span><div class="grow"><b>${esc(p.titleZh)}</b><div class="sub small">${esc(p.title)}${S.drafts[p.id] ? ' · 已保存草稿' : ''}</div></div><span class="sub">›</span></div></a>`).join('')}`;
  };
  function wc(t) { return (t.trim().match(/[A-Za-z0-9'’-]+/g) || []).length; }
  function stdBox(s) {
    if (!s) return '';
    return `<div class="card std"><div class="lbl">New York State P–12 Dance Learning Standard</div>
      <p class="small" style="margin:6px 0 0"><b>Artistic Process:</b> ${esc(s.proc)}<br><b>Anchor Standard ${esc(s.n)}:</b> ${esc(s.anchor)}<br><b>Enduring Understanding:</b> ${esc(s.eu)}<br><b>Essential Question:</b> ${esc(s.eq)}</p></div>`;
  }
  function writePrompt(id) {
    const p = (WR.prompts || []).find((x) => x.id === id);
    if (!p) { location.hash = '#write'; return; }
    setTitle(p.titleZh, '#write');
    let tStart = 0;
    view.innerHTML = `
      <div class="card"><span class="pill c5">Competency 0005 · ${esc(p.tag)}</span>
        ${p.context ? `<p class="small">${p.context}</p>` : ''}
        <p class="small"><b>${esc(p.intro)}</b></p>
        <ul class="small">${p.tasks.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="zh small">${p.promptZh}</div>
      </div>
      ${stdBox(p.std)}
      ${p.hint ? `<details class="card"><summary>💡 思路提示（中文）</summary><div class="small">${p.hint}</div></details>` : ''}
      <div class="row"><button class="btn sm ghost" id="tB">⏱ 开始 60 分钟计时</button><span class="grow"></span><span class="sub" id="wcount">0 词</span></div>
      <textarea id="ta" placeholder="Type your response in English here...">${esc(S.drafts[p.id] || '')}</textarea>
      <div class="sub small">目标：400–600 词。自动保存草稿。</div>
      <details class="card check"><summary>✅ 交卷前自查（对照评分标准）</summary>
        ${CHECK.map((t) => `<label><input type="checkbox"><span class="small">${t}</span></label>`).join('')}
        <p class="sub small">评分看三点：<b>Completeness</b>（每个任务都答了吗）、<b>Accuracy</b>（舞蹈和教学知识准确吗）、<b>Depth of Support</b>（有具体例子和细节、推理合理吗）。</p>
      </details>
      <details class="card"><summary>📖 查看范文 Sample Response</summary>
        <div class="model">${esc(p.model)}</div>${sayBtn(p.model)}
        ${p.modelZh ? `<div class="zh small" style="margin-top:10px">${p.modelZh}</div>` : ''}
      </details>`;
    const ta = $('#ta');
    const upd = () => { const n = wc(ta.value); $('#wcount').textContent = n + ' 词'; $('#wcount').style.color = n >= 400 && n <= 650 ? 'var(--ok)' : ''; };
    upd();
    ta.oninput = () => { S.drafts[p.id] = ta.value; save(); upd(); };
    $('#tB').onclick = () => {
      stopTimer(); tStart = Date.now();
      const tick = () => { const left = 3600 - (Date.now() - tStart) / 1000; setTopRight('⏱ ' + fmt(left)); if (left <= 0) { stopTimer(); setTopRight('⏰ 时间到'); } };
      tick(); timerId = setInterval(tick, 1000); ta.focus();
    };
  }

  // ---------- Boot ----------
  render();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
