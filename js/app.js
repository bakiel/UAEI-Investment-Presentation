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
// ENHANCED MODAL FUNCTIONS WITH ANIMATIONS
// ============================================
let activeChart = null;

function showModal(key) {
    const data = modalContent[key];
    if (!data) {
        console.warn('No modal content found for key:', key);
        return;
    }

    // Destroy existing chart if any
    if (activeChart) {
        activeChart.destroy();
        activeChart = null;
    }

    // Create stats with animated counters and progress bars
    const statsHTML = data.stats.map((stat, index) => {
        const numericValue = extractNumber(stat.value);
        const hasNumber = numericValue !== null && !isNaN(numericValue);

        return `
        <div class="modal-stat enhanced" style="animation-delay: ${index * 0.1}s">
            <div class="modal-stat-value" ${hasNumber ? `data-value="${stat.value}" data-numeric="${numericValue}"` : ''}>
                ${hasNumber ? '0' : stat.value}
            </div>
            <div class="modal-stat-label">${stat.label}</div>
            ${hasNumber ? `<div class="progress-bar"><div class="progress-fill" data-progress="${getProgressPercentage(stat.value)}"></div></div>` : ''}
        </div>
    `}).join('');

    // Check if we should render a chart
    const shouldRenderChart = hasChartableData(data.stats);
    const chartHTML = shouldRenderChart ? `
        <div class="modal-chart-container">
            <canvas id="modal-chart"></canvas>
        </div>
    ` : '';

    document.getElementById('modal-body').innerHTML = `
        <h3 class="fade-in">${data.title}</h3>
        <p class="fade-in" style="animation-delay: 0.1s">${data.content}</p>
        ${chartHTML}
        <div class="modal-stats">
            ${statsHTML}
        </div>
    `;

    document.getElementById('modal').classList.add('show');
    document.body.style.overflow = 'hidden';

    // Animate numbers and progress bars with staggered timing
    setTimeout(() => {
        if (shouldRenderChart) {
            renderModalChart(data.stats);
        }
        // Delay number animations slightly after chart starts
        setTimeout(() => {
            animateModalElements();
        }, 300);
    }, 150);
}

function extractNumber(value) {
    if (typeof value !== 'string') return null;

    // Extract numeric value from strings like "R1.6B", "25,000", "28.9%"
    const match = value.match(/[\d,.]+/);
    if (!match) return null;

    const num = parseFloat(match[0].replace(/,/g, ''));

    // Handle billions (B) and millions (M)
    if (value.includes('B')) return num * 1000;
    if (value.includes('M')) return num;
    if (value.includes('k')) return num / 1000;

    return num;
}

function getProgressPercentage(value) {
    const num = extractNumber(value);
    if (num === null) return 0;

    // Percentages
    if (value.includes('%')) return Math.min(num, 100);

    // Scale other values to 0-100 range
    if (num < 1) return num * 100;
    if (num < 100) return num;
    if (num < 1000) return Math.min((num / 1000) * 100, 100);

    return Math.min((num / 2000) * 100, 100);
}

function hasChartableData(stats) {
    // Check if at least 3 stats have numeric values for a meaningful chart
    const numericStats = stats.filter(stat => extractNumber(stat.value) !== null);
    return numericStats.length >= 3;
}

function animateModalElements() {
    // Animate numbers with CountUp.js
    document.querySelectorAll('.modal-stat-value[data-numeric]').forEach(element => {
        const targetValue = element.getAttribute('data-value');
        const numericValue = parseFloat(element.getAttribute('data-numeric'));

        if (numericValue !== null && !isNaN(numericValue)) {
            // Determine decimal places
            const decimals = targetValue.includes('.') ? (targetValue.split('.')[1].match(/\d+/) || [''])[0].length : 0;

            const countUp = new countUp.CountUp(element, numericValue, {
                duration: 2.5,
                decimal: '.',
                suffix: targetValue.includes('%') ? '%' : '',
                prefix: targetValue.includes('R') ? 'R' : '',
                separator: ',',
                decimals: Math.min(decimals, 2),
                useEasing: true,
                useGrouping: true,
                easingFn: function (t, b, c, d) {
                    // Custom easing: easeOutQuart
                    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
                }
            });

            if (!countUp.error) {
                countUp.start(() => {
                    // Add final formatting for B/M/k
                    if (targetValue.includes('B')) {
                        element.textContent = element.textContent.replace(/[\d,.]+/, match => match) + 'B';
                    } else if (targetValue.includes('M')) {
                        element.textContent = element.textContent.replace(/[\d,.]+/, match => match) + 'M';
                    } else if (targetValue.includes('k')) {
                        element.textContent = element.textContent.replace(/[\d,.]+/, match => match) + 'k';
                    }
                });
            } else {
                element.textContent = targetValue;
            }
        }
    });

    // Animate progress bars with staggered timing
    document.querySelectorAll('.progress-fill').forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 500 + (index * 100)); // Stagger by 100ms per bar
    });
}

function renderModalChart(stats) {
    const canvas = document.getElementById('modal-chart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const labels = stats.map(s => s.label);
    const dataValues = stats.map(s => extractNumber(s.value) || 0);

    activeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: [
                    'rgba(76, 175, 80, 0.8)',
                    'rgba(139, 195, 74, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(33, 150, 243, 0.8)'
                ],
                borderColor: [
                    'rgba(76, 175, 80, 1)',
                    'rgba(139, 195, 74, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(33, 150, 243, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        font: {
                            family: 'Poppins',
                            size: 12
                        },
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#4CAF50',
                    bodyColor: '#ffffff',
                    titleFont: {
                        family: 'Poppins',
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        family: 'Poppins',
                        size: 12
                    },
                    padding: 12,
                    cornerRadius: 8
                }
            },
            animation: {
                animateRotate: true,
                animateScale: true,
                duration: 2200,
                delay: 200,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function closeModal() {
    document.getElementById('modal').classList.remove('show');
    document.body.style.overflow = '';
}

// Close modal on outside click (only on backdrop, not modal content)
document.getElementById('modal').addEventListener('click', function(e) {
    // Only close if clicking directly on the modal backdrop, not on modal-content or its children
    if (e.target.id === 'modal' && e.target === e.currentTarget) {
        closeModal();
    }
});

// Prevent modal from closing when clicking inside modal-content
document.addEventListener('DOMContentLoaded', function() {
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('click', function(e) {
            e.stopPropagation();
        });
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
