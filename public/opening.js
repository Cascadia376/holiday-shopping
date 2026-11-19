(() => {
  'use strict';
  const story = document.querySelector('.scroll-story');
  if (!story) return;
  const stage = story.querySelector('.story-stage');
  const beats = [...story.querySelectorAll('.story-beat')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let manualMotionOff = false;
  const motionOff = () => reducedMotion.matches || manualMotionOff;
  const motionToggle = document.querySelector('.motion-toggle');
  let frame = 0;
  let activeBeat = -1;
  const clamp = (value, low = 0, high = 1) => Math.min(high, Math.max(low, value));

  // Native scrolling remains in charge; one scheduled frame updates decorative transforms.
  function paintStory() {
    frame = 0;
    if (motionOff()) return;
    const top = parseFloat(getComputedStyle(stage).top) || 0;
    const distance = story.offsetHeight - stage.offsetHeight;
    const progress = clamp((top - story.getBoundingClientRect().top) / Math.max(1, distance));
    const reveal = clamp((progress - 0.15) / 0.45);
    // Give the opening line a complete beat before the first story card enters.
    const taglineOpacity = 1 - clamp((progress - 0.05) / 0.09);
    const values = {
      '--progress': progress,
      '--guest-x': `${(1 - clamp(progress / 0.35)) * 180}px`,
      '--guest-y': `${Math.sin(clamp(progress / 0.35) * Math.PI * 4) * (1 - clamp(progress / 0.35)) * 7}px`,
      '--guest-scale': 0.93 + clamp(progress / 0.35) * 0.07,
      '--errand-one': clamp((progress - 0.18) / 0.09),
      '--errand-two': clamp((progress - 0.24) / 0.09),
      '--errand-three': clamp((progress - 0.30) / 0.09),
      '--errand-four': clamp((progress - 0.36) / 0.09),
      '--errand-five': clamp((progress - 0.46) / 0.1),
      '--errand-six': clamp((progress - 0.58) / 0.1),
      '--guest-angle': `${-4 + progress * 6}deg`,
      '--title-y': `${-progress * 45}px`,
      '--title-opacity': 1 - progress * 0.82,
      '--tagline-opacity': taglineOpacity,
      '--sun-y': `${progress * 90}px`,
      '--sun-scale': 1 + progress * 0.12,
      '--list-clip': `${(1 - reveal) * 100}%`,
      '--list-y': `${-25 + reveal * 25}px`,
      '--list-angle': `${12 - reveal * 8}deg`,
    };
    Object.entries(values).forEach(([key, value]) => stage.style.setProperty(key, value));
    const nextBeat = progress < 0.18 ? -1 : progress < 0.46 ? 0 : progress < 0.72 ? 1 : 2;
    if (nextBeat !== activeBeat) {
      activeBeat = nextBeat;
      beats.forEach((beat, index) => {
        beat.classList.toggle('is-current', index === nextBeat);
        beat.setAttribute('aria-hidden', String(nextBeat < 0 || index !== nextBeat));
      });
    }
  }
  function schedulePaint() {
    if (!frame && !motionOff()) frame = requestAnimationFrame(paintStory);
  }
  function configureMotion() {
    document.documentElement.classList.toggle('motion-story', !motionOff());
    motionToggle.setAttribute('aria-pressed', String(motionOff()));
    motionToggle.textContent = motionOff() ? 'Motion is off' : 'Turn motion off';
    if (manualMotionOff && !reducedMotion.matches) motionToggle.textContent = 'Turn motion on';
    motionToggle.disabled = reducedMotion.matches;
    document.dispatchEvent(new Event('storymotionchange'));
    activeBeat = -1;
    if (motionOff()) {
      beats.forEach(beat => { beat.removeAttribute('aria-hidden'); beat.classList.remove('is-current'); });
    } else schedulePaint();
  }
  window.addEventListener('scroll', schedulePaint, { passive: true });
  window.addEventListener('resize', schedulePaint);
  reducedMotion.addEventListener('change', configureMotion);
  motionToggle.addEventListener('click', () => {
    manualMotionOff = !manualMotionOff;
    configureMotion();
    story.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  configureMotion();

  const encounters = {
    coworker: {
      feedback: '“A coworker. I don’t know them that well.”',
      question: '“Do you know whether they enjoy wine? And how much are you looking to spend?”',
      context: 'If wine is a good fit, narrow it to two choices within the guest’s spending range. These examples show the conversation, not final product recommendations.',
      options: [
        ['A familiar favourite', 'Start with a style the recipient is known to enjoy.', '“You mentioned they like white wine. Let’s start there and find something in your range.”'],
        ['A thoughtful alternative', 'Offer a second option with one clear reason to consider it.', '“If you’d like a different direction, I can show you another option and explain how it compares.”'],
      ],
    },
    enthusiast: {
      feedback: '“A wine lover. They know what they like.”',
      question: '“Do you remember a bottle or style they enjoy? And what would you like to spend?”',
      context: 'Use a known favourite as your starting point. Offer a familiar direction and a considered discovery; ask a colleague when you need more product knowledge.',
      options: [
        ['Stay close to their taste', 'Find a bottle that connects to a known preference.', '“If that’s a favourite of theirs, I’d look for something with a similar style. Let’s check our options.”'],
        ['Make a small discovery', 'Explore a related style with a specific, verified point of difference.', '“For something a little different, let me show you a related option and what makes it worth considering.”'],
      ],
    },
    host: {
      feedback: '“Tonight’s host. The invitation was last-minute.”',
      question: '“Is this a thank-you gift, or something to serve with dinner? What would you like to spend?”',
      context: 'A host gift and a dinner pairing can be different jobs. Find out which one the guest needs before choosing the bottle.',
      options: [
        ['A thank-you for later', 'Choose around the host’s preferences; they don’t have to open it tonight.', '“If it’s a thank-you, we can focus on something the host would enjoy another time.”'],
        ['Something for the table', 'Ask about the meal before offering a pairing.', '“If you’re bringing it for dinner, what’s being served? That will help us narrow it down.”'],
      ],
    },
  };
  const choices = [...document.querySelectorAll('[data-recipient]')];
  const feedback = document.querySelector('.choice-feedback');
  const discovery = document.querySelector('.bottle-discovery');
  const cards = [...discovery.querySelectorAll('.study-card')];
  function selectRecipient(key, persist = true) {
    const encounter = encounters[key];
    if (!encounter) return;
    choices.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.recipient === key)));
    const reply = document.createElement('p');
    reply.textContent = encounter.feedback;
    const prompt = document.createElement('p');
    const strong = document.createElement('strong');
    strong.textContent = `Your next question: ${encounter.question}`;
    prompt.append(strong);
    feedback.replaceChildren(reply, prompt);
    discovery.querySelector('.bottle-context').textContent = encounter.context;
    cards.forEach((card, index) => {
      const [title, summary, detail] = encounter.options[index];
      card.querySelector('.option-title').textContent = title;
      card.querySelector('.option-summary').textContent = summary;
      card.querySelector('.option-detail').textContent = detail;
      card.querySelector('details').open = false;
    });
    discovery.hidden = false;
    if (persist) {
      try { sessionStorage.setItem('last-stop-opening-recipient-v1', key); } catch { /* Storage is optional. */ }
    }
  }
  choices.forEach(button => button.addEventListener('click', () => selectRecipient(button.dataset.recipient)));
  try {
    const saved = sessionStorage.getItem('last-stop-opening-recipient-v1');
    if (saved) selectRecipient(saved, false);
  } catch { /* Private browsers can disable session storage. */ }
})();
