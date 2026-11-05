/* Topview homepage clone v2 — interactions mirrored from the original's
   markup: sticky glass header + nav dropdowns, composer mode tabs with a
   rotating placeholder, skill-chip marquee, community prompt tabs that load
   prompts into the composer, FAQ accordion, scroll reveals.
   The "send" action runs a clearly-labelled front-end simulation only. */
(function () {
  "use strict";

  /* Header shadow on scroll */
  var header = document.getElementById("siteHeader");
  window.addEventListener("scroll", function () {
    header.style.boxShadow = window.scrollY > 8 ? "0 16px 42px rgba(0,0,0,.45)" : "0 16px 42px rgba(0,0,0,.18)";
  }, { passive: true });

  /* Mobile nav */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", function () {
    var open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  /* Nav dropdowns (click to toggle, one at a time, Esc/outside closes) */
  var dropItems = Array.prototype.slice.call(document.querySelectorAll(".nav-item.has-drop"));
  dropItems.forEach(function (item) {
    var btn = item.querySelector(".drop-btn");
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var wasOpen = item.classList.contains("open");
      dropItems.forEach(function (i) { i.classList.remove("open"); i.querySelector(".drop-btn").setAttribute("aria-expanded", "false"); });
      if (!wasOpen) { item.classList.add("open"); btn.setAttribute("aria-expanded", "true"); }
    });
  });
  document.addEventListener("click", function () {
    dropItems.forEach(function (i) { i.classList.remove("open"); i.querySelector(".drop-btn").setAttribute("aria-expanded", "false"); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") document.dispatchEvent(new Event("click")); });

  /* Duplicate marquee tracks for a seamless loop */
  document.querySelectorAll(".marquee-track").forEach(function (track) {
    track.innerHTML += track.innerHTML;
  });

  /* Composer: mode tabs */
  var input = document.getElementById("composerInput");
  var modeTabs = Array.prototype.slice.call(document.querySelectorAll(".mode-tab"));
  var modePlaceholders = {
    "Video Agent": "Ask Topview to create a UGC-style product ad",
    "Drama Studio": "Turn your story idea into a mini film…",
    "AI Video": "Describe the video you want to generate…",
    "AI Image": "Describe the image you want to create…"
  };
  var currentMode = "Video Agent";
  modeTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      modeTabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      currentMode = tab.getAttribute("data-mode");
      input.placeholder = modePlaceholders[currentMode];
      input.focus();
    });
  });

  /* Rotating placeholder (pauses while the user types or focuses) */
  var rotating = [
    "Ask Topview to create a UGC-style product ad",
    "Ask Topview to make a 30-second launch video",
    "Ask Topview to create a 90-second cinematic short film",
    "Ask Topview to remake a viral video for your product",
    "Ask Topview to turn raw clips into a viral Reel",
    "Ask Topview to design a premium product poster"
  ];
  var rotIdx = 0, rotTimer = null;
  function startRotation() {
    stopRotation();
    rotTimer = setInterval(function () {
      if (currentMode !== "Video Agent" || input.value) return;
      rotIdx = (rotIdx + 1) % rotating.length;
      input.placeholder = rotating[rotIdx];
    }, 3400);
  }
  function stopRotation() { if (rotTimer) clearInterval(rotTimer); rotTimer = null; }
  input.addEventListener("focus", stopRotation);
  input.addEventListener("blur", startRotation);
  startRotation();

  /* Model / agent selectors cycle through the original's named options */
  function cyclePill(id, options) {
    var el = document.getElementById(id);
    var idx = 0;
    el.addEventListener("click", function () {
      idx = (idx + 1) % options.length;
      el.innerHTML = options[idx] + ' <span class="chev">▾</span>';
    });
  }
  cyclePill("modelSelect", ["Seedance 2.5", "Seedance 2.0", "Topview T1", "Wan 3.0", "MiniMax H3"]);
  cyclePill("agentSelect", ["GPT-6 Luna", "GPT-6 Astra"]);

  /* Upload button forwards to the hidden file input (name shows in composer) */
  var uploadBtn = document.getElementById("uploadBtn");
  var fileInput = document.getElementById("composerFile");
  uploadBtn.addEventListener("click", function () { fileInput.click(); });
  fileInput.addEventListener("change", function () {
    if (fileInput.files && fileInput.files[0]) {
      input.value = "Use my uploaded file “" + fileInput.files[0].name + "” as the reference and ";
      input.focus();
    }
  });

  /* Send → simulated agent plan */
  var sendBtn = document.getElementById("sendBtn");
  var planSim = document.getElementById("planSim");
  var planStatus = document.getElementById("planStatus");
  var planMode = document.getElementById("planMode");
  var steps = Array.prototype.slice.call(planSim.querySelectorAll("[data-step]"));
  var simTimers = [];
  sendBtn.addEventListener("click", function () {
    simTimers.forEach(clearTimeout); simTimers = [];
    planMode.textContent = currentMode;
    planSim.hidden = false;
    steps.forEach(function (li) { li.className = ""; });
    planStatus.textContent = "Planning…";
    steps.forEach(function (li, i) {
      simTimers.push(setTimeout(function () {
        steps.forEach(function (o, j) { o.className = j < i ? "done" : (j === i ? "doing" : ""); });
        planStatus.textContent = "Step " + (i + 1) + " of " + steps.length + "…";
      }, 450 * (i + 1)));
    });
    simTimers.push(setTimeout(function () {
      steps.forEach(function (li) { li.className = "done"; });
      planStatus.textContent = "Demo plan ready — sign up on the real Topview to generate.";
    }, 450 * (steps.length + 1)));
    planSim.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  /* Community prompt tabs */
  var prompts = {
    marketing: ["create a UGC-style product ad.", "make a 30-second launch video.", "build a conversion-focused promo video"],
    film: ["create a 90-second cinematic short film.", "turn your story idea into a mini film.", "make a dialogue-free emotional short"],
    clone: ["remake a viral video for your product.", "clone the pacing of a reference video.", "adapt a competitor ad to your brand"],
    social: ["turn raw clips into a viral Reel.", "make a TikTok-ready short video.", "create a punchy vertical video"],
    image: ["design a premium product poster.", "create a bold campaign key visual.", "generate a clean social graphic."]
  };
  var promptGrid = document.getElementById("promptGrid");
  function renderPrompts(cat) {
    promptGrid.innerHTML = "";
    prompts[cat].forEach(function (text) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "prompt-card";
      btn.innerHTML = "<p></p><span>Use this prompt ›</span>";
      btn.querySelector("p").textContent = text;
      btn.addEventListener("click", function () {
        input.value = text.charAt(0).toUpperCase() + text.slice(1);
        document.getElementById("creator").scrollIntoView({ behavior: "smooth", block: "center" });
        input.focus();
      });
      promptGrid.appendChild(btn);
    });
  }
  var catTabs = Array.prototype.slice.call(document.querySelectorAll(".cat-tab"));
  catTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      catTabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderPrompts(tab.getAttribute("data-cat"));
    });
  });
  renderPrompts("marketing");

  /* FAQ accordion (single-open) */
  var faqItems = Array.prototype.slice.call(document.querySelectorAll(".faq-item"));
  faqItems.forEach(function (item) {
    var q = item.querySelector(".faq-q");
    q.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      faqItems.forEach(function (i) { i.classList.remove("open"); i.querySelector(".faq-q").setAttribute("aria-expanded", "false"); });
      if (!isOpen) { item.classList.add("open"); q.setAttribute("aria-expanded", "true"); }
    });
  });

  /* Scroll reveal */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
})();
