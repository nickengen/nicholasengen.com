<!-- =========================
File: script.js
========================= -->
document.addEventListener("DOMContentLoaded", () => {
  const SITE_CONFIG = {
    email: "nicholas@engenix.co",
    resumePath: "assets/Nicholas-Engen-Resume.pdf"
  };

  const bootScreen = document.getElementById("boot-screen");
  const bootStatus = document.getElementById("bootStatus");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const revealItems = document.querySelectorAll(".reveal");
  const counters = document.querySelectorAll(".counter");
  const navLinks = document.querySelectorAll(".nav-menu a[href^='#']");
  const sections = document.querySelectorAll("main section[id]");
  const resumeModal = document.getElementById("resumeModal");
  const openResumeModal = document.getElementById("openResumeModal");
  const openResumeModalSecondary = document.getElementById("openResumeModalSecondary");
  const closeResumeModal = document.getElementById("closeResumeModal");
  const emailLink = document.getElementById("emailLink");
  const emailValue = document.getElementById("emailValue");
  const resumeDownloadLink = document.getElementById("resumeDownloadLink");
  const resumePreviewLink = document.getElementById("resumePreviewLink");

  const bootMessages = [
    "Initializing executive profile...",
    "Loading performance dashboard...",
    "Syncing leadership signals...",
    "Executive OS ready."
  ];

  let bootMessageIndex = 0;

  const applyContactConfig = () => {
    if (emailLink && emailValue) {
      const isPlaceholder = SITE_CONFIG.email === "nicholas@engenix.co";
      emailValue.textContent = isPlaceholder ? "nicholas@engenix.co" : SITE_CONFIG.email;
      emailLink.href = isPlaceholder ? "#" : `mailto:${SITE_CONFIG.email}`;
      emailLink.setAttribute("aria-disabled", String(isPlaceholder));
    }

    if (resumeDownloadLink) {
      resumeDownloadLink.href = SITE_CONFIG.resumePath;
      resumeDownloadLink.setAttribute("download", "Nicholas-Engen-Resume.pdf");
    }

    if (resumePreviewLink) {
      resumePreviewLink.href = SITE_CONFIG.resumePath;
    }
  };

  applyContactConfig();

  const bootMessageTimer = window.setInterval(() => {
    bootMessageIndex += 1;
    if (bootStatus && bootMessageIndex < bootMessages.length) {
      bootStatus.textContent = bootMessages[bootMessageIndex];
    }
  }, 650);

  window.setTimeout(() => {
    window.clearInterval(bootMessageTimer);
    if (bootScreen) {
      bootScreen.classList.add("is-hidden");
    }
  }, 2800);

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      menuToggle.classList.toggle("is-active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        menuToggle.classList.remove("is-active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const target = document.querySelector(href);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const animateCounter = (element) => {
    const target = Number(element.dataset.target);
    if (!Number.isFinite(target)) {
      return;
    }

    const duration = 1300;
    const start = performance.now();

    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(target * eased));

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((counter) => counterObserver.observe(counter));

  const activateNav = () => {
    let currentId = "";

    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
    });
  };

  const openModal = () => {
    if (!resumeModal) {
      return;
    }

    resumeModal.classList.add("is-open");
    resumeModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    if (!resumeModal) {
      return;
    }

    resumeModal.classList.remove("is-open");
    resumeModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  [openResumeModal, openResumeModalSecondary].forEach((button) => {
    if (!button) {
      return;
    }

    button.addEventListener("click", openModal);
  });

  if (closeResumeModal) {
    closeResumeModal.addEventListener("click", closeModal);
  }

  if (resumeModal) {
    resumeModal.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.dataset.closeModal === "true") {
        closeModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });

  activateNav();
  window.addEventListener("scroll", activateNav, { passive: true });
  window.addEventListener("resize", activateNav);
});
