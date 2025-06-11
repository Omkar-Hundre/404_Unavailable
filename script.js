// Interactive effects for the 404 page

// Create shooting star effect
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    star.style.left = startX + 'px';
    star.style.top = startY + 'px';
    
    document.body.appendChild(star);
    
    // Remove the star after animation
    setTimeout(() => {
        if (star.parentNode) {
            star.parentNode.removeChild(star);
        }
    }, 2000);
}

// Create random shooting stars
function createRandomShootingStars() {
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance every 3 seconds
            createShootingStar();
        }
    }, 3000);
}

// Parallax effect for planets
function initParallax() {
    const planets = document.querySelectorAll('.planet');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        planets.forEach((planet, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;
            
            planet.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Simple button interactions without astronaut
function initButtonInteraction() {
    const homeButton = document.querySelector('.home-button');
    const exploreButton = document.querySelector('.explore-button');

    // Home button interaction
    if (homeButton) {
        homeButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Navigate after a brief delay
            setTimeout(() => {
                window.location.href = homeButton.href || '/';
            }, 500);
        });
    }

    // Explore button interaction
    if (exploreButton) {
        exploreButton.addEventListener('click', () => {
            createCosmicExplosion();
        });
    }
}







// Cosmic explosion effect
function createCosmicExplosion() {
    const container = document.querySelector('.container');

    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'cosmic-particle';

        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = '50%';
        particle.style.top = '50%';

        const angle = (i / 15) * 360;
        const distance = Math.random() * 200 + 100;

        particle.style.setProperty('--angle', angle + 'deg');
        particle.style.setProperty('--distance', distance + 'px');

        container.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 2000);
    }
}

// Glitch effect enhancement
function enhanceGlitchEffect() {
    const glitchElement = document.querySelector('.glitch');
    
    if (glitchElement) {
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every 2 seconds
                glitchElement.style.animation = 'none';
                setTimeout(() => {
                    glitchElement.style.animation = 'glitch 2s infinite';
                }, 50);
            }
        }, 2000);
    }
}

// Floating particles effect
function createFloatingParticles() {
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = Math.random() * 4 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.zIndex = '1';
        
        document.body.appendChild(particle);
    }
}

// Button hover sound effect (visual feedback)
function initButtonEffects() {
    const buttons = document.querySelectorAll('.home-button, .explore-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.position = 'absolute';
            ripple.style.width = '0';
            ripple.style.height = '0';
            ripple.style.background = 'rgba(255, 255, 255, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            button.style.position = 'relative';
            button.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
}

// Add ripple animation to CSS dynamically
function addRippleAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            0% {
                width: 0;
                height: 0;
                opacity: 1;
            }
            100% {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize all effects when page loads
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
    initButtonInteraction();
    enhanceGlitchEffect();
    createFloatingParticles();
    initButtonEffects();
    addRippleAnimation();
    createRandomShootingStars();

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Keyboard interactions
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ': // Spacebar
            e.preventDefault();
            createShootingStar();
            break;
        case 'Enter':
            // Trigger home button click
            const homeButton = document.querySelector('.home-button');
            if (homeButton) {
                homeButton.click();
            }
            break;
    }
});

// Performance optimization: Reduce animations on low-end devices
function optimizeForPerformance() {
    const isLowEndDevice = navigator.hardwareConcurrency < 4 || 
                          /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isLowEndDevice) {
        // Reduce particle count and animation frequency
        const particles = document.querySelectorAll('[style*="float"]');
        particles.forEach((particle, index) => {
            if (index % 2 === 0) {
                particle.remove();
            }
        });
    }
}

// Call performance optimization
setTimeout(optimizeForPerformance, 1000);
