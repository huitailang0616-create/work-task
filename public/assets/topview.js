(function () {
  "use strict";

  // Sticky header state
  var header = document.getElementById("siteHeader");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", function () {
    var open = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  mainNav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  // Scroll-reveal animation
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // FAQ accordion: single open item
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Creator box: char count, mode tabs, suggestion chips
  var input = document.getElementById("ideaInput");
  var count = document.getElementById("charCount");
  input.addEventListener("input", function () { count.textContent = String(input.value.length); });

  var placeholders = {
    idea: "Describe your idea… e.g. a 30-second vertical drama about a florist who receives a note from her future self",
    script: "Paste or outline your script… the agent will break it into scenes, characters and shots",
    url: "Paste a product URL… the agent will turn it into a video ad draft",
    reference: "Describe the reference video… pacing, hook and shot structure you want to recreate"
  };
  document.querySelectorAll(".chip-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      document.querySelectorAll(".chip-tab").forEach(function (t) { t.classList.remove("is-active"); });
      tab.classList.add("is-active");
      input.placeholder = placeholders[tab.dataset.mode] || placeholders.idea;
      input.focus();
    });
  });
  document.querySelectorAll(".tool-btn[data-fill]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      input.value = btn.dataset.fill;
      input.dispatchEvent(new Event("input"));
      input.focus();
    });
  });

  // Create button: simulated agent plan (front-end only)
  var createBtn = document.getElementById("createBtn");
  var planSim = document.getElementById("planSim");
  var planStatus = document.getElementById("planStatus");
  var steps = Array.prototype.slice.call(planSim.querySelectorAll("[data-step]"));
  var timers = [];
  createBtn.addEventListener("click", function () {
    timers.forEach(clearTimeout); timers = [];
    planSim.hidden = false;
    steps.forEach(function (s) { s.classList.remove("active", "done"); });
    planStatus.textContent = input.value.trim() ? "Planning your project…" : "Planning a demo project…";
    createBtn.disabled = true; createBtn.textContent = "Working…";
    steps.forEach(function (step, i) {
      timers.push(setTimeout(function () {
        if (i > 0) { steps[i - 1].classList.remove("active"); steps[i - 1].classList.add("done"); }
        step.classList.add("active");
      }, 450 * (i + 1)));
    });
    timers.push(setTimeout(function () {
      steps[steps.length - 1].classList.remove("active");
      steps[steps.length - 1].classList.add("done");
      planStatus.textContent = "Plan ready — open Canvas to edit every shot (demo).";
      createBtn.disabled = false; createBtn.textContent = "Create video";
      planSim.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 450 * (steps.length + 1)));
  });
})();
