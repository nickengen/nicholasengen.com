document.addEventListener("DOMContentLoaded", () => {
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