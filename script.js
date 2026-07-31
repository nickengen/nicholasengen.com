document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const executiveLoader = document.getElementById("executiveLoader");

  if (root.classList.contains("loader-pending") && executiveLoader) {
    window.setTimeout(() => {
      executiveLoader.classList.add("is-exiting");
      root.classList.remove("loader-pending");
      root.classList.add("loader-seen");
      window.setTimeout(() => executiveLoader.remove(), 560);
    }, 1050);
  } else {
    executiveLoader?.remove();
  }

  const menuButton = document.getElementById("menuButton");
  const siteNav = document.getElementById("siteNav");

  menuButton?.addEventListener("click", () => {
    const open = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  siteNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuButton?.setAttribute("aria-expanded", "false");
    });
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});