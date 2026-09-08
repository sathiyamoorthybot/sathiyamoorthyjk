/* =========================================================
   Sathiya Moorthy — Portfolio interactions
   ========================================================= */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Always open at the top on reload ----
     Browsers restore the previous scroll offset on refresh, which lands you
     mid-page with the reveal animations already spent. Opt out of that, but
     still honour a real #hash so shared section links keep working. */
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  if (!window.location.hash) {
    window.scrollTo(0, 0);
    // some browsers restore the offset after load fires, so re-assert once
    window.addEventListener("load", function () {
      if (!window.location.hash) window.scrollTo(0, 0);
    });
  }

  /* ---- Nav: frost on scroll, progress bar, hide on scroll-down ---- */
  var nav = document.getElementById("nav");
  var progress = document.querySelector(".scroll-progress");
  var lastY = window.scrollY || 0;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (nav) {
      nav.classList.toggle("scrolled", y > 40);
      // get out of the way going down, come back the moment you scroll up
      var down = y > lastY;
      var far = y > 220;
      if (!calm) nav.classList.toggle("nav--hidden", down && far);
    }

    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }

    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
  }

  /* ---- Reveal on scroll — two-way: things arrive, and they leave ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !calm) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var el = entry.target;

          if (entry.isIntersecting) {
            el.classList.remove("out");
            var delay = el.dataset.delay || 0;
            clearTimeout(el._revealT);
            el._revealT = setTimeout(function () { el.classList.add("in"); }, delay);
            return;
          }

          clearTimeout(el._revealT);

          if (entry.boundingClientRect.top < 0) {
            // scrolled up out of the top — recede upward
            el.classList.remove("in");
            el.classList.add("out");
          } else {
            // still below the fold — reset so it animates in again on the way down
            el.classList.remove("in", "out");
          }
        });
      },
      { threshold: 0, rootMargin: "-8% 0px -12% 0px" }
    );
    reveals.forEach(function (el, i) {
      // small natural stagger inside the same viewport batch
      el.dataset.delay = (i % 4) * 70;
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Animated stat counters ---- */
  var counters = document.querySelectorAll(".stat__num");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var dur = 1600;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      // easeOutExpo
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var cio = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            cio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (c) { cio.observe(c); });
  } else {
    counters.forEach(function (c) {
      c.textContent = c.getAttribute("data-count") + (c.getAttribute("data-suffix") || "");
    });
  }

  /* =======================================================
     Scroll engine — parallax drift + opening fall-away
     One rAF loop, only while the page is actually moving.
     `speed` is px of drift per viewport height of scroll.
     ======================================================= */
  var LAYERS = [
    { sel: ".nle__glow",          speed:  90 },
    { sel: ".nle__portrait",      speed: -30 },
    { sel: ".stat__num",          speed: -22 },
    { sel: ".section__index",     speed: -20 },
    { sel: ".contact__portrait",  speed: -26 },
    // thumbs are clipped by their frame, so drift must stay inside the
    // overscan that --zoom buys us (see .work-video__thumb in the CSS)
    { sel: ".work-video__thumb",  speed:   9 }
  ];

  var layers = [];
  if (!calm) {
    LAYERS.forEach(function (cfg) {
      document.querySelectorAll(cfg.sel).forEach(function (el) {
        layers.push({ el: el, speed: cfg.speed });
      });
    });
  }

  var opening = document.querySelector(".nle__copy");
  var ticking = false, vel = 0, prevY = window.scrollY || 0;

  function frame() {
    var vh = window.innerHeight;
    var y = window.scrollY || window.pageYOffset;

    // scroll velocity, smoothed — gives the drift a touch of momentum
    vel += ((y - prevY) - vel) * 0.18;
    prevY = y;
    var momentum = Math.max(-26, Math.min(26, vel * 0.55));

    for (var i = 0; i < layers.length; i++) {
      var el = layers[i].el;
      var r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;   // off-screen, skip

      // -1 when the element sits a screen below centre, +1 a screen above
      var p = ((r.top + r.height / 2) - vh / 2) / vh;
      p = Math.max(-1.4, Math.min(1.4, p));
      el.style.setProperty("--par-y", (-p * layers[i].speed + momentum * 0.35).toFixed(2) + "px");
    }

    // the opening screen recedes as you leave it
    if (opening) {
      var f = Math.max(0, Math.min(1, y / (vh * 0.72)));
      opening.style.setProperty("--open-fade", (1 - f).toFixed(3));
      opening.style.setProperty("--open-y", (f * -70).toFixed(1) + "px");
    }

    // keep coasting while momentum is still bleeding off
    if (Math.abs(vel) > 0.15) {
      requestAnimationFrame(frame);
    } else {
      vel = 0;
      ticking = false;
    }
  }

  function requestFrame() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(frame);
    }
  }

  if (!calm && (layers.length || opening)) {
    window.addEventListener("scroll", requestFrame, { passive: true });
    window.addEventListener("resize", requestFrame, { passive: true });
    requestFrame();
  }

  /* =======================================================
     Circular dial navigation
     Lays the items out on an arc, then spins the ring so the
     active section's item lands on the 9 o'clock pointer.
     ======================================================= */
  (function dial() {
    var dialEl = document.getElementById("dial");
    var ring = document.getElementById("dialRing");
    if (!dialEl || !ring) return;

    var items = [].slice.call(ring.querySelectorAll(".dial__item"));
    if (!items.length) return;

    // Fan the items across an arc centred on 180deg (pointing left, into
    // the page). 9 o'clock is where the pointer sits.
    // Items span this arc, and the ring spins by up to +/-SPAN/2 to bring
    // the active one to the pointer — so an item's *effective* angle ranges
    // over 180 +/- SPAN. Widen this and the outer items swing far enough
    // toward the screen edge that their labels run off it.
    var SPAN = 44;                         // degrees of arc used
    var CENTRE = 180;
    var step = items.length > 1 ? SPAN / (items.length - 1) : 0;
    // Counting down from CENTRE + SPAN/2 puts item 0 at the TOP: in screen
    // coordinates sin() grows downward, so ascending angles would stack the
    // menu bottom-up and Home would sit under Work.
    var angles = items.map(function (li, i) {
      var a = CENTRE + SPAN / 2 - i * step;
      li.style.setProperty("--a", a + "deg");
      return a;
    });

    // Each item's scroll target, when it has one on this page.
    var targets = items.map(function (li) {
      var href = li.querySelector("a").getAttribute("href") || "";
      var hash = href.indexOf("#");
      if (hash === -1) return null;                 // another page: no section
      var id = href.slice(hash);
      return id.length > 1 ? document.querySelector(id) : null;
    });

    // On a page where one item is the current page (Work on /works/),
    // pin the dial to it — there are no sections to track.
    var pageIndex = items.findIndex(function (li) {
      var h = li.querySelector("a").getAttribute("href");
      return h === "./" || h === "";
    });

    var active = -1;
    function setActive(i) {
      if (i === active || i < 0) return;
      active = i;
      items.forEach(function (li, n) { li.classList.toggle("is-active", n === i); });
      // spin so item i sits at CENTRE (the pointer)
      dialEl.style.setProperty("--spin", (CENTRE - angles[i]) + "deg");
    }

    function pick() {
      // the section whose top has most recently passed the focus line
      var line = window.innerHeight * 0.35;
      var best = -1;
      for (var i = 0; i < targets.length; i++) {
        var el = targets[i];
        if (!el) continue;
        if (el.getBoundingClientRect().top - line <= 0) best = i;
      }
      if (best === -1) best = targets.findIndex(function (t) { return t; });
      setActive(best);
    }

    function begin() {
      if (pageIndex > -1 && !targets.some(function (t) { return t; })) {
        setActive(pageIndex);               // static page: it IS the target
      } else {
        var queued = false;
        var onDialScroll = function () {
          if (queued) return;
          queued = true;
          requestAnimationFrame(function () { queued = false; pick(); });
        };
        window.addEventListener("scroll", onDialScroll, { passive: true });
        pick();
      }
      window.addEventListener("resize", pick, { passive: true });
    }

    // Entrance: park the ring at the far end of its travel, then settle onto
    // the active item on the next frame so the CSS transition plays. Without
    // this the dial only ever visibly turned on pages that have sections to
    // scroll through — /works/ sat frozen. Two frames, so the browser has
    // committed the start value before it changes.
    dialEl.style.setProperty("--spin", (CENTRE - angles[angles.length - 1]) + "deg");
    if (calm) { begin(); }
    else { requestAnimationFrame(function () { requestAnimationFrame(begin); }); }
  })();

  /* ---- Cursor glow (desktop pointers only) ---- */
  var glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(pointer: fine)").matches) {
    var gx = 0, gy = 0, cx = 0, cy = 0, raf;
    window.addEventListener("mousemove", function (e) {
      gx = e.clientX; gy = e.clientY;
      glow.style.opacity = "1";
      if (!raf) loop();
    });
    window.addEventListener("mouseleave", function () { glow.style.opacity = "0"; });
    function loop() {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      glow.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      raf = (Math.abs(gx - cx) > 0.5 || Math.abs(gy - cy) > 0.5)
        ? requestAnimationFrame(loop) : null;
    }
  }

  /* ---- Hold the dial back over the opening screen ----
     The editor window runs the full viewport, so the rail has nothing to
     navigate yet and would only sit on top of the inspector. It slides in
     once the page scrolls on to the sections it points at. ---- */
  (function () {
    var nle = document.querySelector(".nle");
    if (!nle) return;
    document.body.classList.add("dial-off");

    if (!("IntersectionObserver" in window)) {
      document.body.classList.remove("dial-off");
      return;
    }
    // while the opening screen still owns most of the view, stay hidden
    new IntersectionObserver(function (entries) {
      document.body.classList.toggle("dial-off", entries[0].intersectionRatio > 0.55);
    }, { threshold: [0, 0.4, 0.55, 0.7, 1] }).observe(nle);
  })();

  /* ---- Inspector: cycle the role field ----
     One title can't carry fifteen years, so the field runs through them
     the way an NLE steps through a clip's metadata. Pauses off screen. ---- */
  (function () {
    var slot = document.querySelector(".nle__role");
    if (!slot) return;
    var ROLES = [
      "Broadcast Production Specialist",
      "Media Producer",
      "AI-Powered Video Editor",
      "Motion Graphics Artist",
      "Live Event Producer",
      "AI Content Creator",
      "Full Stack Developer",
      "Post-Production Lead"
    ];
    var line = slot.querySelector("span");
    var i = 0, live = true, timer = null;

    function next() {
      slot.classList.add("is-out");
      setTimeout(function () {
        i = (i + 1) % ROLES.length;
        line.textContent = ROLES[i];
        slot.classList.remove("is-out");
      }, 400);                       // matches the CSS transition
      timer = setTimeout(next, 2600);
    }
    function start() { if (!timer) timer = setTimeout(next, 2600); }
    function stop()  { clearTimeout(timer); timer = null; }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        live = entries[0].isIntersecting;
        if (live) start(); else stop();
      }, { threshold: 0 }).observe(slot.closest(".nle"));
    } else {
      start();
    }
  })();

  /* ---- NLE hero: run the timecode with the playhead ----
     The playhead sweeps the timeline on a 15s CSS loop; this counts the
     same 15 seconds out in the viewer so the two read as one transport.
     It only runs while the section is on screen. ---- */
  (function () {
    var tc = document.querySelector(".nle__tc");
    if (!tc) return;
    var SPAN = 15;                       // seconds, matching --nle-play
    var live = true, raf = null, t0 = performance.now();

    function frame(now) {
      var t = ((now - t0) / 1000) % SPAN;
      var f = Math.floor((t % 1) * 24);
      tc.textContent = "00:00:" + pad(Math.floor(t)) + ":" + pad(f);
      raf = live ? requestAnimationFrame(frame) : null;
    }
    function pad(n) { return ("0" + n).slice(-2); }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      tc.textContent = "00:00:05:00";
      return;
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        live = entries[0].isIntersecting;
        if (live && !raf) raf = requestAnimationFrame(frame);
      }, { threshold: 0 }).observe(tc.closest(".nle"));
    } else {
      raf = requestAnimationFrame(frame);
    }
  })();

  /* ---- Smooth-scroll offset for fixed nav ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 64;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });
})();
