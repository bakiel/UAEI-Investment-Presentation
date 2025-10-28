// ============================================
// SLIDE NAVIGATION
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('total-slides').textContent = totalSlides;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');

    document.getElementById('current-slide').textContent = currentSlide + 1;

    // Update button states
    document.getElementById('prev-btn').disabled = currentSlide === 0;
    document.getElementById('next-btn').disabled = currentSlide === totalSlides - 1;
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        showSlide(currentSlide + 1);
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        showSlide(currentSlide - 1);
    }
}

// ============================================
// MODAL FUNCTIONS
// ============================================
function showModal(key) {
    const data = modalContent[key];
    if (!data) {
        console.warn('No modal content found for key:', key);
        return;
    }

    const statsHTML = data.stats.map(stat => `
        <div class="modal-stat">
            <div class="modal-stat-value">${stat.value}</div>
            <div class="modal-stat-label">${stat.label}</div>
        </div>
    `).join('');

    document.getElementById('modal-body').innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.content}</p>
        <div class="modal-stats">
            ${statsHTML}
        </div>
    `;

    document.getElementById('modal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ============================================
// FULLSCREEN FUNCTIONALITY
// ============================================
function toggleFullscreen() {
    const elem = document.documentElement;
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (!document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement) {

        // Enter fullscreen
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }

        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        // Exit fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
}

// Listen for fullscreen change events
document.addEventListener('fullscreenchange', updateFullscreenButton);
document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
document.addEventListener('mozfullscreenchange', updateFullscreenButton);
document.addEventListener('msfullscreenchange', updateFullscreenButton);

function updateFullscreenButton() {
    const fullscreenBtn = document.getElementById('fullscreen-btn');
    if (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement) {
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
}

// ============================================
// KEYBOARD NAVIGATION
// ============================================
document.addEventListener('keydown', (e) => {
    // Don't navigate if modal is open
    if (document.getElementById('modal').classList.contains('show')) {
        if (e.key === 'Escape') {
            closeModal();
        }
        return;
    }

    // Slide navigation
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
        // Exit fullscreen on Escape
        if (document.fullscreenElement) {
            toggleFullscreen();
        }
    }
});

// ============================================
// TOUCH SUPPORT FOR MOBILE
// ============================================
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
    if (document.getElementById('modal').classList.contains('show')) {
        return;
    }
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    if (document.getElementById('modal').classList.contains('show')) {
        return;
    }
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

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

// ============================================
// INITIALIZE
// ============================================
showSlide(0);

console.log('%c UAEI Presentation Loaded ', 'background: #4CAF50; color: #fff; font-size: 16px; padding: 10px; font-weight: bold;');
console.log('Keyboard shortcuts:');
console.log('  → or Space: Next slide');
console.log('  ←: Previous slide');
console.log('  F: Toggle fullscreen');
console.log('  Esc: Close modal / Exit fullscreen');
