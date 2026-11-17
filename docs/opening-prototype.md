# The Last Stop — opening prototype

The first scene uses native scroll with a sticky stage, a generated transparent character cutout, an independently revealed paper list, moving backdrop, and three text beats. The first guest encounter offers three recipient choices and two illustrative bottle cards per choice. It is an opening prototype, not the complete training course.

## Content boundaries

Bottle Study 01 and 02 are generated placeholders, not OND recommendations. Product photos, prices and pairing claims require the product review described in the November 9 brief. Completion tracking, the remaining story scenes, Den Rewards training and the course knowledge check are not implemented in this prototype. The original guide follows the prototype and has not received its planned content review.

## Assets

Built-in image generation was used with the approved concept board as reference. Original PNGs were encoded as WebP with alpha preserved. The character is one composite sprite; bags, arms and scarf are not separately rigged in this first prototype. List, text and backdrop move independently.

- `public/art/list-keeper.webp`: full-body adult List Keeper in a mustard raincoat, green/cream scarf, dark trousers and green boots; phone, pink/kraft bags and folded umbrella; transparent photographic paper-collage cutout matching the approved board; no list, bottles, text or background.
- `public/art/bottle-studies.webp`: two front-facing generic photographic wine bottles; green capsule white wine marked STUDY 01 and burgundy capsule red wine marked STUDY 02; transparent background, no real brand or tasting claims.

## Behavior

- Native scrolling controls transforms through a passive listener and a single scheduled animation frame.
- OS reduced-motion preference disables choreography. A visible control also lets the reader turn motion off. All beats remain readable without animation or JavaScript.
- Native buttons/details support keyboard operation. Selected recipient state is restored using optional session storage; no identifying information is collected.
- Original desktop/mobile entry routes remain; both share the same opening code and art.

## Validation

Production build and JavaScript syntax checks passed. Visually checked desktop and 390px iframe layout, scroll progression, all three recipient responses, expandable explanations, Enter-key selection, session restoration and the motion-off reading state. No horizontal overflow observed at 390px. The existing third-party analytics module reports a missing `track` export in the local browser; this pre-existing issue is outside this opening prototype and does not block its interactions.
