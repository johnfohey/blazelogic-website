// ===========================
// BlazeLogic Website v2.0
// Premium Software Company Site
// ===========================

// ===========================
// MOBILE NAVIGATION TOGGLE
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('.navbar-container');
        if (!isClickInsideNav && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// ===========================
// NAVBAR SCROLL EFFECTS
// ===========================

let lastScrollTop = 0;
const navbar = document.getElementById('navbar');
const navbarHeight = navbar.offsetHeight;

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    
    if (scrollTop > navbarHeight) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
}, false);

// ===========================
// CONTACT FORM HANDLING
// ===========================

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = this;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Get form data
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        subject: form.querySelector('#subject').value,
        message: form.querySelector('#message').value
    };
    
    // Validate
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Update button state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate sending (no backend yet)
    // In production, this would send to your backend/email service
    setTimeout(function() {
        // Store in localStorage for reference
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push({
            ...formData,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        
        // Reset form and show success
        submitButton.textContent = 'Message Sent!';
        submitButton.style.background = 'rgba(37, 99, 235, 0.5)';
        
        // Reset form
        form.reset();
        
        // Restore button after delay
        setTimeout(function() {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
            submitButton.disabled = false;
        }, 3000);
    }, 800);
});

// ===========================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }, index * 50);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.product-card, .approach-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0, 0.2, 1), transform 0.7s cubic-bezier(0.2, 0, 0.2, 1)';
    observer.observe(el);
});

// ===========================
// SMOOTH SCROLL ENHANCEMENT
// ===========================

// Add smooth scroll to internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===========================
// FORM INPUT FOCUS EFFECTS
// ===========================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===========================
// EMAIL LINK HANDLER
// ===========================

const emailLink = document.querySelector('.email-link');
if (emailLink) {
    emailLink.addEventListener('click', function(e) {
        // Allow natural email client opening
        // This is just for analytics in production
    });
}

// ===========================
// SCROLL POSITION RESTORATION
// ===========================

// Restore scroll position on page load (prevent scroll to top)
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('scrollPos', window.scrollY);
});

window.addEventListener('load', function() {
    const scrollPos = sessionStorage.getItem('scrollPos');
    if (scrollPos !== null && scrollPos !== '0') {
        // Don't auto-scroll on page load, let user control
        sessionStorage.removeItem('scrollPos');
    }
});

// ===========================
// BUTTON INTERACTIONS
// ===========================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mousedown', function(e) {
        this.style.transform = 'translateY(0px)';
    });
    
    button.addEventListener('mouseup', function(e) {
        this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function(e) {
        this.style.transform = '';
    });
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================

// Ensure buttons are keyboard accessible
document.querySelectorAll('.btn, .nav-link, .email-link').forEach(el => {
    el.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && this.tagName !== 'A') {
            this.click();
        }
    });
});

// ===========================
// UTILITY: LOG FORM SUBMISSIONS
// ===========================

console.log('BlazeLogic website loaded successfully.');

// Debug: Show form submissions in console
if (localStorage.getItem('contactSubmissions')) {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions'));
    if (submissions.length > 0) {
        console.log('Contact form submissions:', submissions);
    }
}
