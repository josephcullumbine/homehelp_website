# Design Brief

## Feel
**Warm, local, trustworthy, calm.** A friendly family business, not a corporate care agency and not a clinical charity. Reassuring for a worried adult child at 10pm on a phone; legible and uncluttered for a 78-year-old on a tablet.

Keywords: homely · dependable · human · clear · unhurried.
Avoid: clinical blue-and-white "care home" look, stock images of staged smiling seniors, jargon, busy layouts, tiny type, carousels, pop-ups.

## Brand assets (from owner's logo sheet)
See `assets/logo-options/`:
- `logo-sheet-reference-1.png`: the owner's working sheet showing all options (view this first).
- `icon-1.svg … icon-8.svg`: the icon variants: **a house sitting on an open hand** and **a heart on an open hand**, in outline and filled versions, black and orange.
- Lockup in the sheet: orange house-on-hand icon + bold sans wordmark **"Help at Home"** (stacked).

**Direction (confirm with owner; logo not finalised):** use the **orange house-on-hand** with the "Help at Home" wordmark as the working logo. Handle the logo as a single swappable asset/component so it can be replaced.

**Brand colours:** orange (approx. `#E97132`, taken from the logo files) plus black/near-black. Orange is the signature, so use it for the logo, key buttons and small accents rather than large fills. Pair with warm neutrals (cream/off-white backgrounds, warm grey text) and a calm supporting tone (suggest a soft sage/green or deep warm brown) to keep it gentle.
- Check contrast: orange `#E97132` on white **fails** AA for body text. Use a darker orange (about `#B84F14` or darker) for text/links and for button fills with white text; use the brighter orange only for decorative accents and large graphics.
- Suggested palette (adjust freely, keep AA contrast):
  - Background: warm off-white `#FFFBF6`
  - Surface/cards: `#FFFFFF` with a soft border
  - Text: `#2B2622` (near-black, warm)
  - Brand orange (decorative): `#E97132`
  - Action orange (buttons/links, AA with white): `#B84F14`
  - Soft tint: `#FCEBDD`
  - Supporting calm: sage `#5E7B5A` (also good for "what we do" ticks)
  - "Don't do" accent: a muted red `#A32D2D` used sparingly. (The owner's sheet uses red for non-services and green for newly added services; keep the idea of green ticks / red crosses, but make it accessible: always pair colour with an icon and text, never colour alone.)

## Typography
- The owner's sheet trialled fonts (Agency FB, Ink Free, Harrington, etc.). These are mostly novelty/Windows-only faces and **not suitable for body text or the web**. Don't use them.
- Use a friendly, highly legible humanist/rounded sans (e.g. **Nunito**, **Lato**, **Source Sans 3**, **Atkinson Hyperlegible**) via Google Fonts or self-hosted. One family, 2 weights is enough; a warm serif for big headlines is optional.
- **Body ≥ 18px (1.125rem)** on desktop, ≥ 17px on mobile; line-height ~1.6; max line length ~65 characters. Buttons ≥ 48px tall. Big, clear headings.

## Layout and components
- Generous whitespace, single clear column on mobile, max content width ~1100px.
- **Sticky header** with logo, short nav, and a prominent **Call** button (phone icon + number) on mobile.
- **Primary CTA** ("Request a free visit") repeated: hero, after each major section, footer.
- **Service cards**: icon + title + one line. 4 groups, scannable. Use simple line icons in a consistent style; they should echo the hand-and-house style of the logo.
- **"What we don't do" component**: compact reusable list (icon ✕ + text), used on Services and in the footer; styled calmly, not alarming. Should look good as a small card since it will be reused on the staff ID badge.
- **Process steps**: numbered 1–6 horizontal on desktop, vertical on mobile.
- **Reassurance trio** with icons on the home page.
- **Form**: big labels above fields, clear errors, plain-language, not too many fields.
- Photography: if used, real, local, natural (hands, kitchens, gardens, Norwich scenes). Placeholders for now; keep image slots easy to swap. Otherwise lean on illustration/icons and typography rather than fake stock imagery.

## Motion
Minimal. Gentle fades at most. Respect `prefers-reduced-motion`. No autoplay, parallax or carousels.

## Accessibility checklist (must pass)
- WCAG 2.2 AA contrast, visible focus states, full keyboard use, semantic landmarks/headings, alt text, labels on all form fields, tap targets ≥ 44px, text resizable to 200% without breaking, no information by colour alone, `lang="en-GB"`.

## Tone of voice
Like a kind, capable neighbour: plain, warm, specific, unhurried. Address the reader as "you". Honest about limits ("we don't do X"). No jargon ("sandwich generation", "domiciliary", "service users"), and never talk down to older people or guilt-trip family.

## Deliverables for Claude Code
- Responsive multi-page static site per `01-BRIEF.md` / `02-CONTENT.md`.
- Brand tokens (colours, fonts, spacing) as CSS variables in one place.
- Business name, phone, email, area covered in one config so placeholders are easy to fill.
- A `TODO.md` listing every remaining `[PLACEHOLDER]` and open question.
