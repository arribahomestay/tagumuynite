document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item[data-view]");
  const views = {
    dashboard: document.getElementById("view-dashboard"),
    reports: document.getElementById("view-reports"),
    records: document.getElementById("view-records"),
  };
  const title = document.getElementById("viewTitle");
  const subtitle = document.getElementById("viewSubtitle");
  const logoutButtons = document.querySelectorAll(".logout-btn");
  const appBody = document.querySelector(".app-body") || document.body;
  const mobileBottomNav = document.querySelector(".mobile-bottom-nav");
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item[data-view]");
  const accountBtn = document.getElementById("accountBtn");
  const accountDropdown = document.getElementById("accountDropdown");
  const profileItem = document.querySelector(".account-item");

  const subtitles = {
    dashboard: "Overview of your admin panel.",
    reports: "View and manage generated reports.",
    records: "Browse and update your records.",
  };

  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const view = item.getAttribute("data-view");
      if (!view || !views[view]) return;

      navItems.forEach((el) => el.classList.remove("active"));
      item.classList.add("active");

      mobileNavItems.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-view") === view);
      });

      Object.keys(views).forEach((key) => {
        if (key === view) {
          views[key].classList.remove("hidden");
        } else {
          views[key].classList.add("hidden");
        }
      });

      title.textContent = view.charAt(0).toUpperCase() + view.slice(1);
      subtitle.textContent = subtitles[view] || "";
    });
  });

  mobileNavItems.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const view = btn.getAttribute("data-view");
      const targetNav = Array.from(navItems).find((n) => n.getAttribute("data-view") === view);
      if (targetNav) {
        targetNav.click();
      }
    });
  });

  if (logoutButtons && logoutButtons.length > 0) {
    logoutButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = "index.html";
      });
    });
  }

  const applyTheme = (theme) => {
    if (!appBody) return;
    appBody.setAttribute("data-theme", theme);
    document.body?.setAttribute("data-theme", theme);
    localStorage.setItem("tagumTheme", theme);

    const isLight = theme === "light";
    document.querySelectorAll(".theme-label").forEach((el) => {
      el.textContent = isLight ? "Light" : "Dark";
    });
  };

  let storedTheme = localStorage.getItem("tagumTheme");
  if (storedTheme !== "light" && storedTheme !== "dark") {
    storedTheme = "dark";
  }
  applyTheme(storedTheme);

  // Theme toggle (desktop + mobile) using event delegation
  document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest(".theme-toggle");
    if (!toggleBtn) return;
    const current = appBody.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "light" ? "dark" : "light";
    applyTheme(next);
  });

  if (accountBtn && accountDropdown) {
    accountBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      accountDropdown.classList.toggle("open");
    });

    document.addEventListener("click", (e) => {
      if (!accountDropdown.classList.contains("open")) return;
      if (e.target === accountDropdown || accountDropdown.contains(e.target)) return;
      if (e.target === accountBtn || accountBtn.contains(e.target)) return;
      accountDropdown.classList.remove("open");
    });
  }

  if (profileItem) {
    profileItem.addEventListener("click", () => {
      accountDropdown?.classList.remove("open");
      window.location.href = "profile.html";
    });
  }

  // Mobile bottom nav show/hide on scroll direction
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (!mobileBottomNav) return;
    const currentY = window.scrollY;

    const scrollingDown = currentY > lastScrollY + 4;
    const scrollingUp = currentY < lastScrollY - 4;

    if (scrollingDown && currentY > 40) {
      mobileBottomNav.classList.add("hidden");
    } else if (scrollingUp || currentY <= 40) {
      mobileBottomNav.classList.remove("hidden");
    }

    lastScrollY = currentY;
  });
});
