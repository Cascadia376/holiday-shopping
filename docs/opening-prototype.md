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

## Conversation cast — November 18

The original concept sheet’s Thoughtful Gifter (teal coat, grey beard, glasses and plaid scarf) and Last-Minute Invite (striped sweater, olive jacket, curls and shoulder bag) now join the existing List Keeper as reusable transparent WebP sprites. Built-in image generation used the original cast sheet as the identity/style reference. Prompts requested faithful standalone three-quarter character portraits, conversational gestures, tactile paper-collage realism, no text or scenery, and alpha transparency. Assets: `public/art/thoughtful-gifter.webp` and `public/art/last-minute-invite.webp`.

Field Note 06 features the Thoughtful Gifter beside the full spending-range exchange. All seven formal conversations now pair a recurring guest with clearly labelled Guest/You speech bubbles. Portraits also accompany the opening encounter, dinner practice, inclusive-host practice, checkout, gift-bag prompt, Field Note 05 coaching and colleague-help scripts. These are fictional guest characters, not representations of staff.

The shared character stylesheet stacks scenes on mobile. IntersectionObserver triggers one gentle entrance for each character and staggered dialogue movement; no text is hidden or gated behind scrolling. The motion toggle and OS reduced-motion preference cancel active movement. Without JavaScript, the complete illustrated conversation remains visible.

Validation: syntax, build, both HTML structures, seven conversations per entry point, image references and unique IDs checked. Browser visual QA remains pending under the previously reported browser restriction.

## Heuristics correction — November 18

Supersedes the earlier framing that discouraged packaging and bottle-shape shortcuts. Field Notes 03, 04 and 07 now teach rapid pattern recognition: packaging economics and premium positioning, Bordeaux shoulders for a fuller red direction, Burgundy slopes for Pinot Noir, and flutes for aromatic whites and a starting point for off-dry options. Field Note 05 prompts now support scanning and shortlisting rather than requiring research for every recommendation.

Teach System 1 for the initial shortlist and System 2 for a specific uncertainty or requirement. Weight, label finish and punt depth are clues to positioning, not a quantified probability of superior sensory quality. Sweetness should be checked when it is central to the guest’s request. No probabilities are claimed.

Editorial reference: Wine Enthusiast, “What Does Your Bottle Really Say About the Wine?” https://www.wineenthusiast.com/culture/wine/what-does-your-bottle-really-say-about-the-wine/ (regional bottle traditions, premium cuvée packaging, glass cost and weight, and punt conventions). The aisle-scanning examples are practical training applications of those conventions.

## Heuristic illustrations

Added `public/art/bottle-shape-guide.webp` (Bordeaux, Burgundy and Alsace/flute) and `public/art/packaging-cues.webp` (simple and premium presentation). Generated with the built-in image tool: realistic transparent unbranded bottle illustrations, isolated equal-width cells, accurate contrasting silhouettes, and a packaging pair showing label finish and shallow/deep bases. CSS displays each cell above its associated text with accessible image descriptions. These are generic teaching illustrations, not stocked products. Removed the old illustrative dollar amounts from the packaging comparison. Original PNGs were encoded to WebP with transparency preserved.

## Original-script restoration — November 19

The user-supplied original script is restored as the uninterrupted narrative backbone immediately after the opening title: Understanding the December Shopper, The Three Types of Gift Buyers, The Package Tells the Story, Trust the Package, and You're Not Selling—You're Rescuing. The supplied wording, prices, 70% statement, dialogue and order are preserved verbatim. Packaging and character illustrations are presentation additions; they do not replace script text.

Newer interactive scenes are introduced afterward as the Extended Field Guide. Superseded rewritten versions of the original sections are removed from the visible flow. `docs/original-script.txt` is the canonical plain-text copy. `npm run verify:original-script` checks both HTML entry points word-for-word and in order, along with the opening title, opening line and both logos.

The opening line now owns the first scroll beat. It begins fading at 5% story progress and is fully gone before the first pink eyebrow and story card enter at 18%, preventing the mobile overlap shown in review. Static and reduced-motion reading modes continue to show all content in normal document flow.

## Opening-to-shopper transition — November 19

The title and first lesson now behave as one continuous scroll scene. Near the end of the blue opening, the handwritten errand list descends beyond its grid and crosses the section boundary. The December Shopper scene uses the recurring List Keeper sprite so the phone, shopping bags and wet-weather clothing directly echo the script; parking lines, a car marker, wrapped gifts and three paper cues extend the second paragraph’s office-party, host-gift and unexpected-plus-one imagery.

As the scene exits, the copy and collage clear and a blue layer expands across the full viewport above the sticky header. The word “Last” scales up until it fills the page, then the layer releases into the next section. The animation reverses with native scrolling and is removed from reduced-motion/static reading mode. Decorative additions are hidden from assistive technology and excluded from the original-script text check.

The review revision removes the flex-centering gap that delayed the December Shopper scene, raises the errand list above the pink progress rule, and extends the pinned reading interval so the full lesson remains visible before the Last wipe begins. The scene now uses two generated transparent assets: `public/art/list-keeper-tired.webp`, a new full-body pose of the recurring List Keeper carrying bags, a gift, phone and keys; and `public/art/holiday-errand-car.webp`, a wet holiday parking-lot cutout with a present- and grocery-filled car. Both were generated with the built-in image tool using the original List Keeper as the identity/style reference, then encoded as transparent WebP assets for the site.
