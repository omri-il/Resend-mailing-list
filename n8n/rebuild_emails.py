import json, os, uuid

RESEND_KEY = os.environ.get('RESEND_API_KEY', '')
YT_URL = 'https://youtube.com/live/y8xEvEEoVAo'

def uid():
    return str(uuid.uuid4())

tmpdir = os.environ.get('TEMP', 'C:/Users/omrii/AppData/Local/Temp')

with open(os.path.join(tmpdir, 'gems-raw.json'), 'rb') as f:
    wf = json.loads(f.read())

def make_email_code(subject, greeting, body_html, btn_text, btn_url, btn_color='#0D7377', note=''):
    code = f"""const name = $json.name || '';
const email = $json.email;

const html = `<div dir='rtl' style='font-family:Assistant,Arial,sans-serif;background:#f0fafa;padding:40px 20px;'>
<div style='max-width:600px;margin:0 auto;'>
<div style='text-align:center;padding:20px 0;'><h1 style='color:#0D7377;font-size:28px;margin:0;'>\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd</h1></div>
<div style='background:#fff;border-radius:12px;padding:32px;direction:rtl;'>
<h2 style='color:#0D7377;font-size:24px;text-align:right;'>{greeting}</h2>
{body_html}
</div>
<div style='text-align:center;padding:20px 0;'>
<a href='{btn_url}' style='background:{btn_color};border-radius:10px;color:#fff;font-size:18px;font-weight:700;text-decoration:none;padding:14px 36px;display:inline-block;'>{btn_text}</a>
</div>
{f"<p style='font-size:14px;color:#636e72;text-align:center;'>{note}</p>" if note else ""}
</div></div>`;

const result = await this.helpers.httpRequest({{
  method: 'POST',
  url: 'https://api.resend.com/emails',
  headers: {{
    'Authorization': 'Bearer {RESEND_KEY}',
    'Content-Type': 'application/json'
  }},
  body: JSON.stringify({{
    from: '\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd <omri@mail.omri-iram.co.il>',
    to: [email],
    subject: `{subject}`,
    html: html
  }})
}});

return {{ json: {{ success: true, email, messageId: result.id }} }};"""
    return code

# 1. Confirmation email
confirm = make_email_code(
    "\u05e0\u05e8\u05e9\u05de\u05ea \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4! \u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 Gemini Gems \U0001f393",
    "\u05e9\u05dc\u05d5\u05dd, ${name}!",
    "<p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05e0\u05e8\u05e9\u05de\u05ea \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4 \u05dc\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 <strong>Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da</strong>!</p><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'><strong>\u05de\u05ea\u05d9:</strong> \u05e9\u05d1\u05ea, 28 \u05d1\u05de\u05e8\u05e5 2026, 20:30-21:30<br><strong>\u05d0\u05d9\u05e4\u05d4:</strong> \u05e9\u05d9\u05d3\u05d5\u05e8 \u05d7\u05d9 \u05d1\u05d9\u05d5\u05d8\u05d9\u05d5\u05d1</p>",
    "\u05dc\u05e6\u05e4\u05d9\u05d9\u05d4 \u05d1\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d4\u05d7\u05d9",
    YT_URL,
    note="\u05dc\u05d0 \u05ea\u05d5\u05db\u05dc\u05d5 \u05dc\u05d4\u05d2\u05d9\u05e2? \u05d0\u05d9\u05df \u05d1\u05e2\u05d9\u05d4! \u05d4\u05e9\u05d9\u05e2\u05d5\u05e8 \u05d9\u05d5\u05e7\u05dc\u05d8 \u05d5\u05d9\u05d9\u05e9\u05dc\u05d7 \u05dc\u05db\u05dc \u05d4\u05e0\u05e8\u05e9\u05de\u05d9\u05dd."
)

# 2. Friday morning reminder
fri_am = make_email_code(
    "Gemini Gems - \u05d8\u05d9\u05e4 \u05e7\u05d8\u05df \u05dc\u05e4\u05e0\u05d9 \u05d4\u05e9\u05d9\u05d3\u05d5\u05e8",
    "\u05d4\u05d9\u05d9, ${name}!",
    "<p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05de\u05d7\u05e8 \u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e9\u05dc\u05e0\u05d5 \u05e2\u05dc Gemini Gems \u05de\u05ea\u05d7\u05d9\u05dc \u05de\u05d7\u05e8!</p><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05e0\u05e1\u05d5 \u05dc\u05d4\u05d9\u05db\u05e0\u05e1 \u05dc-<strong>gemini.google.com</strong> \u05d5\u05dc\u05dc\u05d7\u05d5\u05e5 \u05e2\u05dc Gems \u05d1\u05ea\u05e4\u05e8\u05d9\u05d8. \u05d6\u05d4 \u05d4\u05de\u05e7\u05d5\u05dd \u05e9\u05d1\u05d5 \u05e0\u05d1\u05e0\u05d4 \u05d0\u05ea \u05d4\u05e6\u05f3\u05d0\u05d8\u05d1\u05d5\u05d8 \u05d4\u05d7\u05d9\u05e0\u05d5\u05db\u05d9 \u05e9\u05dc\u05db\u05dd \u05d1\u05e9\u05d9\u05d3\u05d5\u05e8!</p>",
    "\u05dc\u05e9\u05de\u05d5\u05e8 \u05d1\u05d9\u05d5\u05de\u05df",
    YT_URL
)

# 3. Friday afternoon last reminder
fri_pm = make_email_code(
    "\u05ea\u05d6\u05db\u05d5\u05e8\u05ea \u05d0\u05d7\u05e8\u05d5\u05e0\u05d4 - \u05de\u05d7\u05e8 \u05d1\u05de\u05d5\u05e6\u05f3\u05e9!",
    "${name}, \u05ea\u05d6\u05db\u05d5\u05e8\u05ea \u05d0\u05d7\u05e8\u05d5\u05e0\u05d4!",
    "<p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e9\u05dc\u05e0\u05d5 \u05e2\u05dc Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da \u05de\u05ea\u05d7\u05d9\u05dc \u05de\u05d7\u05e8 \u05d1\u05de\u05d5\u05e6\u05d0\u05d9 \u05e9\u05d1\u05ea \u05d1-20:30.</p><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05e9\u05d1\u05ea \u05e9\u05dc\u05d5\u05dd \u05d5\u05e0\u05ea\u05e8\u05d0\u05d4 \u05d1\u05e2\u05e8\u05d1!</p>",
    "\u05dc\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d4\u05d7\u05d9 \u05d1\u05de\u05d5\u05e6\u05f3\u05e9",
    YT_URL,
    btn_color='#E8734A'
)

# 4. Recording email
rec = make_email_code(
    "\u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05de\u05d5\u05db\u05e0\u05d4! \U0001f389",
    "\u05d4\u05d9\u05d9, ${name}!",
    "<p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05ea\u05d5\u05d3\u05d4 \u05e9\u05d4\u05e9\u05ea\u05ea\u05e4\u05ea\u05dd! \u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05e9\u05dc \u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e2\u05dc Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da \u05de\u05d5\u05db\u05e0\u05d4 \u05dc\u05e6\u05e4\u05d9\u05d9\u05d4.</p>",
    "\u05dc\u05e6\u05e4\u05d9\u05d9\u05d4 \u05d1\u05d4\u05e7\u05dc\u05d8\u05d4",
    YT_URL
)

email_codes = {
    'Send Confirmation': confirm,
    'Reminder Fri AM': fri_am,
    'Last Reminder Fri PM': fri_pm,
    'Send Recording': rec
}

new_nodes = []
for node in wf['nodes']:
    if node['name'] in email_codes:
        new_nodes.append({
            "parameters": {"jsCode": email_codes[node['name']]},
            "id": uid(),
            "name": node['name'],
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": node['position']
        })
    else:
        new_nodes.append(node)

update = {
    'name': wf['name'],
    'nodes': new_nodes,
    'connections': wf['connections'],
    'settings': {'executionOrder': 'v1'}
}

outpath = os.path.join(tmpdir, 'gems-code-emails.json')
with open(outpath, 'wb') as f:
    f.write(json.dumps(update, ensure_ascii=False).encode('utf-8'))
print(f'Done - {len(new_nodes)} nodes')
print('Email nodes converted to Code:', list(email_codes.keys()))
