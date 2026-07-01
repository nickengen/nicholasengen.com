document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Mobile Menu
    // ==========================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");
            navMenu.classList.toggle("open");

        });

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");
                navMenu.classList.remove("open");

            });

        });

    }

    // ==========================
    // Smooth Scroll
    // ==========================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        });

    });

    // ==========================
    // Sticky Navbar
    // ==========================

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            navbar.style.boxShadow =
                "0 18px 40px rgba(0,0,0,.12)";

            navbar.style.background =
                "rgba(255,255,255,.90)";

        } else {

            navbar.style.boxShadow =
                "0 12px 40px rgba(0,0,0,.08)";

            navbar.style.background =
                "rgba(255,255,255,.82)";

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

    document.querySelectorAll(

        ".card,.job,.award-card,.contact-card,.section"

    ).forEach(item => {

        item.classList.add("hidden");

        observer.observe(item);

    });

    // ==========================
    // Counter Animation
    // ==========================

    document.querySelectorAll(".card h3").forEach(counter => {

        const original = counter.textContent;

        const target = parseFloat(

            original.replace(/[^0-9.]/g, "")

        );

        if (isNaN(target)) return;

        const prefix = original.startsWith("$") ? "$" : "";

        const suffix =
            original.includes("%") ? "%" :
            original.includes("+") ? "+" :
            original.includes("×") ? "×" :
            "";

        let current = 0;

        const increment = target / 70;

        const timer = setInterval(() => {

            current += increment;

            if (current >= target) {

                counter.textContent = original;

                clearInterval(timer);

                return;

            }

            const display =

                original.includes(".")
                    ? current.toFixed(1)
                    : Math.round(current);

            counter.textContent =
                prefix + display + suffix;

        }, 18);

    });

    // ==========================
    // Active Navigation
    // ==========================

    const sections = document.querySelectorAll("section");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 140;

            if (window.scrollY >= top) {

                current = section.id;

            }

        });

        document.querySelectorAll(".navbar a").forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + current) {

                link.classList.add("active");

            }

        });

    });

});

// ======================================
// Executive OS Boot
// ======================================

const boot = document.getElementById("boot-screen");

if (boot) {

    setTimeout(() => {

        boot.classList.add("hidden");

    }, 2800);

}