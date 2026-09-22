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

    const modal = document.getElementById('role-modal');
    const modalContent = document.getElementById('modal-content');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalProfile = document.getElementById('modal-profile');
    const modalInterest = document.getElementById('modal-interest');
    const roleModelCards = document.querySelectorAll('.role-model-card');

    if (modal && modalContent && modalOverlay && modalCloseBtn && modalTitle && modalImage && modalProfile && modalInterest) {
        const openModal = (card) => {
            modalTitle.textContent = card.getAttribute('data-title');
            modalProfile.textContent = card.getAttribute('data-profile');
            modalInterest.textContent = card.getAttribute('data-interest');
            modalImage.src = card.getAttribute('data-image');
            modal.classList.remove('opacity-0', 'pointer-events-none');
            modalContent.classList.remove('opacity-0', 'scale-95');
        };

        roleModelCards.forEach(card => {
            card.addEventListener('click', () => openModal(card));
        });

        const closeModal = () => {
            modalContent.classList.add('opacity-0', 'scale-95');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('pointer-events-none');
            }, 300);
        };

        modalOverlay.addEventListener('click', closeModal);
        modalCloseBtn.addEventListener('click', closeModal);
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape" && !modal.classList.contains('opacity-0')) {
                closeModal();
            }
        });
    }

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
