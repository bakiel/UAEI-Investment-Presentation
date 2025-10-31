// ============================================
// SLIDE NAVIGATION
// ============================================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

document.getElementById('total-slides').textContent = totalSlides;

function showSlide(n, direction = null) {
    // Determine direction if not specified
    if (direction === null) {
        direction = n > currentSlide ? 'forward' : 'backward';
    }

    const oldSlide = slides[currentSlide];

    if (n >= totalSlides) {
        currentSlide = totalSlides - 1;
    } else if (n < 0) {
        currentSlide = 0;
    } else {
        currentSlide = n;
    }

    const newSlide = slides[currentSlide];

    // Apply exit animation to old slide
    if (oldSlide && oldSlide !== newSlide) {
        oldSlide.style.display = 'flex';
        oldSlide.classList.remove('slide-enter-left', 'slide-enter-right');
        oldSlide.classList.add(direction === 'forward' ? 'slide-exit-left' : 'slide-exit-right');

        // Remove old slide after animation
        setTimeout(() => {
            oldSlide.classList.remove('active', 'slide-exit-left', 'slide-exit-right');
            oldSlide.style.display = 'none';
        }, 400);
    }

    // Apply enter animation to new slide
    newSlide.style.display = 'flex';
    newSlide.classList.remove('slide-exit-left', 'slide-exit-right');
    newSlide.classList.add(direction === 'forward' ? 'slide-enter-right' : 'slide-enter-left');

    // Add active class after a brief delay
    setTimeout(() => {
        newSlide.classList.add('active');
        newSlide.classList.remove('slide-enter-left', 'slide-enter-right');
    }, 10);

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

    // Check if this modal has animation
    if (data.animation) {
        renderSwarmAnimation(data);
        return;
    }

    // Create stats with animated counters and progress bars
    const statsHTML = data.stats.map((stat, index) => {
        const numericValue = extractNumber(stat.value);
        const hasNumber = numericValue !== null && !isNaN(numericValue);

        return `
        <div class="modal-stat enhanced animated" style="animation-delay: ${index * 0.1}s">
            <div class="modal-stat-value">
                ${stat.value}
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

    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

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

    // Extract numeric value from strings like "R1.6B", "25,000", "28.9%", "8-12%"
    // For ranges like "8-12%", extract just the first number
    const match = value.match(/[\d,.]+/);
    if (!match) return null;

    const num = parseFloat(match[0].replace(/,/g, ''));

    // Return the raw number - suffix will be added back in the animation callback
    // Don't multiply/divide here, just extract the numeric value as-is
    return num;
}

function getProgressPercentage(value) {
    const num = extractNumber(value);
    if (num === null) return 0;

    // Percentages - use as-is
    if (value.includes('%')) return Math.min(num, 100);

    // For large values (billions/millions), scale to percentage
    if (value.includes('B')) return Math.min((num / 10) * 100, 100);
    if (value.includes('M')) return Math.min((num / 1000) * 100, 100);
    if (value.includes('k')) return Math.min((num / 500) * 100, 100);

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
    // Simply animate progress bars - values are already displayed
    document.querySelectorAll('.progress-fill').forEach((bar, index) => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 300 + (index * 100)); // Stagger by 100ms per bar
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

function renderSwarmAnimation(data) {
    // Create stats HTML
    const statsHTML = data.stats.map((stat, index) => `
        <div class="modal-stat enhanced animated" style="animation-delay: ${index * 0.1}s">
            <div class="modal-stat-value">${stat.value}</div>
            <div class="modal-stat-label">${stat.label}</div>
        </div>
    `).join('');

    // Render comparative animation HTML
    document.getElementById('modal-body').innerHTML = `
        <h3 class="fade-in">${data.title}</h3>
        <p class="fade-in" style="animation-delay: 0.1s">${data.content}</p>

        <div class="swarm-comparison">
            <div class="swarm-column">
                <h4><i class="fas fa-user"></i> Traditional Farming</h4>
                <div class="swarm-animation-container" id="traditional-swarm">
                    ${generateFarmers(8, 'isolated')}
                </div>
                <div class="swarm-label">
                    <span class="negative">❌ Each farmer buys own equipment</span>
                    <span class="negative">❌ R1.8M per farm = R14.4M total</span>
                    <span class="negative">❌ Equipment underutilized</span>
                </div>
            </div>

            <div class="swarm-column">
                <h4><i class="fas fa-project-diagram"></i> Swarm Intelligence</h4>
                <div class="swarm-animation-container" id="swarm-intelligence">
                    ${generateFarmers(8, 'connected')}
                    <div class="swarm-equipment">
                        <i class="fas fa-helicopter equipment-icon drone"></i>
                        <i class="fas fa-tractor equipment-icon harvester"></i>
                        <i class="fas fa-satellite-dish equipment-icon iot"></i>
                    </div>
                </div>
                <div class="swarm-label">
                    <span class="positive">✓ 300 farmers share equipment</span>
                    <span class="positive">✓ R1.8M ÷ 300 = R6k per farm</span>
                    <span class="positive">✓ 60× cost reduction</span>
                </div>
            </div>
        </div>

        <div class="modal-stats">
            ${statsHTML}
        </div>
    `;

    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    // Start animations
    setTimeout(() => {
        animateSwarmIntelligence();
    }, 300);
}

function generateFarmers(count, type) {
    let html = '';
    const positions = [
        { top: '15%', left: '20%' },
        { top: '15%', left: '50%' },
        { top: '15%', left: '80%' },
        { top: '45%', left: '35%' },
        { top: '45%', left: '65%' },
        { top: '75%', left: '20%' },
        { top: '75%', left: '50%' },
        { top: '75%', left: '80%' }
    ];

    for (let i = 0; i < count; i++) {
        const pos = positions[i];
        html += `<div class="farmer-node ${type}" style="top: ${pos.top}; left: ${pos.left};" data-index="${i}">
            <i class="fas fa-tractor"></i>
        </div>`;
    }

    return html;
}

function animateSwarmIntelligence() {
    // Animate connections between swarm nodes
    const swarmNodes = document.querySelectorAll('#swarm-intelligence .farmer-node');
    const equipment = document.querySelectorAll('.equipment-icon');

    // Add pulse animation to nodes
    swarmNodes.forEach((node, i) => {
        setTimeout(() => {
            node.classList.add('active');
        }, i * 100);
    });

    // Rotate equipment around the center
    let angle = 0;
    setInterval(() => {
        angle += 0.5;
        equipment.forEach((icon, i) => {
            const offset = (i * 120); // 120 degrees apart
            const rad = (angle + offset) * Math.PI / 180;
            const centerX = 50; // center percentage
            const centerY = 50;
            const radius = 35; // orbit radius percentage

            const x = centerX + radius * Math.cos(rad);
            const y = centerY + radius * Math.sin(rad);

            icon.style.left = x + '%';
            icon.style.top = y + '%';
        });
    }, 30);
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Close modal ONLY on backdrop click (simple approach)
setTimeout(function() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Only close if the click is directly on the modal backdrop
            if (e.target.id === 'modal') {
                closeModal();
            }
        });
    }
}, 100);

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
// Initialize first slide without animation
slides[0].classList.add('active');
slides[0].style.display = 'flex';
document.getElementById('current-slide').textContent = '1';
document.getElementById('prev-btn').disabled = true;

console.log('%c UAEI Presentation Loaded ', 'background: #4CAF50; color: #fff; font-size: 16px; padding: 10px; font-weight: bold;');
console.log('Keyboard shortcuts:');
console.log('  → or Space: Next slide');
console.log('  ←: Previous slide');
console.log('  F: Toggle fullscreen');
console.log('  Esc: Close modal / Exit fullscreen');
