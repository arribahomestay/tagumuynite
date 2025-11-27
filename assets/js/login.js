document.addEventListener("DOMContentLoaded", () => {
  const shell = document.querySelector(".login-shell");

  if (shell) {
    window.requestAnimationFrame(() => {
      shell.classList.add("is-visible");
    });
  }

  const form = document.querySelector(".login-form");
  const button = document.querySelector(".login-button");

  if (form && button) {
    form.addEventListener("submit", () => {
      button.classList.add("scale-95");
      setTimeout(() => button.classList.remove("scale-95"), 180);
    });
  }
});
