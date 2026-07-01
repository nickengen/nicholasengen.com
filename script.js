document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Smooth Scroll
    // ==========================

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            const menu = document.getElementById("navMenu");

            if (menu) {
                menu.classList.remove("open");
            }

        });

    });

    // ==========================
    // Sticky Navigation
    // ==========================

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (!nav) return;

        if (window.scrollY > 20) {

            nav.style.background = "rgba(255,255,255,.95)";
            nav.style.backdropFilter = "blur(16px)";
            nav.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

        } else {

            nav.style.background = "rgba(255,255,255,.88)";
            nav.style.boxShadow = "none";

        }

    });

    // ==========================
    // Reveal Animation
    // ==========================

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: .15
    });

    document.querySelectorAll(".card,.job,.award-card,.section").forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);

    });

    // ==========================
    // Animated Counters
    // ==========================

    document.querySelectorAll(".card h3").forEach(counter => {

        const original = counter.textContent;

        const number = parseFloat(original.replace(/[^0-9.]/g, ""));

        if (isNaN(number)) return;

        const prefix = original.startsWith("$") ? "$" : "";

        const suffix =
            original.includes("%") ? "%" :
            original.includes("+") ? "+" :
            original.includes("x") ? "x" :
            original.includes("×") ? "×" : "";

        let value = 0;

        const step = number / 60;

        const timer = setInterval(() => {

            value += step;

            if (value >= number) {

                counter.textContent = original;

                clearInterval(timer);

                return;

            }

            if (original.includes(".")) {

                counter.textContent =
                    prefix + value.toFixed(1) + suffix;

            } else {

                counter.textContent =
                    prefix + Math.round(value) + suffix;

            }

        }, 18);

    });

    // ==========================
    // Active Nav Link
    // ==========================

    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        document.querySelectorAll("nav a").forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

    // ==========================
    // Mobile Menu
    // ==========================

    const toggle = document.getElementById("menuToggle");
    const menu = document.getElementById("navMenu");

    if (toggle && menu) {

        toggle.addEventListener("click", () => {

            menu.classList.toggle("open");

        });

    }

});
