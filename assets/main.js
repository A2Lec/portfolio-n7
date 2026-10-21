window.onload = function() {
    try {
        lucide.createIcons();
    } catch (e) {
        console.error("Error during Lucide initialization:", e);
    }

    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const iconBurger = document.getElementById('icon-burger');
    const iconClose = document.getElementById('icon-close');

    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('menu-open');
            iconBurger.classList.toggle('hidden', isOpen);
            iconClose.classList.toggle('hidden', !isOpen);
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('menu-open');
                iconBurger.classList.remove('hidden');
                iconClose.classList.add('hidden');
            });
        });
    }

    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    const fadeInSections = document.querySelectorAll('.fade-in-section');
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        fadeInSections.forEach(section => sectionObserver.observe(section));
    } else {
        fadeInSections.forEach(section => section.classList.add('is-visible'));
    }
};
