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

// Event listeners with failsafe
prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('PREV clicked');
    previousSlide();
}, true);

nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    e.preventDefault();
    console.log('NEXT clicked');
    nextSlide();
}, true);

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
