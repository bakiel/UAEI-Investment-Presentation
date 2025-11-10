// UAEI R38M TIA Mobile Presentation - JavaScript

// Prevent zoom on double-tap
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Animate elements on scroll into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for fade-in animations
    const animatedElements = document.querySelectorAll(
        '.mobile-section, .mobile-card, .platform-card, .mobile-budget-item, .metric-card, .list-item, .story-card, .transformation-flow, .value-card, .scenario-card, .ask-item, .crisis-stat, .problem-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Animate budget bars when they come into view
    const budgetObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.budget-fill');
                if (fill && !fill.classList.contains('animated')) {
                    fill.classList.add('animated');
                    // Trigger reflow
                    const width = fill.style.width;
                    fill.style.width = '0';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 100);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.mobile-budget-item').forEach(item => {
        budgetObserver.observe(item);
    });

    console.log('📱 UAEI Mobile Presentation Loaded');
    console.log('🌍 Optimized for portrait mobile viewing');
    console.log('👆 Scroll to explore the pitch deck');
});

// Log page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('📱 User switched away from presentation');
    } else {
        console.log('📱 User returned to presentation');
    }
});

// Service Worker for offline capability (optional enhancement)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('✅ Service Worker registered'))
            .catch(err => console.log('❌ Service Worker registration failed'));
    });
}
