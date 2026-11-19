(() => {
  'use strict';
  const departure = document.querySelector('.departure-story');
  const shelf = document.querySelector('.study-cards');
  if (!departure || !shelf) return;
  const clamp = value => Math.max(0, Math.min(1, value));
  const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
  const enabled = () => document.documentElement.classList.contains('motion-story');
  let frame = 0;

  // Decorative objects follow scroll in both directions; all text remains in the document.
  function paint() {
    frame = 0;
    if (!enabled()) return;
    const stage = departure.querySelector('.home-scene');
    const top = parseFloat(getComputedStyle(stage).top) || 0;
    const p = clamp((top - departure.getBoundingClientRect().top) / Math.max(1, departure.offsetHeight - stage.offsetHeight));
    const leave = smooth((p - 0.4) / 0.6);
    const values = {
      '--leave-x': `${leave * 75}%`,
      '--leave-angle': `${leave * 4}deg`,
      '--leave-scale': 1 - leave * 0.16,
      '--door-open': `${smooth(p / 0.5) * -65}deg`,
      '--receipt-reveal': smooth((p - 0.18) / 0.35),
      '--check-one': smooth((p - 0.32) / 0.15),
      '--check-two': smooth((p - 0.5) / 0.15),
      '--check-three': smooth((p - 0.7) / 0.16),
      '--all-set': smooth((p - 0.84) / 0.16),
    };
    Object.entries(values).forEach(([key, value]) => stage.style.setProperty(key, value));
    if (!shelf.closest('[hidden]')) {
      const rect = shelf.getBoundingClientRect();
      const progress = clamp((window.innerHeight - rect.top) / Math.max(1, window.innerHeight * 0.7));
      shelf.querySelectorAll('.study-card').forEach((card, index) => {
        const arrived = smooth((progress - index * 0.15) / 0.65);
        card.style.setProperty('--bottle-rise', `${(1 - arrived) * 100}px`);
        card.style.setProperty('--bottle-turn', `${(1 - arrived) * (index ? 14 : -14)}deg`);
        card.style.setProperty('--note-reveal', smooth((progress - 0.45 - index * 0.12) / 0.3));
      });
    }
  }
  function schedule() { if (!frame && enabled()) frame = requestAnimationFrame(paint); }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  document.addEventListener('storymotionchange', schedule);
  document.querySelectorAll('[data-recipient]').forEach(button => button.addEventListener('click', schedule));
  // Images and expanded explanations can change the preceding document height.
  const observer = new ResizeObserver(schedule);
  observer.observe(document.querySelector('main'));
  schedule();
})();
