(() => {
  'use strict';
  const scenes = [...document.querySelectorAll('[data-scene]')];
  if (!scenes.length) return;
  const clamp = value => Math.max(0, Math.min(1, value));
  const enhanced = () => document.documentElement.classList.contains('motion-story');
  let pendingFrame = 0;

  function paintScenes() {
    pendingFrame = 0;
    if (!enhanced()) return;
    scenes.forEach(scene => {
      const stage = scene.querySelector('.journey-stage');
      const offset = parseFloat(getComputedStyle(stage).top) || 0;
      const p = clamp((offset - scene.getBoundingClientRect().top) / Math.max(1, scene.offsetHeight - stage.offsetHeight));
      const opening = clamp((p - 0.15) / 0.45);
      const values = {
        '--scene-progress': p,
        '--toast-close': clamp((p - 0.15) / 0.45),
        '--toast-fill': clamp((p - 0.05) / 0.3),
        '--toast-cheers': clamp((p - 0.64) / 0.15),
        '--toast-settle': clamp((p - 0.82) / 0.18),
        '--gift-tag': clamp((p - 0.73) / 0.16),
        '--table-x': `${(1 - clamp(p / 0.35)) * 70}px`,
        '--table-angle': `${-3 + p * 3}deg`,
        '--ticket-one': clamp(p / 0.22),
        '--ticket-two': clamp((p - 0.2) / 0.22),
        '--ticket-three': clamp((p - 0.4) / 0.22),
        '--extra-place': clamp((p - 0.65) / 0.25),
        '--bottle-drop': `${-35 + opening * 90}px`,
        '--bag-fold': `${(1 - opening) * 80}deg`,
        '--bag-open': 0.15 + opening * 0.85,
        '--tissue-y': `${(1 - clamp((p - 0.4) / 0.25)) * 80}px`,
        '--tissue-opacity': clamp((p - 0.4) / 0.25),
        '--ribbon-clip': `${(1 - clamp((p - 0.6) / 0.2)) * 100}%`,
        '--done': clamp((p - 0.78) / 0.15),
      };
      Object.entries(values).forEach(([key, value]) => stage.style.setProperty(key, value));
      const active = p < 0.32 ? 0 : p < 0.7 ? 1 : 2;
      scene.querySelectorAll('.scene-beat').forEach((beat, index) => {
        beat.classList.toggle('is-current', index === active);
        beat.setAttribute('aria-hidden', String(index !== active));
      });
    });
  }
  function schedulePaint() {
    if (!pendingFrame && enhanced()) pendingFrame = requestAnimationFrame(paintScenes);
  }
  function motionChanged() {
    if (enhanced()) schedulePaint();
    else scenes.forEach(scene => scene.querySelectorAll('.scene-beat').forEach(beat => {
      beat.removeAttribute('aria-hidden');
      beat.classList.remove('is-current');
    }));
  }
  window.addEventListener('scroll', schedulePaint, { passive: true });
  window.addEventListener('resize', schedulePaint);
  document.addEventListener('storymotionchange', motionChanged);
  motionChanged();

  // Text-only feedback avoids HTML injection and keeps announcements understandable.
  function reply(target, headline, explanation) {
    const first = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = headline;
    first.append(strong);
    const second = document.createElement('p');
    second.textContent = explanation;
    target.replaceChildren(first, second);
  }
  function select(button, selector) {
    document.querySelectorAll(selector).forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }
  const pairingFeedback = {
    meal: ['Exactly. Start with the meal and their taste.', 'Then ask how much they want to spend. You have a useful brief for two suitable options.'],
    price: ['Price alone doesn’t tell you what fits.', 'Try asking about the meal and the recipient’s taste first, then their spending range. A thoughtful choice doesn’t have to be the most expensive.'],
    colour: ['A holiday dinner isn’t one flavour.', 'The food, sauces, and the drinker’s preferences matter. Ask a useful question before choosing a colour or style.'],
  };
  document.querySelectorAll('[data-practice="pairing"]').forEach(button => button.addEventListener('click', () => {
    select(button, '[data-practice="pairing"]');
    reply(document.getElementById('pairing-feedback'), ...pairingFeedback[button.dataset.answer]);
  }));
  const hostFeedback = {
    toast: ['“Would she enjoy something sparkling, or does she prefer a still drink?”', 'Use her taste and any alcohol-content requirements to guide the choice. Check the label together before recommending it.'],
    dinner: ['“What’s on the menu, and what flavours does she usually enjoy?”', 'Give the alcohol-free choice the same care as any other dinner drink. Offer two suitable options you can explain confidently.'],
    mix: ['“Does she like something citrusy, herbal, bitter, or sweet?”', 'Help the host choose a mixer or alcohol-free option that fits those preferences. Check what else they need to serve it.'],
  };
  document.querySelectorAll('[data-host]').forEach(button => button.addEventListener('click', () => {
    select(button, '[data-host]');
    reply(document.querySelector('.host-response'), ...hostFeedback[button.dataset.host]);
  }));
  const denFeedback = {
    yes: ['“Great—let’s make sure your membership is attached.”', 'Follow the current checkout process. If they ask about points or redemption, use the current Den Rewards guidance.'],
    curious: ['“It’s our rewards program. Would you like a quick introduction?”', 'If they’re interested, explain the current benefits and enrolment steps from the Den Rewards training. Keep it brief and useful.'],
    later: ['“Of course. You’re all set—enjoy your evening!”', 'Respect their choice. A warm finish matters more than repeating the invitation.'],
  };
  document.querySelectorAll('[data-den]').forEach(button => button.addEventListener('click', () => {
    select(button, '[data-den]');
    reply(document.querySelector('.den-response'), ...denFeedback[button.dataset.den]);
  }));

  const form = document.getElementById('learning-check');
  const result = document.querySelector('.check-result');
  const questions = [
    ['gift', 'ask', 'Start with the recipient, their preferences, and the guest’s spending range.'],
    ['alcoholfree', 'check', 'Ask about taste and alcohol-content requirements, then check the label.'],
    ['loyalty', 'respect', 'Respect a declined invitation and finish the visit warmly.'],
  ];
  form.addEventListener('submit', event => {
    event.preventDefault();
    const values = new FormData(form);
    const score = questions.filter(([name, correct]) => values.get(name) === correct).length;
    reply(result, `${score} of 3 — ${score === 3 ? 'ready to practise on the floor.' : 'let’s review the useful bits.'}`, 'This is a practice check, not a recorded completion. You can change your answers and try again.');
    const list = document.createElement('ul');
    questions.forEach(([name, correct, explanation], index) => {
      const item = document.createElement('li');
      item.textContent = `${index + 1}. ${values.get(name) === correct ? 'Correct.' : 'Try again.'} ${explanation}`;
      list.append(item);
    });
    result.append(list);
  });
  form.addEventListener('change', () => result.replaceChildren());
})();
