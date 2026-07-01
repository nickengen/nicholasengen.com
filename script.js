document.addEventListener('DOMContentLoaded', () => {

	// ==========================
	// Smooth Scrolling
	// ==========================
	document.querySelectorAll('a[href^="#"]').forEach(link => {
		link.addEventListener('click', function(e) {

			const target = document.querySelector(this.getAttribute('href'));

			if (!target) return;

			e.preventDefault();

			target.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});

		});
	});

	// ==========================
	// Sticky Navigation
	// ==========================
	const nav = document.querySelector('nav');

	window.addEventListener('scroll', () => {

		if (window.scrollY > 20) {

			nav.style.background = 'rgba(255,255,255,.96)';
			nav.style.backdropFilter = 'blur(18px)';
			nav.style.boxShadow = '0 10px 35px rgba(0,0,0,.08)';

		} else {

			nav.style.background = 'rgba(255,255,255,.88)';
			nav.style.boxShadow = 'none';

		}

	});

	// ==========================
	// Reveal Animation
	// ==========================
	const observer = new IntersectionObserver(entries => {

		entries.forEach(entry => {

			if (entry.isIntersecting) {

				entry.target.style.opacity = 1;
				entry.target.style.transform = 'translateY(0)';

			}

		});

	}, {
		threshold: 0.15
	});

	document.querySelectorAll('.card, .job, .award-card, .section').forEach(item => {

		item.style.opacity = 0;
		item.style.transform = 'translateY(40px)';
		item.style.transition = '.8s ease';

		observer.observe(item);

	});

	// ==========================
	// KPI Counter Animation
	// ==========================
	document.querySelectorAll('.card h3').forEach(counter => {

		const original = counter.textContent;

		const numeric = parseFloat(original.replace(/[^0-9.]/g, ''));

		if (isNaN(numeric)) return;

		const prefix = original.includes('$') ? '$' : '';
		const suffix =
			original.includes('%') ? '%' :
			original.includes('+') ? '+' :
			original.includes('×') ? '×' : '';

		let current = 0;

		const increment = numeric / 60;

		const timer = setInterval(() => {

			current += increment;

			if (current >= numeric) {

				counter.textContent = original;

				clearInterval(timer);

				return;

			}

			let value;

			if (original.includes('.')) {

				value = current.toFixed(1);

			} else {

				value = Math.round(current);

			}

			counter.textContent = prefix + value + suffix;

		}, 18);

	});

	// ==========================
	// Active Navigation Link
	// ==========================
	const sections = document.querySelectorAll('section');

	window.addEventListener('scroll', () => {

		let current = '';

		sections.forEach(section => {

			const top = section.offsetTop - 120;

			if (scrollY >= top) {

				current = section.getAttribute('id');

			}

		});

		document.querySelectorAll('nav a').forEach(link => {

			link.classList.remove('active');

			if (link.getAttribute('href') === '#' + current) {

				link.classList.add('active');

			}

		});

	});

});