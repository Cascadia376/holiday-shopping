(() => {
  'use strict';
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

