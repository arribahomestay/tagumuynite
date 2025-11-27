document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector(".login-shell");

  if (shell) {
    window.requestAnimationFrame(() => {
      shell.classList.add("is-visible");
    });
  }

  const form = document.querySelector(".login-form");

  if (form) {
    form.addEventListener("submit", () => {
      // keep default Tailwind hover/focus styles; no extra pop animation
    });
  }

  // Theme toggle (light / dark) for login page
  const body = document.body;
  const toggle = document.querySelector(".login-theme-toggle");
  const logo = document.getElementById("login-logo");

  if (!body || !toggle || !logo) return;

  const THEME_KEY = "login-theme";

  const applyTheme = (theme) => {
    const next = theme === "light" ? "light" : "dark";
    body.setAttribute("data-theme", next);

    // Smooth background/text transition
    body.classList.add("login-theme-transition");
    window.setTimeout(() => body.classList.remove("login-theme-transition"), 250);

    // Smooth logo swap
    logo.classList.add("login-logo-fade");
    const targetSrc = next === "light"
      ? "../assets/images/TAGUM_LIGHT.png"
      : "../assets/images/TAGUM_DARK.png";

    window.setTimeout(() => {
      logo.setAttribute("src", targetSrc);
      logo.classList.remove("login-logo-fade");
    }, 140);
  };

  const storedTheme = window.localStorage.getItem(THEME_KEY);
  if (storedTheme) {
    applyTheme(storedTheme);
  } else {
    applyTheme(body.getAttribute("data-theme") || "dark");
  }

  toggle.addEventListener("click", () => {
    const current = body.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
    window.localStorage.setItem(THEME_KEY, next);
  });
});
