/* ==========================================================================
   MUSIC PLAYER (all + jazz + lofi) with a vinyl button, bottom right.

   The "All" tab is built automatically from every playlist below,
   so you only ever list each song once.

   EDIT THE PLAYLISTS HERE. Everything below the "ENGINE" line just works.

   Each track:
     file    the mp3 file name inside the folder below (exact spelling and capitals)
     title   what the player shows (I guessed these from the file names, so rename freely)
     artist  who made it (optional)
     credit  the Pixabay attribution HTML (shown in "Music credits")
   ========================================================================== */

window.MUSIC = {
  folder: 'assets/Music/',   /* the folder your mp3 files live in (relative to index.html) */
  volume: 0.35,              /* starting volume, 0 to 1 */
  playlists: {
    jazz: {
      label: 'Jazz',
      tracks: [
        {
          file: 'andriih-jazz-jazz-music-576304.mp3',
          title: 'Jazz Music',
          artist: 'Andrii Hroza',
          credit: 'Music by <a href="https://pixabay.com/users/andriih-56549121/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=576304">Andrii Hroza</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=576304">Pixabay</a>'
        },
        {
          file: 'atlasaudio-jazz-music-617577.mp3',
          title: 'Jazz Music',
          artist: 'AtlasAudio',
          credit: 'Music by <a href="https://pixabay.com/users/atlasaudio-54514918/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=617577">AtlasAudio</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=617577">Pixabay</a>'
        },
        {
          file: 'aurec-jazz-584847.mp3',
          title: 'Jazz',
          artist: 'Mikko Virtanen',
          credit: 'Music by <a href="https://pixabay.com/users/aurec-54643893/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=584847">Mikko Virtanen</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=584847">Pixabay</a>'
        }
      ]
    },
    lofi: {
      label: 'Lofi',
      tracks: [
        {
          file: 'fassounds-good-night-lofi-cozy-chill-music-160166.mp3',
          title: 'Good Night (Lofi Cozy Chill)',
          artist: 'FASSounds',
          credit: 'Music by <a href="https://pixabay.com/users/fassounds-3433550/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=160166">FASSounds</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=160166">Pixabay</a>'
        },
        {
          file: 'ornave-lofi-vinyl-teapot-553356.mp3',
          title: 'Lofi Vinyl Teapot',
          artist: 'Olga Akhmetshina',
          credit: 'Music by <a href="https://pixabay.com/users/ornave-56322367/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=553356">Olga Akhmetshina</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=553356">Pixabay</a>'
        },
        {
          file: 'velariomusic-chill-lofi-616929.mp3',
          title: 'Chill Lofi',
          artist: 'Marco Conti',
          credit: 'Music by <a href="https://pixabay.com/users/velariomusic-54515099/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=616929">Marco Conti</a> from <a href="https://pixabay.com/music//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=616929">Pixabay</a>'
        },
        {
          file: 'zephiramusic-chill-lofi-585360.mp3',
          title: 'Chill Lofi',
          artist: 'Marek Zielinski',
          credit: 'Music by <a href="https://pixabay.com/users/zephiramusic-54643547/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=585360">Marek Zielinski</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=585360">Pixabay</a>'
        }
      ]
    }
  }
};

/* ============================== ENGINE ================================== */
(() => {
  const CFG = window.MUSIC;
  if (!CFG || !CFG.playlists) { return; }
  if (!Object.keys(CFG.playlists).length) { return; }

  /* "All" = every song from every playlist, shown as the first tab */
  if (!CFG.playlists.all) {
    const everything = [];
    Object.keys(CFG.playlists).forEach(k => everything.push(...CFG.playlists[k].tracks));
    CFG.playlists = Object.assign({ all: { label: 'All', tracks: everything } }, CFG.playlists);
  }
  const keys = Object.keys(CFG.playlists);
  const realKeys = keys.filter(k => k !== 'all'); /* used for credits so nothing is listed twice */

  const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = t => (isFinite(t) && t > 0) ? Math.floor(t / 60) + ':' + String(Math.floor(t % 60)).padStart(2, '0') : '0:00';
  const store = {
    get() { try { return JSON.parse(localStorage.getItem('ellaiza-music') || '{}'); } catch (e) { return {}; } },
    set(o) { try { localStorage.setItem('ellaiza-music', JSON.stringify(Object.assign(store.get(), o))); } catch (e) { /* storage blocked */ } }
  };
  const saved = store.get();

  const I = {
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h2.5v14H6zM20 5v14L10 12z" fill="currentColor"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 5H18v14h-2.5zM4 5l10 7-10 7z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5h4.5v15H6zM13.5 4.5H18v15h-4.5z" fill="currentColor"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10l-2.5-2.5M17 17H7l2.5 2.5M7 7v4M17 17v-4" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    vol: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    mute: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5z" fill="currentColor"/><path d="M16 9.5l5 5M21 9.5l-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>'
  };

  /* ---------- state ---------- */
  const audio = new Audio();
  audio.preload = 'metadata';
  let list = keys.indexOf(saved.list) > -1 ? saved.list : keys[0];
  let idx = Math.floor(Math.random() * CFG.playlists[list].tracks.length);
  let userPaused = !!saved.paused;
  let fails = 0;
  let seeking = false;
  audio.volume = typeof saved.vol === 'number' ? saved.vol : (typeof CFG.volume === 'number' ? CFG.volume : .35);
  const tracks = () => CFG.playlists[list].tracks;
  const cur = () => tracks()[idx];

  /* ---------- markup ---------- */
  const root = document.createElement('div');
  root.className = 'mp';
  root.dataset.list = list;
  root.innerHTML = `
    <button type="button" class="mp-vinyl" aria-expanded="false" aria-controls="mp-panel" aria-label="Open music player"><span class="vinyl"></span></button>
    <p class="mp-hint" hidden>tap anywhere to start the music ♪</p>
    <section class="mp-panel" id="mp-panel" role="dialog" aria-label="Music player" hidden>
      <div class="mp-top">
        <div class="mp-tabs" role="group" aria-label="Playlist">${keys.map(k => `<button type="button" data-k="${esc(k)}" aria-pressed="${k === list}">${esc(CFG.playlists[k].label || k)}</button>`).join('')}</div>
        <button type="button" class="mp-x" aria-label="Close music player">×</button>
      </div>
      <div class="mp-now">
        <span class="vinyl mp-disc" aria-hidden="true"></span>
        <div class="mp-meta">
          <h4 class="mp-title"></h4>
          <p class="mp-by"></p>
        </div>
      </div>
      <div class="mp-bar">
        <span class="mp-cur">0:00</span>
        <input type="range" class="mp-seek" min="0" max="1000" value="0" step="1" aria-label="Seek">
        <span class="mp-dur">0:00</span>
      </div>
      <div class="mp-ctl">
        <button type="button" class="mp-rep" aria-pressed="false" aria-label="Repeat this song">${I.repeat}</button>
        <button type="button" class="mp-prev" aria-label="Previous song">${I.prev}</button>
        <button type="button" class="mp-play" aria-label="Play">${I.play}</button>
        <button type="button" class="mp-next" aria-label="Next song">${I.next}</button>
        <div class="mp-volw">
          <button type="button" class="mp-mute" aria-label="Mute">${I.vol}</button>
          <input type="range" class="mp-vol" min="0" max="100" value="35" aria-label="Volume">
        </div>
      </div>
      <ol class="mp-list"></ol>
      <details class="mp-credits">
        <summary>Music credits</summary>
        <ul></ul>
      </details>
    </section>`;
  document.body.appendChild(root);

  const $ = s => root.querySelector(s);
  const btn = $('.mp-vinyl');
  const panel = $('.mp-panel');
  const hint = $('.mp-hint');
  const seek = $('.mp-seek');
  const vol = $('.mp-vol');
  const mute = $('.mp-mute');
  const playBtn = $('.mp-play');

  /* iPhones ignore audio.volume (the phone's buttons control it), so hide the slider there */
  (() => { const v = audio.volume; audio.volume = .5; if (audio.volume !== .5) { $('.mp-volw').classList.add('mp-novol'); } audio.volume = v; })();
  vol.value = Math.round(audio.volume * 100);

  /* credits for every track (filled once) */
  $('.mp-credits ul').innerHTML = realKeys.map(k => {
    const items = CFG.playlists[k].tracks.filter(t => t.credit).map(t => `<li><b>${esc(t.title)}</b><span>${t.credit}</span></li>`).join('');
    return items ? `<li class="mp-ch">${esc(CFG.playlists[k].label || k)}</li>${items}` : '';
  }).join('');
  root.querySelectorAll('.mp-credits a').forEach(a => { a.target = '_blank'; a.rel = 'noopener'; });

  /* ---------- rendering ---------- */
  function renderList() {
    $('.mp-list').innerHTML = tracks().map((t, i) => `<li><button type="button" class="mp-tr${i === idx ? ' on' : ''}" data-i="${i}"${i === idx ? ' aria-current="true"' : ''}><span class="mp-n">${i + 1}</span><span class="mp-tt">${esc(t.title)}${t.artist ? `<small>${esc(t.artist)}</small>` : ''}</span><span class="mp-eq" aria-hidden="true"><i></i><i></i><i></i></span></button></li>`).join('');
  }

  function renderTrack() {
    const t = cur();
    $('.mp-title').textContent = t.title;
    $('.mp-by').textContent = t.artist ? 'by ' + t.artist : '';
    renderList();
    if ('mediaSession' in navigator && window.MediaMetadata) {
      navigator.mediaSession.metadata = new MediaMetadata({ title: t.title, artist: t.artist || 'Pixabay', album: (CFG.playlists[list].label || list) + ' playlist' });
    }
  }

  function setSrc() {
    audio.src = encodeURI(CFG.folder + cur().file);
    seek.value = 0;
    seek.style.setProperty('--p', '0%');
    $('.mp-cur').textContent = '0:00';
    $('.mp-dur').textContent = '0:00';
    renderTrack();
  }

  function playNow() {
    const p = audio.play();
    if (p && p.catch) { p.catch(() => { /* blocked or file missing: handled by events */ }); }
  }

  function go(i, autoplay) {
    const n = tracks().length;
    idx = ((i % n) + n) % n;
    setSrc();
    if (autoplay) { playNow(); }
  }

  function setList(k) {
    if (k === list) { return; }
    list = k;
    idx = 0;
    root.dataset.list = k;
    root.querySelectorAll('.mp-tabs button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.k === k)));
    store.set({ list: k });
    userPaused = false;
    store.set({ paused: false });
    go(0, true);
  }

  function userPlay() { userPaused = false; store.set({ paused: false }); hint.hidden = true; playNow(); }
  function userPause() { userPaused = true; store.set({ paused: true }); audio.pause(); }
  const toggle = () => (audio.paused ? userPlay() : userPause());
  const next = () => { userPaused = false; store.set({ paused: false }); go(idx + 1, true); };
  const prev = () => { if (audio.currentTime > 3) { audio.currentTime = 0; } else { userPaused = false; go(idx - 1, true); } };

  /* ---------- audio events ---------- */
  audio.addEventListener('play', () => { fails = 0; root.classList.add('playing'); hint.hidden = true; playBtn.innerHTML = I.pause; playBtn.setAttribute('aria-label', 'Pause'); });
  audio.addEventListener('pause', () => { root.classList.remove('playing'); playBtn.innerHTML = I.play; playBtn.setAttribute('aria-label', 'Play'); });
  audio.addEventListener('ended', () => go(idx + 1, true)); /* the whole playlist loops forever */
  audio.addEventListener('loadedmetadata', () => { $('.mp-dur').textContent = fmt(audio.duration); });
  audio.addEventListener('timeupdate', () => {
    if (seeking || !audio.duration) { return; }
    const p = (audio.currentTime / audio.duration) * 1000;
    seek.value = p;
    seek.style.setProperty('--p', (p / 10) + '%');
    $('.mp-cur').textContent = fmt(audio.currentTime);
  });
  audio.addEventListener('error', () => { /* a file is missing or broken: skip it, but don't loop forever */
    fails++;
    if (fails < tracks().length) { go(idx + 1, !userPaused); }
  });
  audio.addEventListener('volumechange', () => {
    vol.value = Math.round(audio.volume * 100);
    mute.innerHTML = (audio.muted || audio.volume === 0) ? I.mute : I.vol;
    mute.setAttribute('aria-label', (audio.muted || audio.volume === 0) ? 'Unmute' : 'Mute');
  });

  /* ---------- controls ---------- */
  playBtn.addEventListener('click', toggle);
  $('.mp-next').addEventListener('click', next);
  $('.mp-prev').addEventListener('click', prev);
  $('.mp-rep').addEventListener('click', e => {
    audio.loop = !audio.loop;
    e.currentTarget.setAttribute('aria-pressed', String(audio.loop));
  });
  seek.addEventListener('input', () => {
    seeking = true;
    seek.style.setProperty('--p', (seek.value / 10) + '%');
    if (audio.duration) { $('.mp-cur').textContent = fmt((seek.value / 1000) * audio.duration); }
  });
  seek.addEventListener('change', () => {
    if (audio.duration) { audio.currentTime = (seek.value / 1000) * audio.duration; }
    seeking = false;
  });
  vol.addEventListener('input', () => { audio.muted = false; audio.volume = vol.value / 100; store.set({ vol: audio.volume }); });
  mute.addEventListener('click', () => { audio.muted = !audio.muted; });
  root.querySelectorAll('.mp-tabs button').forEach(b => b.addEventListener('click', () => setList(b.dataset.k)));
  $('.mp-list').addEventListener('click', e => {
    const b = e.target.closest('.mp-tr');
    if (b) { userPaused = false; store.set({ paused: false }); go(+b.dataset.i, true); }
  });

  /* ---------- open / close ---------- */
  function open() {
    panel.hidden = false;
    panel.classList.remove('out');
    panel.classList.add('in');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close music player');
    root.classList.add('open');
  }
  function close(focusBtn) {
    if (panel.hidden) { return; }
    panel.classList.remove('in');
    panel.classList.add('out');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open music player');
    root.classList.remove('open');
    setTimeout(() => { if (!root.classList.contains('open')) { panel.hidden = true; } }, 170);
    if (focusBtn) { btn.focus(); }
  }
  btn.addEventListener('click', () => (panel.hidden || !root.classList.contains('open') ? open() : close()));
  $('.mp-x').addEventListener('click', () => close(true));
  addEventListener('keydown', e => { if (e.key === 'Escape') { close(true); } });
  document.addEventListener('pointerdown', e => { if (!root.contains(e.target)) { close(); } });

  /* ---------- media keys / lock screen ---------- */
  if ('mediaSession' in navigator) {
    const ms = navigator.mediaSession;
    try {
      ms.setActionHandler('play', userPlay);
      ms.setActionHandler('pause', userPause);
      ms.setActionHandler('previoustrack', prev);
      ms.setActionHandler('nexttrack', next);
    } catch (e) { /* not supported */ }
  }

  /* ---------- start ---------- */
  setSrc();
  if (!userPaused) {
    /* Browsers block sound until the visitor interacts, so try now and, if blocked,
       start on the very first click / tap / key press. */
    audio.play().catch(() => {
      hint.hidden = false;
      const ev = ['pointerdown', 'keydown', 'touchend'];
      const kick = () => {
        if (userPaused) { return; }
        audio.play().then(() => { ev.forEach(n => removeEventListener(n, kick, true)); hint.hidden = true; }).catch(() => { /* try again on the next gesture */ });
      };
      ev.forEach(n => addEventListener(n, kick, true));
    });
  }
})();