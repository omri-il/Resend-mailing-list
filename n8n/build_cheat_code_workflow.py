"""
Cheat Code Live — n8n Email Automation Workflow Builder
========================================================
Event: Monday 30 March 2026, 20:00 Israel time

Emails sent:
  1. Confirmation       — immediately after signup
  2. Morning reminder   — 30.03 09:00 Israel (06:00 UTC)
  3. "3 hours to go"    — 30.03 17:00 Israel (14:00 UTC)
  4. Recording + offer  — 31.03 12:00 Israel (09:00 UTC)

Prerequisites:
  - RESEND_API_KEY env var set
  - Create a new Google Sheet for this event (duplicate the GEMS sheet)
  - Deploy Apps Script to that sheet, copy the URL → update in index.html assets/script.js
  - Update SHEET_ID below with the new Google Sheet ID

Run:
  python n8n/build_cheat_code_workflow.py
  # Outputs: workflow JSON to %TEMP%/cheat-code-workflow.json

Then upload via n8n REST API:
  curl -X POST https://n8n.srv1038526.hstgr.cloud/api/v1/workflows \
    -H "X-N8N-API-KEY: $N8N_API_KEY" \
    -H "Content-Type: application/json" \
    -d @%TEMP%/cheat-code-workflow.json
"""

import json, uuid, os

def uid():
    return str(uuid.uuid4())

RESEND_KEY = os.environ.get('RESEND_API_KEY', '')

# TODO: Replace with the new Google Sheet ID created for this event
SHEET_ID   = 'REPLACE_WITH_NEW_GOOGLE_SHEET_ID'

CHECKOUT_URL = 'https://omri-iram.co.il/cheat-code-live/checkout.html'
WA_URL       = 'REPLACE_WITH_WHATSAPP_GROUP_URL'

# ────────────────────────────────────────────────
# Email HTML builder — RTL, purple theme
# ────────────────────────────────────────────────
def email_html(greeting, body, btn_text, btn_url, note=''):
    html  = '<div dir="rtl" style="font-family:Assistant,Arial,sans-serif;background:#f0eaff;padding:40px 20px;">'
    html += '<div style="max-width:600px;margin:0 auto;">'
    html += '<div style="text-align:center;padding:20px 0 24px;"><h1 style="color:#7C3AED;font-size:26px;margin:0;">\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd</h1><p style="color:#636e72;font-size:13px;margin-top:4px;">\u05dc\u05d9\u05d9\u05d1 \u05e6\u05f3\u05d9\u05d8-\u05e7\u05d5\u05d3 \u05dc\u05de\u05d5\u05e8\u05d9\u05dd</p></div>'
    html += '<div style="background:#fff;border-radius:12px;padding:32px;direction:rtl;">'
    html += '<h2 style="color:#1a0a3d;font-size:22px;text-align:right;margin-bottom:16px;">' + greeting + '</h2>'
    html += '<p style="font-size:16px;line-height:26px;color:#4a4a68;text-align:right;">' + body + '</p>'
    html += '</div>'
    html += '<div style="text-align:center;padding:24px 0 12px;">'
    html += '<a href="' + btn_url + '" style="background:#7C3AED;border-radius:10px;color:#fff;font-size:17px;font-weight:700;text-decoration:none;padding:14px 32px;display:inline-block;">' + btn_text + '</a>'
    html += '</div>'
    if note:
        html += '<p style="font-size:13px;color:#636e72;text-align:center;">' + note + '</p>'
    html += '</div></div>'
    return html

def email_node_body(subject_text, html_content):
    return '={{ JSON.stringify({ from: "\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd <omri@mail.omri-iram.co.il>", to: [$json.email], subject: "' + subject_text + '", html: "' + html_content.replace('"', "'") + '" }) }}'

# ────────────────────────────────────────────────
# Email 1: Confirmation (immediate)
# ────────────────────────────────────────────────
confirm_html = email_html(
    "\u05d4\u05d9\u05d9, \" + $json.name + \"! \u05e0\u05e8\u05e9\u05de\u05ea \uD83C\uDF89",
    "\u05de\u05e7\u05d5\u05de\u05da \u05e9\u05de\u05d5\u05e8 \u05d1\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d4\u05d7\u05d9!<br><br>"
    + "<strong>\u05d4\u05dc\u05d9\u05d9\u05d1:</strong> \u05e9\u05e0\u05d9, 30 \u05d1\u05de\u05e8\u05e5 2026, 20:00\u201321:00<br>"
    + "<strong>\u05d0\u05d9\u05e4\u05d4:</strong> \u05e9\u05d9\u05d3\u05d5\u05e8 \u05d7\u05d9 \u05d1\u05d9\u05d5\u05d8\u05d9\u05d5\u05d1<br><br>"
    + "\uD83D\uDD11 <strong>\u05d7\u05e9\u05d5\u05d1:</strong> \u05d4\u05dc\u05d9\u05e0\u05e7 \u05dc\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d9\u05d9\u05e9\u05dc\u05d7 \u05d0\u05da \u05d5\u05e8\u05e7 \u05d1\u05e7\u05d1\u05d5\u05e6\u05ea \u05d4\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4 \u05d4\u05e9\u05e7\u05d8\u05d4. \u05d0\u05dd \u05e2\u05d3\u05d9\u05d9\u05df \u05dc\u05d0 \u05d4\u05e6\u05d8\u05e8\u05e4\u05ea\u05dd \u2014 \u05e2\u05e9\u05d5 \u05d6\u05d0\u05ea \u05e2\u05db\u05e9\u05d5.",
    "\uD83D\uDCF2 \u05d4\u05e6\u05d8\u05e8\u05e4\u05d5\u05ea \u05dc\u05e7\u05d1\u05d5\u05e6\u05ea \u05d4\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4",
    WA_URL,
    "\u05dc\u05d0 \u05d9\u05db\u05d5\u05dc/\u05d4 \u05dc\u05d4\u05d2\u05d9\u05e2? \u05d4\u05dc\u05d9\u05d9\u05d1 \u05d9\u05d5\u05e7\u05dc\u05d8 \u05d5\u05d9\u05d9\u05e9\u05dc\u05d7 \u05dc\u05db\u05dc \u05d4\u05e0\u05e8\u05e9\u05de\u05d9\u05dd."
)

# ────────────────────────────────────────────────
# Email 2: Morning of 30.03 at 09:00 Israel (06:00 UTC)
# ────────────────────────────────────────────────
morning_html = email_html(
    "\u05d4\u05d9\u05d5\u05dd \u05d4\u05dc\u05d9\u05d9\u05d1! \u2014 2 \u05d3\u05e7\u05d5\u05ea \u05d4\u05db\u05e0\u05d4 \u05dc\u05e4\u05e0\u05d9 \u05d4-20:00 \u26A1",
    "\u05d4\u05d9\u05d9 \" + $json.name + \",<br><br>"
    + "\u05d4\u05dc\u05d9\u05d9\u05d1 <strong>\u05d4\u05dc\u05d9\u05dc\u05d4 \u05d1-20:00</strong>! \u05d4\u05db\u05e0\u05d4 \u05e9\u05dc-2 \u05d3\u05e7\u05d5\u05ea \u05e9\u05ea\u05d2\u05d3\u05d9\u05dc \u05d0\u05ea \u05d4\u05e2\u05e8\u05da \u05e9\u05ea\u05e7\u05d1\u05dc\u05d5:<br><br>"
    + "\u05e4\u05ea\u05d7\u05d5 \u05d0\u05ea <a href='https://gemini.google.com' style='color:#7C3AED;'>gemini.google.com</a> \u05d5\u05d5\u05d3\u05d0\u05d5 \u05e9\u05d9\u05e9 \u05dc\u05db\u05dd \u05d2\u05d9\u05e9\u05d4. \u05d6\u05d4 \u05d4\u05db\u05dc\u05d9 \u05e9\u05e0\u05e9\u05ea\u05de\u05e9 \u05d1\u05d5 \u05d1\u05e9\u05d9\u05d3\u05d5\u05e8.<br><br>"
    + "\u05d0\u05dd \u05d9\u05e9 \u05e9\u05d0\u05dc\u05d4 \u05d0\u05d7\u05ea \u05e9\u05ea\u05e8\u05e6\u05d5 \u05e9\u05d0\u05e2\u05e0\u05d4 \u05e2\u05dc\u05d9\u05d4 \u2014 \u05e9\u05de\u05e8\u05d5 \u05d0\u05d5\u05ea\u05d4 \u05dc\u05e9\u05d9\u05d3\u05d5\u05e8. \u05d0\u05d2\u05d9\u05d1 \u05d1\u05d6\u05de\u05df \u05d0\u05de\u05ea.",
    "\u05e4\u05ea\u05d7\u05d5 Gemini \u05e2\u05db\u05e9\u05d5\u05d5 \u2192",
    "https://gemini.google.com",
    "\u05d4\u05dc\u05d9\u05e0\u05e7 \u05dc\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d9\u05d2\u05d9\u05e2 \u05d1\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4 \u05d1-19:55"
)

# ────────────────────────────────────────────────
# Email 3: "3 hours to go" at 17:00 Israel (14:00 UTC)
# ────────────────────────────────────────────────
afternoon_html = email_html(
    "\u05e2\u05d5\u05d3 3 \u05e9\u05e2\u05d5\u05ea... \u05d4\u05e6\u05f3\u05d9\u05d8-\u05e7\u05d5\u05d3 \u05de\u05d7\u05db\u05d4 \u05dc\u05db\u05dd",
    "\u05d4\u05d9\u05d9 \" + $json.name + \",<br><br>"
    + "\u05d1-20:00 \u05d4\u05dc\u05d9\u05dc\u05d4 \u05e0\u05d1\u05e0\u05d4 \u05d1\u05d9\u05d7\u05d3 \u05e2\u05d5\u05d6\u05e8 AI \u05e9\u05de\u05db\u05d9\u05df \u05e9\u05d9\u05e2\u05d5\u05e8\u05d9\u05dd, \u05d1\u05d5\u05d3\u05e7 \u05de\u05d1\u05d7\u05e0\u05d9\u05dd, \u05d5\u05de\u05e4\u05d7\u05d9\u05ea \u05d0\u05ea \u05d4\u05e2\u05d5\u05de\u05e1 \u05e9\u05dc\u05db\u05dd.<br><br>"
    + "<strong>\u05de\u05d4 \u05dc\u05ea\u05db\u05d9\u05df:</strong><br>"
    + "\uD83D\uDCDD \u05de\u05d7\u05d1\u05e8\u05ea \u05d0\u05d5 \u05d3\u05e3 \u05dc\u05e8\u05e9\u05d5\u05dd<br>"
    + "\uD83D\uDCBB Gemini \u05e4\u05ea\u05d5\u05d7 \u05d5\u05de\u05d5\u05db\u05df<br>"
    + "\uD83E\uDD14 \u05e9\u05d0\u05dc\u05d4 \u05d0\u05d7\u05ea \u05e9\u05ea\u05e8\u05e6\u05d5 \u05dc\u05e9\u05d0\u05d5\u05dc<br><br>"
    + "\u05d4\u05dc\u05d9\u05e0\u05e7 \u05d9\u05d2\u05d9\u05e2 \u05d1\u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4 \u05de\u05d9\u05d3 \u05dc\u05e4\u05e0\u05d9 \u05e9\u05de\u05ea\u05d7\u05d9\u05dc\u05d9\u05dd.",
    "\uD83D\uDCF2 \u05e7\u05d1\u05d5\u05e6\u05ea \u05d5\u05d5\u05d0\u05d8\u05e1\u05d0\u05e4 \u05e9\u05dc\u05e0\u05d5",
    WA_URL,
    "\u05d1\u05e1\u05d5\u05e3 \u05d4\u05dc\u05d9\u05d9\u05d1 \u05e0\u05e6\u05d9\u05d2 \u05d0\u05ea \u05d0\u05ea\u05d2\u05e8 \u05d4\u05e4\u05e1\u05d7 \u2014 197 \u20aa \u05d3\u05de\u05d9 \u05e8\u05e6\u05d9\u05e0\u05d5\u05ea (\u05de\u05d5\u05d7\u05d6\u05e8\u05d9\u05dd \u05dc\u05de\u05d9 \u05e9\u05de\u05d9\u05d9\u05e9\u05dd)"
)

# ────────────────────────────────────────────────
# Email 4: Recording + offer (31.03 at 12:00 Israel = 09:00 UTC)
# ────────────────────────────────────────────────
recording_html = email_html(
    "\u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05de\u05d5\u05db\u05e0\u05d4 + \u05d4\u05e6\u05e2\u05d4 \u05de\u05d9\u05d5\u05d7\u05d3\u05ea \uD83C\uDF9E",
    "\u05d4\u05d9\u05d9 \" + $json.name + \",<br><br>"
    + "\u05ea\u05d5\u05d3\u05d4 \u05e9\u05d4\u05e6\u05d8\u05e8\u05e4\u05ea\u05dd \u05dc\u05dc\u05d9\u05d9\u05d1! \u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05de\u05d5\u05db\u05e0\u05d4 \u05dc\u05e6\u05e4\u05d9\u05d9\u05d4 \u2014 \u05db\u05d5\u05dc\u05dc \u05d0\u05ea \u05d4\u05e6\u05f3\u05d9\u05d8-\u05e7\u05d5\u05d3\u05e1 \u05e9\u05d1\u05e0\u05d9\u05e0\u05d5 \u05d1\u05d9\u05d7\u05d3.<br><br>"
    + "\uD83C\uDFAF <strong>\u05d5\u05d4\u05e6\u05e2\u05d4 \u05de\u05d9\u05d5\u05d7\u05d3\u05ea \u05dc\u05de\u05e9\u05ea\u05ea\u05e4\u05d9 \u05d4\u05dc\u05d9\u05d9\u05d1:</strong><br>"
    + "\"\u05d0\u05ea\u05d2\u05e8 \u05e0\u05d7\u05d9\u05ea\u05d4 \u05e8\u05db\u05d4 \u05de\u05e4\u05e1\u05d7: \u05d1\u05d5\u05e0\u05d9\u05dd \u05e6\u05d5\u05d5\u05ea AI \u05d0\u05d9\u05e9\u05d9 \u05d1-5 \u05d9\u05de\u05d9\u05dd\"<br><br>"
    + "\u2705 3 \u05de\u05e4\u05d2\u05e9\u05d9\u05dd \u05de\u05de\u05d5\u05e7\u05d3\u05d9\u05dd<br>"
    + "\u2705 3 \u05e2\u05d5\u05d6\u05e8\u05d9 AI \u05de\u05d5\u05db\u05e0\u05d9\u05dd \u05dc\u05e9\u05d9\u05de\u05d5\u05e9<br>"
    + "\u2705 197 \u20aa \u2014 \u05de\u05d5\u05d7\u05d6\u05e8\u05d9\u05dd \u05dc\u05de\u05d9 \u05e9\u05de\u05d9\u05d9\u05e9\u05dd!<br><br>"
    + "\u05d4\u05d0\u05ea\u05d2\u05e8 \u05de\u05ea\u05d7\u05d9\u05dc \u05d0\u05d7\u05e8\u05d9 \u05e4\u05e1\u05d7. \u05de\u05e7\u05d5\u05de\u05d5\u05ea \u05de\u05d5\u05d2\u05d1\u05dc\u05d9\u05dd.",
    "\uD83C\uDFAF \u05dc\u05d4\u05e6\u05d8\u05e8\u05e4\u05d5\u05ea \u05dc\u05d0\u05ea\u05d2\u05e8 \u2192",
    CHECKOUT_URL,
    "\u05de\u05d7\u05d9\u05e8 \u05de\u05d9\u05d5\u05d7\u05d3 \u05dc\u05e0\u05d5\u05db\u05d7\u05d9 \u05d4\u05dc\u05d9\u05d9\u05d1 \u05d1\u05dc\u05d1\u05d3 \u00b7 \u05de\u05d5\u05d2\u05d1\u05dc \u05d1\u05d6\u05de\u05df"
)

# ────────────────────────────────────────────────
# n8n node builders
# ────────────────────────────────────────────────
def make_email_node(name, subject, html, pos):
    return {
        "parameters": {
            "method": "POST",
            "url": "https://api.resend.com/emails",
            "authentication": "predefinedCredentialType",
            "nodeCredentialType": "httpHeaderAuth",
            "sendBody": True,
            "specifyBody": "json",
            "jsonBody": email_node_body(subject, html),
            "options": {}
        },
        "id": uid(), "name": name, "type": "n8n-nodes-base.httpRequest", "typeVersion": 4.2,
        "position": pos,
        "credentials": {"httpHeaderAuth": {"id": "aU8jwJk3V0bfpR4j", "name": "Resend API"}}
    }

def make_wait_node(name, date_str, pos):
    return {
        "parameters": {"resume": "specificTime", "dateTime": date_str},
        "id": uid(), "name": name, "type": "n8n-nodes-base.wait", "typeVersion": 1.1,
        "position": pos, "webhookId": uid()
    }

# ────────────────────────────────────────────────
# Add to Resend contacts (both audiences)
# ────────────────────────────────────────────────
add_contacts_node = {
    "parameters": {
        "jsCode": (
            "const email = $json.email;\n"
            "const firstName = $json.name || '';\n"
            "const ai_level = $json.ai_level || 'unknown';\n\n"
            "const headers = {\n"
            "  'Authorization': 'Bearer " + RESEND_KEY + "',\n"
            "  'Content-Type': 'application/json'\n"
            "};\n\n"
            "const props = {\n"
            "  signup_source: 'cheat_code_live_form',\n"
            "  workshop_name: ($json.workshop_name || 'Cheat Code Live 30-03-2026'),\n"
            "  ai_level: ai_level\n"
            "};\n\n"
            "await this.helpers.httpRequest({\n"
            "  method: 'POST',\n"
            "  url: 'https://api.resend.com/audiences/8d799f25-66f6-4906-8df7-61bea6e53774/contacts',\n"
            "  headers,\n"
            "  body: JSON.stringify({ email, first_name: firstName, unsubscribed: false, properties: props })\n"
            "});\n\n"
            "await this.helpers.httpRequest({\n"
            "  method: 'POST',\n"
            "  url: 'https://api.resend.com/audiences/d7938ef7-847c-42a9-bbe1-ca5c287d9d69/contacts',\n"
            "  headers,\n"
            "  body: JSON.stringify({ email, first_name: firstName, unsubscribed: false, properties: props })\n"
            "});\n\n"
            "return [{ json: { success: true, email, firstName, ai_level } }];"
        )
    },
    "id": uid(), "name": "Add to Resend Contacts", "type": "n8n-nodes-base.code", "typeVersion": 2,
    "position": [400, 300]
}

# ────────────────────────────────────────────────
# Assemble workflow
# ────────────────────────────────────────────────
wf = {
    "name": "Cheat Code Live - Signup Automation",
    "nodes": [
        # Trigger: Google Sheets
        {
            "parameters": {
                "pollTimes": {"item": [{"mode": "everyMinute"}]},
                "documentId": {"__rl": True, "value": SHEET_ID, "mode": "id"},
                "sheetName":  {"__rl": True, "value": "gid=0",   "mode": "id"},
                "event": "rowAdded",
                "options": {}
            },
            "id": uid(), "name": "New Signup", "type": "n8n-nodes-base.googleSheetsTrigger", "typeVersion": 1,
            "position": [0, 300],
            "credentials": {"googleSheetsTriggerOAuth2Api": {"id": "QSAQpdtDCKUvfV6U", "name": "Google Sheets Trigger account"}}
        },

        # Branch 1: Immediate confirmation
        make_email_node(
            "Send Confirmation",
            "\u05e0\u05e8\u05e9\u05de\u05ea! \u05de\u05e7\u05d5\u05de\u05da \u05e9\u05de\u05d5\u05e8 \u05dc\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d4\u05d7\u05d9 \uD83E\uDD16",
            confirm_html,
            [400, 0]
        ),

        # Branch 2: Add to Resend
        add_contacts_node,

        # Branch 3: Morning of 30.03 at 09:00 Israel = 06:00 UTC
        make_wait_node("Wait Morning", "2026-03-30T06:00:00.000Z", [400, 500]),
        make_email_node(
            "Reminder Morning",
            "\u05d4\u05d9\u05d5\u05dd \u05d4\u05dc\u05d9\u05d9\u05d1! \u2014 2 \u05d3\u05e7\u05d5\u05ea \u05d4\u05db\u05e0\u05d4 \u05dc\u05e4\u05e0\u05d9 \u05d4-20:00 \u26A1",
            morning_html,
            [700, 500]
        ),

        # Branch 4: 3 hours to go at 17:00 Israel = 14:00 UTC
        make_wait_node("Wait Afternoon", "2026-03-30T14:00:00.000Z", [400, 700]),
        make_email_node(
            "Reminder Afternoon",
            "\u05e2\u05d5\u05d3 3 \u05e9\u05e2\u05d5\u05ea... \u05d4\u05e6\u05f3\u05d9\u05d8-\u05e7\u05d5\u05d3 \u05de\u05d7\u05db\u05d4 \u05dc\u05db\u05dd",
            afternoon_html,
            [700, 700]
        ),

        # Branch 5: Recording + offer (31.03 at 12:00 Israel = 09:00 UTC)
        make_wait_node("Wait Recording", "2026-03-31T09:00:00.000Z", [400, 900]),
        make_email_node(
            "Send Recording",
            "\u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05de\u05d5\u05db\u05e0\u05d4 + \u05d4\u05e6\u05e2\u05d4 \u05de\u05d9\u05d5\u05d7\u05d3\u05ea \uD83C\uDF9E",
            recording_html,
            [700, 900]
        ),
    ],
    "connections": {
        "New Signup": {"main": [[
            {"node": "Send Confirmation",  "type": "main", "index": 0},
            {"node": "Add to Resend Contacts", "type": "main", "index": 0},
            {"node": "Wait Morning",       "type": "main", "index": 0},
            {"node": "Wait Afternoon",     "type": "main", "index": 0},
            {"node": "Wait Recording",     "type": "main", "index": 0},
        ]]},
        "Wait Morning":   {"main": [[{"node": "Reminder Morning",   "type": "main", "index": 0}]]},
        "Wait Afternoon": {"main": [[{"node": "Reminder Afternoon", "type": "main", "index": 0}]]},
        "Wait Recording": {"main": [[{"node": "Send Recording",     "type": "main", "index": 0}]]},
    },
    "settings": {"executionOrder": "v1"}
}

outpath = os.path.join(os.environ.get('TEMP', '/tmp'), 'cheat-code-workflow.json')
with open(outpath, 'w', encoding='utf-8') as f:
    json.dump(wf, f, ensure_ascii=True, indent=2)

print("Written to", outpath)
print("Nodes:", len(wf['nodes']))
print()
print("Next steps:")
print("1. Create Google Sheet, deploy Apps Script, update SHEET_ID in this file")
print("2. Update GOOGLE_SCRIPT_URL in 30.03.26 Cheat Code Live/assets/script.js")
print("3. Update WHATSAPP_GROUP_URL in thank-you.html and email-preview.html")
print("4. Upload workflow: curl -X POST https://n8n.srv1038526.hstgr.cloud/api/v1/workflows -H 'X-N8N-API-KEY: ...' -H 'Content-Type: application/json' -d @" + outpath)
print("5. Activate the workflow in n8n UI")
