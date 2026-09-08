/* =========================================================
   My Work — video gallery
   ---------------------------------------------------------
   TO ADD A VIDEO: copy a block into the VIDEOS array below.
     id       → the YouTube video id
                  watch?v=speON60btHE          -> "speON60btHE"
                  youtu.be/speON60btHE         -> "speON60btHE"
                  shorts/o2l9FGAK8m4?feature=  -> "o2l9FGAK8m4"
     title    → shown under the video
     category → drives the filter tabs. Reuse an existing one to group.
     org      → (optional) network / client / project
     vertical → true for Shorts / 9:16 reels. This switches the card to a
                portrait frame and pulls the full-height "oar2" thumbnail
                (hqdefault letterboxes vertical video), and makes the
                lightbox open a portrait stage instead of 16:9.
   Newest first looks best — add new entries at the top.
   ========================================================= */
/* Titles are hidden in the UI for now (the YouTube names aren't
   presentation-ready). They stay in the data and on aria-label /
   iframe title, so screen readers and tooltips still identify each
   video. Flip this to true to show them again. */
var SHOW_TITLES = false;

var VIDEOS = [
  /* ---- Long-form: broadcast, promos, events ---- */
  {
    id: "VQlEfBkqDl8",
    title: "Be10x Podcast — Naveen, Official Trailer",
    category: "Promos",
    org: "Be10x"
  },
  {
    id: "pIPbKqhWl1c",
    title: "Perplexity — Aravind Srinivas on the Roadmap",
    category: "Promos"
  },
  {
    id: "kFVHbOVcAmI",
    title: "Testimonial — AI B-Roll Edit",
    category: "AI Content"
  },
  {
    id: "-qQHpSSHRcU",
    title: "AITV — App Intro Video",
    category: "AI Content"
  },
  {
    id: "NJxjFIKqqgk",
    title: "Non Stop 100 News — On-Air Promo",
    category: "Broadcast",
    org: "News 7 Tamil"
  },
  {
    id: "2XqlV6hWFvs",
    title: "Sunil Chhetri in Conversation with Sadhguru",
    category: "Promos",
    org: "Isha Foundation"
  },
  {
    id: "ys53vuD0S3s",
    title: "Cauvery Calling — Action Now to Save Cauvery",
    category: "Promos",
    org: "Isha Foundation"
  },
  {
    id: "Opod30CE3eM",
    title: "Empower — Promo 01",
    category: "Promos"
  },
  {
    id: "sZ49AHF_nfU",
    title: "Youth and Truth — A Month Unplugged",
    category: "Events",
    org: "Isha Foundation"
  },
  {
    id: "Il71m_iQwHM",
    title: "Kamban Kazhagam — Official Trailer",
    category: "Films"
  },

  /* ---- Vertical: ads, motion graphics, branding reels ---- */
  {
    id: "3IbjFIJ5KuE",
    title: "AI for Content Creators",
    category: "AI Content",
    vertical: true
  },
  {
    id: "ymQrn_z7uFs",
    title: "Stock Market Ad 03",
    category: "Ads",
    vertical: true
  },
  {
    id: "39YnxK1r-jo",
    title: "Perplexity — 1 Out of 10",
    category: "AI Content",
    vertical: true
  },
  {
    id: "7_xegQ0zLIw",
    title: "AITV — AI-Presented Ad 12",
    category: "AI Content",
    vertical: true
  },
  {
    id: "qwB3tylCwRA",
    title: "In 5 Years, 1 Person = A Million-Dollar Company",
    category: "AI Content",
    vertical: true
  },
  {
    id: "Yo6eTZl8ROg",
    title: "HR Team Replaced by One Person + One AI Tool",
    category: "AI Content",
    vertical: true
  },
  {
    id: "G_kQ6J2fv0g",
    title: "The CA Who Automated His Own Job",
    category: "AI Content",
    vertical: true
  },
  {
    id: "oPGPvqAj_4k",
    title: "AITV — AI-Presented Ad 10",
    category: "AI Content",
    vertical: true
  },
  {
    id: "hCor4hoYBtA",
    title: "AITV — AI-Presented Ad 09",
    category: "AI Content",
    vertical: true
  },
  {
    id: "XFabdJ1g_0s",
    title: "AITV — AI-Presented Ad 08",
    category: "AI Content",
    vertical: true
  },
  {
    id: "qjgW09V-0w8",
    title: "AITV — AI-Presented Ad 07",
    category: "AI Content",
    vertical: true
  },
  {
    id: "JoO2-ihga_U",
    title: "85 Million Jobs Displaced by AI",
    category: "AI Content",
    vertical: true
  },
  {
    id: "mnPDQnSPwbo",
    title: "AITV — AI-Presented Ad 04",
    category: "AI Content",
    vertical: true
  },
  {
    id: "thIaac5OBKU",
    title: "Be10x — Ad 06",
    category: "Ads",
    vertical: true
  },
  {
    id: "_DkUG_BTeZU",
    title: "Instagram Reel 01",
    category: "Social Reels",
    vertical: true
  },
  {
    id: "R4dD97BQPTA",
    title: "Instagram Reel 02",
    category: "Social Reels",
    vertical: true
  },
  {
    id: "f8Gut6f833A",
    title: "Instagram Reel 03",
    category: "Social Reels",
    vertical: true
  },
  {
    id: "mVaAM8WoVW4",
    title: "Instagram Reel 04",
    category: "Social Reels",
    vertical: true
  },
  {
    id: "f7MfvTTCRRE",
    title: "Instagram Reel 05",
    category: "Social Reels",
    vertical: true
  },
  {
    id: "V2cCfvwIAos",
    title: "Instagram Reel 06",
    category: "Social Reels",
    vertical: true
  },
  {
    id: "o2l9FGAK8m4",
    title: "AITV — AI-Presented Ad 03",
    category: "AI Content",
    vertical: true
  },
  {
    id: "2sAEeeS0qJQ",
    title: "Digital Asset Wave — Motion Graphics Ad 02",
    category: "Motion Graphics",
    vertical: true
  },
  {
    id: "aayahYaFRgo",
    title: "Every Bottleneck Is You — Motion Graphics Ad 01",
    category: "Motion Graphics",
    vertical: true
  },
  {
    id: "ZvzKDriDs3s",
    title: "Stock Market Ad 02",
    category: "Ads",
    vertical: true
  },
  {
    id: "5uVZgHWgxnM",
    title: "Stock Market Ad 01",
    category: "Ads",
    vertical: true
  },
  {
    id: "5bXic7mAalY",
    title: "Make Your Brand Stand Out — Branding Reel",
    category: "Branding",
    vertical: true
  },
  {
    id: "48SAF4I4Q2o",
    title: "Digital Onam — Festive Greeting",
    category: "Branding",
    vertical: true
  }
];

(function () {
  "use strict";

  var grid = document.getElementById("worksGrid");
  var filters = document.getElementById("worksFilters");
  var emptyState = document.getElementById("worksEmpty");
  if (!grid) return;

  /* ---- Empty state ---- */
  if (!VIDEOS.length) {
    if (emptyState) emptyState.hidden = false;
    return;
  }

  /* ---- Filter by orientation ----
     The tabs sort by shape, not subject: one row of 16:9 work, one of
     9:16. Each video's content category (Promos, Ads, Motion Graphics…)
     still rides along on the card as its tag — it's just no longer a
     filter, so the tab row stays to three. */
  function orient(v) { return v.vertical ? "Vertical" : "Horizontal"; }

  var cats = ["Horizontal", "Vertical"];

  if (filters && cats.length > 1) {
    cats.forEach(function (cat, i) {
      var btn = document.createElement("button");
      btn.className = "works-filter" + (i === 0 ? " is-active" : "");
      btn.textContent = cat;
      btn.dataset.cat = cat;
      filters.appendChild(btn);
    });
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest(".works-filter");
      if (!btn) return;
      filters.querySelectorAll(".works-filter").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      render(btn.dataset.cat);
    });
  }

  /* ---- Render cards ---- */
  function render(filter) {
    grid.innerHTML = "";
    shown = VIDEOS.filter(function (v) {
      return orient(v) === filter;
    });
    grid.classList.toggle("works-grid--v", filter === "Vertical");
    shown.forEach(function (v) {
      grid.appendChild(card(v));
    });
  }

  function card(v) {
    var fig = document.createElement("figure");
    fig.className = "work-video reveal in" + (v.vertical ? " work-video--v" : "");

    var frame = document.createElement("button");
    frame.className = "work-video__frame";
    frame.type = "button";
    frame.setAttribute("aria-label", "Play: " + v.title);

    var thumb = document.createElement("img");
    thumb.className = "work-video__thumb";
    thumb.loading = "lazy";
    thumb.alt = v.title;
    // "oar2" is the original-aspect frame — the only one that isn't
    // letterboxed for a 9:16 Short. It 404s on landscape video, so it is
    // only ever requested for verticals, with hqdefault as the fallback.
    thumb.src = v.vertical
      ? "https://i.ytimg.com/vi/" + v.id + "/oar2.jpg"
      : "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
    thumb.onerror = function () {
      thumb.onerror = function () {
        thumb.onerror = null;
        thumb.src = "https://i.ytimg.com/vi/" + v.id + "/mqdefault.jpg";
      };
      thumb.src = "https://i.ytimg.com/vi/" + v.id + "/hqdefault.jpg";
    };

    var play = document.createElement("span");
    play.className = "work-video__play";
    play.innerHTML = "&#9654;";

    frame.appendChild(thumb);
    frame.appendChild(play);

    frame.addEventListener("click", function () {
      openLightbox(v);
    });

    var cap = document.createElement("figcaption");
    cap.className = "work-video__cap";
    var meta =
      (v.category ? '<span class="work-video__tag">' + v.category + "</span>" : "") +
      (v.org ? '<span class="work-video__org">' + v.org + "</span>" : "");
    cap.innerHTML =
      '<div class="work-video__meta">' + meta + "</div>" +
      (SHOW_TITLES ? '<h3 class="work-video__title">' + v.title + "</h3>" : "");

    fig.appendChild(frame);
    fig.appendChild(cap);
    return fig;
  }

  /* =======================================================
     Lightbox — click a thumb, the video maximizes on the page
     -------------------------------------------------------
     The embed runs with controls=0, so YouTube draws no chrome at all:
     no title/channel header across the top, no Shorts watermark and
     link card along the bottom. What replaces it is the small control
     layer below — a click-anywhere play/pause shield, a seek bar and a
     fullscreen toggle — driven over postMessage with enablejsapi=1.
     ======================================================= */
  var box, stage, screen, shield, bar, seek, seekFill, timeEl, btnFs,
      capTitle, capMeta, capOrg, btnPrev, btnNext, lastFocus;
  var frame = null;      // the live <iframe>
  var playing = false, duration = 0, position = 0, scrubbing = false;
  var current = -1;      // index into `shown`
  var shown = [];        // videos currently visible in the grid

  function buildLightbox() {
    box = document.createElement("div");
    box.className = "vbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Video player");
    box.innerHTML =
      '<div class="vbox__inner">' +
        '<button class="vbox__close" type="button" aria-label="Close video">&#10005;</button>' +
        '<div class="vbox__row">' +
          '<button class="vbox__nav vbox__nav--prev" type="button" aria-label="Previous video">&#10094;</button>' +
          '<div class="vbox__stage">' +
            '<div class="vbox__screen"></div>' +
            '<button class="vbox__shield" type="button" aria-label="Play or pause"></button>' +
            '<span class="vbox__toggle" aria-hidden="true"></span>' +
            '<div class="vbox__bar">' +
              '<div class="vbox__seek"><span class="vbox__seek-fill"></span></div>' +
              '<span class="vbox__time">0:00 / 0:00</span>' +
              '<button class="vbox__fs" type="button" aria-label="Fullscreen">&#9974;</button>' +
            '</div>' +
          '</div>' +
          '<button class="vbox__nav vbox__nav--next" type="button" aria-label="Next video">&#10095;</button>' +
        '</div>' +
        '<div class="vbox__cap">' +
          '<h3 class="vbox__title"></h3>' +
          '<span class="vbox__meta"></span>' +
          '<span class="vbox__org"></span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(box);

    stage    = box.querySelector(".vbox__stage");
    screen   = box.querySelector(".vbox__screen");
    shield   = box.querySelector(".vbox__shield");
    bar      = box.querySelector(".vbox__bar");
    seek     = box.querySelector(".vbox__seek");
    seekFill = box.querySelector(".vbox__seek-fill");
    timeEl   = box.querySelector(".vbox__time");
    btnFs    = box.querySelector(".vbox__fs");
    capTitle = box.querySelector(".vbox__title");
    capMeta  = box.querySelector(".vbox__meta");
    capOrg   = box.querySelector(".vbox__org");
    btnPrev  = box.querySelector(".vbox__nav--prev");
    btnNext  = box.querySelector(".vbox__nav--next");

    box.querySelector(".vbox__close").addEventListener("click", closeLightbox);
    btnPrev.addEventListener("click", function () { step(-1); });
    btnNext.addEventListener("click", function () { step(1); });
    shield.addEventListener("click", toggle);
    btnFs.addEventListener("click", fullscreen);
    seek.addEventListener("pointerdown", function (e) {
      scrubbing = true;
      seek.setPointerCapture(e.pointerId);
      scrub(e);
    });
    seek.addEventListener("pointermove", function (e) { if (scrubbing) scrub(e); });
    seek.addEventListener("pointerup", function (e) {
      if (!scrubbing) return;
      scrubbing = false;
      cmd("seekTo", [position, true]);
    });

    // click the backdrop (but not the player or caption) to close
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("vbox__inner") ||
          e.target.classList.contains("vbox__row")) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === " " || e.key === "k") { e.preventDefault(); toggle(); }
    });

    window.addEventListener("message", onPlayerMessage);
  }

  /* ---- talking to the embed ---- */
  function cmd(func, args) {
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(
      JSON.stringify({ event: "command", func: func, args: args || [] }), "*");
  }

  function onPlayerMessage(e) {
    if (!frame || e.source !== frame.contentWindow) return;
    var d;
    try { d = JSON.parse(e.data); } catch (err) { return; }
    if (!d || d.event !== "infoDelivery" || !d.info) return;
    var info = d.info;
    if (typeof info.playerState === "number") {
      playing = info.playerState === 1 || info.playerState === 3;
      stage.classList.toggle("is-playing", playing);
      // -1 unstarted / 5 cued: YouTube still draws its own poster button,
      // so ours stays out of the way until the clip has actually started
      stage.classList.toggle("is-idle", info.playerState === -1 || info.playerState === 5);
    }
    if (typeof info.duration === "number" && info.duration > 0) duration = info.duration;
    if (typeof info.currentTime === "number" && !scrubbing) {
      position = info.currentTime;
      paint();
    }
  }

  function paint() {
    var pct = duration ? Math.min(100, (position / duration) * 100) : 0;
    seekFill.style.width = pct + "%";
    timeEl.textContent = clock(position) + " / " + clock(duration);
  }

  function clock(s) {
    s = Math.max(0, Math.floor(s || 0));
    return Math.floor(s / 60) + ":" + ("0" + (s % 60)).slice(-2);
  }

  function toggle() { cmd(playing ? "pauseVideo" : "playVideo"); }

  function scrub(e) {
    if (!duration) return;
    var r = seek.getBoundingClientRect();
    position = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * duration;
    paint();
  }

  function fullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (stage.requestFullscreen) stage.requestFullscreen();
  }

  function load(v) {
    frame = document.createElement("iframe");
    // controls=0 strips every piece of YouTube chrome — the channel/title
    // header and, on Shorts, the bottom watermark and link card.
    frame.src =
      "https://www.youtube-nocookie.com/embed/" + v.id +
      "?autoplay=1&controls=0&rel=0&modestbranding=1&iv_load_policy=3" +
      "&playsinline=1&fs=0&enablejsapi=1&origin=" + encodeURIComponent(location.origin);
    frame.title = v.title;
    frame.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    frame.addEventListener("load", function () {
      // opt in to the player's state/time broadcasts
      frame.contentWindow.postMessage(
        JSON.stringify({ event: "listening", id: 1, channel: "widget" }), "*");
    });

    playing = false; duration = 0; position = 0; scrubbing = false;
    stage.classList.remove("is-playing");
    stage.classList.add("is-idle");
    stage.classList.toggle("vbox__stage--v", !!v.vertical);
    screen.innerHTML = "";
    screen.appendChild(frame);
    paint();

    capTitle.textContent = SHOW_TITLES ? (v.title || "") : "";
    capTitle.hidden = !SHOW_TITLES;
    capMeta.textContent = v.category || "";
    capOrg.textContent = v.org || "";

    var many = shown.length > 1;
    btnPrev.hidden = !many;
    btnNext.hidden = !many;
  }

  function openLightbox(v) {
    if (!box) buildLightbox();
    current = shown.indexOf(v);
    lastFocus = document.activeElement;
    load(v);
    document.body.classList.add("vbox-open");
    // next frame, so the opening transition actually runs
    requestAnimationFrame(function () { box.classList.add("is-open"); });
    box.querySelector(".vbox__close").focus();
  }

  function closeLightbox() {
    box.classList.remove("is-open");
    document.body.classList.remove("vbox-open");
    screen.innerHTML = "";         // stops playback
    frame = null;
    current = -1;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(dir) {
    if (shown.length < 2 || current < 0) return;
    current = (current + dir + shown.length) % shown.length;
    load(shown[current]);
  }

  render(cats[0]);
})();
