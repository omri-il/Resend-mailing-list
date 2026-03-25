# Resend Mailing List

Hebrew RTL email system using React Email v5+ and Resend SDK.

## Tech Stack
- **Runtime:** Node.js + TypeScript (ESM)
- **Email templates:** React Email (`@react-email/components`)
- **Rendering:** `@react-email/render` (v2 — use `render()`, not `renderAsync`)
- **Sending:** Resend SDK
- **Webhooks:** Express.js
- **Runner:** tsx (no build step needed)

## Project Structure
```
emails/WelcomeHebrew.tsx   — Welcome email for new subscribers
emails/Newsletter.tsx      — Weekly tips newsletter
emails/Announcement.tsx    — Course/event announcement (dark bg)
emails/PlainText.tsx       — Simple personal text message
src/templates.ts           — Template registry (name → component + metadata)
src/sendTemplate.ts        — Send any template by name via CLI
src/sendEmail.ts           — Original single-template sender
src/webhook.ts             — Express webhook listener for tracking
```

## Template Registry
Templates are registered in `src/templates.ts`. Each has a friendly name, default subject, and props.

| Name | Subject | Props |
|------|---------|-------|
| `welcome` | ברוכים הבאים! 🎉 | firstName |
| `newsletter` | 🤖 טיפ AI שבועי | title, intro, tip, linkUrl, linkText |
| `announcement` | 🎉 הודעה חשובה | title, body, ctaText, ctaUrl |
| `plain` | הודעה מעומרי אירם | to, message |

To add a new template: create `emails/MyTemplate.tsx`, then add an entry in `src/templates.ts`.

## Commands
```bash
npm run dev            # Preview all templates at localhost:3333
npm run send:template  # Send by template name (see flags below)
npm run send           # Send welcome email (legacy)
npm run webhook        # Start webhook listener on port 3001
npm run typecheck      # TypeScript check
```

### send:template flags
```bash
npm run send:template -- --template welcome --to "email@example.com"
npm run send:template -- --template newsletter --subject "נושא מותאם" --title "כותרת"
# --template   Template name (required, or omit to list all)
# --to         Recipient email (default: hello@omri-iram.co.il)
# --subject    Override default subject
# --from       Sender address (default: omri@hello.omri-iram.co.il)
# Any other --key value pairs become template props
```

## Environment
- `.env` — contains `RESEND_API_KEY` (not committed)
- `.env.example` — template for new setup
- **API key type:** Full access (can send, read domains, manage contacts, etc.)

## Domain
- **Verified domain:** `hello.omri-iram.co.il`
- **Domain ID:** `a37738dd-b273-4bd9-98f4-82a23e70edd3`
- **Region:** Tokyo (ap-northeast-1)
- **Capabilities:** Sending + Receiving enabled

## Sending Emails
- Default "from" address: `omri@hello.omri-iram.co.il` (verified custom domain)
- Sandbox fallback: `onboarding@resend.dev`
- Pass a custom name: `npm run send -- "שם"` (defaults to "עומרי")

## Webhook Setup
1. Run `npm run webhook` to start on port 3001
2. For production: expose via ngrok or deploy, then add URL in Resend dashboard → Webhooks
3. Endpoint: `POST /api/webhooks/resend`
4. Events tracked: sent, delivered, opened, clicked, bounced, complained

## Tracking
- Enable Open/Click tracking: Resend dashboard → Settings → Domains → toggle
- Webhook events: configure in Resend dashboard → Webhooks

## RTL Notes
- `dir="rtl"` and `lang="he"` on Html component
- Inline `direction: rtl` + `text-align: right` on all text (email client compat)
- Font: Assistant (Google Fonts) with Arial/Helvetica/Verdana fallbacks
