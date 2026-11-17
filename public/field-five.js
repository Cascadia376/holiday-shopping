(() => {
  'use strict';
  const panel = document.getElementById('shelf-coaching');
  if (!panel) return;
  // Prompts guide a conversation; they do not assert unverified product properties.
  const prompts = [
    ['Pinot Grigio', '“Is there a Pinot Grigio you already enjoy, or are you trying something new?”', 'Find two bottles in their spending range. Check the product notes for a clear difference in style.', '“Let me show you two options in your range and explain how they compare.”'],
    ['Sauvignon Blanc', '“Do you have a favourite Sauvignon Blanc we can use as a starting point?”', 'Check the notes for their familiar bottle and a possible alternative. Find a specific similarity or difference.', '“Let’s start with what you like about that one, then compare another option.”'],
    ['Chardonnay', '“What do you enjoy about the Chardonnay you usually buy?”', 'Look up how the bottles are described, including oak influence and texture. Don’t assume every Chardonnay tastes the same.', '“I can help you look for that style. Let me check these two options.”'],
    ['Sparkling', '“Is it for a toast, a gift, or something to have with the meal?”', 'Check sweetness, format and price for the occasion. Confirm any alcohol-content requirement.', '“For that occasion, here are two choices in your range. Let’s compare them.”'],
    ['Pinot Noir', '“Is this for someone who already enjoys Pinot Noir, or for dinner tonight?”', 'Use a known favourite or details of the meal to guide your shortlist. Verify the tasting notes before describing the wine.', '“That gives us a starting point. Let me find two options that fit.”'],
    ['Cabernet', '“Do you know a Cabernet they particularly enjoy?”', 'Check the label and product notes for the actual wine or blend. Compare two choices within the guest’s spending range.', '“Let’s use that favourite as our starting point and see what fits your range.”'],
    ['Malbec', '“Are you looking for a familiar favourite or a little change?”', 'Find a known option and one alternative. Check the region, current price and a useful detail from the tasting notes.', '“I can show you a familiar direction and another option, and explain the difference.”'],
    ['Merlot', '“Is this for you, or do you know what the person receiving it enjoys?”', 'Check the particular bottle’s style and price. Use the recipient’s preferences to choose your examples.', '“Let’s start with their taste and what you want to spend, then narrow it to two.”'],
  ];
  const buttons = [...document.querySelectorAll('[data-shelf-style]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const prompt = prompts[Number(button.dataset.shelfStyle)];
    if (!prompt) return;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    ['name', 'ask', 'learn', 'say'].forEach((key, index) => {
      panel.querySelector(`[data-shelf-${key}]`).textContent = prompt[index];
    });
    // Native focus stays on the chosen button; feedback is announced in place.
    if (document.documentElement.classList.contains('motion-story') && panel.animate) {
      panel.animate([{ opacity: 0.5, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
    }
  }));
})();
