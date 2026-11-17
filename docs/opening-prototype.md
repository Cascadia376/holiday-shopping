# The Last Stop — holiday story preview

A playable holiday education story: arrival and recipient choice, holiday table, inclusive hosting, gift presentation, Den Rewards conversation, a relaxed departure, and a three-question practice check. The original field notes remain available below the story.

## Content boundaries

Bottle Study 01 and 02 are illustrative placeholders, not approved OND recommendations. Real product photos, availability, prices and pairing recommendations still require product review. Den Rewards prompts refer to current training without inventing benefits. The practice check provides local feedback only; it does not submit scores or record staff completion. Production training integration remains outstanding.

Unsupported shopping percentages, packaging-as-quality claims, bottle-shape sweetness shortcuts and pressure to exceed a guest’s spending range have been removed from the supporting guide. A final Operations content review is still needed.

## Assets and motion

Generated transparent PNGs were encoded as WebP with alpha preserved:
- list-keeper.webp: adult guest arriving with phone, shopping bags and umbrella.
- bottle-studies.webp: two generic, labelled study bottles.
- holiday-table.webp: tactile paper-collage holiday table.
- guest-ready.webp: matching guest departing with a gift bag.

The character uses two composite poses; limbs are not separately rigged. Lists, text, table tickets, an extra place setting and CSS gift-bag parts animate independently. Native scroll controls sticky stages through passive listeners and requestAnimationFrame. Gift-bag folds, tissue and ribbon reveal as the learner scrolls.

## Interaction and accessibility

Recipient choices, pairing practice, inclusive-host prompts and Den responses use native buttons. The final check uses labelled radio groups with required answers, score feedback and retry. Only recipient choice is optionally restored in session storage; no identifying information is collected.

The visible motion toggle and OS reduced-motion preference provide a static reading mode. Both HTML entry points share scripts, styles and art. All story beats are present in the unenhanced document.

## Validation

The previous opening was visually checked on desktop and at 390px, including choices, keyboard selection, session restoration and motion-off mode. Browser policy blocked interaction QA for the new continuation, so its visual/interaction acceptance remains pending. Source checks cover anchors, duplicate IDs, asset existence and JavaScript syntax; the production build is checked before publishing.

The pre-existing third-party analytics module reported a missing track export in earlier browser testing; this is outside the story implementation.

## Second choreography pass

The arrival now settles into place with a slight carrying bob and staggered list entries. Bottle cutouts rise and rotate into their cards as the shelf comes into view. A new pinned hosting scene fills two paper glasses, brings them together and reveals a celebration note. The gift bag receives a bow and swinging paper tag. The closing scene is now pinned: a doorway opens, the guest moves toward it, and a paper checklist crosses off the three remaining tasks.

All movement is driven by scroll and reverses when scrolling back. CSS transforms apply only while motion is enabled. New decorative props are hidden from assistive technology; controls and lesson text remain native HTML. The character still uses composite poses rather than separately articulated limbs. No new product or completion-tracking work is included.

Validation for this pass: production build, JavaScript syntax, whitespace and both entry-point structure checks passed. Browser interaction and visual QA remain pending because the earlier browser policy restriction has not been bypassed.

## Field Note 05 — confidence shelf

Replaces the static emoji grid with a dedicated scroll scene. Eight decorative bottle silhouettes rotate and move from a scattered arrangement into two shelf rows; labels and a paper confidence note appear as the lesson progresses. The follow-on activity offers eight native style buttons and a live pocket prompt with Ask / Look up / Explain guidance, plus a one-bottle shift exercise and an expandable colleague-help script.

The silhouettes represent categories, not stocked products. No prices, availability or bottle-specific tasting claims are invented. The scene uses the shared reduced-motion/static-reading behavior. Build, JavaScript syntax, balanced section/div structure, unique IDs, anchors, assets and eight category controls checked on both HTML entry points. Visual QA remains pending under the existing browser restriction.
