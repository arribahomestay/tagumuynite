document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector(".dash-shell");
  if (shell) {
    window.requestAnimationFrame(() => shell.classList.add("is-visible"));
  }

  const body = document.body;
  const toggle = document.querySelector(".dash-theme-toggle");
  const accountBtn = document.getElementById("dashAccountBtn");
  const accountMenu = document.getElementById("dashAccountMenu");

  if (!body || !toggle || !accountBtn || !accountMenu) return;

  const THEME_KEY = "login-theme"; // share theme with login page

  const applyTheme = (theme) => {
    const next = theme === "light" ? "light" : "dark";
    body.setAttribute("data-theme", next);

    body.classList.add("dash-theme-transition");
    window.setTimeout(() => body.classList.remove("dash-theme-transition"), 250);
  };

  const storedTheme = window.localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    applyTheme(body.getAttribute("data-theme") || "dark");
  }

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const current = body.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    window.localStorage.setItem(THEME_KEY, next);
  });

  // Account dropdown toggle
  accountBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    accountMenu.classList.toggle("hidden");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    if (!accountMenu.classList.contains("hidden")) {
      accountMenu.classList.add("hidden");
    }
  });
});
