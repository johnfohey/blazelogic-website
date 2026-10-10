// ===========================
// BlazeLogic Website v3
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // ---------- Mobile nav ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar-container') && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // ---------- Navbar scroll effect ----------
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // ---------- Contact form (real delivery via Web3Forms) ----------
    const form = document.getElementById('contactForm');
    const submitButton = document.getElementById('contactSubmit');
    const formNote = document.getElementById('formNote');
    const originalButtonHTML = submitButton.innerHTML;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        formNote.classList.remove('success', 'error');

        if (!name || !email || !message) {
            formNote.textContent = 'Please fill in your name, email, and message.';
            formNote.classList.add('error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            formNote.textContent = 'That email address doesn\u2019t look right — mind checking it?';
            formNote.classList.add('error');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<span>Sending…</span>';
        formNote.textContent = '';

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                access_key: '6ce66a05-5d8b-4fff-9b18-2dd4571f0983',
                name: name,
                email: email,
                message: message,
                subject: 'blazelogic.io contact: ' + name,
                from_name: 'blazelogic.io contact form'
            })
        })
        .then(function(response) {
            if (!response.ok) throw new Error('send failed');
            return response.json();
        })
        .then(function(data) {
            if (!data.success) throw new Error('send failed');
            form.reset();
            formNote.textContent = 'Message sent — thanks! We\u2019ll get back to you soon.';
            formNote.classList.add('success');
            submitButton.innerHTML = '<span>Sent ✓</span>';
            setTimeout(function() {
                submitButton.innerHTML = originalButtonHTML;
                submitButton.disabled = false;
            }, 3000);
        })
        .catch(function() {
            formNote.textContent = 'Something went wrong sending that. Email us directly at john@blazelogic.io and we\u2019ll take it from there.';
            formNote.classList.add('error');
            submitButton.innerHTML = originalButtonHTML;
            submitButton.disabled = false;
        });
    });

    // ---------- Scroll reveal ----------
    var revealTargets = document.querySelectorAll(
        '.app-featured, .roadmap-card, .podcast-grid, .about-content, .contact-form, .section-header'
    );
    revealTargets.forEach(function(el) { el.classList.add('reveal'); });

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, index * 60);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        revealTargets.forEach(function(el) { observer.observe(el); });
    } else {
        revealTargets.forEach(function(el) { el.classList.add('visible'); });
    }
});
