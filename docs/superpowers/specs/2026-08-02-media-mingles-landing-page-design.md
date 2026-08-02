# Media Mingles Landing Page Design

## Objective

Build a responsive, cinematic agency landing page that presents Media Mingles as a premium creative partner. The page should feel like an interactive showreel while remaining readable, fast, accessible, and easy to update with real campaign assets later.

## Creative Direction

The site uses a near-black editorial canvas, warm orange and red light, warm-white typography, and mixed campaign imagery spanning food, beauty, lifestyle, and energy. Oversized condensed headings provide the main visual rhythm. Geist provides clear supporting text.

The page avoids SaaS cards, glass panels, generic gradient blobs, purple technology styling, and repeated fade-up effects. Motion is reserved for ambient atmosphere, direct interaction feedback, and major scroll-driven narrative transitions.

## Page Flow

1. A fixed minimal navigation sits above a full-screen hero.
2. The hero headline scales and separates while floating campaign media moves outward. A mask transition reveals Selected Work.
3. Selected Work becomes a pinned horizontal campaign sequence on desktop and a vertical editorial sequence on mobile.
4. Services appear as large full-width rows with cursor-following media previews and active background changes.
5. A mixed-aspect media wall moves diagonally and responds to scroll speed.
6. The showreel begins inside an irregular central mask, then expands to fill the viewport.
7. Results, About, and Contact progressively reduce visual noise, ending with a focused oversized CTA.
8. The footer closes with agency details, navigation, social links, and the line "Built for attention."

## Component Architecture

The server-rendered `app/page.tsx` only composes sections. Interactive behavior remains inside focused client components.

- `components/layout/Navbar.tsx`: scroll state, anchor links, magnetic CTA, and accessible full-screen mobile menu.
- `components/sections/Hero.tsx`: masked headline, floating media, pointer parallax, pinned scroll transition, and work reveal.
- `components/sections/SelectedWork.tsx`: desktop horizontal timeline, mobile vertical sequence, active campaign styling, and background color changes.
- `components/sections/Services.tsx`: typography rows, hover shifts, accent lines, cursor preview, and active background media.
- `components/sections/MediaWall.tsx`: twelve-item mixed grid, diagonal column movement, center focus, and velocity skew.
- `components/sections/Showreel.tsx`: pinned mask expansion, layered type, play affordance, and mute control for future video use.
- `components/sections/Results.tsx`: four placeholder metrics with masked rolling or scrambling reveals.
- `components/sections/About.tsx`: layered team imagery with gentle pointer response and capability labels.
- `components/sections/Contact.tsx`: reduced-noise final CTA, magnetic circular button, and social actions.
- `components/layout/Footer.tsx`: final agency details and links.
- `components/ui/MagneticButton.tsx`: reusable pointer attraction with keyboard-safe behavior.
- `components/ui/AnimatedText.tsx`: reusable line and word masks without runtime text mutation.
- `components/ui/GrainOverlay.tsx`: persistent inline SVG noise and vignette layer.
- `components/providers/SmoothScrollProvider.tsx`: Lenis, GSAP ticker, and ScrollTrigger integration.
- `data/projects.ts` and `data/services.ts`: campaign, service, and media values that can be replaced without editing components.

## Motion System

Three motion speeds keep the experience coherent:

- Slow: ambient gradients, background parallax, and floating media drift.
- Fast: magnetic buttons, service-row shifts, menu transitions, and hover feedback.
- Narrative: hero transformation, horizontal work travel, diagonal media wall, and showreel expansion.

Every animated section uses `useLayoutEffect`, `gsap.context()`, and cleanup. ScrollTrigger is refreshed after layout setup. `gsap.matchMedia()` separates desktop and mobile behavior. Transform and opacity changes are preferred to layout properties.

When `prefers-reduced-motion` is enabled, Lenis, pinned sequences, pointer parallax, velocity skew, and continuous ambient movement are disabled. All content remains visible in a normal document flow.

## Background System

A fixed, non-interactive background sits behind the page. It combines large blurred radial light fields, a dark vignette, CSS-driven slow drift, and an inline SVG turbulence filter for film grain. Section state changes adjust warm color intensity without reducing text contrast. Decorative frames remain low-opacity and never block content or pointer input.

## Media and Performance

All campaign media is configured in reusable data files. Unsplash images use `next/image` and a narrow remote image pattern in `next.config.ts`. Hero media loads eagerly where needed; below-the-fold media stays lazy. Responsive `sizes` values prevent oversized image downloads.

The starter showreel uses a lightweight animated gradient and image treatment instead of downloading a large video. Its controls and structure allow a real muted video to be added later. Media containers retain campaign-specific color treatments if a remote image fails.

Desktop pinning is avoided on mobile. Pointer-following previews only run on devices with precise pointers. Animations use cached element references and GSAP quick setters where continuous pointer input is needed.

## Content and Data

The page includes all supplied agency services, campaign names, copy, results, About copy, contact copy, navigation, and footer details. The four result figures are explicitly marked in source code as unverified placeholders that must be replaced before publication. Email, WhatsApp, Instagram, and showreel destinations remain clearly named placeholders until real details are supplied.

## Accessibility and Failure Handling

Semantic landmarks and heading order are preserved. Buttons and menu controls have visible focus states and labels. The mobile menu traps visual focus through a full-screen layer, closes with Escape, and restores page scrolling. Decorative media uses empty alt text; meaningful campaign imagery uses descriptive alt text.

Readable overlays remain present over all background media. The page does not depend on JavaScript for content visibility. Missing remote media leaves designed backgrounds and readable text in place.

## Validation

Validation includes:

- Production build and TypeScript checks.
- ESLint.
- Desktop and mobile layout inspection.
- Navigation, menu, anchors, and CTA interaction checks.
- ScrollTrigger cleanup and responsive breakpoint checks.
- Reduced-motion behavior.
- Image sizing, lazy loading, and readability over media.
- Console and hydration error checks.

## Scope Boundary

This starter implements the full landing page experience with temporary media and contact destinations. It does not add a CMS, contact form backend, analytics, Three.js, real campaign metrics, or a production showreel video.
