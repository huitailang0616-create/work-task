/* LumeFlow UGC Ads clone v2 — controls and option sets taken from the
   original's served JS bundles (see RECON/lume-recon.md):
   - Models: Seedance 2.0 (default) and Pixverse V6, each with its own
     resolution list; duration is a 4s–15s slider (every whole second).
   - Create is disabled until a product image and a non-empty prompt exist
     (the original's rule for this page type).
   - Credits use the original's Seedance 2.0 price table (coins per second:
     480P 12, 720P 28, 1080P 78) × duration × outputs. Pixverse pricing was
     not recoverable from source, so credits show "–" for that model.
   Generation itself is a front-end simulation; no API is called. */
(function () {
  "use strict";

  var LANGUAGES = ["English", "日本語", "繁體中文", "한국어", "Deutsch", "Español", "Français", "Italiano", "العربية", "Bahasa Indonesia", "Русский", "Português", "हिन्दी", "বাংলা", "Tiếng Việt", "ไทย"];
  var MODELS = {
    seedance: {
      name: "Seedance 2.0",
      desc: "Create cinematic ad videos with smooth motion and realistic visuals.",
      icon: "/assets/img/lume/model-icon-seedance.png",
      resolutions: ["480P", "720P", "1080P"],
      defaultResolution: "480P",
      ratios: ["Auto", "16:9", "4:3", "1:1", "3:4", "9:16", "21:9"],
      defaultRatio: "Auto",
      pricePerSec: { "480P": 12, "720P": 28, "1080P": 78 }
    },
    pixverse: {
      name: "Pixverse V6",
      desc: "Generate engaging marketing videos with dynamic effects and fast results.",
      icon: "/assets/img/lume/model-icon-pixverse.svg",
      resolutions: ["360P", "540P", "720P", "1080P"],
      defaultResolution: "360P",
      ratios: ["16:9", "4:3", "1:1", "3:4", "9:16", "21:9", "3:2", "2:3"],
      defaultRatio: "9:16",
      pricePerSec: null
    }
  };
  var RATIO_ICON = { "Auto": [28, 16], "16:9": [28, 16], "4:3": [28, 21], "1:1": [24, 24], "3:4": [18, 24], "9:16": [16, 28], "21:9": [28, 12], "3:2": [27, 18], "2:3": [18, 27] };

  var state = {
    model: "seedance",
    product: "",       // object URL or preset path; "" = none
    avatar: "",
    prompt: "",
    language: "English",
    resolution: "480P",
    duration: 5,
    ratio: "Auto",
    audio: true,
    outputs: 1
  };

  function $(id) { return document.getElementById(id); }
  var productUpload = $("productUpload"), avatarUpload = $("avatarUpload");
  var productFile = $("productFile"), avatarFile = $("avatarFile");
  var productPreview = $("productPreview"), avatarPreview = $("avatarPreview");
  var productRemove = $("productRemove"), avatarRemove = $("avatarRemove");
  var promptInput = $("promptInput"), promptCount = $("promptCount");
  var createBtn = $("createBtn"), creditsValue = $("creditsValue");

  /* ---------- generic segmented control ---------- */
  function buildTabs(container, values, current, onPick) {
    container.innerHTML = "";
    values.forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = v;
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(v === current));
      if (v === current) b.className = "is-active";
      b.addEventListener("click", function () { onPick(v); });
      container.appendChild(b);
    });
  }
  function buildRatios(container, values, current, onPick) {
    container.innerHTML = "";
    values.forEach(function (v) {
      var b = document.createElement("button");
      b.type = "button"; b.className = "size-btn" + (v === current ? " is-active" : "");
      b.setAttribute("role", "radio");
      b.setAttribute("aria-checked", String(v === current));
      var dims = RATIO_ICON[v] || [24, 16];
      b.innerHTML = '<span class="ratio-icon" style="width:' + dims[0] + 'px;height:' + dims[1] + 'px"></span>' + v;
      b.addEventListener("click", function () { onPick(v); });
      container.appendChild(b);
    });
  }

  var resBox = document.querySelector('[data-group="resolution"]');
  var ratioBox = document.querySelector('[data-group="ratio"]');
  var outBox = document.querySelector('[data-group="outputs"]');

  function refreshControls() {
    var m = MODELS[state.model];
    buildTabs(resBox, m.resolutions, state.resolution, function (v) { state.resolution = v; refreshControls(); });
    buildRatios(ratioBox, m.ratios, state.ratio, function (v) { state.ratio = v; refreshControls(); });
    updateCredits();
  }
  outBox.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    state.outputs = parseInt(b.getAttribute("data-value"), 10);
    outBox.querySelectorAll("button").forEach(function (o) {
      var on = o === b; o.classList.toggle("is-active", on); o.setAttribute("aria-checked", String(on));
    });
    updateCredits();
  });

  /* ---------- credits ---------- */
  function updateCredits() {
    var m = MODELS[state.model];
    if (!m.pricePerSec) { creditsValue.textContent = "–"; return; }
    creditsValue.textContent = String(m.pricePerSec[state.resolution] * state.duration * state.outputs);
  }

  /* ---------- create enable rule (original: product + prompt required) ---------- */
  function updateCreateState() {
    createBtn.disabled = !(state.product && state.prompt.trim());
  }

  /* ---------- uploads ---------- */
  function wireUpload(box, file, preview, removeBtn, key) {
    function open() { file.click(); }
    box.addEventListener("click", function (e) { if (e.target !== removeBtn) open(); });
    box.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    ["dragover", "dragenter"].forEach(function (ev) { box.addEventListener(ev, function (e) { e.preventDefault(); box.style.borderColor = "#8846ff"; }); });
    ["dragleave", "drop"].forEach(function (ev) { box.addEventListener(ev, function (e) { e.preventDefault(); box.style.borderColor = ""; }); });
    box.addEventListener("drop", function (e) {
      var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
      if (f) setImage(f);
    });
    file.addEventListener("change", function () { if (file.files && file.files[0]) setImage(file.files[0]); });
    function setImage(f) {
      if (state[key] && state[key].indexOf("blob:") === 0) URL.revokeObjectURL(state[key]);
      state[key] = URL.createObjectURL(f);
      preview.src = state[key]; preview.hidden = false; removeBtn.hidden = false;
      box.querySelector(".upload-empty").style.visibility = "hidden";
      updateCreateState();
    }
    removeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      if (state[key] && state[key].indexOf("blob:") === 0) URL.revokeObjectURL(state[key]);
      state[key] = ""; preview.hidden = true; removeBtn.hidden = true; file.value = "";
      box.querySelector(".upload-empty").style.visibility = "";
      updateCreateState();
    });
  }
  wireUpload(productUpload, productFile, productPreview, productRemove, "product");
  wireUpload(avatarUpload, avatarFile, avatarPreview, avatarRemove, "avatar");

  /* ---------- prompt ---------- */
  promptInput.addEventListener("input", function () {
    state.prompt = promptInput.value;
    promptCount.textContent = String(promptInput.value.length);
    updateCreateState();
  });

  /* ---------- language (form select + header menu share the locale list) ---------- */
  var langSelect = $("langSelect");
  LANGUAGES.forEach(function (l) {
    var o = document.createElement("option"); o.textContent = l; o.value = l; langSelect.appendChild(o);
  });
  langSelect.addEventListener("change", function () { state.language = langSelect.value; syncHeaderLang(); });
  var headerLangBtn = $("headerLangBtn"), headerLangMenu = $("headerLangMenu");
  LANGUAGES.forEach(function (l) {
    var b = document.createElement("button"); b.type = "button"; b.textContent = l;
    b.addEventListener("click", function () {
      state.language = l; langSelect.value = l; syncHeaderLang();
      headerLangMenu.hidden = true; headerLangBtn.setAttribute("aria-expanded", "false");
    });
    headerLangMenu.appendChild(b);
  });
  function syncHeaderLang() {
    headerLangBtn.innerHTML = '<img src="/assets/img/lume/language-icon.svg" alt="" width="16" height="16"> ' + state.language + " ▾";
  }
  headerLangBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = headerLangMenu.hidden;
    headerLangMenu.hidden = !open;
    headerLangBtn.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", function () { headerLangMenu.hidden = true; });

  /* ---------- model select ---------- */
  var modelCurrent = $("modelCurrent"), modelPanel = $("modelPanel");
  modelCurrent.addEventListener("click", function (e) {
    e.stopPropagation();
    var open = modelPanel.hidden;
    modelPanel.hidden = !open;
    modelCurrent.setAttribute("aria-expanded", String(open));
  });
  document.addEventListener("click", function () { modelPanel.hidden = true; });
  modelPanel.querySelectorAll(".model-row").forEach(function (row) {
    row.addEventListener("click", function () {
      var key = row.getAttribute("data-model");
      state.model = key;
      var m = MODELS[key];
      $("modelName").textContent = m.name;
      $("modelDesc").textContent = m.desc;
      $("modelIcon").src = m.icon;
      state.resolution = m.defaultResolution;
      state.ratio = m.defaultRatio;
      modelPanel.querySelectorAll(".model-row").forEach(function (r) { r.classList.toggle("is-active", r === row); });
      modelPanel.hidden = true;
      refreshControls();
    });
  });

  /* ---------- duration slider + stepper ---------- */
  var slider = $("durSlider"), durValue = $("durValue");
  function setDuration(v) {
    state.duration = Math.min(15, Math.max(4, v));
    slider.value = String(state.duration);
    durValue.textContent = state.duration + "s";
    updateCredits();
  }
  slider.addEventListener("input", function () { setDuration(parseInt(slider.value, 10)); });
  $("durMinus").addEventListener("click", function () { setDuration(state.duration - 1); });
  $("durPlus").addEventListener("click", function () { setDuration(state.duration + 1); });

  /* ---------- audio switch ---------- */
  var audioSwitch = $("audioSwitch");
  audioSwitch.addEventListener("click", function () {
    state.audio = !state.audio;
    audioSwitch.classList.toggle("is-on", state.audio);
    audioSwitch.setAttribute("aria-checked", String(state.audio));
  });

  /* ---------- stage tabs ---------- */
  var stageTabs = Array.prototype.slice.call(document.querySelectorAll(".stage-tab"));
  function showTab(name) {
    stageTabs.forEach(function (t) {
      var on = t.getAttribute("data-tab") === name;
      t.classList.toggle("is-active", on); t.setAttribute("aria-selected", String(on));
    });
    $("historyPane").hidden = name !== "history";
    $("inspirationPane").hidden = name !== "inspiration";
  }
  stageTabs.forEach(function (t) { t.addEventListener("click", function () { showTab(t.getAttribute("data-tab")); }); });
  document.querySelectorAll("[data-goto-tab]").forEach(function (a) {
    a.addEventListener("click", function () { showTab(a.getAttribute("data-goto-tab")); });
  });

  /* ---------- inspiration ---------- */
  var inspoGrid = $("inspoGrid");
  (window.INSPIRATION_ITEMS || []).forEach(function (item) {
    var card = document.createElement("article");
    card.className = "inspo-card";
    var img = document.createElement("img");
    img.src = item.thumb; img.alt = item.name; img.loading = "lazy";
    card.appendChild(img);
    var tryBtn = document.createElement("button");
    tryBtn.type = "button"; tryBtn.className = "inspo-try"; tryBtn.textContent = "try this";
    card.appendChild(tryBtn);
    var shade = document.createElement("div");
    shade.className = "inspo-shade";
    shade.innerHTML = '<span class="inspo-name"></span><span class="inspo-hot">🔥 ' + (item.hot || "") + "</span>";
    shade.querySelector(".inspo-name").textContent = item.name;
    card.appendChild(shade);
    function apply() {
      promptInput.value = item.prompt || "";
      promptInput.dispatchEvent(new Event("input"));
      if (state.product && state.product.indexOf("blob:") === 0) URL.revokeObjectURL(state.product);
      state.product = item.thumb;
      productPreview.src = item.thumb; productPreview.hidden = false; productRemove.hidden = false;
      productUpload.querySelector(".upload-empty").style.visibility = "hidden";
      updateCreateState();
      document.querySelector(".form-col").scrollIntoView({ behavior: "smooth", block: "start" });
    }
    tryBtn.addEventListener("click", function (e) { e.stopPropagation(); apply(); });
    card.addEventListener("click", apply);
    inspoGrid.appendChild(card);
  });

  /* ---------- create (simulation) ---------- */
  var progressBox = $("progressBox"), progressBar = $("progressBar"), progressText = $("progressText");
  var emptyHero = $("emptyHero"), historyList = $("historyList");
  var timers = [];
  function runGeneration() {
    showTab("history");
    emptyHero.hidden = true;
    progressBox.hidden = false;
    progressBar.style.width = "0%";
    var stages = ["Analyzing product image…", "Planning scenes…", "Generating video…", "Adding audio & captions…"];
    stages.forEach(function (s, i) {
      timers.push(setTimeout(function () {
        progressText.textContent = s;
        progressBar.style.width = String(Math.round(((i + 1) / stages.length) * 100)) + "%";
      }, 700 * i));
    });
    timers.push(setTimeout(finishGeneration, 700 * stages.length + 500));
  }
  function finishGeneration() {
    progressBox.hidden = true;
    var m = MODELS[state.model];
    for (var i = 0; i < state.outputs; i++) {
      var li = document.createElement("li");
      li.className = "history-item";
      var img = document.createElement("img");
      img.src = state.product; img.alt = "Generated UGC ad (simulation)";
      li.appendChild(img);
      var meta = document.createElement("div");
      meta.className = "history-meta";
      meta.innerHTML = "<p></p><small></small>";
      meta.querySelector("p").textContent = state.prompt;
      meta.querySelector("small").textContent = [m.name, state.resolution, state.duration + "s", state.ratio, state.language, state.audio ? "Audio on" : "Audio off", "simulated result"].join(" · ");
      li.appendChild(meta);
      var actions = document.createElement("div");
      actions.className = "history-actions";
      ["Reprompt", "Regenerate", "Download", "Enhance", "Delete"].forEach(function (label) {
        var b = document.createElement("button");
        b.type = "button"; b.textContent = label;
        b.addEventListener("click", function () {
          if (label === "Delete") { li.remove(); if (!historyList.children.length) emptyHero.hidden = false; }
          else if (label === "Reprompt") { promptInput.focus(); promptInput.scrollIntoView({ behavior: "smooth", block: "center" }); }
          else if (label === "Regenerate") { runGeneration(); }
          else { b.textContent = label + " (sim)"; setTimeout(function () { b.textContent = label; }, 1200); }
        });
        actions.appendChild(b);
      });
      li.appendChild(actions);
      historyList.prepend(li);
    }
  }
  createBtn.addEventListener("click", function () {
    timers.forEach(clearTimeout); timers = [];
    runGeneration();
  });

  refreshControls();
  setDuration(5);
  updateCreateState();
})();
