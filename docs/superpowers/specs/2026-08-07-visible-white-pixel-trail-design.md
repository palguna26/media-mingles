# Visible white pixel trail

## Goal

Make the existing mouse trail moderately easier to see over the shared video background without covering page content.

## Design

- Keep the existing canvas-based, desktop-only pointer trail and reduced-motion guard.
- Render the pixels in solid white by removing difference blending from the canvas.
- Increase pixel density, size, and opacity slightly.
- Keep the trail's current radius and fade duration so it remains restrained.
- Keep the layer order: video background, trail, then page content.

## Validation

- Run lint.
- Confirm the cursor canvas retains `pointer-events: none` and sits behind `main` and the footer.
