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