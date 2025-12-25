## Project: Summit Labs Portfolio Website

### Overview
Build a production-ready portfolio website for Summit Labs (summitlab.dev), a one-person web design and AI automation studio run by Yannick in the Netherlands. The site serves two purposes: generate leads from local Dutch SMBs via referrals, and demonstrate the quality of modern websites Yannick can deliver. The site itself should be a showcase piece.

### Brand Identity
- **Name:** Summit Labs
- **Positioning:** "Yannick at Summit Labs" — personal brand, approachable expert
- **Tone:** Friendly, approachable, confident but not corporate. Speaks to business owners who know their craft but aren't technical
- **Language:** Dutch (primary). Structure the codebase for easy i18n expansion to English later

### Design Direction
- **Aesthetic:** Minimal, clean, Apple-inspired glassmorphism
- **Mode:** Light mode — soft whites, light grays, frosted glass panels with subtle blur effects
- **Animations:** Slightly dramatic — parallax scrolling, glassmorphism blur transitions, smooth scroll reveals, engaging hover states. Not subtle, but not overwhelming
- **Priority:** Mobile-first, but should look excellent on desktop
- **Performance:** Optimized for Cloudflare Pages — fast initial load, minimal JS where possible
- **Goal:** The site should immediately signal "this person makes beautiful, modern websites"

### Tech Stack
Choose the optimal framework for this project. Requirements:
- Static site compatible with Cloudflare Pages
- Fast build times, excellent performance scores
- Easy to maintain and update content
- Supports the animation/glassmorphism effects described
- i18n-ready architecture for future Dutch/English toggle

Likely candidates: Astro, Next.js (static export), or SvelteKit. Make the call based on project needs.

### Site Structure

**Single-page layout with smooth scroll navigation:**

1. **Hero Section**
   - Friendly, approachable headline (Dutch)
   - Brief value proposition: modern websites, delivered fast, at accessible prices
   - Primary CTA: scroll to contact or direct to contact section
   - Should immediately establish the glassy, premium aesthetic

2. **Projects Section**
   - Simple gallery layout
   - Two projects:
     - **FitCity** — Gym website (fitcity.summitlab.dev)
     - **ByShakir** — Luxury interior designer (byshakir.summitlab.dev)
   - Display: Homepage screenshot/preview for each
   - Interaction: Clicking opens the live site in a new tab
   - Design the grid to accommodate 4-6 projects as portfolio grows

3. **Services Section**
   - Three offerings, described qualitatively with starting prices:
     - **Website Design** (one-time) — Starting from €350. Full website from concept to launch.
     - **Website + Hosting** (retainer) — €50/month. Ongoing maintenance, updates, and changes included.
     - **AI Automation** (project-based) — Starting from €500. Sales funnels, lead capture, CRM integrations, dashboards. Retainer possible.
   - Emphasize: fast delivery, modern design, professional infrastructure (without diving into technical details)

4. **About Section**
   - Personal introduction: Yannick, the person behind Summit Labs
   - Located in the Netherlands
   - Angle: Combines modern AI-assisted workflows with professional development practices to deliver faster without sacrificing quality
   - Keep it warm and human, not a resume

5. **Contact Section**
   - Contact form with fields:
     - Name (required)
     - Email (required)
     - Phone (required)
     - Project type dropdown (required):
       - "Website Design"
       - "Website Design + Hosting (retainer)"
       - "Automation (Sales/Leads/CRM/etc.)"
     - Message (optional, for extra clarification)
   - Form submission: For now, can use Cloudflare Pages Forms or simple endpoint. Structure for future n8n webhook integration
   - No displayed contact info (email/phone/address) — form only

6. **Footer**
   - Social links with icons:
     - Instagram: https://www.instagram.com/yannickveldhuisen/
     - LinkedIn: https://www.linkedin.com/in/yannick-veldhuisen-303047243/
     - GitHub: https://github.com/ZenoTWV
   - Copyright: © 2025 Summit Labs
   - Links to legal pages: Privacy Policy, Terms of Service, Cookie Policy

### Additional Pages (Placeholder)
Create minimal placeholder pages for:
- /privacy — Privacy Policy (Dutch, placeholder text noting "coming soon" or basic structure)
- /terms — Terms of Service (Dutch, placeholder)
- /cookies — Cookie Policy (Dutch, placeholder)

These exist for GDPR compliance structure. Content will be filled in later based on final site functionality.

### Assets Needed
- **Logo:** Not yet available. Use clean typography treatment of "Summit Labs" as temporary logo. Design should accommodate future logo addition easily
- **Project screenshots:** Will need to capture homepage screenshots from:
  - fitcity.summitlab.dev
  - byshakir.summitlab.dev
  - (These may block automated capture — plan for manual screenshot upload)
- **Colors:** Derive a cohesive light-mode palette that supports glassmorphism (soft whites, light grays, subtle accent color — suggest a calm blue or muted teal)
- **Fonts:** Select a modern, clean font pairing. One for headings (slightly distinctive), one for body (highly readable)

### Form Handling
Implement form submission compatible with Cloudflare Pages. Options:
- Cloudflare Pages Forms (built-in)
- Simple API endpoint for future webhook connection
- Structure the submission data cleanly for future automation (n8n will process leads)

### Deployment
- Platform: Cloudflare Pages
- Repository: Will be hosted on GitHub (https://github.com/ZenoTWV)
- Set up clean build configuration
- Ensure proper meta tags, Open Graph tags for social sharing
- Favicon and basic PWA manifest

### Quality Bar
This website represents what Yannick sells. It must be:
- Visually impressive on first load
- Smooth and polished in all interactions
- Fast (target: 90+ Lighthouse performance score)
- Fully responsive with no layout issues
- Professionally structured codebase (clean, maintainable, documented)

### Out of Scope (for now)
- Blog
- Testimonials section
- Multi-language toggle (structure only, not implemented)
- Analytics integration
- Cookie consent banner (placeholder page only)
- Cal.com or booking integration

---

### Tailwind CSS v4 Guidance

If using Tailwind CSS, use version 4. Be aware of breaking changes from v3:

**Configuration:**
- No `tailwind.config.js` by default — configuration is CSS-first
- Use `@import "tailwindcss"` instead of `@tailwind base/components/utilities` directives
- Theme customization happens in CSS with `@theme { }` block, not a JS config file
- Content paths are auto-detected — no `content: []` array needed

**Syntax changes:**
- Custom colors, spacing, fonts defined as CSS variables inside `@theme`
- Example:
  ```css
  @import "tailwindcss";
  
  @theme {
    --color-primary: oklch(0.7 0.15 200);
    --font-display: "Inter", sans-serif;
  }
  ```
- Default color palette uses `oklch()` color space
- Shadow, radius, and other design tokens also defined in `@theme`

**Common pitfalls to avoid:**
- Don't create `tailwind.config.js` unless specifically needed for plugins
- Don't use `@tailwind` directives — they don't exist in v4
- Don't assume v3 class names for colors (palette has changed)
- Don't manually configure content paths

**If the agent is unsure:** Check the official Tailwind v4 documentation at https://tailwindcss.com/docs before implementing. When in doubt, use the CSS-first approach.