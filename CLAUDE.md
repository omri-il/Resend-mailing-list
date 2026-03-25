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
emails/WelcomeHebrew.tsx   — Hebrew RTL welcome email template
src/sendEmail.ts           — Render + send email via Resend
src/webhook.ts             — Express webhook listener for tracking
```

## Commands
```bash
npm run dev        # Preview emails at localhost:3333
npm run send       # Send test email (needs RESEND_API_KEY in .env)
npm run webhook    # Start webhook listener on port 3001
npm run typecheck  # TypeScript check
```

## Environment
- `.env` — contains `RESEND_API_KEY` (not committed)
- `.env.example` — template for new setup

## Sending Emails
- Default "from" address: `onboarding@resend.dev` (Resend sandbox)
- To send from custom domain: verify domain in Resend dashboard → Domains
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
