(() => {
  'use strict';
  const panel = document.getElementById('shelf-coaching');
  if (!panel) return;
  // Prompts guide a conversation; they do not assert unverified product properties.
  const prompts = [
    ['Pinot Grigio', '“Is there a Pinot Grigio you already enjoy, or are you trying something new?”', 'Scan for Pinot Grigio on the label and two options in range. Use familiar bottles and packaging cues to narrow the choice; check a detail when you need it.', '“Let me show you two options in your range and explain how they compare.”'],
    ['Sauvignon Blanc', '“Do you have a favourite Sauvignon Blanc we can use as a starting point?”', 'Check the notes for their familiar bottle and a possible alternative. Find a specific similarity or difference.', '“Let’s start with what you like about that one, then compare another option.”'],
    ['Chardonnay', '“What do you enjoy about the Chardonnay you usually buy?”', 'Look up how the bottles are described, including oak influence and texture. Don’t assume every Chardonnay tastes the same.', '“I can help you look for that style. Let me check these two options.”'],
    ['Sparkling', '“Is it for a toast, a gift, or something to have with the meal?”', 'Check sweetness, format and price for the occasion. Confirm any alcohol-content requirement.', '“For that occasion, here are two choices in your range. Let’s compare them.”'],
    ['Pinot Noir', '“Is this for someone who already enjoys Pinot Noir, or for dinner tonight?”', 'Scan sloping-shouldered bottles for Pinot Noir, then use a known favourite or the meal to narrow your shortlist.', '“That gives us a starting point. Let me find two options that fit.”'],
    ['Cabernet', '“Do you know a Cabernet they particularly enjoy?”', 'Scan high-shouldered Bordeaux-style bottles for Cabernet. Use the label, spending range and a familiar favourite to pick two options.', '“Let’s use that favourite as our starting point and see what fits your range.”'],
    ['Malbec', '“Are you looking for a familiar favourite or a little change?”', 'Find a known option and one alternative. Check the region, current price and a useful detail from the tasting notes.', '“I can show you a familiar direction and another option, and explain the difference.”'],
    ['Merlot', '“Is this for you, or do you know what the person receiving it enjoys?”', 'Scan Bordeaux-style bottles for Merlot, then use the label, price and recipient’s preferences to choose two examples.', '“Let’s start with their taste and what you want to spend, then narrow it to two.”'],
  ];
  const products = JSON.parse(document.getElementById('ond-product-data').textContent);
  const productImage = document.querySelector('[data-ond-image]');
  const productLinks = document.querySelector('[data-ond-links]');
  const productTitle = document.querySelector('[data-ond-title]');
  const productNote = document.querySelector('[data-ond-note]');
  const buttons = [...document.querySelectorAll('[data-shelf-style]')];
  let activeCategory = 0;
  let returnFocus = null;
  const dialog = document.createElement('dialog');
  dialog.className = 'bottle-dialog';
  dialog.setAttribute('aria-labelledby', 'bottle-dialog-title');
  dialog.setAttribute('aria-describedby', 'bottle-dialog-description');
  dialog.innerHTML = `<button type="button" class="bottle-close" autofocus aria-label="Close bottle details">Close ×</button>
    <div class="bottle-detail-layout"><div class="bottle-portrait" role="img"></div>
    <div class="bottle-detail-copy"><p class="eyebrow" data-bottle-category></p>
    <h2 id="bottle-dialog-title"></h2><p class="bottle-format"></p>
    <p id="bottle-dialog-description"></p><p class="bottle-selection-note"></p>
    <a class="bottle-product-link" target="_blank" rel="noopener noreferrer">View product ↗</a>
    <a class="bottle-source-link" target="_blank" rel="noopener noreferrer">Description source ↗</a>
    <p class="bottle-smallprint">Check your store’s current price, availability and vintage.</p></div></div>`;
  document.body.append(dialog);
  const portrait = dialog.querySelector('.bottle-portrait');
  function openBottle(category, side, trigger) {
    const pair = products[category];
    const product = pair?.products[side];
    if (!product || dialog.open) return;
    returnFocus = trigger;
    portrait.style.backgroundImage = `url("${pair.image}")`;
    portrait.style.backgroundPosition = side === 0 ? 'left center' : 'right center';
    portrait.setAttribute('aria-label', product.name + ' bottle illustration');
    dialog.querySelector('[data-bottle-category]').textContent = pair.category;
    dialog.querySelector('#bottle-dialog-title').textContent = product.name;
    dialog.querySelector('.bottle-format').textContent = product.format + ' · SKU ' + product.sku;
    dialog.querySelector('#bottle-dialog-description').textContent = product.description;
    dialog.querySelector('.bottle-selection-note').textContent = product.sku === '467951' ? 'Catalogue alternative · OND placement not confirmed.' : 'From the 2026 OND selection.';
    dialog.querySelector('.bottle-product-link').href = product.url;
    dialog.querySelector('.bottle-source-link').href = product.descriptionSource;
    dialog.showModal();
    document.documentElement.classList.add('bottle-details-open');
    if (document.documentElement.classList.contains('scene-motion') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && portrait.animate) {
      portrait.animate([{transform:'translateY(24px) scale(.78)',opacity:0},{transform:'translateY(0) scale(1)',opacity:1}],{duration:350,easing:'cubic-bezier(.2,.8,.2,1)'});
    }
  }
  dialog.querySelector('.bottle-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  // Native dialog handles Escape and keeps keyboard focus inside while open.
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('bottle-details-open');
    returnFocus?.focus({preventScroll:true});
  });
  function addBottleButtons(container, categoryGetter) {
    container.classList.add('bottle-hit-area');
    return [0, 1].map(side => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'bottle-hit bottle-hit-' + side;
      button.setAttribute('aria-haspopup', 'dialog');
      button.setAttribute('aria-label', 'Explore ' + products[categoryGetter()].products[side].name);
      button.addEventListener('click', () => openBottle(categoryGetter(), side, button));
      container.append(button);
      return button;
    });
  }
  const shelf = document.querySelector('.confidence-shelf');
  shelf.removeAttribute('aria-hidden');
  shelf.querySelectorAll('.shelf-bottle').forEach((container, category) => addBottleButtons(container, () => category));
  // Wrap the image so the hit areas cover only its rendered square, not the panel padding.
  const art = productImage.parentElement;
  const imageWrap = document.createElement('div');
  art.insertBefore(imageWrap, productImage);
  imageWrap.append(productImage);
  const pairButtons = addBottleButtons(imageWrap, () => activeCategory);
  const hint = document.createElement('p');
  hint.className = 'bottle-explore-hint';
  hint.textContent = 'Tap a bottle to take a closer look ↗';
  art.append(hint);
  function updatePairButtons() {
    pairButtons.forEach((button, side) => button.setAttribute('aria-label', 'Explore ' + products[activeCategory].products[side].name));
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.shelfStyle);
    const prompt = prompts[index];
    const selection = products[index];
    if (!prompt || !selection) return;
    activeCategory = index;
    updatePairButtons();
    document.querySelector('.ond-pair-info .eyebrow').textContent = index === 6 ? 'OND PICK + CATALOGUE ALTERNATIVE' : 'FROM THE 2026 OND SELECTION';
    productImage.src = selection.image;
    productImage.alt = selection.products.map(product => product.name + ', ' + product.format).join(' and ') + ' — product illustrations';
    productTitle.textContent = 'Two ' + selection.category + ' options.';
    productNote.textContent = index === 6
      ? 'Catena is an OND selection. Alamos is a catalogue alternative, not confirmed on the checked OND lists.'
      : 'Check your store’s current availability and pricing before recommending.';
    productLinks.replaceChildren(...selection.products.map((product, side) => {
      const item = document.createElement('li');
      const label = document.createElement('span');
      label.className = 'eyebrow';
      label.textContent = side === 0 ? 'LEFT / OPTION 01' : 'RIGHT / OPTION 02';
      const link = document.createElement('a');
      link.href = product.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = product.name + ' ↗';
      const format = document.createElement('span');
      format.textContent = product.format + ' · SKU ' + product.sku;
      item.append(label, link, format);
      return item;
    }));
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    ['name', 'ask', 'learn', 'say'].forEach((key, index) => {
      panel.querySelector(`[data-shelf-${key}]`).textContent = prompt[index];
    });
    // Native focus stays on the chosen button; feedback is announced in place.
    if (document.documentElement.classList.contains('scene-motion') && panel.animate) {
      panel.animate([{ opacity: 0.5, transform: 'translateY(10px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 220, easing: 'ease-out' });
    }
  }));
})();

