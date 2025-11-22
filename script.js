document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item[data-view]");
  const views = {
    dashboard: document.getElementById("view-dashboard"),
    reports: document.getElementById("view-reports"),
    records: document.getElementById("view-records"),
  };
  const title = document.getElementById("viewTitle");
  const subtitle = document.getElementById("viewSubtitle");
  const logoutBtn = document.getElementById("logoutBtn");
  const themeToggle = document.getElementById("themeToggle");
  const appBody = document.querySelector(".app-body");

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

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }

  const applyTheme = (theme) => {
    if (!appBody) return;
    appBody.setAttribute("data-theme", theme);
    localStorage.setItem("tagumTheme", theme);
  };

  let storedTheme = localStorage.getItem("tagumTheme");
  if (storedTheme !== "light" && storedTheme !== "dark") {
    storedTheme = "dark";
  }
  applyTheme(storedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = appBody.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }
});
