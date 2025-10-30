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

// NO EVENT LISTENERS - inline onclick only for maximum reliability

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
function showModal(key) {
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
}

function closeModal() {
    console.log('📴 Closing modal');
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

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

