import json, os, subprocess

KEY = os.environ.get('RESEND_API_KEY', '')
YT = 'https://youtube.com/live/y8xEvEEoVAo'
TO = 'hello@omri-iram.co.il'
NAME = '\u05e2\u05d5\u05de\u05e8\u05d9'
tmpdir = os.environ.get('TEMP', 'C:/Users/omrii/AppData/Local/Temp')

emails = [
    {
        "subject": "[1/4] \u05e0\u05e8\u05e9\u05de\u05ea \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4! \u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 Gemini Gems \U0001f393",
        "html": f"<div dir='rtl' style='font-family:Assistant,Arial,sans-serif;background:#f0fafa;padding:40px 20px;'><div style='max-width:600px;margin:0 auto;'><div style='text-align:center;padding:20px 0;'><h1 style='color:#0D7377;font-size:28px;margin:0;'>\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd</h1></div><div style='background:#fff;border-radius:12px;padding:32px;direction:rtl;'><h2 style='color:#0D7377;font-size:24px;text-align:right;'>\u05e9\u05dc\u05d5\u05dd, {NAME}!</h2><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05e0\u05e8\u05e9\u05de\u05ea \u05d1\u05d4\u05e6\u05dc\u05d7\u05d4 \u05dc\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 <strong>Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da</strong>!</p><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'><strong>\u05de\u05ea\u05d9:</strong> \u05e9\u05d1\u05ea, 28 \u05d1\u05de\u05e8\u05e5 2026, 20:30-21:30<br><strong>\u05d0\u05d9\u05e4\u05d4:</strong> \u05e9\u05d9\u05d3\u05d5\u05e8 \u05d7\u05d9 \u05d1\u05d9\u05d5\u05d8\u05d9\u05d5\u05d1</p></div><div style='text-align:center;padding:20px 0;'><a href='{YT}' style='background:#0D7377;border-radius:10px;color:#fff;font-size:18px;font-weight:700;text-decoration:none;padding:14px 36px;display:inline-block;'>\u05dc\u05e6\u05e4\u05d9\u05d9\u05d4 \u05d1\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d4\u05d7\u05d9</a></div><p style='font-size:14px;color:#636e72;text-align:center;'>\u05dc\u05d0 \u05ea\u05d5\u05db\u05dc\u05d5 \u05dc\u05d4\u05d2\u05d9\u05e2? \u05d0\u05d9\u05df \u05d1\u05e2\u05d9\u05d4! \u05d4\u05e9\u05d9\u05e2\u05d5\u05e8 \u05d9\u05d5\u05e7\u05dc\u05d8 \u05d5\u05d9\u05d9\u05e9\u05dc\u05d7 \u05dc\u05db\u05dc \u05d4\u05e0\u05e8\u05e9\u05de\u05d9\u05dd.</p></div></div>"
    },
    {
        "subject": "[2/4] Gemini Gems - \u05d8\u05d9\u05e4 \u05e7\u05d8\u05df \u05dc\u05e4\u05e0\u05d9 \u05d4\u05e9\u05d9\u05d3\u05d5\u05e8",
        "html": f"<div dir='rtl' style='font-family:Assistant,Arial,sans-serif;background:#f0fafa;padding:40px 20px;'><div style='max-width:600px;margin:0 auto;'><div style='text-align:center;padding:20px 0;'><h1 style='color:#0D7377;font-size:28px;margin:0;'>\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd</h1></div><div style='background:#fff;border-radius:12px;padding:32px;direction:rtl;'><h2 style='color:#0D7377;font-size:24px;text-align:right;'>\u05d4\u05d9\u05d9, {NAME}!</h2><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05de\u05d7\u05e8 \u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e9\u05dc\u05e0\u05d5 \u05e2\u05dc Gemini Gems \u05de\u05ea\u05d7\u05d9\u05dc \u05de\u05d7\u05e8!</p><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05e0\u05e1\u05d5 \u05dc\u05d4\u05d9\u05db\u05e0\u05e1 \u05dc-<strong>gemini.google.com</strong> \u05d5\u05dc\u05dc\u05d7\u05d5\u05e5 \u05e2\u05dc Gems \u05d1\u05ea\u05e4\u05e8\u05d9\u05d8. \u05d6\u05d4 \u05d4\u05de\u05e7\u05d5\u05dd \u05e9\u05d1\u05d5 \u05e0\u05d1\u05e0\u05d4 \u05d0\u05ea \u05d4\u05e6\u05f3\u05d0\u05d8\u05d1\u05d5\u05d8 \u05d4\u05d7\u05d9\u05e0\u05d5\u05db\u05d9 \u05e9\u05dc\u05db\u05dd \u05d1\u05e9\u05d9\u05d3\u05d5\u05e8!</p></div><div style='text-align:center;padding:20px 0;'><a href='{YT}' style='background:#0D7377;border-radius:10px;color:#fff;font-size:18px;font-weight:700;text-decoration:none;padding:14px 36px;display:inline-block;'>\u05dc\u05e9\u05de\u05d5\u05e8 \u05d1\u05d9\u05d5\u05de\u05df</a></div></div></div>"
    },
    {
        "subject": "[3/4] \u05ea\u05d6\u05db\u05d5\u05e8\u05ea \u05d0\u05d7\u05e8\u05d5\u05e0\u05d4 - \u05de\u05d7\u05e8 \u05d1\u05de\u05d5\u05e6\u05f3\u05e9!",
        "html": f"<div dir='rtl' style='font-family:Assistant,Arial,sans-serif;background:#f0fafa;padding:40px 20px;'><div style='max-width:600px;margin:0 auto;'><div style='text-align:center;padding:20px 0;'><h1 style='color:#0D7377;font-size:28px;margin:0;'>\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd</h1></div><div style='background:#fff;border-radius:12px;padding:32px;direction:rtl;'><h2 style='color:#0D7377;font-size:24px;text-align:right;'>{NAME}, \u05ea\u05d6\u05db\u05d5\u05e8\u05ea \u05d0\u05d7\u05e8\u05d5\u05e0\u05d4!</h2><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e9\u05dc\u05e0\u05d5 \u05e2\u05dc Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da \u05de\u05ea\u05d7\u05d9\u05dc \u05de\u05d7\u05e8 \u05d1\u05de\u05d5\u05e6\u05d0\u05d9 \u05e9\u05d1\u05ea \u05d1-20:30.</p><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05e9\u05d1\u05ea \u05e9\u05dc\u05d5\u05dd \u05d5\u05e0\u05ea\u05e8\u05d0\u05d4 \u05d1\u05e2\u05e8\u05d1!</p></div><div style='text-align:center;padding:20px 0;'><a href='{YT}' style='background:#E8734A;border-radius:10px;color:#fff;font-size:18px;font-weight:700;text-decoration:none;padding:14px 36px;display:inline-block;'>\u05dc\u05e9\u05d9\u05d3\u05d5\u05e8 \u05d4\u05d7\u05d9 \u05d1\u05de\u05d5\u05e6\u05f3\u05e9</a></div></div></div>"
    },
    {
        "subject": "[4/4] \u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05de\u05d5\u05db\u05e0\u05d4! \U0001f389",
        "html": f"<div dir='rtl' style='font-family:Assistant,Arial,sans-serif;background:#f0fafa;padding:40px 20px;'><div style='max-width:600px;margin:0 auto;'><div style='text-align:center;padding:20px 0;'><h1 style='color:#0D7377;font-size:28px;margin:0;'>\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd</h1></div><div style='background:#fff;border-radius:12px;padding:32px;direction:rtl;'><h2 style='color:#0D7377;font-size:24px;text-align:right;'>\u05d4\u05d9\u05d9, {NAME}!</h2><p style='font-size:16px;line-height:26px;color:#4a4a68;text-align:right;'>\u05ea\u05d5\u05d3\u05d4 \u05e9\u05d4\u05e9\u05ea\u05ea\u05e4\u05ea\u05dd! \u05d4\u05d4\u05e7\u05dc\u05d8\u05d4 \u05e9\u05dc \u05d4\u05d5\u05d5\u05d1\u05d9\u05e0\u05e8 \u05e2\u05dc Gemini Gems \u05d1\u05d7\u05d9\u05e0\u05d5\u05da \u05de\u05d5\u05db\u05e0\u05d4 \u05dc\u05e6\u05e4\u05d9\u05d9\u05d4.</p></div><div style='text-align:center;padding:20px 0;'><a href='{YT}' style='background:#0D7377;border-radius:10px;color:#fff;font-size:18px;font-weight:700;text-decoration:none;padding:14px 36px;display:inline-block;'>\u05dc\u05e6\u05e4\u05d9\u05d9\u05d4 \u05d1\u05d4\u05e7\u05dc\u05d8\u05d4</a></div></div></div>"
    }
]

for i, em in enumerate(emails):
    payload = json.dumps({
        "from": "\u05e2\u05d5\u05de\u05e8\u05d9 \u05d0\u05d9\u05e8\u05dd <omri@mail.omri-iram.co.il>",
        "to": [TO],
        "subject": em["subject"],
        "html": em["html"]
    }, ensure_ascii=False)

    fpath = os.path.join(tmpdir, f'email-{i+1}.json')
    with open(fpath, 'wb') as f:
        f.write(payload.encode('utf-8'))

    result = subprocess.run([
        'curl', '-s', '-X', 'POST',
        '-H', 'Authorization: Bearer ' + KEY,
        '-H', 'Content-Type: application/json; charset=utf-8',
        '--data-binary', '@' + fpath,
        'https://api.resend.com/emails'
    ], capture_output=True, text=True)

    print(f"Email {i+1}/4: {result.stdout[:80]}")

print(f"\nAll sent to {TO}")
