document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const fullMenu = document.getElementById('full-menu');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        const isMenuOpen = fullMenu.classList.contains('translate-y-0');

        if (isMenuOpen) {
            // Menu closes
            fullMenu.classList.remove('translate-y-0');
            fullMenu.classList.add('-translate-y-full');
            document.body.style.overflow = '';

            // Removal of class "menu-open"
            body.classList.remove('menu-open');

        } else {
            // Menu opens
            fullMenu.classList.remove('-translate-y-full');
            fullMenu.classList.add('translate-y-0');
            document.body.style.overflow = 'hidden';

            // Addition of class "menu-open"
            body.classList.add('menu-open');
        }
    });
});
