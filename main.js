// =========================================
// AEROSPACE PORTFOLIO - MAIN LOGIC
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Boot Screen Logic
    const bootScreen = document.getElementById('boot-screen');
    setTimeout(() => {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
        }, 800);
    }, 2200);

    // 2. Custom Cursor Logic (Desktop only)
    const cursor = document.querySelector('.custom-cursor');
    const ring = document.querySelector('.cursor-ring');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            requestAnimationFrame(() => {
                ring.style.left = e.clientX + 'px';
                ring.style.top = e.clientY + 'px';
            });
        });

        const clickables = document.querySelectorAll('a, button, .project-card, .edu-card, .achieve-card');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                ring.style.transform = 'translate(-50%, -50%) scale(1.5)';
                ring.style.borderColor = 'var(--cyan-accent)';
            });
            el.addEventListener('mouseleave', () => {
                ring.style.transform = 'translate(-50%, -50%) scale(1)';
                ring.style.borderColor = 'var(--border-color)';
            });
        });
    }

    // 3. Navigation Styling & Scroll Progress
    const navbar = document.getElementById('navbar');
    const progressBar = document.querySelector('.scroll-progress');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 4. Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // 5. Contact Form Intercept
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            // UI Transmitting State
            btn.innerHTML = 'TRANSMITTING...';
            btn.style.backgroundColor = 'var(--bg-surface)';
            btn.style.color = 'var(--cyan-accent)';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    btn.innerHTML = 'TRANSMISSION SENT';
                    btn.style.backgroundColor = '#00ff00';
                    btn.style.color = '#000';
                    contactForm.reset();
                } else {
                    throw new Error('Transmission Failed');
                }
            } catch (error) {
                btn.innerHTML = 'COMMS ERROR';
                btn.style.backgroundColor = '#ff0033';
                btn.style.color = '#fff';
            }

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style = '';
            }, 3500);
        });
    }
   
});

// Carousel Logic for 2nd Project Card
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('wing-carousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.dot');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let startX = 0;
    let isDragging = false;
    let slideTimer = null;

    function updateSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    function startAutoPlay() {
        stopAutoPlay();
        slideTimer = setInterval(() => {
            updateSlide(currentIndex + 1);
        }, 3000);
    }

    function stopAutoPlay() {
        if (slideTimer) clearInterval(slideTimer);
    }

    // Touch Swipe Events (Mobile)
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;

        if (diffX < -40) updateSlide(currentIndex + 1); // Swipe Left
        else if (diffX > 40) updateSlide(currentIndex - 1); // Swipe Right
        
        startAutoPlay();
    });

    // Mouse Drag Events (Desktop)
    carousel.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        stopAutoPlay();
    });

    carousel.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diffX = e.clientX - startX;

        if (diffX < -40) updateSlide(currentIndex + 1);
        else if (diffX > 40) updateSlide(currentIndex - 1);
        
        startAutoPlay();
    });

    carousel.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            startAutoPlay();
        }
    });

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);

    // Initial Start
    startAutoPlay();
});