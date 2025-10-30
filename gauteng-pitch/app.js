// Slide Navigation
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const slideCounter = document.getElementById('current-slide');
const totalSlidesEl = document.getElementById('total-slides');

// Initialize
totalSlidesEl.textContent = totalSlides;
updateSlide();

// Navigation functions
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));

    if (n >= totalSlides) {
        currentSlide = totalSlides - 1;
    } else if (n < 0) {
        currentSlide = 0;
    } else {
        currentSlide = n;
    }

    slides[currentSlide].classList.add('active');
    updateSlide();

    // Enhanced transitions
    enhanceSlideTransition();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

function updateSlide() {
    slideCounter.textContent = currentSlide + 1;

    // Update button states
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Global functions for inline onclick handlers - ONLY METHOD NOW
window.goToPrevSlide = function() {
    console.log('🔥🔥🔥 PREV BUTTON CLICKED 🔥🔥🔥');
    console.log('Current slide before:', currentSlide);
    previousSlide();
    console.log('Current slide after:', currentSlide);
    return false;
};

window.goToNextSlide = function() {
    console.log('🔥🔥🔥 NEXT BUTTON CLICKED 🔥🔥🔥');
    console.log('Current slide before:', currentSlide);
    nextSlide();
    console.log('Current slide after:', currentSlide);
    return false;
};

// BACKUP EVENT LISTENERS (in addition to inline onclick)
if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔥 PREV CLICKED VIA EVENT LISTENER');
        previousSlide();
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔥 NEXT CLICKED VIA EVENT LISTENER');
        nextSlide();
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousSlide();
    } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
    } else if (e.key === 'Escape') {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            nextSlide();
        } else {
            // Swipe right - previous slide
            previousSlide();
        }
    }
}

// Fullscreen functionality
function toggleFullscreen() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const icon = fullscreenBtn.querySelector('i');

    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
        });
    } else {
        document.exitFullscreen().then(() => {
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
        });
    }
}

document.getElementById('fullscreen-btn').addEventListener('click', toggleFullscreen);

// Handle fullscreen change
document.addEventListener('fullscreenchange', () => {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    const icon = fullscreenBtn.querySelector('i');

    if (!document.fullscreenElement) {
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
    }
});

// Prevent context menu on presentation
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

// Animate budget bars when slide becomes active
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const budgetFills = entry.target.querySelectorAll('.budget-fill');
            budgetFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }
    });
}, { threshold: 0.5 });

slides.forEach(slide => {
    if (slide.querySelector('.budget-visual')) {
        observer.observe(slide);
    }
});

console.log('UAEI Gauteng Pitch - 10 Slides Loaded');
console.log(`Presentation ready: ${totalSlides} slides`);
console.log('Keyboard shortcuts: ← → (navigate), Space (next), F (fullscreen), Esc (exit fullscreen)');

// ============================================
// MODAL FUNCTIONALITY (from main presentation)
// ============================================

// Simple modal functions for Slide 3.5 popups
window.showModal = function(key) {
    console.log('📱 Opening modal:', key);

    // Get modal content from data.js (loaded from main presentation)
    const data = window.modalContent ? window.modalContent[key] : null;

    if (!data) {
        console.warn('❌ No modal content found for key:', key);
        console.log('Available keys:', window.modalContent ? Object.keys(window.modalContent) : 'modalContent not loaded');
        return;
    }

    // Create simple stats HTML
    const statsHTML = data.stats ? data.stats.map(stat => `
        <div class="modal-stat">
            <div class="modal-stat-value">${stat.value}</div>
            <div class="modal-stat-label">${stat.label}</div>
        </div>
    `).join('') : '';

    // Set modal content
    const modalBody = document.getElementById('modal-body');
    if (modalBody) {
        modalBody.innerHTML = `
            <h3>${data.title}</h3>
            <p>${data.content}</p>
            <div class="modal-stats">
                ${statsHTML}
            </div>
        `;
    }

    // Show modal
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        console.log('✅ Modal shown');
    } else {
        console.error('❌ Modal element not found in DOM');
    }
};

window.closeModal = function() {
    console.log('📴 Closing modal');
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
};

// Close modal on backdrop click
setTimeout(function() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target.id === 'modal') {
                closeModal();
            }
        });
        console.log('✅ Modal backdrop click handler attached');
    } else {
        console.warn('⚠️ Modal element not found - backdrop click handler not attached');
    }
}, 100);

// Close button handler
setTimeout(function() {
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
        console.log('✅ Modal close button handler attached');
    }
}, 100);

console.log('🎭 Modal functions loaded');
console.log('   modalContent available:', typeof window.modalContent !== 'undefined');

// ============================================
// ADVANCED ANIMATIONS & INTERACTIVITY
// ============================================

// Number Counter Animation
function animateCounter(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    element.classList.add('counting');

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target.toLocaleString() + suffix;
            element.classList.remove('counting');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }
    }, 16);
}

// Entrance Animation Observer
const entranceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Trigger number counters if they exist
            const counters = entry.target.querySelectorAll('.counter-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const suffix = counter.getAttribute('data-suffix') || '';
                if (target && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    animateCounter(counter, target, 2000, suffix);
                }
            });
        }
    });
}, { threshold: 0.2 });

// Observe all animatable elements when slide becomes active
function observeSlideAnimations() {
    const activeSlide = document.querySelector('.slide.active');
    if (!activeSlide) return;

    // Find all elements with animation classes
    const animatables = activeSlide.querySelectorAll('.animate-in, .animate-slide-left, .animate-slide-right, .animate-scale, .stagger-children');

    animatables.forEach(el => {
        entranceObserver.observe(el);
        // Trigger immediately for active slide
        setTimeout(() => el.classList.add('visible'), 100);
    });
}

// Enhanced slide transition
function enhanceSlideTransition() {
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) {
        // Reset animations
        const animated = activeSlide.querySelectorAll('.visible');
        animated.forEach(el => el.classList.remove('visible'));

        // Re-trigger after short delay
        setTimeout(() => {
            observeSlideAnimations();
        }, 50);
    }
}

// Slide transitions are now handled directly in showSlide() function above
// No need to override

// Add hover effects to cards
function addHoverEffects() {
    const cards = document.querySelectorAll('.stat-card, .platform-item, .why-item, .urgency-item');
    cards.forEach(card => {
        if (!card.classList.contains('hover-lift')) {
            card.classList.add('hover-lift');
        }
    });

    const boxes = document.querySelectorAll('.title-box, .component-left, .component-right');
    boxes.forEach(box => {
        if (!box.classList.contains('hover-glow')) {
            box.classList.add('hover-glow');
        }
    });
}

// Progress indicator
function createProgressIndicator() {
    const existingProgress = document.querySelector('.slide-progress');
    if (existingProgress) return;

    const progressContainer = document.createElement('div');
    progressContainer.className = 'slide-progress';
    progressContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 9999;
    `;

    const progressBar = document.createElement('div');
    progressBar.className = 'slide-progress-bar';
    progressBar.style.cssText = `
        height: 100%;
        background: linear-gradient(90deg, #4CAF50, #66BB6A);
        width: ${((currentSlide + 1) / totalSlides) * 100}%;
        transition: width 0.5s ease;
        box-shadow: 0 0 20px rgba(76, 175, 80, 0.6);
    `;

    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    // Update progress on slide change
    const originalUpdateSlide = updateSlide;
    window.updateSlide = function() {
        originalUpdateSlide();
        const bar = document.querySelector('.slide-progress-bar');
        if (bar) {
            bar.style.width = `${((currentSlide + 1) / totalSlides) * 100}%`;
        }
    };
}

// Slide thumbnails navigation (optional - can be toggled)
function createThumbnailNav() {
    const existingNav = document.querySelector('.thumbnail-nav');
    if (existingNav) return;

    const nav = document.createElement('div');
    nav.className = 'thumbnail-nav';
    nav.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        display: none;
        gap: 8px;
        z-index: 999;
        background: rgba(0, 0, 0, 0.8);
        padding: 10px 15px;
        border-radius: 25px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(76, 175, 80, 0.3);
        pointer-events: auto;
    `;

    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'thumb-dot';
        dot.style.cssText = `
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: ${i === currentSlide ? '#4CAF50' : 'rgba(255, 255, 255, 0.3)'};
            cursor: pointer;
            transition: all 0.3s ease;
            pointer-events: auto;
        `;

        dot.addEventListener('click', () => showSlide(i));
        dot.addEventListener('mouseenter', () => {
            if (i !== currentSlide) {
                dot.style.background = 'rgba(76, 175, 80, 0.6)';
                dot.style.transform = 'scale(1.3)';
            }
        });
        dot.addEventListener('mouseleave', () => {
            if (i !== currentSlide) {
                dot.style.background = 'rgba(255, 255, 255, 0.3)';
                dot.style.transform = 'scale(1)';
            }
        });

        nav.appendChild(dot);
    }

    document.body.appendChild(nav);

    // Show/hide thumbnail nav based on fullscreen state
    function toggleThumbnailNav() {
        if (document.fullscreenElement) {
            nav.style.display = 'flex';
        } else {
            nav.style.display = 'none';
        }
    }

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', toggleThumbnailNav);

    // Initial state
    toggleThumbnailNav();

    // Update active dot on slide change
    const originalUpdateSlide2 = updateSlide;
    window.updateSlide = function() {
        originalUpdateSlide2();
        const dots = document.querySelectorAll('.thumb-dot');
        dots.forEach((dot, i) => {
            dot.style.background = i === currentSlide ? '#4CAF50' : 'rgba(255, 255, 255, 0.3)';
            dot.style.transform = i === currentSlide ? 'scale(1.3)' : 'scale(1)';
        });
    };
}

// Initialize all enhancements
setTimeout(() => {
    console.log('🚀 Initializing advanced features...');

    // Add hover effects
    addHoverEffects();

    // Create progress indicator
    createProgressIndicator();

    // Create thumbnail navigation
    createThumbnailNav();

    // Trigger initial animations
    observeSlideAnimations();

    console.log('✅ Advanced features loaded!');
    console.log('   - Entrance animations');
    console.log('   - Hover effects');
    console.log('   - Progress indicator');
    console.log('   - Thumbnail navigation');
}, 500);

