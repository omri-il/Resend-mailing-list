# Resend Mailing List

Hebrew RTL email system using React Email v5+ and Resend SDK, with automated workshop signup flows via n8n.

## Deployment Rule

**Always deploy websites and pages to the VPS at omri-iram.co.il.** After building any HTML page, landing page, or static site asset in this project, automatically upload it to the VPS:
- Web root: `/var/www/omri-iram.co.il/`
- Deploy with: `scp <file> root@147.79.114.195:/var/www/omri-iram.co.il/<path>`
- Verify with: `curl -s -o /dev/null -w '%{http_code}' https://omri-iram.co.il/<path>`
- Each event/page lives in its own subfolder (e.g. `gems-webinar/`)
- Never ask the user to deploy manually — do it as part of building.

## Design & Conversion Guidelines

Whenever building or improving any **landing page, signup form, email template, or marketing/conversion asset** in this project, always read and apply these three skill resources:

- `~/.claude/skills/landing-page-guidelines/GUIDELINES.md` — Full strategic framework: Sinek (WHY/HOW/WHAT structure), Godin (permission levels by traffic temperature), Hormozi (Value Equation). Use for site architecture, section order, and trust design.
- `~/.claude/skills/hormozi-conversion/SKILL.md` — Tactical execution: run the 5-step Value Equation workflow before writing any headline, CTA, or offer section. Auto-triggers on landing pages and sales copy.
- `~/.claude/skills/frontend-design/` — Production-grade UI: distinctive visual design, anti-generic-AI aesthetics. Use when writing HTML/CSS for any page or component.

**In practice:**
1. Read `landing-page-guidelines` first → decide structure and section order
2. Run `/hormozi-conversion` → write outcome-focused headlines, CTAs, and proof
3. Apply `/frontend-design` → implement the visual design

## Tech Stack
- **Runtime:** Node.js + TypeScript (ESM)
- **Email templates:** React Email (`@react-email/components`)
- **Rendering:** `@react-email/render` (v2 — use `render()`, not `renderAsync`)
- **Sending:** Resend SDK
- **Webhooks:** Express.js
- **Automation:** n8n (VPS at n8n.srv1038526.hstgr.cloud)
- **Landing pages:** Static HTML, hosted on VPS at omri-iram.co.il (GitHub Pages as backup)
- **Web root:** `/var/www/omri-iram.co.il/` on VPS
- **Page architecture:** Self-contained folders with relative paths (copy-paste deployable)
- **Analytics:** Microsoft Clarity (project ID: w1ajcl9gof)
- **Runner:** tsx (no build step needed)

## Project Structure
```
emails/
  WelcomeHebrew.tsx        — Welcome email for new subscribers
  Newsletter.tsx           — Weekly tips newsletter
  Announcement.tsx         — Course/event announcement (dark bg)
  PlainText.tsx            — Simple personal text message
src/
  templates.ts             — Template registry (name → component + metadata)
  sendTemplate.ts          — Send any template by name via CLI
  sendEmail.ts             — Original single-template sender
  quickSend.ts             — Quick plain text email sender
  automation.ts            — Click-tracking server + auto-reply
  sendAutoEmail.ts         — Send email with tracked button
  webhook.ts               — Express webhook listener for tracking
workshop/
  index.html               — Workshop signup form (3 fields: name, email, WhatsApp)
  gallery.html             — Design gallery with 8 form styles
docs/
  index.html               — GitHub Pages copy of workshop form
  gallery.html             — GitHub Pages copy of gallery
n8n/
  workshop-reminders-workflow.json  — Original n8n workflow export
  youtube-description-updater.json — Bulk update YouTube video descriptions
  build_gems_workflow.py           — GEMS webinar n8n workflow generator
  rebuild_emails.py                — Rebuild email nodes as Code nodes
29.03.26 Gem Youtube Live/         — GEMS Webinar event folder (local + deployed to VPS as gems-webinar/)
  index.html                       — Single-step signup form (name, email, phone, consent)
  thank-you.html                   — Post-registration page with survey → unlocks event details
  email-preview.html               — Interactive email preview for all 4 campaign emails
  assets/
    style.css                      — All styles (separated)
    script.js                      — Countdown, form submit, redirect logic
```

## Web Hosting
- **Domain:** `omri-iram.co.il` → VPS at `147.79.114.195`
- **SSL:** Let's Encrypt (auto-renew)
- **Web root:** `/var/www/omri-iram.co.il/`
- **Nginx config:** `/etc/nginx/sites-enabled/omri-iram.co.il`
- **Routing:** `try_files $uri $uri/ /index.php?$args;` (physical files win over CMS)
- **Deploy new event:** `cp -r <folder> /var/www/omri-iram.co.il/` → accessible at `omri-iram.co.il/<folder>/`
- **Architecture:** Each event is a self-contained folder with `index.html` + `assets/`. Relative paths only. Copy-paste to create new events.

## Commands
```bash
npm run dev            # Preview all templates at localhost:3333
npm run send:template  # Send by template name (see flags below)
npm run send           # Send welcome email
npm run quick          # Send quick plain text email
npm run auto           # Start click-tracking automation server (port 3001)
npm run send:auto      # Send email with tracked CTA button
npm run webhook        # Start webhook listener on port 3001
npm run typecheck      # TypeScript check
```

## Environment Variables (.env)
```
RESEND_API_KEY=re_...          # Resend API key
N8N_API_KEY=eyJ...             # n8n REST API key
N8N_BASE_URL=https://n8n.srv1038526.hstgr.cloud
```

## Sending Domain
- **Verified domain:** `mail.omri-iram.co.il`
- **Default from address:** `omri@mail.omri-iram.co.il`
- Never use `onboarding@resend.dev` in production

## Resend Audience Organization

### Two-Track Sending Model
| Track | Mechanism | Resend feature | Examples |
|-------|-----------|---------------|----------|
| **Drip (per-person)** | n8n Wait nodes → direct `POST /emails` | None needed | Workshop confirmation, reminders, "starting now" |
| **Broadcast (bulk)** | Resend `POST /broadcasts` | Audience (required) + Topic (optional) | Weekly newsletter, announcements, re-engagement |

Workshop reminders are drip emails — they don't need audiences or topics. This means we never need an audience per workshop.

### Audiences (2 of 3 max on free plan)
| Audience | ID | Who's in it |
|----------|----|-------------|
| All Subscribers | `8d799f25-66f6-4906-8df7-61bea6e53774` | Every contact |
| Workshop Attendees | `d7938ef7-847c-42a9-bbe1-ca5c287d9d69` | Anyone who signed up for any workshop |
| *(reserved)* | — | Future use (e.g., "Paid Customers") |

### Topics (unlimited on free plan, contacts can opt in/out)
| Topic | ID | Used with |
|-------|----|-----------|
| Weekly Tips | `45be5e64-2d60-474d-b4fe-1f87935828c7` | Newsletter broadcasts |
| Announcements | `fe56b5e9-c7cc-4bd7-a0ad-a8f45a6d72cc` | Course/event announcements |
| Workshop Updates | `9a208caf-6f44-414f-aab2-4c817fb9902a` | Cross-workshop promotions |
| Personal Messages | `eaf36d3c-e332-43ac-aa76-d8e3d1832c1b` | Plain text emails |

### Contact Properties
- `signup_source` — "workshop_form", "newsletter", "youtube"
- `workshop_name` — workshop name + date in DD-MM-YYYY format (e.g., "GEMS Webinar 29-03-2026"). Always include the date because the same workshop may run multiple times.
- `phone` — WhatsApp number from signup form

### Workshop Form Convention
- Every signup form MUST include a hidden field: `<input type="hidden" id="workshop_name" value="Workshop Name DD-MM-YYYY">`
- The form sends `workshop_name` to Google Sheets, and n8n reads it from `$json.workshop_name`
- Date format is DD-MM-YYYY (Israeli convention), never MM-DD-YYYY or "28 March"
- The n8n Code node uses `$json.workshop_name` with a fallback hardcoded value

### Sending Guide
| What | How | Audience | Topic |
|------|-----|----------|-------|
| Workshop reminders | n8n drip (direct API) | — | — |
| Weekly newsletter | Broadcast | All Subscribers | Weekly Tips |
| New course announcement | Broadcast | All Subscribers | Announcements |
| "New workshop for past attendees" | Broadcast | Workshop Attendees | Workshop Updates |
| Personal message blast | Broadcast | All Subscribers | Personal Messages |

### API Notes
- Contacts API: `POST https://api.resend.com/audiences/{audience_id}/contacts`
- **n8n integration:** Use Code node with `this.helpers.httpRequest()` for nested JSON
- Audience names must always be in English, never Hebrew

## Workshop Signup Flow
Full automated pipeline when someone signs up:

```
User fills form → Google Sheets (via Apps Script)
                       ↓
                n8n detects new row
                       ↓
            ┌──────────┼──────────────┬───────────────┬─────────────┐
            ↓          ↓              ↓               ↓             ↓
      Welcome      Add to        Add to Resend    Wait + Send   Wait + Send
      Email      Calendar       Contacts/Segments  Reminder 1   Reminder 2...
```

### Key Resources
- **Signup form:** https://omri-il.github.io/Resend-mailing-list/
- **Design gallery:** https://omri-il.github.io/Resend-mailing-list/gallery.html
- **Google Sheet:** 1yiAkvd1WGbD1JRYdkNM7wcEjDbfBumPOQTw2M439ncU
- **n8n workflow ID:** zMCJToIxCMt8DVhk
- **Calendar event ID:** gdjk482pid2mod9hu5r0pjto88
- **Clarity project:** w1ajcl9gof

### n8n Workflow Structure
All branches parallel from "New Signup" trigger:
1. Send Welcome Email (Resend API)
2. Add to Calendar (Google Calendar — update event with attendee)
3. Add to Resend Contacts (with properties + segments)
4. Wait 1min → Reminder: 1 Week Before
5. Wait 2min → Reminder: Day Before
6. Wait 3min → Send: Starting Now!

**Critical:** Never chain API nodes sequentially — each replaces input data with its response.

## RTL Notes
- `dir="rtl"` and `lang="he"` on Html component
- Inline `direction: rtl` + `text-align: right` on all text (email client compat)
- Font: Assistant (Google Fonts) with Arial/Helvetica/Verdana fallbacks
- Countdown timers: seconds on right, days on left (clock style)

## Template Registry
| Name | Subject | Props |
|------|---------|-------|
| `welcome` | ברוכים הבאים! 🎉 | firstName |
| `newsletter` | 🤖 טיפ AI שבועי | title, intro, tip, linkUrl, linkText |
| `announcement` | 🎉 הודעה חשובה | title, body, ctaText, ctaUrl |
| `plain` | הודעה מעומרי אירם | to, message |
| `gems-confirmation` | נרשמת בהצלחה! וובינר Gemini Gems בחינוך 🎓 | firstName, youtubeUrl |
| `gems-friday-morning` | מחר הוובינר! — הכינו את עצמכם ב-2 דקות ✨ | firstName, youtubeUrl |
| `gems-friday-afternoon` | מחר ב-20:00 — שידור חי על Gemini Gems! 🚀 | firstName, youtubeUrl |
| `gems-recording` | ההקלטה מוכנה — Gemini Gems בחינוך 🎬 | firstName, youtubeUrl |

## GEMS Webinar (29 March 2026)
- **Event:** YouTube Live — Gemini Gems in education
- **Date:** Sunday, March 29, 2026, 20:00-21:00 Israel time
- **YouTube Live:** https://youtube.com/live/y8xEvEEoVAo
- **Channel:** עומרי אירם | להיות מורה (UCJL8oq86cIJ2_qfdwcXAV_w)
- **Signup form:** https://omri-iram.co.il/gems-webinar/
- **Thank-you page:** https://omri-iram.co.il/gems-webinar/thank-you.html
- **Email preview:** https://omri-iram.co.il/gems-webinar/email-preview.html
- **Google Sheet:** 1Dpn2QTnmoEa70bO1x9Bq3iJPWVekiUlF8oWgscDv-fQ (tab: גיליון1)
- **Apps Script:** AKfycbwB7JaxpULgTMvIMsJxk5vP3FH91FFs-Q4LuPch_wdQtPl9kOPgKBzredZUX2IEM7IJRg
- **n8n workflow ID:** zNpRoSoxjw6ydoho
- **Local folder:** `29.03.26 Gem Youtube Live/` (deployed to VPS as `/var/www/omri-iram.co.il/gems-webinar/`)
- **Form flow:** Single-step signup → redirect to thank-you.html?name=...&email=... → survey shown first → post-survey content revealed
- **Survey location:** Always on thank-you.html (NOT on landing page)
- **A/B testing:** Variant stored in `localStorage` as `gems_variant`
- **Email schedule:** Confirmation (immediate) → Fri AM reminder (09:00) → Fri PM last reminder (16:00) → Recording (after event)
- **Shabbat rule:** No emails during Shabbat — last reminder Friday 16:00, event is Sunday 20:00

## YouTube Bulk Description Updater
- **n8n workflow ID:** b99qy5w6WaTQ3cPZ
- **Channel:** עומרי אירם | להיות מורה (UCJL8oq86cIJ2_qfdwcXAV_w)
- **Credentials:** YouTube OAuth2 API (hello@omri-iram.co.il) on 4 HTTP nodes + Get Channel
- **How to use:**
  1. Open workflow in n8n
  2. Edit **Config** node: set `mode`, `operation`, `text_to_add`, `batch_size`
  3. Run with `mode: dry_run` first to preview
  4. Switch to `mode: update` to apply
- **Operations:** `prepend` (top), `append` (bottom), `replace` (find/replace)
- **Safety:** `skip_if_contains` prevents double-applying, 5000 char limit check
- **Quota:** ~50 units per video update, max ~190 videos/day (10,000 daily limit)
- **Current limit:** First 50 videos (no pagination yet). Add pagination for 50+ videos later.
- **Important:** Never set Hebrew text via n8n API — always type directly in n8n UI to avoid encoding corruption

## Design Gallery (8 styles)
1. Warm & Supportive (current) — teal/sage, friendly
2. Minimalist — white, underline inputs
3. Dark & Bold — dark bg, purple glow
4. Split-Screen — visual + form side by side
5. Glassmorphism — frosted glass card
6. VSL Video Top — video above, form below
7. VSL Split — video and form side by side
8. VSL Hero — big video, compact form underneath
