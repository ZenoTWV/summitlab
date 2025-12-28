# Issue #3 - Cleanup unused assets and generated artifacts

URL: https://github.com/SummitLabDev/summitlab/issues/3

## Scope
- Remove unused public assets: `public/SL.svg`, `public/summit-labs-wordmark.svg`, `public/favicon.svg`.
- Remove unused brand variants under `public/brand`: `black_logo.png`, `black_logo_slogan.png`, `black_icon.png`, `black_icon_wide.png`, `black_favicon.png`, `white_icon.svg`, `white_icon.png`, `white_icon_wide.png`, `white_logo.png`, `white_logo_slogan.png`, `white_wordmark.svg`, `white_favicon.png`.
- Remove source duplicates if not needed: `public/brand/source/logowithslogan.png`, `logowithoutslogan.png`, `favicon.png`.
- Clear generated/untracked directories (`dist/`, `.astro/`, `node_modules/`) before committing; ensure `git status` is clean.
- Verify site still builds and assets resolve after removal.

## Definition of Done
- [ ] Mobile (375px), tablet (768px), desktop (1024px+) pages load correctly after cleanup.
- [ ] Chrome + Safari: no console errors after cleanup.
- [ ] Dutch content remains correct.
- [ ] Images optimized and only referenced assets remain; removed assets not referenced.
- [ ] Forms still work (if applicable).
- [ ] Unused public assets removed (or explicitly retained with reason).
- [ ] Unused brand variants removed (or explicitly retained with reason).
- [ ] Decision recorded for source duplicates; deleted or documented.
- [ ] Generated artifacts cleaned (`dist/`, `.astro/`, `node_modules/`) or re-generated as needed; `git status` clean.
- [ ] `npm run build` succeeds with no missing asset references.
