import json, uuid, os

def uid():
    return str(uuid.uuid4())

RESEND_KEY = 're_8DyfSv6B_2hYgAPbjHchC67YdKuKkTkHp'
YT_URL = 'https://youtube.com/live/y8xEvEEoVAo'

# Email HTML builder - simple RTL template
def email_html(greeting, body, btn_text, btn_url, note=''):
    html = '<div dir="rtl" style="font-family:Assistant,Arial,sans-serif;background:#f0fafa;padding:40px 20px;">'
    html += '<div style="max-width:600px;margin:0 auto;">'
    html += '<div style="text-align:center;padding:20px 0;"><h1 style="color:#0D7377;font-size:28px;margin:0;">' + "\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd" + '</h1></div>'
    html += '<div style="background:#fff;border-radius:12px;padding:32px;direction:rtl;">'
    html += '<h2 style="color:#0D7377;font-size:24px;text-align:right;">' + greeting + '</h2>'
    html += '<p style="font-size:16px;line-height:26px;color:#4a4a68;text-align:right;">' + body + '</p>'
    html += '</div>'
    html += '<div style="text-align:center;padding:20px 0;">'
    html += '<a href="' + btn_url + '" style="background:#0D7377;border-radius:10px;color:#fff;font-size:18px;font-weight:700;text-decoration:none;padding:14px 36px;display:inline-block;">' + btn_text + '</a>'
    html += '</div>'
    if note:
        html += '<p style="font-size:14px;color:#636e72;text-align:center;">' + note + '</p>'
    html += '</div></div>'
    return html

# Build n8n expression for email jsonBody
def email_node_body(subject_text, html_content):
    # The HTML uses single quotes internally, double quotes for the outer JSON
    return '={{ JSON.stringify({ from: "\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd <omri@mail.omri-iram.co.il>", to: [$json.email], subject: "' + subject_text + '", html: "' + html_content.replace('"', "'") + '" }) }}'

# Confirmation email
confirm_html = email_html(
    "\u05e9\u05dc\u05d5\u05dd, \" + $json.name + \"!",
    "\u05e0\u05e8\u05e9\u05de\u05ea \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4 \u05dc\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 <strong>Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da</strong>!<br><br><strong>\u05de\u05ea\u05d9:</strong> \u05e9\u05d1\u05ea, 28 \u05d1\u05de\u05e8\u05e5 2026, 20:30-21:30<br><strong>\u05d0\u05d9\u05e4\u05d4:</strong> \u05e9\u05d9\u05d3\u05d5\u05e8 \u05d7\u05d9 \u05d1\u05d9\u05d5\u05d8\u05d9\u05d5\u05d1",
    "\u05dc\u05e6\u05e4\u05d9\u05d9\u05d4 \u05d1\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d4\u05d7\u05d9",
    YT_URL,
    "\u05dc\u05d0 \u05ea\u05d5\u05db\u05dc\u05d5 \u05dc\u05d4\u05d2\u05d9\u05e2? \u05d0\u05d9\u05df \u05d1\u05e2\u05d9\u05d4! \u05d4\u05e9\u05d9\u05e2\u05d5\u05e8 \u05d9\u05d5\u05e7\u05dc\u05d8 \u05d5\u05d9\u05d9\u05e9\u05dc\u05d7 \u05dc\u05db\u05dc \u05d4\u05e0\u05e8\u05e9\u05de\u05d9\u05dd."
)

# Friday morning reminder
fri_am_html = email_html(
    "\u05d4\u05d9\u05d9, \" + $json.name + \"!",
    "\u05de\u05d7\u05e8 \u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e9\u05dc\u05e0\u05d5 \u05e2\u05dc Gemini Gems \u05de\u05ea\u05d7\u05d9\u05dc \u05de\u05d7\u05e8! \u05d4\u05e0\u05d4 \u05d8\u05d9\u05e4 \u05e7\u05d8\u05df \u05dc\u05e4\u05e0\u05d9 \u05d4\u05e9\u05d9\u05d3\u05d5\u05e8:<br><br>\u05e0\u05e1\u05d5 \u05dc\u05d4\u05d9\u05db\u05e0\u05e1 \u05dc-<strong>gemini.google.com</strong> \u05d5\u05dc\u05dc\u05d7\u05d5\u05e5 \u05e2\u05dc Gems \u05d1\u05ea\u05e4\u05e8\u05d9\u05d8. \u05d6\u05d4 \u05d4\u05de\u05e7\u05d5\u05dd \u05e9\u05d1\u05d5 \u05e0\u05d1\u05e0\u05d4 \u05d0\u05ea \u05d4\u05e6\u05f3\u05d0\u05d8\u05d1\u05d5\u05d8 \u05d4\u05d7\u05d9\u05e0\u05d5\u05db\u05d9 \u05e9\u05dc\u05db\u05dd \u05d1\u05e9\u05d9\u05d3\u05d5\u05e8!",
    "\u05dc\u05e9\u05de\u05d5\u05e8 \u05d1\u05d9\u05d5\u05de\u05df",
    YT_URL
)

# Friday 16:00 last reminder
fri_pm_html = email_html(
    "\" + $json.name + \", \u05ea\u05d6\u05db\u05d5\u05e8\u05ea \u05d0\u05d7\u05e8\u05d5\u05e0\u05d4!",
    "\u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e9\u05dc\u05e0\u05d5 \u05e2\u05dc Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da \u05de\u05ea\u05d7\u05d9\u05dc \u05de\u05d7\u05e8 \u05d1\u05de\u05d5\u05e6\u05d0\u05d9 \u05e9\u05d1\u05ea \u05d1-20:30.<br><br>\u05e9\u05d1\u05ea \u05e9\u05dc\u05d5\u05dd \u05d5\u05e0\u05ea\u05e8\u05d0\u05d4 \u05d1\u05e2\u05e8\u05d1!",
    "\u05dc\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d4\u05d7\u05d9 \u05d1\u05de\u05d5\u05e6\u05f3\u05e9",
    YT_URL
)

# Recording email
rec_html = email_html(
    "\u05d4\u05d9\u05d9, \" + $json.name + \"!",
    "\u05ea\u05d5\u05d3\u05d4 \u05e9\u05d4\u05e9\u05ea\u05ea\u05e4\u05ea\u05dd! \u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05e9\u05dc \u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e2\u05dc Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da \u05de\u05d5\u05db\u05e0\u05d4 \u05dc\u05e6\u05e4\u05d9\u05d9\u05d4.",
    "\u05dc\u05e6\u05e4\u05d9\u05d9\u05d4 \u05d1\u05d4\u05e7\u05dc\u05d8\u05d4",
    YT_URL
)

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
        "parameters": {
            "resume": "specificTime",
            "dateTime": date_str
        },
        "id": uid(), "name": name, "type": "n8n-nodes-base.wait", "typeVersion": 1.1,
        "position": pos, "webhookId": uid()
    }

wf = {
    "name": "GEMS Webinar - Signup Automation",
    "nodes": [
        # Trigger
        {
            "parameters": {
                "pollTimes": {"item": [{"mode": "everyMinute"}]},
                "documentId": {"__rl": True, "value": "1Dpn2QTnmoEa70bO1x9Bq3iJPWVekiUlF8oWgscDv-fQ", "mode": "id"},
                "sheetName": {"__rl": True, "value": "gid=0", "mode": "id"},
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
            "\u05e0\u05e8\u05e9\u05de\u05ea \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4! Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da",
            confirm_html,
            [400, 0]
        ),

        # Branch 2: Add to Resend contacts
        {
            "parameters": {
                "jsCode": "const email = $json.email;\nconst firstName = $json.name;\nconst phone = String($json.phone || '');\n\nconst contactData = {\n  email: email,\n  first_name: firstName,\n  unsubscribed: false\n};\n\nconst headers = {\n  'Authorization': 'Bearer " + RESEND_KEY + "',\n  'Content-Type': 'application/json'\n};\n\nconst allSubs = await this.helpers.httpRequest({\n  method: 'POST',\n  url: 'https://api.resend.com/audiences/8d799f25-66f6-4906-8df7-61bea6e53774/contacts',\n  headers: headers,\n  body: JSON.stringify({\n    ...contactData,\n    properties: {\n      signup_source: 'gems_webinar_form',\n      workshop_name: ($json.workshop_name || 'GEMS Webinar 28-03-2026'),\n      phone: phone\n    }\n  })\n});\n\nconst workshop = await this.helpers.httpRequest({\n  method: 'POST',\n  url: 'https://api.resend.com/audiences/d7938ef7-847c-42a9-bbe1-ca5c287d9d69/contacts',\n  headers: headers,\n  body: JSON.stringify({\n    ...contactData,\n    properties: {\n      signup_source: 'gems_webinar_form',\n      workshop_name: ($json.workshop_name || 'GEMS Webinar 28-03-2026'),\n      phone: phone\n    }\n  })\n});\n\nreturn { json: { success: true, email, firstName } };"
            },
            "id": uid(), "name": "Add to Resend Contacts", "type": "n8n-nodes-base.code", "typeVersion": 2,
            "position": [400, 200]
        },

        # Branch 3: Friday morning reminder (Mar 27, 09:00 Israel)
        make_wait_node("Wait Fri Morning", "2026-03-27T06:00:00.000Z", [400, 400]),
        make_email_node(
            "Reminder Fri AM",
            "Gemini Gems - \u05d8\u05d9\u05e4 \u05e7\u05d8\u05df \u05dc\u05e4\u05e0\u05d9 \u05d4\u05e9\u05d9\u05d3\u05d5\u05e8",
            fri_am_html,
            [700, 400]
        ),

        # Branch 4: Friday 16:00 last reminder (Mar 27, 16:00 Israel)
        make_wait_node("Wait Fri Afternoon", "2026-03-27T13:00:00.000Z", [400, 600]),
        make_email_node(
            "Last Reminder Fri PM",
            "\u05ea\u05d6\u05db\u05d5\u05e8\u05ea \u05d0\u05d7\u05e8\u05d5\u05e0\u05d4 - \u05de\u05d7\u05e8 \u05d1\u05de\u05d5\u05e6\u05f3\u05e9!",
            fri_pm_html,
            [700, 600]
        ),

        # Branch 5: Recording (Saturday evening, Mar 28, 22:00 Israel)
        make_wait_node("Wait for Recording", "2026-03-28T19:00:00.000Z", [400, 800]),
        make_email_node(
            "Send Recording",
            "\u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05de\u05d5\u05db\u05e0\u05d4!",
            rec_html,
            [700, 800]
        ),
    ],
    "connections": {
        "New Signup": {"main": [[
            {"node": "Send Confirmation", "type": "main", "index": 0},
            {"node": "Add to Resend Contacts", "type": "main", "index": 0},
            {"node": "Wait Fri Morning", "type": "main", "index": 0},
            {"node": "Wait Fri Afternoon", "type": "main", "index": 0},
            {"node": "Wait for Recording", "type": "main", "index": 0}
        ]]},
        "Wait Fri Morning": {"main": [[{"node": "Reminder Fri AM", "type": "main", "index": 0}]]},
        "Wait Fri Afternoon": {"main": [[{"node": "Last Reminder Fri PM", "type": "main", "index": 0}]]},
        "Wait for Recording": {"main": [[{"node": "Send Recording", "type": "main", "index": 0}]]}
    },
    "settings": {"executionOrder": "v1"}
}

outpath = os.path.join(os.environ.get('TEMP', '/tmp'), 'gems-workflow-v2.json')
with open(outpath, 'wb') as f:
    f.write(json.dumps(wf, ensure_ascii=False).encode('utf-8'))
print("Written to", outpath)
print("Nodes:", len(wf['nodes']))
