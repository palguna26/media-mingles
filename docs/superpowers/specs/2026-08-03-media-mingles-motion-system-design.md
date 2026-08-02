# Media Mingles Motion System

## Goal

Add a memorable motion identity to the existing website without changing its layout, copy, media, routes, or brand system. The rhythm is calm framing, wild interruption, and clean resolution.

## Approach

Build on the existing GSAP section timelines instead of replacing them. A small global client layer owns Lenis scrolling, the page intro, contextual desktop cursor, and section progress. Each complex section keeps its own GSAP timeline and cleanup.

## Sequence

1. A short `FRAME 001` intro wipes into the hero once per browser tab.
2. The hero image reveals through a hard mask. Its two headline lines separate during a restrained pinned scroll and resolve into the work label.
3. Existing capability and project sequences remain intact. Project backgrounds pick up each real project accent.
4. Service media changes through a fast image cut.
5. A short contact-sheet sequence uses five existing campaign images, builds controlled visual pressure, then resolves into one frame.
6. The showreel poster rises from a cropped editorial frame into a full-viewport takeover. The unavailable reel remains clearly marked as coming soon.

## Accessibility and performance

- Lenis, cursor, continuous motion, pins, and scrub effects stop for reduced-motion users.
- The cursor runs only for fine pointers and uses one GSAP ticker callback.
- Mobile uses native vertical scrolling, a swipeable media strip, short masks, and no cursor or progress rail.
- All GSAP scopes, match-media handlers, listeners, Lenis instances, and ScrollTriggers clean up on unmount.
- Animation targets transforms, opacity, and short clip paths. Existing `next/image` sizing remains in place.

## Verification

Run ESLint and the production build. Check keyboard focus, anchors, reduced motion, pointer behavior, mobile overflow, and that every visible brand reference says Media Mingles.
