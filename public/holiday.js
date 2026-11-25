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


// Open the field note before following an index link or a bookmarked fragment.
function revealFieldNote(hash) {
    const target = document.getElementById(hash.slice(1));
    let detail = target?.closest('details.field-detail');
    if (!detail) return;
    while (detail) {
        detail.open = true;
        detail = detail.parentElement.closest('details.field-detail');
    }
    target.scrollIntoView();
}
document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (link) revealFieldNote(link.hash);
});
window.addEventListener('hashchange', () => revealFieldNote(location.hash));
revealFieldNote(location.hash);
