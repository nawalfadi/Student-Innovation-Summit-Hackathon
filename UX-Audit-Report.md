# Student Innovation Summit Hackathon 2026 — UX/CRO/Performance Audit

**Reviewed as:** a public-facing registration site expected to convert visitors into hackathon sign-ups within seconds of landing.
**Standard applied:** international competition / Apple–Stripe–Linear–Vercel design-review bar.
**Scope:** Navigation, Hero, About, Tracks, Timeline, Universities, Sponsors, CTA, Footer, and the Registration Modal (the actual conversion event — evaluated as its own section since it's where money is made or lost).

No code changes are proposed here. This is a diagnostic only.

---

## 1. Navigation

**First impression (0–3s):** Clean, competent, glassy. It reads as "modern SaaS template" rather than "national hackathon." Nothing here signals *hackathon* — no energy, no urgency, no motion that says "something exciting is happening." It could be the header of a university admissions portal, a fintech landing page, or this hackathon. That's the problem: it's interchangeable.

**Purpose:** Clear enough — five nav items, a Register CTA, a language toggle. No ambiguity about what the header does.

**Visual hierarchy:** The Register CTA doesn't visually dominate the way a primary conversion action should. It's the same visual weight class as a language toggle sitting right next to it — a secondary, low-stakes control. On a page whose entire existence is to get that button clicked, it should out-rank everything else in contrast and size, not sit shoulder-to-shoulder with a locale switch.

**UX:** The nav collapses/expands its logo cluster and re-centers on scroll — technically impressive, but it's motion for motion's sake. A first-time visitor doesn't need to watch two university logos slide in and out; they need to find "Register" and click it. The scroll-driven choreography adds visual noise to a decision that should take one glance.

**Visual design:** Glassmorphism is applied competently (backdrop-blur, saturation boost, soft shadow) but it's the *default* glass look every AI-generated SaaS site has shipped since 2023. There's no typographic or iconographic signature that says "this is Al Yamamah University's hackathon" versus "this is any hackathon."

**Motion:** Smooth, no jank in isolation. But layered on top of an already-animated hero (ambient blobs, parallax rings) it's the first of many "everything moves all the time" signals — see Performance section.

**Performance:** An `IntersectionObserver` recalculates the active nav link on every section transition, a `scroll` listener toggles state on every frame past the 20px threshold, and the header itself re-renders a `grid-cols-[auto_1fr_auto]` layout shift as the logo cluster's `max-width` animates in. None of this is catastrophic alone, but it's compounding with the rest of the page (see §Performance below).

**Accessibility:** No visible focus ring was found distinct from the default browser outline on nav links; the language toggle relies purely on color/position to indicate state, which is a problem for low-vision users. No `aria-current="page"` (or `aria-current="true"`) on the active nav link — screen reader users get no indication which section is "current."

**Conversion:** Neutral-to-negative. The CTA is present but not fighting for attention. A visitor scanning for 2 seconds might miss it entirely because it's visually equal to the language switcher beside it.

**Scores:** UX 6 · UI 7 · Performance 6 · Accessibility 4 · Conversion 5 · **Overall 5.5/10**

---

## 2. Hero

**First impression:** Better than the nav — the layered logo mark, the date/location glass chips, and the two CTAs read as "organized event," which is the baseline it needs to hit. But it stops at "organized." It does not stop at "exciting," "prestigious," or "I need to be here."

**Purpose:** Clear. Name, tagline, dates, location, two calls to action. No confusion about what this page is for.

**Visual hierarchy:** The hero logo/wordmark image is the single largest element on the page, which is correct. But everything below it — tagline, date chip, location chip, buttons — sits at nearly identical visual weight. There's no second-tier emphasis pulling the eye toward "Register Now" specifically over "Explore Tracks." Two CTAs of near-equal visual weight side by side is a classic conversion dilution mistake: every additional choice reduces the probability of the primary action.

**UX:** Cognitive load is low, which is good. But there is zero social proof, zero urgency, and zero specificity in the hero. No "500+ students," no "3 days, $50,000 in prizes," no countdown to the registration deadline, no "Applications close in 12 days." A hackathon hero's job is to create FOMO in the first screen. This one creates calm. Calm does not convert.

**Visual design:** The ambient blob/mist background (dozens of blurred, animated `<div>`s layered behind the content — see AmbientBackground.tsx, which alone renders ~28 separately-animated blurred elements) is the same visual language used site-wide, which gives consistency but also monotony. There is no photography, no video, no human face, no campus shot, no footage from a prior event anywhere on this page. For an event whose entire value proposition is "come be part of something," showing zero humans is a significant miss. Every world-class hackathon site (HackMIT, ETHGlobal, HackHarvard) leads with people — crowds, whiteboards, late-night coding, stage moments. This site leads with abstract gradients.

**Motion:** The parallax on the decorative rings and the fade-up entrance are tasteful and well-timed. This is genuinely one of the better-executed pieces of the page.

**Performance:** The hero alone renders roughly a dozen blurred/gradient decorative layers plus the AmbientBackground's ~28, all with `filter: blur()` and `animation: blob-drift ... infinite`. Blur filters are one of the most expensive things a browser can paint, and having 30+ of them animating simultaneously and infinitely (never pausing, even off-screen or off-tab) is a real GPU/battery cost, especially on mid-range Android hardware, which — for a student audience — is a meaningful share of visitors. Combine this with the hero's `useScroll`/`useTransform` parallax recalculating on every scroll frame, and the very first screen a user sees is already the heaviest one on the site.

**Accessibility:** The all-caps or bold visual hierarchy relies entirely on color/weight; no issues with base contrast (navy on cream passes comfortably), but the decorative images use empty `alt=""` correctly — that part is done right. The two-button row has no visible distinction for keyboard-focus users beyond the default browser ring layered under `backdrop-blur`, which can be very hard to see.

**Conversion:** Middling. It informs, it doesn't persuade. There is no reason given for *why this hackathon matters* beyond a one-line tagline about Vision 2030. No prize amount, no team benefit, no "what you walk away with." A student comparing this to any other opportunity has no differentiator to latch onto.

**Scores:** UX 6 · UI 7 · Performance 5 · Accessibility 5 · Conversion 5 · **Overall 5.5/10**

---

## 3. About

**First impression:** Text-heavy and a little corporate. "Mission," "Goal," a three-step "journey" — reads like a slide from an internal strategy deck, not a section meant to excite a 20-year-old CS student.

**Purpose:** Clear on paper (what the hackathon is, why it exists) but buried in institutional language ("bridge the gap between academia and the job market") rather than benefit-driven language a student would actually respond to.

**Visual hierarchy:** The two-column split (mission card vs. journey steps) is reasonably balanced, but both columns compete for the same attention with near-identical card treatments (`glass-card` used everywhere on the site, undifferentiated by section). By this point in the scroll, the visitor has seen the exact same rounded-glass-card pattern in the header, the hero's date/location chips, and now here — the visual vocabulary hasn't evolved, so nothing feels like a "new idea," it just feels like the same card repeating down the page.

**UX:** Reasonable scanning via numbered steps (01/02/03), which is good practice. But the content itself doesn't answer the question a scrolling student actually has at this point: "what do I *do* for three days, and what do I *get*?" Mission statements answer "why we exist," not "why you should join."

**Visual design:** Consistent with the rest of the site (same navy/gold/cyan palette, same glass treatment) — consistency is a strength here, but it's consistency in service of a look that hasn't yet distinguished itself from a template.

**Motion:** Scroll-reveal stagger works well and doesn't overstay its welcome.

**Performance:** Six more `blue-spray` blurred/animated background elements added on top of everything already running from the hero and header. These never unmount or pause once triggered — they're always-on `animation: infinite` even after scrolling far past them.

**Accessibility:** Icon-only visual cues (Target/Lightbulb/Users) next to headings have no accompanying `aria-hidden` conflict (they are decorative, which is fine), but there's nothing that would trip a screen reader here — this section is actually one of the more accessible ones content-wise.

**Conversion:** Weak. Nothing in this section moves someone closer to clicking Register. It's informational filler that a highly-motivated visitor will skim and a lukewarm visitor will skip entirely — and skipping is exactly when you lose them, because nothing after this section re-earns their attention with urgency until the very end.

**Scores:** UX 6 · UI 6 · Performance 6 · Accessibility 6 · Conversion 4 · **Overall 5.5/10**

---

## 4. Tracks

**First impression:** The strongest content section on the site. Three clear cards, clear icons, clear differentiation. This is the first place the hackathon's actual *concept* — academic guidance → skill-building → job market — becomes tangible.

**Purpose:** Immediately clear. This is the best-executed "purpose clarity" section on the page.

**Visual hierarchy:** Good use of numbering (01/02/03 in large ghost type), icon-in-chip, title, then a bulleted highlight list. The hierarchy here is genuinely well-built — title > subtitle > highlights, in descending visual weight, correctly.

**UX:** Low friction, easy to scan, three cards is the correct number (not overwhelming). This is close to "portfolio quality."

**Visual design:** Best-balanced section. The hover glow blobs on the cards are a nice touch that doesn't overdo it.

**Motion:** The staggered reveal plus the -6px hover lift on each card is tasteful and appropriately restrained.

**Performance:** Two more full-bleed `DecorativeSwirl` PNGs plus six `blue-spray` blurred layers stack onto the running total (see cumulative note in §Performance). Individually fine; cumulatively part of the problem.

**Accessibility:** Track cards are `<article>` elements with real headings — good semantic structure. No interactive affordance issue since these cards aren't clickable (they're descriptive only, which is the correct choice here since the track is chosen later, inside the form).

**Conversion:** This section actually does work — for a highly-engaged visitor who's read this far, it makes the offering feel real and structured. The problem is upstream: by the time someone reaches a genuinely good section, the two sections before it (About, and the low-urgency Hero) have already let a meaningful percentage of visitors disengage or start skimming on autopilot.

**Scores:** UX 7 · UI 8 · Performance 6 · Accessibility 7 · Conversion 6 · **Overall 6.5/10**

---

## 5. Timeline

**First impression:** Competent, standard "3-day agenda" layout. Nothing wrong, nothing memorable.

**Purpose:** Clear — day-by-day breakdown.

**Visual hierarchy:** The numbered circle markers and connecting vertical line are a well-worn but effective pattern. Good use of a dedicated date chip per day.

**UX:** Fine for scanning. No real friction. But the bullet items inside each day ("Official hackathon opening ceremony," "Track unveiling and participation guidelines") are administrative, not evocative — there's no sense of what it *feels* like to be there at 2am on day two.

**Visual design:** Same glass-card language for the fourth consecutive section. By now the repetition is working against the site's "premium" goal — premium sites vary their visual rhythm section to section (Stripe, Linear, Apple never use the identical card component five times in a row); this site uses one card shape for the entire page.

**Motion:** Fine, consistent with the rest.

**Performance:** Two more full-size decorative swirl images, `flipY` transformed, plus six more animated blur layers. This section alone probably isn't the bottleneck, but it's one more multiplier in a page that has, cumulatively, dozens of always-on GPU-blurred elements.

**Accessibility:** No issues beyond what's already systemic (focus states, contrast on faint `text-navy/65` copy sitting close to the AA minimum on some backgrounds — worth an explicit contrast-ratio check before launch, not just an eyeball pass).

**Conversion:** Neutral. Doesn't hurt, doesn't help. A missed opportunity to build excitement through specificity (guest speaker names, a signature moment, a "midnight snack" detail — anything that makes it feel real and lived-in rather than templated).

**Scores:** UX 6 · UI 6 · Performance 6 · Accessibility 6 · Conversion 5 · **Overall 5.5/10**

---

## 6. Universities

**First impression:** A grid of university names/abbreviations. Reads as a partner-logo wall, which is the right idea for building trust — but it's executed as text badges and initials in colored boxes, not as actual university crests/logos (only the host university, Al Yamamah, gets its real logo; the other seven are rendered as plain text abbreviations in a gray box).

**Purpose:** Clear at a glance — "these universities are participating."

**Visual hierarchy:** The host university is correctly distinguished with a gold ring and badge — good use of emphasis for the one entity that matters most to this specific event.

**UX:** Low friction, easy grid scan.

**Visual design:** This is where the "premium" goal breaks down hardest. A wall of seven gray-box initials next to one real, full-color logo looks unfinished — like a placeholder state that shipped by accident, not a deliberate design choice. This is one of the most fixable, highest-leverage visual problems on the entire site: it currently reads as "we don't actually have these universities' logo files yet," whether or not that's true.

**Motion:** Reveal/hover treatment is fine, consistent.

**Performance:** Lighter section, image-wise (only the host logo loads a real image), so this is one of the cheaper sections on the page.

**Accessibility:** `alt` text is present via the university name — acceptable.

**Conversion:** This section is meant to build institutional trust ("real universities are behind this") and currently undercuts that goal because seven of the eight logos look like unstyled fallback states rather than intentional branding. Trust signals that look unfinished are worse than not including the section at all.

**Scores:** UX 6 · UI 5 · Performance 7 · Accessibility 6 · Conversion 4 · **Overall 5/10**

---

## 7. Sponsors

**First impression:** The weakest section on the site. Sponsor names ("SDAIA," "SABIC," "STV," "NEOM Academy," etc.) are rendered as plain text next to a generic building icon inside a glass pill — no actual sponsor logos anywhere.

**Purpose:** Clear in concept (tiered sponsor recognition) but the execution completely undermines the purpose. Sponsor sections exist to (a) flatter sponsors into renewing/increasing support and (b) borrow their credibility to build visitor trust. Neither job is being done when every sponsor — from a national AI authority to a Fortune-scale petrochemical company — is rendered identically as gray text with the same generic `Building2` icon.

**Visual hierarchy:** Tier labels (Platinum/Gold/Silver) are present but visually under-emphasized — small, muted gray text above a generic pill row, when tier distinction (via size, color, or logo scale) is usually the entire point of a tiered sponsor wall.

**UX:** No friction, but also no payoff — there's nothing to look at.

**Visual design:** This is the section most likely to make a visitor question whether the event is real. A real hackathon with real sponsors shows real sponsor logos. Text-in-a-pill is what a placeholder looks like before assets arrive — and if these genuinely are the confirmed sponsors, this treatment actively undersells them.

**Motion:** Fine, but motion can't rescue a section with nothing substantive to reveal.

**Performance:** Lightest section on the page — no heavy images. Ironically, the one section that *should* be image-heavy (real logos) is the one with none.

**Accessibility:** No issues, but only because there's so little content to have issues with.

**Conversion:** Actively harmful. A skeptical visitor — exactly the profile you need to convince — reads "generic icon + company name" as unverified or placeholder, which quietly erodes the trust the entire page has been building. This is the single easiest section to make dramatically better and currently one of the biggest credibility risks on the site.

**Scores:** UX 4 · UI 4 · Performance 7 · Accessibility 6 · Conversion 3 · **Overall 4/10**

---

## 8. CTA (pre-footer)

**First impression:** Finally, real visual contrast — a solid navy block breaks the cream-background monotony that's persisted for six consecutive sections. This is a good instinct.

**Purpose:** Unambiguous — register now.

**Visual hierarchy:** Correct, for once — headline, one line of body copy, one button. No competing CTA. This is the best-structured conversion moment on the page.

**UX:** Minimal friction, single clear action.

**Visual design:** The navy card with gold/cyan corner glows is genuinely one of the more premium-feeling moments on the site — it's a shame it's the *only* moment of real chromatic contrast in an otherwise cream-and-glass page.

**Motion:** Reveal animation on the block is well-timed and doesn't fight the reading rhythm.

**Performance:** Lightweight — two blur layers, no heavy imagery. One of the cheaper sections.

**Accessibility:** White text on navy passes contrast comfortably. Good.

**Conversion:** This section does its job, but it's arriving after seven sections that have gradually bled off urgency (About) and credibility (Sponsors, Universities). A strong final CTA can't fully recover a visitor who checked out two sections earlier. It also repeats copy/CTA nearly identically to the hero button — "Register Now" appears essentially unchanged in both places, so there's no new argument being made, just a second chance to click the same thing for the same reason.

**Scores:** UX 7 · UI 8 · Performance 7 · Accessibility 7 · Conversion 6 · **Overall 7/10** — the best section on the site.

---

## 9. Footer

**First impression:** Standard, safe, forgettable — which is fine for a footer, but the execution has real gaps.

**Purpose:** Clear — contact info, event info, legal line.

**Visual hierarchy:** Reasonable three-column layout.

**UX:** The listed phone number is a placeholder-pattern (`+966 11 000 0000`) and the email is a generic institutional address (`hackathon@yu.edu.sa`) — neither is wrong, but a string of zeros in a phone number is exactly the kind of detail that makes a sharp-eyed visitor wonder what else on the page might be a placeholder that never got finished.

**Visual design:** Consistent navy footer, matches the CTA block tonally, which is good page rhythm — the two darkest sections bookend the page appropriately.

**Motion:** None, correctly — a footer shouldn't move.

**Performance:** Two blur glows only. Cheap.

**Accessibility:** Link contrast (`text-white/65` hover `text-gold`) is on the lower end of comfortable but passes. No skip-navigation link exists anywhere on the site for keyboard users to jump past the header/hero on every page load — a real accessibility gap for a single, long-scrolling page like this one.

**Conversion:** Neutral. Footers rarely convert directly, but a placeholder-looking phone number this close to the bottom of a trust-building journey is a small, avoidable credibility ding.

**Scores:** UX 6 · UI 6 · Performance 7 · Accessibility 5 · Conversion 4 · **Overall 5.5/10**

---

## 10. Registration Modal (the actual conversion event)

This is arguably the most important surface on the entire site, and it's evaluated separately because everything above exists purely to get a visitor to open it.

**First impression:** A long, single-scroll form inside a modal sheet. Functional, not delightful. Nothing about opening this modal feels like "I'm about to join something exciting" — it feels like filling out a university enrollment form.

**Purpose:** Clear — collect participant and team data.

**Visual hierarchy:** Reasonably organized into Personal / Track / Team / Idea sections with icon-labeled headers — this part is done competently.

**UX — this is where real problems surface:**
- **No solo/duo path.** Team size is hard-locked to 3–5 members via a `<select>`. A student without a pre-formed team of at least three has no path forward — no "find a team" option, no "register solo and get matched," nothing. This will silently filter out a meaningful chunk of exactly the audience a first-time hackathon most needs to attract: individual students with no existing team.
- **All member fields are required up front.** The form asks for full name + email for every teammate before submission, meaning one person has to already have collected everyone's information before they can even start registering. This is friction at the exact moment friction kills conversions most.
- **No autosave / no resume.** The `useEffect` clears the entire form 300ms after the modal closes. Accidentally clicking the backdrop, hitting the browser back button, or a stray tap outside the sheet wipes a multi-field form with zero warning or confirmation.
- **No `Escape` key handling and no focus trap.** Keyboard and screen-reader users can currently tab out of the modal into the page behind it while it's "open," and there's no way to close it via `Esc` — both are baseline expectations for any modal in 2026, let alone one gating your primary conversion action.
- **Missing dialog semantics.** The modal container has no `role="dialog"`, `aria-modal="true"`, or `aria-labelledby` pointing at its heading — screen readers have no idea this is a modal at all; it will likely be announced as arbitrary page content.

**Visual design:** Consistent with the rest of the site — same glass treatment, same palette. Fine, not distinguished.

**Motion:** The scale/slide entrance (`animate-modal-in`) is appropriately quick and unobtrusive.

**Performance:** Backdrop uses `backdrop-blur-sm` over the full viewport while the modal itself also uses `backdrop-blur-xl` — two stacked blur contexts is measurably more expensive to composite than one, on top of everything already animating behind it (the modal doesn't pause the hero's ambient blob animations or the Lenis scroll loop while open).

**Accessibility:** The weakest-scoring dimension on the site. No focus trap, no `Escape`, no dialog ARIA role, no visible "required field" indication beyond the browser's native asterisk-less `required` attribute (no `*` or "required" text shown to sighted users, so it's inconsistent between what assistive tech announces and what's visually shown).

**Conversion — the most important finding in this entire audit:** As of this review, the project has no `.env.local` configured. `isFirebaseConfigured()` returns `false`, and the `/api/register` endpoint returns a **503** for every single submission attempt. **Right now, this website cannot accept a single registration.** Every visitor who clicks through the entire funnel and fills out the full multi-section form will hit a wall at the last possible second, told the system "is not configured yet." This is not a design nitpick — it is a complete, total, zero-conversion blocker that supersedes every other finding in this report until it's fixed.

**Scores:** UX 5 · UI 6 · Performance 6 · Accessibility 3 · Conversion **0/10 in its current unconfigured state** (5/10 assuming Firebase is connected before launch) · **Overall 5/10 (functional), effectively 0/10 (as currently deployed)**

---

# Whole-Website Audit

## Biggest UX Problems (highest → lowest impact)

1. **No path for solo participants or incomplete teams.** The registration form assumes every visitor already has a full team with everyone's contact info in hand. This is the single biggest structural UX failure — it turns away individually-motivated students, who are usually a hackathon's most enthusiastic early registrants.
2. **The registration modal has no autosave, no confirmation-before-discard, and clears itself 300ms after any close.** A misclick destroys real work.
3. **Visual sameness across sections creates scroll fatigue.** Seven consecutive sections use the identical `glass-card` treatment on the identical cream background. By Timeline/Universities, the page stops feeling like it's progressing and starts feeling like it's repeating.
4. **The Register CTA doesn't dominate the navigation the way a primary conversion action should** — it's visually peer to a language toggle.
5. **No skip-link, no modal focus trap, no `Escape` handling** — real friction and real exclusion for keyboard/screen-reader users specifically at the conversion moment.

## Biggest UI Problems (highest → lowest impact)

1. **Sponsors section has no actual logos** — text-in-a-pill for national-scale sponsor names looks unfinished, not premium.
2. **Universities grid mixes one real logo with seven gray-box initials**, reading as an incomplete asset pipeline rather than an intentional design choice.
3. **Single repeating card component (`glass-card`) used identically across Hero chips, About, Tracks, Timeline, Universities, Sponsors** — no visual rhythm variation between sections, which is the opposite of how premium multi-section sites (Stripe, Linear, Apple) design page flow.
4. **Typography relies on `"Segoe UI", Tahoma, "Arial Unicode MS", sans-serif`** — none of which exist by default on macOS, iOS, or Android. The overwhelming majority of students on Apple devices will never see the intended typeface; they'll see whatever generic system sans-serif their OS substitutes. For a bilingual Arabic/English site, this is especially costly: none of these fonts are Arabic-optimized, so Arabic text — the primary-locale experience — is rendering in an uncontrolled fallback font on most devices, despite the README explicitly claiming a "Cairo font" was chosen.
5. **No favicon found anywhere in the project.** The browser tab will show a generic blank/default icon. A "world-class technology event" without a favicon is a small but very visible tell.

## Biggest Conversion Problems (why users would NOT register)

1. **Registration currently returns a hard error for every submission** (Firebase unconfigured, `/api/register` → 503). This is a total blocker, not a soft friction point.
2. **No urgency or scarcity anywhere on the page** — no countdown, no "X spots remaining," no application deadline shown in the hero. Nothing creates a reason to act *today* instead of "later" (which, for most students, means never).
3. **No social proof** — no past-event photos, no attendee count from a previous edition, no testimonial, no "as seen in" press logos, no follower/community count. A first-time visitor has no external signal that this event is legitimate, well-attended, or worth prioritizing over a competing opportunity.
4. **Sponsor and university sections look unfinished**, which — counterintuitively — makes the whole site feel less trustworthy even though the copy, structure, and Vision 2030 affiliation are genuinely credible.
5. **Team-size requirement (3–5, no solo option) filters out individual applicants** before they can even express interest, at the exact point they're most willing to commit.
6. **No prize information, no judge/mentor names, no employer/hiring-partner names attached to the "Jisr" job-market track.** For a track explicitly about job-market transition, not naming a single company is a missed trust-and-motivation opportunity.

## Biggest Performance Problems (predicted bottlenecks)

1. **Dozens of simultaneously-animated `filter: blur()` elements, all running `infinite` animations that never pause.** `AmbientBackground` alone renders ~28 blurred, animated divs; each of the six main content sections adds 6 more `blue-spray` layers on top. This is compounding, GPU-bound, and running continuously regardless of scroll position or tab visibility — a real battery and frame-rate cost, especially on mid-range Android devices, which is a meaningful share of a student audience.
2. **All images are loaded with Next.js's `unoptimized` flag**, which disables automatic format conversion (WebP/AVIF), responsive `srcset` generation, and Next's built-in caching/resizing pipeline. Public asset weight currently totals roughly 2.7–3MB across ~15 PNGs (some individually 150–200KB), all shipped as raw PNG.
3. **Two unused, unreferenced source assets** (`_figma-hero.png` at 712KB and `_figma-tracks.png` at 560KB) sit in the `public/decor` folder — over 1.2MB of dead weight shipped in every deploy even though nothing in the codebase references them.
4. **Scroll-driven work is layered three deep**: Lenis's `requestAnimationFrame` loop, the header's native `scroll` listener recalculating `scrolled` state, and an `IntersectionObserver` recalculating the active nav link — all running concurrently on every scroll frame.
5. **No font-display strategy, no self-hosted webfont, no explicit font subsetting** — combined with the fallback-stack issue above, this isn't currently a load-time problem (nothing is being downloaded), but it means there's no controlled typography at all, which is a hidden performance/consistency issue disguised as a non-issue.

## Biggest Accessibility Problems (ranked)

1. **The registration modal has no focus trap, no `Escape`-to-close, and no dialog ARIA semantics** (`role="dialog"`, `aria-modal`, `aria-labelledby` are all absent) — at the exact surface where accessibility matters most, since it's the conversion action itself.
2. **No skip-navigation link** on a long, single-scroll page with a persistent fixed header — keyboard users must tab through the entire header and hero on every single page load before reaching content.
3. **Active-state indication (nav links, language toggle) relies on color/position alone**, with no `aria-current` or equivalent semantic marker for assistive technology.
4. **Required form fields have no visible indicator** (no asterisk, no "required" label) despite being enforced via the HTML `required` attribute and server-side validation — sighted users get no visual cue matching what's programmatically enforced.
5. **Some body copy renders at `text-navy/65` opacity on light backgrounds**, which should be explicitly contrast-checked (not eyeballed) before launch — several instances sit close to WCAG AA's 4.5:1 minimum for normal text.

---

## User Journey Analysis

**0–3 seconds:** Visitor lands on the hero. Reaction: "okay, this looks legitimate and reasonably designed." Neutral-positive, not excited.

**3–10 seconds:** They read the tagline and date/location chips. No emotional hook yet — nothing tells them why *this* hackathon versus any other opportunity competing for their time this semester.

**10–20 seconds (About section):** Attention starts to soften. Mission-statement language reads as institutional rather than exciting. This is the first real drop-off point — a visitor without strong pre-existing intent to attend may start skimming on autopilot from here.

**20–35 seconds (Tracks):** Attention partially recovers — this is the strongest, clearest section on the site, and a visitor who reads it will understand the actual value proposition for the first time.

**35–50 seconds (Timeline, Universities):** Attention plateaus. Competent but unremarkable content, followed immediately by a Universities section that visually undercuts its own trust-building goal with placeholder-looking logos.

**50–60 seconds (Sponsors):** This is the second, more serious drop-off point. A skeptical visitor who was on the fence reads generic-icon-plus-text-name sponsor tiles as a signal the event may not be fully real or fully funded yet — exactly the wrong impression to create right before asking for a commitment.

**60–70 seconds (CTA):** A genuinely strong closing moment — real visual contrast, clear single action. Visitors who are still engaged at this point are likely to click.

**70+ seconds (Registration Modal):** A highly-motivated visitor who makes it this far, has a pre-formed team of 3–5, has everyone's email addresses ready, and fills out the entire form correctly will currently be told the system isn't configured and their registration failed. **This is the single worst possible place in the entire journey for a failure to occur** — after every other filter has already been survived.

## Emotional Journey

The curve is essentially flat-to-mildly-declining for the first 60 seconds, with two real dips (About's institutional tone, Sponsors' placeholder feel), one genuine high point (Tracks), and one strong recovery (CTA) — followed by a hard emotional cliff at the registration failure. A well-executed hackathon site should produce a rising curve: curiosity → interest → excitement → urgency → commitment. This site currently produces: curiosity → mild interest → institutional fatigue → brief re-engagement → skepticism → recovery → **broken promise**. The single biggest emotional-design opportunity is injecting energy, specificity, and social proof into the first 40 seconds, and removing every point of friction from the last 10.

---

## Benchmark Comparison

Against **Apple, Stripe, Linear, Vercel, Notion, Framer**: those companies vary their section-to-section visual rhythm deliberately — different background treatments, different content densities, different card shapes, so scrolling itself becomes a form of narrative pacing. This site uses one card component and one background treatment for the entire page. That's the single largest gap versus that tier.

Against **GitHub Universe, Google I/O**: those events lead with scale and specificity — attendee counts, speaker lineups, session counts, replay libraries from past years. This site has no past-event proof of any kind; it reads as a first-ever event with no track record shown, even if that's not actually true.

Against **ETHGlobal, HackMIT, HackHarvard**: those sites lead with photography and video of real people at real events, prize pools stated in large type, sponsor logo walls with actual logos, judge/mentor headshots and bios, and — critically — frictionless solo/team-matching registration flows. This site has none of those five things. That comparison set is the most directly relevant one (same product category: student hackathon registration), and it's also where the gap is widest.

**What separates premium sites from this one, in one sentence:** premium sites make *specific, verifiable, human* claims (named people, named numbers, named companies, real photos) with visual rhythm that changes as you scroll; this site makes *general, templated, abstract* claims (mission statements, gradient blobs, glass cards) with visual rhythm that repeats.

---

## Prioritized Improvement Roadmap

### Critical (Must Fix)
- **Configure Firebase / fix the 503 on `/api/register`.** Nothing else in this report matters if the form cannot submit. *Impact: Conversion (total blocker → functional), Trust (catastrophic if discovered post-launch).*
- **Add a solo/no-team-yet registration path** (or a clearly-marked "team matching" option). *Impact: Conversion (opens up a currently-excluded segment), Trust.*
- **Add modal accessibility baseline: `Escape` to close, focus trap, `role="dialog"` + `aria-modal` + `aria-labelledby`.** *Impact: Trust, Accessibility, legal/compliance risk reduction.*
- **Replace Sponsors' text-in-a-pill treatment with real sponsor logos** (or remove the section until logos are ready — an absent section is less damaging than one that looks unfinished). *Impact: Trust, Conversion.*
- **Fix the Universities logo inconsistency** — either source real crests for all eight or redesign the fallback state so it doesn't read as "missing asset." *Impact: Trust, Visual Quality.*

### High Impact
- **Fix the font stack for cross-platform + Arabic rendering** (self-host a proper Arabic-capable webfont like the one the README already claims to use). *Impact: Visual Quality, Performance/Consistency, primary-locale experience.*
- **Reduce the animated-blur footprint** — cap simultaneous animated blur layers, pause off-screen/off-tab animations, or replace some `blue-spray` layers with static gradients. *Impact: Performance, especially mobile FPS and battery.*
- **Switch images off `unoptimized`, compress/convert to WebP, and remove the two unused Figma export files.** *Impact: Performance, Core Web Vitals (LCP in particular, given the hero logo is the largest image on the page).*
- **Give the primary Register CTA distinct visual dominance in the header** — separate it from the language toggle's weight class. *Impact: Conversion.*
- **Add urgency and social proof to the hero**: a countdown, a deadline, or a past-edition stat. *Impact: Conversion, Emotional engagement.*
- **Add a skip-navigation link.** *Impact: Accessibility.*

### Nice to Have
- **Introduce visual rhythm variation between sections** (alternate background tone/card treatment so the page doesn't read as one repeating component). *Impact: Visual Quality, reduced scroll fatigue.*
- **Add real photography or video** from a prior event, campus, or promotional shoot. *Impact: Emotional engagement, Trust.*
- **Add prize amounts, judge/mentor names, or hiring-partner names** to the relevant sections. *Impact: Conversion, Trust.*
- **Replace the placeholder-pattern footer phone number** with a real, verified contact number. *Impact: Trust (minor).*
- **Add `aria-current` to the active nav link and visible "required" indicators on form fields.** *Impact: Accessibility.*

---

# Final Verdict

**Would I register for this hackathon based only on this website?** Conditionally — if I already had a team of three to five and strong pre-existing motivation to attend, yes, I'd likely push through to the form. If I were a solo, undecided, or mildly-interested visitor being asked to choose between this and a competing opportunity, no — there isn't enough urgency, proof, or emotional pull in the first 40 seconds to win that competition for attention, and even a fully committed visitor cannot currently complete registration due to the backend not being configured.

**What percentage of visitors would trust this event?** Roughly 60–70%. The Vision 2030 affiliation, the named host university, and the generally competent execution buy real credibility. The unfinished-looking Sponsors and Universities sections, the placeholder-pattern phone number, and the missing favicon are exactly the kind of small details a skeptical 15–20% of visitors will notice and use to downgrade their trust — and currently, 100% of visitors who try to actually register will encounter a hard failure, which would tank trust instantly for anyone who experiences it.

**Does it feel like a student project or a professionally organized international event?** It sits meaningfully above "student project" — the code quality, RTL/bilingual support, and design system consistency are genuinely above-average execution. But it sits below "professionally organized international event" specifically because of the missing human proof (no photos, no people, no past-event evidence), the unfinished-feeling trust sections, and a registration flow that currently cannot complete. It reads as **a strong internal build that hasn't yet been through a pre-launch content and QA pass** — which is exactly what this audit is for.

**Where would it rank against the best hackathon websites in the world (ETHGlobal, HackMIT, HackHarvard, Google I/O, GitHub Universe)?** In the bottom third of that group as currently built — primarily due to the absence of the things that tier universally has (real photography, named prizes, social proof, frictionless team formation) rather than any single execution flaw. The underlying design system is closer to that tier than the content and trust layer currently suggest; closing the content gap would move it up faster than any visual redesign would.

## Overall Score: **58/100**

**Justification:** This is a technically competent, visually consistent, above-average student-org build with a genuinely strong CTA section and Tracks section, real bilingual/RTL engineering effort, and no major structural design failures. It loses significant points not to bad taste but to **incompleteness disguised as design**: sponsor and university trust-sections that look unfinished, a font stack that silently fails on most non-Windows devices, a registration form that currently cannot submit, and a near-total absence of urgency, social proof, or human presence anywhere on the page. None of these are hard problems to fix — which is precisely why, at an "about to launch publicly" bar, they're the difference between a 58 and an 85.
