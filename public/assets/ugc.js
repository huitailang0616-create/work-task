(function () {
  "use strict";

  // ---------- Upload boxes: click, keyboard, drag, local preview ----------
  function wireUpload(boxId, fileId, previewId, removeId) {
    var box = document.getElementById(boxId);
    var file = document.getElementById(fileId);
    var preview = document.getElementById(previewId);
    var remove = document.getElementById(removeId);
    var empty = box.querySelector(".upload-empty");
    var objectUrl = null;

    function show(fileObj) {
      if (!fileObj || !/^image\//.test(fileObj.type)) return;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = URL.createObjectURL(fileObj);
      preview.src = objectUrl;
      preview.hidden = false; remove.hidden = false; empty.style.visibility = "hidden";
    }
    box.addEventListener("click", function (e) { if (e.target !== remove) file.click(); });
    box.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); file.click(); }
    });
    file.addEventListener("change", function () { show(file.files[0]); });
    ["dragover", "dragenter"].forEach(function (ev) {
      box.addEventListener(ev, function (e) { e.preventDefault(); box.classList.add("drag"); });
    });
    ["dragleave", "drop"].forEach(function (ev) {
      box.addEventListener(ev, function (e) { e.preventDefault(); box.classList.remove("drag"); });
    });
    box.addEventListener("drop", function (e) { show(e.dataTransfer.files[0]); });
    remove.addEventListener("click", function (e) {
      e.stopPropagation();
      file.value = ""; preview.hidden = true; remove.hidden = true; empty.style.visibility = "visible";
      if (objectUrl) { URL.revokeObjectURL(objectUrl); objectUrl = null; }
    });
    return { hasImage: function () { return !preview.hidden; } };
  }
  var product = wireUpload("productUpload", "productFile", "productPreview", "productRemove");
  wireUpload("avatarUpload", "avatarFile", "avatarPreview", "avatarRemove");

  // ---------- Prompt counter ----------
  var prompt = document.getElementById("promptInput");
  var promptCount = document.getElementById("promptCount");
  prompt.addEventListener("input", function () { promptCount.textContent = String(prompt.value.length); });

  // ---------- Segmented / pill groups (single-select) ----------
  var state = { resolution: "720P", duration: "5s", outputs: "1", ratio: "Auto" };
  document.querySelectorAll("[data-group]").forEach(function (group) {
    group.addEventListener("click", function (e) {
      var btn = e.target.closest("button"); if (!btn) return;
      group.querySelectorAll("button").forEach(function (b) {
        b.classList.remove("is-active"); b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("is-active"); btn.setAttribute("aria-checked", "true");
      state[group.dataset.group] = btn.dataset.value;
    });
  });

  // ---------- Audio toggle ----------
  var audioOn = true;
  var audioSwitch = document.getElementById("audioSwitch");
  audioSwitch.addEventListener("click", function () {
    audioOn = !audioOn;
    audioSwitch.classList.toggle("is-on", audioOn);
    audioSwitch.setAttribute("aria-checked", String(audioOn));
  });

  // ---------- Tabs: History / Inspiration ----------
  var tabs = document.querySelectorAll(".tab");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.classList.remove("is-active"); t.setAttribute("aria-selected", "false"); });
      tab.classList.add("is-active"); tab.setAttribute("aria-selected", "true");
      document.getElementById("pane-history").hidden = tab.dataset.tab !== "history";
      document.getElementById("pane-inspiration").hidden = tab.dataset.tab !== "inspiration";
    });
  });

  // ---------- Inspiration cards (placeholder art + sample prompts) ----------
  var inspo = [
    { title: "Kitchen unboxing", tag: "Product demo", prompt: "A creator unboxes the product at a bright kitchen table, reacts honestly, and shows the texture up close.", g: "linear-gradient(130deg,#f59e0b,#ec4899)" },
    { title: "Morning routine", tag: "Testimonial", prompt: "A presenter films a selfie-style morning routine and works the product into step two, talking to camera throughout.", g: "linear-gradient(130deg,#22d3ee,#8b5cf6)" },
    { title: "Before / after", tag: "E-commerce", prompt: "Split-style UGC: a messy desk before, the product in use, then a clean result shot with a happy reaction.", g: "linear-gradient(130deg,#34d399,#0ea5e9)" },
    { title: "Street review", tag: "Social ad", prompt: "Handheld street-style clip: the creator stops, shows the product to camera, and gives a 10-second honest review.", g: "linear-gradient(130deg,#f43f5e,#f59e0b)" }
  ];
  var inspoGrid = document.getElementById("inspoGrid");
  inspo.forEach(function (item) {
    var card = document.createElement("button");
    card.type = "button"; card.className = "inspo-card";
    card.innerHTML = '<div class="inspo-thumb" style="background:' + item.g + '"></div>' +
      '<div class="inspo-body"><strong></strong><span></span></div>';
    card.querySelector("strong").textContent = item.title;
    card.querySelector("span").textContent = item.tag + " · Use prompt";
    card.addEventListener("click", function () {
      prompt.value = item.prompt;
      prompt.dispatchEvent(new Event("input"));
      document.querySelector('.tab[data-tab="history"]').click();
      prompt.focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    inspoGrid.appendChild(card);
  });

  // ---------- FAQ accordion ----------
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var panel = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (o) {
        o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight = null;
        o.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // ---------- Generate: simulated loading + result placeholders ----------
  var generateBtn = document.getElementById("generateBtn");
  var emptyState = document.getElementById("emptyState");
  var loadingState = document.getElementById("loadingState");
  var loadingText = document.getElementById("loadingText");
  var progressBar = document.getElementById("progressBar");
  var resultsGrid = document.getElementById("resultsGrid");
  var historyList = document.getElementById("historyList");
  var genNote = document.getElementById("genNote");
  var stages = ["Analyzing product image…", "Writing UGC script…", "Directing creator performance…", "Rendering frames…", "Polishing captions & audio…"];
  var gradients = ["linear-gradient(140deg,#8b5cf6,#ec4899)", "linear-gradient(140deg,#22d3ee,#8b5cf6)", "linear-gradient(140deg,#f59e0b,#f43f5e)", "linear-gradient(140deg,#34d399,#22d3ee)"];
  var runCount = 0;

  generateBtn.addEventListener("click", function () {
    runCount += 1;
    var myRun = runCount;
    var n = parseInt(state.outputs, 10) || 1;
    var lang = document.getElementById("langSelect").value;
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating…";
    genNote.textContent = product.hasImage()
      ? "Simulating a run with your settings — still no real API call."
      : "Tip: no product image uploaded — the mock run still works with prompt only.";
    emptyState.hidden = true;
    resultsGrid.innerHTML = "";
    loadingState.hidden = false;
    progressBar.style.width = "0%";

    var stageIdx = 0;
    loadingText.textContent = stages[0];
    var stageTimer = setInterval(function () {
      stageIdx = Math.min(stageIdx + 1, stages.length - 1);
      loadingText.textContent = stages[stageIdx];
    }, 650);
    var progress = 0;
    var progressTimer = setInterval(function () {
      progress = Math.min(progress + Math.random() * 14 + 4, 96);
      progressBar.style.width = progress + "%";
    }, 300);

    setTimeout(function () {
      clearInterval(stageTimer); clearInterval(progressTimer);
      progressBar.style.width = "100%";
      setTimeout(function () {
        if (myRun !== runCount) return;
        loadingState.hidden = true;
        for (var i = 0; i < n; i++) {
          var card = document.createElement("div");
          card.className = "result-card";
          card.innerHTML = '<div class="result-thumb" style="background:' + gradients[i % gradients.length] + '">▶</div>' +
            '<div class="result-meta"><strong>UGC ad #' + myRun + "-" + (i + 1) + '</strong>' +
            state.ratio + " · " + state.resolution + " · " + state.duration + (audioOn ? " · audio on" : " · muted") + "</div>";
          resultsGrid.appendChild(card);
        }
        var emptyLi = historyList.querySelector(".history-empty");
        if (emptyLi) emptyLi.remove();
        var li = document.createElement("li");
        var snippet = (prompt.value.trim() || "(no prompt)").slice(0, 60);
        li.innerHTML = "<strong>Run #" + myRun + "</strong> · " + n + " output(s) · " + lang + " · " + state.ratio + " — ";
        li.appendChild(document.createTextNode(snippet));
        historyList.prepend(li);
        generateBtn.disabled = false;
        generateBtn.textContent = "Generate";
      }, 350);
    }, 3400);
  });
})();
