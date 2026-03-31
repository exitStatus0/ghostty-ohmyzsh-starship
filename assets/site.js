(function () {
  // --- Copy button for code blocks ---
  function addCopyButtons() {
    document.querySelectorAll(".prose pre").forEach(function (pre) {
      if (pre.querySelector(".copy-btn")) return;
      var btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        var code = pre.querySelector("code");
        if (!code) return;
        var text = code.textContent || "";
        navigator.clipboard.writeText(text).then(function () {
          btn.textContent = "Copied!";
          btn.classList.add("copied");
          setTimeout(function () {
            btn.textContent = "Copy";
            btn.classList.remove("copied");
          }, 2000);
        });
      });
      pre.appendChild(btn);
    });
  }

  // --- Markdown renderer ---
  function renderMarkdown(md) {
    var lines = md.replace(/\r/g, "").split("\n");
    var html = "";
    var inCode = false;
    var codeLang = "";
    var codeLines = [];
    var listType = null;
    var listItems = [];
    var paraLines = [];
    var quoteLines = [];
    var headingIdx = 0;

    function flush() {
      flushPara();
      flushList();
      flushQuote();
    }

    function flushPara() {
      if (!paraLines.length) return;
      var p = paraLines.map(function (l) { return l.trim(); }).join(" ").trim();
      if (p) html += "<p>" + inline(p) + "</p>";
      paraLines = [];
    }

    function flushList() {
      if (!listType || !listItems.length) return;
      html += "<" + listType + ">" +
        listItems.map(function (it) { return "<li>" + inline(it) + "</li>"; }).join("") +
        "</" + listType + ">";
      listType = null;
      listItems = [];
    }

    function flushQuote() {
      if (!quoteLines.length) return;
      var q = quoteLines.map(function (l) { return l.trim(); }).join(" ").trim();
      html += "<blockquote>" + inline(q) + "</blockquote>";
      quoteLines = [];
    }

    function flushCode() {
      if (!inCode) return;
      var label = codeLang
        ? '<span class="code-lang">' + esc(codeLang) + "</span>"
        : "";
      html += "<pre><code>" + label + esc(codeLines.join("\n")) + "</code></pre>";
      inCode = false;
      codeLang = "";
      codeLines = [];
    }

    lines.forEach(function (raw) {
      var trimmed = raw.trim();

      if (trimmed.startsWith("```")) {
        flush();
        if (inCode) { flushCode(); }
        else { inCode = true; codeLang = trimmed.slice(3).trim(); codeLines = []; }
        return;
      }
      if (inCode) { codeLines.push(raw); return; }

      if (!trimmed) { flush(); return; }
      if (/^---+$/.test(trimmed)) { flush(); html += "<hr>"; return; }

      if (trimmed.startsWith(">")) {
        flushPara(); flushList();
        quoteLines.push(trimmed.replace(/^>\s?/, ""));
        return;
      }

      var hm = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (hm) {
        flush();
        var lvl = hm[1].length;
        headingIdx++;
        var id = "s-" + headingIdx;
        html += "<h" + lvl + ' id="' + id + '">' + inline(hm[2].trim()) + "</h" + lvl + ">";
        return;
      }

      var ol = trimmed.match(/^\d+\.\s+(.*)$/);
      if (ol) {
        flushPara(); flushQuote();
        if (listType && listType !== "ol") flushList();
        listType = "ol";
        listItems.push(ol[1]);
        return;
      }

      var ul = trimmed.match(/^[-*]\s+(.*)$/);
      if (ul) {
        flushPara(); flushQuote();
        if (listType && listType !== "ul") flushList();
        listType = "ul";
        listItems.push(ul[1]);
        return;
      }

      flushList(); flushQuote();
      paraLines.push(raw);
    });

    flush(); flushCode();
    return html;
  }

  function inline(t) {
    var h = esc(t);
    h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, url) {
      return '<a href="' + url.replace(/"/g, "%22") + '">' + label + "</a>";
    });
    h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
    h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    h = h.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    return h;
  }

  function esc(v) {
    return v
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // --- TOC builder ---
  function buildToc(root, mount) {
    if (!mount) return;
    var headings = Array.from(root.querySelectorAll("h1, h2, h3"));
    if (!headings.length) return;

    mount.innerHTML = headings.map(function (h) {
      var level = h.tagName.replace("H", "");
      return '<a href="#' + h.id + '" data-level="' + level + '">' + (h.textContent || "") + "</a>";
    }).join("");
  }

  // --- TOC active tracking ---
  function trackTocActive() {
    var tocLinks = document.querySelectorAll("[data-markdown-toc] a");
    if (!tocLinks.length) return;

    var headings = [];
    tocLinks.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      var el = document.getElementById(id);
      if (el) headings.push({ el: el, link: a });
    });

    function update() {
      var scrollY = window.scrollY + 100;
      var current = null;
      headings.forEach(function (h) {
        if (h.el.offsetTop <= scrollY) current = h;
      });
      tocLinks.forEach(function (a) { a.classList.remove("active"); });
      if (current) current.link.classList.add("active");
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  // --- Init markdown pages ---
  var page = document.querySelector("[data-markdown-source]");
  if (page) {
    var source = page.getAttribute("data-markdown-source");
    var content = document.querySelector("[data-markdown-content]");
    var toc = document.querySelector("[data-markdown-toc]");
    var status = document.querySelector("[data-markdown-status]");

    if (source && content) {
      fetch(source)
        .then(function (r) {
          if (!r.ok) throw new Error("Failed to load " + source);
          return r.text();
        })
        .then(function (md) {
          content.innerHTML = renderMarkdown(md);
          if (status) status.remove();
          buildToc(content, toc);
          addCopyButtons();
          trackTocActive();
        })
        .catch(function (err) {
          if (status) status.textContent = err.message;
        });
    }
  } else {
    addCopyButtons();
  }
})();
