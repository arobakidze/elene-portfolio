# ELENE LUASHVILI — PORTFOLIO WEBSITE
## Project Bible & Complete Build Instructions

---

> ⚠️ READ THIS ENTIRE FILE BEFORE WRITING A SINGLE LINE OF CODE.
> This is the single source of truth for every decision — design, structure,
> animation, content, and interaction. Do not invent or assume anything not
> written here. If something is marked TODO, leave a clearly visible commented
> placeholder and move on. Every interactive element on this site must be
> FULLY FUNCTIONAL — no fake hover states, no broken links, no placeholder
> click handlers. Build a real working website.

---

## 0. PROJECT OVERVIEW

**Client:** Elene Luashvili
**Profession:** Illustrator, Graphic Designer, UI/UX Designer, 2D Game Artist,
Interior & Industrial Designer
**Location:** Tbilisi, Georgia
**Behance:** https://www.behance.net/eleneart
**LinkedIn:** https://www.linkedin.com/in/elene-luashvili-5671a0237/
**Email:** eleneluashvili2@gmail.com

**The brief:**
The site must be minimalistic and calm — because her work IS colorful and loud,
the site is the quiet frame that makes her work pop. Think gallery walls: white,
restrained, letting the art speak. BUT the site must be deeply satisfying to use.
Every hover, scroll, and click must feel intentional and alive.
Interactions > decoration.

**Primary visual reference:** bruut.media
Study it carefully. Notice:
- The dark warm charcoal background (NOT pure black)
- The salmon-pink accent used sparingly on the starburst, navbar pill, buttons
- The navbar: small individual pill buttons per link (HOME, ABOUT, WORK, CONTACT)
  each with their own pill border — not one shared pill
- The numbered services list: large bold white type, thin rows, on hover the
  entire row floods and an image/preview reveals from the right
- The work cards: large full-width rounded dark capsule pills — circular image
  crop on the left, large campaign name centered, description text on the right —
  on hover the capsule gets lighter/reveals more content
- The REEL button in the center navbar: pill with a video thumbnail inside it
  that plays/animates

**Secondary reference:** The ChatGPT mockup image at /public/reference/mockup.png
Use it for section layout proportions and overall scroll flow. Colors in the
mockup are NOT final — the palette in Section 2 of this document is final.

---

## 1. TECH STACK

```
Framework:      Next.js 14, App Router, TypeScript (strict)
Styling:        Tailwind CSS (layout/spacing) + CSS Modules (component styles)
                All design tokens as CSS custom properties in globals.css
Animations:     GSAP + ScrollTrigger (scroll animations, hovers, reveals)
                Lenis (smooth scrolling)
                Framer Motion (page transitions, AnimatePresence for panels)
Icons:          @icons-pack/react-simple-icons (software skill icons)
```

### Install commands (run in this exact order)
```bash
npx create-next-app@latest elene-portfolio --typescript --tailwind --app --src-dir
cd elene-portfolio
npm install gsap @gsap/react lenis framer-motion
npm install @icons-pack/react-simple-icons
npm install clsx tailwind-merge
```

### GSAP + Lenis integration (in SmoothScroll provider)
```ts
const lenis = new Lenis()
gsap.ticker.add((time) => { lenis.raf(time * 1000) })
gsap.ticker.lagSmoothing(0)
// Register plugins at app root:
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
```

### Fonts (load via next/font/google in layout.tsx)
```
Syne:             weights 400, 600, 700, 800
Playfair Display: weights 400, 700 + italic
DM Mono:          weights 400, 500
```

---

## 2. DESIGN SYSTEM — THE LAW

### 2.1 Color Palette

Define ALL of these in globals.css as :root variables.
NEVER hardcode a hex value anywhere in a component. Only CSS variables.

```css
:root {
  /* ── BACKGROUNDS ──────────────────────────────── */
  --bg-main:      #1A1A1A;   /* Bruut-exact dark warm charcoal — primary bg */
  --bg-card:      #222222;   /* slightly lighter for cards/panels on dark */
  --bg-hover:     #2A2A2A;   /* hover state background on dark sections */
  --bg-white:     #F5F5F3;   /* warm off-white — used for light sections */
  --bg-pink:      #F2B5A0;   /* Bruut salmon-pink — accent bg for pills/tags */

  /* ── TEXT ─────────────────────────────────────── */
  --text-white:   #FFFFFF;   /* pure white — main text on dark */
  --text-off:     #F5F5F3;   /* warm off-white — softer body text on dark */
  --text-muted:   #888888;   /* grey — dates, labels, secondary info */
  --text-dark:    #1A1A1A;   /* dark — text on light/pink backgrounds */
  --text-pink:    #F2B5A0;   /* salmon-pink — accent labels, brackets */

  /* ── ACCENTS ──────────────────────────────────── */
  --pink:         #F2B5A0;   /* Bruut salmon-pink — buttons, starburst, tags */
  --pink-dark:    #D9917A;   /* darker pink — hover state for pink elements */
  --orange:       #D4622A;   /* burnt orange — used very sparingly, CTAs only */

  /* ── BORDERS ──────────────────────────────────── */
  --border:       rgba(255, 255, 255, 0.08);  /* subtle dividers on dark */
  --border-light: rgba(26, 26, 26, 0.12);     /* subtle dividers on white */

  /* ── RADIUS ───────────────────────────────────── */
  --r-sm:   6px;
  --r-md:   14px;
  --r-lg:   28px;
  --r-pill: 9999px;

  /* ── EASING ───────────────────────────────────── */
  --ease-out:    cubic-bezier(0.0, 0.0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 2.2 Typography

```css
/* Apply these classes consistently across all components */
.t-display  { font: 800 clamp(3.5rem, 9vw, 8rem)/0.95 'Syne', sans-serif; }
.t-hero     { font: 700 clamp(2rem, 5vw, 5rem)/1.05 'Syne', sans-serif; }
.t-section  { font: 700 clamp(1.5rem, 3vw, 3rem)/1.1 'Syne', sans-serif; }
.t-heading  { font: 700 clamp(1rem, 2vw, 1.5rem)/1.3 'Syne', sans-serif; }
.t-body     { font: 400 clamp(0.9rem, 1.2vw, 1rem)/1.65 'Syne', sans-serif; }
.t-label    { font: 500 0.75rem/1 'DM Mono', monospace; letter-spacing: 0.12em; }
.t-mono     { font: 400 0.85rem/1.4 'DM Mono', monospace; }
.t-serif    { font: 400 italic clamp(1rem, 1.5vw, 1.2rem)/1.5 'Playfair Display'; }
```

### 2.3 Layout Constants

```
Container:    max-w-7xl mx-auto px-6 md:px-10 lg:px-16
Section pad:  py-20 md:py-28 lg:py-36
Mobile:       < 768px
Desktop:      > 1024px
```

---

## 3. FILE STRUCTURE

Create exactly this structure. No extra files unless necessary.

```
src/
├── app/
│   ├── layout.tsx          ← root layout, fonts, providers, cursor
│   ├── page.tsx            ← assembles all section components in order
│   └── globals.css         ← CSS variables, resets, global utility classes
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── CustomCursor.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Disciplines.tsx
│   │   ├── Projects.tsx        ← full-screen overlay panel
│   │   ├── Skills.tsx
│   │   ├── ForFun.tsx
│   │   └── Contact.tsx
│   │
│   ├── ui/
│   │   ├── MagneticButton.tsx
│   │   ├── MarqueeStrip.tsx
│   │   └── AnimatedText.tsx
│   │
│   └── providers/
│       ├── SmoothScroll.tsx    ← Lenis + GSAP ticker
│       ├── GSAPProvider.tsx    ← plugin registration
│       └── CursorContext.tsx   ← cursor state context
│
├── data/
│   └── content.ts          ← ALL text content lives here
│
├── hooks/
│   ├── useMagneticEffect.ts
│   └── useScrollReveal.ts
│
└── lib/
    └── utils.ts            ← cn() helper

public/
├── videos/
│   └── elene-reel.mp4      ← TODO: Elene to provide
├── images/
│   └── hero-poster.jpg     ← TODO: Elene to provide
├── EleneCV.pdf             ← TODO: Elene to provide
└── reference/
    └── mockup.png          ← the ChatGPT reference image
```

---

## 4. NON-NEGOTIABLE CODE RULES

1. NO inline styles. CSS variables and Tailwind only.
2. NO hardcoded hex colors in any component. Always var(--token-name).
3. NO hardcoded strings in JSX. Every piece of text comes from /data/content.ts.
4. NO document.querySelector. Always useRef for DOM access.
5. NO UI libraries (no shadcn, no MUI, no Chakra). Build everything from scratch.
6. EVERY GSAP context must have a cleanup function: return () => ctx.revert()
7. EVERY interactive element must be FULLY FUNCTIONAL. No empty onClick={() => {}}.
8. EVERY external link opens in new tab with rel="noopener noreferrer".
9. ALL sections are responsive — mobile layout built first, desktop overrides added.
10. Named exports only. No anonymous default exports.

---

## 5. SECTION SPECIFICATIONS

---

### SECTION 1 — NAVBAR

File: src/components/layout/Navbar.tsx

IMPORTANT — Match bruut.media exactly:
- NOT one floating pill. Instead: individual small pill button per link.
- Each link (HOME, ABOUT, WORK, CONTACT) has its own rounded pill outline.
- Active/current page pill is filled with var(--pink) + dark text.
- Non-active pills: dark border + white text.
- Top-left: site name "ELENE LUASHVILI" or logo mark
- Center: the individual pill nav links
- Center-right: A special "REEL" pill button — filled with var(--pink),
  slightly larger. On click: opens the hero video in fullscreen or scrolls to hero.
- Top-right: her initials logo mark OR a 2x2 grid of small squares (Bruut-style logo mark)

Behavior:
- Position: fixed, top of viewport always
- Background: transparent on load, becomes rgba(26,26,26,0.9) + backdrop-blur after 60px scroll
- GSAP ScrollTrigger handles the background transition (not CSS scroll-driven)

Pill CSS:
```css
.nav-pill {
  padding: 6px 16px;
  border-radius: var(--r-pill);
  border: 1px solid rgba(255,255,255,0.3);
  font: 600 0.75rem/1 'Syne', sans-serif;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--text-white);
  cursor: pointer;
  transition: background 250ms var(--ease-smooth),
              border-color 250ms var(--ease-smooth),
              color 250ms var(--ease-smooth);
}
.nav-pill:hover, .nav-pill.active {
  background: var(--pink);
  border-color: var(--pink);
  color: var(--text-dark);
}
```

Mobile: all links hidden, show hamburger icon. Click opens full-screen
dark overlay menu with links stacked vertically, large Syne font.

---

### SECTION 2 — HERO

File: src/components/sections/Hero.tsx
Background: var(--bg-main)
Height: 100vh min

LAYOUT (must match the ChatGPT reference mockup exactly):
Two columns, 50/50 split on desktop, stacked on mobile.

─────────────────────────────────────────
LEFT COLUMN — Video Reel
─────────────────────────────────────────
- Full-height video player (fills the left 50%)
- <video autoPlay muted loop playsInline poster="/images/hero-poster.jpg">
- src="/videos/elene-reel.mp4" → TODO file
- White circular play button icon centered (64px, semi-transparent bg)
  with subtle scale pulse: @keyframes pulse { 0%,100% {scale:1} 50% {scale:1.08} }
- Bottom of video: minimal control bar
  · Left: "00:00 / 01:12" in DM Mono
  · Center: orange thin progress bar (actually functional using video.currentTime)
  · Right: volume icon + fullscreen icon
  Both icons functional. Volume toggles mute. Fullscreen uses requestFullscreen().

─────────────────────────────────────────
RIGHT COLUMN — Experience + CV Drawer
─────────────────────────────────────────
Background: var(--bg-card)

THE DRAWER INTERACTION (critical — this is what makes the hero special):
The entire right column behaves as a physical drawer being pulled out.
- On mouseenter the right column:
  · GSAP: translateY(-6px), scaleX(1.015), duration 0.4s, ease spring
  · A thin 2px var(--pink) line fades in at the very top edge of the column
  · Subtle box-shadow deepens on the left edge (depth illusion)
- On mouseleave:
  · GSAP: returns to translateY(0), scaleX(1), duration 0.5s, ease smooth

Right column content (top to bottom, all from content.ts):

  [EXPERIENCE]
  ← DM Mono 0.7rem, var(--text-pink), uppercase, letter-spacing 0.15em

  "A creative and detail-oriented designer turning ideas into engaging visuals."
  ← Syne 600, ~1.3rem, var(--text-white), line-height 1.4, max-width 380px

  📍 Tbilisi, Georgia  ← DM Mono, var(--text-muted), 0.8rem

  ────── divider (var(--border)) ──────

  EXPERIENCE ROWS (loop over experience[] from content.ts):
  Each row:
    [year range]     [role title]           [↗]
                     [company name]
  
  year: DM Mono 0.75rem var(--text-muted)
  role: Syne 600 0.95rem var(--text-white)
  company: Syne 400 0.85rem var(--text-muted)
  ↗ arrow: appears on row hover, rotates from → to ↗, var(--pink)
  Row hover: left border 2px var(--pink) fades in, background lightens to var(--bg-hover)
  Row is NOT a link — it's purely visual.

  ────── divider (var(--border)) ──────

  [VIEW FULL CV  ↓]
  ← pill button, var(--pink) background, var(--text-dark) text
  ← onClick: triggers download of /public/EleneCV.pdf
  ← Use: <a href="/EleneCV.pdf" download> wrapped in button styles

PAGE LOAD ANIMATION — GSAP timeline, fires once on mount:
```ts
const tl = gsap.timeline()
tl.fromTo(overlayRef.current,
  { yPercent: 0 }, { yPercent: -100, duration: 1.1, ease: 'power3.inOut' })
  .fromTo(videoColRef.current,
  { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.4')
  .fromTo(expColRef.current,
  { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '<')
  .fromTo('.exp-row',
  { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.07, ease: 'power2.out' }, '-=0.3')
```

---

### SECTION 3 — DISCIPLINES

File: src/components/sections/Disciplines.tsx
Background: var(--bg-white) ← light section for contrast
Min-height: auto (fits content)

Section label above rows:
  [DISCIPLINES]  ← DM Mono, var(--text-muted), 0.75rem, uppercase, bracket style

FOUR ROWS — styled exactly like bruut.media's services list:
Each row is a <button> (accessible, keyboard-focusable) that opens the Projects panel.

Row structure (left to right):
  [number]   [DISCIPLINE NAME]    [sub-tags, italic]    [VIEW WORK →]

Row sizing:
  Height: ~90px on desktop, ~72px on mobile
  Full width
  Bottom border: 1px solid var(--border-light)

HOVER STATE (the flood effect — identical to bruut.media):
Use a CSS pseudo-element that scales from left:
```css
.discipline-row {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: padding-left 300ms var(--ease-smooth);
}
.discipline-row::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--bg-main);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 350ms var(--ease-smooth);
  z-index: 0;
}
.discipline-row:hover::before { transform: scaleX(1); }
.discipline-row:hover { padding-left: 1.5rem; }
/* All child elements need position:relative z-index:1 to sit above ::before */
```
On hover:
- Dark flood covers the row from left
- Discipline name: var(--text-dark) → var(--text-white)
- Number: same
- "VIEW WORK →" appears (opacity: 0 → 1, x: 16px → 0)
- Arrow symbol: → rotates to ↗

Row content (from disciplines[] in content.ts):
  01   INTERIOR DESIGN          Spaces, Materials, Concepts
  02   INDUSTRIAL DESIGN        Products, Packaging, Objects
  03   ILLUSTRATION & UI/UX     2D, Characters, Interfaces
  04   MOTION DESIGN            Animation, Video, Interaction

Typography:
  Number:         DM Mono 500, 0.9rem, var(--text-muted)
  Discipline:     Syne 700, clamp(1.8rem, 3.5vw, 3rem), var(--text-dark)
  Tags:           DM Mono 400, 0.72rem, var(--text-muted), italic
  VIEW WORK:      Syne 600, 0.85rem, hidden until hover

On click: calls openPanel(disciplineIndex) which sets global state to show Projects overlay.

SCROLL REVEAL:
```ts
gsap.from('.discipline-row', {
  y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out',
  scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
})
```

---

### SECTION 4 — PROJECTS PANEL (OVERLAY)

File: src/components/sections/Projects.tsx
This is a FIXED full-screen overlay, not a scroll section.
Controlled by a panelOpen state + activeDisc state in a shared context or lifted state.

STRUCTURE:
```
┌─────────────────────────────────────────────────────┐
│  [×] close button (top right)                       │
│                                                     │
│  LEFT (35%)            RIGHT (65%)                  │
│  ─────────────         ──────────────────────────   │
│  dark bg               panel bg (bg-card)           │
│                                                     │
│  • 01 INTERIOR    →    [list of projects]           │
│  • 02 INDUSTRIAL       OR                           │
│  • 03 ILLUS/UX         [project detail view]        │
│  • 04 MOTION                                        │
└─────────────────────────────────────────────────────┘
```

LEFT PANEL — discipline selector:
- Lists all 4 disciplines
- Active one: var(--pink) left border (3px) + text brighter
- Each discipline clickable — switches right panel content
- Syne 700, white text

RIGHT PANEL — Project List view:
Each project is a row:
```
[thumbnail 80×56px rounded-md]  [Project Name — Syne 700]  [2024]  [↗]
                                 [tag · tag — DM Mono]
────────────────────────────────────────────────────────────────────
```
Thumbnail hover: scale(1.06) + left pink border
Click → opens Project Detail view (Framer Motion AnimatePresence swap)

RIGHT PANEL — Project Detail view:
```
← BACK (text button, returns to list)

[Project Name — Syne 700, large]
[Tag · Year — DM Mono muted]

[Large project image — placeholder until real images provided]

[Description — Syne 400, 2-3 sentences — from content.ts]

ROLE          YEAR          TOOLS
[value]       [value]       [value]
← DM Mono grid

[VIEW ON BEHANCE ↗]   ← pink pill button, opens Behance URL in new tab
```

PANEL OPEN/CLOSE ANIMATION (Framer Motion):
```tsx
const panelVariants = {
  hidden: { x: '100%', transition: { duration: 0.5, ease: [0.25,0.46,0.45,0.94] } },
  visible: { x: 0, transition: { duration: 0.6, ease: [0.0,0.0,0.2,1] } }
}
// Backdrop: opacity 0 → 0.6 (dark overlay behind panel)
// Left discipline list: staggers in from x:-20
```

Close: × button top right, ESC key, clicking backdrop. All three must work.

---

### SECTION 5 — SKILLS

File: src/components/sections/Skills.tsx
Background: var(--bg-main) ← back to dark

Label: [TOOLS I USE]  ← DM Mono, var(--text-pink), bracket style

Skill category pills (small, outlined):
```
[3D ARCHITECTURE]  [GRAPHIC DESIGN]  [VIDEO EDITING]  [UI/UX DESIGN]  [2D ART]
```
Each: DM Mono 0.7rem, border: 1px solid var(--border), color: var(--text-muted),
border-radius: var(--r-pill), padding: 5px 12px.
Hover: border-color → var(--pink), color → var(--text-white)

Scrolling icon marquee strip:
- Full width, height 80px, background var(--bg-card)
- Top and bottom: 1px var(--border) lines separating it from content
- Icons scroll right-to-left infinitely
- Between each icon: small · dot in var(--text-pink)
- On hover over strip: pauses

Icons (use @icons-pack/react-simple-icons):
SiFigma · SiAdobephotoshop · SiAdobeillustrator · SiAdobeaftereffects ·
SiAdobepremierepro · SiProcreate · SiAutodesk · SiBlender

All icons: size={32} color="var(--text-off)"

Implementation — CSS animation only (no JS, better performance):
```css
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 28s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```
Duplicate the icon array once (so seamless loop works with -50%).

Below strip: ← SCROLL TO EXPLORE →  DM Mono centered var(--text-muted) 0.7rem

---

### SECTION 6 — "WHAT I DO FOR FUN"

File: src/components/sections/ForFun.tsx
Background: var(--bg-main) ← stays dark, same as skills

⚠️ THIS SECTION MUST LOOK LIKE BRUUT.MEDIA'S WORK CARDS
Look at bruut.media's case study cards (the RABOBANK / OVER MORGEN / KNVB section).
These are large full-width rounded dark capsule/pill shapes.
Each card is a huge rounded rectangle (~140px tall on desktop).
On the LEFT: a circular cropped image.
In the CENTER: a very large bold campaign/project name.
On the RIGHT (revealed on hover): description text + label.
On hover: the capsule background lightens from var(--bg-card) to var(--bg-hover),
and extra content slides in from the right.

Apply exactly this treatment to Elene's "for fun" items.

SECTION HEADER:
  BEYOND DESIGN  ← DM Mono var(--text-pink) bracket style
  
  "What I do"    ← Syne 800, display size, var(--text-white)
  "for fun ♡"    ← same, ♡ in var(--pink)

THE FOUR CARDS — each is a <button> or <div role="button">:

Card structure:
```
┌────────────────────────────────────────────────────────────┐
│  [○ circular img]    BIG ITEM NAME          [description] │
│     80px circle      Syne 800 ~3rem         (on hover)    │
└────────────────────────────────────────────────────────────┘
```

Card CSS:
```css
.fun-card {
  width: 100%;
  height: 140px;             /* tall capsule */
  border-radius: var(--r-pill);
  background: var(--bg-card);
  display: flex;
  align-items: center;
  padding: 0 40px;
  gap: 32px;
  margin-bottom: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 350ms var(--ease-smooth);
}
.fun-card:hover {
  background: var(--bg-hover);
}
```

Left: circular image crop (80px × 80px, border-radius 50%, object-fit cover)
  → For items without a real image, use a solid color circle in var(--pink)
    with the item number centered in it. This looks intentional.

Center: item label in Syne 800, ~2.5rem, var(--text-white), uppercase

Right side (hidden by default, slides in on hover):
  Description text: DM Mono 0.8rem, var(--text-muted), max-width 260px
  Opacity 0 → 1, x: 20px → 0, on hover (GSAP or CSS transition)

The → arrow:
  Small circle button far right, var(--pink) border
  On hover: arrow rotates to ↗, card background flashes briefly

Content (from forFun[] in content.ts):
  01  SOCIAL MEDIA
      "Creating content and managing communities"
  
  02  COMICS & VIDEO GAMES
      "Writing stories and playing games for fun"
  
  03  HACKATHONS WITH STARTUP GRIND
      "Building ideas and meeting founders"
  
  04  COMING SOON ·····
      "Something new is brewing..."

SCROLL REVEAL: cards stagger in from y:50, opacity 0, stagger 0.12s

---

### SECTION 7 — CONTACT

File: src/components/sections/Contact.tsx
Background: var(--bg-main)
Min-height: 100vh

Section label:
  [LET'S CONNECT]  ← DM Mono, var(--text-pink), bracket style

Main display text:
  "Let's create"         ← Syne 800, display-xl, var(--text-white)
  "something beautiful." ← same. The period only → var(--pink)

Right column (desktop, beside main text):
  "I'm currently available for new projects and collaborations."
  ← Syne 400, body, var(--text-muted), max-width 280px

  [START A PROJECT →]
  ← MagneticButton component
  ← Background: var(--pink), text: var(--text-dark)
  ← Hover: background var(--pink-dark)

MAGNETIC BUTTON — useMagneticEffect hook:
```ts
export function useMagneticEffect(ref: RefObject<HTMLElement>, strength = 0.35) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx*dx + dy*dy)
      if (dist < 100) {
        gsap.to(el, { x: dx*strength, y: dy*strength, duration: 0.3, ease: 'power2.out' })
      }
    }
    const handleLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
    }
    window.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [ref, strength])
}
```

Footer strip (bottom of contact section):
```
eleneluashvili2@gmail.com  |  BEHANCE ↗  |  LINKEDIN ↗  |  Tbilisi, Georgia
                    © 2025 ELENE LUASHVILI
```
DM Mono 0.78rem, var(--text-muted). Links hover → var(--text-white).
All social links open in new tab with rel="noopener noreferrer".

Logo mark: If no logo file provided, render "EL" in Syne 800:
```tsx
<div style={{ display:'flex', gap:'2px' }}>
  <span style={{ fontWeight: 800 }}>E</span>
  <span style={{ fontWeight: 400, fontStyle:'italic' }}>L</span>
</div>
```

SCROLL REVEAL: main text — each word is a span, clipped with overflow:hidden,
animates y: '110%' → '0%' on scroll entry, stagger 0.05s per word.

---

## 6. CUSTOM CURSOR

File: src/components/layout/CustomCursor.tsx

```css
body { cursor: none; }
```

The cursor has two parts: a small filled dot (10px) and a larger ring (36px).
The dot follows the mouse directly (no lag).
The ring follows with lerp smoothing (factor 0.1).

States controlled by CursorContext:

| Cursor state   | Visual                            | Triggered by             |
|---------------|-----------------------------------|--------------------------|
| default        | dot only, var(--pink)             | anywhere                 |
| hover-link     | ring expands to 36px              | all links, nav items     |
| hover-video    | ring + "PLAY" text inside         | left hero column         |
| hover-project  | ring + "OPEN" text                | project rows in panel    |
| hover-disc     | ring + "EXPLORE" text             | discipline rows          |
| hover-card     | ring + "↗" arrow                  | fun cards                |
| hover-cta      | ring fills var(--pink)            | CTA buttons              |

Implementation:
```ts
// RAF lerp loop
let curX = 0, curY = 0
const animate = () => {
  curX += (mouseX - curX) * 0.1
  curY += (mouseY - curY) * 0.1
  gsap.set(ringRef.current, { x: curX, y: curY })
  requestAnimationFrame(animate)
}
// Dot follows mouse directly via mousemove event
// Ring follows via RAF lerp above
```

---

## 7. COMPLETE CONTENT DATA

File: src/data/content.ts
Copy this EXACTLY. Components will import from here.

```typescript
export const siteInfo = {
  name: "Elene Luashvili",
  title: "Designer / Art Director",
  location: "Tbilisi, Georgia",
  email: "eleneluashvili2@gmail.com",
  phone: "+995 574 88 93 32",
  bio: "A creative and detail-oriented designer, tutor, and marketing enthusiast. A problem-solver who turns ideas into engaging visuals.",
  available: true,
  behance: "https://www.behance.net/eleneart",
  linkedin: "https://www.linkedin.com/in/elene-luashvili-5671a0237/",
  instagram: "@elene.luashvili", // TODO: confirm exact handle
  cvPath: "/EleneCV.pdf",
}

export const experience = [
  {
    id: 1,
    years: "2026 — Present",
    role: "Digital Design Tutor",
    type: "Freelance",
    company: "Kodland",
    location: "UK (Remote)",
  },
  {
    id: 2,
    years: "01/2024 — 07/2024",
    role: "Digital Marketing Team Member",
    type: "Internship",
    company: "AIESEC",
    location: "Tbilisi",
  },
  {
    id: 3,
    years: "01/2023 — 04/2024",
    role: "2D Video Game Artist",
    type: "Full Time",
    company: "Digital Road Studio",
    location: "Tbilisi",
  },
  {
    id: 4,
    years: "10/2023 — 02/2024",
    role: "Art Teacher",
    type: "Part Time",
    company: "BUDE",
    location: "Tbilisi",
  },
]

export const disciplines = [
  {
    id: 1,
    number: "01",
    name: "Interior Design",
    tags: "Spaces · Materials · Concepts",
    projects: [
      {
        id: "int-01",
        name: "Interior Project",
        year: "2024",
        tags: "Interior · Spatial Design",
        description: "TODO — Elene to provide description",
        role: "Interior Designer",
        tools: "AutoCAD, 3DS Max",
        behanceUrl: "https://www.behance.net/eleneart",
        image: "/images/int-01.jpg",
      },
    ],
  },
  {
    id: 2,
    number: "02",
    name: "Industrial Design",
    tags: "Products · Packaging · Objects",
    projects: [
      {
        id: "ind-01",
        name: "Packaging Design",
        year: "2024",
        tags: "Packaging · Branding",
        description: "TODO — Elene to provide description",
        role: "Industrial Designer",
        tools: "Fusion 360, Photoshop",
        behanceUrl: "https://www.behance.net/gallery/234023969/PACKAGING-DESIGN",
        image: "/images/ind-01.jpg",
      },
      {
        id: "ind-02",
        name: "Product Design",
        year: "2024",
        tags: "Product · 3D",
        description: "TODO — Elene to provide description",
        role: "Product Designer",
        tools: "Fusion 360, 3DS Max",
        behanceUrl: "https://www.behance.net/gallery/234023297/Product-Design",
        image: "/images/ind-02.jpg",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    name: "Illustration & UI/UX",
    tags: "2D · Characters · Interfaces",
    projects: [
      {
        id: "ui-01",
        name: "Smartwatch UI/UX",
        year: "2024",
        tags: "UI/UX · Figma",
        description: "TODO — Elene to provide description",
        role: "UI/UX Designer",
        tools: "Figma",
        behanceUrl: "https://www.behance.net/gallery/238532615/Smartwatch-UIUX",
        image: "/images/ui-01.jpg",
      },
      {
        id: "ui-02",
        name: "AI Chat Interface",
        year: "2024",
        tags: "UI/UX · Interface Design",
        description: "TODO — Elene to provide description",
        role: "UI Designer",
        tools: "Figma",
        behanceUrl: "https://www.behance.net/gallery/238844265/AI-CHAT-INTERFACE-UI",
        image: "/images/ui-02.jpg",
      },
      {
        id: "ui-03",
        name: "Slot Leaderboard UI",
        year: "2024",
        tags: "UI/UX · Game UI",
        description: "TODO — Elene to provide description",
        role: "UI Designer",
        tools: "Figma",
        behanceUrl: "https://www.behance.net/gallery/234023111/SLOT-LEADERBOARD-UI",
        image: "/images/ui-03.jpg",
      },
      {
        id: "ill-01",
        name: "Illustrations for a Board Game",
        year: "2023",
        tags: "Illustration · 2D Art",
        description: "TODO — Elene to provide description",
        role: "Illustrator",
        tools: "Procreate, Photoshop",
        behanceUrl: "https://www.behance.net/gallery/186192695/ILLUSTRATIONS-FOR-A-BOARD-GAME",
        image: "/images/ill-01.jpg",
      },
      {
        id: "ill-02",
        name: "Character Design — Videogame",
        year: "2024",
        tags: "Character Design · 2D Art",
        description: "TODO — Elene to provide description",
        role: "2D Game Artist",
        tools: "Procreate, Photoshop",
        behanceUrl: "https://www.behance.net/gallery/238768981/CHARACTER-DESIGN-videogame",
        image: "/images/ill-02.jpg",
      },
      {
        id: "ill-03",
        name: "Comic Piece — Color White",
        year: "2023",
        tags: "Illustration · Comics",
        description: "TODO — Elene to provide description",
        role: "Illustrator",
        tools: "Procreate",
        behanceUrl: "https://www.behance.net/gallery/186193369/COMIC-PIECE-COLOR-WHITE",
        image: "/images/ill-03.jpg",
      },
      {
        id: "ill-04",
        name: "Character Illustrations",
        year: "2025",
        tags: "Illustration · Character Design",
        description: "TODO — Elene to provide description",
        role: "Illustrator",
        tools: "Procreate",
        behanceUrl: "https://www.behance.net/gallery/244726981/Character-Illustrations",
        image: "/images/ill-04.jpg",
      },
      {
        id: "ill-05",
        name: "Poster Illustration",
        year: "2025",
        tags: "Illustration · Poster",
        description: "TODO — Elene to provide description",
        role: "Illustrator",
        tools: "Illustrator, Photoshop",
        behanceUrl: "https://www.behance.net/gallery/244727121/poster-illustration",
        image: "/images/ill-05.jpg",
      },
    ],
  },
  {
    id: 4,
    number: "04",
    name: "Motion Design",
    tags: "Animation · Video · Interaction",
    projects: [
      {
        id: "mot-01",
        name: "Animation",
        year: "2025",
        tags: "Motion · After Effects",
        description: "TODO — Elene to provide description",
        role: "Motion Designer",
        tools: "After Effects, Premiere Pro",
        behanceUrl: "https://www.behance.net/gallery/244722415/Animation",
        image: "/images/mot-01.jpg",
      },
    ],
  },
]

export const skills = {
  categories: [
    { name: "3D Architecture", tools: "3DS Max · AutoCAD · Fusion 360" },
    { name: "Graphic Design",  tools: "Adobe Suite" },
    { name: "Video Editing",   tools: "After Effects · Premiere Pro" },
    { name: "UI/UX Design",    tools: "Figma" },
    { name: "2D Art",          tools: "Procreate" },
    { name: "Marketing",       tools: "Content · Social Media" },
  ],
  iconNames: [
    "Figma", "Photoshop", "Illustrator", "After Effects",
    "Premiere Pro", "Procreate", "Autodesk", "Blender"
  ],
}

export const forFun = [
  {
    number: "01",
    label: "Social Media",
    description: "Creating content and managing communities",
    color: "#F2B5A0",
    image: null, // TODO: optional image
  },
  {
    number: "02",
    label: "Comics & Video Games",
    description: "Writing stories and diving into game worlds",
    color: "#D4622A",
    image: null,
  },
  {
    number: "03",
    label: "Hackathons with Startup Grind",
    description: "Building ideas and meeting founders",
    color: "#888888",
    image: null,
  },
  {
    number: "04",
    label: "Coming Soon ·····",
    description: "Something new is brewing...",
    color: "#444444",
    image: null,
  },
]
```

---

## 8. PLACEHOLDER COMPONENT

Use this for every missing image. Make it look intentional.

```tsx
// src/components/ui/Placeholder.tsx
interface PlaceholderProps {
  label: string
  className?: string
  style?: React.CSSProperties
}
export function Placeholder({ label, className, style }: PlaceholderProps) {
  return (
    <div
      className={className}
      style={{
        background: 'var(--bg-card)',
        border: '1px dashed rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontFamily: '"DM Mono", monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        ...style,
      }}
    >
      {/* TODO: Replace → {label} */}
      [ {label} ]
    </div>
  )
}
```

---

## 9. BUILD ORDER — MANDATORY SEQUENCE

Complete each step fully before starting the next.
After each step, pause and confirm it works before continuing.

```
STEP 1 — Scaffold
  □ Create Next.js 14 project (TypeScript + Tailwind + App Router + src dir)
  □ Install: gsap @gsap/react lenis framer-motion @icons-pack/react-simple-icons clsx tailwind-merge
  □ Write globals.css — ALL CSS variables from Section 2. Nothing else yet.
  □ Configure fonts in layout.tsx (Syne, Playfair Display, DM Mono via next/font/google)
  □ Write src/data/content.ts exactly as written in Section 7
  □ Write src/lib/utils.ts with cn() helper
  □ Confirm: npm run dev starts with no errors

STEP 2 — Providers
  □ SmoothScroll.tsx (Lenis + GSAP ticker)
  □ GSAPProvider.tsx (register ScrollTrigger)
  □ CursorContext.tsx (React context for cursor state + useCursor hook)
  □ Wrap layout.tsx: <GSAPProvider><SmoothScroll><CursorContext>
  □ CustomCursor.tsx — basic version (just a pink dot that follows mouse via RAF lerp)
  □ Confirm: smooth scrolling works, dot cursor visible

STEP 3 — Navbar
  □ Individual pill buttons per link (not one shared pill)
  □ Active state: var(--pink) fill
  □ REEL special pill (pink, center position)
  □ Scroll-triggered background opacity change via GSAP ScrollTrigger
  □ Mobile hamburger + full-screen overlay menu (all links functional)
  □ Confirm: all links work, active state visible, mobile menu opens/closes

STEP 4 — Hero
  □ Two-column layout (50/50 desktop, stacked mobile)
  □ Left: video player (poster placeholder), functional controls (mute toggle, fullscreen)
  □ Orange progress bar that actually tracks video.currentTime
  □ Right: all experience rows from content.ts
  □ Drawer hover interaction (GSAP translateY + scaleX + pink top border)
  □ CV download button (links to /public/EleneCV.pdf)
  □ Page load animation (black overlay → content staggers in)
  □ Confirm: drawer interaction feels physical, video controls work

STEP 5 — Disciplines
  □ Four rows with all content from disciplines array
  □ Flood hover effect (pseudo-element scaleX from left)
  □ VIEW WORK text appears on hover
  □ ScrollTrigger stagger reveal
  □ onClick: calls openPanel(index) — wired to Projects overlay
  □ Confirm: hover flood looks like bruut.media, click opens panel

STEP 6 — Projects Panel
  □ Full-screen fixed overlay, z-index 100
  □ Left discipline selector (switches active disc, all 4 work)
  □ Right project list view (all projects from content.ts visible)
  □ Project detail view (AnimatePresence swap)
  □ VIEW ON BEHANCE button opens correct Behance URL in new tab
  □ Close via: × button, ESC key, backdrop click — all three work
  □ Framer Motion open/close animation
  □ Confirm: all 4 disciplines show correct projects, Behance links work

STEP 7 — Skills
  □ Category pills (all 6 categories from content.ts)
  □ MarqueeStrip with simple-icons (CSS animation, not JS)
  □ Pause on hover working
  □ ScrollTrigger reveal
  □ Confirm: marquee loops seamlessly

STEP 8 — For Fun
  □ Four capsule cards (full-width, tall rounded pills — bruut.media card style)
  □ Circular color/image on left
  □ Large label centered
  □ Description slides in from right on hover
  □ Background lightens on hover
  □ ScrollTrigger stagger reveal
  □ Confirm: looks like bruut.media work cards, hover interaction feels smooth

STEP 9 — Contact
  □ Large display text with pink period
  □ MagneticButton component wired up (useMagneticEffect hook)
  □ START A PROJECT button is magnetic (actually pulls toward cursor)
  □ Footer with all links from content.ts — all functional, new tab
  □ Word-by-word scroll reveal on main text
  □ Confirm: magnetic effect works, all links correct

STEP 10 — Polish
  □ Complete CustomCursor: all states from Section 6 (PLAY, OPEN, EXPLORE, ↗, etc.)
  □ Wire cursor state to all interactive elements via useCursor()
  □ Verify ZERO hardcoded strings in components (all come from content.ts)
  □ Verify ZERO hardcoded hex colors (all use CSS variables)
  □ Check every Behance URL opens correctly in new tab
  □ Mobile pass: test every section on 375px width
  □ GSAP cleanup audit: every gsap context has ctx.revert()
  □ Keyboard navigation: Tab through all interactive elements
  □ All TODO placeholder images display the Placeholder component cleanly
  □ npm run build — zero errors, zero warnings
```

---

## 10. ABSOLUTE DON'TS

- ❌ NEVER hardcode hex colors in components — only CSS variables
- ❌ NEVER hardcode text strings in JSX — only content.ts
- ❌ NEVER use document.querySelector — only useRef
- ❌ NEVER install a UI component library
- ❌ NEVER leave onClick handlers empty: () => {}
- ❌ NEVER open external links in the same tab
- ❌ NEVER make fun cards small bubble pills — they are TALL CAPSULES (140px, full-width)
- ❌ NEVER make the disciplines section dark — it must be var(--bg-white) for contrast
- ❌ NEVER skip GSAP cleanup (ctx.revert)
- ❌ NEVER build out of step order

---

## 11. HOW TO USE THIS WITH CURSOR

### FIRST MESSAGE — copy exactly:
```
Read INSTRUCTIONS.md completely before doing anything.
This is the project bible. Every decision is made here.
Start with STEP 1 from Section 9 only.
Set up the project, install packages, write globals.css with
all CSS variables from Section 2, configure fonts in layout.tsx,
write data/content.ts from Section 7 exactly as written.
Do NOT build any UI yet. Tell me when STEP 1 is confirmed working.
```

### AFTER EACH STEP — copy and fill in N:
```
Step [N] confirmed. Proceed to Step [N+1] from Section 9.
Re-read the relevant section in INSTRUCTIONS.md for that
component's full specification before writing any code.
```

### IF CURSOR DRIFTS FROM SPEC:
```
Stop. Re-read INSTRUCTIONS.md. You have deviated from the spec.
Specifically re-read Section [X] about [component name].
Undo what you just built and rebuild it to match the spec exactly.
```

### WHEN HANDING CURSOR THE REFERENCE IMAGE:
```
The image at /public/reference/mockup.png is a directional reference
for layout proportions and scroll flow. The color palette in Section 2
of INSTRUCTIONS.md overrides any colors visible in this image.
The Bruut.media website is the primary interaction reference.
```

---

*Project: Elene Luashvili Portfolio*
*Email: eleneluashvili2@gmail.com*
*Behance: https://www.behance.net/eleneart*
*Primary reference: bruut.media*
*Last updated: May 2026*
