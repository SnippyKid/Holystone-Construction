// ================================
// GSAP & ScrollTrigger Setup
// ================================
if (typeof gsap !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ================================
// Mobile Menu Toggle
// ================================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Inject overlay element if not already present
    let overlay = document.querySelector('.nav-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
    }

    function openMenu() {
        hamburger.classList.add('active');
        navLinks.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.contains('active') ? closeMenu() : openMenu();
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu when clicking overlay
        overlay.addEventListener('click', closeMenu);

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });

        // Close if window resized to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }
}

// ================================
// Navbar Scroll Effect
// ================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ================================
// GSAP Animations
// ================================
function initGSAPAnimations() {
    if (typeof gsap === 'undefined') {
        return;
    }
    
    // Very subtle entrance animations - no hiding content
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-cta, .hero-image');
    
    gsap.from(heroElements, {
        opacity: 0.5,
        y: 10,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power1.out',
        clearProps: 'all'
    });
}

// ================================
// ScrollTrigger Animations
// ================================
function initScrollTriggerAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger is not loaded');
        return;
    }
    
    // Animate elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const slideUpElements = document.querySelectorAll('.slide-up');
    const slideLeftElements = document.querySelectorAll('.slide-left');
    const scaleElements = document.querySelectorAll('.scale-in');
    
    fadeElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    slideUpElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    slideLeftElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            x: 40,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    scaleElements.forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// ================================
// Update Active Navigation Link
// ================================
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ================================
// Smooth Scroll for Anchor Links
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ================================
// Preloader (Optional)
// ================================
function hidePreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                preloader.style.display = 'none';
            }
        });
    }
}

// ================================
// Counter Animation
// ================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Intersection Observer to trigger animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ================================
// Projects Filter Functionality
// ================================
function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    if (filterBtns.length === 0) return; // Not on projects page
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    // Fade in animation
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// ================================
// Initialize All Functions
// ================================
function init() {
    initMobileMenu();
    initNavbarScroll();
    initSmoothScroll();
    updateActiveNavLink();
    initCounterAnimation();
    initProjectsFilter();
    
    // Very light animations only
    setTimeout(() => {
        if (typeof gsap !== 'undefined') {
            initGSAPAnimations();
        }
    }, 100);
}

// ================================
// DOM Ready
// ================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ================================
// Window Load Event
// ================================
window.addEventListener('load', () => {
    hidePreloader();
    
    // Refresh ScrollTrigger after images load
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
});

// ================================
// Handle Page Resize
// ================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }, 250);
});
