(() => {
  'use strict';
  // Content is always readable. Scroll entrances decorate it without hiding dialogue.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animations = new Set();
  const canAnimate = () => document.documentElement.classList.contains('motion-story') && !reducedMotion.matches;
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      if (!canAnimate()) return;
      const character = entry.target.matches('.conversation-character') ? entry.target : entry.target.querySelector('.conversation-character');
      const targets = [character, ...entry.target.querySelectorAll('.speech-bubble')].filter(Boolean);
      targets.forEach((target, index) => {
        if (!target.animate) return;
        const animation = target.animate([
          {transform:`translateY(${index ? 12 : 25}px) rotate(${index ? 0 : -2}deg)`},
          {transform:'translateY(0) rotate(0deg)'}
        ], {duration:index ? 340 : 600, delay:index * 110, easing:'cubic-bezier(.2,.8,.2,1)'});
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
        animation.oncancel = () => animations.delete(animation);
      });
    });
  }, {threshold:0.15});
  document.querySelectorAll('.character-conversation, .character-compact').forEach(node => observer.observe(node));
  function stopMotion() {
    if (!canAnimate()) animations.forEach(animation => animation.cancel());
  }
  document.addEventListener('storymotionchange', stopMotion);
  reducedMotion.addEventListener('change', stopMotion);
})();

