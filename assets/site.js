(function () {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.12,
    },
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    revealObserver.observe(element);
  });

  const page = document.querySelector("[data-markdown-source]");
  if (!page) {
    return;
  }

  const source = page.getAttribute("data-markdown-source");
  const content = document.querySelector("[data-markdown-content]");
  const toc = document.querySelector("[data-markdown-toc]");
  const status = document.querySelector("[data-markdown-status]");

  if (!source || !content) {
    return;
  }

  fetch(source)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load markdown source.");
      }

      return response.text();
    })
    .then((markdown) => {
      content.innerHTML = renderMarkdown(markdown);
      if (status) {
        status.remove();
      }
      buildToc(content, toc);
    })
    .catch((error) => {
      if (status) {
        status.textContent = error.message;
      }
    });

  function buildToc(root, mount) {
    if (!mount) {
      return;
    }

    const headings = Array.from(root.querySelectorAll("h2, h3"));
    if (!headings.length) {
      mount.innerHTML = '<p class="muted">No sections available.</p>';
      return;
    }

    mount.innerHTML = headings
      .map((heading) => {
        const level = heading.tagName === "H2" ? "2" : "3";
        return (
          '<a href="#' +
          heading.id +
          '" data-level="' +
          level +
          '">' +
          escapeHtml(heading.textContent || "") +
          "</a>"
        );
      })
      .join("");
  }

  function renderMarkdown(markdown) {
    const lines = markdown.replace(/\r/g, "").split("\n");
    let html = "";
    let inCode = false;
    let codeLang = "";
    let codeLines = [];
    let listType = null;
    let listItems = [];
    let paragraphLines = [];
    let quoteLines = [];
    let firstH1Seen = false;
    let headingIndex = 0;

    function flushParagraph() {
      if (!paragraphLines.length) {
        return;
      }

      const paragraph = paragraphLines
        .map((line) => line.trim())
        .join(" ")
        .replace(/\s{2,}/g, " ")
        .trim();

      if (paragraph) {
        html += "<p>" + parseInline(paragraph) + "</p>";
      }

      paragraphLines = [];
    }

    function flushList() {
      if (!listType || !listItems.length) {
        return;
      }

      html +=
        "<" +
        listType +
        ">" +
        listItems.map((item) => "<li>" + parseInline(item) + "</li>").join("") +
        "</" +
        listType +
        ">";
      listType = null;
      listItems = [];
    }

    function flushQuote() {
      if (!quoteLines.length) {
        return;
      }

      const quote = quoteLines
        .map((line) => line.trim())
        .join(" ")
        .trim();
      html += "<blockquote>" + parseInline(quote) + "</blockquote>";
      quoteLines = [];
    }

    function flushCode() {
      if (!inCode) {
        return;
      }

      const label = codeLang
        ? '<div class="muted" style="margin-bottom: 10px; font-size: 0.82rem;">' +
          escapeHtml(codeLang) +
          "</div>"
        : "";
      html += "<pre>" + label + "<code>" + escapeHtml(codeLines.join("\n")) + "</code></pre>";
      inCode = false;
      codeLang = "";
      codeLines = [];
    }

    lines.forEach((rawLine) => {
      const line = rawLine;
      const trimmed = line.trim();

      if (trimmed.startsWith("```")) {
        flushParagraph();
        flushList();
        flushQuote();

        if (inCode) {
          flushCode();
        } else {
          inCode = true;
          codeLang = trimmed.slice(3).trim();
          codeLines = [];
        }

        return;
      }

      if (inCode) {
        codeLines.push(line);
        return;
      }

      if (!trimmed) {
        flushParagraph();
        flushList();
        flushQuote();
        return;
      }

      if (/^---+$/.test(trimmed)) {
        flushParagraph();
        flushList();
        flushQuote();
        html += "<hr>";
        return;
      }

      if (trimmed.startsWith(">")) {
        flushParagraph();
        flushList();
        quoteLines.push(trimmed.replace(/^>\s?/, ""));
        return;
      }

      const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        flushParagraph();
        flushList();
        flushQuote();

        let level = headingMatch[1].length;
        const text = headingMatch[2].trim();

        if (level === 1 && !firstH1Seen) {
          firstH1Seen = true;
          return;
        }

        if (level === 1) {
          level = 2;
        }

        headingIndex += 1;
        const id = "section-" + headingIndex;
        html += "<h" + level + ' id="' + id + '">' + parseInline(text) + "</h" + level + ">";
        return;
      }

      const orderedMatch = trimmed.match(/^\d+\.\s+(.*)$/);
      if (orderedMatch) {
        flushParagraph();
        flushQuote();

        if (listType && listType !== "ol") {
          flushList();
        }

        listType = "ol";
        listItems.push(orderedMatch[1]);
        return;
      }

      const unorderedMatch = trimmed.match(/^[-*]\s+(.*)$/);
      if (unorderedMatch) {
        flushParagraph();
        flushQuote();

        if (listType && listType !== "ul") {
          flushList();
        }

        listType = "ul";
        listItems.push(unorderedMatch[1]);
        return;
      }

      flushList();
      flushQuote();
      paragraphLines.push(line);
    });

    flushParagraph();
    flushList();
    flushQuote();
    flushCode();

    return html;
  }

  function parseInline(text) {
    let html = escapeHtml(text);

    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (_, label, url) {
      return '<a href="' + sanitizeUrl(url) + '">' + escapeHtml(label) + "</a>";
    });

    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

    return html;
  }

  function sanitizeUrl(url) {
    return url.replace(/"/g, "%22");
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }
})();
