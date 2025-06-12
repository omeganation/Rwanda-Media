document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.createElement('div');

    mobileMenuOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(mobileMenuOverlay);

    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
    });

    mobileMenuOverlay.addEventListener('click', function () {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
    });

    // Language Switcher for Mobile
    const currentLang = document.querySelector('.current-lang');
    const langDropdown = document.querySelector('.lang-dropdown');

    if (currentLang && langDropdown) {
        currentLang.addEventListener('click', function (e) {
            e.stopPropagation();
            langDropdown.style.opacity = langDropdown.style.opacity === '1' ? '0' : '1';
            langDropdown.style.visibility = langDropdown.style.visibility === 'visible' ? 'hidden' : 'visible';
        });

        document.addEventListener('click', function () {
            langDropdown.style.opacity = '0';
            langDropdown.style.visibility = 'hidden';
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim() !== '') {
                alert('Murakoze kwiyandikisha! Tuzabagezaho amakuru mashya.');
                emailInput.value = '';
            }
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize News Ticker Animation
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        const tickerItems = document.querySelectorAll('.ticker-item');
        tickerItems.forEach(item => ticker.appendChild(item.cloneNode(true)));
    }
});

// Scroll reveal animation
function scrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const revealTop = reveal.getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', scrollReveal);
scrollReveal(); // Initialize on load

// Smooth loading effect for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Like button effect
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        this.classList.toggle('liked');
        const icon = this.querySelector('i');

        if (this.classList.contains('liked')) {
            icon.classList.remove('far');
            icon.classList.add('fas', 'pulse');
            setTimeout(() => icon.classList.remove('pulse'), 500);
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

// Share button functionality
document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const url = this.dataset.url;
        const title = this.dataset.title;

        if (navigator.share) {
            navigator.share({
                title: title,
                url: url
            }).catch(err => {
                console.log('Error sharing:', err);
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            prompt('Copy this link to share:', url);
        }
    });
});

// Back to top button
const backToTopBtn = document.createElement('div');
backToTopBtn.className = 'back-to-top ripple';
backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Form submission with loading effect
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const loadingSpinner = document.createElement('div');
        loadingSpinner.className = 'loading-spinner';

        submitBtn.disabled = true;
        submitBtn.innerHTML = '';
        submitBtn.appendChild(loadingSpinner);

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Submitted!';
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Submit';
            }, 2000);
        }, 1500);
    });
});

// Dynamic theme switcher
const themeSwitcher = document.createElement('div');
themeSwitcher.className = 'theme-switcher ripple';
themeSwitcher.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(themeSwitcher);

themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    themeSwitcher.innerHTML = document.body.classList.contains('dark-theme') ?
        '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Initialize tooltips
tippy('[data-tippy-content]', {
    arrow: true,
    animation: 'scale',
    duration: 200,
    theme: 'gistrwanda'
});