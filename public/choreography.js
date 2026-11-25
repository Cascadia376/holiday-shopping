(() => {
  'use strict';
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector('.motion-toggle');
  let disabled = false;
  try { disabled = localStorage.getItem('last-stop-motion') === 'off'; } catch {}
  function applyPreference() {
    const off = disabled || preference.matches;
    document.documentElement.classList.toggle('scene-motion', !off);
    button.textContent = off ? 'Motion is off' : 'Turn motion off';
    if (disabled && !preference.matches) button.textContent = 'Turn motion on';
    button.disabled = preference.matches;
    button.setAttribute('aria-pressed', String(off));
  }
  button.addEventListener('click', () => {
    disabled = !disabled;
    try { localStorage.setItem('last-stop-motion', disabled ? 'off' : 'on'); } catch {}
    applyPreference();
  });
  preference.addEventListener('change', applyPreference);
  applyPreference();

  // Observe the illustration itself so tall chapters also play at the right moment on phones.
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      observer.unobserve(entry.target);
      if (document.documentElement.classList.contains('scene-motion')) {
        entry.target.classList.add('scene-played');
      }
    }
  }, {rootMargin: '0px 0px -8% 0px', threshold: 0.08});
  document.querySelectorAll('.story-stage, .table-visual, .toast-art, .gift-stage-art, .confidence-shelf, .home-receipt, .shopper-collage, .character-conversation').forEach(art => observer.observe(art));
})();
