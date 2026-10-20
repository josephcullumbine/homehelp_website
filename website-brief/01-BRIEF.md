# Website Brief: Norwich home support service

> Read this first. Then `02-CONTENT.md` (copy and pages), then `03-DESIGN.md` (look and feel).
> Assets are in `assets/`. Build the site from these files; don't invent facts not in them.

## What this is
A small, family-run service in Norwich giving **practical help at home**: the everyday jobs that keep a home running. One local coordinator, named and background-checked helpers, the same few faces every time.

**Working name:** "Help at Home" (Norwich / Norfolk). The final business name and domain are **not decided** (see Open questions). Keep the name in one config/constant so it can be changed in one place.

## The one-line pitch
*"Your trusted local proxy family: practical help at home, so the people who love you can just be family."*

## The problem we solve
- Older people in Norwich struggle with housework, the garden, shopping, paperwork and tech. The alternatives are care agencies (built around personal care), free charity help, or hunting for individual tradespeople. There is nothing simple and trusted in between.
- **Their adult children** often live far away, with jobs and kids of their own (the "sandwich generation": usually women, torn between their own household and ageing parents). They want to help but can't do the practical stuff from a distance. They need a trusted local person to act as their proxy.
- Our service takes the practical load so family keep the emotional relationship and don't burn out.

## Audiences (in priority order)
| # | Who | What they want | How they find us |
|---|-----|----------------|------------------|
| 1 | **Adult children** arranging help for a parent (often at a distance) | A service they can trust, book, and check on without being there | Google search, Facebook/social, referrals. **This is the main buyer.** |
| 2 | **Older people** at home, often alone | Regular, familiar, friendly help | Via family, charities, word of mouth, flyers, noticeboards |
| 3 | **Busy working households** | Garden tidy, decorating, errands, admin | Local social groups, Nextdoor, repeat customers |
| 4 | **Referral partners** (Age UK Norwich, care agencies, housing/community groups) | Somewhere to send practical jobs they don't take | Direct contact |

**Design implication:** the site speaks to two people at once. Write mostly to the adult child ("your mum", "your dad"), but it must be easy, large-type and reassuring for an older person reading directly.

## Primary goals of the site (in order)
1. Make a visitor **trust** us within seconds (who we are, what's safe, what we don't do).
2. Make it **easy to enquire**: phone and a short enquiry form, on every page.
3. Show clearly **what we do and don't do** (this protects the business legally; see below).
4. Be found locally ("home help Norwich", "help for elderly parent Norwich", "gardening Norwich", etc.).

## Non-negotiable rules
- **We do not provide personal care** (washing, bathing, dressing, toileting). It's CQC-regulated and we are not registered. The site must **never imply or hint** at it. Requests for it are referred to a registered agency.
- Keep the **"What we don't do"** list visible and easy to find (own section on Services, short version in the footer).
- **Don't publish prices** yet; they aren't set. Use "Get a free, no-obligation quote".
- **Don't claim** DBS checks, insurance, first aid/safeguarding training, or references **until confirmed** (see Open questions). Build a "Trust & safety" section as ready-to-enable content, hidden behind a simple flag.
- No stock-photo-of-smiling-seniors clichés if avoidable; warm, local, real.

## Scope: pages
1. **Home**
2. **Services** (with a clear "what we don't do" section)
3. **How it works** (the job flow)
4. **For families** (the adult-child / "proxy family" page, the main marketing page)
5. **About us** (family-run, local; placeholder for founder story, to supply)
6. **Trust & safety** (flagged; see rules)
7. **Contact / Request a visit** (form + phone + area covered)
8. **FAQ**
- Footer: legal pages (Privacy, Terms), the don't-do list, area covered.

## Functional requirements
- **Enquiry form**: name, phone, email, who the help is for (myself / a relative), service(s) wanted (checkboxes), postcode/area, message, preferred contact time. GDPR consent checkbox + link to privacy policy. Form should send to an email address (configurable) and work with no backend (e.g. Formspree/Netlify Forms or a simple mailto fallback; ask which hosting is used).
- **Click-to-call** phone number in the header on mobile.
- **Fully responsive**, mobile-first (many adult children will arrive on phones from Facebook).
- **Accessible**: WCAG 2.2 AA, large readable type, high contrast, keyboard friendly, no autoplay or motion that can't be turned off. The older audience makes this essential, not optional.
- **Fast**, static-friendly (plain HTML/CSS/JS or a static generator is fine; no heavy framework needed).
- **Local SEO basics**: page titles/meta, `LocalBusiness` schema.org JSON-LD, sensible headings, alt text, sitemap, robots.
- Cookie-light: no tracking by default (avoids cookie banner). Add privacy-friendly analytics only if asked.

## Technical suggestion (adjust if the user prefers)
Static site (plain HTML/CSS or Astro/11ty), deployable to Netlify/Cloudflare Pages/GitHub Pages. Keep content in one place (e.g. a `content` data file or Markdown) so non-developers can edit wording.

## Open questions (don't guess; leave clearly marked placeholders)
- **Business name and domain**: undecided. Candidates considered: Norwich Help at Home, Norwich Home Support, Norwich Assist, Norfolk Help at Home, Norwich Home Services, Norwich Help (.com / .co.uk).
- **Area covered**: Norwich city only, or suburbs (Taverham, Sprowston, Hellesdon, New Costessey) and nearby villages? Placeholder: "Norwich and surrounding areas".
- **Phone, email, address, opening hours**: to supply.
- **Founder story / photos / names**: to supply.
- **DBS, insurance, training, references**: status unconfirmed; keep Trust section behind a flag until confirmed.
- **Driving / lifts to appointments**: logo sheet lists "Driving" as a *non-service*; the business plan queried lifts to appointments. **Treat as NOT offered** until confirmed.
- **Pet care (dog walking), shopping, collections/drop-offs, gardening**: marked green (newer/extra) on the logo sheet; included in services but the owner should confirm.
- **Prices**: not set. No prices on site.
- **Booking forms, job sheet, follow-up sheet, invoice sheet, ID badges**: being made separately by the owner (not part of the website, though the ID-badge look should match the brand).
