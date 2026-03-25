# Resend Mailing List

Hebrew RTL email system using React Email v5+ and Resend SDK, with automated workshop signup flows via n8n.

## Tech Stack
- **Runtime:** Node.js + TypeScript (ESM)
- **Email templates:** React Email (`@react-email/components`)
- **Rendering:** `@react-email/render` (v2 — use `render()`, not `renderAsync`)
- **Sending:** Resend SDK
- **Webhooks:** Express.js
- **Automation:** n8n (VPS at n8n.srv1038526.hstgr.cloud)
- **Landing pages:** Static HTML, hosted on GitHub Pages
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
  index.html               — Workshop signup form (warm & supportive design)
  gallery.html             — Design gallery with 8 form styles
docs/
  index.html               — GitHub Pages copy of workshop form
  gallery.html             — GitHub Pages copy of gallery
n8n/
  workshop-reminders-workflow.json  — Original n8n workflow export
```

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

## Resend Contacts & Segments
- **Contact properties:** experience_level, signup_source, workshop_name, phone
- **Segments:** "כל המנויים" (master), "סדנת Google Classroom" (workshop-specific)
- Free plan limit: 3 segments max
- Contacts API: `POST https://api.resend.com/contacts`
- Segments API: `POST https://api.resend.com/segments`

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

## Design Gallery (8 styles)
1. Warm & Supportive (current) — teal/sage, friendly
2. Minimalist — white, underline inputs
3. Dark & Bold — dark bg, purple glow
4. Split-Screen — visual + form side by side
5. Glassmorphism — frosted glass card
6. VSL Video Top — video above, form below
7. VSL Split — video and form side by side
8. VSL Hero — big video, compact form underneath
