(function () {
  const root = document.documentElement;
  const buttons = Array.from(document.querySelectorAll("[data-set-lang]"));
  const storageKey = "ghostty-pages-lang";

  function setLang(lang) {
    const next = lang === "ru" ? "ru" : "en";
    root.dataset.lang = next;
    root.lang = next;

    buttons.forEach((button) => {
      const active = button.getAttribute("data-set-lang") === next;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    try {
      localStorage.setItem(storageKey, next);
    } catch (error) {
      void error;
    }
  }

  let initialLang = root.dataset.lang || "en";
  try {
    initialLang = localStorage.getItem(storageKey) || initialLang;
  } catch (error) {
    void error;
  }

  if (!initialLang && navigator.language) {
    initialLang = navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
  }

  setLang(initialLang);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setLang(button.getAttribute("data-set-lang"));
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
})();
