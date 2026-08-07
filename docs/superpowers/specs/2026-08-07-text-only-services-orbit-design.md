# Text-only services orbit

## Goal

Replace the image-led What we do section with a pinned, scroll-driven text service carousel.

## Desktop interaction

- Display one service card centred in the section.
- As scrolling advances, the active card moves upward and fades away.
- The next card rises from below into the same centre position.
- Place the current service number on a left-side circular guide.
- Rotate the number guide anticlockwise in step with the card transition.
- Remove service images and their layout space entirely.

## Responsive and accessibility behavior

- On mobile and reduced-motion preferences, show the services as a readable, static vertical list.
- Preserve the existing service labels, descriptions, and links.

## Validation

- Run lint and a production build.
- Confirm the desktop ScrollTrigger and matchMedia cleanup work when the component unmounts.
