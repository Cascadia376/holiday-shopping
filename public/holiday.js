/* Native details keeps the chapter index usable without JavaScript. */
const index = document.querySelector('.guide-index');
if (index) {
    index.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link) return;
        index.open = false;
        const heading = document.querySelector(link.getAttribute('href'));
        if (heading) heading.focus({ preventScroll: true });
    });
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && index.open) {
            index.open = false;
            index.querySelector('summary').focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (!index.contains(event.target)) index.open = false;
    });
}
