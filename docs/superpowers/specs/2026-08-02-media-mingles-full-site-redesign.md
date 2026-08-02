# Media Mingles Full-Site Redesign

## Objective

Refine the existing Next.js website into a premium, cinematic agency experience built around controlled rebellion. Redesign the homepage and every existing inner page while preserving routes, forms, working behavior, useful content, and reusable infrastructure.

The site must always use the name Media Mingles. Media Mingle is a separate competitor and must never supply public content, proof, contacts, identity, or claims.

## Visual Direction

The complete site uses a dark-only visual system:

- Deep charcoal `#0D0D0D` for the main canvas.
- Soft black `#141414` and brown-black `#29251F` for section depth.
- Warm off-white `#F2EFE8` for primary text.
- Soft grey `#AAA69D` and muted stone `#D8D3C8` for supporting text and dividers.
- Electric coral `#FF5C45` as the main accent.
- Acid green or cobalt may appear for one campaign at a time, then return to the neutral system.

There is no light theme, theme switcher, white page section, permanent neon gradient, or persistent glowing background. Fine grain, a soft vignette, tonal shifts, image quality, spacing, and typography create depth.

Typography pairs an editorial serif with a clean grotesk sans. A condensed local face is limited to campaign numbers, labels, and selected high-energy words. Body copy stays readable. Large type appears only where it establishes a clear focal point.

## Experience Principles

- Every viewport has one dominant focal point.
- Large campaign media carries the energy; decoration stays secondary.
- Approximately two thirds of the experience is calm editorial restraint.
- Motion is cinematic and controlled, with short energetic moments as punctuation.
- The site remains complete and readable without animation.
- Mobile is a deliberate vertical experience, not compressed desktop choreography.
- Real Media Mingles content is preserved. Unverified claims and uncertain destinations are labelled as placeholders in source data.

## Shared Architecture

Keep the App Router and current component model. Shared layout covers:

- Fixed navigation with Work, Services, Studio, Contact, and a Make something CTA.
- Full-screen mobile menu with one campaign image and one accent colour.
- Shared dark inner-page hero with editorial type and compact metadata.
- Shared page CTA, footer, media treatments, section labels, and motion helpers.
- Typed site, service, project, metric, media, contact, and social data.
- Existing contact API, audit API, validation, and lead form behavior.

Avoid abstractions used only once. Client components are limited to sections that need interaction or animation. Server components continue to render static content.

## Homepage

### Hero

A full-viewport campaign image forms the visual anchor. The headline reads `WE MAKE BRANDS / HARD TO IGNORE.` with one contrasting editorial word. Supporting copy and two CTAs sit in a strict lower grid. One small recording label or production timestamp supplies personality.

Desktop animation uses a masked headline reveal, slow media scale, subtle pointer depth, and a short hero-to-work transition. Mobile removes pinning and pointer effects while keeping a strong static composition.

### Selected Work

Three or four large campaign stories use shared data and one media asset at a time. Each contains brand, title, statement, services, result, number, and accent. Desktop uses a restrained pinned sequence. Mobile uses a clean vertical sequence. Existing real work remains where supportable; temporary content is labelled in code.

### Services

Six editorial rows replace generic cards. Desktop hover changes one shared preview, expands a line, reveals description, and shifts text slightly. Keyboard focus receives the same useful state. Mobile uses tap or scroll activation with the description always accessible.

### Creative Interlude and Gallery

A short contact-sheet interlude contains the concentrated energetic moment. It uses a strict grid, limited overlap, one accent, and fast but brief reveals. It resolves into a calm gallery of six to eight large assets with captions, intentional aspect ratios, and gentle parallax.

### Showreel

A wide cinematic frame begins within generous dark space and expands during scroll on desktop. It includes labelled play, pause, mute, and sound controls with no autoplay audio. Mobile uses a stable wide frame without pinning. Placeholder media stays easy to replace.

### Results, Studio, Contact

Results use four editorial metrics with fine rules and quiet masked reveals. Placeholder values are explicitly marked and never presented as verified facts in data comments.

Studio uses one strong team image, one smaller candid image, direct copy, and compact capability labels. Contact removes visual noise and ends with a single strong CTA, business channels, location, and a short project-enquiry route.

## Inner Pages

- About becomes the full Studio story with principles, capabilities, process, and production imagery.
- Services expands each service with outcomes, deliverables, and relevant proof without generic cards.
- Work becomes an editorial case-study index using the same project data and campaign accents.
- Reach explains creator coverage and operating model without overstating scale.
- Pricing keeps package information direct and scannable while avoiding SaaS pricing-card styling.
- Insights retains its route and becomes a restrained editorial index ready for real articles.
- Contact keeps the existing lead form and audit path within the new dark system.

All inner pages use the same grid, type scale, media rules, focus states, and CTA language.

## Motion System

GSAP and ScrollTrigger handle major scroll sequences. Lenis supplies smooth scrolling. Framer Motion is limited to small component interactions already suited to React state.

- Small interactions: 0.25–0.5 seconds.
- Text and image reveals: 0.7–1.2 seconds.
- Major transitions: 1.2–2 seconds.
- Ambient movement: slow and low contrast.

Use `gsap.context()` and `gsap.matchMedia()` with complete cleanup. Limit major pinned experiences to the hero, selected work, and showreel. Clean up ScrollTriggers, matchMedia handlers, event listeners, timelines, observers, and video state.

Reduced motion disables Lenis, pinning, parallax, continuous grain movement, and complex masks. Content remains visible in normal document flow.

## Media and Performance

Use local media through `next/image` with correct `sizes`, deliberate priority only above the fold, and lazy loading elsewhere. Videos use posters, compressed sources, accessible controls, and viewport observers so they pause off-screen. Do not introduce Three.js.

Animation stays on transform, opacity, and carefully tested clip paths. Avoid layout animation, large continuous loops, and multiple eager videos. Prevent horizontal overflow at every breakpoint.

## Accessibility

Use semantic landmarks, logical headings, descriptive alt text, keyboard-accessible menus and controls, visible focus states, adequate contrast, and touch targets. The mobile menu closes with Escape, restores body scroll, and exposes correct expanded state. No audio starts automatically.

## Content Safety

Before completion, search all source and public content for `Media Mingle`, `mediamingle.in`, competitor contact details, and encoding corruption. The only permitted competitor reference is this private implementation note. Replace broken punctuation and mojibake across the public experience.

Contact destinations already present in the project remain configurable. If ownership cannot be confirmed from repository evidence, label them as placeholders in the data file instead of inventing replacements.

## Validation

- Production build and TypeScript validation pass.
- ESLint passes.
- Every route renders without console or hydration errors.
- Desktop and mobile layouts are visually checked.
- Navigation, menu, anchors, forms, and CTAs work.
- Reduced-motion behavior is checked.
- Video controls and off-screen pausing are checked.
- No horizontal overflow exists at target widths.
- GSAP, listener, observer, and timeline cleanup is reviewed.
- Competitor-reference and mojibake searches pass within public code and content.
- Unused files or dependencies are removed only when confirmed safe.

## Scope Boundary

This redesign covers the existing website and routes. It does not add a CMS, invent client claims, create fabricated testimonials, add Three.js, deploy the site, or replace placeholder campaign footage with unprovided production assets.
