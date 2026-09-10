// =========================================
// AEROSPACE PORTFOLIO - ANIMATION SYSTEM
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
        const revealOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        document.querySelectorAll('.card-reveal').forEach(el => {
            revealObserver.observe(el);
        });

        const statOptions = { threshold: 0.5 };
        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current).toString().padStart(2, '0') + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toString().padStart(2, '0') + '+';
                        }
                    };
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, statOptions);

        document.querySelectorAll('.stat-num').forEach(counter => {
            statObserver.observe(counter);
        });
    } else {
        document.querySelectorAll('.card-reveal').forEach(el => {
            el.classList.add('visible'); el.style.transition = 'none';
        });
        document.querySelectorAll('.stat-num').forEach(el => {
            const target = el.getAttribute('data-target');
            el.innerText = target.padStart(2, '0') + '+';
        });
    }
});