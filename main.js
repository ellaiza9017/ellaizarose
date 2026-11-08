/* ==========================================================================
   Ellaiza Rose Pesons: portfolio script

   Everything runs inside one function so nothing leaks into the global scope.
   Sections, in order:
     - Helpers and pointer tracking
     - Decorations (cats and coffees), image fallbacks, meow on click
     - Mobile menu, marquee
     - Hero: cursor-reactive name, cat eyes, typing intro
     - About: draggable stickers
     - Skills: physics pit (Matter.js)
     - Floating friends, scroll reveals
     - Hobby: doodle pad
     - Contact: copy email, mail form
     - Works: count-up stats
     - Works panel: tabs, Luminang video, lightbox, storyboard, illustrations wall

   $ and $$ are shorthands for querySelector and querySelectorAll.
   ========================================================================== */

(() => {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)').matches;
  const canHover = matchMedia('(hover:hover)').matches;
  const pointer = { x: innerWidth * .5, y: innerHeight * .5, m: false };
  const phoneQuery = matchMedia('(max-width:700px)');
  const tabletQuery = matchMedia('(max-width:1000px)');
  addEventListener('pointermove', e => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.m = true;
    const h = $('.hero');
    h.style.setProperty('--mx', (e.clientX / innerWidth - .5) * 2);
    h.style.setProperty('--my', (e.clientY / innerHeight - .5) * 2);
  });
  /* ---------- cats & coffees ---------- */
  const SVG = {
    cup: `<svg class="cup" viewBox="0 0 70 84" aria-hidden="true"><path class="st" d="M22 22c-6-6 6-10 0-18"/><path class="st s2" d="M36 22c-6-6 6-10 0-18"/><path class="st s3" d="M50 22c-6-6 6-10 0-18"/><path d="M56 36h6a8 8 0 0 1 0 16h-8" fill="none" stroke="#14092e" stroke-width="4"/><path d="M10 30h46v20a20 20 0 0 1-20 20h-6A20 20 0 0 1 10 50z" fill="#ffb36b" stroke="#14092e" stroke-width="4" stroke-linejoin="round"/><ellipse cx="33" cy="30" rx="23" ry="5" fill="#7a4a2b" stroke="#14092e" stroke-width="3"/><circle cx="25" cy="49" r="2.6" fill="#14092e"/><circle cx="41" cy="49" r="2.6" fill="#14092e"/><path d="M28 56q5 5 10 0" fill="none" stroke="#14092e" stroke-width="2.6" stroke-linecap="round"/><ellipse cx="33" cy="76" rx="28" ry="5" fill="#f4efff" stroke="#14092e" stroke-width="3"/></svg>`,
    peek: `<svg viewBox="0 0 110 72" aria-hidden="true"><path class="ptail" d="M92 70c18-4 20-24 8-34" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round"/><path d="M20 72V38C20 20 34 10 55 10s35 10 35 28v34z" fill="currentColor"/><path d="M22 26L19 2l24 11zM88 26l3-24-24 11z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><g class="blink"><ellipse cx="41" cy="38" rx="5.5" ry="6.5" fill="#c8f560"/><ellipse cx="69" cy="38" rx="5.5" ry="6.5" fill="#c8f560"/></g><path d="M51 48h8l-4 5z" fill="#ff6b8b"/><rect x="22" y="60" width="24" height="12" rx="6" fill="#f4efff" stroke="#14092e" stroke-width="3"/><rect x="64" y="60" width="24" height="12" rx="6" fill="#f4efff" stroke="#14092e" stroke-width="3"/></svg>`,
    walk: `<svg viewBox="0 0 130 74" aria-hidden="true"><g class="bob"><g class="wtail"><path d="M22 40C4 40 2 14 16 10" fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round"/></g><g class="leg l1"><rect x="26" y="48" width="9" height="22" rx="4.5" fill="currentColor"/></g><g class="leg l2"><rect x="40" y="48" width="9" height="22" rx="4.5" fill="currentColor"/></g><g class="leg l3"><rect x="78" y="48" width="9" height="22" rx="4.5" fill="currentColor"/></g><g class="leg l4"><rect x="92" y="48" width="9" height="22" rx="4.5" fill="currentColor"/></g><rect x="18" y="26" width="86" height="30" rx="15" fill="currentColor"/><path d="M92 20L95 3l12 11zM120 20l-3-17-12 11z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="106" cy="30" r="17" fill="currentColor"/><circle cx="100" cy="28" r="3.2" fill="#c8f560"/><circle cx="113" cy="28" r="3.2" fill="#c8f560"/><path d="M104 35h5l-2.5 3z" fill="#ff6b8b"/></g></svg>`
  };
  $$('.deco[data-k]').forEach(el => el.innerHTML = SVG[el.dataset.k]);
  $$('.walker').forEach(w => w.innerHTML = SVG.walk);
  /* images that fail to load (missing files) are hidden instead of showing a broken icon */
  $$('img[data-fallback]').forEach(img => {
    const hide = () => {
      (img.dataset.fallback === 'hide-parent' ? img.parentNode : img).style.display = 'none';
    };
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) {
      hide();
    }
  });
  /* meow on click */
  document.addEventListener('click', e => {
    const p = e.target.closest('.pet');
    if (!p) {
      return;
    }
    const w = ['mrrp!', 'mew ♥', 'nyaa~', 'prrr', '*blep*', 'meow!', 'coffee??'];
    const b = document.createElement('span');
    const r = p.getBoundingClientRect();
    b.className = 'meow';
    b.textContent = w[Math.random() * w.length | 0];
    b.style.left = r.left + r.width / 2 + 'px';
    b.style.top = r.top + 'px';
    document.body.appendChild(b);
    if (!reduceMotion) {
      b.animate([{ opacity: 1, transform: 'translate(-50%,-100%) scale(.6)' }, { opacity: 1, transform: 'translate(-50%,-160%) scale(1.1)', offset: .3 }, { opacity: 0, transform: 'translate(-50%,-230%) scale(1)' }], { duration: 1100, easing: 'ease-out' }).onfinish = () => b.remove();
      p.firstElementChild && p.firstElementChild.animate([{ translate: '0 0' }, { translate: '0 -14px' }, { translate: '0 0' }], { duration: 380, easing: 'ease-out' });
    } else {
      setTimeout(() => b.remove(), 900);
    }
  });
  /* mobile menu */
  const nav = $('#nav');
  const navToggle = $('#navtog');
  const setNav = o => {
    nav.classList.toggle('open', o);
    navToggle.setAttribute('aria-expanded', o);
    navToggle.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
  };
  navToggle.addEventListener('click', () => setNav(!nav.classList.contains('open')));
  $$('#navlinks a').forEach(a => a.addEventListener('click', () => setNav(false)));
  document.addEventListener('pointerdown', e => {
    if (!nav.contains(e.target)) {
      setNav(false);
    }
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      setNav(false);
    }
  });
  addEventListener('resize', () => {
    if (innerWidth > 700) {
      setNav(false);
    }
  });
  /* marquee */
  const marqueeWords = ['Illustration', 'Low-poly 3D', 'Interface design', 'Unity', 'Motion', 'Web & mobile'];
  const marqueeSeparators = ['<i>✦</i>', '<i class="ic"><svg class="mic"><use href="#ic-cat"/></svg></i>', '<i>✦</i>', '<i class="ic"><svg class="mic"><use href="#ic-cup"/></svg></i>'];
  $('#mq').innerHTML = Array(4).fill(marqueeWords.map((w, i) => w + marqueeSeparators[i % 4]).join('')).join('');
  /* hero type: weight reacts to cursor, waves when idle. cat eyes follow */
  const heroName = $('#nm');
  let li = 0;
  heroName.innerHTML = heroName.dataset.t.split(' ').map(w => `<span class="wd">${[...w].map(c => `<span class="l" style="animation-delay:${li++ * .07}s">${c}</span>`).join('')}</span>`).join(' ');
  const heroLetters = $$('#nm .l');
  const pupils = $$('.pu');
  let heroVis = true;
  let tLast = 0;
  new IntersectionObserver(e => {
    heroVis = e[0].isIntersecting;
  }).observe($('.hero'));
  function animateHero(ts) {
    if (!heroVis || (!pointer.m && ts - tLast < 32)) {
      return requestAnimationFrame(animateHero);
    }
    tLast = ts;
    heroLetters.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
      const w = pointer.m ? 200 + 600 * Math.max(0, 1 - d / 380) : 500 + 300 * Math.sin(ts / 700 + i * .9);
      s.style.fontVariationSettings = `'wght' ${w | 0}`;
    });
    pupils.forEach((p, i) => {
      const c = $('#cat').getBoundingClientRect();
      const k = c.width / 200;
      const cx = c.left + (i ? 106 : 78) * k;
      const cy = c.top + 84 * k;
      const a = Math.atan2(pointer.y - cy, pointer.x - cx);
      const m = Math.min(5, Math.hypot(pointer.x - cx, pointer.y - cy) / 40);
      p.style.transform = `translate(${Math.cos(a) * m}px,${Math.sin(a) * m}px)`;
    });
    requestAnimationFrame(animateHero);
  }
  if (!reduceMotion) {
    requestAnimationFrame(animateHero);
  } else {
    heroLetters.forEach(s => s.style.fontVariationSettings = "'wght' 700");
  }
  /* typing intro (from the original portfolio) */
  const typingEl = $('#typing-text');
  const typingPhrases = ['AI driven workflow', 'Hand drawn illustrations', 'Inspired creative designs'];
  if (typingEl) {
    if (reduceMotion) {
      typingEl.textContent = typingPhrases[1];
    } else {
      let pi = 0;
      let ci = 0;
      let del = false;
      (function typeNext() {
        const cur = typingPhrases[pi];
        if (del) {
          ci--;
          typingEl.textContent = cur.slice(0, ci);
          if (ci === 0) {
            del = false;
            pi = (pi + 1) % typingPhrases.length;
            return setTimeout(typeNext, 450);
          }
          setTimeout(typeNext, 35);
        } else {
          ci++;
          typingEl.textContent = cur.slice(0, ci);
          if (ci === cur.length) {
            del = true;
            return setTimeout(typeNext, 2000);
          }
          setTimeout(typeNext, 65);
        }
      })();
    }
  }
  /* draggable stickers (text + a cat and a coffee) */
  const STICKERS = [
    ['BSIT, 4th year', 'National University – Dasmariñas', '#c8f560', 5, 8, -6],
    ['Low-poly 3D', 'Blender, set a new curiosity!', '#ff6b8b', 38, 12, 4],
    ['Cats', 'Chief morale officers', '#6c3cff', 68, 6, -3],
    ['Coffee', 'Fuel for 3AM layouts', '#f4efff', 10, 52, 3],
    ['Lo-fi on repeat', 'Soundtrack for every project', '#c8f560', 42, 48, -5],
    ['Unity', 'Toolbox headache', '#8fd3ff', 70, 50, 6],
    ['Luminang', 'My capstone, a language game', '#6c3cff', 24, 30, -2],
    ['', 'Supervisor', '#f4efff', 82, 22, 5, 'peek'],
    ['', 'Refill, please', '#5ef2c4', 55, 72, -4, 'cup']
  ];
  const board = $('#board');
  let zTop = 20;
  STICKERS.forEach(([a, b, c, x, y, r, k], i) => {
    const e = document.createElement('div');
    e.className = 's';
    e.style.cssText = `background:${c};color:${c === '#6c3cff' ? '#f4efff' : '#14092e'};left:${x}%;top:${y}%;transform:rotate(${r}deg);z-index:${i}`;
    e.dataset.x = x;
    e.dataset.y = y;
    e.innerHTML = k ? `<div class="ssv" style="${k === 'peek' ? 'color:#14092e' : '--steam:#6c3cff'}">${SVG[k]}</div><small style="text-align:center;margin-inline:auto">${b}</small>` : a + '<small>' + b + '</small>';
    board.appendChild(e);
    let ox;
    let oy;
    e.addEventListener('pointerdown', ev => {
      e.setPointerCapture(ev.pointerId);
      e.classList.add('d');
      ox = ev.clientX - e.offsetLeft;
      oy = ev.clientY - e.offsetTop;
      e.style.zIndex = ++zTop + 10;
    });
    e.addEventListener('pointermove', ev => {
      if (!e.classList.contains('d')) {
        return;
      }
      const mx = board.clientWidth - e.offsetWidth;
      const my = board.clientHeight - e.offsetHeight;
      e.style.left = Math.max(0, Math.min(mx, ev.clientX - ox)) + 'px';
      e.style.top = Math.max(0, Math.min(my, ev.clientY - oy)) + 'px';
    });
    const up = () => {
      e.classList.remove('d');
      e.animate([{ rotate: '0deg' }, { rotate: '-5deg' }, { rotate: '3deg' }, { rotate: '0deg' }], { duration: 450, easing: 'ease-out' });
    };
    e.addEventListener('pointerup', up);
    e.addEventListener('pointercancel', () => e.classList.remove('d'));
  });
  const PHONE_STICKER_SPOTS = [
    [0, 1],
    [100, 13],
    [0, 27],
    [94, 38],
    [3, 51],
    [100, 62],
    [0, 73],
    [96, 82],
    [48, 96]
  ]; /* phone layout: a loose zig-zag pile */
  const fitBoard = init => $$('#board .s').forEach((e, i) => {
    const mx = Math.max(0, board.clientWidth - e.offsetWidth);
    const my = Math.max(0, board.clientHeight - e.offsetHeight);
    if (init) { /* phones: spread across the free space so nothing is cut off; desktop keeps the original layout */
      const small = phoneQuery.matches;
      const p = small ? (PHONE_STICKER_SPOTS[i] || [+e.dataset.x, +e.dataset.y]) : [+e.dataset.x, +e.dataset.y];
      e.style.left = Math.min(mx, small ? p[0] / 100 * mx : p[0] / 100 * board.clientWidth) + 'px';
      e.style.top = Math.min(my, small ? p[1] / 100 * my : p[1] / 100 * board.clientHeight) + 'px';
    } else {
      e.style.left = Math.min(mx, e.offsetLeft) + 'px';
      e.style.top = Math.min(my, e.offsetTop) + 'px';
    }
  });
  fitBoard(true);
  addEventListener('resize', () => fitBoard(false));
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => fitBoard(false));
  }
  /* physics pit */
  const SKILLS = ['Java', 'React', 'Flutter', 'HTML & CSS', 'Unity', 'Git / GitHub', 'MySQL', 'Oracle', 'Supabase', 'Firebase', 'REST APIs', 'QA testing', 'Blender 3D', 'Procreate', 'Krita', 'Canva', 'CapCut', 'UI/UX layouts', 'Database design', 'AI tooling'];
  const PILL_COLORS = ['#c8f560', '#ff6b8b', '#6c3cff', '#14092e', '#ffb36b'];
  const pit = $('#pit');
  /* ------------------------------------------------------------------
     Skill details: drag a pill onto the paw (or tap/click/Enter on it)
     and a sticky-note pops out. What it says lives in skills-info.js.
     ------------------------------------------------------------------ */
  const SK_INFO = window.SKILL_INFO || {};
  const SK_EXTRAS = window.SKILL_EXTRAS || {};
  const SK_DEF = Object.assign({
    emoji: '✨', levelLabel: 'Comfort level', tags: []
  }, window.SKILL_DEFAULT || {});
  const SPRITE_DEF = {
    cat: { emoji: '🐈‍⬛', title: 'Not a skill, but…', tagline: 'essential equipment', details: 'Cats supervise every project. Quality control is excellent.' },
    cup: { emoji: '☕', title: 'Not a skill, but…', tagline: 'fuel', details: 'Powers about 90% of this portfolio.' }
  };
  const PAW = '<svg viewBox="-22 -22 44 44" aria-hidden="true"><g fill="currentColor"><ellipse cx="0" cy="8" rx="13" ry="10"/><ellipse cx="-15" cy="-6" rx="5" ry="7"/><ellipse cx="-5" cy="-14" rx="5" ry="7"/><ellipse cx="6" cy="-14" rx="5" ry="7"/><ellipse cx="16" cy="-6" rx="5" ry="7"/></g></svg>';
  const esc = s => String(s).replace(/[&<>"]/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
  const isDark = c => c === '#14092e' || c === '#6c3cff';
  const dragMode = canHover && innerWidth > 800;

  /* the paw-print drop spot */
  const nook = document.createElement('div');
  nook.className = 'nook';
  nook.setAttribute('aria-hidden', 'true');
  nook.innerHTML = '<span class="nook-cat"><svg viewBox="0 0 40 40" width="56" height="56"><use href="#ic-cat"/></svg></span>'
    + '<span class="nook-paw">' + PAW + '</span>'
    + '<span class="nook-t nook-idle">' + (dragMode ? 'drop a skill<br>here' : 'tap a skill') + '</span>'
    + '<span class="nook-t nook-hot">ooh, that one!</span>';
  pit.appendChild(nook);

  /* the pop-up card */
  const card = document.createElement('div');
  card.className = 'skcard';
  card.hidden = true;
  card.setAttribute('role', 'dialog');
  card.setAttribute('aria-label', 'Skill details');
  ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'].forEach(t => {
    card.addEventListener(t, ev => ev.stopPropagation(), { passive: true });
  });
  pit.appendChild(card);
  let cardFrom = null;
  let closeT = 0;

  function sparkle() {
    if (reduceMotion) { return; }
    const cx = nook.offsetLeft + nook.offsetWidth / 2;
    const cy = nook.offsetTop + nook.offsetHeight / 2;
    for (let i = 0; i < 8; i++) {
      const s = document.createElement('span');
      s.className = 'spark';
      const a = (Math.PI * 2 * i) / 8 + Math.random() * .5;
      const d = 60 + Math.random() * 50;
      s.style.cssText = `left:${cx}px;top:${cy}px;--dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;--c:${['#f8fa88', '#ff6b8b', '#6c3cff', '#5ef2c4'][i % 4]}`;
      s.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18"><use href="#st"/></svg>';
      s.addEventListener('animationend', () => s.remove());
      pit.appendChild(s);
    }
  }

  function showCard(key, pillColor, info, fromEl, byKeyboard) {
    clearTimeout(closeT);
    const pick = f => (info && info[f] && (!Array.isArray(info[f]) || info[f].length)) ? info[f] : SK_DEF[f];
    const level = Math.max(0, Math.min(5, Math.round(Number(pick('level')) || 0)));
    const tags = pick('tags') || [];
    const link = (info && info.link) || null;
    const label = pick('levelLabel');
    const paws = [0, 1, 2, 3, 4].map(i => `<span class="${i < level ? 'on' : 'off'}">${PAW}</span>`).join('');
    const c = pillColor;
    card.style.setProperty('--pc', c);
    card.style.setProperty('--pt', isDark(c) ? '#f4efff' : '#14092e');
    card.style.setProperty('--sr', (Math.random() * 3 - 1.5).toFixed(2) + 'deg');
    card.innerHTML = '<button type="button" class="skx" aria-label="Close details">×</button><span class="sktape"></span>'
      + (info && info.img ? `<img class="skimg" src="${esc(info.img)}" alt="${esc(info.imgAlt || key)}">` : '')
      + `<div class="skhead"><span class="skemoji" aria-hidden="true">${esc(pick('emoji'))}</span><h4 class="skname">${esc((info && info.title) || key)}</h4></div>`
      + (pick('tagline') ? `<p class="sktag">${esc(pick('tagline'))}</p>` : '')
      + (level ? `<div class="skpaws" role="img" aria-label="${esc(label)}: ${level} out of 5"><span class="skl">${esc(label)}</span><i>${paws}</i></div>` : '')
      + (pick('details') ? `<p class="skdet">${esc(pick('details'))}</p>` : '')
      + (tags.length ? `<ul class="sktags">${tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : '')
      + (link && link.href ? `<a class="b skgo" href="${esc(link.href)}" target="_blank" rel="noopener">${esc(link.label || 'See more')} ↗</a>` : '');
    card.hidden = false;
    card.classList.remove('in', 'out');
    void card.offsetWidth;
    /* grow out of the paw */
    const ox = nook.offsetLeft + nook.offsetWidth / 2 - card.offsetLeft;
    const oy = nook.offsetTop + nook.offsetHeight / 2 - card.offsetTop;
    card.style.transformOrigin = `${ox}px ${oy}px`;
    card.classList.add('in');
    sparkle();
    cardFrom = fromEl || null;
    card.querySelector('.skx').addEventListener('click', hideCard);
    if (byKeyboard) { card.querySelector('.skx').focus(); }
  }

  function hideCard() {
    if (card.hidden) { return; }
    card.classList.remove('in');
    card.classList.add('out');
    closeT = setTimeout(() => { card.hidden = true; card.classList.remove('out'); }, reduceMotion ? 0 : 170);
    if (cardFrom && document.activeElement && card.contains(document.activeElement)) {
      cardFrom.focus();
    }
  }

  function openFor(el, byKeyboard) {
    const sprite = el.dataset.sprite;
    if (sprite) {
      showCard(sprite, '#f8fa88', Object.assign({}, SPRITE_DEF[sprite], SK_EXTRAS[sprite]), el, byKeyboard);
    } else {
      showCard(el.dataset.k, el.dataset.c || '#6c3cff', SK_INFO[el.dataset.k], el, byKeyboard);
    }
  }

  function tagPill(e, key, c) {
    e.dataset.k = key;
    e.dataset.c = c;
    e.tabIndex = 0;
    e.setAttribute('role', 'button');
    e.setAttribute('aria-label', key + ': show details');
  }

  /* click / tap (ignores real drags) and keyboard */
  let downAt = null;
  pit.addEventListener('pointerdown', ev => { downAt = { x: ev.clientX, y: ev.clientY }; });
  pit.addEventListener('click', ev => {
    const el = ev.target.closest('.p, .sp');
    if (!el || !pit.contains(el)) { return; }
    if (downAt && Math.hypot(ev.clientX - downAt.x, ev.clientY - downAt.y) > 6) { return; }
    openFor(el, false);
  });
  pit.addEventListener('keydown', ev => {
    const el = ev.target.closest && ev.target.closest('.p, .sp');
    if (el && (ev.key === 'Enter' || ev.key === ' ')) {
      ev.preventDefault();
      openFor(el, true);
    }
  });
  addEventListener('keydown', ev => { if (ev.key === 'Escape') { hideCard(); } });
  document.addEventListener('pointerdown', ev => {
    if (!card.hidden && !card.contains(ev.target) && !ev.target.closest('#pit .p, #pit .sp')) { hideCard(); }
  });
  let started = false;
  function drop() {
    if (started) {
      return;
    }
    started = true;
    if (!window.Matter) { /* physics library blocked or offline: show the skills as plain pills */
      pit.classList.add('pit-static');
      SKILLS.forEach((s, i) => {
        const e = document.createElement('div');
        e.className = 'p';
        e.textContent = s;
        const c = PILL_COLORS[i % 5];
        e.style.cssText = `background:${c};color:${(c === '#14092e' || c === '#6c3cff') ? '#f4efff' : '#14092e'}`;
        tagPill(e, s, c);
        pit.appendChild(e);
      });
      nook.remove();
      return;
    }
    const { Engine, Bodies, Composite, Body, Mouse, MouseConstraint, Events } = Matter;
    const en = Engine.create();
    const W = pit.clientWidth;
    const H = pit.clientHeight;
    const T = 60;
    const walls = [Bodies.rectangle(W / 2, H + T / 2, W * 2, T, { isStatic: true }), Bodies.rectangle(-T / 2, H / 2, T, H * 3, { isStatic: true }), Bodies.rectangle(W + T / 2, H / 2, T, H * 3, { isStatic: true })];
    Composite.add(en.world, walls);
    const items = SKILLS.map((s, i) => {
      const e = document.createElement('div');
      e.className = 'p';
      e.textContent = s;
      const c = PILL_COLORS[i % 5];
      e.style.background = c;
      e.style.color = (c === '#14092e' || c === '#6c3cff') ? '#f4efff' : '#14092e';
      tagPill(e, s, c);
      pit.appendChild(e);
      const w = e.offsetWidth;
      const h = e.offsetHeight;
      const b = Bodies.rectangle(80 + Math.random() * (W - 160), -60 - i * 70, w, h, {
        chamfer: { radius: h / 2 }, restitution: .45, angle: Math.random() - .5
      });
      Composite.add(en.world, b);
      return [e, b, w, h];
    });
    [
      ['cat', '#14092e'],
      ['cup', '#6c3cff'],
      ['cat', '#6c3cff'],
      ['cup', '#14092e'],
      ['cat', '#14092e']
    ].forEach(([k, c], i) => {
      const e = document.createElement('div');
      e.className = 'sp';
      e.style.color = c;
      e.innerHTML = `<svg viewBox="0 0 40 40" width="64" height="64"><use href="#ic-${k}"/></svg>`;
      e.dataset.sprite = k;
      e.tabIndex = 0;
      e.setAttribute('role', 'button');
      e.setAttribute('aria-label', (k === 'cat' ? 'Cat' : 'Coffee') + ': show details');
      pit.appendChild(e);
      const b = Bodies.circle(60 + Math.random() * (W - 120), -80 - i * 120 - SKILLS.length * 70, 30, { restitution: .65 });
      Composite.add(en.world, b);
      items.push([e, b, 64, 64]);
    });
    let dragged = null;
    const overNook = b => {
      const r = nook.offsetWidth / 2 + 14;
      return Math.hypot(b.position.x - (nook.offsetLeft + r - 14), b.position.y - (nook.offsetTop + r - 14)) < r;
    };
    if (dragMode) {
      const m = Mouse.create(pit);
      m.element.removeEventListener('mousewheel', m.mousewheel);
      m.element.removeEventListener('DOMMouseScroll', m.mousewheel);
      const mc = MouseConstraint.create(en, {
        mouse: m, constraint: {
          stiffness: .2, render: { visible: false }
        }
      });
      Composite.add(en.world, mc);
      Events.on(mc, 'startdrag', ev => {
        dragged = ev.body;
        nook.classList.add('wake');
      });
      Events.on(mc, 'enddrag', ev => {
        const hit = overNook(ev.body);
        dragged = null;
        nook.classList.remove('wake', 'hot');
        if (hit) {
          const it = items.find(x => x[1] === ev.body);
          if (it) { openFor(it[0], false); }
        }
      });
    }
    let pv = true;
    let pw = W;
    let ph = H;
    new IntersectionObserver(e => {
      pv = e[0].isIntersecting;
    }).observe(pit);
    addEventListener('resize', () => {
      const nW = pit.clientWidth;
      const nH = pit.clientHeight;
      if (Math.abs(nW - pw) < 4 && Math.abs(nH - ph) < 4) {
        return;
      }
      pw = nW;
      ph = nH;
      Body.setPosition(walls[0], { x: nW / 2, y: nH + T / 2 });
      Body.setPosition(walls[1], { x: -T / 2, y: nH / 2 });
      Body.setPosition(walls[2], { x: nW + T / 2, y: nH / 2 });
      items.forEach(([e, b]) => {
        if (b.position.x > nW - 30) {
          Body.setPosition(b, { x: nW - 40, y: b.position.y });
        }
        if (b.position.y > nH - 30) {
          Body.setPosition(b, { x: b.position.x, y: nH - 40 });
        }
      });
    });
    let last = 0;
    (function run(ts) {
      if (pv) {
        Engine.update(en, Math.min(33, ts - last || 16));
        if (dragged) { nook.classList.toggle('hot', overNook(dragged)); }
        items.forEach(([e, b, w, h]) => {
          e.style.transform = `translate(${b.position.x - w / 2}px,${b.position.y - h / 2}px) rotate(${b.angle}rad)`;
        });
      }
      last = ts;
      requestAnimationFrame(run);
    })(0);
  }
  new IntersectionObserver((e, o) => {
    if (e[0].isIntersecting) {
      drop();
      o.disconnect();
    }
  }, { threshold: .3 }).observe(pit);
  /* floating friends: mini coffees, stars and cats that react to the mouse */
  (() => {
    const CAT = `<svg viewBox="0 0 80 90" aria-hidden="true"><path class="ptail" d="M58 82c18 0 20-22 8-30" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/><path d="M18 88V58c0-14 10-22 22-22s22 8 22 22v30z" fill="currentColor"/><circle cx="40" cy="30" r="22" fill="currentColor"/><path d="M20 22L18 2l18 10zM60 22l2-20-18 10z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><circle cx="32" cy="30" r="6" fill="#f4efff"/><circle cx="48" cy="30" r="6" fill="#f4efff"/><circle class="pp2" cx="32" cy="30" r="3" fill="#14092e"/><circle class="pp2" cx="48" cy="30" r="3" fill="#14092e"/><path d="M37 38h6l-3 4z" fill="#ff6b8b"/></svg>`;
    const mk = (k, c) => k === 'cup' ? SVG.cup : k === 'cat' ? CAT : `<svg viewBox="0 0 24 24" aria-hidden="true" style="color:${c}"><use href="#st"/></svg>`;
    const cfg = {
      '.about': [
        ['cup', 1, 9, 44, .6],
        ['star', 94, 12, 28, .9, '#6c3cff'],
        ['cat', 1.5, 72, 62, .5, '#14092e'],
        ['star', 95, 80, 20, .7, '#ff6b8b']
      ],
      '.works': [
        ['star', 3, 28, 26, .8, '#c8f560'],
        ['cat', 92, 58, 62, .5, '#b9a2ff'],
        ['cup', 1.2, 80, 40, .6],
        ['star', 94, 10, 20, .7, '#8fd3ff']
      ],
      '.hb': [['star', 2, 14, 28, .8, '#c8f560'], ['cat', 92, 44, 66, .5, '#14092e'], ['cup', 1.5, 76, 40, .6]],
      '.sk': [['star', 94, 14, 26, .8, '#6c3cff'], ['cup', 1.2, 22, 42, .6], ['cat', 1.8, 62, 62, .5, '#14092e']],
      '.ci': [['star', 94, 8, 26, .8, '#6c3cff'], ['cat', 92, 58, 64, .5, '#14092e'], ['cup', 1.2, 16, 42, .6]]
    };
    const secs = Object.entries(cfg).map(([q, list]) => {
      const el = $(q);
      if (!el) {
        return null;
      }
      const box = document.createElement('div');
      box.className = 'fl';
      box.setAttribute('aria-hidden', 'true');
      const items = list.map(([k, x, y, w, d, c], i) => {
        const it = document.createElement('div');
        it.className = 'fi' + (k === 'cat' ? ' cat pet' : '');
        it.style.cssText = `left:${x}%;top:${y}%;width:${w}px`;
        it.innerHTML = `<div class="fb" style="--t:${4 + (i * 1.3) % 3}s;animation-delay:${-i * 1.1}s">${mk(k, c)}</div>`;
        if (c && k === 'cat') {
          it.style.color = c;
        }
        box.appendChild(it);
        if (k === 'cat' && canHover && !reduceMotion) {
          it.addEventListener('pointerenter', () => {
            const left = Math.random() < .5;
            it.style.left = (left ? 1 + Math.random() * 2.5 : 91 + Math.random() * 3) + '%';
            it.style.top = (8 + Math.random() * 78) + '%';
          });
        }
        return {
          it, d, k, pp: k === 'cat' ? [...it.querySelectorAll('.pp2')] : []
        };
      });
      el.appendChild(box);
      const S = {
        el, items, tx: 0, ty: 0, mx: 0, my: 0, vis: false
      };
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        S.tx = (e.clientX - r.left) / r.width * 2 - 1;
        S.ty = (e.clientY - r.top) / r.height * 2 - 1;
      });
      el.addEventListener('pointerleave', () => {
        S.tx = S.ty = 0;
      });
      new IntersectionObserver(e => {
        S.vis = e[0].isIntersecting;
      }).observe(el);
      return S;
    }).filter(Boolean);
    if (reduceMotion) {
      return;
    }
    (function loop() {
      secs.forEach(S => {
        if (!S.vis || tabletQuery.matches) {
          return;
        }
        S.mx += (S.tx - S.mx) * .08;
        S.my += (S.ty - S.my) * .08;
        S.items.forEach(({ it, d, k, pp }) => {
          it.style.transform = `translate(${(-S.mx * d * 60).toFixed(1)}px,${(-S.my * d * 45).toFixed(1)}px)` + (k === 'cat' ? ` rotate(${(S.mx * 8).toFixed(1)}deg)` : '');
          if (pp.length) {
            const r = it.getBoundingClientRect();
            const k2 = r.width / 80;
            const cx = r.left + 40 * k2;
            const cy = r.top + 30 * k2;
            const a = Math.atan2(pointer.y - cy, pointer.x - cx);
            const m = Math.min(3, Math.hypot(pointer.x - cx, pointer.y - cy) / 50);
            pp.forEach(p => p.style.transform = `translate(${Math.cos(a) * m}px,${Math.sin(a) * m}px)`);
          }
        });
      });
      requestAnimationFrame(loop);
    })();
  })();
  /* scroll reveals + spring headings + marquee skew */
  (() => {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) {
        return;
      }
      const el = e.target;
      io.unobserve(el);
      el.classList.add('in');
      if (el.classList.contains('rv')) {
        setTimeout(() => el.classList.remove('rv', 'in'), 1800);
      }
    }), { threshold: .15, rootMargin: '0px 0px -6% 0px' });
    $$('.works h2,.hb h2,.sk h2').forEach(h => {
      h.setAttribute('aria-label', [...h.childNodes].map(n => n.nodeName === 'BR' ? ' ' : n.textContent).join(''));
      let i = 0;
      let out = [];
      h.childNodes.forEach(n => {
        if (n.nodeType === 3) {
          n.textContent.split(/(\s+)/).forEach(w => {
            if (!w.trim()) {
              return out.push(' ');
            }
            out.push(`<span class="wd2">${[...w].map(c => `<span class="hl" aria-hidden="true" style="--i:${i++}">${c}</span>`).join('')}</span>`);
          });
        } else {
          out.push(n.nodeName === 'BR' ? '<br>' : n.outerHTML);
        }
      });
      h.innerHTML = out.join('');
      h.classList.add('hsp');
      io.observe(h);
    });
    [
      ['.about .big', 0, 40],
      ['.sum', 0, 40],
      ['.ed>div', 0, 50],
      ['.acc>.t', 0, 140],
      ['.stats>div', 0, 40],
      ['.pad', -60, 20],
      ['.hb .lede', 0, 30],
      ['.collage>.art', 'x', 20],
      ['.gr>div', 0, 50],
      ['.bubble', 50, 20],
      ['.notes>.nt', 0, -70],
      ['.status', -40, 20],
      ['#mf', 60, 30]
    ].forEach(([q, tx, ty]) => $$(q).forEach((el, i) => {
      const x = tx === 'x' ? (i % 2 ? 70 : -70) : tx;
      el.classList.add('rv');
      el.style.setProperty('--tx', x + 'px');
      el.style.setProperty('--ty', ty + 'px');
      el.style.setProperty('--ar', (i % 2 ? 6 : -6) + 'deg');
      el.style.setProperty('--dl', i * .09 + 's');
      io.observe(el);
    }));
    const mqe = $('.mq');
    if (!reduceMotion && mqe) {
      let ly = scrollY;
      let sk = 0;
      addEventListener('scroll', () => {
        sk = Math.max(-14, Math.min(14, (scrollY - ly) * .6));
        ly = scrollY;
      }, { passive: true });
      let idle = false;
      (function f() {
        sk *= .9;
        if (Math.abs(sk) < .01) {
          sk = 0;
          if (!idle) {
            mqe.style.transform = 'rotate(-1.5deg) scale(1.04)';
            idle = true;
          }
        } else {
          idle = false;
          mqe.style.transform = `rotate(-1.5deg) scale(1.04) skewX(${sk.toFixed(2)}deg)`;
        }
        requestAnimationFrame(f);
      })();
    }
  })();
  /* doodle pad */
  (() => {
    const cv = $('#dd');
    if (!cv) {
      return;
    }
    const cx = cv.getContext('2d');
    const pad = $('#pad');
    const sz = $('#ddsz');
    const er = $('#dder');
    let col = '#14092e';
    let down = false;
    let lx = 0;
    let ly = 0;
    let W = 0;
    const fit = () => {
      const r = cv.getBoundingClientRect();
      if (!r.width || Math.abs(r.width - W) < 2) {
        return;
      }
      W = r.width;
      const d = devicePixelRatio || 1;
      const old = document.createElement('canvas');
      old.width = cv.width;
      old.height = cv.height;
      old.getContext('2d').drawImage(cv, 0, 0);
      cv.width = r.width * d;
      cv.height = r.height * d;
      cx.setTransform(d, 0, 0, d, 0, 0);
      cx.lineCap = cx.lineJoin = 'round';
      cx.drawImage(old, 0, 0, old.width / d, old.height / d);
    };
    fit();
    addEventListener('resize', fit);
    const pt = e => {
      const r = cv.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    const style = () => {
      cx.globalCompositeOperation = er.getAttribute('aria-pressed') === 'true' ? 'destination-out' : 'source-over';
      cx.strokeStyle = cx.fillStyle = col;
      cx.lineWidth = +sz.value;
    };
    cv.addEventListener('pointerdown', e => {
      down = true;
      cv.setPointerCapture(e.pointerId);
      [lx, ly] = pt(e);
      style();
      cx.beginPath();
      cx.arc(lx, ly, cx.lineWidth / 2, 0, 6.29);
      cx.fill();
      pad.classList.add('drawn');
    });
    cv.addEventListener('pointermove', e => {
      if (!down) {
        return;
      }
      const [x, y] = pt(e);
      style();
      cx.beginPath();
      cx.moveTo(lx, ly);
      cx.lineTo(x, y);
      cx.stroke();
      lx = x;
      ly = y;
    });
    ['pointerup', 'pointercancel'].forEach(t => cv.addEventListener(t, () => down = false));
    $$('.sw').forEach(b => b.addEventListener('click', () => {
      col = b.dataset.c;
      er.setAttribute('aria-pressed', 'false');
      $$('.sw').forEach(x => x.setAttribute('aria-pressed', x === b));
    }));
    er.addEventListener('click', () => er.setAttribute('aria-pressed', er.getAttribute('aria-pressed') !== 'true'));
    $('#ddclr').addEventListener('click', () => {
      cx.save();
      cx.setTransform(1, 0, 0, 1, 0, 0);
      cx.clearRect(0, 0, cv.width, cv.height);
      cx.restore();
      pad.classList.remove('drawn');
    });
  })();
  /* copy email + star burst */
  $('#cp').addEventListener('click', async (e) => {
    const m = 'p.ellaiza.rose@gmail.com';
    const s = $('#cs');
    try {
      await navigator.clipboard.writeText(m);
      s.textContent = 'Copied! Can’t wait to hear from you.';
    } catch {
      s.textContent = 'Select and copy: ' + m;
    }
    if (reduceMotion) {
      return;
    }
    const r = $('#cp').getBoundingClientRect(); /* e.currentTarget is null after the await above */
    for (let i = 0; i < 16; i++) {
      const n = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      n.setAttribute('class', 'star');
      n.innerHTML = '<use href="#st"/>';
      n.style.left = r.left + r.width / 2 + 'px';
      n.style.top = r.top + r.height / 2 + 'px';
      n.style.color = ['#c8f560', '#8fd3ff', '#6c3cff', '#5ef2c4'][i % 4];
      document.body.appendChild(n);
      const a = i / 16 * 6.28;
      const d = 90 + Math.random() * 120;
      n.animate([{ transform: 'translate(0,0) scale(.3)', opacity: 1 }, { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d + 60}px) rotate(300deg) scale(1.3)`, opacity: 0 }], { duration: 900 + Math.random() * 400, easing: 'cubic-bezier(.2,.8,.3,1)' }).onfinish = () => n.remove();
    }
  });
  /* contact form: sends message directly to Ellaiza via FormSubmit AJAX API */
  const contactForm = $('#mf');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const formEl = e.currentTarget;
      const d = new FormData(formEl);
      const submitBtn = $('#mfSubmit') || formEl.querySelector('button[type="submit"]');
      const statusBox = $('#mfStatus');

      const name = (d.get('n') || '').toString().trim();
      const email = (d.get('e') || '').toString().trim();
      const inquiryType = (d.get('t') || '').toString().trim();
      const message = (d.get('m') || '').toString().trim();
      const honey = (d.get('_honey') || '').toString().trim();

      if (honey) {
        // Spam bot triggered honeypot
        return;
      }

      const origBtnText = submitBtn ? submitBtn.textContent : 'Send message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending message…';
      }
      if (statusBox) {
        statusBox.className = 'mf-status sending';
        statusBox.textContent = 'Sending your message… 🐾';
      }

      try {
        const response = await fetch('https://formsubmit.co/ajax/p.ellaiza.rose@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            inquiry: inquiryType,
            message: message,
            _replyto: email,
            _cc: 'ellai.r9017@gmail.com',
            _subject: `[Portfolio Message] ${inquiryType} from ${name}`,
            _template: 'table'
          })
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok || result.success === 'true' || result.success === true) {
          formEl.reset();
          if (submitBtn) {
            submitBtn.textContent = 'Message sent! ✨';
          }
          if (statusBox) {
            statusBox.className = 'mf-status success';
            statusBox.innerHTML = `🐾 <b>Thank you, ${esc(name || 'friend')}!</b> Your message has been sent successfully. Ellaiza will get back to you soon.`;
          }
          setTimeout(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.textContent = origBtnText;
            }
          }, 4500);
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (err) {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = origBtnText;
        }
        if (statusBox) {
          statusBox.className = 'mf-status error';
          statusBox.innerHTML = '⚠️ Note could not be sent automatically right now. You can email Ellaiza directly at <a href="mailto:p.ellaiza.rose@gmail.com" style="text-decoration:underline; font-weight:700;">p.ellaiza.rose@gmail.com</a>';
        }
      }
    });
  }
  /* count-up stats */
  new IntersectionObserver((en, o) => {
    if (!en[0].isIntersecting) {
      return;
    }
    o.disconnect();
    $$('#stats b').forEach(b => {
      const to = +b.dataset.to;
      if (reduceMotion) {
        b.textContent = to;
        return;
      }
      const t0 = performance.now();
      (function f(n) {
        const k = Math.min(1, (n - t0) / 1400);
        b.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) {
          requestAnimationFrame(f);
        }
      })(t0);
    });
  }, { threshold: .4 }).observe($('#stats'));
  /* ======================= WORKS PANEL ======================= */
  const panel = $('#panel');
  const pclose = $('#pclose');
  const tabs = $$('.pbar [data-tab]');
  const pads = $$('.pn');
  let currentTab = null;
  let lastFocus = null;
  let histOn = false;
  const zeroPad = n => String(n).padStart(2, '0');
  /* --- storyboard source: edit SB.dir / SB.count / SB.pats if your files are named differently --- */
  const SB = {
    dir: 'assets/images/NyxStoryboard/', count: 51, use: -1,
    pats: [
      (n) => n + '.png',
      (n) => zeroPad(n) + '.png',
      (n) => zeroPad(n) + '.jpg',
      (n) => n + '.jpg',
      (n) => n + '.png',
      (n) => zeroPad(n) + '.webp',
      (n) => zeroPad(n) + '.jpeg',
      (n) => `page${zeroPad(n)}.png`,
      (n) => `page-${zeroPad(n)}.png`,
      (n) => `page_${zeroPad(n)}.png`,
      (n) => `Page ${n}.png`,
      (n) => `Untitled_Artwork (${n}).png`,
      (n) => `storyboard-${zeroPad(n)}.png`,
      (n) => `storyboard_${zeroPad(n)}.png`,
      (n) => `Nyx_Storyboard_${zeroPad(n)}.png`,
      (n) => `NyxStoryboard_${zeroPad(n)}.png`,
      (n) => `nyx-storyboard-${zeroPad(n)}.png`
    ]
  };
  const sbUrl = n => encodeURI(SB.dir + SB.pats[SB.use](n));
  SB.ready = new Promise(res => {
    let i = 0;
    const next = () => {
      if (i >= SB.pats.length) {
        return res(-1);
      }
      const k = i++;
      const im = new Image();
      im.onload = () => {
        SB.use = k;
        res(k);
      };
      im.onerror = next;
      im.src = encodeURI(SB.dir + SB.pats[k](1));
    };
    next();
  });
  SB.ready.then(k => {
    if (k >= 0) {
      const c = $('#sbCover');
      c.src = sbUrl(1);
    }
  });
  function openPanel(key, x, y) {
    lastFocus = document.activeElement;
    if (x == null) {
      const r = (lastFocus && lastFocus.getBoundingClientRect) ? lastFocus.getBoundingClientRect() : {
        left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0
      };
      x = r.left + r.width / 2;
      y = r.top + r.height / 2;
    }
    panel.style.setProperty('--cx', x + 'px');
    panel.style.setProperty('--cy', y + 'px');
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    document.documentElement.style.overflow = 'hidden';
    setTab(key);
    setTimeout(() => pclose.focus(), 60);
    if (!histOn) {
      try {
        history.pushState({ panel: 1 }, '');
        histOn = true;
      } catch (_) {
      }
    }
  }
  function closePanel(fromPop) {
    if (!panel.classList.contains('open')) {
      return;
    }
    closeLB();
    stopVideo();
    stopPlay();
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) {
      lastFocus.focus();
    }
    if (histOn) {
      histOn = false;
      if (fromPop !== true) {
        history.back();
      }
    }
  }
  addEventListener('popstate', () => {
    if (panel.classList.contains('open')) {
      closePanel(true);
    }
  });
  function setTab(key) {
    if (key !== currentTab) {
      stopVideo();
      stopPlay();
      closeLB();
    }
    currentTab = key;
    pads.forEach(p => {
      const on = p.dataset.pn === key;
      p.classList.toggle('on', on);
      if (on) {
        p.scrollTop = 0;
      }
    });
    tabs.forEach(b => b.setAttribute('aria-selected', b.dataset.tab === key));
    {
      const pb = $('.pbar');
      const act = tabs.find(b => b.dataset.tab === key);
      if (act) {
        pb.scrollTo({ left: act.offsetLeft - (pb.clientWidth - act.offsetWidth) / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    }
    if (key === 'storyboard') {
      initSB();
    }
    if (key === 'illustrations') {
      initIL();
    }
  }
  tabs.forEach(b => b.addEventListener('click', () => setTab(b.dataset.tab)));
  pclose.addEventListener('click', closePanel);
  /* anything with data-open opens a panel (arches, hobby figures, buttons) */
  $$('[data-open]').forEach(el => {
    el.addEventListener('click', e => openPanel(el.dataset.open, e.clientX || undefined, e.clientY || undefined));
    if (el.getAttribute('role') === 'button') {
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openPanel(el.dataset.open);
        }
      });
    }
  });
  document.addEventListener('keydown', e => {
    if (!panel.classList.contains('open')) {
      return;
    }
    if (e.key === 'Escape') {
      if (lb.classList.contains('show')) {
        closeLB();
      } else {
        closePanel();
      }
      return;
    }
    if (lb.classList.contains('show')) {
      if (e.key === 'ArrowLeft') {
        lbGo(-1);
      }
      if (e.key === 'ArrowRight') {
        lbGo(1);
      }
    } else if (currentTab === 'storyboard' && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) {
      if (e.key === 'ArrowLeft') {
        sbShow(sbCur - 1, -1);
      }
      if (e.key === 'ArrowRight') {
        sbShow(sbCur + 1, 1);
      }
    }
    if (e.key === 'Tab') {
      const f = $$('#panel button,#panel a[href],#panel input').filter(x => x.offsetParent !== null && !x.closest('.pn:not(.on)'));
      if (!f.length) {
        return;
      }
      const a = f[0];
      const z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    }
  });
  /* --- Luminang video (loads YouTube only when played) --- */
  const tv = $('#tv');
  const tvHTML = tv.innerHTML;
  $('#playv').addEventListener('click', () => {
    const f = document.createElement('iframe');
    f.src = 'https://www.youtube-nocookie.com/embed/hxVQVUPZbmA?autoplay=1&rel=0&modestbranding=1';
    f.title = 'Luminang: Voices of the Regions, video';
    f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    f.allowFullscreen = true;
    tv.classList.add('live');
    tv.appendChild(f);
  });
  function stopVideo() {
    if (tv.classList.contains('live')) {
      tv.classList.remove('live');
      tv.querySelector('iframe').remove();
    }
  }
  $$('[data-shot]').forEach(b => b.addEventListener('click', () => {
    const l = $$('[data-shot]').filter(x => x.offsetParent !== null).map(x => ({ s: x.dataset.shot, c: x.dataset.cap }));
    lbOpen(l, l.findIndex(x => x.s === b.dataset.shot));
  }));
  /* --- lightbox --- */
  const lb = $('#lb');
  const lbi = $('#lbi');
  const lbc = $('#lbc');
  let lbList = [];
  let lbIdx = 0;
  function lbOpen(list, i) {
    lbList = list;
    lbGoTo(i);
    lb.classList.add('show');
    $('#lbx').focus();
  }
  function lbGoTo(i) {
    lbIdx = (i + lbList.length) % lbList.length;
    const it = lbList[lbIdx];
    lbi.src = it.s;
    lbi.alt = it.c;
    lbc.textContent = it.c;
    const m = lbList.length < 2;
    $('#lbp').style.display = $('#lbn').style.display = m ? 'none' : '';
  }
  function lbGo(d) {
    lbGoTo(lbIdx + d);
  }
  function closeLB() {
    lb.classList.remove('show');
  }
  $('#lbx').onclick = closeLB;
  $('#lbp').onclick = () => lbGo(-1);
  $('#lbn').onclick = () => lbGo(1);
  lb.addEventListener('click', e => {
    if (e.target === lb) {
      closeLB();
    }
  });
  let lsx = null;
  lb.addEventListener('touchstart', e => {
    lsx = e.touches[0].clientX;
  }, { passive: true });
  lb.addEventListener('touchend', e => {
    if (lsx == null) {
      return;
    }
    const d = e.changedTouches[0].clientX - lsx;
    lsx = null;
    if (Math.abs(d) > 50 && lbList.length > 1) {
      lbGo(d < 0 ? 1 : -1);
    }
  });
  /* --- storyboard viewer --- */
  const sbp = $('#sbp');
  const sbr = $('#sbr');
  const sbc = $('#sbc');
  const sheet = $('#sheet');
  let sbCur = 1;
  let sbInit = false;
  let sbTimer = 0;
  let sbBusy = false;
  const sbPH = n => `<svg viewBox="0 0 640 360" role="img" aria-label="Placeholder for storyboard page ${n}"><rect x="20" y="20" width="600" height="250" rx="6" fill="#fff" stroke="#14092e" stroke-width="4"/><path d="M20 20L620 270M620 20L20 270" stroke="#14092e" stroke-opacity=".15" stroke-width="3"/><text x="40" y="58" font-family="Bricolage Grotesque,sans-serif" font-weight="800" font-size="30" fill="#6c3cff">Panel ${zeroPad(n)}</text><rect x="20" y="292" width="400" height="12" rx="6" fill="#14092e" opacity=".25"/><rect x="20" y="318" width="280" height="12" rx="6" fill="#14092e" opacity=".15"/></svg>`;
  function sbRender(n) {
    if (SB.use < 0) {
      sbp.innerHTML = sbPH(n);
      return;
    }
    const im = new Image();
    im.alt = `Storyboard page ${n} of ${SB.count}`;
    im.draggable = false;
    im.onerror = () => {
      sbp.innerHTML = sbPH(n);
    };
    im.src = sbUrl(n);
    sbp.replaceChildren(im);
    [n + 1, n - 1].forEach(m => {
      if (m >= 1 && m <= SB.count) {
        new Image().src = sbUrl(m);
      }
    });
  }
  function sbShow(n, dir) {
    n = (n - 1 + SB.count) % SB.count + 1;
    if (sbBusy && dir) {
      return;
    }
    const upd = () => {
      sbCur = n;
      sbRender(n);
      sbr.value = n;
      sbc.textContent = `Page ${n} of ${SB.count}`;
      $$('#sheet button').forEach((b, i) => b.setAttribute('aria-current', i + 1 === n));
    };
    if (!dir || reduceMotion) {
      upd();
      return;
    }
    sbBusy = true;
    sbp.classList.remove('tn', 'tp');
    void sbp.offsetWidth;
    sbp.classList.add(dir > 0 ? 'tn' : 'tp');
    setTimeout(upd, 300);
    setTimeout(() => {
      sbp.classList.remove('tn', 'tp');
      sbBusy = false;
    }, 620);
  }
  function stopPlay() {
    clearInterval(sbTimer);
    sbTimer = 0;
    const b = $('#sbPlay');
    if (b) {
      b.setAttribute('aria-pressed', 'false');
      b.textContent = '▶ Play animatic';
    }
  }
  async function initSB() {
    if (sbInit) {
      return;
    }
    sbInit = true;
    await SB.ready;
    sbShow(1);
    $('#sbPrev').onclick = () => {
      stopPlay();
      sbShow(sbCur - 1, -1);
    };
    $('#sbNext').onclick = () => {
      stopPlay();
      sbShow(sbCur + 1, 1);
    };
    sbr.oninput = () => {
      stopPlay();
      sbShow(+sbr.value);
    };
    $('#sbPlay').onclick = e => {
      if (sbTimer) {
        stopPlay();
        return;
      }
      e.currentTarget.setAttribute('aria-pressed', 'true');
      e.currentTarget.textContent = '❚❚ Pause';
      sbTimer = setInterval(() => sbShow(sbCur + 1, 1), 2400);
    };
    $('#sbSheet').onclick = e => {
      const on = sheet.classList.toggle('show');
      e.currentTarget.setAttribute('aria-pressed', on);
      if (on && !sheet.children.length) {
        for (let i = 1; i <= SB.count; i++) {
          const b = document.createElement('button');
          b.type = 'button';
          b.setAttribute('aria-label', 'Go to page ' + i);
          b.innerHTML = (SB.use >= 0 ? `<img loading="lazy" alt="" src="${sbUrl(i)}">` : '') + `<em>${i}</em>`;
          b.onclick = () => {
            stopPlay();
            sbShow(i, i > sbCur ? 1 : -1);
            sbp.scrollIntoView({ behavior: 'smooth', block: 'center' });
          };
          b.setAttribute('aria-current', i === sbCur);
          sheet.appendChild(b);
        }
      }
    };
    let sx = null;
    sbp.addEventListener('pointerdown', e => {
      sx = e.clientX;
    });
    sbp.addEventListener('pointerup', e => {
      if (sx == null) {
        return;
      }
      const d = e.clientX - sx;
      sx = null;
      if (Math.abs(d) > 50) {
        stopPlay();
        sbShow(sbCur + (d < 0 ? 1 : -1), d < 0 ? 1 : -1);
      }
    });
    if (SB.use < 0) {
      sbc.textContent = 'Add your pages to ' + SB.dir + ' (01.jpg … 51.jpg)';
    }
  }
  /* --- illustrations wall --- */
  const IL = [
    ['Untitled_Artwork (5).png', 'Celestial Cat', 'a cosmic cat, a glowing star'],
    ['PurpleGirl.png', 'Violet portrait', 'glowing violet eyes'],
    ['bunnygirl.png', 'Cake break', 'bunny ears, one slice of cake'],
    ['Untitled_Artwork.png', 'Sketchbook 01', 'digital painting'],
    ['Untitled_Artwork (1).png', 'Sketchbook 02', 'digital painting'],
    ['Untitled_Artwork (2).png', 'Sketchbook 03', 'digital painting'],
    ['Untitled_Artwork (3).png', 'Sketchbook 04', 'digital painting'],
    ['Untitled_Artwork (4).png', 'Sketchbook 05', 'digital painting']
  ];
  let ilInit = false;
  function initIL() {
    if (ilInit) {
      return;
    }
    ilInit = true;
    const wall = $('#wall');
    IL.forEach(([f, t, n], i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'pol';
      b.style.setProperty('--r', ((Math.random() * 6 - 3)).toFixed(1) + 'deg');
      b.style.setProperty('--i', i);
      const src = encodeURI('assets/images/Illustrations/' + f);
      b.innerHTML = `<img src="${src}" alt="${t}: ${n}" loading="lazy"><strong>${t}</strong><small>${n}</small>`;
      b.dataset.s = src;
      b.dataset.c = t;
      b.querySelector('img').onerror = () => b.remove();
      b.onclick = () => {
        const l = $$('#wall .pol').map(x => ({ s: x.dataset.s, c: x.dataset.c }));
        lbOpen(l, l.findIndex(x => x.s === src));
      };
      wall.appendChild(b);
    });
  }
})();