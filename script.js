/* ==========================================
   Nicholas Engen Executive Portfolio
   Version 1.0
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ---------- Sticky Nav ---------- */

    const nav = document.querySelector("nav");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            nav.classList.add("sticky");

        } else {

            nav.classList.remove("sticky");

        }

    });

    /* ---------- Fade In Sections ---------- */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: .15

    });

    document.querySelectorAll("section,.job,.card,.hero-left,.hero-right").forEach(el => {

        el.classList.add("hidden");

        observer.observe(el);

    });

    /* ---------- KPI Counter ---------- */

    document.querySelectorAll(".card h3").forEach(card => {

        const txt = card.innerText;

        const match = txt.match(/[0-9]+/);

        if (!match) return;

        const target = parseInt(match[0]);

        const suffix = txt.replace(/[0-9]/g,"");

        let value = 0;

        const speed = Math.max(10, Math.floor(1200 / target));

        const timer = setInterval(() => {

            value++;

            card.innerText = value + suffix;

            if (value >= target) {

                clearInterval(timer);

                card.innerText = txt;

            }

        }, speed);

    });

    /* ---------- Smooth Buttons ---------- */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", e => {

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

});
