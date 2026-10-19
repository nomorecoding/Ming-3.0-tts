// Page behaviour: waveform players, the sample tabs built from window.DEMOS
// (static/js/examples.js), figure zoom, the download snippet and the nav.
(function () {
  "use strict";

  var PEAKS = window.PEAKS || {};
  var DEMOS = window.DEMOS || [];
  var ICONS =
    '<svg class="i-play" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 4.5v15l12.5-7.5z"/></svg>' +
    '<svg class="i-pause" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.5 4.5h4v15h-4zM13.5 4.5h4v15h-4z"/></svg>';
  var current = null;
  var video = document.querySelector(".video-frame video");

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function clock(seconds) {
    var s = Math.max(0, Math.floor(seconds || 0));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  function resample(peaks, n) {
    var out = [];
    for (var i = 0; i < n; i++) {
      if (!peaks || !peaks.length) {
        out.push(Math.round(30 + 26 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.31))));
        continue;
      }
      var a = Math.floor((i * peaks.length) / n);
      var b = Math.max(a + 1, Math.floor(((i + 1) * peaks.length) / n));
      var m = 0;
      for (var j = a; j < b; j++) m = Math.max(m, peaks[j]);
      out.push(m);
    }
    return out;
  }

  function bars(cls, levels) {
    var node = el("span", "bars " + cls);
    node.setAttribute("aria-hidden", "true");
    node.innerHTML = levels.map(function (h) { return '<i style="--h:' + h + '"></i>'; }).join("");
    return node;
  }

  function scriptLang(text) {
    if (/[\u3040-\u30ff]/.test(text)) return "ja";
    if (/[\uac00-\ud7af]/.test(text)) return "ko";
    if (/[\u4e00-\u9fff]/.test(text)) return "zh-CN";
    return "";
  }

  function fillText(node, text) {
    var lang = scriptLang(text || "");
    if (lang) node.lang = lang;
    (text || "").split(/(\[[A-Za-z][A-Za-z-]*\])/).forEach(function (part, i) {
      if (!part) return;
      node.appendChild(i % 2 ? el("span", "tag", part) : document.createTextNode(part));
    });
  }

  function mountPlayer(root, src, title) {
    var info = PEAKS[src] || {};
    var count = root.classList.contains("player-lg") ? 72 : root.classList.contains("player-sm") ? 36 : 56;
    var levels = resample(info.p, count);
    var duration = info.d || 0;
    var card = root.closest(".sample, .matrix-row, .hero-card");
    var audio = null;
    var frame = 0;
    var label = title || "sample";

    root.classList.add("player");
    var button = el("button", "play");
    button.type = "button";
    button.innerHTML = ICONS;
    button.setAttribute("aria-label", "Play " + label);
    var wave = el("div", "wave");
    wave.tabIndex = 0;
    wave.setAttribute("role", "slider");
    wave.setAttribute("aria-label", "Seek " + label);
    wave.setAttribute("aria-valuemin", "0");
    wave.setAttribute("aria-valuemax", "100");
    wave.setAttribute("aria-valuenow", "0");
    wave.appendChild(bars("bars-base", levels));
    wave.appendChild(bars("bars-fill", levels));
    var time = el("span", "time", clock(duration));
    root.append(button, wave, time);

    var api = { pause: function () { if (audio && !audio.paused) audio.pause(); } };

    function total() { return (audio && isFinite(audio.duration) && audio.duration) || duration; }
    function progress(fraction) {
      root.style.setProperty("--p", (fraction * 100).toFixed(2) + "%");
      wave.setAttribute("aria-valuenow", String(Math.round(fraction * 100)));
    }
    function tick() {
      var d = total();
      progress(d ? Math.min(1, audio.currentTime / d) : 0);
      time.textContent = clock(audio.currentTime);
      frame = requestAnimationFrame(tick);
    }
    function onPlay() {
      if (current && current !== api) current.pause();
      if (video && !video.paused) video.pause();
      current = api;
      root.classList.add("is-playing");
      if (card) card.classList.add("is-playing");
      button.setAttribute("aria-label", "Pause " + label);
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    }
    function onPause() {
      cancelAnimationFrame(frame);
      root.classList.remove("is-playing");
      if (card) card.classList.remove("is-playing");
      button.setAttribute("aria-label", "Play " + label);
    }
    function onEnded() {
      onPause();
      audio.currentTime = 0;
      progress(0);
      time.textContent = clock(total());
      if (current === api) current = null;
    }
    function ensure() {
      if (!audio) {
        audio = new Audio(src);
        audio.preload = "auto";
        audio.addEventListener("play", onPlay);
        audio.addEventListener("pause", onPause);
        audio.addEventListener("ended", onEnded);
      }
      return audio;
    }
    function play() { ensure().play().catch(function () {}); }
    function seek(fraction) {
      var a = ensure();
      fraction = Math.min(1, Math.max(0, fraction));
      var go = function () {
        a.currentTime = fraction * total();
        progress(fraction);
        time.textContent = clock(a.currentTime);
      };
      if (a.readyState >= 1) go(); else a.addEventListener("loadedmetadata", go, { once: true });
      if (a.paused) play();
    }

    button.addEventListener("click", function () {
      var a = ensure();
      if (a.paused) play(); else a.pause();
    });
    wave.addEventListener("click", function (e) {
      var r = wave.getBoundingClientRect();
      seek((e.clientX - r.left) / r.width);
    });
    wave.addEventListener("pointermove", function (e) {
      wave.style.setProperty("--hx", e.clientX - wave.getBoundingClientRect().left + "px");
    });
    wave.addEventListener("keydown", function (e) {
      var d = total() || 1;
      var at = audio ? audio.currentTime / d : 0;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        seek(at + (e.key === "ArrowRight" ? 0.05 : -0.05));
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        button.click();
      }
    });
    return api;
  }

  document.querySelectorAll(".player[data-src]").forEach(function (node) {
    mountPlayer(node, node.dataset.src, node.dataset.title);
  });

  // Sample tabs
  var tabList = document.getElementById("tabs");
  var panelRoot = document.getElementById("panels");
  var tabs = [];
  var panels = {};

  function sampleCard(demo, row, audioColumn) {
    var card = el("article", "sample");
    var meta = el("dl", "sample-meta");
    demo.columns.forEach(function (column) {
      if (column.type === "audio" || column.key === "text" || !row[column.key]) return;
      var dd = el("dd");
      if (column.type === "code") dd.appendChild(el("span", "chip", row[column.key]));
      else fillText(dd, row[column.key]);
      meta.append(el("dt", "label", column.label), dd);
    });
    if (meta.children.length) card.appendChild(meta);
    var text = el("p", "sample-text");
    fillText(text, row.text);
    card.appendChild(text);
    if (row[audioColumn.key]) {
      var player = el("div", "player");
      card.appendChild(player);
      mountPlayer(player, row[audioColumn.key], demo.title.split(":")[0] + " sample");
    }
    return card;
  }

  function matrix(demo, audioColumns) {
    var lead = demo.columns[0];
    var box = el("div", "matrix");
    var head = el("div", "matrix-row matrix-head label");
    head.append(el("span", "", lead.label), el("span", "", "Target Text"));
    audioColumns.forEach(function (c) { head.appendChild(el("span", "", c.label)); });
    box.appendChild(head);
    demo.rows.forEach(function (row) {
      var line = el("div", "matrix-row");
      line.appendChild(el("span", "matrix-lang", row[lead.key]));
      var text = el("p", "matrix-text");
      fillText(text, row.text);
      line.appendChild(text);
      audioColumns.forEach(function (c) {
        var cell = el("div", "matrix-cell");
        cell.appendChild(el("span", "matrix-cell-label", c.label));
        line.appendChild(cell);
        if (!row[c.key]) {
          cell.appendChild(el("span", "", "—"));
          return;
        }
        var player = el("div", "player player-sm");
        cell.appendChild(player);
        mountPlayer(player, row[c.key], row[lead.key] + ", " + c.label);
      });
      box.appendChild(line);
    });
    return box;
  }

  function select(id, focus) {
    if (!panels[id]) return;
    if (current) current.pause();
    tabs.forEach(function (tab) {
      var on = tab.dataset.id === id;
      tab.setAttribute("aria-selected", String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[tab.dataset.id].hidden = !on;
      if (on) {
        if (focus) tab.focus();
        tabList.scrollTo({ left: tab.offsetLeft - (tabList.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
      }
    });
    var panel = panels[id];
    panel.classList.remove("is-entering");
    void panel.offsetWidth;
    panel.classList.add("is-entering");
  }

  DEMOS.forEach(function (demo, i) {
    var name = demo.title.split(": ")[0];
    var headline = demo.title.split(": ").slice(1).join(": ") || demo.title;
    var tab = el("button", "tab");
    tab.append(el("span", "tab-no", String(i + 1).padStart(2, "0")), el("span", "", name));
    tab.type = "button";
    tab.id = "tab-" + demo.id;
    tab.dataset.id = demo.id;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "panel-" + demo.id);
    tab.setAttribute("aria-selected", String(i === 0));
    tab.tabIndex = i === 0 ? 0 : -1;
    tab.addEventListener("click", function () { select(demo.id); });
    tabList.appendChild(tab);
    tabs.push(tab);

    var panel = el("div", "panel");
    panel.id = "panel-" + demo.id;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.hidden = i !== 0;
    var head = el("div", "panel-head");
    head.append(el("h3", "", headline), el("p", "", demo.note || ""));
    panel.appendChild(head);
    var audioColumns = demo.columns.filter(function (c) { return c.type === "audio"; });
    if (audioColumns.length > 1) {
      panel.appendChild(matrix(demo, audioColumns));
    } else {
      var grid = el("div", "samples");
      demo.rows.forEach(function (row) { grid.appendChild(sampleCard(demo, row, audioColumns[0])); });
      panel.appendChild(grid);
    }
    panelRoot.appendChild(panel);
    panels[demo.id] = panel;
  });

  tabList.addEventListener("keydown", function (e) {
    var i = tabs.indexOf(document.activeElement);
    if (i < 0) return;
    var next = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
    if (next == null) return;
    e.preventDefault();
    select(tabs[(next + tabs.length) % tabs.length].dataset.id, true);
  });

  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-tab]");
    if (link) select(link.dataset.tab);
  });

  function routeHash(initial) {
    var id = decodeURIComponent(location.hash.slice(1));
    var target = panels[id] ? document.getElementById("listen") : id && document.getElementById(id);
    if (!target) return;
    if (panels[id]) select(id);
    else if (!initial) return;
    var go = function () {
      target.scrollIntoView({ behavior: initial ? "instant" : "smooth" });
      if (initial) requestAnimationFrame(revealInView);
    };
    // The browser jumps to the fragment before the panels above it are built, and a
    // scroll issued before "load" is undone by its own fragment handling.
    if (initial && document.readyState !== "complete") window.addEventListener("load", go, { once: true });
    else go();
  }
  window.addEventListener("hashchange", function () { routeHash(false); });
  routeHash(true);

  // Demo video
  var frameEl = document.querySelector(".video-frame");
  if (frameEl && video) {
    frameEl.querySelector(".video-play").addEventListener("click", function () {
      video.controls = true;
      video.play().catch(function () {});
    });
    video.addEventListener("play", function () {
      frameEl.classList.add("is-playing");
      video.controls = true;
      if (current) current.pause();
    });
  }

  // Figure zoom
  var dialog = document.getElementById("zoom-dialog");
  var dialogImg = dialog && dialog.querySelector("img");
  document.querySelectorAll("[data-zoom]").forEach(function (button) {
    button.addEventListener("click", function () {
      var img = button.querySelector("img");
      if (!dialog || !dialog.showModal) { window.open(img.src, "_blank", "noopener"); return; }
      dialogImg.src = img.currentSrc || img.src;
      dialogImg.alt = img.alt;
      dialog.showModal();
    });
  });
  if (dialog) {
    dialog.addEventListener("click", function () { dialog.close(); });
  }

  // Download snippet
  var toast = el("div", "toast");
  toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  var toastTimer = 0;
  function notify(message) {
    toast.textContent = message;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-on"); }, 1600);
  }

  var code = document.getElementById("download-code");
  document.querySelectorAll("[data-variant]").forEach(function (button) {
    button.addEventListener("click", function () {
      document.querySelectorAll("[data-variant]").forEach(function (b) { b.setAttribute("aria-pressed", String(b === button)); });
      code.textContent = code.dataset.template.replace(/\{v\}/g, button.dataset.variant);
    });
  });
  function legacyCopy(text) {
    var area = el("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
    document.body.appendChild(area);
    area.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
    area.remove();
    return ok;
  }
  document.querySelectorAll("[data-copy]").forEach(function (button) {
    button.addEventListener("click", function () {
      var text = document.getElementById(button.dataset.copy).textContent;
      var report = function (ok) { notify(ok ? "Copied to clipboard" : "Copy failed; select the text instead"); };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(function () { report(true); }, function () { report(legacyCopy(text)); });
      } else {
        report(legacyCopy(text));
      }
    });
  });

  // Nav and reveal-on-scroll
  var nav = document.getElementById("nav");
  var hero = document.getElementById("top");
  var ticking = false;
  function updateNav() {
    ticking = false;
    var pastHero = hero.getBoundingClientRect().bottom <= nav.offsetHeight;
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
    nav.classList.toggle("is-solid", pastHero);
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(updateNav); }
  }, { passive: true });
  updateNav();
  if ("IntersectionObserver" in window) {
    var reveal = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          reveal.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(function (node) { reveal.observe(node); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (node) { node.classList.add("is-in"); });
  }

  // Jumps made while the page loads can slip past the observer's first pass.
  function revealInView() {
    document.querySelectorAll(".reveal:not(.is-in)").forEach(function (node) {
      var r = node.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) node.classList.add("is-in");
    });
  }
  window.addEventListener("load", function () { requestAnimationFrame(revealInView); });
})();
