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
    org: "Trends & Tactics",
    vertical: true
  },
  {
    id: "48SAF4I4Q2o",
    title: "Digital Onam — Festive Greeting",
    category: "Branding",
    org: "Trends & Tactics",
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

  var cats = ["All", "Horizontal", "Vertical"];

  if (filters && cats.length > 2) {
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
      return !filter || filter === "All" || orient(v) === filter;
    });
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
     ======================================================= */
  var box, stage, capTitle, capMeta, capOrg, btnPrev, btnNext, lastFocus;
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
        '<button class="vbox__nav vbox__nav--prev" type="button" aria-label="Previous video">&#10094;</button>' +
        '<button class="vbox__nav vbox__nav--next" type="button" aria-label="Next video">&#10095;</button>' +
        '<div class="vbox__stage"></div>' +
        '<div class="vbox__cap">' +
          '<h3 class="vbox__title"></h3>' +
          '<span class="vbox__meta"></span>' +
          '<span class="vbox__org"></span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(box);

    stage    = box.querySelector(".vbox__stage");
    capTitle = box.querySelector(".vbox__title");
    capMeta  = box.querySelector(".vbox__meta");
    capOrg   = box.querySelector(".vbox__org");
    btnPrev  = box.querySelector(".vbox__nav--prev");
    btnNext  = box.querySelector(".vbox__nav--next");

    box.querySelector(".vbox__close").addEventListener("click", closeLightbox);
    btnPrev.addEventListener("click", function () { step(-1); });
    btnNext.addEventListener("click", function () { step(1); });

    // click the backdrop (but not the player or caption) to close
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("vbox__inner")) closeLightbox();
    });

    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
  }

  function load(v) {
    var iframe = document.createElement("iframe");
    iframe.src =
      "https://www.youtube-nocookie.com/embed/" + v.id + "?autoplay=1&rel=0&modestbranding=1&playsinline=1";
    iframe.title = v.title;
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
    stage.classList.toggle("vbox__stage--v", !!v.vertical);
    stage.innerHTML = "";
    stage.appendChild(iframe);

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
    stage.innerHTML = "";          // stops playback
    current = -1;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function step(dir) {
    if (shown.length < 2 || current < 0) return;
    current = (current + dir + shown.length) % shown.length;
    load(shown[current]);
  }

  render("All");
})();
