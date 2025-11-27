document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("sidebar-root");
  if (!root) return;

  fetch("sidebar.html")
    .then((res) => res.text())
    .then((html) => {
      root.innerHTML = html;

      const body = document.body;
      const currentPage = body.getAttribute("data-page") || "dashboard";
      const links = root.querySelectorAll("[data-page-link]");

      links.forEach((link) => {
        const page = link.getAttribute("data-page-link");
        if (page === currentPage) {
          link.classList.add("sidebar-link--active");
        }
      });
    })
    .catch(() => {
      // fail silently
    });
});
