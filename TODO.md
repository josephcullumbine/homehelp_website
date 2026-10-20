# TODO before launch

Placeholders show on the site as **yellow highlighted [BRACKETS]** while `showPlaceholders` is `true` in `site/assets/js/config.js`. The browser console also reports how many are left on each page. None should be live at launch.

## 1. Business details (all in `site/assets/js/config.js`)
- [ ] **Business name**: working name "Help at Home". Candidates: Norwich Help at Home, Norwich Home Support, Norwich Assist, Norfolk Help at Home, Norwich Home Services, Norwich Help. Once decided, change `name` in config, then find and replace "Help at Home" in the `<title>` tags of the HTML files (crawlers that don't run JavaScript see those).
- [ ] **Domain**: `url` in config, plus `site/robots.txt` and `site/sitemap.xml`.
- [ ] **Phone number**: `phone`
- [ ] **Email address**: `email`
- [ ] **Opening hours**: `hours`
- [x] **Reply time**: "within two working days", taken from the HubSpot form.
- [ ] **Area covered**: `area`. Norwich city only, or Taverham, Sprowston, Hellesdon, New Costessey and nearby villages? Also fill in the FAQ answer in `faq.html`.
- [ ] Set `showPlaceholders: false` once everything is filled in.

## 2. Services to confirm
- [x] **Gardening** and **Shopping and errands**: the HubSpot form offers them, so they're no longer marked to confirm.
- [ ] **Collections and drop-offs** and **Pet care** are on the logo sheet but *not* in the HubSpot form. Still marked `confirm: true`: confirm or delete them.
- [ ] **Waiting in**, **Home from hospital**, **Ironing and beds** and **minor repairs** are on the logo sheet but not in the HubSpot form. Still shown on the site. Add them to the HubSpot form, or remove them from the site.
- [ ] **Prescriptions (decision needed)**: the HubSpot form offers "Collect prescriptions", but the brief and logo sheet list "Collecting or giving out medication" as something we don't do. The site keeps it under "What we don't do" and leaves it out of the enquiry form. If prescription collection *is* offered, update the don't-do list in config (e.g. "Giving out or managing medication") and add the option back to `enquiryTasks`.
- [ ] **Driving and lifts**: treated as *not offered* (listed under "What we don't do", and in the FAQ answer). Confirm.
- [ ] **Free first visit?** The site says "Request a free visit" (from the brief). `how-it-works.html` step 2 asks to confirm.
- [ ] **Job sheet after each visit**: `for-families.html` and How it works step 4. Confirm it's in place.

## 3. Trust and safety (hidden until confirmed)
Edit `trust` in config. Each item only appears once `confirmed: true`; set `enabled: true` to add the page to the menu and add it to `sitemap.xml`. Preview everything at `trust-and-safety.html?preview=trust`.
- [ ] Basic DBS checks for every helper
- [ ] Photo ID badges (also mentioned in How it works step 4)
- [ ] Public liability insurance
- [ ] Training: first aid, safeguarding, dementia awareness
- [ ] Key and key-safe policy (to be written; also in `terms.html`)
- [ ] Complaints route (to be written; also in `faq.html` and `terms.html`)
- [x] Never handle bank cards, PINs or passwords (policy; already live)

## 4. Page content
- [ ] **About us** (`about.html`): founder story, founder photo, team first names, photos and one line each. Don't invent these.
- [ ] **How it works**: payment terms (step 6).
- [ ] **FAQ**: minimum booking, complaints route, areas covered.
- [ ] **Privacy policy**: legal name, address, form provider, retention period, date. Have it checked.
- [ ] **Terms**: payment terms, cancellations, key policy, complaints. Have them written and checked.
- [ ] **Logo**: not final. Replace `site/assets/img/logo-mark.svg` (and `favicon.svg`) to change it everywhere.
- [ ] **Photos** (optional): real, local and natural. Image slots on About us take an `<img>` in place of the placeholder.

## 5. Hosting and the enquiry form
- [x] **HubSpot**: the form is published and the site now sends enquiries straight to it (`form.provider: "hubspot"`).
- [ ] Send one real test enquiry from the live site and check it arrives in HubSpot.
- [ ] In HubSpot:
  - fix the "Companionship visits and check-ins" options: two have internal values of `true` and `false` instead of their names ("Regular company", "Regular check-ins - phone call"). The site sends `true`/`false` for now so HubSpot accepts them; once fixed, delete `optionValues` in config;
  - the Message box has its prompt set as a pre-filled *value* (with a typo, "please tells us"), so it gets submitted as the message. Make it placeholder text instead;
  - consider adding Postcode and Best time to contact fields (the site currently adds these to the end of the message), and turning on HubSpot's GDPR consent options;
  - email is required in HubSpot, so in HubSpot mode the site asks for email (and suggests phoning if they don't have one);
  - "I would like help for" options must stay exactly "Myself" and "My family member" to match the site.
  - Update the privacy policy to name HubSpot as the form provider.
- [ ] **Which hosting?** Netlify, Cloudflare Pages or GitHub Pages all work. Upload the `site/` folder.
- [ ] **Form delivery**: set `form.provider` in config:
  - `"formspree"`: create a free form at formspree.io and paste its URL into `form.endpoint`.
  - `"netlify"`: only on Netlify. Also add `data-netlify="true"` to the `<form>` tag in `contact.html`, because Netlify detects forms in the HTML at deploy time.
  - `"mailto"` (current): opens the visitor's own email app. Works without any setup but is the least reliable.
- [ ] Send a test enquiry once it's live.
- [ ] **404 page**: if the host serves `404.html` for deep paths, change its asset links to start with `/`.

## 6. Nice to have
- [ ] Self-host the Atkinson Hyperlegible Next font instead of loading it from Google Fonts (keeps visitors' IP addresses off Google, which suits the no-tracking aim).
- [ ] Add a Google Business Profile and link it.
- [ ] Privacy-friendly analytics, only if wanted (no cookie banner needed with e.g. Plausible).
- [ ] The "What we don't do" list is a reusable component (`.dont-list`) sized to work on the back of staff ID badges.
