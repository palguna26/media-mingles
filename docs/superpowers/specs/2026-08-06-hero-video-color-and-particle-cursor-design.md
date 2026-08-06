# Shared video, color system, and pixel cursor

## Goal

Use `public/background.mp4` as the shared background across every page and make the full site feel visually connected to the video. Replace the current dot cursor with a local pixel-color distortion effect.

## Hero

- Render one fixed, full-bleed, muted, looping video behind the full site.
- Use `/background.mp4`, following the Next.js `public` asset convention.
- Keep the current hero copy, links, responsive layout, and pinned split-text scroll sequence.
- Remove the old WebGL statue from the hero.
- Add a deep-blue overlay so white copy remains readable across bright video frames.
- Keep the video decorative and outside the accessibility tree.
- Keep the video clear in the home hero, then heavily blur it after the hero.
- Keep the video heavily blurred on every inner page.

## Color system

The video samples are mostly cool white and blue. Use a restrained project-wide palette based on those frames:

- Background: pale blue-white
- Surface: light powder blue
- Text: deep navy
- Muted text: desaturated blue-grey
- Accent: electric blue
- Dark sections: deep navy with pale text

Existing components should inherit these colors through the shared CSS variables. Remove or override old red, lime, beige, and unrelated blue section colors where they conflict with the new system.

## Pixel hover

- Replace the single dot with a fixed transparent canvas.
- Sample the video pixels directly beneath the pointer.
- Use dense tiny square pixels in the center with scattered pixels around the edge, matching the supplied halftone reference.
- Blend the light pixels against the page so the background changes color beneath them.
- Fade older pixel clusters smoothly so the effect reads as a continuous trail, not a cursor shell.
- Make quick movements create a wider and more pronounced trail.
- Run only for fine pointers with hover support.
- Hide the effect for touch input and reduced-motion preferences.
- Keep particle count and pixel ratio capped for performance.

## Validation

- Run lint and a production build.
- Check that the video path is valid and that the removed statue import leaves no TypeScript errors.
- Confirm reduced-motion and touch fallbacks remain present in source.

## Scope

This change does not alter copy, page structure, routes, or content. It does not commit changes.
